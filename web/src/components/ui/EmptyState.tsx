import { cn } from "@/lib/cn";

/**
 * Shown wherever there is no data yet.
 *
 * The copy passed in should be warm and low-pressure — an empty history is a
 * normal starting point, not a gap to be filled.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-dashed border-border bg-surface-sunken px-5 py-10 text-center",
        className,
      )}
    >
      <p className="font-medium text-text">{title}</p>
      {description ? (
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
