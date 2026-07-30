import type { Article } from "@/content/types";

/**
 * The psychoeducation library.
 *
 * Titles, summaries and outlines are real — they define the information
 * architecture and the URLs. An entry stays marked "placeholder", showing its
 * outline and an honest notice, until the team has written the prose; then it
 * gains `blocks` and becomes "ready".
 *
 * Written articles are the team's words, reproduced as given. Keep it that way:
 * this is clinical material, and tightening someone else's explanation of a
 * mental health concept is not a formatting decision.
 */
export const LEARN_ARTICLES: Article[] = [
  {
    slug: "ocd-vs-ocpd",
    title: "OCD and OCPD are not the same thing",
    summary:
      "They share a name and almost nothing else. What separates them, and why the difference changes what helps.",
    status: "ready",
    minutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "They share three letters and a reputation for “liking things a certain way.” Beyond that, Obsessive-Compulsive Disorder (OCD) and Obsessive-Compulsive Personality Disorder (OCPD) are different conditions, with different mechanisms, different subjective experiences, and different treatments. Conflating them isn’t just a slip – it can lead people toward the wrong kind of help.",
      },

      { type: "heading", text: "1. Short Overview and Summary" },
      {
        type: "paragraph",
        text: "OCD is an anxiety-related disorder built around unwanted, intrusive thoughts (obsessions) and the repetitive behaviors or mental rituals a person feels driven to perform to neutralize them (compulsions). The person usually knows the thoughts are irrational or excessive, and the compulsions bring only temporary relief, not satisfaction.",
      },
      {
        type: "paragraph",
        text: "OCPD is a personality disorder – a long-standing, pervasive pattern of perfectionism, rigidity, and a need for control that shows up across someone’s whole life: their work, relationships, morals, and habits. People with OCPD typically believe their standards are correct and reasonable.",
      },
      {
        type: "callout",
        tone: "info",
        title: "In short",
        text: "OCD is driven by anxiety and unwanted thoughts a person resists. OCPD is driven by rigid values and standards a person tends to endorse.",
      },

      { type: "heading", text: "2. What is OCD, actually?" },
      {
        type: "paragraph",
        text: "OCD has two core components that work together: obsessions and compulsions.",
      },
      {
        type: "paragraph",
        text: "Obsessions are intrusive, unwanted thoughts, images, or urges that cause significant distress. Common themes include fears of contamination, fears of causing harm, a need for symmetry or exactness, or unwanted taboo thoughts about violence, blasphemy, etc. Importantly, people with OCD don’t want these thoughts and usually find them upsetting or even repugnant to their own values – this is called being “ego-dystonic.”",
      },
      {
        type: "paragraph",
        text: "Compulsions are the behaviors or mental acts performed to reduce the distress the obsession causes, or to prevent some feared outcome. This might be washing hands, checking locks repeatedly, counting, silently repeating phrases, or seeking reassurance. Compulsions aren’t done for pleasure or enjoyment – they’re done to make an unbearable feeling stop, and they usually only work for a short period of time before the anxiety creeps back.",
      },
      {
        type: "paragraph",
        text: "Crucially, people with OCD generally recognize their obsessions and compulsions as excessive or irrational, at least some of the time. Insight varies, but the disorder tends to feel like being trapped by one’s own mind rather than living according to one’s own convictions.",
      },

      { type: "heading", text: "3. What is OCPD, actually?" },
      {
        type: "paragraph",
        text: "OCPD is one of the “Cluster C” personality disorders, characterized by a pervasive preoccupation with orderliness, perfectionism, and mental and interpersonal control, often at the expense of flexibility, openness, and efficiency.",
      },
      { type: "paragraph", text: "Someone with OCPD might:" },
      {
        type: "list",
        items: [
          "Get so absorbed in details, rules, lists, and schedules that the main point of the activity is lost",
          "Show perfectionism so extreme it interferes with finishing tasks",
          "Be excessively devoted to work at the expense of leisure and relationships",
          "Be inflexible about morality, ethics, or values",
          "Have difficulty discarding worn-out or worthless objects",
          "Be reluctant to delegate tasks unless others submit to exactly their way of doing things",
          "Be rigid and stubborn, or miserly with money",
        ],
      },
      {
        type: "paragraph",
        text: "Unlike OCD, these traits are typically “ego-syntonic” – they feel consistent with the person’s sense of self. A person with OCPD often believes their standards are simply correct, and that other people are careless, lazy, or incompetent by comparison. This is a major reason OCPD is harder to treat: the person may not see the pattern as a problem so much as evidence that everyone else needs to catch up.",
      },

      { type: "heading", text: "4. Where do people get them confused?" },
      {
        type: "paragraph",
        text: "Part of it is the name – “obsessive” and “compulsive” show up in both, and pop culture already uses “OCD” loosely to mean “neat” or “particular.” Someone who color-codes their bookshelf gets called “so OCD,” when that’s often just a preference, or an OCPD-style trait.",
      },
      {
        type: "paragraph",
        text: "Part of it is that both can look orderly from the outside – checking, arranging, rigid rules. But the function differs: in OCD, the behavior relieves a specific unwanted fear. In OCPD, it expresses what the person actually believes is correct.",
      },

      { type: "heading", text: "5. Why does the distinction matter (treatment)?" },
      {
        type: "paragraph",
        text: "The frontline treatment for OCD is Exposure and Response Prevention (ERP) – gradually facing feared situations while resisting the compulsion, so anxiety naturally fades. SSRIs (selective serotonin reuptake inhibitors), often at higher-than-usual doses, are also commonly used.",
      },
      {
        type: "paragraph",
        text: "OCPD doesn’t respond to ERP the same way, since there is no specific feared thought driving a ritual. Treatment instead focuses on broader psychotherapy that builds flexibility and helps the person see the real costs of their rigidity – often slower going, since the traits feel correct rather than distressing.",
      },
      {
        type: "paragraph",
        text: "Applying the wrong model stalls progress either way: ERP doesn’t have much to grab onto in a personality style, and treating OCD as a willpower issue misses the anxiety mechanics ERP and medication are built to interrupt. A clinician trained to tell the two apart is key to getting the plan right.",
      },

      { type: "heading", text: "6. You can have traits of both, actually!" },
      {
        type: "paragraph",
        text: "The two aren’t mutually exclusive – research suggests they co-occur more than chance would predict. When both are present, treatment usually still addresses them separately: ERP or medication for the OCD symptoms, broader therapy for rigid patterns.",
      },
    ],
  },
  {
    slug: "intolerance-of-uncertainty",
    title: "Intolerance of uncertainty",
    summary:
      "The engine underneath a lot of anxious behaviour: not knowing feels unbearable, so you try to make it stop.",
    status: "ready",
    minutes: 3,
    blocks: [
      {
        type: "paragraph",
        // "less like a gap ... and more like a threat" — the draft was missing
        // the "less", which left the sentence saying the opposite of the point.
        text: "Not knowing can feel less like a gap in information and more like a threat. When uncertainty feels unbearable, anxious behavior often shows up as an attempt to make the feeling stop, even if the short-term relief keeps the cycle going.",
      },

      { type: "heading", text: "1. What does it feel like from the inside?" },
      {
        type: "paragraph",
        text: "It can feel like mental static, a tight chest, and a strong urge to “just figure it out.” The mind keeps scanning for certainty: checking, rehearsing, asking again, planning ahead, or imagining worst-case outcomes. The goal is not always to solve a problem; often it is to get relief from the discomfort of not knowing.",
      },

      {
        type: "heading",
        text: "2. Why is “I just like to be prepared” sometimes true and sometimes not?",
      },
      {
        type: "paragraph",
        text: "Sometimes preparation is simply sensible. If you have an important meeting, a trip, or a difficult conversation, thinking ahead helps you function well. But when preparation turns into repeated checking, overthinking, or needing guarantees before you can act, it may be less about being prepared and more about trying to control uncertainty.",
      },
      {
        type: "paragraph",
        text: "A useful question is: does this planning help me move forward, or does it mainly help me feel safe for the moment?",
      },

      { type: "heading", text: "3. How does avoidance of not-knowing spread?" },
      {
        type: "paragraph",
        text: "Avoiding uncertainty can quietly expand. You might start by checking one thing, then need another confirmation, then another, until your life gets narrower around whatever feels most predictable. Over time, the brain learns that uncertainty is dangerous, so ordinary ambiguity starts to trigger more anxiety than it used to.",
      },
      {
        type: "paragraph",
        text: "That is why intolerance of uncertainty can sit underneath many anxious patterns, including reassurance-seeking, procrastination, perfectionism, and decision paralysis. The behavior works briefly, which makes it tempting, but it also teaches the nervous system that uncertainty must be escaped.",
      },

      { type: "heading", text: "4. What does tolerance actually mean here?" },
      {
        type: "paragraph",
        text: "Tolerance of uncertainty does not mean liking uncertainty or pretending it feels fine. It means learning that you can feel the discomfort of not knowing and still stay present, make a choice, or let the question remain unanswered for now. In practice, this often looks like less checking, less reassurance-seeking, and more willingness to act without perfect confidence.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "The aim isn’t total certainty. The aim is a wider capacity to live with “maybe” without treating it like an emergency.",
      },
    ],
  },
  {
    slug: "why-uncertainty-creates-anxiety",
    title: "Why uncertainty creates anxiety",
    summary:
      "A plain explanation of what your brain is doing when it treats an unknown as a threat.",
    status: "placeholder",
    minutes: 5,
    outline: [
      "Threat detection is a guessing machine",
      "Why the guess errs on the side of danger",
      "The relief trap",
      "Why reassurance wears off so fast",
    ],
  },
  {
    slug: "compulsive-planning",
    title: "When planning stops helping",
    summary:
      "Planning is a skill. It becomes a compulsion when it is driven by anxiety rather than by the task.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "Useful planning vs anxious planning",
      "The tell: how you feel if you cannot do it",
      "How over-planning shrinks a family's world",
      "What to try instead",
    ],
  },
  {
    slug: "reassurance-seeking",
    title: "Reassurance seeking",
    summary:
      "Why asking 'are you sure it will be fine?' feels helpful and works against you.",
    status: "placeholder",
    minutes: 5,
    outline: [
      "What counts as reassurance seeking",
      "The relief-then-return cycle",
      "Reassurance you ask for, and reassurance you give yourself",
      "What to do with the urge instead",
    ],
  },
  {
    slug: "overcontrol",
    title: "Overcontrol",
    summary:
      "When high standards, rigidity and control stop being strengths and start costing you connection.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "What overcontrol looks like day to day",
      "The costs that are easy to miss",
      "Why it is hard to see in yourself",
      "Loosening without losing yourself",
    ],
  },
  {
    slug: "family-accommodation",
    title: "Family accommodation",
    summary:
      "How the people who love you end up organising themselves around the anxiety — and what to do about it together.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "What accommodation is",
      "Why families do it (because it works, briefly)",
      "What it teaches children",
      "Reducing it kindly, and together",
    ],
  },
  {
    slug: "what-is-erp",
    title: "What ERP actually is",
    summary:
      "Exposure and Response Prevention, explained without jargon. The two halves and why both are needed.",
    status: "placeholder",
    minutes: 7,
    outline: [
      "The two words",
      "What exposure is and is not",
      "What response prevention means",
      "Why doing only half of it does not work",
      "What a session looks like in real life",
    ],
  },
  {
    slug: "how-erp-reduces-compulsions",
    title: "How ERP loosens compulsions",
    summary:
      "The mechanism: you are not waiting for anxiety to drop, you are collecting evidence that you can handle it.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "The old model: habituation",
      "The better model: inhibitory learning",
      "Why surprise is the active ingredient",
      "What that means for how you use this app",
    ],
  },
  {
    slug: "cognitive-distortions",
    title: "Common thinking traps",
    summary:
      "The handful of patterns that show up again and again — named, so they are easier to spot in the moment.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "Catastrophising",
      "All-or-nothing thinking",
      "Overestimating responsibility",
      "Emotional reasoning",
      "Thought-action fusion",
      "Noticing without arguing",
    ],
  },
  {
    slug: "modelling-flexibility",
    title: "Modelling flexibility for your children",
    summary:
      "Children learn how to handle uncertainty by watching someone do it. That is the part you can offer them.",
    status: "placeholder",
    minutes: 6,
    outline: [
      "What kids actually pick up",
      "Why 'do as I say' does not transfer",
      "Narrating your own coping out loud",
      "Letting them see you get it wrong",
    ],
  },
];
