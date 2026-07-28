import { AppData, CURRENT_DATA_VERSION, EMPTY_APP_DATA } from "@/lib/types";

/**
 * Storage boundary for all therapeutic data.
 *
 * The interface is async even though the current implementation is synchronous
 * localStorage. That is deliberate: when this moves behind an authenticated API
 * the components calling it should not have to change.
 */
export interface DataRepository {
  load(): Promise<AppData>;
  save(data: AppData): Promise<void>;
  clear(): Promise<void>;
}

export const DATA_STORAGE_KEY = "dtd.data.v1";

/**
 * Runs stored data through any migrations needed to reach the current version.
 *
 * Nothing to migrate yet, but the seam exists so that a future change to the
 * shape of an activity does not silently discard someone's history.
 */
function migrate(data: AppData): AppData {
  if (data.version === CURRENT_DATA_VERSION) return data;
  return { ...data, version: CURRENT_DATA_VERSION };
}

function reviveAppData(raw: string): AppData {
  const parsed = JSON.parse(raw) as Partial<AppData>;
  // Merge against the empty shape so a stored payload missing a newer
  // collection does not produce undefined arrays downstream.
  return migrate({
    ...EMPTY_APP_DATA,
    ...parsed,
    activities: parsed.activities ?? [],
    checkIns: parsed.checkIns ?? [],
    sessions: parsed.sessions ?? [],
    therapistNotes: parsed.therapistNotes ?? [],
    insights: parsed.insights ?? [],
    feedback: parsed.feedback ?? [],
  });
}

export class LocalStorageRepository implements DataRepository {
  constructor(private readonly key: string = DATA_STORAGE_KEY) {}

  async load(): Promise<AppData> {
    if (typeof window === "undefined") return EMPTY_APP_DATA;
    try {
      const raw = window.localStorage.getItem(this.key);
      if (!raw) return EMPTY_APP_DATA;
      return reviveAppData(raw);
    } catch {
      // A corrupt payload should not brick the app. Returning empty is
      // preferable to throwing, and the existing value is left in place so it
      // can still be recovered manually.
      return EMPTY_APP_DATA;
    }
  }

  async save(data: AppData): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  async clear(): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(this.key);
  }
}

/**
 * In-memory repository, used for server rendering and available for tests.
 */
export class MemoryRepository implements DataRepository {
  private data: AppData = EMPTY_APP_DATA;

  async load(): Promise<AppData> {
    return this.data;
  }

  async save(data: AppData): Promise<void> {
    this.data = data;
  }

  async clear(): Promise<void> {
    this.data = EMPTY_APP_DATA;
  }
}

/** Stable id generation with a fallback for older browsers. */
export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
