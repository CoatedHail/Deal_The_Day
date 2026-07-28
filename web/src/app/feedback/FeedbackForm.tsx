"use client";

import { useState } from "react";
import { useData } from "@/components/providers/DataProvider";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardHeader } from "@/components/ui/Card";
import { ChoiceGroup, TextArea, TextField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { RatingScale } from "@/components/ui/RatingScale";
import { formatCardNumber, parseCardNumber } from "@/lib/cards";
import { FEEDBACK_EMAIL } from "@/lib/contact";
import { formatDate } from "@/lib/date";
import { FEEDBACK_DIFFICULTY_LABELS, GameFeedback } from "@/lib/types";

type Difficulty = GameFeedback["difficulty"];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; description: string }[] = [
  {
    value: "too-easy",
    label: "Too easy for us",
    description: "It did not ask anything much of anyone.",
  },
  {
    value: "about-right",
    label: "About right",
    description: "A real step, but a manageable one.",
  },
  {
    value: "too-hard",
    label: "Too big a step",
    description: "More than this family could take on right now.",
  },
];

/** Renders one saved review as plain text, for copying or emailing onward. */
function toPlainText(entry: GameFeedback): string {
  const lines = [
    `Deal the Day — card feedback`,
    `Submitted: ${formatDate(entry.submittedAt, "long")}`,
    entry.cardNumber ? `Card: ${entry.cardNumber}` : `Card: not specified`,
    `Rating: ${entry.rating}/10`,
    `Difficulty: ${FEEDBACK_DIFFICULTY_LABELS[entry.difficulty]}`,
    ``,
    `What worked:`,
    entry.whatWorked || "—",
    ``,
    `What did not:`,
    entry.whatDidNot || "—",
  ];

  if (entry.suggestion?.trim()) {
    lines.push("", "Suggestion:", entry.suggestion.trim());
  }

  return lines.join("\n");
}

function mailtoHref(entry: GameFeedback): string {
  const subject = entry.cardNumber
    ? `Deal the Day feedback — card ${entry.cardNumber}`
    : "Deal the Day feedback";
  return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    toPlainText(entry),
  )}`;
}

export function FeedbackForm() {
  const { data, ready, addFeedback, markFeedbackSent, deleteFeedback } = useData();

  const [cardNumberInput, setCardNumberInput] = useState("");
  const [rating, setRating] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [whatWorked, setWhatWorked] = useState("");
  const [whatDidNot, setWhatDidNot] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [justSavedId, setJustSavedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cardNumber = parseCardNumber(cardNumberInput);
  const cardNumberInvalid = cardNumberInput.trim().length > 0 && cardNumber === null;
  const canSubmit = difficulty !== null && !cardNumberInvalid;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || difficulty === null) return;

    const id = addFeedback({
      cardNumber: cardNumber ?? undefined,
      rating,
      difficulty,
      whatWorked: whatWorked.trim(),
      whatDidNot: whatDidNot.trim(),
      suggestion: suggestion.trim() || undefined,
    });

    setJustSavedId(id);
    setCardNumberInput("");
    setRating(5);
    setDifficulty(null);
    setWhatWorked("");
    setWhatDidNot("");
    setSuggestion("");
  }

  async function handleCopy(entry: GameFeedback) {
    try {
      await navigator.clipboard.writeText(toPlainText(entry));
      setCopiedId(entry.id);
      markFeedbackSent(entry.id);
      window.setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Clipboard access can be refused. The text is on screen either way, so
      // there is nothing useful to recover here beyond not crashing.
    }
  }

  const saved = ready ? data.feedback : [];
  const justSaved = saved.find((entry) => entry.id === justSavedId) ?? null;

  return (
    <div className="space-y-6">
      {justSaved ? (
        <Card>
          <CardHeader
            title="Saved on this device"
            description="Nothing has been sent anywhere. Send it on when you are ready."
          />
          <Callout tone="info" title="How to send it">
            We do not run a server, so this review stays on your device until you pass
            it on. Copy it into an email, a message, or hand it over on paper —
            whichever suits.
          </Callout>
          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-surface-sunken p-4 text-sm leading-relaxed text-text">
            {toPlainText(justSaved)}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => void handleCopy(justSaved)}>
              <Icon name={copiedId === justSaved.id ? "check" : "clipboard"} size={18} />
              {copiedId === justSaved.id ? "Copied" : "Copy to clipboard"}
            </Button>
            <a
              href={mailtoHref(justSaved)}
              onClick={() => markFeedbackSent(justSaved.id)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2.5 font-medium text-text transition-colors hover:bg-bg-subtle"
            >
              Open in your email app
            </a>
            <Button variant="quiet" onClick={() => setJustSavedId(null)}>
              Done
            </Button>
          </div>
          <p className="mt-3 text-sm text-text-subtle">
            The email address is a placeholder until the project publishes a real one.
          </p>
        </Card>
      ) : null}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Card number"
            help="The number printed on the card. Leave it blank if this is about the deck as a whole."
            value={cardNumberInput}
            onChange={setCardNumberInput}
            placeholder="e.g. 14"
          />
          {cardNumberInvalid ? (
            <p className="text-sm text-accent">
              Card numbers are whole numbers above zero.
            </p>
          ) : null}

          <RatingScale
            label="How did this card land for your family?"
            lowLabel="Did not work"
            highLabel="Worked well"
            value={rating}
            onChange={setRating}
          />

          <ChoiceGroup
            legend="How big a step was it?"
            help="There is no right answer here — the same card lands differently for different families."
            options={DIFFICULTY_OPTIONS}
            value={difficulty}
            onChange={setDifficulty}
          />

          <TextArea
            label="What worked"
            value={whatWorked}
            onChange={setWhatWorked}
            placeholder="What went well, what your family enjoyed, what surprised you."
            rows={3}
          />

          <TextArea
            label="What did not"
            value={whatDidNot}
            onChange={setWhatDidNot}
            placeholder="Anything confusing, awkward, or badly pitched."
            rows={3}
          />

          <TextArea
            label="Anything you would change"
            help="Optional. Wording, difficulty, a card you wish existed."
            value={suggestion}
            onChange={setSuggestion}
            rows={3}
          />

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!canSubmit}>
              Save this review
            </Button>
            {difficulty === null ? (
              <p className="text-sm text-text-subtle">
                Choose how big a step it was to continue.
              </p>
            ) : null}
          </div>
        </form>
      </Card>

      {saved.length > 0 ? (
        <Card>
          <CardHeader
            title="Reviews saved on this device"
            description={`${saved.length} saved. These are not part of your progress record.`}
            level={2}
          />
          <ul className="space-y-3">
            {saved.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-border bg-surface-sunken p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {entry.cardNumber ? (
                    <Pill tone="primary">{formatCardNumber(entry.cardNumber)}</Pill>
                  ) : (
                    <Pill>Whole deck</Pill>
                  )}
                  <Pill>{entry.rating}/10</Pill>
                  <Pill>{FEEDBACK_DIFFICULTY_LABELS[entry.difficulty]}</Pill>
                  {entry.sent ? <Pill tone="success">Shared</Pill> : null}
                  <span className="ml-auto text-sm text-text-subtle">
                    {formatDate(entry.submittedAt)}
                  </span>
                </div>

                {entry.whatWorked ? (
                  <p className="mt-3 text-sm leading-relaxed text-text">
                    {entry.whatWorked}
                  </p>
                ) : null}
                {entry.whatDidNot ? (
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {entry.whatDidNot}
                  </p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={() => void handleCopy(entry)}>
                    {copiedId === entry.id ? "Copied" : "Copy"}
                  </Button>
                  <Button
                    size="sm"
                    variant="quiet"
                    onClick={() => deleteFeedback(entry.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
