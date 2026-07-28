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
import { formatDate } from "@/lib/date";
import { ActivityEntry, FEARED_OUTCOME_LABELS } from "@/lib/types";

type Filter = "all" | "open" | "completed" | "opted-out";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Still open" },
  { value: "completed", label: "Completed" },
  { value: "opted-out", label: "Stepped back" },
];

function matches(activity: ActivityEntry, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "open") return activity.status === "awaiting-reflection";
  return activity.status === filter;
}

function ActivityRow({ activity }: { activity: ActivityEntry }) {
  const { pre, post } = activity;
  const awaiting = activity.status === "awaiting-reflection";

  return (
    <Card as="li" className="transition-colors hover:border-border-strong">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/activity/${activity.id}`}
          className="font-semibold text-text underline-offset-2 hover:underline"
        >
          {formatCardReference(pre)}
        </Link>
        {activity.status === "completed" ? (
          <Pill tone="success">Completed</Pill>
        ) : activity.status === "opted-out" ? (
          <Pill tone="caution">Stepped back</Pill>
        ) : (
          <Pill tone="info">Needs reflection</Pill>
        )}
        <span className="ml-auto text-sm text-text-subtle">
          {formatDate(activity.createdAt)}
        </span>
      </div>

      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="font-medium text-text-muted">Expected</p>
          <p className="mt-0.5 line-clamp-3 leading-relaxed text-text">
            {pre.predictedOutcome}
          </p>
        </div>
        <div>
          <p className="font-medium text-text-muted">
            {post ? "Happened" : "Not recorded yet"}
          </p>
          {post ? (
            <p className="mt-0.5 line-clamp-3 leading-relaxed text-text">
              {post.whatHappened}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1.5 text-text-muted">
          Anxiety
          <span className="font-semibold tabular-nums text-text">{pre.anxiety}</span>
          {post ? (
            <>
              <Icon name="arrow-right" size={15} className="text-text-subtle" />
              <span className="font-semibold tabular-nums text-text">
                {post.anxietyAfter}
              </span>
            </>
          ) : null}
        </span>
        {post ? <Pill>{FEARED_OUTCOME_LABELS[post.fearedOutcome]}</Pill> : null}
        {awaiting ? (
          <Link
            href={`/activity/${activity.id}/reflect`}
            className="ml-auto font-medium text-primary underline"
          >
            Record what happened
          </Link>
        ) : null}
      </div>
    </Card>
  );
}

export function ActivityList() {
  const { data, ready } = useData();
  const [filter, setFilter] = useState<Filter>("all");

  const activities = useMemo(() => {
    return [...data.activities]
      .filter((activity) => matches(activity, filter))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [data.activities, filter]);

  if (!ready) {
    return (
      <p className="text-text-muted" role="status">
        Loading…
      </p>
    );
  }

  if (data.activities.length === 0) {
    return (
      <EmptyState
        title="No cards yet"
        description="Draw a card from the deck, then record what you think will happen before you set off."
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
    <div className="space-y-5">
      <div role="group" aria-label="Filter activities" className="flex flex-wrap gap-2">
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

      {activities.length === 0 ? (
        <EmptyState title="Nothing here" description="Try a different filter." />
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </ul>
      )}
    </div>
  );
}
