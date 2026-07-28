import Link from "next/link";

/**
 * The product mark: a small card motif plus the name.
 *
 * The two offset rounded rectangles read as a deck without needing artwork.
 */
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="relative inline-block h-8 w-8 shrink-0"
      >
        <span className="absolute inset-y-0.5 left-0 w-6 -rotate-12 rounded-md border border-accent-border bg-accent-soft" />
        <span className="absolute inset-y-0 right-0 w-6 rotate-6 rounded-md border border-primary-border bg-primary-soft" />
      </span>
      <span className="font-display text-lg font-semibold leading-tight text-text">
        Deal the Day
      </span>
    </Link>
  );
}
