import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Family discussion guides",
  description:
    "Printable conversation starters for sitting down together after a Deal the Day card.",
};

export default function DiscussionGuidesPage() {
  return (
    <>
      <PageHeader
        title="Family discussion guides"
        description="Questions to ask each other afterwards, pitched so that everyone gets a turn — not just the parent doing the exposure."
      />

      <PagePlaceholder
        summary="The discussion guides are not written yet."
        planned={[
          "A short guide for right after an activity",
          "Age-banded question sets: younger children, older children, teenagers",
          "Questions for the parent to answer out loud, so the modelling goes both ways",
          "A guide for when the activity did not go well",
          "A monthly 'how is this going for everyone' conversation",
          "Printable one-page versions",
        ]}
      />
    </>
  );
}
