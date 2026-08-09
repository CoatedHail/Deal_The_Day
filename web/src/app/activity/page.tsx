import type { Metadata } from "next";
import Image from "next/image";
import { Private } from "@/components/a11y/Private";
import { PageHeader } from "@/components/layout/PageHeader";
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
        description="Everything your family has recorded, newest first."
      />

      <figure className="mb-6 overflow-hidden rounded-card border border-border bg-surface shadow-sm">
        <div className="relative aspect-[16/9] bg-surface-sunken sm:aspect-[2/1]">
          <Image
            src="/activity-ideas/activities-hero.jpg"
            alt="Parents playing outside with their young child in a grassy park"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-[center_58%]"
          />
        </div>
        <figcaption className="px-4 py-2 text-xs text-text-subtle">
          Photo by{" "}
          <a
            href="https://www.pexels.com/photo/parents-playing-with-their-child-in-a-park-20811236/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-text"
          >
            Alexander Mass on Pexels
          </a>
          .
        </figcaption>
      </figure>

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
