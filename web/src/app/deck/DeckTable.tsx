"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DeckCardFace } from "@/components/deck/DeckCardFace";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Disclosure } from "@/components/ui/Disclosure";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { DECK_CARDS, deckFor, drawFrom, type DeckCard } from "@/content/cards";
import { CARD_LENGTHS, CARD_LENGTH_BY_ID } from "@/lib/card-lengths";
import { cn } from "@/lib/cn";
import { ACTIVITY_CATEGORY_LABELS, type CardLength } from "@/lib/types";

/**
 * The digital deck.
 *
 * Drawing, not browsing, is the primary mechanic, and that is the whole point
 * rather than a styling preference. A card game works because it takes the
 * choice away: a parent who can read all twenty cards and pick one has been
 * handed three new compulsions — reading them all, choosing the least
 * frightening, and agonising over which. The full list is still here, one
 * deliberate click away, because families deciding whether the game is for them
 * need to see it. It just is not the thing the page opens with.
 *
 * Redrawing is allowed. It is named rather than blocked: the note under a drawn
 * card invites someone to notice what they are doing, in the same spirit as the
 * safety valve, which "never overrides their choice; it only invites the
 * distinction". A hard limit here would be the app deciding it knows better,
 * and would send someone to a paper deck to get around it.
 */
export function DeckTable() {
  const [deck, setDeck] = useState<CardLength | null>(null);
  const [drawn, setDrawn] = useState<DeckCard | null>(null);
  const [redraws, setRedraws] = useState(0);

  function pick(length: CardLength) {
    setDeck(length);
    setDrawn(drawFrom(length) ?? null);
    setRedraws(0);
  }

  function again() {
    if (!deck) return;
    setDrawn(drawFrom(deck, drawn?.number) ?? null);
    setRedraws((count) => count + 1);
  }

  const definition = deck ? CARD_LENGTH_BY_ID[deck] : null;
  const cards = deck ? deckFor(deck) : [];

  return (
    <div className="space-y-6">
      <section aria-labelledby="pick-a-deck">
        <h2 id="pick-a-deck" className="text-lg font-semibold text-text">
          {deck ? "Pick a different deck" : "Pick a deck"}
        </h2>
        <p className="mt-1 max-w-[var(--reading-measure)] text-sm leading-relaxed text-text-muted">
          The deck sets how big the activity should be. You decide what it actually
          is.
        </p>

        <div
          role="group"
          aria-label="Deck length"
          className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4"
        >
          {CARD_LENGTHS.map((option) => {
            const active = option.id === deck;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => pick(option.id)}
                className={cn(
                  "group min-w-0 rounded-card border bg-surface p-1.5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 sm:p-2.5",
                  active
                    ? "border-primary bg-primary-soft"
                    : "border-border hover:border-border-strong hover:bg-bg-subtle",
                )}
              >
                <span className="relative block aspect-square overflow-hidden rounded-xl bg-white">
                  <Image
                    src={option.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 30vw, 260px"
                    className="object-contain"
                  />
                </span>
                <span className="mt-2 block truncate text-sm font-semibold text-text sm:text-base">
                  {option.label}
                </span>
                <span className="block text-xs text-text-subtle">
                  {deckFor(option.id).length} cards
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {deck && definition ? (
        <section aria-labelledby="your-card" className="space-y-5">
          <h2 id="your-card" className="sr-only">
            Your card
          </h2>

          {drawn ? (
            <div className="grid gap-6 sm:grid-cols-[minmax(0,22rem)_1fr] sm:items-start">
              {/* Keyed so the card remounts on each draw — without it React
                  reuses the node and the new card simply appears, which reads
                  as nothing having happened. */}
              <DeckCardFace key={drawn.number} card={drawn} className="animate-deal" />

              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="primary">{definition.label}</Pill>
                    <Pill>{ACTIVITY_CATEGORY_LABELS[drawn.category]}</Pill>
                  </div>
                  <p className="mt-3 leading-relaxed text-text-muted">
                    {definition.summary}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-subtle">
                    {definition.planningNote}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={`/activity/new?card=${drawn.number}`}>
                    Start this card
                    <Icon name="arrow-right" size={18} />
                  </ButtonLink>
                  <Button variant="secondary" onClick={again}>
                    Put it back and draw again
                  </Button>
                </div>

                {redraws >= 2 ? (
                  <Callout tone="erp" title="Worth noticing">
                    That is {redraws} redraws. Sometimes a card really does not fit the
                    day. Sometimes it is the anxiety looking for an easier one. Worth a
                    quick think about which this is.
                  </Callout>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">This deck has no cards yet.</p>
          )}

          <Disclosure
            icon="cards"
            summary={`See all ${cards.length} cards in the ${definition.label.toLowerCase()} deck`}
          >
            <p className="mb-3 text-sm">
              Here so you can see what is in the deck. Drawing is still the main way
              in.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {cards.map((card) => (
                <li
                  key={card.number}
                  className="flex items-baseline gap-2.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm"
                >
                  <span className="w-5 shrink-0 tabular-nums text-text-subtle">
                    {card.number}
                  </span>
                  <span className="min-w-0 text-text">{card.title}</span>
                </li>
              ))}
            </ul>
          </Disclosure>
        </section>
      ) : (
        <Callout tone="info">
          Twenty cards across three decks. Pick a deck and one card comes off the top.
          You do not choose which one.
        </Callout>
      )}

      <p className="text-sm text-text-subtle">
        {DECK_CARDS.length} cards in the deck. Got the printed cards? You can also{" "}
        <Link href="/activity/new" className="underline hover:text-text">
          type a card number in by hand
        </Link>
        .
      </p>
    </div>
  );
}
