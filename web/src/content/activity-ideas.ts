import type { IconName } from "@/components/ui/Icon";
import type { ActivityCategory } from "@/lib/types";

export interface ActivityIdeaCategory {
  slug: string;
  title: string;
  /**
   * Which of the seven stored categories this section belongs to.
   *
   * The relationship is many-to-one and deliberately so. The stored categories
   * drive the pre-draw checklists, and a family should not be asked to author
   * ten of those; browsing wants more buckets than checklists do.
   *
   * Left undefined for a section that describes a *constraint* rather than a
   * kind of activity. "Low-cost or free" cuts across food, outdoors and
   * at-home alike, so filing it under any one of them would be false.
   */
  category?: ActivityCategory;
  description: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  photographer: string;
  sourceUrl: string;
  ideas: readonly string[];
}

export const ACTIVITY_IDEA_CATEGORIES = [
  {
    slug: "food-restaurants",
    category: "food",
    title: "Food and restaurants",
    description: "Let someone else choose the place, order, timing, or route.",
    icon: "cards",
    image: "/activity-ideas/food-restaurants.jpg",
    imageAlt: "A family sharing a meal around a table in a café",
    photographer: "Gültac Əşrəfli",
    sourceUrl: "https://www.pexels.com/photo/family-eating-at-a-restaurant-15239613/",
    ideas: [
      "Try a restaurant nobody in the family has visited",
      "Let a child choose the restaurant",
      "Order a dish you have never tried",
      "Choose from the menu without researching it first",
      "Visit a food truck or market stall",
      "Have breakfast for dinner",
      "Pick a dessert to share",
      "Try a cuisine that is new to the family",
      "Let someone else place the whole takeout order",
      "Eat at a busy café without checking wait times",
      "Build a picnic from three items chosen at the store",
      "Cook a meal from a randomly selected recipe",
    ],
  },
  {
    slug: "outdoor-activities",
    category: "outdoors",
    title: "Outdoor activities",
    description: "Make room for weather, timing, and plans that cannot be fully controlled.",
    icon: "sparkle",
    image: "/activity-ideas/outdoor-activities.jpg",
    imageAlt: "A family playing a lawn game together in a sunny park",
    photographer: "RDNE Stock project",
    sourceUrl: "https://www.pexels.com/photo/a-family-playing-outdoors-8798928/",
    ideas: [
      "Take a walk with no fixed route",
      "Visit a neighborhood playground",
      "Go on a family bike ride",
      "Fly a kite",
      "Play catch, frisbee, or a lawn game",
      "Try an easy nature trail",
      "Look for birds, insects, or interesting leaves",
      "Have a picnic in a local park",
      "Visit a community garden",
      "Watch the sunset from a new spot",
      "Go puddle jumping after light rain",
      "Let a child lead an outdoor scavenger hunt",
    ],
  },
  {
    slug: "arts-creativity",
    category: "creative",
    title: "Arts and creativity",
    description: "Practice making something playful without needing a perfect result.",
    icon: "journal",
    image: "/activity-ideas/arts-creativity.jpg",
    imageAlt: "Two children painting a large colorful picture together",
    photographer: "Anastasia Shuraeva",
    sourceUrl: "https://www.pexels.com/photo/children-doing-painting-6966355/",
    ideas: [
      "Paint or draw with a limited set of colors",
      "Make a collage from old magazines",
      "Build something from cardboard boxes",
      "Write a silly family story one sentence at a time",
      "Make sidewalk chalk art",
      "Try air-dry clay or homemade salt dough",
      "Put on a family talent show",
      "Take themed photographs around the neighborhood",
      "Learn a simple song together",
      "Create costumes from clothes already at home",
      "Decorate cookies without matching a reference picture",
      "Make handmade cards for someone",
    ],
  },
  {
    slug: "local-attractions",
    category: "outing",
    title: "Local attractions",
    description: "Explore somewhere nearby and let the visit unfold at its own pace.",
    icon: "lifebuoy",
    image: "/activity-ideas/local-attractions.jpg",
    imageAlt: "A parent and child watching fish together at an aquarium",
    photographer: "Deane Bayas",
    sourceUrl: "https://www.pexels.com/photo/father-with-child-visiting-aquarium-10127367/",
    ideas: [
      "Visit a museum or gallery",
      "Go to an aquarium or zoo",
      "Tour a local historic site",
      "Visit a botanical garden",
      "Try a miniature-golf course",
      "Go bowling",
      "Attend a community theater performance",
      "Explore a science center",
      "Visit a farmers market",
      "Take a library tour and choose books",
      "See a local sports game",
      "Choose an attraction from a community noticeboard",
    ],
  },
  {
    slug: "everyday-errands",
    category: "everyday",
    title: "Everyday errands",
    description: "Turn ordinary tasks into manageable uncertainty practice.",
    icon: "clipboard",
    image: "/activity-ideas/everyday-errands.jpg",
    imageAlt: "A parent and child choosing groceries together in a store aisle",
    photographer: "Gustavo Fring",
    sourceUrl: "https://www.pexels.com/photo/family-doing-shopping-in-the-grocery-store-3985093/",
    ideas: [
      "Let someone else choose the grocery-store route",
      "Shop with a short list and no aisle-by-aisle plan",
      "Try a different grocery store",
      "Return a library book and browse for ten minutes",
      "Pick up a household item without comparing every option",
      "Wash the car together",
      "Visit the post office",
      "Take public transportation for a familiar errand",
      "Let a child choose one item for dinner",
      "Combine two errands without planning every stop",
      "Donate outgrown clothes or toys",
      "Walk to a nearby errand instead of driving",
    ],
  },
  {
    slug: "at-home-activities",
    category: "everyday",
    title: "At-home activities",
    description: "Use familiar surroundings while someone else chooses what happens next.",
    icon: "home",
    image: "/activity-ideas/at-home.jpg",
    imageAlt: "A family laughing while playing a card game at home",
    photographer: "Dziana Hasanbekava",
    sourceUrl: "https://www.pexels.com/photo/photograph-of-a-family-playing-a-card-game-8213255/",
    ideas: [
      "Play a board or card game chosen by someone else",
      "Build a blanket fort",
      "Have a family movie night with a surprise pick",
      "Bake something without aiming for perfect decoration",
      "Create an indoor scavenger hunt",
      "Learn a dance from a short video",
      "Hold a living-room picnic",
      "Do a puzzle together",
      "Try a simple science experiment",
      "Make a family playlist",
      "Swap roles for preparing dinner",
      "Choose three random objects and invent a game",
    ],
  },
  {
    slug: "short-trips",
    category: "outing",
    title: "Short trips",
    description: "Take a small change of scenery without planning every minute.",
    icon: "arrow-right",
    image: "/activity-ideas/short-trips.jpg",
    imageAlt: "A family relaxing together during a sunny beach outing",
    photographer: "MUHAMMED TARIK KAHRAMAN",
    sourceUrl: "https://www.pexels.com/photo/family-on-a-sunny-beach-16604178/",
    ideas: [
      "Spend a morning in a nearby town",
      "Take a day trip to a beach, lake, or river",
      "Visit a state or regional park",
      "Ride a train or ferry for the experience",
      "Pick a destination within a one-hour drive",
      "Stay one night somewhere nearby",
      "Visit relatives without scheduling every activity",
      "Follow a scenic route chosen by someone else",
      "Stop at one interesting place spotted along the way",
      "Try a family-friendly campground",
      "Visit a small festival in another town",
      "Pack a simple lunch and choose the destination that morning",
    ],
  },
  {
    slug: "social-activities",
    category: "connection",
    title: "Social activities",
    description: "Connect with other people while allowing plans and conversations to vary.",
    icon: "family",
    image: "/activity-ideas/social-activities.jpg",
    imageAlt: "A family smiling together during a picnic on the grass",
    photographer: "Helena Lopes",
    sourceUrl: "https://www.pexels.com/photo/happy-family-enjoying-outdoor-picnic-together-27177006/",
    ideas: [
      "Invite another family for a casual meal",
      "Meet friends at a park",
      "Attend a neighborhood event",
      "Host a bring-your-own-game evening",
      "Volunteer for a short community project",
      "Join a library or recreation-center activity",
      "Plan a potluck where each person brings something",
      "Call a relative and let the conversation unfold",
      "Attend a school or community performance",
      "Try a beginner family class",
      "Have a picnic with friends",
      "Let the children choose a group game",
    ],
  },
  {
    slug: "seasonal-activities",
    title: "Seasonal activities",
    description: "Use what the season offers, even when weather and crowds are unpredictable.",
    icon: "calendar",
    image: "/activity-ideas/seasonal-activities.jpg",
    imageAlt: "A parent and child exploring a pumpkin patch in autumn",
    photographer: "Lisa from Pexels",
    sourceUrl: "https://www.pexels.com/photo/father-and-child-at-a-pumpkin-patch-in-autumn-28903410/",
    ideas: [
      "Visit a pumpkin patch or apple orchard",
      "Look at neighborhood holiday lights",
      "Build a snow figure or play in fresh snow",
      "Plant herbs or flowers in spring",
      "Have a summer water-balloon game",
      "Collect leaves and make rubbings",
      "Visit a seasonal market or fair",
      "Make a seasonal snack together",
      "Go on a first-day-of-the-season walk",
      "Choose a costume from items already at home",
      "Watch a meteor shower or look for constellations",
      "Create a family tradition and let it stay imperfect",
    ],
  },
  {
    slug: "low-cost-free",
    title: "Low-cost or free activities",
    description: "Choose simple experiences that do not require a purchase or big plan.",
    icon: "sparkle",
    image: "/activity-ideas/low-cost-free.jpg",
    imageAlt: "A family playing together on a neighborhood playground",
    photographer: "Anete Lusina",
    sourceUrl: "https://www.pexels.com/photo/family-having-fun-on-playground-together-5239932/",
    ideas: [
      "Visit a new playground",
      "Borrow books, games, or passes from the library",
      "Take a neighborhood photo walk",
      "Go on a color or shape scavenger hunt",
      "Attend a free community event",
      "Have a no-cost picnic with food from home",
      "Explore a public garden or walking trail",
      "Make paper airplanes and test them",
      "Trade favorite books with friends",
      "Watch clouds and invent stories about their shapes",
      "Do a family cleanup at a park or street",
      "Visit a free museum day or outdoor concert",
    ],
  },
] as const satisfies readonly ActivityIdeaCategory[];

/** Every slug that exists, so a bad reference fails the build. */
export type IdeaSlug = (typeof ACTIVITY_IDEA_CATEGORIES)[number]["slug"];

/**
 * Sections that name a kind of activity, and sections that name a constraint.
 *
 * Split because they answer different questions — "what are we doing" against
 * "however we do it, it has to be free". Shown as one list they read as ten
 * peers, which is why nothing ever lined up with the stored categories.
 */
/**
 * The same list at its declared type.
 *
 * `as const` is what makes `IdeaSlug` a real union, but it also means the
 * entries without a `category` are a different shape from the ones with one,
 * and the union has no such property to read. Widening here costs nothing and
 * keeps the slug checking.
 */
const ALL: readonly ActivityIdeaCategory[] = ACTIVITY_IDEA_CATEGORIES;

export const IDEA_KINDS = ALL.filter((entry) => entry.category);
export const IDEA_CONSTRAINTS = ALL.filter((entry) => !entry.category);

export function findIdeaCategory(slug: string): ActivityIdeaCategory | undefined {
  return ALL.find((entry) => entry.slug === slug);
}
