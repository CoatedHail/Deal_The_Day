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
    insights: parsed.insights ?? [],
    feedback: parsed.feedback ?? [],
    checklists: parsed.checklists ?? [],
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
 * Repository backed by the signed-in user's record on the server.
 *
 * Writes are coalesced. Every mutation in the provider replaces the whole
 * record, and a burst of them — ticking four checklist items in a row — should
 * cost one request, not four. The delay is short enough that a save always
 * lands within a moment of the change that caused it.
 */
export class ApiRepository implements DataRepository {
  private pending: AppData | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private inFlight: Promise<void> = Promise.resolve();

  constructor(private readonly delayMs: number = 400) {
    if (typeof window !== "undefined") {
      // A tab being hidden or closed is the one moment a queued write would be
      // lost, so it is flushed immediately with `keepalive` — which lets the
      // request outlive the page. Browsers cap a keepalive body at 64KB; a
      // record that large would have to be closed within the debounce window to
      // be affected, and the previous save is still on the server either way.
      const flush = () => void this.flush(true);
      window.addEventListener("pagehide", flush);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") flush();
      });
    }
  }

  async load(): Promise<AppData> {
    const response = await fetch("/api/data", { cache: "no-store" });
    if (!response.ok) {
      // Throwing rather than returning empty: an empty record would look to the
      // family like their history had been wiped, and would then be written
      // back over the real one on the next change.
      throw new Error(`Could not load your record (${response.status})`);
    }
    const parsed = (await response.json()) as Partial<AppData>;
    return {
      ...EMPTY_APP_DATA,
      ...parsed,
      activities: parsed.activities ?? [],
      checkIns: parsed.checkIns ?? [],
      sessions: parsed.sessions ?? [],
      insights: parsed.insights ?? [],
      feedback: parsed.feedback ?? [],
      checklists: parsed.checklists ?? [],
    };
  }

  async save(data: AppData): Promise<void> {
    this.pending = data;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.flush(false), this.delayMs);
  }

  /** Sends whatever is queued. Safe to call when nothing is. */
  async flush(keepalive = false): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const data = this.pending;
    if (!data) return;
    this.pending = null;

    // Chained so two flushes cannot race and land out of order, which would
    // leave the server holding the older of the two. The stored link in the
    // chain always resolves — a rejection kept there would silently skip every
    // save that followed it.
    const next = this.inFlight.catch(() => {}).then(async () => {
      const response = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive,
      });
      if (!response.ok) throw new Error(`Save failed (${response.status})`);
    });
    this.inFlight = next.catch(() => {});
    return next;
  }

  async clear(): Promise<void> {
    this.pending = null;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    await this.save(EMPTY_APP_DATA);
    await this.flush();
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
