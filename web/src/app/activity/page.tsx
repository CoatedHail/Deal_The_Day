import type { Metadata } from "next";
import { Private } from "@/components/a11y/Private";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { ActivityTimeline } from "./ActivityTimeline";

export const metadata: Metadata = {
  title: "Activity",
  description:
    "Work through a Deal the Day card, and read back everything your family has recorded.",
};

/**
 * Cards and the record of them, on one page.
 *
 * This used to be two: a list of cards here, and a journal that merged cards
 * with check-ins. They were the same thing seen twice, and keeping both meant
 * choosing which one to open before you could look anything up. The journal's
 * filters absorbed the card statuses, so nothing was lost; /journal now
 * redirects here.
 */
export default function ActivityIndexPage() {
  return (
    <>
      <PageHeader
        title="Activity"
        description="Draw a card and work through it, then read back what your family recorded."
        action={<ButtonLink href="/activity/new">Start a card</ButtonLink>}
      />

      <Callout tone="erp" title="What to look for" className="mb-6">
        Read what you expected, then what happened. The gap between those two is the
        evidence. It tends to be more convincing weeks later than on the day.
      </Callout>

      <Private>
        <ActivityTimeline />
      </Private>
    </>
  );
}
