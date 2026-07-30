/**
 * Starter checklist items, offered per category.
 *
 * ── For whoever writes the content ──────────────────────────────────────────
 * These are suggestions shown when a parent first writes a checklist for a
 * category. They are not defaults — nothing is saved until the parent chooses
 * items and saves.
 *
 * Keep each list to three. The number is doing real work: a pre-filled list of
 * three quietly says "three is normal", which is a far better anchor than an
 * empty box with an "Add item" button, and it is the cheapest defense we have
 * against the checklist turning into an exhaustive planning project.
 *
 * Keep items concrete, universally sensible, and boring. A suggestion that
 * sounds like a precaution ("check for allergens", "confirm the route twice")
 * teaches the wrong thing — these should read as ordinary preparation anyone
 * would do, not as risk management.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { ActivityCategory } from "@/lib/types";

export const CHECKLIST_SUGGESTIONS: Record<ActivityCategory, string[]> = {
  food: ["Agree who picks", "Bring a card or cash", "Decide roughly when to head back"],
  outdoors: ["Look at the weather once", "Take water", "Agree a turnaround time"],
  outing: ["Agree how you are getting there", "Take water", "Set a rough time to come home"],
  creative: ["Get the materials out", "Clear a space to work", "Agree when to stop"],
  connection: ["Pick a time nobody is rushing", "Put phones somewhere else", "Agree who starts"],
  spontaneity: ["Take a card or cash", "Tell someone where you are going"],
  everyday: ["Agree who is doing it", "Decide when"],
};

/** Copy for the reflection-time authoring step. */
export const CHECKLIST_AUTHORING_COPY = {
  prompt: {
    label: "If you did something like this again, what would you want sorted beforehand?",
    help: "You just did it, so you know what actually mattered. Keep it to the essentials — anyone in the family should be able to follow this without asking you.",
  },
  updatePrompt: {
    label: "Anything to change about this list?",
    help: "You wrote this before. Now that you have done it again, does it still look right?",
  },
  skip: "Not this time",
  save: "Save this list",
  suggestionsLabel: "Common ones, if any fit:",
  /** Shown once a list is saved. */
  savedNote:
    "Next time a card from this category comes up, whoever is doing it will see this list. You will not need to be there checking.",
};

/** Copy for the read-only execution screen. */
export const CHECKLIST_EXECUTION_COPY = {
  handover: {
    title: "Ready to hand over",
    body: "Pass the phone to whoever is doing this one. The list is fixed now — it cannot be edited until afterwards, and that is the point.",
  },
  forExecutor: {
    title: "Here is what to do",
    body: "This list was written in advance. Follow it as it is — you do not need to check anything with anyone, and nothing here is a test.",
  },
  cannotDo: {
    label: "Something on the list is not possible today",
    body: "That is allowed and worth recording. Note it, carry on with the rest, and it can be talked about afterwards.",
  },
  done: "Done for now",
};
