"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { speechSupported } from "@/lib/speech";

export type SpeechState = "idle" | "speaking" | "paused";

/**
 * The voices the browser can offer.
 *
 * They are not available synchronously on first load in most browsers — the
 * list arrives with a `voiceschanged` event — so this starts empty and fills
 * in. Anything reading it must cope with an empty list meaning "not yet",
 * not "none".
 */
export function useVoices(): SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!speechSupported()) return;

    const read = () => setVoices(window.speechSynthesis.getVoices());
    read();
    window.speechSynthesis.addEventListener("voiceschanged", read);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", read);
  }, []);

  return voices;
}

/** Picks the stored voice, falling back to the browser's own default. */
export function resolveVoice(
  voices: SpeechSynthesisVoice[],
  voiceURI: string,
): SpeechSynthesisVoice | null {
  if (!voiceURI) return null;
  return voices.find((voice) => voice.voiceURI === voiceURI) ?? null;
}

/**
 * Reads a list of utterances aloud, one after another.
 *
 * Speaks them sequentially rather than queueing the lot up front, so that
 * stopping takes effect immediately and the progress count means something.
 */
export function useReadAloud({ rate, voiceURI }: { rate: number; voiceURI: string }) {
  const [state, setState] = useState<SpeechState>("idle");
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const voices = useVoices();

  /**
   * Incremented every time a reading starts or stops. Events from a canceled
   * run still arrive afterwards, and without this they would restart the voice
   * or scramble the progress count.
   */
  const run = useRef(0);
  const pausedByUser = useRef(false);

  const supported = speechSupported();

  const stop = useCallback(() => {
    run.current += 1;
    pausedByUser.current = false;
    if (speechSupported()) window.speechSynthesis.cancel();
    setState("idle");
    setIndex(0);
  }, []);

  /**
   * Takes the lines to speak at the moment the button is pressed, rather than
   * holding them as state. What is on the page can change after it renders —
   * a dashboard filling in once its data loads — and the version that matters
   * is the one in front of the reader when they ask to hear it.
   */
  const start = useCallback((utterances: string[]) => {
    if (!speechSupported() || utterances.length === 0) return;

    run.current += 1;
    const token = run.current;
    pausedByUser.current = false;
    window.speechSynthesis.cancel();
    setState("speaking");
    setIndex(0);
    setTotal(utterances.length);

    const voice = resolveVoice(window.speechSynthesis.getVoices(), voiceURI);

    const speakAt = (position: number) => {
      if (token !== run.current) return;
      if (position >= utterances.length) {
        setState("idle");
        setIndex(0);
        return;
      }

      setIndex(position);
      const utterance = new SpeechSynthesisUtterance(utterances[position]);
      utterance.rate = rate;
      if (voice) utterance.voice = voice;

      utterance.onend = () => speakAt(position + 1);
      utterance.onerror = (event) => {
        // "interrupted" and "canceled" are what a deliberate stop looks like,
        // and are not worth surfacing as a failure.
        if (token !== run.current) return;
        if (event.error === "interrupted" || event.error === "canceled") return;
        setState("idle");
        setIndex(0);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakAt(0);
  }, [rate, voiceURI]);

  const pause = useCallback(() => {
    if (!speechSupported()) return;
    pausedByUser.current = true;
    window.speechSynthesis.pause();
    setState("paused");
  }, []);

  const resume = useCallback(() => {
    if (!speechSupported()) return;
    pausedByUser.current = false;
    window.speechSynthesis.resume();
    setState("speaking");
  }, []);

  // Speech is global to the tab and outlives React, so leaving the page has to
  // silence it explicitly — otherwise a voice carries on reading a page that
  // is no longer on screen.
  useEffect(() => stop, [stop]);

  /**
   * Chrome will sometimes leave the queue paused on its own, which strands a
   * reading part-way through with no way back except pressing play again. If
   * nobody asked for a pause, undo it.
   */
  useEffect(() => {
    if (state !== "speaking" || !speechSupported()) return;
    const timer = setInterval(() => {
      if (!pausedByUser.current && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [state]);

  return {
    supported,
    voices,
    state,
    /** Which utterance is being spoken, 1-based, for a progress readout. */
    position: index + 1,
    total,
    start,
    pause,
    resume,
    stop,
  };
}
