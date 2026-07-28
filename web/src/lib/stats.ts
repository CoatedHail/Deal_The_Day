import { addDays, startOfWeekKey, toDateKey } from "@/lib/date";
import {
  ActivityEntry,
  AppData,
  CHECK_IN_METRICS,
  CheckIn,
  CheckInMetricKey,
} from "@/lib/types";

/**
 * Derived progress figures.
 *
 * A note on framing: none of these numbers are presented as targets anywhere in
 * the UI. They exist so a parent can notice change over time, and so a
 * therapist can see homework at a glance — not to be optimised.
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

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}
