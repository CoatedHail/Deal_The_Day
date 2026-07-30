import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentBody } from "@/components/content/ContentBody";
import { ArticleByline } from "@/components/content/ArticleByline";
import { Icon } from "@/components/ui/Icon";
import { LEARN_ARTICLES } from "@/content/learn";
import { findArticle } from "@/content/types";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LEARN_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(LEARN_ARTICLES, slug);
  if (!article) return { title: "Not found" };
  return { title: article.title, description: article.summary };
}

export default async function LearnArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = findArticle(LEARN_ARTICLES, slug);
  if (!article) notFound();

  const index = LEARN_ARTICLES.findIndex((entry) => entry.slug === slug);
  const previous = LEARN_ARTICLES[index - 1];
  const next = LEARN_ARTICLES[index + 1];

  return (
    <article>
      <Link
        href="/learn"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text"
      >
        <Icon name="arrow-left" size={16} />
        All explainers
      </Link>

      <PageHeader title={article.title} description={article.summary} />

      <div className="max-w-[var(--reading-measure)]">
        <ContentBody article={article} />
        <ArticleByline article={article} />
      </div>

      <nav
        aria-label="More explainers"
        className="mt-10 flex flex-wrap justify-between gap-4 border-t border-border pt-6"
      >
        {previous ? (
          <Link href={`/learn/${previous.slug}`} className="group max-w-[45%]">
            <span className="block text-xs text-text-subtle">Previous</span>
            <span className="text-sm text-text group-hover:underline">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.slug}`} className="group max-w-[45%] text-right">
            <span className="block text-xs text-text-subtle">Next</span>
            <span className="text-sm text-text group-hover:underline">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
