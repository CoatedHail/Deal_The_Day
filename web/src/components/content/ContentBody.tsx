import { Callout } from "@/components/ui/Callout";
import { ContentTabs } from "@/components/content/ContentTabs";
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

    case "table":
      return (
        // Scrolls inside its own box rather than pushing the page sideways.
        // Three columns of prose do not fit a phone, and a horizontally
        // scrolling article is worse than a horizontally scrolling table.
        <div className="overflow-x-auto rounded-card border border-border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            {block.caption ? (
              <caption className="px-4 pt-3 text-sm text-text-muted">
                {block.caption}
              </caption>
            ) : null}
            <thead>
              <tr className="border-b border-border bg-surface-sunken">
                {block.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-2.5 font-semibold text-text">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr
                  key={row[0]}
                  // Read aloud as one sentence per row, pairing each cell with
                  // its column. Cell by cell it is unintelligible — a phrase,
                  // then a reason, then a replacement, with nothing saying
                  // which is which. An empty column heading is left out.
                  data-speech={row
                    .map((cell, index) =>
                      block.columns[index] ? `${block.columns[index]}: ${cell}` : cell,
                    )
                    .join(". ")}
                  className="border-b border-border last:border-0"
                >
                  {row.map((cell, index) =>
                    // The first cell is the row's subject, so it is a header
                    // for that row — which is what lets a screen reader say
                    // which phrase a suggestion belongs to.
                    index === 0 ? (
                      <th
                        key={index}
                        scope="row"
                        className="px-4 py-3 align-top font-medium text-text"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={index} className="px-4 py-3 align-top text-text-muted">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "tabs":
      return (
        <ContentTabs
          labels={block.tabs.map((tab) => tab.label)}
          panels={block.tabs.map((tab) => (
            <div key={tab.label} className="space-y-5">
              {tab.blocks.map((inner, index) => (
                <Block key={index} block={inner} />
              ))}
            </div>
          ))}
        />
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
