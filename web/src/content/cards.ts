import type { IdeaSlug } from "@/content/activity-ideas";
import type { ActivityCategory, CardLength } from "@/lib/types";

/**
 * The physical deck, as data.
 *
 * Two things about these cards drive everything built on top of them.
 *
 * First, a card names a *kind* of activity, not a specific one. The printed
 * card carries three blank ruled lines and the line "Need ideas? Check our
 * website!" — drawing "Baking" does not tell a family what to bake. Deciding
 * that is the family's job, and it is deliberately theirs: the card removes the
 * choice of *what sort of thing*, which is the part anxiety would otherwise
 * spend an afternoon optimizing.
 *
 * Second, length is an instruction about scale rather than a property of the
 * activity. "Hike/Walk" is twenty minutes or a whole day depending on what gets
 * written on the lines. So a card sits in one deck because that deck's card is
 * telling the family how big to make it, not because the activity is
 * inherently that size.
 *
 * Numbers match what is printed on the cards, and are the same identifier
 * stored as `cardNumber` on a `PreActivityCheck`, so a record made by typing
 * the number by hand and one made by drawing here are the same record.
 */
export interface DeckCard {
  /** The number printed in the corner. */
  number: number;
  /** The printed wording. */
  title: string;
  /**
   * The small print beside the title, expanding what the card is asking for.
   *
   * Only card 8 carries one on the current deck ("Tell a story — ex.
   * Experiences"). Modelled as its own field rather than folded into the title
   * so it can be set alongside rather than run into it.
   */
  example?: string;
  length: CardLength;
  /**
   * Which checklist this card belongs with.
   *
   * Not printed on the card — assigned here so a drawn card can carry the
   * family's pre-agreed checklist into the activity without them picking it.
   */
  category: ActivityCategory;
  /**
   * The ideas section this card's "Need ideas?" line points at.
   *
   * Kept separate from `category` rather than derived from it, because the two
   * answer different questions and genuinely disagree. "Board/Card Games" is a
   * `connection` card — that is the checklist a family wants for it — but the
   * useful ideas are in At-home activities, not Social activities. Deriving one
   * from the other would send half the deck somewhere unhelpful.
   *
   * Typed as the union of real slugs, so a card cannot name a section that does
   * not exist without failing the build.
   */
  ideas: IdeaSlug;
}

export const DECK_CARDS: readonly DeckCard[] = [
  { number: 1, title: "Board/Card Games", length: "medium", category: "connection", ideas: "at-home-activities" },
  { number: 2, title: "Arts and Crafts", length: "short", category: "creative", ideas: "arts-creativity" },
  { number: 3, title: "Baking", length: "medium", category: "food", ideas: "food-restaurants" },
  { number: 4, title: "Snack time!", length: "short", category: "food", ideas: "food-restaurants" },
  { number: 5, title: "Museum", length: "medium", category: "outing", ideas: "local-attractions" },
  { number: 6, title: "Beach/Lake/River", length: "long", category: "outdoors", ideas: "outdoor-activities" },
  { number: 7, title: "Reading/Writing", length: "short", category: "creative", ideas: "at-home-activities" },
  {
    number: 8,
    title: "Tell a story",
    example: "ex. Experiences",
    length: "short",
    category: "connection",
    ideas: "social-activities",
  },
  { number: 9, title: "Watch a Movie", length: "medium", category: "everyday", ideas: "at-home-activities" },
  { number: 10, title: "Restaurant/Take out", length: "medium", category: "food", ideas: "food-restaurants" },
  { number: 11, title: "Picnic day", length: "long", category: "outdoors", ideas: "outdoor-activities" },
  { number: 12, title: "Zoo/Aquarium", length: "long", category: "outing", ideas: "local-attractions" },
  { number: 13, title: "Theme Park", length: "long", category: "outing", ideas: "short-trips" },
  { number: 14, title: "Hike/Walk", length: "medium", category: "outdoors", ideas: "outdoor-activities" },
  { number: 15, title: "Co-Op Video Games", length: "short", category: "connection", ideas: "at-home-activities" },
  { number: 16, title: "Nature Photography", length: "medium", category: "outdoors", ideas: "outdoor-activities" },
  { number: 17, title: "Go to a Park", length: "medium", category: "outdoors", ideas: "outdoor-activities" },
  { number: 18, title: "Cooking", length: "medium", category: "food", ideas: "food-restaurants" },
  { number: 19, title: "Go to a Sports Game", length: "long", category: "outing", ideas: "local-attractions" },
  { number: 20, title: "See a Play", length: "long", category: "outing", ideas: "local-attractions" },
] as const;

/** The cards in one deck, in printed order. */
export function deckFor(length: CardLength): DeckCard[] {
  return DECK_CARDS.filter((card) => card.length === length);
}

export function findDeckCard(cardNumber: number): DeckCard | undefined {
  return DECK_CARDS.find((card) => card.number === cardNumber);
}

/**
 * A card drawn at random from one deck.
 *
 * `exclude` skips the card just drawn, so a redraw after putting one back
 * cannot hand back the same card and read as the app ignoring the request. It
 * is not a memory of the whole session: repeats across separate draws are how a
 * real deck behaves, and suppressing them would quietly turn the deck into a
 * checklist to complete.
 */
export function drawFrom(length: CardLength, exclude?: number): DeckCard | undefined {
  const cards = deckFor(length);
  const eligible =
    cards.length > 1 && exclude !== undefined
      ? cards.filter((card) => card.number !== exclude)
      : cards;

  if (eligible.length === 0) return undefined;
  return eligible[Math.floor(Math.random() * eligible.length)];
}
