"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ApiRepository,
  DataRepository,
  LocalStorageRepository,
  createId,
} from "@/lib/storage";
import {
  ActivityCategory,
  ActivityEntry,
  AppData,
  CategoryChecklist,
  CheckIn,
  ChecklistItem,
  CheckInRatings,
  EMPTY_APP_DATA,
  GameFeedback,
  OptOutRecord,
  PostActivityCheck,
  PreActivityCheck,
  SavedInsight,
  ScheduledSession,
} from "@/lib/types";

/** Where the record being edited actually lives. */
export type StorageLocation = "device" | "account";

interface DataContextValue {
  data: AppData;
  /** False until the first load from storage completes. */
  ready: boolean;
  storage: StorageLocation;
  /**
   * Set when the account's record could not be read. Saving is suspended while
   * this is set, so a failed load can never be written back over a real record.
   */
  storageError: string | null;

  startActivity: (pre: PreActivityCheck) => string;
  updateActivityPre: (id: string, pre: PreActivityCheck) => void;
  completeActivity: (id: string, post: PostActivityCheck) => void;
  optOutOfActivity: (id: string, optOut: Omit<OptOutRecord, "recordedAt">) => void;
  deleteActivity: (id: string) => void;

  addCheckIn: (ratings: CheckInRatings, note?: string, linkedActivityId?: string) => void;
  deleteCheckIn: (id: string) => void;

  addSession: (session: Omit<ScheduledSession, "id" | "createdAt">) => void;
  updateSession: (id: string, patch: Partial<ScheduledSession>) => void;
  deleteSession: (id: string) => void;

  saveInsight: (text: string, sourceActivityId?: string) => void;
  deleteInsight: (id: string) => void;

  /** Creates or replaces the checklist for a category. Empty items clears it. */
  saveChecklist: (category: ActivityCategory, items: ChecklistItem[]) => void;
  /** Records what was ticked off, after the fact. Never live. */
  recordChecklistProgress: (
    activityId: string,
    completedIds: string[],
    executedBy?: string,
  ) => void;

  addFeedback: (feedback: Omit<GameFeedback, "id" | "submittedAt" | "sent">) => string;
  markFeedbackSent: (id: string) => void;
  deleteFeedback: (id: string) => void;

  /** Serializes the household record for a user-controlled backup. */
  exportJson: () => string;
  importJson: (json: string) => { ok: true } | { ok: false; error: string };
  clearAllData: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

/** True when nothing has been recorded. Card reviews are not part of this. */
function isEmptyRecord(data: AppData): boolean {
  return (
    data.activities.length === 0 &&
    data.checkIns.length === 0 &&
    data.sessions.length === 0 &&
    data.insights.length === 0 &&
    data.checklists.length === 0
  );
}

export function DataProvider({
  children,
  repository,
  signedIn = false,
}: {
  children: React.ReactNode;
  /** Injectable so tests can swap the storage layer out. */
  repository?: DataRepository;
  /**
   * Whether there is a signed-in account to store the record against. Comes
   * from the server session in the root layout, so the very first render
   * already knows which side of the boundary it is on.
   */
  signedIn?: boolean;
}) {
  const repoRef = useRef<DataRepository>(repository ?? new LocalStorageRepository());
  const [data, setData] = useState<AppData>(EMPTY_APP_DATA);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  /**
   * The value that came out of storage. Compared by reference so the load does
   * not immediately trigger a save of what was just read.
   */
  const loaded = useRef<AppData | null>(null);

  useEffect(() => {
    let canceled = false;
    setReady(false);
    setStorageError(null);
    const repo = repository ?? (signedIn ? new ApiRepository() : new LocalStorageRepository());
    repoRef.current = repo;

    async function start(): Promise<AppData> {
      if (repository || !signedIn) return repo.load();

      // Signing in for the first time on a device that already has a history:
      // the record is carried up to the account, then removed from the browser
      // so there is only ever one copy and no chance of the two diverging.
      const onDevice = new LocalStorageRepository();
      const [remote, local] = await Promise.all([repo.load(), onDevice.load()]);
      if (!isEmptyRecord(remote) || isEmptyRecord(local)) return remote;

      await repo.save(local);
      if (repo instanceof ApiRepository) await repo.flush();
      await onDevice.clear();
      return local;
    }

    start()
      .then((result) => {
        if (canceled) return;
        loaded.current = result;
        setData(result);
        setReady(true);
      })
      .catch(() => {
        if (canceled) return;
        // Deliberately still ready, so the app is usable — but with saving
        // suspended, because writing an empty record back would destroy the
        // real one sitting on the server.
        loaded.current = EMPTY_APP_DATA;
        setData(EMPTY_APP_DATA);
        setStorageError(
          "We could not reach your saved record just now. Nothing you write here will be kept until it reloads.",
        );
        setReady(true);
      });

    return () => {
      canceled = true;
    };
  }, [repository, signedIn]);

  // Persist on every change, but not before the initial load has landed —
  // otherwise the empty starting state would overwrite real stored data.
  useEffect(() => {
    if (!ready || storageError) return;
    if (data === loaded.current) return;
    void repoRef.current.save(data);
  }, [data, ready, storageError]);

  const now = () => new Date().toISOString();

  const startActivity = useCallback((pre: PreActivityCheck) => {
    const id = createId();
    const timestamp = now();
    setData((current) => {
      // Snapshot the category's checklist as it stands right now. Referencing
      // it instead would let a later edit rewrite this entry's history.
      const checklist = pre.cardCategory
        ? current.checklists.find((entry) => entry.category === pre.cardCategory)
        : undefined;
      const entry: ActivityEntry = {
        id,
        status: "awaiting-reflection",
        createdAt: timestamp,
        updatedAt: timestamp,
        pre,
        checklistSnapshot: checklist?.items.length ? checklist.items : undefined,
      };
      return { ...current, activities: [entry, ...current.activities] };
    });
    return id;
  }, []);

  const updateActivityPre = useCallback((id: string, pre: PreActivityCheck) => {
    setData((current) => ({
      ...current,
      activities: current.activities.map((activity) =>
        activity.id === id ? { ...activity, pre, updatedAt: now() } : activity,
      ),
    }));
  }, []);

  const completeActivity = useCallback((id: string, post: PostActivityCheck) => {
    const timestamp = now();
    setData((current) => ({
      ...current,
      activities: current.activities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              post,
              status: "completed" as const,
              completedAt: timestamp,
              updatedAt: timestamp,
            }
          : activity,
      ),
    }));
  }, []);

  const optOutOfActivity = useCallback(
    (id: string, optOut: Omit<OptOutRecord, "recordedAt">) => {
      const timestamp = now();
      setData((current) => ({
        ...current,
        activities: current.activities.map((activity) =>
          activity.id === id
            ? {
                ...activity,
                status: "opted-out" as const,
                optOut: { ...optOut, recordedAt: timestamp },
                updatedAt: timestamp,
              }
            : activity,
        ),
      }));
    },
    [],
  );

  const deleteActivity = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      activities: current.activities.filter((activity) => activity.id !== id),
    }));
  }, []);

  const addCheckIn = useCallback(
    (ratings: CheckInRatings, note?: string, linkedActivityId?: string) => {
      const entry: CheckIn = {
        id: createId(),
        recordedAt: now(),
        ratings,
        note,
        linkedActivityId,
      };
      setData((current) => ({ ...current, checkIns: [entry, ...current.checkIns] }));
    },
    [],
  );

  const deleteCheckIn = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      checkIns: current.checkIns.filter((checkIn) => checkIn.id !== id),
    }));
  }, []);

  const addSession = useCallback(
    (session: Omit<ScheduledSession, "id" | "createdAt">) => {
      const entry: ScheduledSession = { ...session, id: createId(), createdAt: now() };
      setData((current) => ({
        ...current,
        sessions: [...current.sessions, entry].sort((a, b) => a.date.localeCompare(b.date)),
      }));
    },
    [],
  );

  const updateSession = useCallback((id: string, patch: Partial<ScheduledSession>) => {
    setData((current) => ({
      ...current,
      sessions: current.sessions.map((session) =>
        session.id === id ? { ...session, ...patch } : session,
      ),
    }));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      sessions: current.sessions.filter((session) => session.id !== id),
    }));
  }, []);

  const saveInsight = useCallback((text: string, sourceActivityId?: string) => {
    const insight: SavedInsight = {
      id: createId(),
      text,
      savedAt: now(),
      sourceActivityId,
    };
    setData((current) => ({ ...current, insights: [insight, ...current.insights] }));
  }, []);

  const deleteInsight = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      insights: current.insights.filter((insight) => insight.id !== id),
    }));
  }, []);

  const saveChecklist = useCallback(
    (category: ActivityCategory, items: ChecklistItem[]) => {
      const timestamp = now();
      setData((current) => {
        const existing = current.checklists.find((entry) => entry.category === category);

        // An empty list is a legitimate answer — a category the family has got
        // comfortable with should be allowed to drop to nothing.
        if (items.length === 0) {
          return {
            ...current,
            checklists: current.checklists.filter((entry) => entry.category !== category),
          };
        }

        if (!existing) {
          const entry: CategoryChecklist = {
            id: createId(),
            category,
            items,
            createdAt: timestamp,
            updatedAt: timestamp,
            revisions: 0,
          };
          return { ...current, checklists: [...current.checklists, entry] };
        }

        return {
          ...current,
          checklists: current.checklists.map((entry) =>
            entry.category === category
              ? {
                  ...entry,
                  items,
                  updatedAt: timestamp,
                  revisions: entry.revisions + 1,
                }
              : entry,
          ),
        };
      });
    },
    [],
  );

  const recordChecklistProgress = useCallback(
    (activityId: string, completedIds: string[], executedBy?: string) => {
      setData((current) => ({
        ...current,
        activities: current.activities.map((activity) =>
          activity.id === activityId
            ? {
                ...activity,
                checklistCompleted: completedIds,
                executedBy: executedBy?.trim() || activity.executedBy,
                updatedAt: now(),
              }
            : activity,
        ),
      }));
    },
    [],
  );

  const addFeedback = useCallback(
    (feedback: Omit<GameFeedback, "id" | "submittedAt" | "sent">) => {
      const id = createId();
      const entry: GameFeedback = {
        ...feedback,
        id,
        submittedAt: now(),
        sent: false,
      };
      setData((current) => ({ ...current, feedback: [entry, ...current.feedback] }));
      return id;
    },
    [],
  );

  const markFeedbackSent = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      feedback: current.feedback.map((entry) =>
        entry.id === id ? { ...entry, sent: true } : entry,
      ),
    }));
  }, []);

  const deleteFeedback = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      feedback: current.feedback.filter((entry) => entry.id !== id),
    }));
  }, []);

  const exportJson = useCallback(() => JSON.stringify(data, null, 2), [data]);

  const importJson = useCallback(
    (json: string): { ok: true } | { ok: false; error: string } => {
      try {
        const parsed = JSON.parse(json) as Partial<AppData>;
        if (typeof parsed !== "object" || parsed === null) {
          return { ok: false, error: "That file does not look like a Deal the Day export." };
        }
        setData({
          ...EMPTY_APP_DATA,
          ...parsed,
          activities: parsed.activities ?? [],
          checkIns: parsed.checkIns ?? [],
          sessions: parsed.sessions ?? [],
          insights: parsed.insights ?? [],
          feedback: parsed.feedback ?? [],
          checklists: parsed.checklists ?? [],
        });
        return { ok: true };
      } catch {
        return { ok: false, error: "That file could not be read as JSON." };
      }
    },
    [],
  );

  const clearAllData = useCallback(() => {
    setData(EMPTY_APP_DATA);
    void repoRef.current.clear();
  }, []);

  const value = useMemo<DataContextValue>(
    () => ({
      data,
      ready,
      storage: signedIn ? ("account" as const) : ("device" as const),
      storageError,
      startActivity,
      updateActivityPre,
      completeActivity,
      optOutOfActivity,
      deleteActivity,
      addCheckIn,
      deleteCheckIn,
      addSession,
      updateSession,
      deleteSession,
      saveInsight,
      deleteInsight,
      saveChecklist,
      recordChecklistProgress,
      addFeedback,
      markFeedbackSent,
      deleteFeedback,
      exportJson,
      importJson,
      clearAllData,
    }),
    [
      data,
      ready,
      signedIn,
      storageError,
      startActivity,
      updateActivityPre,
      completeActivity,
      optOutOfActivity,
      deleteActivity,
      addCheckIn,
      deleteCheckIn,
      addSession,
      updateSession,
      deleteSession,
      saveInsight,
      deleteInsight,
      saveChecklist,
      recordChecklistProgress,
      addFeedback,
      markFeedbackSent,
      deleteFeedback,
      exportJson,
      importJson,
      clearAllData,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside a DataProvider");
  }
  return context;
}
