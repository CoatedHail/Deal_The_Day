import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";

/** The supplied family-and-orbit mark paired with the product name. */
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <BrandMark className="h-8 w-11 rounded-lg" sizes="44px" priority />
      <span className="font-display text-lg font-semibold leading-tight text-text">
        Deal the Day
      </span>
    </Link>
  );
}
