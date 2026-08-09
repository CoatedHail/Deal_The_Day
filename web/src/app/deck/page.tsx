import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DeckTable } from "./DeckTable";

export const metadata: Metadata = {
  title: "The deck",
  description:
    "Draw a card from the short, medium or long deck, and carry it straight into an activity.",
};

export default function DeckPage() {
  return (
    <>
      <PageHeader
        title="The deck"
        description="All twenty cards from the deck. Pick a pile and draw one."
      />

      <DeckTable />
    </>
  );
}
