import { cn } from "@/lib/cn";
import { Disclosure } from "@/components/ui/Disclosure";
import { Icon, type IconName } from "@/components/ui/Icon";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Removes the default padding for cards that manage their own layout. */
  bare?: boolean;
  as?: "div" | "section" | "article" | "li";
  /** Anchor target, for cards a link can point at directly. */
  id?: string;
}

export function Card({ children, className, bare, as: Tag = "div", id }: CardProps) {
  return (
    <Tag
      id={id}
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
  descriptionDisclosureLabel,
  icon,
  action,
  level = 2,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  descriptionDisclosureLabel?: string;
  icon?: IconName;
  action?: React.ReactNode;
  /** Heading level, so card titles slot correctly into the page outline. */
  level?: 2 | 3 | 4;
}) {
  const Heading = `h${level}` as const;

  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <Heading className="flex items-center gap-2 text-lg font-semibold text-text">
          {icon ? (
            <span className="rounded-lg bg-primary-soft p-1.5 text-primary">
              <Icon name={icon} size={18} />
            </span>
          ) : null}
          {title}
        </Heading>
        {description && descriptionDisclosureLabel ? (
          <Disclosure
            summary={descriptionDisclosureLabel}
            className="mt-3 text-sm"
          >
            <p>{description}</p>
          </Disclosure>
        ) : description ? (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
