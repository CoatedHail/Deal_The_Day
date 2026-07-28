"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { CHECKLIST_AUTHORING_COPY as COPY, CHECKLIST_SUGGESTIONS } from "@/content/checklists";
import { createId } from "@/lib/storage";
import { cn } from "@/lib/cn";
import {
  ACTIVITY_CATEGORY_LABELS,
  ActivityCategory,
  CHECKLIST_ITEM_MAX_LENGTH,
  CHECKLIST_MAX_ITEMS,
  ChecklistItem,
} from "@/lib/types";

/**
 * Writes the checklist for a category, from inside the reflection step.
 *
 * Authoring here rather than in a separate planning session is the whole reason
 * this is bearable: the parent has just done the activity, so they are writing
 * from what actually mattered rather than from what they imagined might. Lists
 * written from memory of a real event come out shorter and truer than lists
 * written from anticipation.
 *
 * The cap is enforced rather than suggested. A soft nudge does not restrain the
 * pattern this feature could otherwise feed.
 */
export function ChecklistAuthor({
  category,
  existing,
  onChange,
}: {
  category: ActivityCategory;
  existing?: ChecklistItem[];
  /** Emits the current list, or null when the parent has opted out. */
  onChange: (items: ChecklistItem[] | null) => void;
}) {
  const isUpdate = Boolean(existing?.length);
  const [open, setOpen] = useState(isUpdate);
  const [items, setItems] = useState<ChecklistItem[]>(existing ?? []);
  const [draft, setDraft] = useState("");

  const full = items.length >= CHECKLIST_MAX_ITEMS;
  const suggestions = CHECKLIST_SUGGESTIONS[category].filter(
    (text) => !items.some((item) => item.text.toLowerCase() === text.toLowerCase()),
  );

  function commit(next: ChecklistItem[]) {
    setItems(next);
    onChange(next);
  }

  function add(text: string) {
    const value = text.trim().slice(0, CHECKLIST_ITEM_MAX_LENGTH);
    if (!value || full) return;
    if (items.some((item) => item.text.toLowerCase() === value.toLowerCase())) {
      setDraft("");
      return;
    }
    commit([...items, { id: createId(), text: value }]);
    setDraft("");
  }

  function remove(id: string) {
    commit(items.filter((item) => item.id !== id));
  }

  if (!open) {
    return (
      <Card>
        <CardHeader
          title={COPY.prompt.label}
          description={`${ACTIVITY_CATEGORY_LABELS[category]} · ${COPY.prompt.help}`}
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2.5 font-medium text-text transition-colors hover:bg-bg-subtle"
          >
            <Icon name="plus" size={18} />
            Write a short list
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-full px-4 py-2.5 font-medium text-text-muted transition-colors hover:bg-bg-subtle hover:text-text"
          >
            {COPY.skip}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title={isUpdate ? COPY.updatePrompt.label : COPY.prompt.label}
        description={isUpdate ? COPY.updatePrompt.help : COPY.prompt.help}
      />

      {items.length > 0 ? (
        <ul className="mb-4 space-y-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-sunken px-3.5 py-2.5"
            >
              <span aria-hidden="true" className="text-sm tabular-nums text-text-subtle">
                {index + 1}.
              </span>
              <span className="min-w-0 flex-1 text-text">{item.text}</span>
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`Remove ${item.text}`}
                className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface hover:text-text"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex gap-2">
        <input
          value={draft}
          maxLength={CHECKLIST_ITEM_MAX_LENGTH}
          disabled={full}
          placeholder={full ? "That is enough for one list" : "One short thing"}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add(draft);
            }
          }}
          aria-label="Add a checklist item"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text placeholder:text-text-subtle transition-colors hover:border-border-strong disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => add(draft)}
          disabled={!draft.trim() || full}
          className="shrink-0 rounded-xl border border-border-strong px-4 text-sm font-medium transition-colors hover:bg-bg-subtle disabled:opacity-40"
        >
          Add
        </button>
      </div>

      <p className={cn("mt-2 text-xs", full ? "text-accent" : "text-text-subtle")}>
        {items.length} of {CHECKLIST_MAX_ITEMS}
        {full ? " — the most a list can hold" : ". Short lists work better than long ones."}
      </p>

      {suggestions.length > 0 && !full ? (
        <div className="mt-4">
          <p className="mb-1.5 text-xs text-text-subtle">{COPY.suggestionsLabel}</p>
          <ul className="flex flex-wrap gap-1.5">
            {suggestions.map((text) => (
              <li key={text}>
                <button
                  type="button"
                  onClick={() => add(text)}
                  className="rounded-full border border-dashed border-border-strong px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-primary hover:bg-primary-soft hover:text-text"
                >
                  + {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {items.length > 0 ? (
        <p className="mt-4 text-sm text-text-muted">{COPY.savedNote}</p>
      ) : null}
    </Card>
  );
}
