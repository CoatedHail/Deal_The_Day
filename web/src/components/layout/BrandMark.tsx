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
        "relative block shrink-0 overflow-hidden",
        className,
      )}
    >
      <Image
        src="/brand/deal-the-day-full-logo.png"
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </span>
  );
}
