import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";
import { CONTACT, CONTACT_EMAIL_HREF } from "@/content/contact";

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
        <dl className="space-y-5">
          <div>
            <dt className="text-sm text-text-muted">Email</dt>
            <dd className="text-lg">
              <a
                href={CONTACT_EMAIL_HREF}
                className="font-medium text-primary underline"
              >
                {CONTACT.email}
              </a>
            </dd>
            <dd className="mt-1 text-sm text-text-subtle">
              One inbox for everything — questions from families, from clinicians, and
              from anyone wanting to use the deck with a group.
            </dd>
          </div>

          <div>
            <dt className="text-sm text-text-muted">Instagram</dt>
            <dd className="text-lg">
              <a
                href={CONTACT.instagramUrl}
                rel="noreferrer"
                className="font-medium text-primary underline"
              >
                @{CONTACT.instagramHandle}
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-sm text-text-muted">Phone</dt>
            {/* Said plainly rather than left out, so nobody goes hunting for a
                number that does not exist. */}
            <dd className="text-text">
              There is no phone line. Email is the way to reach us.
            </dd>
          </div>
        </dl>
      </Card>

      <Callout tone="caution" title="Not monitored for urgent matters" className="mt-5">
        This inbox is read when someone has time, not around the clock. If you need
        support now, the{" "}
        <Link href="/resources/crisis" className="font-medium text-primary underline">
          crisis support page
        </Link>{" "}
        lists services that answer straight away.
      </Callout>

      <Callout tone="info" className="mt-4">
        Feedback about a particular card is more useful on the{" "}
        <Link href="/feedback" className="font-medium text-primary underline">
          review a card
        </Link>{" "}
        page — it reaches the people making the deck in a form they can act on. You can
        also{" "}
        <Link href="/team" className="font-medium text-primary underline">
          meet the team
        </Link>
        .
      </Callout>
    </>
  );
}
