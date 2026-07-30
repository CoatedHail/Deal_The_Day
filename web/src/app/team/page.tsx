import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { CONTACT, CONTACT_EMAIL_HREF } from "@/content/contact";
import { TEAM, initials, type TeamMember } from "@/content/team";

export const metadata: Metadata = {
  title: "Meet the team",
  description: "The people who write and build Deal the Day.",
};

/**
 * Who made this.
 *
 * Worth a page of its own rather than a line in the footer: families are being
 * asked to write down private things about their children, and knowing there
 * are named people behind it is part of what makes that reasonable.
 *
 * Article bylines link here by anchor, so every member's card carries an id.
 */
export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="SNP-REACH"
        title="Meet the team"
        description="Deal the Day is made by a small team. The explainers and the parent guide are written by the people listed here."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {TEAM.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </ul>

      <Callout tone="info" className="mt-6">
        Want to reach us? Email{" "}
        <a href={CONTACT_EMAIL_HREF} className="font-medium text-primary underline">
          {CONTACT.email}
        </a>{" "}
        or find us on Instagram at{" "}
        <a
          href={CONTACT.instagramUrl}
          className="font-medium text-primary underline"
          rel="noreferrer"
        >
          @{CONTACT.instagramHandle}
        </a>
        . There is more on the{" "}
        <Link href="/resources/contact" className="font-medium text-primary underline">
          contact page
        </Link>
        .
      </Callout>
    </>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    // The id is the link target for article bylines. scroll-mt keeps the card
    // clear of the sticky top bar when someone arrives from one.
    <Card as="li" id={member.id} className="scroll-mt-24">
      <div className="flex items-start gap-4">
        {member.photo ? (
          <Image
            src={member.photo}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-semibold text-primary"
          >
            {initials(member.name)}
          </span>
        )}

        <div className="min-w-0">
          <h2 className="font-semibold text-text">{member.name}</h2>
          {member.role ? (
            <p className="mt-0.5 text-sm text-primary">{member.role}</p>
          ) : null}
          {member.bio ? (
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{member.bio}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
