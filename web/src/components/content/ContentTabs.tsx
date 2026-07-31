"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Parallel versions of the same material, one shown at a time.
 *
 * The panels arrive already rendered, as an array of nodes, because the blocks
 * inside them are built by a server component. Passing them in as a prop is
 * what lets a client component switch between server-rendered content.
 *
 * Only the open panel is in the DOM. Hiding the others with CSS would leave
 * them in the page's text, which would make read-aloud speak the version for a
 * seven-year-old and the version for a fifteen-year-old back to back.
 */
export function ContentTabs({
  labels,
  panels,
}: {
  labels: string[];
  panels: React.ReactNode[];
}) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div className="rounded-card border border-border bg-surface">
      <div
        role="tablist"
        aria-label="Versions"
        className="flex flex-wrap gap-1 border-b border-border p-2"
      >
        {labels.map((label, index) => {
          const selected = index === open;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${index}`}
              // Only the open tab is in the tab order; arrow keys move between
              // them, which is the expected behaviour for a tablist.
              tabIndex={selected ? 0 : -1}
              onClick={() => setOpen(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  setOpen((current) => (current + 1) % labels.length);
                } else if (event.key === "ArrowLeft") {
                  setOpen((current) => (current - 1 + labels.length) % labels.length);
                }
              }}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                selected
                  ? "bg-primary-soft text-primary"
                  : "text-text-muted hover:bg-bg-subtle hover:text-text",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-${open}`}
        aria-labelledby={`${id}-tab-${open}`}
        className="space-y-5 p-4 sm:p-5"
      >
        {panels[open]}
      </div>
    </div>
  );
}
