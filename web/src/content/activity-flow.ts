/**
 * Copy deck for the activity flow.
 *
 * ── For whoever writes the content ──────────────────────────────────────────
 * Every word the user reads in the before/after/safety-valve forms lives in
 * this file. Edit the strings here; you do not need to touch any component.
 * Changing wording will not break the app, and none of these strings are used
 * as identifiers.
 *
 * `label`  the question itself, shown in bold
 * `help`   the smaller gray line under it. Optional — delete it if not needed.
 * `anchorLow` / `anchorHigh`  the two ends of a 0–10 slider
 * `placeholder`  ghost text inside an empty box. Optional.
 *
 * The wording below is a working draft written to keep the app usable, not a
 * clinical script. It is expected to be replaced.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface FieldCopy {
  label: string;
  help?: string;
  placeholder?: string;
}

export interface ScaleCopy extends FieldCopy {
  anchorLow: string;
  anchorHigh: string;
}

export const PRE_ACTIVITY_COPY = {
  intro:
    "Fill this in before you set off, while you still believe your prediction. It takes a couple of minutes.",
  reminder: {
    title: "Before you go",
    body: "The aim is not to feel ready. It is to go while it still feels uncertain, and find out what happens.",
  },
  cardNumber: {
    label: "Card number",
    help: "The number printed on the card you drew.",
    placeholder: "e.g. 14",
  } satisfies FieldCopy,
  cardTitle: {
    label: "What does the card say?",
    help: "Optional. Useful later when you are reading back through.",
    placeholder: "Pick a restaurant nobody has been to",
  } satisfies FieldCopy,
  category: {
    label: "What kind of activity is it?",
    help: "Optional.",
  } satisfies FieldCopy,
  anxiety: {
    label: "How anxious do you feel right now?",
    anchorLow: "Not at all",
    anchorHigh: "Extremely",
  } satisfies ScaleCopy,
  confidence: {
    label: "How able do you feel to handle it?",
    anchorLow: "Not at all",
    anchorHigh: "Very",
  } satisfies ScaleCopy,
  predictedOutcome: {
    label: "What do you think will happen?",
    help: "Your honest expectation, not the reasonable version.",
    placeholder: "Write what you actually expect.",
  } satisfies FieldCopy,
  biggestFear: {
    label: "What are you most worried about?",
    help: "The specific thing, as concretely as you can put it.",
    placeholder: "The one outcome you would least want.",
  } satisfies FieldCopy,
  temptedCompulsions: {
    label: "What will you be tempted to do to feel more certain?",
    help: "Add as many as you like. You will be asked afterwards which ones you did.",
    placeholder: "Type one and press Enter",
  } satisfies FieldCopy,
  notes: {
    label: "Anything else on your mind",
    help: "Optional.",
  } satisfies FieldCopy,
  submit: "Save and set off",
};

/**
 * Offered as one-tap prompts under the "what will you be tempted to do" field.
 * They are only suggestions; anything typed is kept verbatim. Add or remove
 * freely.
 */
export const COMPULSION_SUGGESTIONS = [
  "Reading reviews",
  "Checking the menu first",
  "Planning a backup",
  "Asking if it will be okay",
  "Arriving very early",
  "Packing for every outcome",
  "Checking the route repeatedly",
] as const;

export const POST_ACTIVITY_COPY = {
  intro:
    "Now the comparison. Your answers from before are shown alongside so you can see them as you go.",
  whatHappened: {
    label: "What actually happened?",
    placeholder: "How it went, in as much or as little detail as you want.",
  } satisfies FieldCopy,
  anxietyAfter: {
    label: "How anxious do you feel now?",
    anchorLow: "Not at all",
    anchorHigh: "Extremely",
  } satisfies ScaleCopy,
  fearedOutcome: {
    label: "The thing you were most worried about — did it happen?",
    help: "This is the question the whole exercise is built around, so it is worth answering carefully.",
  } satisfies FieldCopy,
  whatSurprisedYou: {
    label: "Did anything surprise you?",
    placeholder: "Anything that went differently to how you pictured it.",
  } satisfies FieldCopy,
  whatDidYouLearn: {
    label: "What would you take from this?",
    placeholder: "Even something small.",
  } satisfies FieldCopy,
  compulsions: {
    label: "What did you do about the urges you noted beforehand?",
    help: "There is no wrong answer here — this is a record, not a score.",
  } satisfies FieldCopy,
  reflection: {
    label: "Anything else you want to write down",
    help: "Optional. This is the part that ends up in your journal.",
  } satisfies FieldCopy,
  submit: "Save reflection",
};

export const OPT_OUT_COPY = {
  intro:
    "Some cards genuinely should not go ahead. Recording why keeps the decision yours.",
  reason: {
    label: "What is making you step back?",
    placeholder: "In your own words.",
  } satisfies FieldCopy,
  natureOfConcern: {
    label: "What kind of concern is it?",
    help: "Every one of these is a legitimate answer, including 'unsure'.",
  } satisfies FieldCopy,
  modifiedInstead: {
    label: "We changed the card rather than skipping it",
    help: "A smaller version of the same thing still counts.",
  } satisfies FieldCopy,
  modificationDescription: {
    label: "What did you do instead?",
    placeholder: "The adapted version.",
  } satisfies FieldCopy,
  submit: "Record this",
};

/** Options for the "what kind of concern" question in the safety valve. */
export const CONCERN_OPTIONS = [
  {
    value: "practical-safety",
    label: "A practical safety issue",
    description: "A real-world reason this is not a good idea today.",
  },
  {
    value: "genuinely-impossible",
    label: "Genuinely not possible",
    description: "Circumstances got in the way — illness, weather, time.",
  },
  {
    value: "anxiety-driven",
    label: "Mostly the anxiety talking",
    description: "Recorded plainly. Noticing this is worth something on its own.",
  },
  {
    value: "unsure",
    label: "Honestly not sure",
    description: "A very common answer, and a fine one.",
  },
] as const;

/** Options for whether the feared outcome came about. */
export const FEARED_OUTCOME_OPTIONS = [
  {
    value: "did-not-happen",
    label: "No, it did not happen",
    description: "The thing you were worried about did not come about.",
  },
  {
    value: "partly-happened",
    label: "Some of it happened",
    description: "Part of it, or a milder version.",
  },
  {
    value: "happened",
    label: "Yes, it happened",
    description: "It did — and you are here writing this down afterwards.",
  },
] as const;
