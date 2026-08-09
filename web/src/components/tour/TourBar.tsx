"use client";

import { useEffect, useRef } from "react";
import { useTour } from "@/components/tour/TourProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TOUR_COPY } from "@/content/tour";

/**
 * The tour, as a bar docked to the bottom of the window.
 *
 * A docked bar rather than the usual spotlight-with-a-cutout. Highlight
 * overlays have to know where every element is, break the moment a layout
 * changes, are miserable on a phone, and fight almost every accessibility
 * setting this site offers — dyslexia spacing, high contrast, reduced motion
 * and read-aloud all assume ordinary page content, not a canvas cutout.
 *
 * It is also deliberately non-modal. Nothing is trapped or blocked: the page
 * behind stays fully usable, so someone can wander off mid-tour, try the thing
 * being described, and carry on. A tour that holds you hostage is the wrong
 * shape for an app about loosening rigid sequences.
 */
export function TourBar() {
  const { active, index, step, total, next, back, stop } = useTour();
  const headingRef = useRef<HTMLParagraphElement>(null);

  const isLast = index === total - 1;

  // Move focus to the new step's heading so a keyboard or screen-reader user is
  // taken to what changed, rather than being left wherever they were.
  useEffect(() => {
    if (!active) return;
    headingRef.current?.focus();
  }, [active, index]);

  // Escape ends the tour, matching how the rest of the app's overlays behave.
  useEffect(() => {
    if (!active) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") stop();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [active, stop]);

  if (!active || !step) return null;

  return (
    <section
      aria-label="Site tour"
      // Clears the mobile bottom bar, sits flush on desktop where there is none.
      className="fixed inset-x-0 bottom-[3.75rem] z-40 border-t border-primary-border bg-primary-soft shadow-lg lg:bottom-0"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-10">
        <div aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Step {index + 1} of {total}
          </p>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="mt-1 text-base font-semibold text-text focus:outline-none sm:text-lg"
          >
            {step.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            {isLast ? `${step.body} ${TOUR_COPY.finished}` : step.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button size="sm" onClick={isLast ? stop : next}>
            {isLast ? TOUR_COPY.finish : TOUR_COPY.next}
            {isLast ? null : <Icon name="arrow-right" size={16} />}
          </Button>
          <Button size="sm" variant="secondary" onClick={back} disabled={index === 0}>
            {TOUR_COPY.back}
          </Button>
          <Button size="sm" variant="quiet" onClick={stop} className="ml-auto">
            {TOUR_COPY.skip}
          </Button>
        </div>
      </div>
    </section>
  );
}
