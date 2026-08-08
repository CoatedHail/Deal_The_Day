import { addDays, startOfWeekKey, toDateKey } from "@/lib/date";
import {
  ActivityCategory,
  ActivityEntry,
  AppData,
  CardLength,
  CHECK_IN_METRICS,
  CheckIn,
  CheckInMetricKey,
  OptOutRecord,
} from "@/lib/types";

/**
 * Derived progress figures.
 *
 * A note on framing: none of these numbers are presented as targets anywhere in
 * the UI. They exist so a parent can notice change over time, and so a
 * therapist can see homework at a glance — not to be optimized.
 */

export interface TrendPoint {
  date: string;
  value: number;
}

export interface MetricTrend {
  key: CheckInMetricKey;
  label: string;
  direction: "higher-is-better" | "lower-is-better";
  points: TrendPoint[];
  latest: number | null;
  average: number | null;
  /** Change from the first half of the window to the second. */
  change: number | null;
}

export function completedActivities(activities: ActivityEntry[]): ActivityEntry[] {
  return activities.filter((activity) => activity.status === "completed" && activity.post);
}

/**
 * Counts how often the feared outcome did not actually occur.
 *
 * This is the headline evidence a user accumulates against their own
 * predictions, which is why it gets its own summary rather than being buried in
 * the activity list.
 */
export function fearedOutcomeSummary(activities: ActivityEntry[]) {
  const completed = completedActivities(activities);
  const counts = { didNotHappen: 0, partly: 0, happened: 0 };

  for (const activity of completed) {
    switch (activity.post?.fearedOutcome) {
      case "did-not-happen":
        counts.didNotHappen += 1;
        break;
      case "partly-happened":
        counts.partly += 1;
        break;
      case "happened":
        counts.happened += 1;
        break;
    }
  }

  return { ...counts, total: completed.length };
}

/** Average anxiety before vs after, across activities that recorded both. */
export function anxietyShift(activities: ActivityEntry[]) {
  const withBoth = completedActivities(activities);
  if (withBoth.length === 0) return { before: null, after: null, delta: null };

  const before = mean(withBoth.map((activity) => activity.pre.anxiety));
  const after = mean(withBoth.map((activity) => activity.post!.anxietyAfter));

  return { before, after, delta: after - before };
}

/**
 * How often the user resisted a compulsion they had anticipated.
 *
 * Deliberately expressed as "resisted / anticipated" rather than a success
 * rate, so a low number reads as information rather than a grade.
 */
export function compulsionResistance(activities: ActivityEntry[]) {
  let anticipated = 0;
  let resisted = 0;

  for (const activity of completedActivities(activities)) {
    anticipated += activity.pre.temptedCompulsions.length;
    resisted += activity.post!.compulsionsResisted.length;
  }

  return { anticipated, resisted };
}

/**
 * Consecutive weeks containing at least one activity.
 *
 * Weekly rather than daily on purpose. A daily streak invites the exact
 * perfectionism and rule-following the game is trying to loosen, and losing one
 * can feel like proof of failure. Weeks are forgiving enough to stay
 * encouraging.
 */
export function weeklyStreak(activities: ActivityEntry[]): number {
  const engaged = activities.filter(
    (activity) => activity.status === "completed" || activity.status === "opted-out",
  );
  if (engaged.length === 0) return 0;

  const weeks = new Set(engaged.map((activity) => startOfWeekKey(activity.createdAt)));

  let streak = 0;
  let cursor = startOfWeekKey(new Date());

  // Allow the streak to still count if nothing has happened yet this week —
  // the week is not over, so it should not break anything.
  if (!weeks.has(cursor)) {
    cursor = addDays(cursor, -7);
    if (!weeks.has(cursor)) return 0;
  }

  while (weeks.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -7);
  }

  return streak;
}

/** Builds a per-metric trend series from check-ins, oldest first. */
export function metricTrends(checkIns: CheckIn[], limit = 30): MetricTrend[] {
  const ordered = [...checkIns]
    .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
    .slice(-limit);

  return CHECK_IN_METRICS.map((metric) => {
    const points: TrendPoint[] = ordered.map((checkIn) => ({
      date: toDateKey(checkIn.recordedAt),
      value: checkIn.ratings[metric.key],
    }));

    const values = points.map((point) => point.value);
    const half = Math.floor(values.length / 2);

    return {
      key: metric.key,
      label: metric.label,
      direction: metric.direction,
      points,
      latest: values.length ? values[values.length - 1] : null,
      average: values.length ? mean(values) : null,
      change:
        values.length >= 4
          ? mean(values.slice(half)) - mean(values.slice(0, half))
          : null,
    };
  });
}

export interface WeeklySummary {
  weekStart: string;
  activitiesCompleted: number;
  optOuts: number;
  checkIns: number;
  averageAnxiety: number | null;
  fearedOutcomesAvoided: number;
}

export function weeklySummaries(data: AppData, weeks = 8): WeeklySummary[] {
  const summaries = new Map<string, WeeklySummary>();

  // Seed the most recent N weeks so quiet weeks still appear, rather than the
  // chart silently skipping them and implying more activity than there was.
  let cursor = startOfWeekKey(new Date());
  for (let index = 0; index < weeks; index += 1) {
    summaries.set(cursor, {
      weekStart: cursor,
      activitiesCompleted: 0,
      optOuts: 0,
      checkIns: 0,
      averageAnxiety: null,
      fearedOutcomesAvoided: 0,
    });
    cursor = addDays(cursor, -7);
  }

  const anxietyByWeek = new Map<string, number[]>();

  for (const activity of data.activities) {
    const week = startOfWeekKey(activity.createdAt);
    const summary = summaries.get(week);
    if (!summary) continue;

    if (activity.status === "completed") {
      summary.activitiesCompleted += 1;
      if (activity.post?.fearedOutcome === "did-not-happen") {
        summary.fearedOutcomesAvoided += 1;
      }
    } else if (activity.status === "opted-out") {
      summary.optOuts += 1;
    }
  }

  for (const checkIn of data.checkIns) {
    const week = startOfWeekKey(checkIn.recordedAt);
    const summary = summaries.get(week);
    if (!summary) continue;
    summary.checkIns += 1;
    const bucket = anxietyByWeek.get(week) ?? [];
    bucket.push(checkIn.ratings.anxiety);
    anxietyByWeek.set(week, bucket);
  }

  for (const [week, values] of anxietyByWeek) {
    const summary = summaries.get(week);
    if (summary) summary.averageAnxiety = mean(values);
  }

  return [...summaries.values()].sort((a, b) => a.weekStart.localeCompare(b.weekStart));
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  earned: boolean;
}

/**
 * Encouraging milestones.
 *
 * Every badge rewards *engagement with uncertainty*, never streak length or
 * low anxiety scores — rewarding calmness would teach that anxiety is the
 * problem to be eliminated, which is the opposite of the ERP message.
 */
export function badges(data: AppData): Badge[] {
  const completed = completedActivities(data.activities);
  const resistance = compulsionResistance(data.activities);
  const outcomes = fearedOutcomeSummary(data.activities);
  const thoughtfulOptOuts = data.activities.filter(
    (activity) => activity.status === "opted-out" && activity.optOut?.reason,
  ).length;

  return [
    {
      id: "first-card",
      title: "First card drawn",
      description: "You started, without knowing how it would go.",
      earned: data.activities.length >= 1,
    },
    {
      id: "first-reflection",
      title: "Looked back",
      description: "You finished an activity and reflected on it afterwards.",
      earned: completed.length >= 1,
    },
    {
      id: "five-activities",
      title: "Five cards in",
      description: "Five activities completed as a family.",
      earned: completed.length >= 5,
    },
    {
      id: "prediction-tested",
      title: "Prediction tested",
      description: "You noticed a feared outcome that did not arrive.",
      earned: outcomes.didNotHappen >= 1,
    },
    {
      id: "urge-surfed",
      title: "Sat with the urge",
      description: "You resisted a compulsion you expected to give in to.",
      earned: resistance.resisted >= 1,
    },
    {
      id: "honest-opt-out",
      title: "Honest opt-out",
      description:
        "You used the safety valve and thought carefully about why. That counts too.",
      earned: thoughtfulOptOuts >= 1,
    },
    {
      id: "checked-in",
      title: "Checked in",
      description: "You recorded how you were feeling five times.",
      earned: data.checkIns.length >= 5,
    },
  ];
}

/**
 * How many cards a run needs before this app will claim anything has changed.
 *
 * Below this, a two-point line implies a finding that is not there. That
 * matters most early on, when a family is still deciding whether any of this is
 * worth continuing, so the change sections stay quiet rather than guess.
 *
 * Counted in cards, which is why it is separate from the four-check-in floor
 * `metricTrends` uses. The numbers happen to agree; the units do not.
 */
export const CHANGE_MIN_CARDS = 4;

export interface RunEntry {
  activity: ActivityEntry;
  /** 1-based position in the run. */
  ordinal: number;
}

/**
 * The cards a family has actually engaged with, oldest first.
 *
 * Progress is counted in cards played rather than days elapsed. Families play
 * irregularly — three cards one week, nothing for a month — so a calendar axis
 * reports the gaps instead of the change. Opt-outs count as part of the run,
 * because stepping back from a card is engagement with it, and because
 * `weeklyStreak` already draws the line in the same place.
 */
export function cardRun(activities: ActivityEntry[]): RunEntry[] {
  return [...activities]
    .filter((activity) => activity.status === "completed" || activity.status === "opted-out")
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((activity, index) => ({ activity, ordinal: index + 1 }));
}

export interface DisconfirmedFear {
  id: string;
  fear: string;
  at: string;
}

/**
 * Fears the family named beforehand that then did not arrive, most recent
 * first.
 *
 * Handed back in their own words rather than counted. A tally of
 * disconfirmations is a statistic about someone; their own sentence next to
 * "didn't happen" is the thing that actually argues with the prediction.
 */
export function disconfirmedFears(
  activities: ActivityEntry[],
  limit = 3,
): DisconfirmedFear[] {
  return completedActivities(activities)
    .filter(
      (activity) =>
        activity.post!.fearedOutcome === "did-not-happen" &&
        activity.pre.biggestFear.trim().length > 0,
    )
    .map((activity) => ({
      id: activity.id,
      fear: activity.pre.biggestFear.trim(),
      at: activity.completedAt ?? activity.createdAt,
    }))
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, limit);
}

/** Structurally a `DumbbellRow`, kept here so lib does not depend on components. */
export interface AnxietyRow {
  id: string;
  label: string;
  before: number;
  after: number;
}

/**
 * Anxiety before against after, one row per completed card, in play order.
 *
 * Labelled by position in the run, so gaps left by opted-out cards stay
 * visible rather than being quietly renumbered away.
 */
export function anxietyByOrdinal(activities: ActivityEntry[]): AnxietyRow[] {
  return cardRun(activities)
    .filter(({ activity }) => activity.status === "completed" && activity.post)
    .map(({ activity, ordinal }) => ({
      id: activity.id,
      label: `Card ${ordinal}`,
      before: activity.pre.anxiety,
      after: activity.post!.anxietyAfter,
    }));
}

export type LengthCounts = Record<CardLength, number>;

export interface LengthProgression {
  run: { ordinal: number; length: CardLength }[];
  earlier: LengthCounts;
  recent: LengthCounts;
  /** False until there are enough cards to compare the halves honestly. */
  comparable: boolean;
}

/**
 * Movement along the deck's own difficulty ladder.
 *
 * Short, medium and long are already ordered by how much uncertainty a card
 * asks a family to sit with, so the mix shifting upward is behaviour change
 * that nobody had to rate on a scale to produce.
 */
export function cardLengthProgression(activities: ActivityEntry[]): LengthProgression {
  const run = cardRun(activities)
    .filter(({ activity }) => activity.pre.cardLength)
    .map(({ activity, ordinal }) => ({ ordinal, length: activity.pre.cardLength! }));

  const tally = (entries: typeof run): LengthCounts => {
    const counts: LengthCounts = { short: 0, medium: 0, long: 0 };
    for (const entry of entries) counts[entry.length] += 1;
    return counts;
  };

  const half = Math.floor(run.length / 2);

  return {
    run,
    earlier: tally(run.slice(0, half)),
    recent: tally(run.slice(half)),
    comparable: run.length >= CHANGE_MIN_CARDS,
  };
}

export type ConcernNature = OptOutRecord["natureOfConcern"];

export interface OptOutBreakdown {
  counts: Record<ConcernNature, number>;
  total: number;
}

/**
 * Opt-outs split by what the family judged was actually going on.
 *
 * A mix shifting from anxiety-driven toward practical safety means someone is
 * learning to tell the two apart, which is why this is reported at all. It is
 * never framed as a count of failures.
 */
export function optOutBreakdown(activities: ActivityEntry[]): OptOutBreakdown {
  const counts: Record<ConcernNature, number> = {
    "practical-safety": 0,
    "genuinely-impossible": 0,
    "anxiety-driven": 0,
    unsure: 0,
  };
  let total = 0;

  for (const activity of activities) {
    const nature = activity.optOut?.natureOfConcern;
    if (!nature) continue;
    counts[nature] += 1;
    total += 1;
  }

  return { counts, total };
}

export interface CompulsionCount {
  /** The first spelling seen, so a family reads back their own words. */
  label: string;
  tempted: number;
  resisted: number;
}

/**
 * The compulsions that come up most often, tempted against resisted.
 *
 * These arrive as free text from a tag input, so "Checking the forecast" and
 * "checking the forecast  " are the same pull and have to be counted as one.
 * Matching is done on a normalised key while the original wording is what gets
 * displayed.
 */
export function compulsionTally(
  activities: ActivityEntry[],
  limit = 6,
): CompulsionCount[] {
  const byKey = new Map<string, CompulsionCount>();

  const bump = (raw: string, field: "tempted" | "resisted") => {
    const label = raw.trim().replace(/\s+/g, " ");
    if (!label) return;
    const key = label.toLowerCase();
    const entry = byKey.get(key) ?? { label, tempted: 0, resisted: 0 };
    entry[field] += 1;
    byKey.set(key, entry);
  };

  for (const activity of completedActivities(activities)) {
    for (const name of activity.pre.temptedCompulsions) bump(name, "tempted");
    for (const name of activity.post!.compulsionsResisted) bump(name, "resisted");
  }

  return [...byKey.values()]
    .sort((a, b) => b.tempted - a.tempted || b.resisted - a.resisted)
    .slice(0, limit);
}

export interface CategoryCount {
  category: ActivityCategory;
  count: number;
}

/**
 * Which kinds of activity a family has taken on.
 *
 * Reported as where they have been, never as gaps to fill: a list of untouched
 * categories reads as a completion checklist, which is the shape of thinking
 * this game exists to loosen.
 */
export function categoryCoverage(activities: ActivityEntry[]): CategoryCount[] {
  const counts = new Map<ActivityCategory, number>();

  for (const { activity } of cardRun(activities)) {
    const category = activity.pre.cardCategory;
    if (!category) continue;
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}
