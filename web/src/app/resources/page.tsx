import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { RESOURCE_PAGES } from "@/content/resources";

const RESOURCE_ICONS: Record<string, IconName> = {
  "/resources/crisis": "lifebuoy",
  "/resources/faq": "question",
  "/resources/books": "book",
  "/resources/podcasts": "headphones",
  "/resources/worksheets": "clipboard",
  "/resources/discussion-guides": "message",
  "/resources/contact": "mail",
};

export const metadata: Metadata = {
  title: "Resources",
  description:
    "FAQ, crisis support, recommended reading, podcasts, worksheets and printable family discussion guides.",
};

export default function ResourcesIndexPage() {
  return (
    <>
      <PageHeader
        title="Resources"
        description="Everything that did not fit anywhere else — including where to go when this app is not the right tool."
      />

      <ul className="grid gap-3 sm:grid-cols-2">
        {RESOURCE_PAGES.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              className="group flex h-full flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary-border hover:bg-primary-soft"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-primary-soft p-2 text-primary" aria-hidden="true">
                  <Icon name={RESOURCE_ICONS[page.href] ?? "lifebuoy"} size={20} />
                </span>
                <h2 className="min-w-0 flex-1 font-display text-lg font-semibold leading-snug text-text">
                  {page.title}
                </h2>
                <Icon
                  name="arrow-right"
                  size={18}
                  className="mt-1 text-text-subtle transition-colors group-hover:text-primary"
                />
              </div>
              {page.status === "placeholder" ? (
                <div className="mt-4 pl-11">
                  <Pill tone="caution">Coming soon</Pill>
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
