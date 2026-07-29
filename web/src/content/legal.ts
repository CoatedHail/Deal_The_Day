/**
 * Privacy policy and terms of service.
 *
 * ── IMPORTANT, for whoever owns this project ────────────────────────────────
 * Unlike the rest of the content, these two documents are not free to reword.
 * They describe what the software actually does, and Google checks that the
 * URLs resolve before allowing the OAuth consent screen to be published.
 *
 * Everything stated below is accurate as of the date in `lastUpdated`. If the
 * app's behaviour changes — new third-party services, analytics, clinician
 * access, a different database region — these must be updated in the same
 * change, or they become false.
 *
 * Placeholders that only SNP-REACH can fill are marked NEEDS-OWNER in comments
 * and rendered on the page as visible gaps rather than invented answers:
 *   - the legal entity responsible for the data (the "data controller")
 *   - how long records are kept
 *   - the governing jurisdiction
 *   - a real contact address
 *
 * This draft has not been reviewed by a lawyer. It should be, before the site
 * is promoted to anyone outside the project team.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { Article } from "@/content/types";

export interface LegalDocument extends Article {
  lastUpdated: string;
}

const PENDING_REVIEW = {
  type: "callout" as const,
  tone: "caution" as const,
  title: "Being finalised",
  text: "Deal the Day is still in development and is not yet open to families. This document describes how the software behaves today, and is being reviewed before the site is offered to anyone outside the project team.",
};

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy",
  title: "Privacy policy",
  summary:
    "What Deal the Day records, where it is kept, and who can see it.",
  status: "ready",
  lastUpdated: "28 July 2026",
  blocks: [
    PENDING_REVIEW,
    {
      type: "paragraph",
      text: "Deal the Day is an educational companion to a family card game. It is used to write down private things — what you are afraid of, how anxious you felt, what happened with your children. This policy explains plainly what happens to that.",
    },

    { type: "heading", text: "What we collect" },
    {
      type: "paragraph",
      text: "Two different things, for two different reasons.",
    },
    {
      type: "paragraph",
      text: "When you sign in with Google, Google tells us your name, your email address, and your profile picture. That is all we receive. We never see your Google password, and we cannot access your Gmail, your files, or your calendar.",
    },
    {
      type: "paragraph",
      text: "Everything else is what you choose to write in the app: the cards you draw, what you predicted would happen, what you were most worried about, what actually happened, your anxiety and confidence ratings, your check-ins, your reflections, any sessions you schedule, and any feedback you give us about the game.",
    },
    {
      type: "callout",
      tone: "info",
      title: "About your children",
      text: "You may end up writing about your children — what they said, how they reacted. We do not ask for their names and they do not have accounts. Anything about them exists only because you typed it, inside your own record, and you can delete it at any time.",
    },

    {
      type: "callout",
      tone: "info",
      title: "Card reviews are the exception",
      text: "If you review a card, that review is sent to the project team so the deck can be improved. It is stored with nothing attached that identifies you — no name, no email, no account link — and it is kept apart from your own record. Because a sent review carries nothing linking it back to you, it cannot be withdrawn afterwards.",
    },

    { type: "heading", text: "What we do not do" },
    {
      type: "list",
      items: [
        "We do not use analytics, tracking pixels, or advertising of any kind.",
        "We do not sell, rent, or share your information with anyone.",
        "We do not send you marketing email.",
        "We set one cookie, which keeps you signed in. There are no others, so there is no cookie banner to dismiss.",
        "We do not build a profile of you or use your entries to train anything.",
      ],
    },

    { type: "heading", text: "Where it is stored" },
    {
      type: "paragraph",
      text: "Your records are held in a PostgreSQL database operated by Neon, hosted on Amazon Web Services in Oregon, in the United States. The website itself is served by Vercel. Those two companies, and Google for sign-in, are the only third parties involved.",
    },
    {
      type: "paragraph",
      text: "If you are outside the United States, this means your information is stored there.",
    },

    { type: "heading", text: "Who can see it" },
    {
      type: "paragraph",
      text: "Only you. Your entries are tied to your account and no other account can read them.",
    },
    {
      type: "paragraph",
      text: "There is currently no way for a therapist to log in and view your record. If you want a clinician to see your progress, you export it yourself and give it to them. If that ever changes, it will be something you switch on deliberately, and this policy will be updated first.",
    },
    {
      type: "paragraph",
      text: "A small number of people working on the project can technically access the database in order to maintain it. They do not read individual records as a matter of course.",
    },

    { type: "heading", text: "Your control over it" },
    {
      type: "list",
      items: [
        "You can read everything you have written, at any time, in the app.",
        "You can export the whole record as a file you keep.",
        "You can delete individual entries.",
        "You can delete your account and everything in it. When you do, it is removed from the database rather than hidden.",
      ],
    },

    { type: "heading", text: "How long we keep it" },
    // NEEDS-OWNER: agree an actual retention period and replace this paragraph.
    {
      type: "paragraph",
      text: "We keep your records for as long as your account exists, so that your history stays available to you. A defined retention period for inactive accounts has not yet been set; it will be added here before the site is opened to families.",
    },

    { type: "heading", text: "Security" },
    {
      type: "paragraph",
      text: "Connections to the site and to the database are encrypted. Sign-in is handled by Google, so there is no password of yours for us to store or lose. No system is perfect, and we will tell you if something happens that affects your information.",
    },

    { type: "heading", text: "Who is responsible" },
    // NEEDS-OWNER: name the legal entity and a monitored contact address.
    {
      type: "paragraph",
      text: "Deal the Day is made by the SNP-REACH project team. The specific organisation formally responsible for this data, and a contact address for privacy questions, are being confirmed and will be published here before the site is opened to families.",
    },

    { type: "heading", text: "Changes" },
    {
      type: "paragraph",
      text: "If this policy changes in a way that affects what happens to your information, we will say so in the app rather than quietly editing this page.",
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  slug: "terms",
  title: "Terms of use",
  summary: "What Deal the Day is, what it is not, and what we ask of you.",
  status: "ready",
  lastUpdated: "28 July 2026",
  blocks: [
    PENDING_REVIEW,

    { type: "heading", text: "What this is" },
    {
      type: "paragraph",
      text: "Deal the Day is a free educational companion to a physical family card game. It helps you record what you expected before an activity and what actually happened afterwards, drawing on principles from Exposure and Response Prevention (ERP).",
    },

    {
      type: "callout",
      tone: "caution",
      title: "Not treatment",
      text: "This is not therapy, not a medical device, and not a substitute for professional care. Nothing here is a diagnosis or personal clinical advice. It works best alongside a qualified clinician who knows you — not instead of one.",
    },
    {
      type: "callout",
      tone: "caution",
      title: "Not for emergencies",
      text: "If you or someone in your family is in crisis or at risk of harm, this app is the wrong tool. Contact your local emergency services or a crisis line — there are numbers on our crisis support page.",
    },

    { type: "heading", text: "Your account" },
    {
      type: "list",
      items: [
        "You need to be an adult to create an account. Children do not get their own accounts.",
        "You are responsible for what you write, including anything you record about other members of your family.",
        "Keep access to your Google account secure, since that is how you get into this one.",
        "One account is meant for one household.",
      ],
    },

    { type: "heading", text: "Using it sensibly" },
    {
      type: "paragraph",
      text: "The game asks families to do things that feel uncertain, not things that are unsafe. You decide what your family actually does. Never carry out an activity that you believe puts anyone at genuine risk — the app includes a way to skip or adapt any card, and using it is a legitimate choice, not a failure.",
    },
    {
      type: "paragraph",
      text: "Do not use the service to harass anyone, to break the law, or to attempt to access another household's records.",
    },

    { type: "heading", text: "Availability" },
    {
      type: "paragraph",
      text: "The service is free and provided as-is. It is still in development, so it may be unavailable, change, or lose features without notice. Keep your own exported copy of anything you would be upset to lose.",
    },

    { type: "heading", text: "Liability" },
    {
      type: "paragraph",
      text: "To the extent the law allows, we are not liable for outcomes arising from your use of the service, including decisions your family makes about activities. You remain responsible for your family's wellbeing and safety.",
    },

    { type: "heading", text: "Ending it" },
    {
      type: "paragraph",
      text: "You can delete your account whenever you like. We may suspend accounts that are being used to harm others or to attack the service.",
    },

    { type: "heading", text: "Governing law" },
    // NEEDS-OWNER: confirm the jurisdiction with SNP-REACH before public launch.
    {
      type: "paragraph",
      text: "The governing jurisdiction for these terms is being confirmed and will be published here before the site is opened to families.",
    },

    { type: "heading", text: "Contact" },
    {
      type: "paragraph",
      text: "Questions about these terms can go to the project team through the contact page.",
    },
  ],
};
