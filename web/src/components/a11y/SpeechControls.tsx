"use client";

import { useId, useState } from "react";
import { useSettings } from "@/components/providers/SettingsProvider";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { SPEECH_RATES, type SpeechRate } from "@/lib/settings";
import { speechSupported } from "@/lib/speech";
import { resolveVoice, useVoices } from "./useReadAloud";

const SAMPLE = "This is how a page will sound when it is read to you.";

/**
 * Voices that ship with macOS as jokes or as long-obsolete synthesisers.
 *
 * The browser offers everything installed on the machine, which on a Mac means
 * a singing robot and a set of voices from the 1990s sitting next to the real
 * ones. None of them can read a page about anxiety without being either comic
 * or unintelligible, so they are hidden — with a way to show them again for
 * anyone who has a reason to want one.
 *
 * Matched on the bare name, before the "(English (United States))" suffix that
 * newer macOS versions append.
 */
const NOVELTY_VOICES = new Set(
  [
    // Sound effects rather than speech.
    "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Cellos", "Deranged",
    "Good News", "Hysterical", "Jester", "Organ", "Pipe Organ", "Superstar",
    "Trinoids", "Whisper", "Wobble", "Zarvox",
    // Legacy formant synthesisers, kept by Apple for compatibility.
    "Agnes", "Albert", "Bruce", "Fred", "Junior", "Kathy", "Princess",
    "Ralph", "Victoria",
  ].map((name) => name.toLowerCase()),
);

/** "Flo (English (United Kingdom))" → "flo" */
function bareName(voice: SpeechSynthesisVoice): string {
  return voice.name.replace(/\s*\(.*$/, "").trim().toLowerCase();
}

function isNovelty(voice: SpeechSynthesisVoice): boolean {
  return NOVELTY_VOICES.has(bareName(voice));
}

/**
 * Voice and speed, with a way to hear the result.
 *
 * A voice picker without a sample button is guesswork — the names browsers give
 * their voices say nothing about how they sound.
 */
export function SpeechControls() {
  const { settings, updateSettings } = useSettings();
  const voices = useVoices();
  const selectId = useId();
  const [showAll, setShowAll] = useState(false);

  if (!speechSupported()) {
    return (
      <p className="text-sm text-text-muted">
        This browser cannot read pages aloud, so the control will not appear.
        Recent versions of Chrome, Edge, Safari and Firefox all can.
      </p>
    );
  }

  // The written content is in English, and offering a hundred voices for
  // languages it is not written in makes the useful ones hard to find.
  const english = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  const usable = english.filter((voice) => !isNovelty(voice));

  // Falling back rather than showing an empty list: on a machine whose voices
  // are all filtered out, an unfiltered list beats no choice at all.
  const offered = showAll || usable.length === 0 ? english : usable;
  const hidden = english.length - usable.length;

  function preview() {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(SAMPLE);
    utterance.rate = SPEECH_RATES[settings.speechRate];
    const voice = resolveVoice(voices, settings.speechVoice);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="space-y-6">
      <ChoiceGroup<SpeechRate>
        legend="Speed"
        options={[
          { value: "slow", label: "Slower" },
          { value: "normal", label: "Normal" },
          { value: "fast", label: "Faster" },
        ]}
        value={settings.speechRate}
        onChange={(speechRate) => updateSettings({ speechRate })}
        columns={3}
      />

      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block font-medium text-text">
          Voice
        </label>
        <p className="text-sm text-text-muted">
          These come from your device, not from us, so the list differs between
          computers and phones.
        </p>
        <select
          id={selectId}
          value={settings.speechVoice}
          onChange={(event) => updateSettings({ speechVoice: event.target.value })}
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text hover:border-border-strong"
        >
          <option value="">Your browser&rsquo;s default voice</option>
          {offered.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
              {voice.localService ? " — on your device" : " — online"}
            </option>
          ))}
        </select>
        {offered.length === 0 ? (
          <p className="text-sm text-text-subtle">
            No voices have loaded yet. They sometimes arrive a moment after the
            page does — the default will work either way.
          </p>
        ) : null}

        {hidden > 0 ? (
          <label className="flex cursor-pointer items-center gap-2 pt-1 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(event) => setShowAll(event.target.checked)}
              className="h-4 w-4 shrink-0 accent-[var(--primary)]"
            />
            Show the {hidden} novelty and legacy {hidden === 1 ? "voice" : "voices"}{" "}
            your device also has
          </label>
        ) : null}
      </div>

      <Button variant="secondary" size="sm" onClick={preview}>
        <Icon name="speaker" size={16} />
        Hear a sample
      </Button>
    </div>
  );
}
