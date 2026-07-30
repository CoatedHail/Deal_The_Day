import type { IconName } from "@/components/ui/Icon";

/**
 * Sections of the sidebar.
 *
 * The list had grown long enough to read as one undifferentiated wall, which
 * makes every item harder to find rather than easier. Grouping costs nothing —
 * no page is hidden — and gives the eye somewhere to land.
 */
export type NavSection = "practice" | "read" | "more";

export const NAV_SECTIONS: { id: NavSection; label: string }[] = [
  { id: "practice", label: "Practice" },
  { id: "read", label: "Read" },
  { id: "more", label: "More" },
];

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  description?: string;
  /** Shown in the mobile bottom bar. Kept to five to stay tappable. */
  primary?: boolean;
  /** Home stands on its own above the sections. */
  section?: NavSection;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: "home",
    description: "Where things stand today",
    primary: true,
  },
  {
    href: "/activity",
    label: "Activity",
    icon: "cards",
    // Absorbed the journal: cards and check-ins are one record, read one way.
    description: "Draw a card, and everything you have recorded",
    primary: true,
    section: "practice",
  },
  {
    href: "/activity-ideas",
    label: "Activity Ideas",
    icon: "sparkle",
    description: "Browse ideas by activity type",
    primary: true,
    section: "practice",
  },
  {
    href: "/check-in",
    label: "Check in",
    icon: "pulse",
    description: "How are you doing right now?",
    primary: true,
    section: "practice",
  },
  {
    href: "/progress",
    label: "Progress",
    icon: "chart",
    description: "What has shifted over time",
    section: "practice",
  },
  {
    href: "/calendar",
    label: "Calendar",
    icon: "calendar",
    description: "Plan sessions and set reminders",
    section: "practice",
  },
  {
    href: "/learn",
    label: "Learn",
    icon: "book",
    description: "Short explainers on OCD, OCPD and ERP",
    section: "read",
  },
  {
    href: "/guide",
    label: "Parent guide",
    icon: "family",
    description: "Talking with your kids about this",
    section: "read",
  },
  {
    href: "/resources",
    label: "Resources",
    icon: "lifebuoy",
    description: "FAQ, reading, worksheets and support",
    section: "read",
  },
  {
    href: "/team",
    label: "Meet the team",
    icon: "people",
    description: "Who writes and builds this",
    section: "more",
  },
  {
    href: "/feedback",
    label: "Review a card",
    icon: "message",
    description: "Tell us how a card landed",
    section: "more",
  },
  {
    href: "/therapist",
    label: "Therapist mode",
    icon: "clipboard",
    description: "Export and share progress",
    section: "more",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    description: "Display, accessibility and your data",
    section: "more",
  },
];

export const PRIMARY_NAV = NAV_ITEMS.filter((item) => item.primary);
export const SECONDARY_NAV = NAV_ITEMS.filter((item) => !item.primary);

/** The items in one section, in the order they are declared above. */
export function navSection(section: NavSection): NavItem[] {
  return NAV_ITEMS.filter((item) => item.section === section);
}

/** Items with no section — currently just Home, which sits above the rest. */
export const UNSECTIONED_NAV = NAV_ITEMS.filter((item) => !item.section);

/** Matches the current pathname to a nav item, longest prefix wins. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
