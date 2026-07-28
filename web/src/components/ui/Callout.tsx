import { cn } from "@/lib/cn";

type Tone = "info" | "erp" | "caution" | "success";

const TONES: Record<Tone, { wrapper: string; label: string }> = {
  info: { wrapper: "bg-info-soft border-info-border", label: "text-info" },
  // ERP reminders get their own tone so they read as a steady, familiar voice
  // rather than as a warning.
  erp: { wrapper: "bg-primary-soft border-primary-border", label: "text-primary" },
  caution: { wrapper: "bg-caution-soft border-caution-border", label: "text-caution" },
  success: { wrapper: "bg-success-soft border-success-border", label: "text-success" },
};

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const styles = TONES[tone];

  return (
    <div className={cn("rounded-card border p-4 sm:p-5", styles.wrapper, className)}>
      {title ? (
        <p className={cn("mb-1.5 text-sm font-semibold tracking-wide", styles.label)}>
          {title}
        </p>
      ) : null}
      <div className="text-sm leading-relaxed text-text">{children}</div>
    </div>
  );
}
