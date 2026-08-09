import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { CONTACT } from "@/content/contact";
import { DECK_CARDS } from "@/content/cards";

export const metadata: Metadata = {
  title: "Get the deck",
  description:
    "The printed Deal the Day deck is on its way. Until then, the whole deck is here on the site.",
};

/**
 * Where the printed deck will be sold.
 *
 * Titled "Get the deck" rather than "Buy" while there is nothing to buy — a Buy
 * page that cannot take money reads as broken rather than forthcoming. Rename
 * it the day it goes on sale.
 */
export default function GetTheDeckPage() {
  return (
    <>
      <PageHeader
        title="Get the deck"
        description="Deal the Day is a physical card game. The printed deck is being made."
      />

      <Callout tone="info" title="Coming soon">
        We are having the deck printed. When you can order it, it will be here.
      </Callout>

      <Card className="mt-5">
        <CardHeader
          title="You do not have to wait to play"
          description="All twenty cards are already here."
          icon="cards"
        />
        <p className="mb-4 max-w-[var(--reading-measure)] leading-relaxed text-text-muted">
          The digital deck deals you a card from the short, medium or long pile, exactly
          as the printed one does. Everything else on the site works the same whether
          the cards came out of a box or off a screen.
        </p>
        <ButtonLink href="/deck">
          Open the deck
          <Icon name="arrow-right" size={18} />
        </ButtonLink>
      </Card>

      <Card className="mt-5">
        <CardHeader
          title="Tell us you want one"
          description="It helps us know how many to print."
          icon="mail"
          level={2}
        />
        <p className="max-w-[var(--reading-measure)] leading-relaxed text-text-muted">
          Email us and we will let you know when the deck is available. Nothing else
          happens with your address.{" "}
          <Link
            href={`mailto:${CONTACT.email}?subject=Deal%20the%20Day%20deck`}
            className="font-medium text-primary underline"
          >
            {CONTACT.email}
          </Link>
        </p>
      </Card>

      <p className="mt-5 text-sm text-text-subtle">
        {DECK_CARDS.length} activity cards, plus the three length cards that set how big
        the activity should be.
      </p>
    </>
  );
}
