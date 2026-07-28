"use client";

import { cn } from "@/lib/cn";

export interface ShareSegment {
  key: string;
  label: string;
  value: number;
  /** CSS custom property name holding this step's colour. */
  token: "--chart-ord-1" | "--chart-ord-2" | "--chart-ord-3";
}

/**
 * Part-to-whole bar for an ordered scale.
 *
 * The three buckets ("did not happen" → "happened") are ordinal, not nominal,
 * so they take one hue in monotone lightness steps rather than distinct hues —
 * the reader should see the order in the colour.
 *
 * Segments are separated by a 2px surface gap and every visible segment is
 * direct-labelled, so identity never rests on colour alone.
 */
export function OrdinalShareBar({
  segments,
  className,
}: {
  segments: ShareSegment[];
  className?: string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  if (total === 0) {
    return (
      <p className={cn("text-sm text-text-muted", className)}>
        Nothing recorded yet.
      </p>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className="flex h-8 w-full gap-0.5 overflow-hidden rounded-lg"
        role="img"
        aria-label={segments
          .map((segment) => `${segment.label}: ${segment.value} of ${total}`)
          .join("; ")}
      >
        {segments
          .filter((segment) => segment.value > 0)
          .map((segment) => (
            <div
              key={segment.key}
              className="flex items-center justify-center first:rounded-l-lg last:rounded-r-lg"
              style={{
                width: `${(segment.value / total) * 100}%`,
                backgroundColor: `var(${segment.token})`,
              }}
              title={`${segment.label}: ${segment.value}`}
            >
              {/* Only label in-place when the segment is wide enough to hold it;
                  the legend below carries the rest. */}
              {segment.value / total > 0.12 ? (
                <span className="text-xs font-semibold text-white tabular-nums">
                  {segment.value}
                </span>
              ) : null}
            </div>
          ))}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((segment) => (
          <li key={segment.key} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: `var(${segment.token})` }}
            />
            <span className="text-text-muted">{segment.label}</span>
            <span className="font-semibold tabular-nums text-text">{segment.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
