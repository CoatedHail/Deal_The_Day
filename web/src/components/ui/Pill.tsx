import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "accent" | "info" | "success" | "caution";

const TONES: Record<Tone, string> = {
  neutral: "bg-surface-sunken text-text-muted border-border",
  primary: "bg-primary-soft text-primary border-primary-border",
  accent: "bg-accent-soft text-accent border-accent-border",
  info: "bg-info-soft text-info border-info-border",
  success: "bg-success-soft text-success border-success-border",
  caution: "bg-caution-soft text-caution border-caution-border",
};

export function Pill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
