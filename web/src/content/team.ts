/**
 * The people behind Deal the Day.
 *
 * ── To add someone ──────────────────────────────────────────────────────────
 * 1. Add an entry below. `id` is a short slug — it becomes the anchor in the
 *    page URL (/team#merisa) and the value articles use to credit an author.
 * 2. For a photo, drop the file in `web/public/team/` and set `photo` to its
 *    path, e.g. "/team/merisa.jpg". Square images look best; anything else is
 *    cropped to a circle from the centre.
 * 3. Without a photo the card shows their initials instead, so an entry is
 *    never blocked on waiting for a picture.
 *
 * `role` and `bio` are optional for the same reason. A name alone is a valid
 * entry, and the page renders it without apology.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface TeamMember {
  /** Slug used as the page anchor and as an article's `authorId`. */
  id: string;
  name: string;
  group: "snp-reach" | "camp-leader";
  /** What they do on the project. */
  role?: string;
  /** A sentence or two, in their own words where possible. */
  bio?: string;
  /** Path under `public/`, e.g. "/team/merisa.jpg". */
  photo?: string;
}

export const TEAM: TeamMember[] = [
  {
    id: "merisa",
    name: "Merisa Shukhova",
    group: "snp-reach",
    photo: "/team/merisa-shukhova.webp",
  },
  {
    id: "jolee-liu",
    name: "Jolee Liu",
    group: "snp-reach",
    photo: "/team/jolee-liu.webp",
  },
  {
    id: "jackie-zhang",
    name: "Jackie Zhang",
    group: "snp-reach",
    photo: "/team/jackie-zhang.webp",
  },
  {
    id: "emmy-weltsch",
    name: "Emmy Weltsch",
    group: "snp-reach",
    photo: "/team/emmy-weltsch.webp",
  },
  {
    id: "aashna-parsa",
    name: "Aashna Parsa",
    group: "snp-reach",
    photo: "/team/aashna-parsa.webp",
  },
  {
    id: "carina-lee",
    name: "Carina Lee",
    group: "snp-reach",
    photo: "/team/carina-lee.webp",
  },
  {
    id: "kaito-dirk",
    name: "Kaito Dirk",
    group: "snp-reach",
    photo: "/team/kaito-dirk.webp",
  },
  {
    id: "oscar-li",
    name: "Oscar Li",
    group: "snp-reach",
    photo: "/team/oscar-li.webp",
  },
  {
    id: "michael-kuoh",
    name: "Michael Kuoh",
    group: "snp-reach",
    photo: "/team/michael-kuoh.webp",
  },
  {
    id: "kara-horne",
    name: "Kara Horne",
    group: "snp-reach",
    photo: "/team/kara-horne.webp",
  },
  {
    id: "julie-ye",
    name: "Julie Ye",
    group: "snp-reach",
    photo: "/team/julie-ye.webp",
  },
  {
    id: "maya",
    name: "Maya",
    group: "camp-leader",
    role: "Camp Leader",
    photo: "/team/maya.webp",
  },
  {
    id: "ananyaa",
    name: "Ananyaa",
    group: "camp-leader",
    role: "Camp Leader",
    photo: "/team/ananyaa.webp",
  },
  {
    id: "zach",
    name: "Zach",
    group: "camp-leader",
    role: "Camp Leader",
    photo: "/team/zach.webp",
  },
];

export function findTeamMember(id: string): TeamMember | undefined {
  return TEAM.find((member) => member.id === id);
}

/** Up to two initials, for the fallback avatar. */
export function initials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
