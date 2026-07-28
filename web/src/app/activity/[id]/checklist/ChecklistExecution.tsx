"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/components/providers/DataProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { TextField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { CHECKLIST_EXECUTION_COPY as COPY } from "@/content/checklists";
import { formatCardReference } from "@/lib/cards";
import { cn } from "@/lib/cn";

/**
 * The execution screen.
 *
 * Two deliberate absences here. The list cannot be edited, reordered or added
 * to — reopening it at this point would restore exactly the live control the
 * feature exists to move earlier. And nothing about progress is reported
 * anywhere until the activity is reflected on, because a parent watching items
 * tick off in real time is the checking compulsion with a progress bar.
 */
export function ChecklistExecution({ activityId }: { activityId: string }) {
  const router = useRouter();
  const { data, ready, recordChecklistProgress } = useData();

  const activity = data.activities.find((entry) => entry.id === activityId);
  const items = activity?.checklistSnapshot ?? [];

  const [handedOver, setHandedOver] = useState(false);
  const [completed, setCompleted] = useState<string[]>(
    activity?.checklistCompleted ?? [],
  );
  const [executedBy, setExecutedBy] = useState(activity?.executedBy ?? "");

  if (!ready) {
    return (
      <p className="text-text-muted" role="status">
        Loading…
      </p>
    );
  }

  if (!activity) {
    return (
      <EmptyState
        title="That activity is not on this device"
        action={<ButtonLink href="/activity">Back to activities</ButtonLink>}
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="No checklist for this one"
        description="Checklists are optional, and this category does not have one yet. You can write one afterwards, when you reflect."
        action={
          <ButtonLink href={`/activity/${activityId}`} variant="secondary">
            Back to the card
          </ButtonLink>
        }
      />
    );
  }

  function toggle(id: string) {
    setCompleted((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

  function handleDone() {
    recordChecklistProgress(activityId, completed, executedBy);
    router.push(`/activity/${activityId}`);
  }

  // A handover step so the parent is not still holding the phone when the list
  // appears — small, but it makes "this is yours now" an explicit moment.
  if (!handedOver) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader
            title={COPY.handover.title}
            description={formatCardReference(activity.pre)}
          />
          <p className="text-sm leading-relaxed text-text-muted">{COPY.handover.body}</p>
          <p className="mt-4 text-sm text-text-muted">
            {items.length} {items.length === 1 ? "item" : "items"} on the list.
          </p>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => setHandedOver(true)}>
            <Icon name="arrow-right" size={18} />
            Show the list
          </Button>
          <ButtonLink href={`/activity/${activityId}`} variant="quiet">
            Not yet
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Callout tone="erp" title={COPY.forExecutor.title}>
        {COPY.forExecutor.body}
      </Callout>

      <Card>
        <ul className="space-y-1">
          {items.map((item) => {
            const done = completed.includes(item.id);
            return (
              <li key={item.id}>
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                    done
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-surface hover:border-border-strong",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]"
                  />
                  <span
                    className={cn(
                      "min-w-0 leading-relaxed",
                      done ? "text-text-muted line-through" : "text-text",
                    )}
                  >
                    {item.text}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </Card>

      <Callout tone="info" title={COPY.cannotDo.label}>
        {COPY.cannotDo.body}
      </Callout>

      <Card>
        <TextField
          label="Who did this one?"
          help="Optional. Useful later for making sure it is not always the same person."
          value={executedBy}
          onChange={setExecutedBy}
          placeholder="A first name"
        />
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" onClick={handleDone}>
          {COPY.done}
        </Button>
      </div>
    </div>
  );
}
