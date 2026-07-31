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
    authorId: "aashna-parsa",
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
    status: "ready",
    minutes: 6,
    authorId: "kara-horne",
    blocks: [
      { type: "heading", text: "The smoke-alarm explanation" },
      {
        type: "paragraph",
        text: "Both versions below say the same thing at different ages. Pick the one that fits your child.",
      },
      {
        type: "tabs",
        tabs: [
          {
            label: "Ages 5–10",
            blocks: [
              { type: "subheading", text: "My Brain’s Smoke Alarm" },
              {
                type: "paragraph",
                text: "Everyone’s brain has a “smoke alarm.” It helps us notice when something might be dangerous or important.",
              },
              {
                type: "paragraph",
                text: "My smoke alarm is really good with details. Sometimes that’s really helpful—it helps me remember important things, solve problems, and take good care of the people I love.",
              },
              {
                type: "paragraph",
                text: "But sometimes my smoke alarm is a little too good at its job. It can go off even when everything is actually okay, like a smoke alarm that beeps because someone made toast.",
              },
              {
                type: "paragraph",
                text: "When that happens, I might seem worried, want things done a certain way, or need a little time to help my brain settle down. It isn’t because of you, and it isn’t your job to make my alarm feel better.",
              },
              {
                type: "paragraph",
                text: "I’m learning ways to help my smoke alarm tell the difference between a real fire and burnt toast. Everyone’s brain is different, and this is just one of the ways mine works.",
              },
              {
                type: "paragraph",
                text: "The most important thing to know is that I love you, and I’m taking care of my brain so I can take the best care of you.",
              },
            ],
          },
          {
            label: "Ages 11–15",
            blocks: [
              { type: "subheading", text: "How My Brain Works" },
              {
                type: "paragraph",
                text: "Think of your brain like it has a built-in smoke alarm. It’s there to notice danger, problems, or things that need attention.",
              },
              {
                type: "paragraph",
                text: "My brain’s alarm is especially sensitive. That’s one of my strengths—it helps me notice details, plan ahead, be organized, and care deeply. Those are qualities I’m proud of.",
              },
              {
                type: "paragraph",
                text: "The challenge is that sometimes my alarm reacts too strongly. It can tell me something is wrong, unfinished, or unsafe even when there isn’t a real problem. The feeling is real, even if the alarm isn’t accurate.",
              },
              {
                type: "paragraph",
                text: "That can look like me re-checking the same things, worrying more than I’d like, or finding it hard when things don’t go as planned or don’t feel “right.” Those are signs that my brain’s alarm needs recalibrating, not signs that something is actually wrong.",
              },
              {
                type: "paragraph",
                text: "I’m learning skills to help my brain tell the difference between a real emergency and a false alarm. It takes practice, but like any skill, practice makes improvement.",
              },
              {
                type: "paragraph",
                text: "You don’t need to manage my alarm or change what you do because of it. My job is to work with my brain, and your job is to keep being a kid. We can always talk about it; I’m here for you and I love you very much.",
              },
            ],
          },
        ],
      },

      { type: "heading", text: "What to avoid saying" },
      {
        type: "paragraph",
        text: "The goal is to avoid making the condition sound scary, shameful, or like the child needs to manage the parent’s emotions. Here are some helpful tips for rephrasing:",
      },
      {
        type: "table",
        columns: ["If you’re saying…", "Why it can be unhelpful", "Try"],
        rows: [
          [
            "“My brain is broken.”",
            "Can create shame or make kids worry that parent is not okay.",
            "“My brain works a little differently. It has strengths and sometimes it sends me extra-long signals that I’m learning to manage.”",
          ],
          [
            "“I can’t help it.”",
            "Can make it seem like the condition is out of control.",
            "“Sometimes my brain gives me strong feelings or urges and I’m practicing how to handle them.”",
          ],
          [
            "“You’re making me stressed.”",
            "Can make kids feel responsible for managing parent’s emotions.",
            "“I’m feeling stressed right now, and I’m going to take care of my feelings. You haven’t done anything wrong.”",
          ],
          [
            "“Please just do it this way so I don’t worry.”",
            "Can teach kids they need to change their behavior to keep the parent calm.",
            "“My brain is telling me I want things a certain way, but I’m practicing being flexible.”",
          ],
          [
            "“I can’t relax until everything’s done.”",
            "Can make kids feel pressure to help or fix things.",
            "“My brain likes things to feel complete, but I’m learning that I can rest even when things aren’t perfect.”",
          ],
          [
            "“I need things to be perfect.”",
            "Can create fear of mistakes.",
            "“My brain sometimes looks for the best or careful way to do things. I’m practicing remembering that good enough is often enough.”",
          ],
          [
            "“My OCD/OCPD makes me this way.”",
            "Can make it sound like the parent has no control.",
            "“OCD/OCPD affects how my brain reacts sometimes, but I’m learning skills to respond differently.”",
          ],
          [
            "“I’m just a perfectionist.”",
            "Can make struggles sound like a personality trait that the parent cannot change or improve.",
            "“I notice details and care about doing things well. I’m also working on flexibility and adapting.”",
          ],
          [
            "“Don’t touch/move/change that because it bothers me.”",
            "Can make children feel responsible for avoiding the parent’s discomfort.",
            "“That feels uncomfortable for my brain, and I’m practicing handling that feeling.”",
          ],
          [
            "“There’s a right way and a wrong way to do this.”",
            "Can make children feel criticized or afraid of making mistakes.",
            "“I have a preferred way, but there are often many good ways to do things.”",
          ],
        ],
      },

      { type: "heading", text: "Example scripts" },
      { type: "paragraph", text: "Child: Why do you worry about things so much?" },
      {
        type: "quote",
        text: "My brain works differently. It’s really good at noticing details and keeping me prepared, but sometimes my alarm system gets a little too loud. I’m learning how to turn the volume down sometimes.",
        attribution: "Parent",
      },
      { type: "paragraph", text: "Child: Why do you keep checking?" },
      {
        type: "quote",
        text: "My brain is giving me a strong ‘check again’ feeling. It feels real, but I’m practicing not always listening to that alarm.",
        attribution: "Parent",
      },
      { type: "paragraph", text: "Child: Are you upset because of me?" },
      {
        type: "quote",
        text: "No. I’m having a stressful moment, but that’s my feeling to handle. You didn’t cause it.",
        attribution: "Parent",
      },
      { type: "paragraph", text: "Child: Is that just how you are?" },
      {
        type: "quote",
        text: "OCD/OCPD affects my brain sometimes, but it doesn’t control me. I can learn new ways to respond.",
        attribution: "Parent",
      },
      { type: "paragraph", text: "Child: Can I do it differently?" },
      {
        type: "quote",
        text: "Yes. I might do it a particular way, but there can be lots of good ways to do something.",
        attribution: "Parent",
      },
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
    // Retitled by the author. The slug stays put so the URL does not move.
    title: "Encouraging children’s involvement in brave behavior",
    summary:
      "How children can join in and cheer a parent on, without being handed responsibility for how the parent feels.",
    status: "ready",
    minutes: 5,
    authorId: "aashna-parsa",
    blocks: [
      {
        type: "paragraph",
        text: "Families grow stronger when everyone feels connected, understood, and supported.",
      },
      {
        type: "paragraph",
        text: "When a parent is practicing how to respond differently to uncertainty, children may naturally notice. They might see a parent taking a moment before responding, trying something new, or handling a situation that feels uncomfortable.",
      },
      {
        type: "paragraph",
        text: "Inviting children to recognize and encourage brave behavior can help build empathy, teamwork, and trust within a family.",
      },
      {
        type: "paragraph",
        text: "At the same time, it is important to remember that children are not responsible for managing a parent’s emotions or making challenges disappear. The parent remains the parent. Adults are responsible for their own growth and support.",
      },
      {
        type: "paragraph",
        text: "A child’s role is not to become a coach, caretaker, or source of reassurance. Their role is to be a child, while also learning that families can support each other through moments of growth.",
      },
      {
        type: "callout",
        tone: "info",
        text: "The goal is to create a family message that “we can support each other while everyone continues to take care of their own responsibilities.”",
      },

      { type: "heading", text: "1. Making space for children to notice courage" },
      {
        type: "paragraph",
        text: "Children often recognize effort before adults realize they are paying attention. They may notice when a parent:",
      },
      {
        type: "list",
        items: [
          "Tries something outside their comfort zone",
          "Handles an unexpected change",
          "Takes time to respond instead of reacting quickly",
          "Practices being flexible",
          "Makes room for uncertainty",
        ],
      },
      {
        type: "paragraph",
        text: "These moments can become opportunities to model an important lesson:",
      },
      {
        type: "callout",
        tone: "erp",
        text: "Bravery does not mean something feels easy. Bravery means choosing a helpful response even when something feels challenging.",
      },
      { type: "paragraph", text: "A parent might say:" },
      {
        type: "quote",
        text: "That was a tricky moment for me, and I practiced being flexible.",
      },
      {
        type: "paragraph",
        text: "This helps children understand that everyone, including adults, continues learning. It also shows children that growth is something families can practice together.",
      },

      { type: "heading", text: "2. Inviting support without creating responsibility" },
      {
        type: "paragraph",
        text: "Children often want to help people they love. This is a strength. A child saying, “Are you okay?” or offering encouragement can be a meaningful moment of connection.",
      },
      {
        type: "paragraph",
        text: "However, there is an important difference between supporting someone and being responsible for someone’s feelings.",
      },
      { type: "paragraph", text: "Support sounds like:" },
      {
        type: "quote",
        text: "I noticed you tried something difficult. That was brave.",
      },
      { type: "paragraph", text: "Responsibility sounds like:" },
      {
        type: "quote",
        text: "I need to make sure my parent does not feel worried.",
      },
      {
        type: "paragraph",
        text: "Children should never feel that the family depends on them staying calm, avoiding certain topics, changing their behavior, or preventing a parent from feeling uncomfortable.",
      },
      {
        type: "callout",
        tone: "erp",
        title: "A helpful reminder for families",
        text: "Children can be part of the encouragement, but they are not in charge of the process.",
      },

      { type: "heading", text: "3. Helping children understand their role" },
      {
        type: "paragraph",
        text: "Clear roles can make children feel secure. Children can be encouraged to:",
      },
      {
        type: "list",
        items: [
          "Notice effort",
          "Offer kindness",
          "Celebrate progress",
          "Share their own feelings",
          "Participate in family conversations",
        ],
      },
      { type: "paragraph", text: "Parents can continue to:" },
      {
        type: "list",
        items: [
          "Make decisions",
          "Seek support when needed",
          "Practice their own coping skills",
          "Guide the family through challenges",
        ],
      },
      { type: "paragraph", text: "For example, a child might say:" },
      { type: "quote", text: "I’m proud of you for trying that." },
      { type: "paragraph", text: "And a parent might respond:" },
      {
        type: "quote",
        text: "Thank you. I’m proud of myself for practicing something difficult too.",
      },
      {
        type: "paragraph",
        text: "This creates connection without placing the child in a caregiving role.",
      },

      { type: "heading", text: "4. Building a family culture of courage" },
      {
        type: "paragraph",
        text: "Families can create an environment where trying matters more than being perfect. This might look like celebrating moments such as:",
      },
      {
        type: "list",
        items: [
          "Someone trying something new",
          "Someone adapting to a change",
          "Someone taking a pause before reacting",
          "Someone handling uncertainty with patience",
        ],
      },
      {
        type: "paragraph",
        text: "The focus is not on whether a challenge was completely easy or whether everyone felt comfortable. The focus is on the strengths shown along the way:",
      },
      {
        type: "list",
        items: ["Courage", "Flexibility", "Patience", "Understanding", "Growth"],
      },
      { type: "paragraph", text: "A family can practice saying:" },
      {
        type: "list",
        items: [
          "“We are all learning.”",
          "“We can support each other.”",
          "“Everyone’s feelings matter.”",
          "“No one has to be perfect to make progress.”",
        ],
      },

      { type: "heading", text: "Growing together, with everyone in their role" },
      {
        type: "paragraph",
        text: "A family’s strength comes from connection, not from everyone having the same responsibilities.",
      },
      {
        type: "paragraph",
        text: "When children see parents practicing courage, they learn an important lesson: challenges are part of life, and people can grow through them.",
      },
      {
        type: "paragraph",
        text: "When parents allow children to offer encouragement without asking them to carry the weight, children learn another important lesson: families can care for each other while still respecting each person’s role.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "The goal is not for children to fix difficult moments. The goal is for families to build a shared understanding: “We can encourage each other. We can grow together. And everyone gets to be supported, including the adults and the children.”",
      },
    ],
  },
  {
    slug: "avoiding-reassurance-traps",
    title: "Avoiding the reassurance trap",
    summary:
      "What to do when your child asks for certainty you cannot give — and when you want to ask for it yourself.",
    status: "ready",
    minutes: 5,
    authorId: "aashna-parsa",
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
    // Returned to placeholder deliberately. This carried a draft written to
    // fill the gap while the section was empty, not by anyone on the team, and
    // it was the only article on the site with no author. Clinical guidance on
    // self-regulation should carry a name. The outline below is that draft's
    // shape, kept as a brief for whoever takes it on; the prose itself is in
    // git history at 7f1f032 if it is worth starting from.
    status: "placeholder",
    minutes: 4,
    outline: [
      "The goal is not to feel calm",
      "The trap worth knowing about: when grounding becomes a compulsion",
      "Things that help without becoming rituals",
      "Saying it out loud in front of your children",
      "If it is consistently too much",
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
