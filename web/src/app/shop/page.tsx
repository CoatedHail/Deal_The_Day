import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { Pill } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Shop cards — coming soon",
  description: "The Deal the Day card shop is coming soon. Purchasing is not available yet.",
};

const CARDS = [
  { src: "/cards/short-length-card.webp", alt: "Short Length Activity card" },
  { src: "/cards/medium-length-card.webp", alt: "Medium Length Activity card" },
  { src: "/cards/long-length-card.webp", alt: "Long Activity card" },
] as const;

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Coming soon"
        title="Get the Deal the Day cards"
        description="We’re getting the card shop ready. You can look around the rest of the site, but cards cannot be purchased here yet."
        action={<Pill tone="caution">Not available yet</Pill>}
      />

      <section
        aria-label="Deal the Day card preview"
        className="mb-6 overflow-hidden rounded-card border border-border bg-surface p-5 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-3 items-center gap-2 sm:gap-5">
          {CARDS.map((card, index) => (
            <div
              key={card.src}
              className={`relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-surface-sunken shadow-md ${
                index === 0 ? "-rotate-3" : index === 2 ? "rotate-3" : "z-10"
              }`}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 30vw, 240px"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </section>

      <Callout tone="caution" title="Purchasing is not available yet">
        This page is a preview only. There is no checkout and no orders can be placed.
        We’ll make it clear here when the cards are ready to buy.
      </Callout>
    </>
  );
}
