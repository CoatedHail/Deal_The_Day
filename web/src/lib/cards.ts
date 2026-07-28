/**
 * Helpers for referring to cards in the physical deck.
 *
 * Every card is numbered, so the number is what the app stores and displays.
 * The printed wording is optional context, not the identifier.
 */

import type { PreActivityCheck } from "@/lib/types";

/**
 * The deck's real size is not settled yet, so no upper bound is enforced —
 * rejecting a valid card because of a guessed maximum would be worse than
 * accepting a typo. Update this to a range check once the deck is final.
 */
export function isValidCardNumber(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

/** Parses user input into a card number, or null if it is not usable. */
export function parseCardNumber(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return isValidCardNumber(parsed) ? parsed : null;
}

/** "Card 14" — the short form, for pills and dense lists. */
export function formatCardNumber(cardNumber?: number): string | null {
  return typeof cardNumber === "number" ? `Card ${cardNumber}` : null;
}

/**
 * The best available human label for a card.
 *
 * Falls back through number + title, then either alone, then a neutral
 * placeholder, so a partially filled entry never renders as an empty string.
 */
export function formatCardReference(pre: Pick<PreActivityCheck, "cardNumber" | "cardTitle">): string {
  const number = formatCardNumber(pre.cardNumber);
  const title = pre.cardTitle.trim();

  if (number && title) return `${number} · ${title}`;
  if (number) return number;
  if (title) return title;
  return "Untitled card";
}
