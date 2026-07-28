import type { ContentStatus } from "@/content/types";

export interface ResourcePage {
  href: string;
  title: string;
  summary: string;
  status: ContentStatus;
}

/**
 * The resources section.
 *
 * Crisis support is marked "ready" rather than placeholder on purpose: a
 * half-built page is acceptable for an explainer, but someone arriving at a
 * crisis page needs something real there.
 */
export const RESOURCE_PAGES: ResourcePage[] = [
  {
    href: "/resources/crisis",
    title: "If you need support right now",
    summary:
      "This app is not built for crises. Here is where to go instead.",
    status: "ready",
  },
  {
    href: "/resources/faq",
    title: "Questions families ask",
    summary:
      "What the game is for, who it suits, and what to do when it does not go to plan.",
    status: "placeholder",
  },
  {
    href: "/resources/books",
    title: "Recommended books",
    summary: "Reading for parents, for children, and for clinicians.",
    status: "placeholder",
  },
  {
    href: "/resources/podcasts",
    title: "Podcasts and talks",
    summary: "Listening for the car, the walk, or the washing up.",
    status: "placeholder",
  },
  {
    href: "/resources/worksheets",
    title: "Worksheets",
    summary:
      "Printable versions of the pre- and post-activity questions, for when a screen is not welcome.",
    status: "placeholder",
  },
  {
    href: "/resources/discussion-guides",
    title: "Family discussion guides",
    summary:
      "Printable conversation starters for sitting down together after a card.",
    status: "placeholder",
  },
  {
    href: "/resources/contact",
    title: "Contact",
    summary: "How to reach the people behind Deal the Day.",
    status: "placeholder",
  },
];
