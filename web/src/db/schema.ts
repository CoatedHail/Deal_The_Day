/**
 * Database schema.
 *
 * Two groups of tables live here:
 *
 *  1. The four tables Auth.js requires (`users`, `accounts`, `sessions`,
 *     `verificationTokens`). Their column names are fixed by the adapter, which
 *     is why they use camelCase in the database where the rest do not.
 *
 *  2. The app's own tables, one per collection in `AppData`.
 *
 * The nested shapes (a pre-activity check, a set of check-in ratings) are
 * stored as `jsonb` rather than being flattened into columns. The domain types
 * in `lib/types.ts` are already plain serializable data and remain the single
 * source of truth for their shape; splitting them across columns would mean
 * maintaining the same structure in two places for no gain. Postgres can still
 * query inside jsonb if that is ever needed.
 *
 * Every app table carries `userId` with `onDelete: "cascade"`. Deleting a user
 * therefore erases their entire record in one statement, which is what the
 * privacy policy promises.
 */

import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import type {
  ActivityCategory,
  ActivityStatus,
  CheckInRatings,
  ChecklistItem,
  GameFeedback,
  OptOutRecord,
  PostActivityCheck,
  PreActivityCheck,
} from "@/lib/types";

/* ── Auth.js tables ─────────────────────────────────────────────────────────
   Shapes dictated by @auth/drizzle-adapter. Do not rename these columns. */

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (token) => [primaryKey({ columns: [token.identifier, token.token] })],
);

/* ── Application tables ─────────────────────────────────────────────────── */

export const activities = pgTable("activities", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status").$type<ActivityStatus>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  pre: jsonb("pre").$type<PreActivityCheck>().notNull(),
  post: jsonb("post").$type<PostActivityCheck>(),
  optOut: jsonb("opt_out").$type<OptOutRecord>(),
  // Copied from the category checklist at draw time rather than referenced, so
  // later edits to that checklist cannot rewrite what this entry says happened.
  checklistSnapshot: jsonb("checklist_snapshot").$type<ChecklistItem[]>(),
  checklistCompleted: jsonb("checklist_completed").$type<string[]>(),
  executedBy: text("executed_by"),
});

/**
 * One checklist per category, per user.
 *
 * `revisions` is recorded for a clinician export and is never surfaced to the
 * parent — a visible count of your own edits becomes a number to drive to zero.
 */
export const categoryChecklists = pgTable(
  "category_checklists",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: text("category").$type<ActivityCategory>().notNull(),
    items: jsonb("items").$type<ChecklistItem[]>().notNull(),
    revisions: integer("revisions").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  },
  (table) => [unique().on(table.userId, table.category)],
);

export const checkIns = pgTable("check_ins", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull(),
  ratings: jsonb("ratings").$type<CheckInRatings>().notNull(),
  note: text("note"),
  linkedActivityId: text("linked_activity_id"),
});

/** Sessions the family has scheduled. Unrelated to auth sessions above. */
export const scheduledSessions = pgTable("scheduled_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // Stored as a plain YYYY-MM-DD string, not a timestamp: "which day" is a
  // local calendar question and must not shift with timezone.
  date: text("date").notNull(),
  time: text("time"),
  title: text("title").notNull(),
  notes: text("notes"),
  reminderEnabled: boolean("reminder_enabled").notNull().default(false),
  fulfilledByActivityId: text("fulfilled_by_activity_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const therapistNotes = pgTable("therapist_notes", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  body: text("body").notNull(),
  linkedActivityId: text("linked_activity_id"),
});

export const insights = pgTable("insights", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  savedAt: timestamp("saved_at", { withTimezone: true }).notNull(),
  sourceActivityId: text("source_activity_id"),
});

/**
 * Reviews of cards in the physical deck.
 *
 * Deliberately not linked to a user. Improving a deck needs "card 14 averages
 * 4/10 and three families found it too big a step" — it never needs to know
 * which family said so. Storing these unlinked means the project team can read
 * them freely without that being a privacy question at all, and it is one less
 * pile of identifiable data to look after.
 *
 * Because there is no owner, there is nothing here to cascade on account
 * deletion, and nothing to delete on request — which is the point.
 */
export const feedback = pgTable("feedback", {
  id: text("id").primaryKey(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
  cardNumber: integer("card_number"),
  rating: smallint("rating").notNull(),
  difficulty: text("difficulty").$type<GameFeedback["difficulty"]>().notNull(),
  whatWorked: text("what_worked").notNull().default(""),
  whatDidNot: text("what_did_not").notNull().default(""),
  suggestion: text("suggestion"),
});
