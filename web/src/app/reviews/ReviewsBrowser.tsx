"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pill } from "@/components/ui/Pill";
import { StatTile } from "@/components/ui/StatTile";
import { formatCardNumber } from "@/lib/cards";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";
import { FEEDBACK_DIFFICULTY_LABELS, GameFeedback } from "@/lib/types";

type Difficulty = GameFeedback["difficulty"];

/**
 * One review as it comes out of the database.
 *
 * Deliberately has no author field, because the stored row has none. Reviews are
 * kept unlinked from any account, so this screen can be read freely without
 * being a look at any particular family.
 */
export interface ReviewRow {
  id: string;
  /** ISO 8601. Serialised on the server so it survives the client boundary. */
  submittedAt: string;
  cardNumber: number | null;
  rating: number;
  difficulty: Difficulty;
  whatWorked: string;
  whatDidNot: string;
  suggestion: string | null;
}

const DIFFICULTIES: Difficulty[] = ["too-easy", "about-right", "too-hard"];

type RatingBand = "all" | "low" | "middle" | "high";
type Period = "all" | "7" | "30" | "90";
type SortKey = "newest" | "oldest" | "lowest-rated" | "highest-rated";
type CardScope = "all" | "numbered" | "whole-deck";

const RATING_BANDS: { value: RatingBand; label: string }[] = [
  { value: "all", label: "Any rating" },
  { value: "low", label: "0–3" },
  { value: "middle", label: "4–6" },
  { value: "high", label: "7–10" },
];

const PERIODS: { value: Period; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "90", label: "Last 90 days" },
  { value: "30", label: "Last 30 days" },
  { value: "7", label: "Last 7 days" },
];

const SORTS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "lowest-rated", label: "Lowest rated" },
  { value: "highest-rated", label: "Highest rated" },
];

const CARD_SCOPES: { value: CardScope; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "numbered", label: "A specific card" },
  { value: "whole-deck", label: "About the deck" },
];

function inBand(rating: number, band: RatingBand): boolean {
  switch (band) {
    case "low":
      return rating <= 3;
    case "middle":
      return rating >= 4 && rating <= 6;
    case "high":
      return rating >= 7;
    default:
      return true;
  }
}

function writtenText(review: ReviewRow): string {
  return [review.whatWorked, review.whatDidNot, review.suggestion ?? ""]
    .join(" ")
    .toLowerCase();
}

function hasWords(review: ReviewRow): boolean {
  return writtenText(review).trim().length > 0;
}

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function formatMean(value: number | null): string {
  return value === null ? "—" : value.toFixed(1);
}

/** A group of mutually exclusive filter pills. */
function FilterRow<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-text">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                selected
                  ? "border-primary bg-primary-soft font-medium text-primary"
                  : "border-border bg-surface text-text-muted hover:border-border-strong",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** One row of the per-card breakdown. */
interface CardSummary {
  key: string;
  label: string;
  cardNumber: number | null;
  count: number;
  averageRating: number | null;
  tooEasy: number;
  aboutRight: number;
  tooHard: number;
}

function summariseByCard(reviews: ReviewRow[]): CardSummary[] {
  const groups = new Map<string, ReviewRow[]>();
  for (const review of reviews) {
    const key = review.cardNumber === null ? "deck" : String(review.cardNumber);
    const existing = groups.get(key);
    if (existing) existing.push(review);
    else groups.set(key, [review]);
  }

  return [...groups.entries()]
    .map(([key, group]) => ({
      key,
      label: key === "deck" ? "About the deck" : `Card ${key}`,
      cardNumber: key === "deck" ? null : Number(key),
      count: group.length,
      averageRating: mean(group.map((review) => review.rating)),
      tooEasy: group.filter((review) => review.difficulty === "too-easy").length,
      aboutRight: group.filter((review) => review.difficulty === "about-right").length,
      tooHard: group.filter((review) => review.difficulty === "too-hard").length,
    }))
    .sort((a, b) => {
      // Unnumbered deck-wide feedback last; otherwise by card number, so the
      // table reads like the deck itself rather than like a leaderboard.
      if (a.cardNumber === null) return 1;
      if (b.cardNumber === null) return -1;
      return a.cardNumber - b.cardNumber;
    });
}

/** RFC 4180 quoting: wrap everything, double any embedded quote. */
function csvCell(value: string | number | null): string {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function toCsv(reviews: ReviewRow[]): string {
  const header = [
    "submitted_at",
    "card_number",
    "rating",
    "difficulty",
    "what_worked",
    "what_did_not",
    "suggestion",
  ];
  const rows = reviews.map((review) =>
    [
      review.submittedAt,
      review.cardNumber,
      review.rating,
      review.difficulty,
      review.whatWorked,
      review.whatDidNot,
      review.suggestion,
    ]
      .map(csvCell)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

function ratingTone(rating: number): "accent" | "caution" | "success" {
  if (rating <= 3) return "accent";
  if (rating <= 6) return "caution";
  return "success";
}

export function ReviewsBrowser({ reviews }: { reviews: ReviewRow[] }) {
  const [cardScope, setCardScope] = useState<CardScope>("all");
  const [cardNumber, setCardNumber] = useState("");
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [band, setBand] = useState<RatingBand>("all");
  const [period, setPeriod] = useState<Period>("all");
  const [withWordsOnly, setWithWordsOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    const cutoff =
      period === "all" ? null : Date.now() - Number(period) * 24 * 60 * 60 * 1000;
    const wantedCard = cardNumber.trim() === "" ? null : Number(cardNumber.trim());
    const needle = search.trim().toLowerCase();

    const matches = reviews.filter((review) => {
      if (cardScope === "numbered" && review.cardNumber === null) return false;
      if (cardScope === "whole-deck" && review.cardNumber !== null) return false;
      if (wantedCard !== null && review.cardNumber !== wantedCard) return false;
      if (difficulties.length > 0 && !difficulties.includes(review.difficulty)) {
        return false;
      }
      if (!inBand(review.rating, band)) return false;
      if (cutoff !== null && new Date(review.submittedAt).getTime() < cutoff) {
        return false;
      }
      if (withWordsOnly && !hasWords(review)) return false;
      if (needle && !writtenText(review).includes(needle)) return false;
      return true;
    });

    const ordered = [...matches];
    ordered.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.submittedAt.localeCompare(b.submittedAt);
        case "lowest-rated":
          return a.rating - b.rating || b.submittedAt.localeCompare(a.submittedAt);
        case "highest-rated":
          return b.rating - a.rating || b.submittedAt.localeCompare(a.submittedAt);
        default:
          return b.submittedAt.localeCompare(a.submittedAt);
      }
    });
    return ordered;
  }, [
    reviews,
    cardScope,
    cardNumber,
    difficulties,
    band,
    period,
    withWordsOnly,
    search,
    sort,
  ]);

  const byCard = useMemo(() => summariseByCard(filtered), [filtered]);
  const averageRating = useMemo(
    () => mean(filtered.map((review) => review.rating)),
    [filtered],
  );
  const tooHardShare = useMemo(() => {
    if (filtered.length === 0) return null;
    const tooHard = filtered.filter((review) => review.difficulty === "too-hard");
    return Math.round((tooHard.length / filtered.length) * 100);
  }, [filtered]);

  const filtersActive =
    cardScope !== "all" ||
    cardNumber.trim() !== "" ||
    difficulties.length > 0 ||
    band !== "all" ||
    period !== "all" ||
    withWordsOnly ||
    search.trim() !== "";

  function toggleDifficulty(value: Difficulty) {
    setDifficulties((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value],
    );
  }

  function clearFilters() {
    setCardScope("all");
    setCardNumber("");
    setDifficulties([]);
    setBand("all");
    setPeriod("all");
    setWithWordsOnly(false);
    setSearch("");
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `card-reviews-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (reviews.length === 0) {
    return (
      <EmptyState
        title="No reviews yet"
        description="Reviews sent from the “Review a card” page will appear here as soon as the first one arrives."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Reviews shown"
          value={filtered.length}
          caption={
            filtersActive ? `of ${reviews.length} in total` : "every review received"
          }
        />
        <StatTile
          label="Average rating"
          value={formatMean(averageRating)}
          caption="out of 10"
        />
        <StatTile
          label="Cards covered"
          value={byCard.filter((entry) => entry.cardNumber !== null).length}
          caption="distinct card numbers"
        />
        <StatTile
          label="Called too big a step"
          value={tooHardShare === null ? "—" : `${tooHardShare}%`}
          caption="of the reviews shown"
        />
      </div>

      <Card>
        <CardHeader
          title="Filters"
          description="Narrow the list, then read what people wrote. Everything below also drives the per-card table and the export."
          level={2}
          action={
            filtersActive ? (
              <Button size="sm" variant="quiet" onClick={clearFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />

        <div className="space-y-5">
          <FilterRow
            legend="What the review is about"
            options={CARD_SCOPES}
            value={cardScope}
            onChange={setCardScope}
          />

          <div className="max-w-xs">
            <label
              htmlFor="review-card-number"
              className="mb-2 block text-sm font-medium text-text"
            >
              A single card number
            </label>
            <input
              id="review-card-number"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(event) =>
                setCardNumber(event.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="e.g. 14"
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text placeholder:text-text-subtle hover:border-border-strong"
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-text">
              How big a step it felt
            </legend>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((value) => {
                const selected = difficulties.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleDifficulty(value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      selected
                        ? "border-primary bg-primary-soft font-medium text-primary"
                        : "border-border bg-surface text-text-muted hover:border-border-strong",
                    )}
                  >
                    {FEEDBACK_DIFFICULTY_LABELS[value]}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-sm text-text-subtle">
              Choosing none shows all three.
            </p>
          </fieldset>

          <FilterRow
            legend="Rating"
            options={RATING_BANDS}
            value={band}
            onChange={setBand}
          />

          <FilterRow
            legend="When it was sent"
            options={PERIODS}
            value={period}
            onChange={setPeriod}
          />

          <div>
            <label
              htmlFor="review-search"
              className="mb-2 block text-sm font-medium text-text"
            >
              Search what people wrote
            </label>
            <input
              id="review-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="a word or phrase"
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text placeholder:text-text-subtle hover:border-border-strong"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={withWordsOnly}
              onChange={(event) => setWithWordsOnly(event.target.checked)}
              className="h-4 w-4 shrink-0 accent-[var(--primary)]"
            />
            <span className="text-text">Only reviews with something written</span>
          </label>

          <FilterRow legend="Order" options={SORTS} value={sort} onChange={setSort} />
        </div>
      </Card>

      <Card>
        <CardHeader
          title="By card"
          description="Ratings averaged across the reviews currently shown. A card with two reviews is not yet a pattern — read the words before changing anything."
          level={2}
          action={
            <Button size="sm" variant="secondary" onClick={downloadCsv}>
              Export CSV
            </Button>
          }
        />
        {byCard.length === 0 ? (
          <p className="text-text-muted">Nothing matches those filters.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">
                Card reviews grouped by card, with average rating and how big a step
                each felt
              </caption>
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th scope="col" className="py-2 pr-3 font-medium">
                    Card
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    Reviews
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    Average
                  </th>
                  <th scope="col" className="py-2 font-medium">
                    Too easy / right / too hard
                  </th>
                </tr>
              </thead>
              <tbody>
                {byCard.map((entry) => (
                  <tr key={entry.key} className="border-b border-border last:border-0">
                    <th scope="row" className="py-2.5 pr-3 font-medium text-text">
                      {entry.label}
                    </th>
                    <td className="py-2.5 pr-3 tabular-nums text-text-muted">
                      {entry.count}
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums text-text">
                      {formatMean(entry.averageRating)}
                    </td>
                    <td className="py-2.5 tabular-nums text-text-muted">
                      {entry.tooEasy} / {entry.aboutRight} / {entry.tooHard}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader
          title="Every review shown"
          description={`${filtered.length} ${filtered.length === 1 ? "review" : "reviews"}, in the order chosen above.`}
          level={2}
        />
        {filtered.length === 0 ? (
          <p className="text-text-muted">Nothing matches those filters.</p>
        ) : (
          <ul className="space-y-3">
            {filtered.map((review) => (
              <li
                key={review.id}
                className="rounded-xl border border-border bg-surface-sunken p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {review.cardNumber === null ? (
                    <Pill>Whole deck</Pill>
                  ) : (
                    <Pill tone="primary">{formatCardNumber(review.cardNumber)}</Pill>
                  )}
                  <Pill tone={ratingTone(review.rating)}>{review.rating}/10</Pill>
                  <Pill>{FEEDBACK_DIFFICULTY_LABELS[review.difficulty]}</Pill>
                  <span className="ml-auto text-sm text-text-subtle">
                    {formatDate(review.submittedAt)}
                  </span>
                </div>

                {review.whatWorked ? (
                  <p className="mt-3 text-sm leading-relaxed text-text">
                    <span className="font-medium">Worked: </span>
                    {review.whatWorked}
                  </p>
                ) : null}
                {review.whatDidNot ? (
                  <p className="mt-2 text-sm leading-relaxed text-text">
                    <span className="font-medium">Did not: </span>
                    {review.whatDidNot}
                  </p>
                ) : null}
                {review.suggestion ? (
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    <span className="font-medium">Would change: </span>
                    {review.suggestion}
                  </p>
                ) : null}
                {!hasWords(review) ? (
                  <p className="mt-3 text-sm text-text-subtle">
                    Ratings only — nothing written.
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
