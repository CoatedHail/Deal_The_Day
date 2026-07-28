import { ContentBody } from "@/components/content/ContentBody";
import type { LegalDocument } from "@/content/legal";

/**
 * Renders a legal document.
 *
 * Reuses the article renderer for the body, and adds the "last updated" line —
 * which matters more here than on other pages, because a policy without a date
 * gives the reader no way to tell whether it still describes the software.
 */
export function LegalBody({ document }: { document: LegalDocument }) {
  return (
    <div className="max-w-[var(--reading-measure)]">
      <p className="mb-6 text-sm text-text-subtle">
        Last updated {document.lastUpdated}
      </p>
      <ContentBody article={document} />
    </div>
  );
}
