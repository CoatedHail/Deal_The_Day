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
    status: "ready",
    minutes: 8,
    authorId: "aashna",
    blocks: [
      { type: "paragraph", text: "Many children notice more than adults realize." },
      {
        type: "paragraph",
        text: "They may notice that a parent spends a long time checking something, avoids certain situations, needs things done a particular way, becomes overwhelmed when routines change, or asks for reassurance often. They may not know why these things happen, but they often create their own explanations.",
      },
      { type: "paragraph", text: "A child might think:" },
      {
        type: "list",
        items: [
          "“Did I do something wrong?”",
          "“Are they upset with me?”",
          "“Do I need to help them feel better?”",
          "“Why can’t we just leave?”",
          "“Why does this rule matter so much?”",
        ],
      },
      {
        type: "paragraph",
        text: "When a child does not have an explanation, they may fill in the gaps themselves. Talking about OCD or OCPD does not mean sharing every detail or making a child part of the problem. It means giving them enough understanding to know what is happening, what is not their responsibility, and how they can still have a safe and normal relationship with their parent.",
      },
      {
        type: "callout",
        tone: "info",
        text: "The goal is not to make a child an expert on OCD or OCPD. The goal is to help them understand: “This is something my parent experiences, but it is not something I have to fix.”",
      },

      { type: "heading", text: "1. What children already notice" },
      {
        type: "paragraph",
        text: "Before deciding what to say, it helps to recognize that many children are already observing patterns. Children are often highly aware of changes in their environment. They may notice:",
      },
      {
        type: "list",
        items: [
          "A parent repeatedly asking for reassurance (“Are you sure everything is okay?”)",
          "Extra time spent checking, organizing, cleaning, or planning",
          "Stress when things do not go according to a plan",
          "Avoidance of certain activities or places",
          "Strong reactions to mistakes or uncertainty",
          "Family routines changing around one person’s fears or needs",
        ],
      },
      {
        type: "paragraph",
        text: "Even younger children may sense that something feels different, but they may not have the words to describe it.",
      },
      {
        type: "paragraph",
        text: "Without context, children can sometimes misunderstand these behaviors. They may interpret anxiety as anger, avoidance as rejection, or strict rules as a sign that they are doing something wrong. An age-appropriate explanation can replace confusion with understanding.",
      },

      { type: "heading", text: "2. How much detail by age" },
      {
        type: "paragraph",
        text: "There is no single “right age” to talk about OCD or OCPD. The amount of information a child needs depends less on their exact age and more on their maturity, what they are noticing, and how much the condition affects family life.",
      },
      {
        type: "callout",
        tone: "erp",
        title: "The general rule",
        text: "Children need enough information to understand what is happening, but not so much that they feel responsible for it.",
      },

      {
        type: "subheading",
        text: "Younger children (approximately elementary age)",
      },
      {
        type: "paragraph",
        text: "Younger children usually do not need a detailed explanation of diagnoses. They often benefit from simple, concrete language. Focus on:",
      },
      {
        type: "list",
        items: [
          "What they see",
          "What it means",
          "What they can do",
          "What is not their job",
        ],
      },
      {
        type: "script",
        situation:
          "Avoid explanations that make the child feel like a helper or protector.",
        instead: "I need you to be patient because my OCD makes things hard.",
        tryThis:
          "Sometimes things may take longer because I am working through something. You can still ask questions or tell me how you feel.",
      },

      { type: "subheading", text: "Middle school-aged children" },
      {
        type: "paragraph",
        text: "Many children at this age can understand more about mental health and diagnoses. They may appreciate knowing the name of what is happening. You might explain:",
      },
      {
        type: "quote",
        text: "This is called OCD. It can cause people to have unwanted thoughts or feel like they need to do certain things to reduce anxiety. It is something I experience, but I am responsible for managing it.",
      },
      {
        type: "paragraph",
        text: "If discussing OCPD, the focus may be on patterns such as perfectionism, control, or difficulty with flexibility. The important part is separating the person from the behavior:",
      },
      {
        type: "quote",
        text: "Having OCPD traits does not mean someone does not care. It means certain patterns can become very strong and can sometimes affect how people respond.",
      },

      { type: "subheading", text: "Teenagers" },
      {
        type: "paragraph",
        text: "Teenagers often notice family dynamics very clearly. They may already have questions but avoid asking because they do not want to upset a parent. Teens may benefit from a more open conversation about:",
      },
      {
        type: "list",
        items: [
          "What the condition is",
          "How it affects daily life",
          "What treatment or support looks like",
          "What boundaries are important",
        ],
      },
      { type: "paragraph", text: "A helpful message:" },
      {
        type: "quote",
        text: "I want you to understand what is happening, but I do not want you to feel responsible for managing it. My mental health is my responsibility. Your job is to be my child.",
      },
      {
        type: "paragraph",
        text: "This distinction can be especially important for teens who naturally want to support their family.",
      },

      { type: "heading", text: "3. Naming it without handing over the weight" },
      {
        type: "paragraph",
        text: "One of the hardest parts of these conversations is finding the balance between honesty and responsibility. Children deserve honesty. But honesty does not mean sharing every fear, thought, or struggle.",
      },
      { type: "paragraph", text: "A child should not become:" },
      {
        type: "list",
        items: [
          "The person who provides constant reassurance",
          "The person who changes their behavior to prevent anxiety",
          "The person who monitors symptoms",
          "The person who feels guilty for triggering stress",
        ],
      },
      { type: "paragraph", text: "A helpful question before sharing something is:" },
      {
        type: "quote",
        text: "Am I telling my child this so they understand me, or because I need them to make me feel better?",
      },
      {
        type: "paragraph",
        text: "The first creates connection. The second can accidentally place emotional responsibility on the child.",
      },
      {
        type: "paragraph",
        text: "This shows accountability without making the child responsible for comforting the parent.",
      },
      {
        type: "paragraph",
        text: "Children also benefit from hearing that adults can struggle and still be loving, capable caregivers. Mental health challenges do not define a parent-child relationship.",
      },

      { type: "heading", text: "4. Answering ‘will I get it too?’" },
      {
        type: "paragraph",
        text: "Many children worry about whether they will experience the same struggles as their parent. This question can come from curiosity, fear, or a desire to understand themselves. A simple answer:",
      },
      {
        type: "quote",
        text: "Having a parent with OCD or OCPD does not mean you will definitely have it. Some people may be more likely to experience certain traits, but many factors affect mental health, including experiences, environment, and support.",
      },
      {
        type: "paragraph",
        text: "Avoid making children feel like they are waiting for something to happen. Instead, focus on skills everyone can build:",
      },
      {
        type: "list",
        items: [
          "Learning how to handle uncertainty",
          "Talking about emotions",
          "Asking for help when needed",
          "Practicing flexibility",
          "Recognizing unhelpful thought patterns",
        ],
      },
      { type: "paragraph", text: "You can also remind them:" },
      {
        type: "quote",
        text: "If you ever notice something that worries you, you can always talk to me. We can figure things out together.",
      },
      {
        type: "paragraph",
        text: "The conversation does not need to become a prediction about their future. It can become an opportunity to normalize mental health.",
      },
      {
        type: "paragraph",
        text: "A child does not need a perfect explanation. They need reassurance that they are loved, that they are safe, and that the responsibility for managing OCD or OCPD belongs with the adults and their support systems. Talking openly about mental health can help children build empathy without taking on a burden that was never theirs to carry.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "The goal is not for children to understand everything. The goal is for them to understand enough to know: “My parent has something they are working through. I did not cause it. And I am still allowed to be a kid.”",
      },
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
    status: "ready",
    minutes: 5,
    authorId: "aashna",
    blocks: [
      {
        type: "paragraph",
        text: "Have you ever found yourself asking the same question again and again, hoping the answer will finally make the worry go away? Maybe it sounds like:",
      },
      {
        type: "list",
        items: [
          "“Are you sure everything will be okay?”",
          "“What if something goes wrong?”",
          "“Are you sure we made the right choice?”",
        ],
      },
      {
        type: "paragraph",
        text: "These questions often come from a very understandable place: wanting to protect the people you care about, make good decisions, and feel prepared for what comes next.",
      },
      {
        type: "paragraph",
        text: "The challenge is that some questions do not have definite answers. When uncertainty feels uncomfortable, it can seem like one more explanation, one more conversation, or one more confirmation will finally bring relief. Sometimes it does, but often only temporarily.",
      },
      {
        type: "paragraph",
        text: "A few minutes later, the worry may return, bringing the urge to ask again. This is known as the reassurance trap.",
      },
      {
        type: "callout",
        tone: "info",
        text: "The goal is not to stop caring or stop asking questions. It is learning when reassurance is helping you understand something, and when it is keeping you stuck searching for certainty that may not exist.",
      },

      { type: "heading", text: "1. Spotting the loop" },
      {
        type: "paragraph",
        text: "The reassurance trap often follows a familiar pattern:",
      },
      {
        type: "quote",
        text: "A worry appears → you look for reassurance → you feel better briefly → uncertainty returns → you seek reassurance again.",
      },
      {
        type: "paragraph",
        text: "The difficult part is that reassurance can feel helpful in the moment. It creates a sense of safety, but the brain may begin to learn that uncertainty is something that must always be removed.",
      },
      {
        type: "paragraph",
        text: "Some signs you may be caught in this loop include:",
      },
      {
        type: "list",
        items: [
          "Asking the same question multiple times in different ways",
          "Replaying a decision and looking for proof that it was correct",
          "Seeking repeated confirmation from family members or friends",
          "Feeling unable to move forward until someone else agrees you made the right choice",
          "Experiencing only short-term relief after getting an answer",
        ],
      },
      {
        type: "paragraph",
        text: "Noticing this pattern is the first step toward changing it.",
      },

      {
        type: "heading",
        text: "2. The difference between information and reassurance",
      },
      {
        type: "paragraph",
        text: "Questions are not the problem. Asking for information is a normal and important part of life. Information helps you learn, decide, or take action. For example:",
      },
      {
        type: "list",
        items: [
          "“What time does the appointment start?”",
          "“What are the next steps?”",
          "“What information do we need?”",
        ],
      },
      {
        type: "paragraph",
        text: "Once you have the answer, you can usually move forward. Reassurance is different because it is often trying to create complete certainty. For example:",
      },
      {
        type: "list",
        items: [
          "“Are you sure I didn’t make the wrong choice?”",
          "“Can you promise everything will work out?”",
          "“Are you absolutely certain nothing bad will happen?”",
        ],
      },
      {
        type: "paragraph",
        text: "The difference is not always the question itself. It is what you are hoping the answer will do.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "Is it helping you solve a problem, or is it trying to make an uncomfortable feeling disappear?",
      },

      {
        type: "heading",
        text: "3. Responding warmly without answering the question again",
      },
      {
        type: "paragraph",
        text: "When someone we care about is worried, it is natural to want to comfort them by providing answers. Reassurance can feel like a way of showing love and support. But sometimes, repeatedly answering the same question can unintentionally keep the cycle going.",
      },
      {
        type: "script",
        situation: "When the same worried question comes round again.",
        instead: "Yes, everything will be okay. I promise.",
        tryThis: "I’m not 100% sure, but we can try our best to make it work.",
      },
      {
        type: "paragraph",
        text: "The goal is not to dismiss worry. It is to show that uncertainty can be uncomfortable without being impossible to handle.",
      },

      { type: "heading", text: "4. When you are the one seeking it" },
      {
        type: "paragraph",
        text: "It is easy to recognize reassurance-seeking in others, but it can be harder to notice in ourselves. You might find yourself wondering:",
      },
      {
        type: "list",
        items: [
          "“Did I handle that situation the right way?”",
          "“Should I have done something differently?”",
          "“Am I making the best decision?”",
        ],
      },
      {
        type: "paragraph",
        text: "These questions often come from caring deeply. Wanting to do the right thing is a strength. But sometimes the search for the “perfect” answer can become exhausting.",
      },
      {
        type: "paragraph",
        text: "When you notice yourself looking for reassurance, try asking:",
      },
      {
        type: "list",
        items: [
          "“Am I looking for new information, or am I looking for certainty?”",
          "“Will this answer actually solve the problem, or will I need another answer later?”",
          "“Can I allow some uncertainty while still moving forward?”",
        ],
      },
      {
        type: "paragraph",
        text: "Avoiding the reassurance trap does not mean ignoring concerns or refusing support. It means learning that not every uncomfortable feeling needs an immediate answer.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "Sometimes the most helpful thing we can practice is not certainty — but confidence that we can handle uncertainty.",
      },
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
