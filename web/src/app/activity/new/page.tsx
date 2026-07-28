import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Start a card",
  description: "Record what you expect before you begin today's Deal the Day activity.",
};

export default function NewActivityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Before you go"
        title="Start a card"
        description="A few questions before you set off. The point is to get your prediction on record while you still believe it."
      />

      <PagePlaceholder
        summary="The pre-activity flow is not built yet. Its questions are already defined in the data model."
        planned={[
          "The number printed on the card, and its category",
          "Anxiety right now, 0 to 10",
          "Confidence you can handle it, 0 to 10",
          "What you predict will happen",
          "The specific thing you are most worried about",
          "Which compulsions you expect to be pulled toward",
          "An ERP reminder before you set off",
        ]}
      />
    </>
  );
}
