"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useData } from "@/components/providers/DataProvider";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { formatCardReference } from "@/lib/cards";
import { cn } from "@/lib/cn";
import { formatDate, formatTime, toDateKey } from "@/lib/date";
import {
  ActivityEntry,
  CHECK_IN_METRICS,
  CheckIn,
  FEARED_OUTCOME_LABELS,
} from "@/lib/types";

/**
 * One thing that happened, of whatever kind.
 *
 * Activities and check-ins are recorded separately but read as one story, so
 * this flattens them into a single time-ordered list rather than making someone
 * reconstruct the sequence across two pages.
 */
type JournalEntry =
  | { kind: "activity"; at: string; activity: ActivityEntry }
  | { kind: "check-in"; at: string; checkIn: CheckIn };

/**
 * One flat set of filters covering both dimensions of the record.
 *
 * Cards and check-ins used to live on separate pages with separate filters —
 * one by kind, one by how far through a card you were. Merged, a nested filter
 * would be more faithful and much worse to use, so the two sets are flattened
 * into a single row of pills.
 */
type Filter = "all" | "activity" | "open" | "completed" | "opted-out" | "check-in";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "activity", label: "Cards" },
  { value: "open", label: "Still open" },
  { value: "completed", label: "Completed" },
  { value: "opted-out", label: "Stepped back" },
  { value: "check-in", label: "Check-ins" },
];

function matches(entry: JournalEntry, filter: Filter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "check-in":
      return entry.kind === "check-in";
    case "activity":
      return entry.kind === "activity";
    case "open":
      return entry.kind === "activity" && entry.activity.status === "awaiting-reflection";
    default:
      return entry.kind === "activity" && entry.activity.status === filter;
  }
}

function activityTimestamp(activity: ActivityEntry): string {
  return activity.completedAt ?? activity.optOut?.recordedAt ?? activity.createdAt;
}

function ActivityCard({ activity }: { activity: ActivityEntry }) {
  const { pre, post, optOut } = activity;

  return (
    <Card as="article" className="border-l-4 border-l-primary">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-text">{formatCardReference(pre)}</h3>
        {activity.status === "completed" ? (
          <Pill tone="success">Completed</Pill>
        ) : activity.status === "opted-out" ? (
          <Pill tone="caution">Safety valve used</Pill>
        ) : (
          <Pill tone="info">Awaiting reflection</Pill>
        )}
        <span className="ml-auto text-sm text-text-subtle">
          {formatTime(activityTimestamp(activity))}
        </span>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-medium text-text-muted">Beforehand, you expected</dt>
          <dd className="mt-0.5 leading-relaxed text-text">
            {pre.predictedOutcome || "Not recorded"}
          </dd>
        </div>

        {pre.biggestFear ? (
          <div>
            <dt className="font-medium text-text-muted">Most worried about</dt>
            <dd className="mt-0.5 leading-relaxed text-text">{pre.biggestFear}</dd>
          </div>
        ) : null}

        {post ? (
          <>
            <div>
              <dt className="font-medium text-text-muted">What actually happened</dt>
              <dd className="mt-0.5 leading-relaxed text-text">
                {post.whatHappened || "Not recorded"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-text-muted">The thing you feared</dt>
              <dd className="mt-0.5 leading-relaxed text-text">
                {FEARED_OUTCOME_LABELS[post.fearedOutcome]}
              </dd>
            </div>
            {post.reflection ? (
              <div>
                <dt className="font-medium text-text-muted">Reflection</dt>
                <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-text">
                  {post.reflection}
                </dd>
              </div>
            ) : null}
          </>
        ) : null}

        {optOut ? (
          <div>
            <dt className="font-medium text-text-muted">Why you stepped back</dt>
            <dd className="mt-0.5 leading-relaxed text-text">{optOut.reason}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 text-text-muted">
          Anxiety before
          <span className="font-semibold tabular-nums text-text">{pre.anxiety}</span>
        </span>
        {post ? (
          <>
            <Icon name="arrow-right" size={16} className="text-text-subtle" />
            <span className="inline-flex items-center gap-1.5 text-text-muted">
              after
              <span className="font-semibold tabular-nums text-text">
                {post.anxietyAfter}
              </span>
            </span>
          </>
        ) : null}
        <Link
          href={`/activity/${activity.id}`}
          className="ml-auto font-medium text-primary underline"
        >
          Open
        </Link>
      </div>
    </Card>
  );
}

function CheckInCard({ checkIn }: { checkIn: CheckIn }) {
  return (
    <Card as="article" className="border-l-4 border-l-info">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-text">Check-in</h3>
        {checkIn.linkedActivityId ? <Pill tone="primary">Alongside a card</Pill> : null}
        <span className="ml-auto text-sm text-text-subtle">
          {formatTime(checkIn.recordedAt)}
        </span>
      </div>

      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {CHECK_IN_METRICS.map((metric) => (
          <li key={metric.key} className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-text-muted">{metric.label}</span>
            <span className="font-semibold tabular-nums text-text">
              {checkIn.ratings[metric.key]}
            </span>
          </li>
        ))}
      </ul>

      {checkIn.note ? (
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-text">
          {checkIn.note}
        </p>
      ) : null}
    </Card>
  );
}

export function ActivityTimeline() {
  const { data, ready } = useData();
  const [filter, setFilter] = useState<Filter>("all");

  const grouped = useMemo(() => {
    const entries: JournalEntry[] = [
      ...data.activities.map((activity) => ({
        kind: "activity" as const,
        at: activityTimestamp(activity),
        activity,
      })),
      ...data.checkIns.map((checkIn) => ({
        kind: "check-in" as const,
        at: checkIn.recordedAt,
        checkIn,
      })),
    ].filter((entry) => matches(entry, filter));

    entries.sort((a, b) => b.at.localeCompare(a.at));

    const days = new Map<string, JournalEntry[]>();
    for (const entry of entries) {
      const key = toDateKey(entry.at);
      const bucket = days.get(key);
      if (bucket) bucket.push(entry);
      else days.set(key, [entry]);
    }
    return [...days.entries()];
  }, [data.activities, data.checkIns, filter]);

  const totalEntries = data.activities.length + data.checkIns.length;

  if (!ready) {
    return (
      <p className="text-text-muted" role="status">
        Loading your record…
      </p>
    );
  }

  if (totalEntries === 0) {
    return (
      <EmptyState
        title="Nothing written down yet"
        description="Once you work through a card or take a check-in, everything you record will collect here in order."
        action={
          <ButtonLink href="/activity/new">
            <Icon name="plus" size={18} />
            Start a card
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div
        role="group"
        aria-label="Filter entries"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((option) => {
          const active = option.value === filter;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-surface text-text-muted hover:border-border-strong hover:text-text",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {grouped.length === 0 ? (
        <EmptyState
          title="Nothing of that kind yet"
          description="Try a different filter."
        />
      ) : (
        grouped.map(([dateKey, entries]) => (
          <section key={dateKey} aria-labelledby={`day-${dateKey}`} className="space-y-3">
            <h2
              id={`day-${dateKey}`}
              className="sticky top-0 z-10 -mx-1 bg-bg/90 px-1 py-2 text-sm font-semibold text-text-muted backdrop-blur"
            >
              {formatDate(entries[0].at, "long")}
            </h2>
            {entries.map((entry) =>
              entry.kind === "activity" ? (
                <ActivityCard key={entry.activity.id} activity={entry.activity} />
              ) : (
                <CheckInCard key={entry.checkIn.id} checkIn={entry.checkIn} />
              ),
            )}
          </section>
        ))
      )}
    </div>
  );
}
