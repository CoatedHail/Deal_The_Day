import type { Article } from "@/content/types";

/**
 * The parent guide.
 *
 * Each topic is expected to carry concrete example scripts (the `script` block
 * type) rather than only principles — knowing what to say is the hard part.
 */
export const GUIDE_ARTICLES: Article[] = [
  {
    slug: "talking-with-children",
    title: "Talking with your children about OCD or OCPD",
    summary:
      "How much to say, at what age, and how to do it without making them responsible for it.",
    status: "placeholder",
    minutes: 7,
    outline: [
      "What children already notice",
      "How much detail by age",
      "Naming it without handing over the weight",
      "Answering 'will I get it too?'",
      "Example scripts",
    ],
  },
  {
    slug: "explaining-anxiety",
    title: "Explaining anxiety in age-appropriate ways",
    summary:
      "Simple, accurate ways to describe what anxiety is that work for a five-year-old and for a fifteen-year-old.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "The smoke-alarm explanation",
      "For younger children",
      "For older children and teenagers",
      "What to avoid saying",
      "Example scripts",
    ],
  },
  {
    slug: "discussing-uncertainty",
    title: "Talking about not knowing",
    summary:
      "How to make 'we'll find out' a normal, safe thing to hear in your house.",
    status: "placeholder",
    minutes: 5,
    outline: [
      "Making uncertainty ordinary",
      "Answering questions you genuinely cannot answer",
      "Games and moments that build the muscle",
      "Example scripts",
    ],
  },
  {
    slug: "encouraging-brave-behaviour",
    title: "Encouraging brave behaviour",
    summary:
      "How to praise the trying rather than the outcome, and why that distinction does the work.",
    status: "placeholder",
    minutes: 5,
    outline: [
      "Praise the approach, not the calm",
      "Why 'you were so brave, and it was fine!' backfires",
      "Sizing the step right",
      "Example scripts",
    ],
  },
  {
    slug: "avoiding-reassurance-traps",
    title: "Avoiding the reassurance trap",
    summary:
      "What to do when your child asks for certainty you cannot give — and when you want to ask for it yourself.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "Spotting the loop",
      "The difference between information and reassurance",
      "Responding warmly without answering the question again",
      "When you are the one seeking it",
      "Example scripts",
    ],
  },
  {
    slug: "supporting-exposures",
    title: "Supporting an exposure without forcing it",
    summary:
      "Consent matters. How to stay alongside someone doing something hard without pushing them into it.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "Why forced exposure backfires",
      "Agreeing the step in advance",
      "What to say during",
      "What to do if someone stops partway",
      "Example scripts",
    ],
  },
];
