"use client";

import { useState } from "react";
import { WeeklySummary } from "@/lib/stats";
import { formatDate, parseDateKey } from "@/lib/date";
import { cn } from "@/lib/cn";

/**
 * Weekly activity counts.
 *
 * Nominal bars all wear the same single-series color — coloring them by value
 * would spend the identity channel re-encoding what bar height already shows.
 */
export function WeeklyBars({
  summaries,
  className,
}: {
  summaries: WeeklySummary[];
  className?: string;
}) {
  const [activeWeek, setActiveWeek] = useState<string | null>(null);

  const max = Math.max(1, ...summaries.map((summary) => summary.activitiesCompleted));
  const active = summaries.find((summary) => summary.weekStart === activeWeek) ?? null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex h-32 items-end gap-1.5" role="img" aria-label={ariaSummary(summaries)}>
        {summaries.map((summary) => {
          const ratio = summary.activitiesCompleted / max;
          const isActive = summary.weekStart === activeWeek;
          return (
            <button
              key={summary.weekStart}
              type="button"
              // A generous hit target: the visible bar can be only a few pixels
              // tall on a quiet week.
              className="group relative flex h-full flex-1 cursor-default flex-col justify-end"
              onPointerEnter={() => setActiveWeek(summary.weekStart)}
              onPointerLeave={() => setActiveWeek(null)}
              onFocus={() => setActiveWeek(summary.weekStart)}
              onBlur={() => setActiveWeek(null)}
              aria-label={`Week of ${formatDate(parseDateKey(summary.weekStart))}: ${
                summary.activitiesCompleted
              } completed`}
            >
              <span
                className={cn(
                  "w-full rounded-t transition-opacity",
                  isActive ? "opacity-100" : "opacity-85",
                )}
                style={{
                  height: `${Math.max(ratio * 100, summary.activitiesCompleted > 0 ? 6 : 2)}%`,
                  backgroundColor:
                    summary.activitiesCompleted > 0
                      ? "var(--chart-mark)"
                      : "var(--chart-grid)",
                }}
              />
            </button>
          );
        })}
      </div>

      <div className="flex min-h-5 items-center justify-between text-xs text-text-subtle">
        {active ? (
          <span className="text-text" role="status">
            Week of {formatDate(parseDateKey(active.weekStart))} ·{" "}
            <strong className="tabular-nums">{active.activitiesCompleted}</strong> completed
            {active.optOuts > 0 ? `, ${active.optOuts} opted out` : ""}
          </span>
        ) : (
          <>
            <span>
              {summaries.length > 0
                ? formatDate(parseDateKey(summaries[0].weekStart))
                : ""}
            </span>
            <span>This week</span>
          </>
        )}
      </div>
    </div>
  );
}

function ariaSummary(summaries: WeeklySummary[]): string {
  const total = summaries.reduce((sum, summary) => sum + summary.activitiesCompleted, 0);
  return `Activities completed per week over the last ${summaries.length} weeks, ${total} in total.`;
}
