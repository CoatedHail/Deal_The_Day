import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function Disclosure({
  summary,
  children,
  icon,
  defaultOpen = false,
  className,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  icon?: IconName;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className={cn(
        "group rounded-xl border border-border bg-surface-sunken",
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-4 py-3 font-medium text-text transition-colors hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
        {icon ? (
          <span className="rounded-lg bg-primary-soft p-1.5 text-primary">
            <Icon name={icon} size={18} />
          </span>
        ) : null}
        <span className="min-w-0 flex-1">{summary}</span>
        <Icon
          name="plus"
          size={18}
          className="text-text-muted transition-transform group-open:rotate-45"
        />
      </summary>
      <div className="border-t border-border px-4 py-4 text-text-muted">
        {children}
      </div>
    </details>
  );
}
