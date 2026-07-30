"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CARD_LENGTH_BY_ID, CARD_LENGTHS } from "@/lib/card-lengths";
import { cn } from "@/lib/cn";
import type { CardLength } from "@/lib/types";

export function CardLengthPicker({ className }: { className?: string }) {
  const headingId = useId();
  const detailsId = useId();
  const [selected, setSelected] = useState<CardLength | null>(null);
  const card = selected ? CARD_LENGTH_BY_ID[selected] : null;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("mb-6 rounded-card border border-border bg-surface p-5 sm:p-6", className)}
    >
      <div className="max-w-[var(--reading-measure)]">
        <h2 id={headingId} className="text-xl font-semibold text-text">
          Pick an activity card
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">
          Choose the length card your family drew. Select an image to see what the
          card can include and carry that choice into your activity record.
        </p>
      </div>

      <div
        role="group"
        aria-label="Activity card length"
        className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-4"
      >
        {CARD_LENGTHS.map((option) => {
          const active = option.id === selected;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              aria-controls={detailsId}
              onClick={() => setSelected(option.id)}
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
            </button>
          );
        })}
      </div>

      <div
        id={detailsId}
        aria-live="polite"
        className="mt-5 rounded-xl border border-border bg-bg-subtle p-4 sm:p-5"
      >
        {card ? (
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="min-w-0">
              <h3 className="font-semibold text-text">{card.title}</h3>
              <p className="mt-1 leading-relaxed text-text-muted">{card.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-text">
                <strong>Ideas:</strong> {card.examples.join(", ")}.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {card.planningNote}
              </p>
            </div>
            <ButtonLink href={`/activity/new?length=${card.id}`} className="shrink-0">
              Use this card
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        ) : (
          <p className="text-sm text-text-muted">
            Select Short, Medium, or Long to see information about that card.
          </p>
        )}
      </div>
    </section>
  );
}
