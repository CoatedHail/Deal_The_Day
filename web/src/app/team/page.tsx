import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
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
  const snpReachMembers = TEAM.filter((member) => member.group === "snp-reach");
  const campLeaders = TEAM.filter((member) => member.group === "camp-leader");

  return (
    <>
      <PageHeader
        eyebrow="SNP-REACH"
        title="Meet the team"
        description="Meet the SNP Reach 2026 D2 team and the camp leaders supporting Deal the Day."
      />

      <TeamSection
        id="snp-reach-team"
        title="SNP Reach 2026 D2"
        members={snpReachMembers}
      />

      <TeamSection
        id="camp-leaders"
        title="Camp Leaders"
        members={campLeaders}
        leaders
        className="mt-10"
      />

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

function TeamSection({
  id,
  title,
  members,
  leaders = false,
  className,
}: {
  id: string;
  title: string;
  members: TeamMember[];
  leaders?: boolean;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="mb-4 flex items-center gap-3">
        <h2 id={id} className="text-xl font-semibold text-text">
          {title}
        </h2>
        {leaders ? <Pill tone="accent">Camp leadership</Pill> : null}
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} leader={leaders} />
        ))}
      </ul>
    </section>
  );
}

function MemberCard({
  member,
  leader,
}: {
  member: TeamMember;
  leader: boolean;
}) {
  return (
    // The id is the link target for article bylines. scroll-mt keeps the card
    // clear of the sticky top bar when someone arrives from one.
    <Card
      as="li"
      id={member.id}
      bare
      className={
        leader
          ? "scroll-mt-24 overflow-hidden border-2 border-accent-border bg-accent-soft"
          : "scroll-mt-24 overflow-hidden"
      }
    >
      <div className="relative aspect-square overflow-hidden bg-bg-subtle">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1280px) 270px, (min-width: 640px) 40vw, 90vw"
            priority={member.id === "merisa"}
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-primary-soft text-4xl font-semibold text-primary"
          >
            {initials(member.name)}
          </span>
        )}
        {leader ? (
          <Pill tone="accent" className="absolute right-3 top-3 bg-surface">
            Camp Leader
          </Pill>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-text">{member.name}</h3>
        {member.bio ? (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{member.bio}</p>
        ) : null}
      </div>
    </Card>
  );
}
