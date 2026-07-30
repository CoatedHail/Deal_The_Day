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
    slug: "encouraging-brave-behavior",
    title: "Encouraging brave behavior",
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
    slug: "regulating-yourself",
    title: "Steadying yourself in the moment",
    summary:
      "What to do with your own spike while it is happening — and the one trap to avoid.",
    status: "ready",
    minutes: 4,
    blocks: [
      {
        type: "paragraph",
        text: "Somewhere in the middle of a card, your own anxiety will climb. Your child is watching you decide what to do about that, and what they learn from watching is probably the most durable thing that happens all day.",
      },
      {
        type: "callout",
        tone: "erp",
        title: "The goal is not to feel calm",
        text: "It is to stay in the situation while you feel what you feel. Anything you do purely to make the feeling stop is doing the compulsion's work for it — even when it looks healthy from the outside.",
      },
      {
        type: "heading",
        text: "The trap worth knowing about",
      },
      {
        type: "paragraph",
        text: "Breathing exercises, grounding, counting backwards — these are genuinely useful skills, and they quietly turn into compulsions when the reason you reach for them is to get rid of anxiety rather than to stay put with it. The technique is the same either way. What changes it is your intent.",
      },
      {
        type: "list",
        items: [
          "Steadying: \"I am going to breathe slowly and keep walking into the restaurant.\"",
          "Compulsion: \"I have to get this feeling down to a 3 before I can go in.\"",
          "Steadying: \"I will unclench my jaw and let the thought sit there.\"",
          "Compulsion: \"If I do this exercise right, the thought will go away.\"",
        ],
      },
      {
        type: "paragraph",
        text: "If you notice yourself repeating something until it feels right, you have crossed over. Stop the technique, not the activity.",
      },
      {
        type: "heading",
        text: "Things that help without becoming rituals",
      },
      {
        type: "list",
        items: [
          "Name it flatly, to yourself or out loud: \"my anxiety is at about a 7.\" Naming is not the same as fixing.",
          "Drop your shoulders and slow your walking pace. Small physical changes are hard to turn into rules.",
          "Let the sentence be \"this is uncomfortable\" rather than \"this is going badly.\" They feel identical and mean different things.",
          "Give the feeling a deadline you do not enforce: \"I will check in on this in ten minutes.\" Usually you forget to.",
          "Expect the spike to peak and drop on its own. It reliably does, and it does it faster when you are not fighting it.",
        ],
      },
      {
        type: "heading",
        text: "Saying it out loud in front of your children",
      },
      {
        type: "paragraph",
        text: "You do not have to hide it, and hiding it well is its own cost — children usually detect the anxiety and, without an explanation, assume they caused it. What helps is narrating the choice, not the distress.",
      },
      {
        type: "script",
        situation: "Your child notices you are tense in the queue.",
        instead: "I'm fine, everything's fine.",
        tryThis:
          "I'm a bit nervous, actually. I'm going to do it anyway and see what happens.",
      },
      {
        type: "script",
        situation: "You want to check something for the fourth time.",
        instead: "Let me just make sure, then I'll relax.",
        tryThis:
          "I want to check again. I'm going to not check, and it'll feel weird for a bit.",
      },
      {
        type: "script",
        situation: "The plan goes wrong halfway through.",
        instead: "This is a disaster, I knew we should have booked.",
        tryThis: "Okay — not what we planned. What do we want to do instead?",
      },
      {
        type: "callout",
        tone: "info",
        title: "If it is consistently too much",
        text: "Being repeatedly overwhelmed is information, not failure — usually that the step was sized too big rather than that you handled it wrong. Make the next card smaller, and bring it to your clinician if you have one.",
      },
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
