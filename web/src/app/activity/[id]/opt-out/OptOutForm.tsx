"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/components/providers/DataProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox, ChoiceGroup, TextArea } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { CONCERN_OPTIONS, OPT_OUT_COPY as COPY } from "@/content/activity-flow";
import { formatCardReference } from "@/lib/cards";
import { OptOutRecord } from "@/lib/types";

type Concern = OptOutRecord["natureOfConcern"];

export function OptOutForm({ activityId }: { activityId: string }) {
  const router = useRouter();
  const { data, ready, optOutOfActivity } = useData();

  const activity = data.activities.find((entry) => entry.id === activityId);

  const [reason, setReason] = useState("");
  const [natureOfConcern, setNatureOfConcern] = useState<Concern | null>(null);
  const [modifiedInstead, setModifiedInstead] = useState(false);
  const [modificationDescription, setModificationDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        description="It may have been recorded in a different browser, or deleted."
        action={<ButtonLink href="/activity">Back to activities</ButtonLink>}
      />
    );
  }

  const canSubmit = reason.trim().length > 0 && natureOfConcern !== null && !submitting;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || natureOfConcern === null) return;
    setSubmitting(true);

    optOutOfActivity(activityId, {
      reason: reason.trim(),
      natureOfConcern,
      modifiedInstead,
      modificationDescription: modifiedInstead
        ? modificationDescription.trim() || undefined
        : undefined,
    });

    router.push(`/activity/${activityId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <p className="text-sm text-text-muted">
          Card: <span className="font-medium text-text">{formatCardReference(activity.pre)}</span>
        </p>
      </Card>

      <Card className="space-y-6">
        <TextArea
          label={COPY.reason.label}
          placeholder={COPY.reason.placeholder}
          value={reason}
          onChange={setReason}
          required
          rows={4}
        />

        <ChoiceGroup
          legend={COPY.natureOfConcern.label}
          help={COPY.natureOfConcern.help}
          options={CONCERN_OPTIONS}
          value={natureOfConcern}
          onChange={setNatureOfConcern}
        />
      </Card>

      <Card className="space-y-5">
        <Checkbox
          label={COPY.modifiedInstead.label}
          description={COPY.modifiedInstead.help}
          checked={modifiedInstead}
          onChange={setModifiedInstead}
        />
        {modifiedInstead ? (
          <TextArea
            label={COPY.modificationDescription.label}
            placeholder={COPY.modificationDescription.placeholder}
            value={modificationDescription}
            onChange={setModificationDescription}
            rows={3}
          />
        ) : null}
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" variant="secondary" disabled={!canSubmit}>
          {COPY.submit}
        </Button>
        <ButtonLink href={`/activity/${activityId}`} variant="quiet">
          Cancel
        </ButtonLink>
      </div>
    </form>
  );
}
