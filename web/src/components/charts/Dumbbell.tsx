"use client";

import { RATING_MAX, RATING_MIN } from "@/lib/types";
import { cn } from "@/lib/cn";

export interface DumbbellRow {
  id: string;
  label: string;
  before: number;
  after: number;
}

/**
 * Before → after anxiety, one row per activity.
 *
 * The dumbbell is the right form for a paired change per item: it shows both
 * values and the size of the gap without needing two axes. Two shades of one
 * hue carry before/after, with a legend and direct value labels so the pairing
 * never depends on colour alone.
 */
export function Dumbbell({
  rows,
  className,
}: {
  rows: DumbbellRow[];
  className?: string;
}) {
  if (rows.length === 0) {
    return (
      <p className={cn("text-sm text-text-muted", className)}>
        Anxiety before and after will appear here once you have finished an activity.
      </p>
    );
  }

  const toPercent = (value: number) =>
    ((value - RATING_MIN) / (RATING_MAX - RATING_MIN)) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--chart-before)" }}
          />
          <span className="text-text-muted">Before</span>
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--chart-after)" }}
          />
          <span className="text-text-muted">After</span>
        </li>
      </ul>

      <ul className="space-y-3.5">
        {rows.map((row) => {
          const beforePercent = toPercent(row.before);
          const afterPercent = toPercent(row.after);
          const left = Math.min(beforePercent, afterPercent);
          const width = Math.abs(afterPercent - beforePercent);

          return (
            <li key={row.id} className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate text-text">{row.label}</span>
                <span className="shrink-0 tabular-nums text-text-muted">
                  {row.before} &rarr; {row.after}
                </span>
              </div>

              <div
                className="relative h-3"
                role="img"
                aria-label={`${row.label}: anxiety ${row.before} before, ${row.after} after, out of ${RATING_MAX}.`}
              >
                <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[var(--chart-grid)]" />
                <div
                  className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[var(--chart-axis)]"
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
                {/* 2px surface ring so the two markers stay readable where they
                    overlap on an unchanged score. */}
                <span
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--surface)]"
                  style={{
                    left: `${beforePercent}%`,
                    backgroundColor: "var(--chart-before)",
                  }}
                />
                <span
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--surface)]"
                  style={{
                    left: `${afterPercent}%`,
                    backgroundColor: "var(--chart-after)",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
