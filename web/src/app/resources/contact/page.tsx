import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach the people behind Deal the Day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="For questions about the game, the site, or using it in a clinical setting."
      />

      <Card>
        {/* Placeholder details — replace with the real contact information. */}
        <dl className="space-y-4">
          <div>
            <dt className="text-sm text-text-muted">General enquiries</dt>
            <dd className="text-text">hello@example.com</dd>
          </div>
          <div>
            <dt className="text-sm text-text-muted">Clinicians and practices</dt>
            <dd className="text-text">clinical@example.com</dd>
          </div>
          <div>
            <dt className="text-sm text-text-muted">Press</dt>
            <dd className="text-text">press@example.com</dd>
          </div>
          <div>
            <dt className="text-sm text-text-muted">Post</dt>
            <dd className="text-text">Address to be added</dd>
          </div>
        </dl>
      </Card>

      <Callout tone="caution" title="Placeholder details" className="mt-5">
        These addresses are stand-ins. Replace them in{" "}
        <code className="rounded bg-surface-sunken px-1.5 py-0.5 text-sm">
          src/app/resources/contact/page.tsx
        </code>{" "}
        before this goes anywhere public.
      </Callout>

      <Callout tone="info" className="mt-4">
        This inbox is not monitored for urgent matters. If you need support now, the{" "}
        <a href="/resources/crisis" className="font-medium text-primary underline">
          crisis support page
        </a>{" "}
        lists services that are.
      </Callout>
    </>
  );
}
