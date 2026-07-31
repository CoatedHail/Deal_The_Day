import { cn } from "@/lib/cn";

/**
 * Small inline icon set.
 *
 * Hand-rolled rather than pulled from an icon package: the app needs about a
 * dozen glyphs and they all share one stroke style, so a dependency would cost
 * more than it saves.
 */
export type IconName =
  | "home"
  | "cards"
  | "pulse"
  | "chart"
  | "book"
  | "family"
  | "calendar"
  | "lifebuoy"
  | "clipboard"
  | "settings"
  | "menu"
  | "arrow-right"
  | "arrow-left"
  | "check"
  | "plus"
  | "sparkle"
  | "download"
  | "printer"
  | "journal"
  | "message"
  | "speaker"
  | "pause"
  | "stop"
  | "people"
  | "balance"
  | "brain"
  | "headphones"
  | "lock"
  | "mail"
  | "question"
  | "repeat"
  | "shield"
  | "shuffle"
  | "target";

const PATHS: Record<IconName, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" />,
  cards: (
    <>
      <rect x="3" y="6" width="12" height="15" rx="2" />
      <path d="M8 3h9a2 2 0 0 1 2 2v11" />
    </>
  ),
  pulse: <path d="M3 12h4l2.5-6 4 12L16 12h5" />,
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v4H6.5A2.5 2.5 0 0 1 4 20.5z" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.5 1.3-4.5 3.5-4.5S22 17.5 22 20" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 11h6M9 15h4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 18l-6-6 6-6" />,
  check: <path d="m5 13 4 4L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  sparkle: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6.3 6.3l3 3M14.7 14.7l3 3M17.7 6.3l-3 3M9.3 14.7l-3 3" />,
  download: <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />,
  printer: (
    <>
      <path d="M7 9V3h10v6" />
      <rect x="3" y="9" width="18" height="8" rx="2" />
      <path d="M7 14h10v7H7z" />
    </>
  ),
  journal: (
    <>
      <path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M4 17h15M9 7h6M9 11h6" />
    </>
  ),
  message: (
    <>
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
    </>
  ),
  speaker: (
    <>
      <path d="M4 9.5h3L12 5v14L7 14.5H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  pause: <path d="M9 5v14M15 5v14" />,
  stop: <rect x="6" y="6" width="12" height="12" rx="1.5" />,
  // Three people, to read as a team rather than as the two-adult "family" glyph.
  people: (
    <>
      <circle cx="12" cy="7.5" r="3" />
      <circle cx="4.5" cy="10" r="2.2" />
      <circle cx="19.5" cy="10" r="2.2" />
      <path d="M6.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M2 19c0-2 1.1-3.6 2.9-3.6M22 19c0-2-1.1-3.6-2.9-3.6" />
    </>
  ),
  balance: (
    <>
      <path d="M12 3v18M6 21h12M4 7h16M7 7l-4 7h8L7 7ZM17 7l-4 7h8l-4-7Z" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4.5A3 3 0 0 0 4 6.2a3 3 0 0 0-1 5.6A3.5 3.5 0 0 0 6.5 18H10V5.5a2 2 0 0 0-.5-1Z" />
      <path d="M14.5 4.5A3 3 0 0 1 20 6.2a3 3 0 0 1 1 5.6 3.5 3.5 0 0 1-3.5 6.2H14V5.5a2 2 0 0 1 .5-1ZM6 10h4M14 13h4M7 15v3M17 6v3" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M4 13h3v7H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 1-2ZM20 13h-3v7h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-1-2Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.4 2.4 0 1 1 3.5 2.1c-.8.5-1.3 1-1.3 1.9M12 17h.01" />
    </>
  ),
  repeat: (
    <>
      <path d="m17 2 3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3 7.5 7.5 9.5 4.5-2 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  shuffle: (
    <>
      <path d="M4 7h2.5c4.5 0 5 10 10 10H20M17 14l3 3-3 3M4 17h2.5c1.7 0 2.8-1.4 3.8-3M14 7c.8 0 1.6 0 2.5 0H20M17 4l3 3-3 3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
};

export function Icon({
  name,
  className,
  size = 20,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {PATHS[name]}
    </svg>
  );
}
