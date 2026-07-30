import type { Metadata } from "next";
import { Private } from "@/components/a11y/Private";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { JournalTimeline } from "./JournalTimeline";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Everything your family has recorded — cards, reflections and check-ins — in the order it happened.",
};

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your record"
        title="Journal"
        description="Everything you have written down, in order. Nothing new to fill in here — this is the collected version of what the forms already asked."
      />

      <Callout tone="erp" title="What to look for" className="mb-6">
        Read down the left of an entry, then the right: what you expected, then what
        happened. The gap between those two columns is the evidence. It tends to be
        more convincing read weeks later than on the day.
      </Callout>

      <Private>
        <JournalTimeline />
      </Private>
    </>
  );
}
