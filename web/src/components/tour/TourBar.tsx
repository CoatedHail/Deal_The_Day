"use client";

import { useEffect, useRef } from "react";
import { useReadAloud } from "@/components/a11y/useReadAloud";
import { useSettings } from "@/components/providers/SettingsProvider";
import { useTour } from "@/components/tour/TourProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TOUR_COPY } from "@/content/tour";
import { SPEECH_RATES } from "@/lib/settings";

/**
 * The tour, as a panel at the top of the page.
 *
 * It sits in the page rather than floating over it. Docked to the bottom of the
 * window it covered whatever was down there — and on a phone it had to stack
 * above the nav bar as well, which left very little page showing. In the flow
 * it cannot cover anything, and it scrolls away while someone looks around,
 * which is the right behaviour for a thing that is commentary rather than
 * content.
 *
 * Being inside #main also means the page's own "Listen to this page" control
 * picks it up, on top of the step's own listen button.
 *
 * Non-modal throughout: nothing is trapped or blocked, so someone can stop
 * mid-step, try the thing being described, and carry on.
 */
export function TourBar() {
  const { active, index, step, total, next, back, stop } = useTour();
  const { settings } = useSettings();
  const headingRef = useRef<HTMLParagraphElement>(null);

  const speech = useReadAloud({
    rate: SPEECH_RATES[settings.speechRate],
    voiceURI: settings.speechVoice,
  });

  const isLast = index === total - 1;
  const { stop: stopSpeaking } = speech;

  // Move focus to the new step so a keyboard or screen-reader user lands on
  // what changed, and stop any reading of the step they just left.
  useEffect(() => {
    if (!active) return;
    stopSpeaking();
    headingRef.current?.focus();
  }, [active, index, stopSpeaking]);

  useEffect(() => {
    if (!active) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") stop();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [active, stop]);

  if (!active || !step) return null;

  const spoken = isLast ? `${step.body} ${TOUR_COPY.finished}` : step.body;

  return (
    <section
      aria-label="Site tour"
      className="mb-6 rounded-card border border-primary-border bg-primary-soft p-4 sm:p-5"
    >
      <div aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Step {index + 1} of {total}
        </p>
        <p
          ref={headingRef}
          tabIndex={-1}
          className="mt-1 text-lg font-semibold text-text focus:outline-none"
        >
          {step.title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">{spoken}</p>
      </div>

      {/* Excluded from the page reading so the voice does not announce its own
          buttons before it gets to the step. */}
      <div data-no-speech className="mt-4 flex flex-wrap items-center gap-2.5">
        <Button size="sm" onClick={isLast ? stop : next}>
          {isLast ? TOUR_COPY.finish : TOUR_COPY.next}
          {isLast ? null : <Icon name="arrow-right" size={16} />}
        </Button>
        <Button size="sm" variant="secondary" onClick={back} disabled={index === 0}>
          {TOUR_COPY.back}
        </Button>

        {settings.readAloud && speech.supported ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              speech.state === "idle"
                ? speech.start([step.title, spoken])
                : speech.stop()
            }
          >
            <Icon name={speech.state === "idle" ? "speaker" : "stop"} size={16} />
            {speech.state === "idle" ? TOUR_COPY.listen : TOUR_COPY.stopListening}
          </Button>
        ) : null}

        <Button size="sm" variant="quiet" onClick={stop} className="ml-auto">
          {TOUR_COPY.skip}
        </Button>
      </div>
    </section>
  );
}
