"use client";

import { useId } from "react";
import { RATING_MAX, RATING_MIN, Rating } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * The 0–10 slider used by every rating in the app.
 *
 * The current value is always shown as a number *and* announced through
 * aria-valuetext with its anchor labels, so the scale is usable without sight
 * of the track.
 */
export function RatingScale({
  label,
  help,
  lowLabel,
  highLabel,
  value,
  onChange,
  className,
}: {
  label: string;
  help?: string;
  lowLabel: string;
  highLabel: string;
  value: Rating;
  onChange: (value: Rating) => void;
  className?: string;
}) {
  const id = useId();
  const helpId = `${id}-help`;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-medium text-text">
          {label}
        </label>
        <span
          aria-hidden="true"
          className="rounded-full bg-primary-soft px-2.5 py-0.5 text-sm font-semibold tabular-nums text-primary"
        >
          {value}
        </span>
      </div>

      {help ? (
        <p id={helpId} className="text-sm text-text-muted">
          {help}
        </p>
      ) : null}

      <input
        id={id}
        type="range"
        min={RATING_MIN}
        max={RATING_MAX}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-describedby={help ? helpId : undefined}
        aria-valuetext={`${value} out of ${RATING_MAX}. ${lowLabel} to ${highLabel}.`}
      />

      <div className="flex justify-between text-xs text-text-subtle">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
