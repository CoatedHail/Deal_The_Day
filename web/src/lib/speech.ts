/**
 * Turning written content into something a browser can read aloud.
 *
 * ── What this is for ────────────────────────────────────────────────────────
 * Not a replacement for a screen reader. Someone who uses VoiceOver or NVDA
 * already has a far better one, and the site is built to work properly with it.
 * This is for the larger group who can see the page but find reading it hard
 * work — dyslexia, fatigue, an anxious head that will not hold a paragraph —
 * and who would otherwise skip the explainers entirely. It is the same reason
 * the app ships Atkinson Hyperlegible and a dyslexia-friendly mode.
 *
 * ── Why only published content ──────────────────────────────────────────────
 * Read-aloud is offered on the written material — explainers, the parent guide,
 * resources, the policies — and deliberately never on what a family has
 * written. Several browsers implement `speechSynthesis` with cloud voices,
 * which means the text is sent to the voice vendor to be spoken. That is fine
 * for a public explainer and completely unacceptable for a journal entry about
 * somebody's child. Keeping the feature pointed at published text means the
 * question never has to be asked.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { Article, ContentBlock } from "@/content/types";

/**
 * Longest string handed to the browser as one utterance.
 *
 * Chrome stops speaking after roughly fifteen seconds of a single utterance, a
 * bug of long standing. Short utterances sidestep it, and they also make
 * pausing and stopping feel immediate rather than waiting out a paragraph.
 */
const MAX_UTTERANCE_LENGTH = 200;

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Reads a block as a person would say it, rather than as markup. */
function blockToSpeech(block: ContentBlock): string[] {
  switch (block.type) {
    case "heading":
      // No "heading:" announcement — that is a screen reader's job, and here it
      // would just interrupt the flow of someone listening to an article.
      return [ensureStop(block.text)];

    case "paragraph":
      return [ensureStop(block.text)];

    case "list":
      return block.items.map((item, index) =>
        block.ordered
          ? `${index + 1}. ${ensureStop(item)}`
          : ensureStop(item),
      );

    case "callout":
      return block.title
        ? [ensureStop(block.title), ensureStop(block.text)]
        : [ensureStop(block.text)];

    case "quote":
      return block.attribution
        ? [ensureStop(block.text), `From ${ensureStop(block.attribution)}`]
        : [ensureStop(block.text)];

    case "script":
      // The rendered version is a side-by-side pair, which only works visually.
      // Spoken, it needs the labels or the two lines run together into nonsense.
      return [
        ensureStop(block.situation),
        `Instead of saying: ${ensureStop(block.instead)}`,
        `Try: ${ensureStop(block.tryThis)}`,
      ];
  }
}

/** A trailing full stop is what makes a voice fall at the end of a line. */
function ensureStop(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?:,;]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/**
 * Splits a long segment into utterance-sized pieces at the most natural break
 * available: sentence ends first, then clause commas, and only then mid-clause.
 */
function splitForSpeech(segment: string): string[] {
  if (segment.length <= MAX_UTTERANCE_LENGTH) return [segment];

  const sentences = segment.split(/(?<=[.!?])\s+/);
  const pieces: string[] = [];
  let current = "";

  const flush = () => {
    if (current.trim()) pieces.push(current.trim());
    current = "";
  };

  for (const sentence of sentences) {
    if (sentence.length > MAX_UTTERANCE_LENGTH) {
      flush();
      pieces.push(...splitLongSentence(sentence));
      continue;
    }
    if ((current + " " + sentence).trim().length > MAX_UTTERANCE_LENGTH) flush();
    current = current ? `${current} ${sentence}` : sentence;
  }
  flush();

  return pieces;
}

function splitLongSentence(sentence: string): string[] {
  const clauses = sentence.split(/(?<=,)\s+/);
  const pieces: string[] = [];
  let current = "";

  for (const clause of clauses) {
    if ((current + " " + clause).trim().length > MAX_UTTERANCE_LENGTH) {
      if (current.trim()) pieces.push(current.trim());
      current = "";
    }
    current = current ? `${current} ${clause}` : clause;

    // A clause that is still too long has no natural break left in it, so it
    // gets cut on a word boundary rather than being dropped.
    while (current.length > MAX_UTTERANCE_LENGTH) {
      const cut = current.lastIndexOf(" ", MAX_UTTERANCE_LENGTH);
      const at = cut > 0 ? cut : MAX_UTTERANCE_LENGTH;
      pieces.push(current.slice(0, at).trim());
      current = current.slice(at).trim();
    }
  }

  if (current.trim()) pieces.push(current.trim());
  return pieces;
}

/**
 * The full spoken script for an article, as a list of utterances.
 *
 * Returns an empty list for anything not worth listening to — an article whose
 * prose has not been written yet would otherwise read out its own outline.
 */
export function articleToSpeech(article: Article): string[] {
  if (!article.blocks?.length) return [];

  const segments = [
    ensureStop(article.title),
    ...article.blocks.flatMap(blockToSpeech),
  ].filter(Boolean);

  return segments.flatMap(splitForSpeech);
}

/** Rough spoken length, for telling someone what they are committing to. */
export function estimateSpeechMinutes(utterances: string[], rate: number): number {
  const words = utterances.reduce(
    (total, line) => total + line.split(/\s+/).filter(Boolean).length,
    0,
  );
  // ~160 words per minute is a common conversational rate for synthesised
  // speech at normal speed; the multiplier tracks the user's chosen rate.
  return Math.max(1, Math.round(words / (160 * rate)));
}
