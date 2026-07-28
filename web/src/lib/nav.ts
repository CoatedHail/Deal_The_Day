import type { IconName } from "@/components/ui/Icon";

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  description?: string;
  /** Shown in the mobile bottom bar. Kept to five to stay tappable. */
  primary?: boolean;
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
    description: "Draw a card and work through it",
    primary: true,
  },
  {
    href: "/check-in",
    label: "Check in",
    icon: "pulse",
    description: "How are you doing right now?",
    primary: true,
  },
  {
    href: "/progress",
    label: "Progress",
    icon: "chart",
    description: "What has shifted over time",
    primary: true,
  },
  {
    href: "/learn",
    label: "Learn",
    icon: "book",
    description: "Short explainers on OCD, OCPD and ERP",
  },
  {
    href: "/guide",
    label: "Parent guide",
    icon: "family",
    description: "Talking with your kids about this",
  },
  {
    href: "/calendar",
    label: "Calendar",
    icon: "calendar",
    description: "Plan sessions and set reminders",
  },
  {
    href: "/resources",
    label: "Resources",
    icon: "lifebuoy",
    description: "FAQ, reading, worksheets and support",
  },
  {
    href: "/therapist",
    label: "Therapist mode",
    icon: "clipboard",
    description: "Export and share progress",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    description: "Display, accessibility and your data",
  },
];

export const PRIMARY_NAV = NAV_ITEMS.filter((item) => item.primary);
export const SECONDARY_NAV = NAV_ITEMS.filter((item) => !item.primary);

/** Matches the current pathname to a nav item, longest prefix wins. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
