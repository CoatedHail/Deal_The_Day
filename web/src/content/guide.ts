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
    authorId: "merisa",
    title: "Talking about not knowing",
    summary:
      "How to make 'we'll find out' a normal, safe thing to hear in your house.",
    status: "ready",
    minutes: 5,
    blocks: [
      { type: "heading", text: "1. Making uncertainty ordinary" },
      { type: "paragraph", text: "Researchers who study anxiety describe intolerance of uncertainty as one of the core engines underneath it - a tendency to experience “I don't know what will happen” as inherently threatening, regardless of how likely a bad outcome actually is. That tendency isn't fixed from birth; it's shaped by experience, including how uncertainty gets handled in the home a child grows up in. A house where every unknown gets resolved immediately, where “I don't know” is treated as an emergency to fix rather than a normal state to sit in, quietly teaches a child that not knowing is dangerous. A house where uncertainty shows up often, in low-stakes ways, and gets handled without alarm teaches the opposite lesson just as effectively - often without a single direct conversation about anxiety at all." },
      { type: "paragraph", text: "Making uncertainty ordinary means resisting the urge to over-resolve small unknowns. “We don't know yet if the game is going to be outside or inside - we'll find out when we get there” is a small, repeatable rehearsal of tolerating an open question, and it's more powerful precisely because it's mundane." },
      { type: "heading", text: "2. Answering questions you genuinely cannot answer" },
      { type: "paragraph", text: "Children ask questions adults can't actually answer - will grandma get better, will we have enough money, will the thing I'm scared of happen - and the instinct is often to either fabricate certainty (“nothing bad will happen”) or shut the question down. Both responses skip past the more useful move, which is modeling how to hold a real unknown honestly. “I don't know for sure, and that's an uncomfortable thing to sit with - here's what we do know, and here's what we're doing about the parts we can control” gives a child something more durable than false reassurance: a demonstration that not knowing doesn't have to mean falling apart. It also happens to be true, which matters, because children tend to notice when reassurance doesn't match reality, and that mismatch can undermine trust in future reassurance too." },
      { type: "heading", text: "3. Games and moments that build the muscle" },
      { type: "paragraph", text: "Tolerance for uncertainty is a skill, and like most skills it's built through small, repeated practice rather than one big conversation. A few low-stakes ways to build it into ordinary life:" },
      {
        type: "list",
        items: [
          "Let a plan stay unresolved on purpose. (just like what our game recommends!) Leave the restaurant choice, the game, or the weekend activity undecided until the day of, and narrate the “we'll see” out loud instead of resolving it early for comfort.",
          "Play games with real chance in them. Card and dice games where outcomes genuinely aren't controllable give children low-stakes, repeated practice losing, winning, and not knowing which is coming - practice that transfers more than it might seem to.",
          "Ask “what if we don't know” as a normal question, not a crisis one: “what if we don't know until tomorrow whether the trip is happening - what would we do in the meantime?” This treats not-knowing as a situation to plan around rather than a problem to eliminate.",
          "Notice and name successful tolerance out loud. “You didn't know how that test would go and you did it anyway” reinforces the skill more than reassurance would have.",
        ],
      },
      { type: "heading", text: "4. Example scripts" },
      {
        type: "list",
        items: [
          "“I don't know the answer to that yet. That's an uncomfortable feeling, and it's okay to have it - we'll find out together.”",
          "“We're not going to decide that right now. Let's see what happens and figure it out when we get there.”",
          "“You're asking because not knowing feels bad. I get that. I'm not going to guess just to make the feeling go away, because I'd probably be guessing wrong.”",
          "“That didn't go the way either of us expected - and look, we handled it anyway.”",
        ],
      },
      { type: "subheading", text: "Sources" },
      { type: "paragraph", text: "Carleton, R. N. (2016). Fear of the unknown: One fear to rule them all? Journal of Anxiety Disorders. Dugas, M. J., & Robichaud, M. (2007). Cognitive-Behavioral Treatment for Generalized Anxiety Disorder: From Science to Practice. Freeston, M. H., et al. (1994). Why do people worry? Personality and Individual Differences." },
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
    slug: "family-accommodation",
    authorId: "merisa",
    title: "Family accommodation",
    summary:
      "How the people who love you end up organizing themselves around the anxiety — and what to do about it together.",
    status: "ready",
    minutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "When someone in a family struggles with anxiety or OCD, the people who love them usually want to help. Often, \"helping\" quietly turns into something with a name in the research literature: family accommodation – and it tends to make things harder to treat, not easier.",
      },

      { type: "heading", text: "1. What accommodation is" },
      {
        type: "paragraph",
        text: "Family accommodation refers to the ways family members change their own behavior to help a relative avoid distress connected to their symptoms. It shows up in a few recognizable forms: participating directly in rituals (a parent washing their hands the way a child insists on), helping someone avoid a feared situation altogether (driving a longer route to skip a bridge), and modifying household routines to fit around symptoms (the whole family eating dinner an hour later because of a checking ritual). Researcher Eli Lebowitz and colleagues, who have studied this extensively in pediatric OCD, describe it as strikingly common – most parents of children with OCD report engaging in significant accommodation, often without realizing how much their daily routines have been reshaped around it.",
      },

      { type: "heading", text: "2. Why families do it (because it works, briefly)" },
      {
        type: "paragraph",
        text: "Accommodation isn't a parenting failure or a sign of enabling in the pejorative sense – it's a completely understandable response to watching someone you love in real distress. In the moment, accommodating reduces the person's anxiety, and often reduces conflict too: it's simply easier to hand over the reassurance, take the longer route, or do the check yourself than to sit through someone's escalating panic. That short-term relief is exactly why the pattern is so sticky. It reliably works, right up until it doesn't.",
      },
      {
        type: "paragraph",
        text: "The research on this is consistent across a large number of studies: higher levels of family accommodation are associated with more severe OCD symptoms, greater functional impairment, and worse treatment outcomes, including higher rates of dropping out of therapy. Accommodating the anxiety, in other words, tends to feed it.",
      },

      { type: "heading", text: "3. What it teaches children" },
      {
        type: "paragraph",
        text: "Beyond maintaining the symptom itself, accommodation sends a quiet message: this fear is dangerous enough that we need to organize around it. Children are highly attuned to what their parents treat as threatening, partly through the kind of observational learning Albert Bandura described decades ago – kids don't just learn from what they're told, they learn from watching what the adults around them avoid, dread, or work hard to prevent. A family that consistently accommodates a child's OCD, however lovingly, can end up reinforcing the belief that the feared outcome truly requires that much protection, making it harder for the child to discover on their own that they could tolerate the anxiety without the ritual or the avoidance.",
      },

      { type: "heading", text: "4. Reducing it kindly, and together" },
      {
        type: "paragraph",
        text: "Reducing accommodation isn't about withdrawing support – it's about changing the kind of support offered, and doing it gradually and as a team rather than as a unilateral withdrawal that feels like abandonment.",
      },
      {
        type: "list",
        items: [
          "Name the pattern together, without blame. Most accommodation happens gradually enough that no one notices it becoming the norm.",
          "Reduce accommodation slowly, with warning, rather than stopping abruptly. Sudden withdrawal tends to spike distress and can undermine trust.",
          "Replace participation with support. Instead of doing the ritual with someone, a family member can acknowledge how hard the anxiety is and decline to participate – support for the person, not for the compulsion.",
          "Loop in a clinician if accommodation is significant. Programs built specifically around reducing family accommodation exist, and treating it as a family-level target – not just an individual one – tends to produce better outcomes than the person \"fixing it\" alone.",
        ],
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Lebowitz, E. R., et al. (2013). Family accommodation in obsessive-compulsive disorder. Expert Review of Neurotherapeutics. Strauss, C., Hale, L., & Stobie, B. (2015). A meta-analytic review of the relationship between family accommodation and OCD symptom severity. Journal of Anxiety Disorders. Bandura, A. (1977). Social Learning Theory.",
      },
    ],
  },
  {
    slug: "modeling-flexibility",
    authorId: "merisa",
    title: "Modeling flexibility for your children",
    summary:
      "Children learn how to handle uncertainty by watching someone do it. That is the part you can offer them.",
    // Filed in the parent guide rather than the psychoeducation library. It is
    // a parenting topic, and it was cut from /learn on exactly that reasoning
    // before the text existed.
    status: "ready",
    minutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "Parents often ask how to teach their kids to handle uncertainty better than they themselves do. The honest, well-supported answer is a little uncomfortable: children learn far more from watching what you do with your own anxiety than from anything you tell them about theirs.",
      },

      { type: "heading", text: "1. What kids actually pick up" },
      {
        type: "paragraph",
        text: "Albert Bandura's foundational work on observational learning showed that children acquire behaviors, emotional reactions, and attitudes largely by watching people around them, not just by being instructed. Applied to anxiety specifically, a substantial body of research finds that children whose parents model anxious behavior – visible tension, avoidance of certain situations, verbal expressions of worry – tend to adopt similar anxious responses themselves, even when no one is directly teaching them to worry. In one well-known experimental study, children showed measurably more fear and avoidance after simply watching a parent respond fearfully to an unfamiliar situation, compared to children who watched a parent respond calmly. The transmission happens through demonstration, not lecture.",
      },

      { type: "heading", text: "2. Why “do as I say” does not transfer" },
      {
        type: "paragraph",
        text: "This is why explicitly telling a child \"there's nothing to be afraid of\" tends to do so little, if the child also watches you check the locks three times before bed or avoid a highway you find stressful. Children are highly attuned to the gap between what adults say and what they visibly do, and when the two conflict, behavior tends to win. Verbal reassurance without a matching demonstration of coping is basically asking a child to believe something that isn't being modeled anywhere in their environment. It's not that words don't matter – it's that they're a much smaller part of the transmission than most parents assume.",
      },

      { type: "heading", text: "3. Narrating your own coping out loud" },
      {
        type: "paragraph",
        text: "Because so much of anxious modeling is unconscious and automatic – a tense shoulder, a rushed avoidance of a topic -- one of the more useful things a parent can do is make coping visible rather than trying to hide the anxiety altogether. That doesn't mean broadcasting every worry. It means narrating the coping step, out loud, in age-appropriate language: \"I'm feeling a bit nervous about this call, so I'm going to take a breath and just make it,\" rather than either hiding the nervousness completely or spiraling into it visibly. This gives a child something concrete to imitate – not \"Mom is never anxious,\" which isn't true and isn't believable anyway, but \"here's what Mom does when she's anxious,\" which is both true and teachable.",
      },

      { type: "heading", text: "4. Letting them see you get it wrong" },
      {
        type: "paragraph",
        text: "Perhaps counterintuitively, letting children see a parent make a mistake, get a plan wrong, or have to recover from disappointment is itself valuable modeling – as long as they also see the recovery. A parent who never seems to make mistakes doesn't teach a child how to handle making one; a parent who visibly gets something wrong, has a reasonable reaction, and moves forward is demonstrating exactly the skill of tolerating imperfection and uncertainty that anxious or rigid children often need most. The goal isn't performing calm at all times. It's showing a full, honest cycle: something didn't go as planned, here's how a person handles that, and life continues.",
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Bandura, A. (1977). Social Learning Theory. de Rosnay, M., Cooper, P. J., Tsigaras, N., & Murray, L. (2006). Transmission of social anxiety from mother to infant: An experimental study. Behaviour Research and Therapy. Fisak, B., & Grills-Taquechel, A. E. (2007). Parental modeling, reinforcement, and information transfer: Risk factors in the development of child anxiety? Clinical Child and Family Psychology Review.",
      },
    ],
  },
  {
    slug: "regulating-yourself",
    authorId: "merisa",
    title: "Steadying yourself in the moment",
    summary:
      "What to do with your own spike while it is happening — and the one trap to avoid.",
    // Was held at placeholder because the draft filling this gap had no
    // author, and clinical guidance on self-regulation should carry a name.
    // It does now.
    status: "ready",
    minutes: 5,
    blocks: [
      { type: "heading", text: "1. The goal is not to feel calm" },
      { type: "paragraph", text: "It's natural to treat “get calm” as the objective when you're supporting someone through a hard moment - or managing your own anxious spike. But research on exposure and anxiety treatment consistently finds that how much anxiety drops in the moment isn't actually what predicts whether things go well afterward. What matters more is whether you can stay functional and present while the feeling is happening, not whether you can make the feeling disappear. Chasing calm as the goal tends to backfire, because it turns “am I calm yet?” into one more thing to monitor and fail at, which usually raises anxiety rather than lowering it. A more workable goal is staying upright and useful while activated - showing up for the moment at an 8 out of 10 rather than waiting until you're back down to a 2." },
      { type: "heading", text: "2. The trap worth knowing about: when grounding becomes a compulsion" },
      { type: "paragraph", text: "Grounding techniques - noticing five things you can see, holding something cold, focusing on your feet on the floor - are genuinely useful tools for regulating a nervous system in the moment. The trap is using them the way a compulsion gets used: reaching for them automatically, every single time, specifically to make the anxious feeling go away as fast as possible, rather than as an occasional aid to staying present. When a grounding technique becomes something you need to perform before you can tolerate a feeling at all, it can start functioning less like stabilization and more like avoidance - quietly preventing the natural process of sitting with the feeling long enough to learn it isn't dangerous. The distinction isn't whether you use grounding; it's whether you could, if you needed to, get through the moment without it." },
      { type: "heading", text: "3. Things that help without becoming rituals" },
      {
        type: "list",
        items: [
          "Slow, natural breathing - not a rigid four-count box-breath performed to exact specification every time, just breathing that isn't shallow and rushed.",
          "Naming what's happening, briefly and without elaborating: “this is a spike, it will move through.” One pass, not a repeated internal script.",
          "Physical movement - a short walk, stretching, changing rooms - engages the body without becoming a strict, must-be-done-this-way ritual.",
          "Checking in with a value, not a feeling: “what does the next five minutes actually need from me,” rather than “how do I make this stop.”",
        ],
      },
      { type: "paragraph", text: "The through-line: these help you tolerate the moment, rather than trying to abort it. If any of them starts to feel non-negotiable - like skipping it would be unthinkable - that's worth noticing." },
      { type: "heading", text: "4. Saying it out loud in front of your children" },
      { type: "paragraph", text: "Children learn far more from watching a parent manage a hard moment than from being told to manage their own. Naming your own coping, briefly and honestly, in front of your kids - “I'm feeling pretty activated right now, so I'm going to take a breath and keep going” - gives them a real, observable model of what handling anxiety looks like, rather than either a performance of constant calm (which isn't believable) or an unexplained spiral (which is frightening without context). The goal isn't a tidy speech. A single honest sentence, followed by you actually doing the thing, teaches more than an explanation would." },
      { type: "heading", text: "5. If it is consistently too much" },
      { type: "paragraph", text: "There's a real difference between an anxious spike that's uncomfortable but passable, and one that consistently overwhelms your ability to function or support anyone else. If steadying yourself is something you're struggling with regularly rather than occasionally - if the spikes are getting more frequent, more intense, or harder to move through even with these tools - that's worth bringing to a clinician directly, rather than treating it as something to just manage better on your own. Supporting someone else through their hard moments depends on having enough steadiness of your own to draw on, and that steadiness sometimes needs its own support." },
      { type: "subheading", text: "Sources" },
      { type: "paragraph", text: "Craske, M. G., et al. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy. Salkovskis, P. M. (1991). The importance of behaviour in the maintenance of anxiety and panic. Behavioural Psychotherapy. Bandura, A. (1977). Social Learning Theory." },
    ],
  },
  {
    slug: "supporting-exposures",
    authorId: "merisa",
    title: "Supporting an exposure without forcing it",
    summary:
      "Consent matters. How to stay alongside someone doing something hard without pushing them into it.",
    status: "ready",
    minutes: 6,
    blocks: [
      { type: "heading", text: "1. Why forced exposure backfires" },
      { type: "paragraph", text: "It's tempting to think of exposure as something you can push someone through - that if the fear itself isn't dangerous, forcing contact with it should work just as well as agreeing to it. Research doesn't support that shortcut. Perceived control over an exposure is itself part of what makes it work: people who feel they have some say in the pace and intensity of an exposure tend to approach the feared situation more, and tolerate it better, than people who feel it's being done to them. Clinical guidance on exposure is consistent on this point - it's described as a carefully paced, collaborative procedure, not something to spring on someone or push past their stated limits, because doing so risks teaching a different, worse lesson: that fear itself is unbearable and that they have no control over what happens to their own body. That's the opposite of what exposure is supposed to teach." },
      { type: "paragraph", text: "For a parent, this means the instinct to physically walk a child toward the thing they're afraid of, or refuse to let them retreat once they've said stop, usually backfires - even when the underlying logic (“the dog won't bite you, just pet it”) is completely correct. Being right about the safety of the situation doesn't make forcing it a good idea." },
      { type: "heading", text: "2. Agreeing the step in advance" },
      { type: "paragraph", text: "The single most protective thing you can do is decide the exposure together, before it starts, in calm conditions rather than in the moment. That means naming the specific step (not “face your fear” in the abstract, but “touch the doorknob and then sit at the table without washing your hands for ten minutes”), agreeing on it out loud, and treating that agreement as the plan you're both committed to. This does two things: it gives the person doing the exposure genuine ownership of the difficulty they're choosing to face, and it gives you, as the supporter, a clear boundary for what you're actually there to help with - you're not there to invent new demands mid-exposure, and you're not there to rescue them from the one you agreed to." },
      { type: "heading", text: "3. What to say during the exposure" },
      { type: "paragraph", text: "Your job during the exposure itself is smaller than it might feel like it should be. You're not there to talk them out of their anxiety, argue them out of the fear, or promise them it will be fine - reassurance during an exposure tends to function the same way a compulsion does, quietly undoing some of the learning the exposure is meant to build. What helps more is staying present, calm, and non-judgmental: acknowledging that this is hard without trying to make the hardness go away. Something as simple as “I see this is really tough, and you're doing it anyway” does more than trying to problem-solve the fear in real time." },
      { type: "heading", text: "4. What to do if someone stops partway" },
      { type: "paragraph", text: "Stopping isn't failure, and treating it as failure - yours or theirs - tends to make the next attempt harder, not easier. If someone needs to stop, the most useful response is a calm, non-shaming acknowledgment (“okay, we're stopping there”) followed by, once things have settled, a conversation about what happened and whether the step was too big, not whether the person is capable. Adjusting the size of the next attempt is a normal part of building a hierarchy, not a sign the whole approach is failing. What matters most is that the decision to stop is respected in the moment - arguing someone back into an exposure once they've said no reintroduces the coercion that undermines the whole process." },
      { type: "heading", text: "5. Example scripts" },
      {
        type: "list",
        items: [
          "Before starting: “So the plan is: you touch the handle, and we wait ten minutes before you wash. If it gets too much, you can say stop and we'll pause - no arguing about it in the moment, we can talk after.”",
          "During, if anxiety spikes: “This is the hard part. You don't have to feel calm right now - you just have to stay with it a little longer if you can.”",
          "If they stop: “Okay, we're stopping. That's allowed. Let's talk in a bit about what we try next time.”",
          "Afterward, regardless of outcome: “You did something difficult on purpose. That's the whole point - how it felt isn't the measure of whether it worked.”",
        ],
      },
      { type: "subheading", text: "Sources" },
      { type: "paragraph", text: "Salkovskis, P. M. (1991). The importance of behaviour in the maintenance of anxiety and panic: A cognitive account. Behavioural Psychotherapy. Craske, M. G., et al. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy. Kindt, M., et al. (2021). Perceived control and approach behavior in specific phobia." },
    ],
  },
];
