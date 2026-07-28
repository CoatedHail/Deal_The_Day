"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Free-text list builder, used for naming compulsions.
 *
 * Suggestions are offered because naming a compulsion is genuinely hard when
 * you are inside it — but they are only ever prompts, and anything typed is
 * kept verbatim.
 */
export function TagInput({
  label,
  help,
  values,
  onChange,
  suggestions = [],
  placeholder = "Type and press Enter",
  className,
}: {
  label: string;
  help?: string;
  values: string[];
  onChange: (values: string[]) => void;
  suggestions?: readonly string[];
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  const helpId = `${id}-help`;
  const [draft, setDraft] = useState("");

  const add = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    // Case-insensitive de-duplication, so "Checking" and "checking" do not both
    // end up in the list.
    if (values.some((existing) => existing.toLowerCase() === value.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...values, value]);
    setDraft("");
  };

  const remove = (value: string) => {
    onChange(values.filter((existing) => existing !== value));
  };

  const unusedSuggestions = suggestions.filter(
    (suggestion) =>
      !values.some((existing) => existing.toLowerCase() === suggestion.toLowerCase()),
  );

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block font-medium text-text">
        {label}
      </label>
      {help ? (
        <p id={helpId} className="text-sm text-text-muted">
          {help}
        </p>
      ) : null}

      {values.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {values.map((value) => (
            <li key={value}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-border bg-primary-soft py-1 pl-3 pr-1 text-sm text-text">
                {value}
                <button
                  type="button"
                  onClick={() => remove(value)}
                  aria-label={`Remove ${value}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface hover:text-text"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex gap-2">
        <input
          id={id}
          value={draft}
          placeholder={placeholder}
          aria-describedby={help ? helpId : undefined}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // The input usually sits inside a form; Enter should add a tag,
              // not submit the whole step.
              event.preventDefault();
              add(draft);
            }
          }}
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text placeholder:text-text-subtle transition-colors hover:border-border-strong"
        />
        <button
          type="button"
          onClick={() => add(draft)}
          disabled={!draft.trim()}
          className="shrink-0 rounded-xl border border-border-strong px-4 text-sm font-medium transition-colors hover:bg-bg-subtle disabled:opacity-40"
        >
          Add
        </button>
      </div>

      {unusedSuggestions.length > 0 ? (
        <div className="pt-1">
          <p className="mb-1.5 text-xs text-text-subtle">Common ones, if any fit:</p>
          <ul className="flex flex-wrap gap-1.5">
            {unusedSuggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => add(suggestion)}
                  className="rounded-full border border-dashed border-border-strong px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-primary hover:bg-primary-soft hover:text-text"
                >
                  + {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
