import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleIndex } from "@/components/content/ArticleIndex";
import { Callout } from "@/components/ui/Callout";
import { LEARN_ARTICLES } from "@/content/learn";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Short, plain-language explainers on OCD, OCPD, uncertainty, compulsions and how ERP works.",
};

export default function LearnIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Psychoeducation"
        title="Learn"
        description="Short explainers on the ideas the game is built from. Read them in any order, or not at all — the game works either way."
      />

      <ArticleIndex articles={LEARN_ARTICLES} basePath="/learn" />

      <Callout tone="info" className="mt-6">
        These pages explain concepts. They are not a diagnosis and they are not a
        treatment plan. If something here sounds like you, that is worth raising with a
        clinician rather than settling on your own.
      </Callout>
    </>
  );
}
