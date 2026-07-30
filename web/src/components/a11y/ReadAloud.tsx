"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSettings } from "@/components/providers/SettingsProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { SPEECH_RATES } from "@/lib/settings";
import { collectPageSpeech, estimateSpeechMinutes } from "@/lib/speech";
import { useReadAloud } from "./useReadAloud";

/** The element the collector reads from. Rendered by AppShell. */
const MAIN_SELECTOR = "#main";

/**
 * "Listen to this page", available on every page.
 *
 * Reads whatever the app itself is saying — headings, explanations,
 * instructions, written material — and never what a family has typed. See
 * lib/speech.ts for how that line is held, and components/a11y/Private.tsx for
 * how a component opts its content out.
 *
 * Renders nothing when the browser cannot speak, when the reader has turned it
 * off, or when there is nothing on the page worth hearing. A control that does
 * nothing when pressed is worse than no control.
 */
export function ReadAloud() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const [available, setAvailable] = useState(0);

  const rate = SPEECH_RATES[settings.speechRate];
  const { supported, state, position, total, start, pause, resume, stop } =
    useReadAloud({ rate, voiceURI: settings.speechVoice });

  const collect = useCallback(
    () => collectPageSpeech(document.querySelector<HTMLElement>(MAIN_SELECTOR)),
    [],
  );

  // Counted after paint so the estimate reflects a page that has finished
  // rendering, including one waiting on stored data. The real reading collects
  // again when the button is pressed, so a late change is never missed.
  useEffect(() => {
    stop();
    const timer = setTimeout(() => setAvailable(collect().length), 250);
    return () => clearTimeout(timer);
  }, [pathname, collect, stop]);

  if (!settings.readAloud || !supported || available === 0) return null;

  const minutes = estimateSpeechMinutes(
    // Estimating from the count alone would be wrong; this is cheap enough to
    // redo, and only runs while the control is idle.
    state === "idle" ? collect() : [],
    rate,
  );

  return (
    <div
      // Excluded from its own reading, or the voice would open by announcing
      // the button that started it.
      data-no-speech
      className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-sunken px-3 py-2"
    >
      {state === "idle" ? (
        <ControlButton onClick={() => start(collect())}>
          <Icon name="speaker" size={18} />
          Listen to this page
        </ControlButton>
      ) : (
        <>
          {state === "speaking" ? (
            <ControlButton onClick={pause}>
              <Icon name="pause" size={18} />
              Pause
            </ControlButton>
          ) : (
            <ControlButton onClick={resume}>
              <Icon name="speaker" size={18} />
              Continue
            </ControlButton>
          )}
          <ControlButton onClick={stop}>
            <Icon name="stop" size={18} />
            Stop
          </ControlButton>
        </>
      )}

      <p className="ml-auto text-sm text-text-subtle" aria-live="polite">
        {state === "idle"
          ? `About ${minutes} ${minutes === 1 ? "minute" : "minutes"}`
          : `Part ${position} of ${total}`}
      </p>
    </div>
  );
}

function ControlButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface",
        "px-3 py-1.5 text-sm font-medium text-text transition-colors",
        "hover:border-border-strong hover:bg-bg-subtle",
      )}
    >
      {children}
    </button>
  );
}
