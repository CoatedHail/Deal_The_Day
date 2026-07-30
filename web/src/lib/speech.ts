/**
 * Turning what is on screen into something a browser can read aloud.
 *
 * ── What this is for ────────────────────────────────────────────────────────
 * Not a replacement for a screen reader. Someone who uses VoiceOver or NVDA
 * already has a far better one, and the site is built to work properly with it.
 * This is for the larger group who can see the page but find reading it hard
 * work — dyslexia, fatigue, an anxious head that will not hold a paragraph —
 * and who would otherwise skip the written material entirely. It is the same
 * reason the app ships Atkinson Hyperlegible and a dyslexia-friendly mode.
 *
 * ── The one rule ────────────────────────────────────────────────────────────
 * Read-aloud speaks the app's own words. It must never speak what a family has
 * written. Several browsers implement `speechSynthesis` with cloud voices,
 * which means the text is sent to the voice vendor to be spoken — fine for a
 * page of instructions, and completely unacceptable for a journal entry about
 * somebody's child. The privacy policy promises their entries go nowhere, and
 * this is one of the ways that promise could quietly be broken.
 *
 * Anything rendering text a user typed must therefore sit inside an element
 * marked `data-private`, which the collector below refuses to descend into.
 * Use the `<Private>` wrapper in components/a11y/Private.tsx rather than
 * writing the attribute by hand, so the rule stays greppable.
 * ────────────────────────────────────────────────────────────────────────────
 */

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

/* ── Pronunciation ────────────────────────────────────────────────────────── */

/**
 * Respellings applied to the spoken string only, never to what is displayed.
 *
 * Synthesisers guess at English heteronyms — words spelled the same and said
 * differently — and get them wrong often enough to be distracting. Rewriting
 * them to an unambiguous spelling is the only lever available: the Web Speech
 * API has no SSML and no pronunciation dictionary.
 *
 * Both branches of each pair are rewritten, not just the one that has been
 * heard to fail. The target spellings have only one pronunciation, so applying
 * them is safe whichever way a particular voice was guessing.
 *
 * Add to this when something reads badly. Keep the patterns narrow: a rule that
 * fires on the wrong sense makes a new problem out of an old one.
 */
const PRONUNCIATIONS: { pattern: RegExp; replacement: string }[] = [
  // "read" as past tense or participle: after a form of be or have, after a
  // word that only introduces a participle, or before "by" in the passive.
  // Said "red".
  //
  // Negations are deliberately absent. "do not read" is present tense and
  // "have not read" is not, so the word carries no signal on its own.
  {
    pattern:
      /\b(is|are|was|were|been|be|being|has|have|had|already|once|when|widely)\s+read\b/gi,
    replacement: "$1 red",
  },
  { pattern: /\bread\s+by\b/gi, replacement: "red by" },
  // Every other "read" is present tense or an infinitive. Said "reed".
  { pattern: /\bread\b/gi, replacement: "reed" },
  // "reads" is always present tense, but voices sometimes take it as a noun.
  { pattern: /\breads\b/gi, replacement: "reeds" },
];

/**
 * Rewrites a line into spellings a synthesiser cannot mispronounce.
 *
 * Order matters: the narrow past-tense rules run before the catch-all, and the
 * catch-all cannot re-fire on their output because "red" no longer matches.
 */
export function pronounce(text: string): string {
  let result = text;
  for (const { pattern, replacement } of PRONUNCIATIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/* ── Collecting what is on the page ───────────────────────────────────────── */

/**
 * Elements whose text is worth hearing.
 *
 * Headings, prose, list items and quotes — the things someone would read. Not
 * buttons or links: those are how you move around, and reading the navigation
 * aloud would bury the actual content.
 *
 * Two attributes extend this for markup that does not fit the plain tags:
 *
 *   data-speak         this container holds prose, even though it is a <div>
 *   data-speech="…"    speak this instead of what the element contains, for a
 *                      layout that only makes sense visually
 *
 * An element carrying either is spoken as one unit and not descended into.
 */
const SPOKEN_SELECTOR =
  "h1, h2, h3, h4, p, li, blockquote, figcaption, dt, dd, [data-speak], [data-speech]";

/** Never descended into, for the reason at the top of this file. */
const SKIPPED_SELECTOR =
  "[data-private], [data-no-speech], [aria-hidden='true'], nav, form, button, select, textarea, input, script, style";

function isSkipped(element: Element): boolean {
  return element.closest(SKIPPED_SELECTOR) !== null;
}

/**
 * Reads the visible page into a list of utterances, in document order.
 *
 * Works from the rendered DOM rather than from the content model on purpose:
 * it means every page can be listened to, including ones assembled from forms,
 * dashboards and structured data rather than from an article.
 */
export function collectPageSpeech(root: HTMLElement | null): string[] {
  if (!root) return [];

  const seen = new Set<string>();
  const segments: string[] = [];

  for (const element of Array.from(root.querySelectorAll(SPOKEN_SELECTOR))) {
    if (isSkipped(element)) continue;

    // A <p> inside an <li> would otherwise be spoken twice, once on its own and
    // once as part of its parent.
    if (element.parentElement?.closest(SPOKEN_SELECTOR)) continue;

    const text = (element.getAttribute("data-speech") ?? element.textContent ?? "")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;

    // Repeated boilerplate — a label appearing on every card — is worth saying
    // once. Exact duplicates only; similar lines are left alone.
    if (seen.has(text)) continue;
    seen.add(text);

    segments.push(ensureStop(text));
  }

  return segments.flatMap(splitForSpeech).map(pronounce);
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

/** Rough spoken length, for telling someone what they are committing to. */
export function estimateSpeechMinutes(utterances: string[], rate: number): number {
  const words = utterances.reduce(
    (total, line) => total + line.split(/\s+/).filter(Boolean).length,
    0,
  );
  // ~160 words per minute is a common conversational rate for synthesized
  // speech at normal speed; the multiplier tracks the user's chosen rate.
  return Math.max(1, Math.round(words / (160 * rate)));
}
