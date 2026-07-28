"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/components/providers/DataProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Checkbox, ChoiceGroup, TextArea } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pill } from "@/components/ui/Pill";
import { RatingScale } from "@/components/ui/RatingScale";
import {
  FEARED_OUTCOME_OPTIONS,
  POST_ACTIVITY_COPY as COPY,
} from "@/content/activity-flow";
import { formatCardReference } from "@/lib/cards";
import { FearedOutcome } from "@/lib/types";

export function ReflectForm({ activityId }: { activityId: string }) {
  const router = useRouter();
  const { data, ready, completeActivity } = useData();

  const activity = data.activities.find((entry) => entry.id === activityId);

  const [whatHappened, setWhatHappened] = useState("");
  const [anxietyAfter, setAnxietyAfter] = useState(5);
  const [fearedOutcome, setFearedOutcome] = useState<FearedOutcome | null>(null);
  const [whatSurprisedYou, setWhatSurprisedYou] = useState("");
  const [whatDidYouLearn, setWhatDidYouLearn] = useState("");
  const [reflection, setReflection] = useState("");
  const [resisted, setResisted] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const tempted = useMemo(
    () => activity?.pre.temptedCompulsions ?? [],
    [activity?.pre.temptedCompulsions],
  );

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

  const canSubmit =
    whatHappened.trim().length > 0 && fearedOutcome !== null && !submitting;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || fearedOutcome === null) return;
    setSubmitting(true);

    completeActivity(activityId, {
      whatHappened: whatHappened.trim(),
      anxietyAfter,
      whatSurprisedYou: whatSurprisedYou.trim(),
      fearedOutcome,
      whatDidYouLearn: whatDidYouLearn.trim(),
      reflection: reflection.trim() || undefined,
      compulsionsResisted: resisted,
      compulsionsPerformed: tempted.filter((item) => !resisted.includes(item)),
    });

    router.push(`/activity/${activityId}`);
  }

  return (
    <div className="space-y-6">
      {/* The original prediction stays on screen throughout. Recalling it from
          memory while writing the reflection would defeat the comparison. */}
      <Card className="border-primary-border bg-primary-soft">
        <CardHeader
          title="What you wrote beforehand"
          description={formatCardReference(activity.pre)}
        />
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-text-muted">You expected</dt>
            <dd className="mt-0.5 leading-relaxed text-text">
              {activity.pre.predictedOutcome}
            </dd>
          </div>
          {activity.pre.biggestFear ? (
            <div>
              <dt className="font-medium text-text-muted">Most worried about</dt>
              <dd className="mt-0.5 leading-relaxed text-text">
                {activity.pre.biggestFear}
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="font-medium text-text-muted">Anxiety beforehand</dt>
            <dd className="mt-0.5">
              <Pill tone="primary">{activity.pre.anxiety} / 10</Pill>
            </dd>
          </div>
        </dl>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="space-y-6">
          <TextArea
            label={COPY.whatHappened.label}
            placeholder={COPY.whatHappened.placeholder}
            value={whatHappened}
            onChange={setWhatHappened}
            required
          />
          <RatingScale
            label={COPY.anxietyAfter.label}
            lowLabel={COPY.anxietyAfter.anchorLow}
            highLabel={COPY.anxietyAfter.anchorHigh}
            value={anxietyAfter}
            onChange={setAnxietyAfter}
          />
        </Card>

        <Card>
          <ChoiceGroup
            legend={COPY.fearedOutcome.label}
            help={COPY.fearedOutcome.help}
            options={FEARED_OUTCOME_OPTIONS}
            value={fearedOutcome}
            onChange={setFearedOutcome}
          />
        </Card>

        {tempted.length > 0 ? (
          <Card>
            <CardHeader title={COPY.compulsions.label} description={COPY.compulsions.help} />
            <ul className="space-y-3">
              {tempted.map((item) => (
                <li key={item}>
                  <Checkbox
                    label={item}
                    description="Tick if you managed not to do this one."
                    checked={resisted.includes(item)}
                    onChange={(checked) =>
                      setResisted((current) =>
                        checked
                          ? [...current, item]
                          : current.filter((value) => value !== item),
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        <Card className="space-y-6">
          <TextArea
            label={COPY.whatSurprisedYou.label}
            placeholder={COPY.whatSurprisedYou.placeholder}
            value={whatSurprisedYou}
            onChange={setWhatSurprisedYou}
            rows={3}
          />
          <TextArea
            label={COPY.whatDidYouLearn.label}
            placeholder={COPY.whatDidYouLearn.placeholder}
            value={whatDidYouLearn}
            onChange={setWhatDidYouLearn}
            rows={3}
          />
          <TextArea
            label={COPY.reflection.label}
            help={COPY.reflection.help}
            value={reflection}
            onChange={setReflection}
            rows={5}
          />
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={!canSubmit}>
            {COPY.submit}
          </Button>
          {!canSubmit && !submitting ? (
            <p className="text-sm text-text-subtle">
              Say what happened, and whether the thing you feared came about.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
