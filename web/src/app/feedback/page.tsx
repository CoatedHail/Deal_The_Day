import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { FeedbackForm } from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Review a card",
  description:
    "Tell the people making Deal the Day how a card landed for your family.",
};

export default function FeedbackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help us improve the deck"
        title="Review a card"
        description="This is about the game, not about how your family did. Honest reviews — including the ones that say a card missed — are what make the next deck better."
      />

      <Callout tone="info" className="mb-6">
        Reviews are kept separate from your progress record on purpose. Nothing you
        write here affects your history, your trends, or anything you might share with
        a clinician.
      </Callout>

      <FeedbackForm />
    </>
  );
}
