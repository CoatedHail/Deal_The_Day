/**
 * User-facing display and accessibility preferences.
 *
 * These are intentionally separate from the app's therapeutic data (see
 * lib/types.ts). Settings are cheap, synchronous, and applied to <html> as data
 * attributes so that CSS can respond without any JavaScript re-render.
 */

export type ThemePreference = "system" | "light" | "dark";
export type PalettePreference = "calm" | "blue-yellow";
export type TextSize = "sm" | "md" | "lg" | "xl";
export type FontChoice = "default" | "dyslexic";
export type MotionPreference = "system" | "reduced";
export type ContrastPreference = "normal" | "high";
export type SpeechRate = "slow" | "normal" | "fast";

/** Multipliers passed to the speech synthesiser, where 1 is its own default. */
export const SPEECH_RATES: Record<SpeechRate, number> = {
  slow: 0.8,
  normal: 1,
  fast: 1.3,
};

export interface Settings {
  /** Display name used in greetings. Never leaves the device. */
  displayName: string;
  theme: ThemePreference;
  palette: PalettePreference;
  textSize: TextSize;
  font: FontChoice;
  motion: MotionPreference;
  contrast: ContrastPreference;
  /**
   * Gentle mode hides streaks, counts and badges.
   *
   * Progress metrics are motivating for many people, but for someone with OCD
   * or OCPD traits an unbroken streak can quietly become another rule to obey,
   * and breaking it can feel like failure. Turning them off must always be
   * available and must never be framed as giving up.
   */
  gentleMode: boolean;
  /**
   * Whether the "Listen to this page" control appears on written content.
   *
   * On by default. Someone who would benefit from it is exactly the person
   * least likely to go hunting through a settings page to find it, and the
   * control is quiet enough not to be in anyone else's way.
   */
  readAloud: boolean;
  speechRate: SpeechRate;
  /**
   * The chosen voice's `voiceURI`. Empty means the browser's own default —
   * which is the right fallback, because the installed voices differ on every
   * device and a stored name may not exist on the next one.
   */
  speechVoice: string;
  /** Whether the user has completed the first-run introduction. */
  onboarded: boolean;
}

export const SETTINGS_STORAGE_KEY = "dtd.settings.v1";

export const DEFAULT_SETTINGS: Settings = {
  displayName: "",
  theme: "system",
  palette: "calm",
  textSize: "md",
  font: "default",
  motion: "system",
  contrast: "normal",
  gentleMode: false,
  readAloud: true,
  speechRate: "normal",
  speechVoice: "",
  onboarded: false,
};

export function parseSettings(raw: string | null): Settings {
  if (!raw) return DEFAULT_SETTINGS;
  try {
    const parsed = JSON.parse(raw) as Partial<Settings>;
    // Merge rather than replace so that settings added in later versions get
    // sensible defaults instead of being undefined.
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Writes preferences onto <html> as data attributes.
 *
 * `theme: "system"` resolves to a concrete light/dark value here rather than
 * being left to CSS, so that the rest of the stylesheet only ever has to reason
 * about two states.
 */
export function applySettings(settings: Settings, root: HTMLElement): void {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  const resolvedTheme =
    settings.theme === "system" ? (prefersDark ? "dark" : "light") : settings.theme;

  root.dataset.theme = resolvedTheme;
  root.dataset.palette = settings.palette;
  root.dataset.textSize = settings.textSize;
  root.dataset.font = settings.font;
  root.dataset.contrast = settings.contrast;

  if (settings.motion === "reduced") {
    root.dataset.motion = "reduced";
  } else {
    delete root.dataset.motion;
  }

  root.style.colorScheme = resolvedTheme;
}

/**
 * Runs before first paint to prevent a flash of the wrong theme.
 *
 * This is injected as a raw inline <script>, so it must be self-contained and
 * must not throw — a failure here would block the page from rendering.
 */
export const SETTINGS_BOOTSTRAP_SCRIPT = `
(function () {
  try {
    var raw = localStorage.getItem(${JSON.stringify(SETTINGS_STORAGE_KEY)});
    var s = raw ? JSON.parse(raw) : {};
    var root = document.documentElement;
    var theme = s.theme || "system";
    if (theme === "system") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.dataset.theme = theme;
    root.dataset.palette = s.palette || "calm";
    root.dataset.textSize = s.textSize || "md";
    root.dataset.font = s.font || "default";
    root.dataset.contrast = s.contrast || "normal";
    if (s.motion === "reduced") root.dataset.motion = "reduced";
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;
