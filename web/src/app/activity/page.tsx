import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Activity",
  description:
    "Work through a Deal the Day card: what you expect beforehand, what actually happened afterwards.",
};

export default function ActivityIndexPage() {
  return (
    <>
      <PageHeader
        title="Activities"
        description="Every card you have drawn, with what you predicted and what actually happened."
        action={<ButtonLink href="/activity/new">Start a card</ButtonLink>}
      />

      <PagePlaceholder
        summary="The activity history list is not wired up yet. The route, the data model and the storage layer are in place — this page just needs building."
        planned={[
          "A list of every card drawn, newest first",
          "Status at a glance: in progress, completed, or opted out",
          "Prediction against actual outcome, side by side",
          "Filters by category and by whether the feared outcome occurred",
          "A link into the reflection for anything still unfinished",
        ]}
      />
    </>
  );
}
