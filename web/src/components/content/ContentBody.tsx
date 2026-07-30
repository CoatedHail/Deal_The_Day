import { Callout } from "@/components/ui/Callout";
import type { Article, ContentBlock } from "@/content/types";

/**
 * Renders an article's blocks, or an honest placeholder when the prose has not
 * been written yet.
 *
 * Showing the planned outline rather than lorem ipsum keeps the structure
 * reviewable while making it unmistakable that this is not finished content —
 * which matters more than usual here, since a half-written explanation of a
 * mental health concept is worse than none.
 */
export function ContentBody({ article }: { article: Article }) {
  if (article.status === "placeholder" || !article.blocks?.length) {
    return (
      <div className="space-y-6">
        <Callout tone="caution" title="Still being written">
          This explainer is outlined but not yet written. The section headings below
          show what it will cover. Please do not treat this page as guidance yet.
        </Callout>

        {article.outline?.length ? (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-text">Planned sections</h2>
            <ol className="space-y-2">
              {article.outline.map((heading, index) => (
                <li key={heading} className="flex gap-3">
                  <span className="tabular-nums text-text-subtle">{index + 1}.</span>
                  <span className="text-text-muted">{heading}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {article.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="pt-3 font-display text-xl font-semibold text-text">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="pt-1 font-display text-lg font-semibold text-text">
          {block.text}
        </h3>
      );

    case "paragraph":
      return <p className="text-text">{block.text}</p>;

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={
            block.ordered
              ? "list-decimal space-y-2 pl-5 text-text"
              : "list-disc space-y-2 pl-5 text-text"
          }
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Tag>
      );
    }

    case "callout":
      return (
        <Callout tone={block.tone} title={block.title}>
          {block.text}
        </Callout>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary-border pl-4 italic text-text-muted">
          {block.text}
          {block.attribution ? (
            <footer className="mt-1 text-sm not-italic text-text-subtle">
              — {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );

    /* A side-by-side "instead of / try" pair, the core teaching device of the
       parent guide. */
    case "script":
      return (
        <div className="rounded-card border border-border bg-surface-sunken p-4 sm:p-5">
          <p className="mb-3 text-sm font-medium text-text">{block.situation}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-subtle">
                Instead of
              </p>
              <p className="text-sm text-text-muted">&ldquo;{block.instead}&rdquo;</p>
            </div>
            <div className="rounded-xl border border-primary-border bg-primary-soft p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Try
              </p>
              <p className="text-sm text-text">&ldquo;{block.tryThis}&rdquo;</p>
            </div>
          </div>
        </div>
      );
  }
}
