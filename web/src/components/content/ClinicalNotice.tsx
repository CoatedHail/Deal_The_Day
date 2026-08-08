import { Callout } from "@/components/ui/Callout";

/**
 * The standing disclaimer on any single article.
 *
 * Lives in the template rather than in each article's blocks. The authors write
 * it at the foot of every draft, and it belongs on every article page — but
 * repeated once per entry it would be six copies of the same sentence in the
 * content data, and the one that got missed would be the one that mattered.
 *
 * The index pages carry their own plural wording. This is the per-article one,
 * for a reader who arrived at a URL directly and never saw the index.
 */
export function ClinicalNotice() {
  return (
    <Callout tone="info" className="mt-8">
      This page explains a concept. It is not a diagnosis and not a treatment plan. If
      something here sounds like you, that is worth raising with a clinician rather than
      settling on your own.
    </Callout>
  );
}
