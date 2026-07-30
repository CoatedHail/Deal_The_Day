import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { ACTIVITY_IDEA_CATEGORIES } from "@/content/activity-ideas";

export const metadata: Metadata = {
  title: "Activity Ideas",
  description:
    "Browse family activity ideas by category, from everyday errands to short trips.",
};

export default function ActivityIdeasPage() {
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

      <div className="space-y-4">
        {ACTIVITY_IDEA_CATEGORIES.map((category) => (
          <details
            key={category.slug}
            className="group overflow-hidden rounded-card border border-border bg-surface shadow-sm"
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
        ))}
      </div>
    </>
  );
}
