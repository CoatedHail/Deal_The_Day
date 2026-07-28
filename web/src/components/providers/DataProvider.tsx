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
  TherapistNote,
} from "@/lib/types";

interface DataContextValue {
  data: AppData;
  /** False until the first load from storage completes. */
  ready: boolean;

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

  addTherapistNote: (body: string, linkedActivityId?: string) => void;
  deleteTherapistNote: (id: string) => void;

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

  /** Serialises everything for download. Used by the therapist export. */
  exportJson: () => string;
  importJson: (json: string) => { ok: true } | { ok: false; error: string };
  clearAllData: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({
  children,
  repository,
}: {
  children: React.ReactNode;
  /** Injectable so tests and a future API-backed build can swap it out. */
  repository?: DataRepository;
}) {
  const repoRef = useRef<DataRepository>(repository ?? new LocalStorageRepository());
  const [data, setData] = useState<AppData>(EMPTY_APP_DATA);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    repoRef.current.load().then((loaded) => {
      if (cancelled) return;
      setData(loaded);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist on every change, but not before the initial load has landed —
  // otherwise the empty starting state would overwrite real stored data.
  useEffect(() => {
    if (!ready) return;
    void repoRef.current.save(data);
  }, [data, ready]);

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

  const addTherapistNote = useCallback((body: string, linkedActivityId?: string) => {
    const note: TherapistNote = {
      id: createId(),
      createdAt: now(),
      body,
      linkedActivityId,
    };
    setData((current) => ({
      ...current,
      therapistNotes: [note, ...current.therapistNotes],
    }));
  }, []);

  const deleteTherapistNote = useCallback((id: string) => {
    setData((current) => ({
      ...current,
      therapistNotes: current.therapistNotes.filter((note) => note.id !== id),
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
          therapistNotes: parsed.therapistNotes ?? [],
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
      addTherapistNote,
      deleteTherapistNote,
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
      addTherapistNote,
      deleteTherapistNote,
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
