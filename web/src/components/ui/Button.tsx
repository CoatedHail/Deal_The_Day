import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary border-primary hover:bg-primary-hover hover:border-primary-hover shadow-sm",
  secondary:
    "bg-surface text-text border-border-strong hover:bg-bg-subtle hover:border-text-subtle",
  quiet: "bg-transparent text-text-muted border-transparent hover:bg-bg-subtle hover:text-text",
  // Used only for destructive actions such as clearing stored data.
  danger: "bg-surface text-accent border-accent-border hover:bg-accent-soft",
};

const SIZES: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-base px-4 py-2.5 gap-2",
  lg: "text-lg px-6 py-3.5 gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-full border font-medium transition-colors " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Stretches the button to the full width of its container. */
  block?: boolean;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  block,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], block && "w-full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children">;

/** A link styled as a button, for navigation rather than actions. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  block,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(BASE, VARIANTS[variant], SIZES[size], block && "w-full", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
