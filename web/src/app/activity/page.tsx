import type { Metadata } from "next";
import { Private } from "@/components/a11y/Private";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ActivityList } from "./ActivityList";

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
      <Private>
        <ActivityList />
      </Private>
    </>
  );
}
