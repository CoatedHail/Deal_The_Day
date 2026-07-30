import { NextResponse } from "next/server";
import { db } from "@/db";
import { feedback } from "@/db/schema";
import { createId } from "@/lib/storage";
import { RATING_MAX, RATING_MIN } from "@/lib/types";

/**
 * Receives a card review.
 *
 * Open to anyone, signed in or not, and stores nothing that identifies the
 * sender — no user id, no IP, no session. A review is about the deck, not about
 * the family, so there is no reason to know who wrote it.
 *
 * Everything is validated and clamped here rather than trusted from the client,
 * since this endpoint is public.
 */

const DIFFICULTIES = ["too-easy", "about-right", "too-hard"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

/** Long enough for a real thought, short enough that nobody writes an essay. */
const MAX_TEXT = 2000;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Expected an object." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;

  const difficulty = DIFFICULTIES.includes(input.difficulty as Difficulty)
    ? (input.difficulty as Difficulty)
    : null;
  if (!difficulty) {
    return NextResponse.json({ error: "Missing difficulty." }, { status: 400 });
  }

  const ratingRaw = Number(input.rating);
  if (!Number.isFinite(ratingRaw)) {
    return NextResponse.json({ error: "Missing rating." }, { status: 400 });
  }
  const rating = Math.min(RATING_MAX, Math.max(RATING_MIN, Math.round(ratingRaw)));

  const cardNumberRaw = Number(input.cardNumber);
  const cardNumber =
    Number.isInteger(cardNumberRaw) && cardNumberRaw > 0 ? cardNumberRaw : null;

  try {
    await db.insert(feedback).values({
      id: createId(),
      submittedAt: new Date(),
      cardNumber,
      rating,
      difficulty,
      whatWorked: clean(input.whatWorked),
      whatDidNot: clean(input.whatDidNot),
      suggestion: clean(input.suggestion) || null,
    });
  } catch {
    // The client keeps its own copy either way, so a failure here loses the
    // send but not the family's record of what they wrote.
    return NextResponse.json({ error: "Could not save that." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
