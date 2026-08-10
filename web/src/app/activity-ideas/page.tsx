import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import {
  IDEA_CONSTRAINTS,
  IDEA_KINDS,
  type ActivityIdeaCategory,
} from "@/content/activity-ideas";

export const metadata: Metadata = {
  title: "Activity Ideas",
  description:
    "Browse family activity ideas by category, from everyday errands to short trips.",
};

/**
 * Split into kinds of activity and constraints on one.
 *
 * They were one list of ten, which read as ten peers and was why nothing here
 * ever lined up with the categories the app actually stores. "Seasonal" and
 * "Low-cost or free" are not things you do, they are conditions on whatever you
 * do — they cut across food, outdoors and at-home alike.
 */
export default async function ActivityIdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ open?: string | string[] }>;
}) {
  const { open } = await searchParams;
  // A card drawn on /deck links straight to its section. Resolved on the server
  // so the deep link works with JavaScript off, which this site cares about.
  const openSlug = Array.isArray(open) ? open[0] : open;

  return (
    <>
      <PageHeader
        title="Activity Ideas"
        description="Browse by category, open only what sounds useful, and choose something workable rather than perfect."
      />

      <p className="mb-6 max-w-[var(--reading-measure)] text-text-muted">
        These are starting points for Deal the Day cards. A person without
        OCD/OCPD-like symptoms can choose the details so the parent can practice
        making room for uncertainty.
      </p>

      <section aria-labelledby="kinds">
        <h2 id="kinds" className="mb-3 text-lg font-semibold text-text">
          Kinds of activity
        </h2>
        <div className="space-y-4">
          {IDEA_KINDS.map((category) => (
            <IdeaSection
              key={category.slug}
              category={category}
              open={category.slug === openSlug}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="constraints" className="mt-8">
        <h2 id="constraints" className="text-lg font-semibold text-text">
          However you are doing it
        </h2>
        <p className="mb-3 mt-1 max-w-[var(--reading-measure)] text-sm text-text-muted">
          These cut across everything above rather than sitting alongside it.
        </p>
        <div className="space-y-4">
          {IDEA_CONSTRAINTS.map((category) => (
            <IdeaSection
              key={category.slug}
              category={category}
              open={category.slug === openSlug}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function IdeaSection({
  category,
  open,
}: {
  category: ActivityIdeaCategory;
  open: boolean;
}) {
  return (
    <details
      id={category.slug}
      open={open || undefined}
      className="group overflow-hidden rounded-card border border-border bg-surface shadow-sm scroll-mt-6"
    >
      <summary className="grid cursor-pointer list-none gap-0 rounded-card transition-colors hover:bg-bg-subtle sm:grid-cols-[13rem_1fr] [&::-webkit-details-marker]:hidden">
        <span className="relative block aspect-[16/9] overflow-hidden bg-surface-sunken sm:aspect-auto sm:min-h-40">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 208px"
            className="object-cover"
          />
        </span>
        <span className="flex items-center gap-4 p-5 sm:p-6">
          <span className="rounded-xl bg-primary-soft p-2.5 text-primary">
            <Icon name={category.icon} size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-semibold text-text">
              {category.title}
            </span>
            <span className="mt-1 block text-sm text-text-muted">
              {category.description}
            </span>
            <span className="mt-2 block text-sm font-medium text-primary">
              View {category.ideas.length} ideas
            </span>
          </span>
          <Icon
            name="plus"
            className="text-text-muted transition-transform group-open:rotate-45"
          />
        </span>
      </summary>
      <div className="border-t border-border p-5 sm:p-6">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {category.ideas.map((idea) => (
            <li key={idea} className="flex gap-2.5 text-text">
              <Icon name="check" size={18} className="mt-1 text-primary" />
              <span>{idea}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-border pt-3 text-xs text-text-subtle">
          Photo by{" "}
          <a
            href={category.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-text"
          >
            {category.photographer} on Pexels
          </a>
          .
        </p>
      </div>
    </details>
  );
}
