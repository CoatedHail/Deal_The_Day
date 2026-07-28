/**
 * Content model for the written material (psychoeducation, parent guide,
 * resources).
 *
 * Articles are structured data rather than MDX so that the same blocks can be
 * rendered on the web, folded into a printable worksheet, or served from an API
 * later without re-authoring anything.
 *
 * `status` drives what the reader sees: "placeholder" articles render their
 * outline plus an honest notice that the full text is still being written,
 * rather than pretending to be finished.
 */

export type ContentStatus = "placeholder" | "draft" | "ready";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; tone: "info" | "erp" | "caution" | "success"; title?: string; text: string }
  /** A worked example of something to say out loud. */
  | { type: "script"; situation: string; instead: string; tryThis: string }
  | { type: "quote"; text: string; attribution?: string };

export interface Article {
  slug: string;
  title: string;
  /** One-line description used on index pages and as the meta description. */
  summary: string;
  status: ContentStatus;
  /** Rough reading time in minutes, shown on index cards. */
  minutes?: number;
  /** The planned section headings. Shown for placeholders so the shape is clear. */
  outline?: string[];
  blocks?: ContentBlock[];
}

export function findArticle(articles: Article[], slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
