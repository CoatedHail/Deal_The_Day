/**
 * The guided tour of the site.
 *
 * Draft wording — replace it freely. It is all in this one file so nobody has
 * to open a component to change a sentence.
 *
 * Keep it plain and keep it short. One sentence a step is usually enough; the
 * page itself is right there and explains more than the tour can. Titles are
 * just the page name, because a clever title is one more thing to read.
 *
 * Two pages are left out. Calendar is still a placeholder, and sign-in is not
 * what the tour is for.
 */
export interface TourStep {
  /** The real route this step visits. */
  href: string;
  title: string;
  body: string;
}

export const TOUR_STEPS: readonly TourStep[] = [
  {
    href: "/",
    title: "Home",
    body: "What needs your attention today — anything you started and haven't finished, and how the last few days have gone.",
  },
  {
    href: "/deck",
    title: "The deck",
    body: "Pick short, medium or long and the app deals you a card. You don't choose which one. The card gives you a type of activity; you decide the details.",
  },
  {
    href: "/activity",
    title: "Activity",
    body: "Every card you've played and every check-in, in one list. Tap any of them to read it back.",
  },
  {
    href: "/activity-ideas",
    title: "Activity Ideas",
    body: "Ideas for what to actually do, sorted by type. Every card links straight to the right section.",
  },
  {
    href: "/check-in",
    title: "Check in",
    body: "Seven sliders on how you're doing right now. Takes under a minute.",
  },
  {
    href: "/progress",
    title: "Progress",
    body: "Tracks how things have changed over time — your anxiety before and after each card, and whether what you worried about actually happened.",
  },
  {
    href: "/learn",
    title: "Learn",
    body: "Short articles on OCD, OCPD, and how exposure therapy works.",
  },
  {
    href: "/guide",
    title: "Parent guide",
    body: "How to talk to your kids about this, with examples of what to say.",
  },
  {
    href: "/resources",
    title: "Resources",
    body: "FAQ, reading, worksheets, and crisis support.",
  },
  {
    href: "/settings",
    title: "Settings",
    body: "Text size, fonts, dark mode, contrast and read-aloud. Worth setting up before you start.",
  },
] as const;

export const TOUR_COPY = {
  start: "Show me around",
  startHelp: "A quick walk through what each page does. About a minute.",
  skip: "End tour",
  back: "Back",
  next: "Next",
  finish: "Finish",
  listen: "Listen",
  stopListening: "Stop",
  finished: "That's the whole site.",
};
