import Link from "next/link";
import { findTeamMember } from "@/content/team";
import type { Article } from "@/content/types";

/**
 * Who wrote this, at the foot of an article.
 *
 * Renders nothing when there is no author, which is most of the library for
 * now — different people are writing different pieces, and an unattributed
 * article is better than a wrong byline.
 *
 * The name links to that person's card on the team page. An `authorId` that
 * matches nobody renders nothing rather than the raw slug — the article only
 * stores the id, so there is no name to fall back to.
 */
export function ArticleByline({ article }: { article: Article }) {
  if (!article.authorId) return null;

  const member = findTeamMember(article.authorId);
  if (!member) return null;

  return (
    <p className="mt-8 border-t border-border pt-5 text-sm text-text-muted">
      Written by{" "}
      <Link
        href={`/team#${member.id}`}
        className="font-medium text-primary underline"
      >
        {member.name}
      </Link>
      {member.role ? `, ${member.role}` : null}
    </p>
  );
}
