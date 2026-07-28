import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Removes the default padding for cards that manage their own layout. */
  bare?: boolean;
  as?: "div" | "section" | "article" | "li";
}

export function Card({ children, className, bare, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-border bg-surface",
        !bare && "p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  title,
  description,
  action,
  level = 2,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** Heading level, so card titles slot correctly into the page outline. */
  level?: 2 | 3 | 4;
}) {
  const Heading = `h${level}` as const;

  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <Heading className="text-lg font-semibold text-text">{title}</Heading>
        {description ? (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
