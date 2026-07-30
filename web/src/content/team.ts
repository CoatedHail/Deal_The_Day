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
  /** What they do on the project. */
  role?: string;
  /** A sentence or two, in their own words where possible. */
  bio?: string;
  /** Path under `public/`, e.g. "/team/merisa.jpg". */
  photo?: string;
}

export const TEAM: TeamMember[] = [
  // NEEDS-OWNER for all three: a role, a short bio, and a photo. Names are as
  // each person signed their drafts.
  {
    id: "merisa",
    name: "Merisa S",
  },
  {
    id: "jackie",
    name: "Jackie",
  },
  {
    id: "aashna",
    name: "Aashna P",
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
