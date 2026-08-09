/**
 * The guided tour of the site.
 *
 * Draft wording, written to get the feature working rather than to be final —
 * replace it freely. It is all in this one file for that reason: nobody should
 * have to open a component to change a sentence.
 *
 * The tour walks the real pages rather than describing them from one screen, so
 * what someone reads is attached to what they are looking at. Order follows the
 * sidebar, and it ends on Settings deliberately — the accessibility controls are
 * the most useful thing on the site for a lot of the people using it, and they
 * are the easiest to never find.
 *
 * Two pages are left out on purpose. Calendar is still a placeholder, and a tour
 * that proudly shows you an unbuilt page undermines everything it just said.
 * Sign-in is out because the tour is about what the app does, not about
 * accounts.
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
    title: "Home is where things stand",
    body: "Whatever is worth your attention today — a card you started and have not looked back on yet, anything coming up, and how the last few days have gone. If you only ever open one page, open this one.",
  },
  {
    href: "/deck",
    title: "The deck deals you a card",
    body: "Pick short, medium or long, and one card comes off the top. You do not choose which — that is the point of it being a deck. The card names a kind of activity; what it actually is, your family decides together.",
  },
  {
    href: "/activity",
    title: "Activity is the record",
    body: "Every card you have played and every check-in you have recorded, in one list. Open any entry to read the whole thing back — what you expected, what happened, and what you made of it.",
  },
  {
    href: "/activity-ideas",
    title: "Activity Ideas fills in the blank",
    body: "A card says \"Baking\" and leaves the rest to you. When nothing comes to mind, this is where to look. Every drawn card links straight to the right section.",
  },
  {
    href: "/check-in",
    title: "Check in takes your temperature",
    body: "Seven quick sliders on how you are doing right now. It takes under a minute and it is worth doing on ordinary days, not only around an activity — that is what makes the trends mean anything.",
  },
  {
    href: "/progress",
    title: "Progress is the argument",
    body: "What you were afraid of before each card, next to what actually happened. Most of it stays folded away until you want it. None of it is a score, and you can turn the numbers off entirely.",
  },
  {
    href: "/learn",
    title: "Learn explains the ideas",
    body: "Short pieces on OCD, OCPD, uncertainty and how exposure work actually functions. Read them in any order, or not at all — the game works either way.",
  },
  {
    href: "/guide",
    title: "The parent guide is the hard part",
    body: "What to say to your children, with example scripts you can borrow word for word. Knowing the theory and knowing what to say at the kitchen table are different problems.",
  },
  {
    href: "/resources",
    title: "Resources is everything else",
    body: "FAQ, reading, worksheets, and crisis support if you ever need it in a hurry.",
  },
  {
    href: "/settings",
    title: "Make it comfortable before you start",
    body: "Text size, a dyslexia-friendly font, dark and high-contrast modes, reduced motion, and read-aloud. There is also gentle mode, which hides counts and streaks if they start feeling like something to manage. This is the last stop — have a look around and change anything you like.",
  },
] as const;

export const TOUR_COPY = {
  /** On the button that starts it. */
  start: "Show me around",
  restart: "Take the tour again",
  startHelp: "A quick walk through what each page is for. About a minute.",
  skip: "End tour",
  back: "Back",
  next: "Next",
  finish: "Finish",
  /** Shown on the last step once there is nowhere further to go. */
  finished: "That is the whole site. Nothing here has to be done in order.",
};
