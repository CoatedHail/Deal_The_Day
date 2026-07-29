/**
 * Domain model for Deal the Day.
 *
 * Everything here is plain serialisable data with no framework dependencies, so
 * that the same shapes can be reused by an API layer later without change.
 * Dates are ISO 8601 strings rather than Date objects for the same reason.
 */

/** All rating scales in the app share a 0–10 range. */
export type Rating = number;

export const RATING_MIN = 0;
export const RATING_MAX = 10;

/**
 * How much of the feared outcome actually happened.
 *
 * This is the single most therapeutically important field in the app. Comparing
 * a prediction against reality is the mechanism by which exposure updates
 * belief, so it is captured as a discrete value that can be counted, not as
 * free text.
 */
export type FearedOutcome = "did-not-happen" | "partly-happened" | "happened";

export interface PreActivityCheck {
  /**
   * The number printed on the card drawn from the physical deck.
   *
   * The number is the identifier, not the title: it is faster to enter, it does
   * not depend on copying wording accurately, and it lets a family reference the
   * same card consistently across entries. The title stays optional so an entry
   * still reads sensibly on its own.
   */
  cardNumber?: number;
  /** The wording on the card, if the family wants it recorded. */
  cardTitle: string;
  cardCategory?: ActivityCategory;
  anxiety: Rating;
  confidence: Rating;
  /** What the user expects to happen. Compared against reality afterwards. */
  predictedOutcome: string;
  biggestFear: string;
  /** Compulsions the user anticipates being pulled toward. */
  temptedCompulsions: string[];
  /** Anything else on their mind before starting. */
  notes?: string;
}

export interface PostActivityCheck {
  whatHappened: string;
  anxietyAfter: Rating;
  whatSurprisedYou: string;
  fearedOutcome: FearedOutcome;
  whatDidYouLearn: string;
  /** Longer free-form journal entry. */
  reflection?: string;
  /** Which of the anticipated compulsions the user managed not to do. */
  compulsionsResisted: string[];
  /** Which they did do. Recorded without judgement — data, not failure. */
  compulsionsPerformed: string[];
}

/**
 * Reason recorded when a family uses the Safety Valve.
 *
 * The point of splitting `natureOfConcern` out is to help the user notice the
 * difference between a real-world obstacle and anxiety doing the talking. The
 * app never overrides their choice; it only invites the distinction.
 */
export interface OptOutRecord {
  reason: string;
  natureOfConcern: "practical-safety" | "genuinely-impossible" | "anxiety-driven" | "unsure";
  /** Whether the family adapted the card rather than skipping it entirely. */
  modifiedInstead: boolean;
  modificationDescription?: string;
  recordedAt: string;
}

export type ActivityStatus = "planned" | "awaiting-reflection" | "completed" | "opted-out";

export type ActivityCategory =
  | "food"
  | "outdoors"
  | "outing"
  | "creative"
  | "connection"
  | "spontaneity"
  | "everyday";

export interface ActivityEntry {
  id: string;
  status: ActivityStatus;
  /** When the card was drawn. */
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  pre: PreActivityCheck;
  post?: PostActivityCheck;
  optOut?: OptOutRecord;
  /**
   * The category checklist exactly as it stood when this card was drawn.
   *
   * Copied rather than referenced on purpose. If the activity only pointed at
   * the checklist, editing that list next month would silently rewrite what
   * this entry says happened today — and the record has to stay true to the
   * day it describes.
   */
  checklistSnapshot?: ChecklistItem[];
  /** Ids from the snapshot that were ticked off during the activity. */
  checklistCompleted?: string[];
  /**
   * Who carried it out, as a free-text name.
   *
   * A name rather than a linked account: children do not have logins here, and
   * rotating who does it matters more than identifying them precisely.
   */
  executedBy?: string;
}

/**
 * The seven dimensions tracked by an emotional check-in.
 *
 * Kept as a registry rather than hard-coded form fields so the check-in form,
 * the trend charts and the therapist export all stay in sync automatically.
 */
export type CheckInMetricKey =
  | "mood"
  | "anxiety"
  | "stress"
  | "urgeToOverplan"
  | "urgeToSeekReassurance"
  | "confidence"
  | "willingnessToTolerateUncertainty";

export interface CheckInMetricDefinition {
  key: CheckInMetricKey;
  label: string;
  /** Short plain-language explanation shown under the label. */
  help: string;
  lowLabel: string;
  highLabel: string;
  /**
   * Which direction counts as progress. Used by charts to colour trends, and
   * deliberately not used to congratulate or scold.
   */
  direction: "higher-is-better" | "lower-is-better";
}

export const CHECK_IN_METRICS: readonly CheckInMetricDefinition[] = [
  {
    key: "mood",
    label: "Mood",
    help: "How you feel in general right now.",
    lowLabel: "Low",
    highLabel: "Good",
    direction: "higher-is-better",
  },
  {
    key: "anxiety",
    label: "Anxiety",
    help: "How anxious or on-edge you feel.",
    lowLabel: "Calm",
    highLabel: "Very anxious",
    direction: "lower-is-better",
  },
  {
    key: "stress",
    label: "Stress",
    help: "How much pressure you feel under.",
    lowLabel: "None",
    highLabel: "A lot",
    direction: "lower-is-better",
  },
  {
    key: "urgeToOverplan",
    label: "Urge to over-plan",
    help: "The pull to research, prepare or make contingency plans.",
    lowLabel: "No pull",
    highLabel: "Strong pull",
    direction: "lower-is-better",
  },
  {
    key: "urgeToSeekReassurance",
    label: "Urge to seek reassurance",
    help: "The pull to ask someone whether it will be okay.",
    lowLabel: "No pull",
    highLabel: "Strong pull",
    direction: "lower-is-better",
  },
  {
    key: "confidence",
    label: "Confidence",
    help: "How able you feel to handle whatever comes up.",
    lowLabel: "Not at all",
    highLabel: "Very",
    direction: "higher-is-better",
  },
  {
    key: "willingnessToTolerateUncertainty",
    label: "Willingness to sit with not knowing",
    help: "Not whether it feels comfortable — whether you are willing to do it anyway.",
    lowLabel: "Not willing",
    highLabel: "Willing",
    direction: "higher-is-better",
  },
] as const;

export type CheckInRatings = Record<CheckInMetricKey, Rating>;

export interface CheckIn {
  id: string;
  recordedAt: string;
  ratings: CheckInRatings;
  note?: string;
  /** Set when the check-in was taken as part of an activity rather than alone. */
  linkedActivityId?: string;
}

export interface ScheduledSession {
  id: string;
  /** Calendar date in YYYY-MM-DD. Time is deliberately optional — pinning an
   *  exact minute tends to invite planning rituals. */
  date: string;
  time?: string;
  title: string;
  notes?: string;
  reminderEnabled: boolean;
  /** Set once the session has been turned into an actual activity entry. */
  fulfilledByActivityId?: string;
  createdAt: string;
}

export interface TherapistNote {
  id: string;
  createdAt: string;
  /** Free text. Placeholder until real therapist accounts exist. */
  body: string;
  /** Optional link to the activity being discussed. */
  linkedActivityId?: string;
}

/**
 * A single line on a category checklist.
 *
 * Deliberately just an id and a short string. Anything richer — notes,
 * sub-items, priorities — would let the checklist grow into the kind of
 * exhaustive planning project the game exists to loosen.
 */
export interface ChecklistItem {
  id: string;
  text: string;
}

/**
 * What the parent decided, in advance, needs to be true before an activity of
 * this kind happens.
 *
 * The therapeutic point is the timing, not the content. Deciding ahead and then
 * letting the list carry it out — rather than supervising in the moment — is
 * the exposure. So these are authored after an activity, while reflecting on
 * what actually mattered, and are read-only by the time the next card is drawn.
 */
export interface CategoryChecklist {
  id: string;
  category: ActivityCategory;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  /**
   * How many times the list has been revised. Recorded for a clinician export,
   * and deliberately never shown to the parent: a visible count of your own
   * revisions becomes a number to drive to zero, which would discourage the
   * honest editing that means someone is actually learning.
   */
  revisions: number;
}

/** Hard cap, not a suggestion. A nudge does not restrain the pattern this
 *  feature is trying to avoid feeding. */
export const CHECKLIST_MAX_ITEMS = 7;
export const CHECKLIST_ITEM_MAX_LENGTH = 60;

/**
 * A review of a card in the physical deck.
 *
 * Separate from the therapeutic record on purpose. This is feedback about the
 * game as a product — whether a card landed, whether it was pitched right — and
 * it should never be mixed into progress tracking, where it would read as a
 * judgement of how the family did.
 */
export interface GameFeedback {
  id: string;
  submittedAt: string;
  /** Which card is being reviewed. Optional — some feedback is about the deck. */
  cardNumber?: number;
  /** Overall rating of the card or deck, 0–10. */
  rating: Rating;
  /** How the difficulty felt for this family, in their judgement. */
  difficulty: "too-easy" | "about-right" | "too-hard";
  whatWorked: string;
  whatDidNot: string;
  /** Free suggestion for the people making the deck. */
  suggestion?: string;
  /**
   * Whether this reached the project team. The local copy is kept either way,
   * so a failed send never loses what the family wrote and can be retried.
   */
  sent: boolean;
}

export const FEEDBACK_DIFFICULTY_LABELS: Record<GameFeedback["difficulty"], string> = {
  "too-easy": "Too easy for us",
  "about-right": "About right",
  "too-hard": "Too big a step",
};

/** An insight the user chose to keep from a reflection. */
export interface SavedInsight {
  id: string;
  text: string;
  savedAt: string;
  sourceActivityId?: string;
}

/** The complete shape of everything the app stores for one household. */
export interface AppData {
  activities: ActivityEntry[];
  checkIns: CheckIn[];
  sessions: ScheduledSession[];
  therapistNotes: TherapistNote[];
  insights: SavedInsight[];
  feedback: GameFeedback[];
  /** At most one per category, and a category may have none. */
  checklists: CategoryChecklist[];
  /** Schema version, so future migrations have something to branch on. */
  version: number;
}

export const CURRENT_DATA_VERSION = 1;

export const EMPTY_APP_DATA: AppData = {
  activities: [],
  checkIns: [],
  sessions: [],
  therapistNotes: [],
  insights: [],
  feedback: [],
  checklists: [],
  version: CURRENT_DATA_VERSION,
};

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  food: "Food",
  outdoors: "Outdoors",
  outing: "Outing",
  creative: "Creative",
  connection: "Connection",
  spontaneity: "Spontaneity",
  everyday: "Everyday",
};

export const FEARED_OUTCOME_LABELS: Record<FearedOutcome, string> = {
  "did-not-happen": "It did not happen",
  "partly-happened": "Some of it happened",
  happened: "It happened",
};
