import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleIndex } from "@/components/content/ArticleIndex";
import { Callout } from "@/components/ui/Callout";
import { GUIDE_ARTICLES } from "@/content/guide";

export const metadata: Metadata = {
  title: "Parent guide",
  description:
    "Practical frameworks and example scripts for talking with your children about anxiety, uncertainty and brave behavior.",
};

export default function GuideIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="For parents"
        title="Parent guide"
        description="What to actually say. Each topic includes example scripts you can borrow word for word if that is easier."
      />

      <ArticleIndex articles={GUIDE_ARTICLES} basePath="/guide" />

      <Callout tone="erp" title="One thing worth knowing up front" className="mt-6">
        You do not have to have this sorted out before you talk to your children about
        it. Watching a parent work on something difficult, imperfectly and out loud, is
        the lesson.
      </Callout>
    </>
  );
}
