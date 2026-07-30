import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";

/** The supplied full logo already contains the product name and family mark. */
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
    >
      <BrandMark
        alt="Deal the Day"
        className="h-16 w-[4.5rem] rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5 lg:h-24 lg:w-[6.75rem] lg:p-1.5"
        sizes="(min-width: 1024px) 108px, 72px"
        priority
      />
    </Link>
  );
}
