import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { db } from "@/db";
import { feedback } from "@/db/schema";
import { isReviewer } from "@/lib/reviewers";
import { ReviewsBrowser, type ReviewRow } from "./ReviewsBrowser";

export const metadata: Metadata = {
  title: "Card reviews",
  robots: { index: false, follow: false },
};

/**
 * Reviews of the deck, for the project team.
 *
 * Read fresh on every request. Reviews arrive rarely and are read while
 * deliberately looking at them, so a cached page would only ever be a way to
 * show someone stale feedback.
 */
export const dynamic = "force-dynamic";

/**
 * Everyone who is not on the reviewer list gets a 404, including signed-in
 * families. A 403 would confirm the page exists and invite guessing at who can
 * see it; there is no reason to advertise an internal screen to the public.
 *
 * The gate is here, on the server, before any query runs — not in the layout and
 * not in middleware, so it cannot be bypassed by reaching the route another way.
 */
export default async function ReviewsPage() {
  const session = await auth();
  if (!isReviewer(session?.user?.email)) notFound();

  const rows = await db
    .select()
    .from(feedback)
    .orderBy(desc(feedback.submittedAt));

  const reviews: ReviewRow[] = rows.map((row) => ({
    id: row.id,
    submittedAt: row.submittedAt.toISOString(),
    cardNumber: row.cardNumber,
    rating: row.rating,
    difficulty: row.difficulty,
    whatWorked: row.whatWorked,
    whatDidNot: row.whatDidNot,
    suggestion: row.suggestion,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Project team"
        title="Card reviews"
        description="Everything families have sent about the deck. Use it to work out which cards are pitched wrongly and which ones are landing."
      />

      <Callout tone="info" className="mb-6">
        These reviews carry nothing that identifies who sent them — no name, no
        email, no account link. Please keep it that way: do not try to match a
        review to a family, and do not paste review text anywhere it could be read
        alongside other information about them.
      </Callout>

      <ReviewsBrowser reviews={reviews} />
    </>
  );
}
