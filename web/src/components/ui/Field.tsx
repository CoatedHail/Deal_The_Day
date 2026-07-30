"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text " +
  "placeholder:text-text-subtle transition-colors hover:border-border-strong";

export function TextField({
  label,
  help,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  className,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "date" | "time";
  className?: string;
}) {
  const id = useId();
  const helpId = `${id}-help`;

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block font-medium text-text">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      {help ? (
        <p id={helpId} className="text-sm text-text-muted">
          {help}
        </p>
      ) : null}
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-describedby={help ? helpId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={CONTROL}
      />
    </div>
  );
}

export function TextArea({
  label,
  help,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  className,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}) {
  const id = useId();
  const helpId = `${id}-help`;

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block font-medium text-text">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      {help ? (
        <p id={helpId} className="text-sm text-text-muted">
          {help}
        </p>
      ) : null}
      <textarea
        id={id}
        value={value}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-describedby={help ? helpId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(CONTROL, "resize-y leading-relaxed")}
      />
    </div>
  );
}

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

/**
 * Radio group rendered as cards.
 *
 * Uses a real fieldset and native radios so keyboard and screen reader
 * behavior comes for free.
 */
export function ChoiceGroup<T extends string>({
  legend,
  help,
  options,
  value,
  onChange,
  columns = 1,
  className,
}: {
  legend: string;
  help?: string;
  options: ReadonlyArray<ChoiceOption<T>>;
  value: T | null;
  onChange: (value: T) => void;
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  const name = useId();

  return (
    <fieldset className={cn("space-y-2.5", className)}>
      <legend className="font-medium text-text">{legend}</legend>
      {help ? <p className="text-sm text-text-muted">{help}</p> : null}
      <div
        className={cn(
          "grid gap-2.5",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-3",
        )}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer gap-3 rounded-xl border p-3.5 transition-colors",
                selected
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
              />
              <span className="min-w-0">
                <span className="block font-medium text-text">{option.label}</span>
                {option.description ? (
                  <span className="mt-0.5 block text-sm text-text-muted">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Checkbox({
  label,
  description,
  checked,
  onChange,
  className,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label className={cn("flex cursor-pointer gap-3", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
      />
      <span className="min-w-0">
        <span className="block font-medium text-text">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-sm text-text-muted">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
