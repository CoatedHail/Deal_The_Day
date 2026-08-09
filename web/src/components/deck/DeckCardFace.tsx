import Link from "next/link";
import type { DeckCard } from "@/content/cards";
import { cn } from "@/lib/cn";

/**
 * One card from the deck, drawn in the app's own colours.
 *
 * Deliberately not a pixel facsimile of the printed card. The print design is
 * navy on cream, which would fight the earthy palette, invert badly in dark
 * mode and ignore high-contrast mode entirely — an image of a card that half
 * the accessibility settings cannot touch. What carries over is the layout,
 * which is what makes it recognisable: title top left, the prompt underneath,
 * three ruled lines, the number in the corner.
 *
 * The ruled lines are decorative here. On the printed card they are where a
 * family writes what they are actually going to do; in the app that happens in
 * the form on the next screen, and the lines are kept as the visual promise
 * that something goes here.
 */
export function DeckCardFace({
  card,
  className,
}: {
  card: DeckCard;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square w-full max-w-sm flex-col rounded-[1.75rem] border-4 border-primary bg-surface p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      <div>
        <h3 className="text-2xl font-semibold leading-tight text-text sm:text-3xl">
          {card.title}
          {card.example ? (
            <span className="ml-2 align-baseline text-sm font-normal text-text-muted">
              {card.example}
            </span>
          ) : null}
        </h3>
        <p className="mt-1.5 text-sm text-text-muted">
          Need ideas?{" "}
          <Link href="/activity-ideas" className="underline hover:text-text">
            Check our website
          </Link>
          !
        </p>
      </div>

      {/* The write-on lines from the printed card, kept as a visual echo. */}
      <div
        aria-hidden="true"
        className="flex flex-1 flex-col justify-center gap-7 py-4"
      >
        <span className="h-px bg-border-strong" />
        <span className="h-px bg-border-strong" />
        <span className="h-px bg-border-strong" />
      </div>

      <div className="flex items-end justify-between gap-4">
        <span className="text-4xl font-semibold leading-none tabular-nums text-text sm:text-5xl">
          {card.number}
        </span>
        <span className="text-sm font-semibold text-text-muted">Deal the Day</span>
      </div>
    </div>
  );
}
