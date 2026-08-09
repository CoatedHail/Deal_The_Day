import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PRE_ACTIVITY_COPY } from "@/content/activity-flow";
import { findDeckCard } from "@/content/cards";
import { isCardLength } from "@/lib/card-lengths";
import { parseCardNumber } from "@/lib/cards";
import { NewActivityForm } from "./NewActivityForm";

export const metadata: Metadata = {
  title: "Start a card",
  description: "Record what you expect before you begin today's Deal the Day activity.",
};

export default async function NewActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ length?: string | string[]; card?: string | string[] }>;
}) {
  const { length, card } = await searchParams;

  const requestedLength = Array.isArray(length) ? length[0] : length;
  const requestedCard = Array.isArray(card) ? card[0] : card;

  // A card drawn on /deck arrives as its number and fills in everything printed
  // on it. `length` on its own is the older route in, from picking a length
  // card without drawing, and stays supported.
  const drawnNumber = requestedCard ? parseCardNumber(requestedCard) : null;
  const drawnCard = drawnNumber !== null ? findDeckCard(drawnNumber) : undefined;

  const initialCardLength =
    drawnCard?.length ?? (isCardLength(requestedLength) ? requestedLength : undefined);

  return (
    <>
      <PageHeader
        eyebrow="Before you go"
        title="Start a card"
        description={PRE_ACTIVITY_COPY.intro}
      />
      <NewActivityForm initialCardLength={initialCardLength} initialCard={drawnCard} />
    </>
  );
}
