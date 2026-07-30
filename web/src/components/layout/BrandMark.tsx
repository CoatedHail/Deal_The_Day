import Image from "next/image";
import { cn } from "@/lib/cn";

export function BrandMark({
  alt = "",
  className,
  sizes,
  priority = false,
}: {
  alt?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-xl border border-border bg-white shadow-sm",
        className,
      )}
    >
      <Image
        src="/deal-the-day-mark.jpg"
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </span>
  );
}
