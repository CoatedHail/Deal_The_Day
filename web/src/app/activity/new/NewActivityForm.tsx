"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/components/providers/DataProvider";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { ChoiceGroup, TextArea, TextField } from "@/components/ui/Field";
import { RatingScale } from "@/components/ui/RatingScale";
import { TagInput } from "@/components/ui/TagInput";
import {
  COMPULSION_SUGGESTIONS,
  PRE_ACTIVITY_COPY as COPY,
} from "@/content/activity-flow";
import { parseCardNumber } from "@/lib/cards";
import { ACTIVITY_CATEGORY_LABELS, ActivityCategory } from "@/lib/types";

const CATEGORY_OPTIONS = (
  Object.keys(ACTIVITY_CATEGORY_LABELS) as ActivityCategory[]
).map((value) => ({ value, label: ACTIVITY_CATEGORY_LABELS[value] }));

export function NewActivityForm() {
  const router = useRouter();
  const { startActivity } = useData();

  const [cardNumberInput, setCardNumberInput] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [category, setCategory] = useState<ActivityCategory | null>(null);
  const [anxiety, setAnxiety] = useState(5);
  const [confidence, setConfidence] = useState(5);
  const [predictedOutcome, setPredictedOutcome] = useState("");
  const [biggestFear, setBiggestFear] = useState("");
  const [temptedCompulsions, setTemptedCompulsions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cardNumber = parseCardNumber(cardNumberInput);
  const cardNumberInvalid = cardNumberInput.trim().length > 0 && cardNumber === null;

  // A prediction is the one field the whole comparison depends on, so it is the
  // only thing required. Everything else can be left blank.
  const canSubmit =
    predictedOutcome.trim().length > 0 && !cardNumberInvalid && !submitting;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    const id = startActivity({
      cardNumber: cardNumber ?? undefined,
      cardTitle: cardTitle.trim(),
      cardCategory: category ?? undefined,
      anxiety,
      confidence,
      predictedOutcome: predictedOutcome.trim(),
      biggestFear: biggestFear.trim(),
      temptedCompulsions,
      notes: notes.trim() || undefined,
    });

    router.push(`/activity/${id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <TextField
              label={COPY.cardNumber.label}
              help={COPY.cardNumber.help}
              placeholder={COPY.cardNumber.placeholder}
              value={cardNumberInput}
              onChange={setCardNumberInput}
            />
            {cardNumberInvalid ? (
              <p className="mt-1.5 text-sm text-accent">
                Card numbers are whole numbers above zero.
              </p>
            ) : null}
          </div>
          <TextField
            label={COPY.cardTitle.label}
            help={COPY.cardTitle.help}
            placeholder={COPY.cardTitle.placeholder}
            value={cardTitle}
            onChange={setCardTitle}
          />
        </div>

        <ChoiceGroup
          legend={COPY.category.label}
          help={COPY.category.help}
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
          columns={3}
        />
      </Card>

      <Card className="space-y-6">
        <RatingScale
          label={COPY.anxiety.label}
          lowLabel={COPY.anxiety.anchorLow}
          highLabel={COPY.anxiety.anchorHigh}
          value={anxiety}
          onChange={setAnxiety}
        />
        <RatingScale
          label={COPY.confidence.label}
          lowLabel={COPY.confidence.anchorLow}
          highLabel={COPY.confidence.anchorHigh}
          value={confidence}
          onChange={setConfidence}
        />
      </Card>

      <Card className="space-y-6">
        <TextArea
          label={COPY.predictedOutcome.label}
          help={COPY.predictedOutcome.help}
          placeholder={COPY.predictedOutcome.placeholder}
          value={predictedOutcome}
          onChange={setPredictedOutcome}
          required
        />
        <TextArea
          label={COPY.biggestFear.label}
          help={COPY.biggestFear.help}
          placeholder={COPY.biggestFear.placeholder}
          value={biggestFear}
          onChange={setBiggestFear}
          rows={3}
        />
        <TagInput
          label={COPY.temptedCompulsions.label}
          help={COPY.temptedCompulsions.help}
          placeholder={COPY.temptedCompulsions.placeholder}
          values={temptedCompulsions}
          onChange={setTemptedCompulsions}
          suggestions={COMPULSION_SUGGESTIONS}
        />
        <TextArea
          label={COPY.notes.label}
          help={COPY.notes.help}
          value={notes}
          onChange={setNotes}
          rows={3}
        />
      </Card>

      <Callout tone="erp" title={COPY.reminder.title}>
        {COPY.reminder.body}
      </Callout>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={!canSubmit}>
          {COPY.submit}
        </Button>
        {predictedOutcome.trim().length === 0 ? (
          <p className="text-sm text-text-subtle">
            Write what you think will happen to continue.
          </p>
        ) : null}
      </div>
    </form>
  );
}
