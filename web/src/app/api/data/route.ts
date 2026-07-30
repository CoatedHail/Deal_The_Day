import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { loadAppData, replaceAppData } from "@/db/appData";
import { AppData, CURRENT_DATA_VERSION, EMPTY_APP_DATA } from "@/lib/types";

/**
 * A signed-in household's own record.
 *
 * GET returns everything; PUT replaces everything. Both are scoped to the user
 * id on the server session, never to anything the request carries — so there is
 * no id to tamper with and no way to ask for someone else's record.
 */

export const dynamic = "force-dynamic";

/**
 * Generous, but not unbounded. A real household's whole history is a few tens
 * of kilobytes; a payload orders of magnitude past that is a bug or an abuse,
 * and either way should not reach the database.
 */
const MAX_BODY_CHARS = 2_000_000;

const MAX_ENTRIES_PER_COLLECTION = 10_000;

class InvalidPayload extends Error {}

function requireArray(value: unknown, name: string): unknown[] {
  if (!Array.isArray(value)) throw new InvalidPayload(`${name} must be an array.`);
  if (value.length > MAX_ENTRIES_PER_COLLECTION) {
    throw new InvalidPayload(`${name} has too many entries.`);
  }
  return value;
}

function requireId(entry: unknown, name: string): void {
  if (typeof entry !== "object" || entry === null) {
    throw new InvalidPayload(`${name} contains something that is not an entry.`);
  }
  const id = (entry as { id?: unknown }).id;
  if (typeof id !== "string" || id.length === 0 || id.length > 128) {
    throw new InvalidPayload(`${name} contains an entry with no usable id.`);
  }
}

/**
 * Checks the shape well enough to write it, and no further.
 *
 * Deliberately does not silently drop entries it dislikes: this is someone's
 * own record coming back from our own client, so a malformed entry means a bug,
 * and failing the whole request makes that visible instead of quietly losing a
 * reflection somebody wrote.
 */
function validate(body: unknown): AppData {
  if (typeof body !== "object" || body === null) {
    throw new InvalidPayload("Expected an object.");
  }
  const input = body as Record<string, unknown>;

  const collections = {
    activities: requireArray(input.activities, "activities"),
    checkIns: requireArray(input.checkIns, "checkIns"),
    sessions: requireArray(input.sessions, "sessions"),
    therapistNotes: requireArray(input.therapistNotes, "therapistNotes"),
    insights: requireArray(input.insights, "insights"),
    checklists: requireArray(input.checklists, "checklists"),
  };

  for (const [name, entries] of Object.entries(collections)) {
    for (const entry of entries) requireId(entry, name);
  }

  return {
    ...EMPTY_APP_DATA,
    ...(collections as unknown as Omit<AppData, "feedback" | "version">),
    // Card reviews are never stored against an account, so whatever the client
    // sends here is ignored rather than written.
    feedback: [],
    version: CURRENT_DATA_VERSION,
  };
}

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    return NextResponse.json(await loadAppData(userId));
  } catch {
    // The client falls back to what it already has in memory rather than
    // showing an empty history, which would look like data loss.
    return NextResponse.json({ error: "Could not read your record." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return NextResponse.json({ error: "That is too large to store." }, { status: 413 });
  }

  let data: AppData;
  try {
    data = validate(JSON.parse(raw));
  } catch (error) {
    const message =
      error instanceof InvalidPayload ? error.message : "Expected JSON.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    await replaceAppData(userId, data);
  } catch {
    return NextResponse.json({ error: "Could not save that." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
