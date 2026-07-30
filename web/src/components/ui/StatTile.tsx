import { cn } from "@/lib/cn";

/**
 * A single headline number.
 *
 * Used instead of one-bar charts across the dashboards. Deliberately has no
 * target, goal or "vs last week" framing — the number is there to be noticed,
 * not to be beaten.
 */
export function StatTile({
  label,
  value,
  caption,
  className,
}: {
  label: string;
  value: React.ReactNode;
  caption?: string;
  className?: string;
}) {
  // Spoken as one sentence. Read tag by tag it comes out as a label, then a
  // bare number, then an orphaned caption — which is exactly the reading a
  // stat tile's layout exists to avoid.
  const spoken =
    typeof value === "string" || typeof value === "number"
      ? [`${label}: ${value}`, caption].filter(Boolean).join(". ")
      : undefined;

  return (
    <div
      data-speech={spoken}
      className={cn("rounded-card border border-border bg-surface p-4", className)}
    >
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums text-text">{value}</p>
      {caption ? <p className="mt-1 text-xs text-text-subtle">{caption}</p> : null}
    </div>
  );
}
