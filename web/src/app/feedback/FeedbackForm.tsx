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

type SendState = "idle" | "sending" | "sent" | "failed";

export function FeedbackForm() {
  const { data, ready, addFeedback, markFeedbackSent, deleteFeedback } = useData();

  const [cardNumberInput, setCardNumberInput] = useState("");
  const [rating, setRating] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [whatWorked, setWhatWorked] = useState("");
  const [whatDidNot, setWhatDidNot] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [state, setState] = useState<SendState>("idle");
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  const cardNumber = parseCardNumber(cardNumberInput);
  const cardNumberInvalid = cardNumberInput.trim().length > 0 && cardNumber === null;
  const canSubmit = difficulty !== null && !cardNumberInvalid && state !== "sending";

  async function send(payload: Omit<GameFeedback, "id" | "submittedAt" | "sent">) {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("send failed");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || difficulty === null) return;

    const payload = {
      cardNumber: cardNumber ?? undefined,
      rating,
      difficulty,
      whatWorked: whatWorked.trim(),
      whatDidNot: whatDidNot.trim(),
      suggestion: suggestion.trim() || undefined,
    };

    setState("sending");

    // Kept on this device as well as sent, so the family can see what they said
    // and so a failed send never loses what they wrote.
    const id = addFeedback(payload);
    setLastSavedId(id);

    try {
      await send(payload);
      markFeedbackSent(id);
      setState("sent");
      setCardNumberInput("");
      setRating(5);
      setDifficulty(null);
      setWhatWorked("");
      setWhatDidNot("");
      setSuggestion("");
    } catch {
      setState("failed");
    }
  }

  async function retry(entry: GameFeedback) {
    setState("sending");
    try {
      await send(entry);
      markFeedbackSent(entry.id);
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  const saved = ready ? data.feedback : [];
  const lastSaved = saved.find((entry) => entry.id === lastSavedId) ?? null;

  return (
    <div className="space-y-6">
      {state === "sent" ? (
        <Callout tone="success" title="Sent — thank you">
          That has gone to the people making the deck. It was sent without anything
          identifying you or your family attached.
        </Callout>
      ) : null}

      {state === "failed" && lastSaved ? (
        <Callout tone="caution" title="That did not send">
          Your review is saved on this device, so nothing is lost. It may just be the
          connection.
          <div className="mt-3">
            <Button size="sm" onClick={() => void retry(lastSaved)}>
              Try again
            </Button>
          </div>
        </Callout>
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

          <Callout tone="info">
            These reviews are read by the project team, so please leave out names and
            anything you would not want us to see. Nothing identifying you is sent
            with them.
          </Callout>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!canSubmit}>
              {state === "sending" ? "Sending…" : "Send this review"}
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
            title="Reviews you have sent"
            description={`${saved.length} kept on this device. These are not part of your progress record.`}
            level={2}
          />
          {/* Reviews the family wrote. */}
          <ul data-private className="space-y-3">
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
                  {entry.sent ? (
                    <Pill tone="success">
                      <Icon name="check" size={12} />
                      Sent
                    </Pill>
                  ) : (
                    <Pill tone="caution">Not sent</Pill>
                  )}
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
                  {!entry.sent ? (
                    <Button size="sm" variant="secondary" onClick={() => void retry(entry)}>
                      Send it
                    </Button>
                  ) : null}
                  <Button
                    size="sm"
                    variant="quiet"
                    onClick={() => deleteFeedback(entry.id)}
                  >
                    Remove from this device
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-text-subtle">
            Removing a review here clears your own copy. It does not withdraw one
            already sent, because sent reviews carry nothing that links them back to
            you.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
