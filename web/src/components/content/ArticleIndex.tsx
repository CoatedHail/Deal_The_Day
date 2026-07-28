import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";
import type { Article } from "@/content/types";

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
            <div className="mb-2 flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-semibold leading-snug text-text">
                {article.title}
              </h2>
              <Icon
                name="arrow-right"
                size={18}
                className="mt-1 text-text-subtle transition-colors group-hover:text-primary"
              />
            </div>
            <p className="flex-1 text-sm text-text-muted">{article.summary}</p>
            <div className="mt-4 flex items-center gap-2">
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
