import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { Article } from "@/content/types";

const ARTICLE_ICONS: Record<string, Record<string, IconName>> = {
  "/learn": {
    "ocd-vs-ocpd": "balance",
    "intolerance-of-uncertainty": "question",
    "why-uncertainty-creates-anxiety": "pulse",
    "compulsive-planning": "calendar",
    "family-accommodation": "family",
    "what-is-erp": "target",
    "cognitive-distortions": "brain",
  },
  "/guide": {
    "talking-with-children": "message",
    "explaining-anxiety": "pulse",
    "discussing-uncertainty": "question",
    "encouraging-brave-behavior": "shield",
    "avoiding-reassurance-traps": "repeat",
    "regulating-yourself": "pause",
    "supporting-exposures": "people",
  },
};

/** Card list used by both the psychoeducation library and the parent guide. */
export function ArticleIndex({
  articles,
  basePath,
}: {
  articles: Article[];
  basePath: string;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            href={`${basePath}/${article.slug}`}
            className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary-border hover:bg-primary-soft"
          >
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-primary-soft p-2 text-primary" aria-hidden="true">
                <Icon name={ARTICLE_ICONS[basePath]?.[article.slug] ?? "book"} size={20} />
              </span>
              <h2 className="min-w-0 flex-1 font-display text-lg font-semibold leading-snug text-text">
                {article.title}
              </h2>
              <Icon
                name="arrow-right"
                size={18}
                className="mt-1 text-text-subtle transition-colors group-hover:text-primary"
              />
            </div>
            <div className="mt-4 flex flex-1 items-end gap-2 pl-11">
              {article.minutes ? (
                <span className="text-xs text-text-subtle">{article.minutes} min read</span>
              ) : null}
              {article.status === "placeholder" ? (
                <Pill tone="caution">Coming soon</Pill>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
