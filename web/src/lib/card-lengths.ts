import type { CardLength } from "@/lib/types";

export interface CardLengthDefinition {
  id: CardLength;
  label: string;
  title: string;
  image: string;
  summary: string;
  examples: readonly string[];
  planningNote: string;
}

export const CARD_LENGTHS: readonly CardLengthDefinition[] = [
  {
    id: "short",
    label: "Short",
    title: "Short Length Activity",
    image: "/cards/short-length-card.webp",
    summary:
      "Choose something that fits into a small part of the day and leaves room for an ordinary change of plan.",
    examples: ["a quick errand", "a snack stop", "a short walk", "one activity at home"],
    planningNote:
      "Short describes the general size of the activity, not a deadline. Let the person planning choose the exact details.",
  },
  {
    id: "medium",
    label: "Medium",
    title: "Medium Length Activity",
    image: "/cards/medium-length-card.webp",
    summary:
      "Set aside a meaningful block of time without making the activity the entire day.",
    examples: ["a meal out", "a local attraction", "a creative project", "a longer neighborhood outing"],
    planningNote:
      "The planner can combine a few simple parts. The parent practices not needing every transition decided in advance.",
  },
  {
    id: "long",
    label: "Long",
    title: "Long Activity",
    image: "/cards/long-length-card.webp",
    summary:
      "Choose an activity that takes most of a day or involves more travel, waiting, or transitions.",
    examples: ["a day trip", "a festival", "a longer hike", "visiting another town"],
    planningNote:
      "Longer activities naturally create more unknowns. Agree on real safety needs, then allow the planner to handle the rest.",
  },
] as const;

export const CARD_LENGTH_BY_ID = Object.fromEntries(
  CARD_LENGTHS.map((card) => [card.id, card]),
) as Record<CardLength, CardLengthDefinition>;

export function isCardLength(value: unknown): value is CardLength {
  return value === "short" || value === "medium" || value === "long";
}
