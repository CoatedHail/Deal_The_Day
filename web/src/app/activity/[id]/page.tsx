import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Activity",
  description: "A single Deal the Day activity, before and after.",
};

export default function ActivityDetailPage() {
  return (
    <>
      <PageHeader
        title="Activity"
        description="What you expected, what happened, and what you took from it."
      />

      <PagePlaceholder
        summary="The activity detail view is not built yet."
        planned={[
          "The card, when it was drawn, and its status",
          "Prediction and feared outcome as recorded beforehand",
          "What actually happened, once reflected on",
          "Anxiety before and after, shown as a paired comparison",
          "Which anticipated compulsions were resisted",
          "The reflection journal entry",
          "A way to save a line from it as a kept insight",
        ]}
      />
    </>
  );
}
