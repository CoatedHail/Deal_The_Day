"use client";

import { useMemo } from "react";
import { useSettings } from "@/components/providers/SettingsProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { SPEECH_RATES } from "@/lib/settings";
import { articleToSpeech, estimateSpeechMinutes } from "@/lib/speech";
import type { Article } from "@/content/types";
import { useReadAloud } from "./useReadAloud";

/**
 * "Listen to this page" for written content.
 *
 * Renders nothing at all when there is nothing worth reading, when the browser
 * cannot speak, or when the reader has turned it off — an inert control that
 * does nothing when pressed is worse than no control.
 *
 * See lib/speech.ts for why this is only ever attached to published content and
 * never to a family's own entries.
 */
export function ReadAloud({ article }: { article: Article }) {
  const { settings } = useSettings();

  // Memoised on the article's identity: the hook stops the voice whenever the
  // text changes, and a freshly built list on every render would keep cutting
  // the reading off.
  const utterances = useMemo(() => articleToSpeech(article), [article]);

  const rate = SPEECH_RATES[settings.speechRate];
  const { supported, state, position, total, start, pause, resume, stop } =
    useReadAloud({ utterances, rate, voiceURI: settings.speechVoice });

  if (!settings.readAloud || !supported || utterances.length === 0) return null;

  const minutes = estimateSpeechMinutes(utterances, rate);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-sunken px-3 py-2">
      {state === "idle" ? (
        <ControlButton onClick={start}>
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
