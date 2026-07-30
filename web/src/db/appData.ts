/**
 * Moves a household's record between the database and the `AppData` shape the
 * app works in.
 *
 * The whole record is read and written at once, mirroring the `DataRepository`
 * interface the client has always used. That is a deliberate choice for now:
 * a household's history is small — hundreds of rows at the outside — and one
 * honest round trip is easier to reason about than a set of per-entity
 * endpoints that have to be kept in step with every mutation in the provider.
 * If a family's record ever grows past a few thousand rows, this is the seam to
 * replace, and nothing outside this file needs to know.
 */

import { eq } from "drizzle-orm";
import type { BatchItem } from "drizzle-orm/batch";
import { db } from "@/db";
import {
  activities,
  categoryChecklists,
  checkIns,
  insights,
  scheduledSessions,
  users,
} from "@/db/schema";
import {
  ActivityEntry,
  AppData,
  CategoryChecklist,
  CheckIn,
  CURRENT_DATA_VERSION,
  SavedInsight,
  ScheduledSession,
} from "@/lib/types";

/**
 * Columns are nullable in Postgres where the domain type uses an optional
 * property, so every read has to turn `null` back into `undefined`. Doing it
 * through one helper keeps `undefined` out of the JSON the client receives,
 * where a `null` would survive serialization and an absent key would not.
 */
function optional<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}

export async function loadAppData(userId: string): Promise<AppData> {
  const [
    activityRows,
    checkInRows,
    sessionRows,
    insightRows,
    checklistRows,
  ] = await Promise.all([
    db.select().from(activities).where(eq(activities.userId, userId)),
    db.select().from(checkIns).where(eq(checkIns.userId, userId)),
    db.select().from(scheduledSessions).where(eq(scheduledSessions.userId, userId)),
    db.select().from(insights).where(eq(insights.userId, userId)),
    db.select().from(categoryChecklists).where(eq(categoryChecklists.userId, userId)),
  ]);

  const activityEntries: ActivityEntry[] = activityRows
    .map((row) => ({
      id: row.id,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      completedAt: row.completedAt?.toISOString(),
      pre: row.pre,
      post: optional(row.post),
      optOut: optional(row.optOut),
      checklistSnapshot: optional(row.checklistSnapshot),
      checklistCompleted: optional(row.checklistCompleted),
      executedBy: optional(row.executedBy),
    }))
    // Newest first, matching the order the provider maintains in memory.
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const checkInEntries: CheckIn[] = checkInRows
    .map((row) => ({
      id: row.id,
      recordedAt: row.recordedAt.toISOString(),
      ratings: row.ratings,
      note: optional(row.note),
      linkedActivityId: optional(row.linkedActivityId),
    }))
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));

  const sessionEntries: ScheduledSession[] = sessionRows
    .map((row) => ({
      id: row.id,
      date: row.date,
      time: optional(row.time),
      title: row.title,
      notes: optional(row.notes),
      reminderEnabled: row.reminderEnabled,
      fulfilledByActivityId: optional(row.fulfilledByActivityId),
      createdAt: row.createdAt.toISOString(),
    }))
    // Ascending by date: the calendar reads forwards, unlike the histories.
    .sort((a, b) => a.date.localeCompare(b.date));

  const insightEntries: SavedInsight[] = insightRows
    .map((row) => ({
      id: row.id,
      text: row.text,
      savedAt: row.savedAt.toISOString(),
      sourceActivityId: optional(row.sourceActivityId),
    }))
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));

  const checklistEntries: CategoryChecklist[] = checklistRows.map((row) => ({
    id: row.id,
    category: row.category,
    items: row.items,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    revisions: row.revisions,
  }));

  return {
    activities: activityEntries,
    checkIns: checkInEntries,
    sessions: sessionEntries,
    insights: insightEntries,
    // Card reviews are stored unlinked from any account, so a household's
    // record cannot contain them. The client keeps its own copy of what it
    // sent; see the `feedback` table for why.
    feedback: [],
    checklists: checklistEntries,
    version: CURRENT_DATA_VERSION,
  };
}

/**
 * Strips NUL bytes. JSON will happily carry one and Postgres `text` will not
 * accept it, so an entry containing one would fail the whole write.
 */
function safeText(value: string): string {
  return value.replace(/\0/g, "");
}

function toDate(iso: string): Date {
  const date = new Date(iso);
  // A malformed timestamp would otherwise be written as NULL and fail the
  // not-null constraint with a message that says nothing about which entry.
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

/**
 * Replaces everything stored for this user with `data`.
 *
 * Runs as a single batch, which Neon executes in one transaction. That matters:
 * these statements delete a family's history before writing it back, and a
 * partial failure part-way through would leave them with less than they had.
 */
export async function replaceAppData(userId: string, data: AppData): Promise<void> {
  const statements: BatchItem<"pg">[] = [
    db.delete(activities).where(eq(activities.userId, userId)),
    db.delete(checkIns).where(eq(checkIns.userId, userId)),
    db.delete(scheduledSessions).where(eq(scheduledSessions.userId, userId)),
    db.delete(insights).where(eq(insights.userId, userId)),
    db.delete(categoryChecklists).where(eq(categoryChecklists.userId, userId)),
  ];

  if (data.activities.length > 0) {
    statements.push(
      db.insert(activities).values(
        data.activities.map((entry) => ({
          id: entry.id,
          userId,
          status: entry.status,
          createdAt: toDate(entry.createdAt),
          updatedAt: toDate(entry.updatedAt),
          completedAt: entry.completedAt ? toDate(entry.completedAt) : null,
          pre: entry.pre,
          post: entry.post ?? null,
          optOut: entry.optOut ?? null,
          checklistSnapshot: entry.checklistSnapshot ?? null,
          checklistCompleted: entry.checklistCompleted ?? null,
          executedBy: entry.executedBy ? safeText(entry.executedBy) : null,
        })),
      ),
    );
  }

  if (data.checkIns.length > 0) {
    statements.push(
      db.insert(checkIns).values(
        data.checkIns.map((entry) => ({
          id: entry.id,
          userId,
          recordedAt: toDate(entry.recordedAt),
          ratings: entry.ratings,
          note: entry.note ? safeText(entry.note) : null,
          linkedActivityId: entry.linkedActivityId ?? null,
        })),
      ),
    );
  }

  if (data.sessions.length > 0) {
    statements.push(
      db.insert(scheduledSessions).values(
        data.sessions.map((entry) => ({
          id: entry.id,
          userId,
          date: entry.date,
          time: entry.time ?? null,
          title: safeText(entry.title),
          notes: entry.notes ? safeText(entry.notes) : null,
          reminderEnabled: entry.reminderEnabled,
          fulfilledByActivityId: entry.fulfilledByActivityId ?? null,
          createdAt: toDate(entry.createdAt),
        })),
      ),
    );
  }

  if (data.insights.length > 0) {
    statements.push(
      db.insert(insights).values(
        data.insights.map((entry) => ({
          id: entry.id,
          userId,
          text: safeText(entry.text),
          savedAt: toDate(entry.savedAt),
          sourceActivityId: entry.sourceActivityId ?? null,
        })),
      ),
    );
  }

  if (data.checklists.length > 0) {
    statements.push(
      db.insert(categoryChecklists).values(
        data.checklists.map((entry) => ({
          id: entry.id,
          userId,
          category: entry.category,
          items: entry.items,
          revisions: entry.revisions,
          createdAt: toDate(entry.createdAt),
          updatedAt: toDate(entry.updatedAt),
        })),
      ),
    );
  }

  // The cast is only about the tuple's non-emptiness, which the six deletes
  // above already guarantee.
  await db.batch(statements as [BatchItem<"pg">, ...BatchItem<"pg">[]]);
}

/**
 * Deletes the account and everything attached to it.
 *
 * One statement is enough because every user-scoped table declares
 * `onDelete: "cascade"` — including the Auth.js session and account rows, so
 * the person is signed out everywhere by the same delete. This is what the
 * privacy policy means by "removed from the database rather than hidden".
 */
export async function deleteAccount(userId: string): Promise<void> {
  await db.delete(users).where(eq(users.id, userId));
}
