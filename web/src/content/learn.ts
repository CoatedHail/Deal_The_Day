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
    authorId: "merisa",
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
    authorId: "merisa",
    title: "Intolerance of uncertainty",
    summary:
      "The engine underneath a lot of anxious behavior: not knowing feels unbearable, so you try to make it stop.",
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
    status: "ready",
    minutes: 3,
    authorId: "merisa",
    blocks: [
      {
        type: "paragraph",
        text: "Your brain is built to detect danger, and when something is unknown, it often treats that gap as a possible threat. Anxiety is what happens when the brain says, in effect, “I can’t be sure this is safe, so I should stay on alert.”",
      },

      { type: "heading", text: "1. Threat detection is a guessing machine" },
      {
        type: "paragraph",
        text: "The brain does not wait for the perfect information before it reacts. It makes fast guesses based on patterns, memory, and body signals, then prepares you for action. That system is useful when there is a real threat, but it can also fire when the problem is simply that you do not know what will happen.",
      },
      {
        type: "paragraph",
        text: "Uncertainty gives the brain too little to work with, so it often fills in the blanks with worry. If the situation matters to you, the mind leans toward caution.",
      },

      { type: "heading", text: "2. Why the guess errs on the side of danger" },
      {
        type: "paragraph",
        text: "From a survival point of view, false alarms are cheaper than missed threats. If your brain assumes “something might be wrong” and stays alert, that can feel uncomfortable, but it is safer than ignoring a real risk. The problem is that this ancient bias does not always match modern life, where many uncertainties are not dangerous at all.",
      },
      {
        type: "paragraph",
        text: "So the brain would rather create anxiety than miss a possible problem. It is not trying to make you miserable; it is trying to protect you using a very conservative rule.",
      },

      { type: "heading", text: "3. The relief trap" },
      {
        type: "paragraph",
        text: "When uncertainty feels bad, people naturally try to reduce it. They check, research, ask for reassurance, rehearse outcomes, or avoid the situation entirely. That can bring short-term relief, but it also teaches the brain that uncertainty is something to escape.",
      },
      {
        type: "paragraph",
        text: "Over time, the relief becomes part of the cycle. The brain starts linking “unknown” with “must fix now,” so the anxiety returns faster the next time uncertainty shows up.",
      },

      { type: "heading", text: "4. Why reassurance wears off so fast" },
      {
        type: "paragraph",
        text: "Reassurance can calm anxiety for a moment, but it rarely changes the brain’s deeper rule: “I need certainty to be safe.” Once the immediate reassurance fades, the original question comes back, often with a new one attached. That is why people can keep seeking reassurance and still feel stuck.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "The goal is not to eliminate uncertainty, which is impossible, but to change the brain’s response to it. When uncertainty stops being treated like an emergency, anxiety has less to grab onto.",
      },
    ],
  },
  {
    slug: "compulsive-planning",
    title: "When planning stops helping",
    summary:
      "Planning is a skill. It becomes a compulsion when it is driven by anxiety rather than by the task.",
    status: "ready",
    minutes: 5,
    authorId: "merisa",
    blocks: [
      {
        type: "paragraph",
        text: "Planning is one of the most useful things a mind can do. It’s also one of the easiest habits for anxiety to hijack, because an anxious plan and a useful plan can look identical from the outside. The difference is what’s driving it, and what happens when the plan gets interrupted.",
      },

      { type: "heading", text: "1. Useful planning vs. anxious planning" },
      {
        type: "paragraph",
        text: "Useful planning is bounded. You think through a problem, arrive at a decision or a checklist, and then you stop thinking about it until it’s time to act. It’s oriented toward the task – packing for a trip, prepping for a meeting, working out logistics for a family event – once the task is handled, the planning is done too.",
      },
      {
        type: "paragraph",
        text: "Anxious planning doesn’t have that off-switch. It’s oriented toward the feeling, not the task: the goal isn’t really to have a good itinerary, it’s to make the discomfort of not knowing go away. So it keeps running past the point of usefulness – re-checking a plan that’s already solid, adding contingencies for increasingly unlikely scenarios, mentally rehearsing a conversation for the fifth time. This tracks closely with what researchers call intolerance of uncertainty: a tendency to find “I don’t know what will happen” itself unbearable, regardless of how likely a bad outcome actually is. Planning becomes a way of trying to purchase certainty that isn’t actually for sale.",
      },

      { type: "heading", text: "2. The tell: How you feel if you can’t do it" },
      {
        type: "paragraph",
        text: "The clearest signal isn’t how much someone plans – some people genuinely enjoy it, or their jobs demand a lot of it. The signal is what happens when planning is blocked or interfered with.",
      },
      {
        type: "paragraph",
        text: "If a trip gets rearranged last-minute and someone can adapt, mutter “well, that’s annoying,” and move on, planning was a tool. If the same disruption produces a spike of dread, a compulsion to re-plan everything from scratch, or a need to contact everyone involved right away to restore the original plan, planning was functioning as a compulsion – a way of managing anxiety rather than managing logistics. The plan itself had become load-bearing for the person’s sense of safety, which is a heavier job than any itinerary should have to do.",
      },

      { type: "heading", text: "3. How over-planning shrinks a family’s world" },
      {
        type: "paragraph",
        text: "Over-planning rarely stays contained to the planner. Family members learn, often without anyone naming it, which kinds of spontaneity are “safe” to propose and which will trigger a spiral of what-ifs. Over time, this tends to narrow the family’s actual range of activity – fewer last-minute outings, less tolerance for anyone else’s looser style of things, more energy spent managing the planner’s anxiety than enjoying whatever was being planned. Family accommodation research in OCD and anxiety disorders describes a similar pattern: family members adjust their own behavior to prevent someone else’s distress, and while this brings short-term relief, it’s consistently linked to more severe symptoms and worse functioning over time, not less. The system optimizes for avoiding a bad feeling rather than for living well.",
      },

      { type: "heading", text: "4. What to try instead" },
      {
        type: "list",
        items: [
          "Separate the decision from the reassurance. Try to notice when you’ve already made a reasonable decision and are now just re-checking it for comfort. That re-checking is the compulsion, not the planning.",
          "Practice not knowing on purpose, in small doses (such as what Deal The Day provides you with!). Leave out a detail of a low-stakes plan unresolved – the restaurant, the exact departure time – and let the discomfort run its course without resolving it early. This is the same principle underneath Exposure and Response Prevention: staying with uncertainty long enough for your nervous system to learn it isn’t dangerous.",
          "Ask what the plan is actually protecting against. Naming the specific feared outcome, out loud, often makes it easier to see whether more planning would even help with it.",
        ],
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Charleston, R.N. (2016). Fear of the unknown: One fear to rule them all? Journal of Anxiety Disorders; Lebowitz, E.R., et al. (2013). Family accommodation in pediatric anxiety disorders; Strauss, C., Hale, L., & Stobie, B. (2015). A meta-analytic review of the relationship between family accommodation and OCD symptom severity. Journal of Anxiety Disorders.",
      },
    ],
  },
  {
    slug: "reassurance-seeking",
    authorId: "merisa",
    title: "Reassurance seeking",
    summary:
      "Why asking 'are you sure it will be fine?' feels helpful and works against you.",
    status: "ready",
    minutes: 5,
    blocks: [
      {
        type: "paragraph",
        text: "“Are you sure it will be fine?” seems like such a small question. It’s also one of the most well-studied maintaining factors in anxiety and OCD, because it feels like problem-solving while quietly functioning as a compulsion.",
      },

      { type: "heading", text: "1. What counts as reassurance seeking?" },
      {
        type: "paragraph",
        text: "Reassurance seeking is asking someone (or something – a search engine, a symptom checker, your own memory) to confirm that a feared outcome won’t happen, that you did something correctly, or that you’re a good person, when you already know the answer or when no answer could actually settle the question. It can be obvious – repeatedly asking a partner “do you still love me?” – or subtle: over-explaining a decision so someone will tell you it was the right call, re-reading a text message for the tenth time to check its tone, or asking a doctor for a fourth opinion on a result three doctors have already called normal.",
      },
      {
        type: "paragraph",
        text: "What makes it reassurance seeking rather than ordinary information-gathering is the pattern: the question isn’t really answerable to satisfaction, and even a clear “yes, it’s fine” doesn’t fully land. Something in the asking is aimed at relief rather than at new information.",
      },

      { type: "heading", text: "2. The relief-then-return cycle" },
      {
        type: "paragraph",
        text: "Reassurance works – for a few minutes. That's exactly the problem. The brief relief teaches the brain that asking is what makes the anxious feeling go away, which makes asking more likely next time, and often sooner. This mirrors the basic structure of a compulsion in OCD: an unwanted, distressing thought or doubt, followed by a behavior that neutralizes the distress temporarily, followed by the doubt returning – frequently a little stronger, because the underlying fear was never actually tested, only postponed. Reassurance doesn’t teach anyone that the feared thing was never dangerous; it teaches them that danger was narrowly avoided by asking in time. That’s a very different, and much more fragile, lesson.",
      },

      {
        type: "heading",
        text: "3. Reassurance you ask for, and reassurance you give yourself",
      },
      {
        type: "paragraph",
        text: "There's an important asymmetry between reassurance sought from others and the internal version – silently reviewing evidence in your own head to try to reach certainty. Both function the same way psychologically, but reassurance from other people also puts a cost on the relationship. The people closest to someone who seeks reassurance often end up organizing real time and energy around answering the same questions, which research on family accommodation identifies as a factor that tends to increase symptom severity rather than relieve it, even though everyone involved is acting out of care. The people giving reassurance aren't doing anything wrong by wanting to help; the pattern itself is what keeps the cycle going regardless of anyone's intentions.",
      },

      { type: "heading", text: "4. What to do with the urge instead" },
      {
        type: "list",
        items: [
          "Name it out loud, if only to yourself: “This is a reassurance urge, not an actual open question.” Naming the pattern is often enough to loosen its grip slightly.",
          // "white-knuckling" — the draft had "white-knickling".
          "Delay, don’t suppress. Rather than white-knuckling through refusing to ask, try setting a short delay – five minutes of waiting, then fifteen – before asking (or answering your own internal question). Delay lets you notice that the anxiety can shift on its own even without an answer.",
          "Answer once, then hold the line. If you’re on the receiving end of someone else’s reassurance-seeking, answering the same question honestly once and then gently declining to repeat it protects both of you from the cycle, even though it feels unkind in the moment.",
          "Sit with the “maybe.” Most reassurance questions are really requests for certainty. Practicing tolerance for “I don’t fully know, and I’m choosing to act anyway” is closer to the actual skill than getting better answers.",
        ],
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Salkovskis, P. M., & Warwick, H. M. C. (1986). Morbid preoccupations, health anxiety and reassurance: A cognitive-behavioural approach. Behaviour Research and Therapy. Rachman, S. (2002). A cognitive theory of compulsive checking. Behaviour Research and Therapy. Lebowitz, E. R., & Omer, H. (2013). Treating Childhood and Adolescent Anxiety: A Guide for Caregivers.",
      },
    ],
  },
  {
    slug: "overcontrol",
    authorId: "merisa",
    title: "Overcontrol",
    summary:
      "When high standards, rigidity and control stop being strengths and start costing you connection.",
    status: "ready",
    minutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "Self-control is generally treated as an unambiguous virtue – the trait behind delayed gratification, discipline, and getting things done. Research on \"overcontrol,\" most developed through Thomas Lynch's work on Radically Open Dialectical Behavior Therapy (RO-DBT), suggests it has a ceiling. Past a certain point, more control stops improving a person's life and starts quietly costing them their connection to it.",
      },

      { type: "heading", text: "1. What overcontrol looks like day to day" },
      {
        type: "paragraph",
        text: "Overcontrolled traits often look admirable from the outside: someone reserved and cautious, an exceptional rule-follower, hard-working to the point of self-sacrifice, rarely emotionally expressive, difficult to catch off guard. RO-DBT research describes five recurring themes – inhibited or disingenuous emotional expression, hyper-detailed and overly cautious behavior, rigid rule-following, an aloof or distant relational style, and a tendency toward social comparison and quiet resentment. None of these are dramatic on their own. Together, they describe someone who has learned to manage life primarily by tightening their grip on it.",
      },

      { type: "heading", text: "2. The costs that are easy to miss" },
      {
        type: "paragraph",
        text: "Because overcontrol produces competence, its costs tend to stay hidden – from the person themselves and from everyone around them. The research literature associates significant overcontrol with social isolation, loneliness, and difficulty forming close relationships, even when the person is surrounded by people. High inhibitory control makes it hard to signal warmth or vulnerability in ways others can read, which means people around an overcontrolled person often experience them as harder to connect with than they intend to be. Overcontrol is also linked to more severe, harder-to-treat conditions when it goes unaddressed, including treatment-resistant depression, anorexia nervosa, and obsessive-compulsive personality disorder – not because control itself is the disorder, but because it becomes the mechanism keeping the person stuck.",
      },

      { type: "heading", text: "3. Why it is hard to see in yourself" },
      {
        type: "paragraph",
        text: "Overcontrol is largely ego-syntonic: it doesn't feel like a problem, it feels like being responsible, being the reliable one, having standards other people lack. Because the traits are rewarded – at work, in school, sometimes by entire families – there's rarely external pressure prompting the person to question them. The discomfort, when it shows up, tends to get interpreted as a reason to control harder (more planning, more rules, more self-discipline) rather than as a signal that the strategy itself has limits. This is part of why overcontrol is described as a spectrum of temperament and coping style rather than a single symptom to spot: it's less \"does this person have a problem\" and more \"how much room is left in this person's life for anything to be uncertain, spontaneous, or shared.\"",
      },

      { type: "heading", text: "4. Loosening without losing yourself" },
      {
        type: "paragraph",
        text: "The goal isn't to become someone who has no self-control – that's neither realistic nor desirable. RO-DBT frames the target as radical openness: the willingness to actively seek out the parts of life you'd normally avoid or find uncomfortable, with genuine curiosity about being wrong rather than certainty about being right. In practice that can mean:",
      },
      {
        type: "list",
        items: [
          "Letting other people see an unpolished reaction occasionally, instead of the composed version",
          "Asking someone else to make a decision you'd normally control, and living with their choice",
          "Treating a mistake as data rather than as evidence you need tighter rules",
          "Practicing expressing a genuine feeling in the moment it happens, rather than processing it privately first and reporting a tidy summary later",
        ],
      },
      {
        type: "paragraph",
        text: "None of this requires becoming a different kind of person. It requires treating flexibility itself as a skill worth practicing, the same way discipline was once practiced.",
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Lynch, T. R. (2018). Radically Open Dialectical Behavior Therapy: Theory and Practice for Treating Disorders of Overcontrol. Lynch, T. R., & Cheavens, J. S. (2008). Dialectical behavior therapy for comorbid personality disorders. Journal of Clinical Psychology. Lynch, T. R., et al. (2015). Radically open-dialectical behavior therapy for disorders of over-control. American Journal of Psychotherapy.",
      },
    ],
  },
  {
    slug: "what-is-erp",
    authorId: "merisa",
    title: "What ERP actually is",
    summary:
      "Exposure and Response Prevention, explained without jargon. The two halves and why both are needed.",
    // Split back into two articles now that both are written. They were merged
    // while unwritten, on the reasoning that the setup would have to be written
    // twice; the delivered drafts share no setup and the first cross-references
    // the second by name, so the author's structure is two pieces.
    status: "ready",
    minutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "Exposure and Response Prevention gets described a lot of ways – “facing your fears,” “leaning into discomfort,” “the gold-standard OCD treatment.” All roughly true, and all vague enough to miss what actually makes it work.",
      },

      { type: "heading", text: "1. The two words" },
      {
        type: "paragraph",
        text: "ERP is genuinely two separate ingredients, and the name tells you both. “Exposure” is deliberately contacting whatever triggers the individual – a thought, a situation, a sensation. “Response Prevention” is not performing the compulsion/action that would normally follow. Neither half is optional, and neither half is the whole treatment on its own. Exposure without response prevention just means being distressed and then doing the ritual anyway, which doesn’t change anything. Response prevention without exposure – simply trying to white-knuckle through not doing compulsions while avoiding triggers entirely – doesn’t give the brain the chance to learn anything new either. It’s the combination that does the work.",
      },

      { type: "heading", text: "2. What exposure is and what it is not" },
      {
        type: "paragraph",
        text: "Exposure means deliberately, gradually, and repeatedly encountering the source of the fear – touching a doorknob for someone with contamination fears, sitting with an unwanted intrusive thought without pushing it away, driving over a bridge for someone afraid of causing harm. It's not about \"getting used to\" danger, and it's not about proving bravery. The point is testing a prediction: the obsession predicts something bad will happen, or that the anxiety will be unbearable and never end, and exposure is the only way to actually find out what happens when the prediction goes untested.",
      },
      {
        type: "paragraph",
        text: "Exposure is also not the same as flooding someone with their worst fear all at once with no plan. Most ERP is built as a hierarchy, moving from moderately distressing triggers toward the most difficult ones, so the person is building real evidence at a pace that's demanding but survivable.",
      },

      { type: "heading", text: "3. What response prevention means" },
      {
        type: "paragraph",
        text: "Response prevention is refraining from the compulsion – the washing, checking, counting, reassurance-seeking, mental reviewing, or avoidance – that would normally follow the trigger. This includes both obvious physical compulsions and quieter mental ones, like silently repeating a \"safe\" phrase or replaying a memory to check it. Response prevention is often the harder half psychologically, because the urge to perform the compulsion peaks right when the anxiety is highest, which is exactly when it's hardest to resist.",
      },

      { type: "heading", text: "4. Why doing only half of it does not work" },
      {
        type: "paragraph",
        text: "Compulsions work in the short term – that's the entire problem. Every time someone performs a compulsion after a trigger, they get brief relief, and that relief teaches the brain that the compulsion was necessary to prevent something bad, or to make the anxiety bearable. This reinforces the belief that gave rise to the compulsion in the first place, rather than testing it. Skipping response prevention means every exposure ends in a \"rescue,\" which keeps the underlying belief intact no matter how much exposure happens around it. This is the core reason ERP requires both halves working together rather than either one in isolation.",
      },

      { type: "heading", text: "5. What a session looks like in real life" },
      {
        type: "paragraph",
        text: "A typical ERP session starts by identifying a specific trigger from the person's hierarchy and a clear plan: what exposure will happen, and what compulsion will be resisted. The person then does the exposure – actually touches the doorknob, actually sits with the intrusive thought – while a therapist (or, later, the person on their own) tracks distress and resists the urge to neutralize it. Sessions often continue until there's some shift in the person's experience of the fear, not necessarily until anxiety drops to zero; more recent research, discussed further in \"How ERP loosens compulsions,\" suggests the goal isn't watching anxiety fall in the room but building a new, competing piece of learning that holds up outside it. Between sessions, the same exposures get repeated and expanded, because the learning consolidates with repetition, not with a single successful attempt.",
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Foa, E. B., & Kozak, M. J. (1986). Emotional processing of fear: Exposure to corrective information. Psychological Bulletin. Abramowitz, J. S. (2006). Understanding and Treating Obsessive-Compulsive Disorder: A Cognitive Behavioral Approach. Craske, M. G., et al. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy.",
      },
    ],
  },
  {
    slug: "how-erp-reduces-compulsions",
    authorId: "merisa",
    title: "How ERP loosens compulsions",
    summary:
      "The mechanism: you are not waiting for anxiety to drop, you are collecting evidence that you can handle it.",
    status: "ready",
    minutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "For decades, the standard explanation for why ERP works was habituation: stay with the fear long enough and your anxiety will naturally fall, so you learn the trigger isn't dangerous. That model isn't wrong exactly, but a substantial body of research has moved past it, because it turns out anxiety dropping during a session isn't actually what predicts whether ERP helps.",
      },

      { type: "heading", text: "1. The old model: habituation" },
      {
        type: "paragraph",
        text: "The habituation account treats fear the way you’d treat a loud noise in a quiet room – startling at first, then fading into the background the longer it plays. Applied to exposure therapy, the idea was that repeated, prolonged contact with a feared trigger causes anxiety to decline within a session (and across sessions), and that this decline in fear is the mechanism of improvement. Therapists using this model often paid close attention to whether a person’s anxiety dropped by the end of an exposure, treating a within-session drop as the marker of success.",
      },

      { type: "heading", text: "2. The better model: inhibitory learning" },
      {
        type: "paragraph",
        text: "Research led by psychologist Michelle Craske and colleagues found that the amount anxiety drops during an exposure doesn't reliably predict how well someone does afterward – some people improve significantly with little in-session habituation, and some habituate fully in-session but relapse anyway. Their alternative, the inhibitory learning model, proposes something different: the old fear association (this trigger predicts danger) doesn't get erased by exposure. Instead, a new, competing association gets built alongside it (this trigger does not predict danger), and the new one has to become strong enough to win out and be retrieved even outside the safety of a therapy session. Treatment success depends less on how calm someone feels by the end of an exposure and more on how solid and how retrievable that new, competing learning is.",
      },

      { type: "heading", text: "3. Why is surprise the active ingredient?" },
      {
        type: "paragraph",
        // "unbearably anxious" — the draft had "unbearable anxious".
        text: "Under this model, what actually drives learning is a mismatch between what someone expected to happen and what actually happened – an “expectancy violation.” If someone predicts touching a doorknob will make them unbearably anxious for hours, and it turns out the anxiety peaks and then genuinely eases within twenty minutes, that gap between prediction and reality is the thing the brain encodes. The bigger and more genuine that mismatch, the stronger the new learning tends to be. This is part of why exposures are often designed to maximize surprise – varying the situation, occasionally combining multiple fears at once, or deliberately not reassuring someone in advance that “it’ll be fine” – rather than simply repeating the same predictable exposure until boredom sets in.",
      },

      { type: "heading", text: "4. What does that mean for how you use Deal The Day?" },
      {
        type: "paragraph",
        text: "Practically, this shifts what to pay attention to during exposure practice. A session where anxiety stays uncomfortably high the whole way through isn’t a failure – what matters is whether the feared outcome you predicted actually happened, and whether you can hold onto that evidence afterward. It also explains why variety and repetition across different contexts, rather than one long, perfect exposure, tend to produce more durable results: inhibitory learning needs to be retrieved successfully in multiple situations before it reliably beats out the old fear association everywhere it might show up, not just in the room where it was first learned.",
      },

      { type: "subheading", text: "Sources" },
      {
        type: "paragraph",
        text: "Craske, M. G., Treanor, M., Conway, C. C., Zbozinek, T., & Vervliet, B. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy. Craske, M. G., et al. (2008). Optimizing inhibitory learning during exposure therapy. Behaviour Research and Therapy. Bouton, M. E. (2002). Context, ambiguity, and unlearning: Sources of relapse after behavioral extinction. Biological Psychiatry.",
      },
    ],
  },
  {
    slug: "cognitive-distortions",
    title: "Common thinking traps",
    summary:
      "The handful of patterns that show up again and again — named, so they are easier to spot in the moment.",
    status: "ready",
    minutes: 3,
    authorId: "jackie-zhang",
    blocks: [
      {
        type: "paragraph",
        text: "Our brains love taking shortcuts to help us decide things fast, but when anxiety, OCD, OCPD, or obsessive habits chip in, those shortcuts turn into predictable traps that can trick our minds.",
      },
      {
        type: "paragraph",
        text: "A thinking trap does not mean that you're irrational or doing anything wrong. It is just a pattern your mind has learned to use when it is trying to keep you or your family safe. The problem is that these patterns can make uncertainty feel more dangerous than it really is.",
      },
      {
        type: "paragraph",
        text: "Learning to recognize these habits is about noticing when your brain has slipped into a familiar pattern and choosing not to let it make every decision for you. Below are some of the habits people may exhibit.",
      },

      { type: "heading", text: "1. Catastrophizing" },
      {
        type: "paragraph",
        text: "Catastrophizing is when your mind automatically jumps to the worst possible outcome. You might think: “If I don't check one more time, something terrible could happen.”",
      },
      {
        type: "paragraph",
        text: "Your brain treats unlikely possibilities as though they are imminent dangers; however, it is important to remember that uncertainty is always going to be part of life, and what we can do is not let our mind’s worst fears control us.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "Next time you start catastrophizing, you could ask yourself: “Is my brain trying to predict the future, or is it trying to protect me from uncertainty?”",
      },

      { type: "heading", text: "2. All-or-nothing thinking" },
      { type: "paragraph", text: "This trap sees only extremes. Things are either:" },
      {
        type: "list",
        items: ["perfect or ruined", "success or failure", "safe or dangerous"],
      },
      {
        type: "paragraph",
        text: "Real life almost never operates in black-and-white terms. We all learn through trial and error, and recovery is never a straight slope. Try to look for the shades of gray in life and accept messy progress.",
      },

      { type: "heading", text: "3. Overestimating responsibility" },
      {
        type: "paragraph",
        text: "Many parents naturally feel responsible for their children, but anxiety can make you feel fully responsible for things that no one can actually control. You may start believing it's your job to prevent every mistake, every disappointment, and every possible future problem. Then, you may find yourself constantly monitoring, checking, and planning.",
      },
      {
        type: "callout",
        tone: "erp",
        text: "A useful reminder: “I am responsible for my actions—not for controlling every outcome.”",
      },

      { type: "heading", text: "The bigger picture" },
      {
        type: "paragraph",
        text: "These thinking traps all have something in common: they promise certainty.",
      },
      {
        type: "list",
        items: [
          "“If I prepare enough…”",
          "“If I control enough…”",
          "“If I worry enough…”",
        ],
      },
      { type: "paragraph", text: "…then maybe nothing bad will happen." },
      {
        type: "callout",
        tone: "info",
        text: "Certainty of the future is uncontrollable, but what we can learn is how to live well without knowing exactly what comes next.",
      },
    ],
  },
];
