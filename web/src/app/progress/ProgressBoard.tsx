"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "@/components/charts/Dumbbell";
import { OrdinalShareBar, type ShareSegment } from "@/components/charts/OrdinalShareBar";
import { TrendChart } from "@/components/charts/TrendChart";
import { useData } from "@/components/providers/DataProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardHeader } from "@/components/ui/Card";
import { Disclosure } from "@/components/ui/Disclosure";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pill } from "@/components/ui/Pill";
import { CONCERN_OPTIONS } from "@/content/activity-flow";
import { CARD_LENGTH_BY_ID } from "@/lib/card-lengths";
import { formatCardReference } from "@/lib/cards";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/date";
import {
  anxietyByOrdinal,
  cardLengthProgression,
  cardRun,
  categoryCoverage,
  CHANGE_MIN_CARDS,
  compulsionResistance,
  compulsionTally,
  disconfirmedFears,
  fearedOutcomeSummary,
  metricTrends,
  optOutBreakdown,
  type AnxietyRow,
  type ConcernNature,
  type LengthCounts,
  type MetricTrend,
} from "@/lib/stats";
import {
  ACTIVITY_CATEGORY_LABELS,
  CardLength,
  CHECK_IN_METRICS,
  CheckInMetricKey,
  FEARED_OUTCOME_LABELS,
} from "@/lib/types";

/**
 * The look-back page.
 *
 * Ranked rather than laid out flat. Only the argument stays open — what you
 * expected to happen, and how often it did not. Everything else is a closed
 * dropdown whose summary line carries its own finding, so the page can be read
 * top to bottom in about fifteen seconds and opened only where a family
 * actually wants the detail. A stack of charts nobody scrolls to is worse than
 * a sentence they read.
 *
 * Everything sequence-based is indexed by card ordinal rather than by date.
 * Families play irregularly, and a calendar axis reports the gaps instead of
 * the change.
 *
 * This is deliberately not a second copy of /activity. That page is the record,
 * where you open one entry and read everything it holds. This page re-sorts the
 * same material to make one point.
 */

const CONCERN_LABELS = Object.fromEntries(
  CONCERN_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ConcernNature, string>;

/** Ordinal color steps, reused for card length — short → long is an order. */
const LENGTH_TOKENS: Record<CardLength, string> = {
  short: "--chart-ord-1",
  medium: "--chart-ord-2",
  long: "--chart-ord-3",
};

const WILLINGNESS: CheckInMetricKey = "willingnessToTolerateUncertainty";

export function ProgressBoard() {
  const { data, ready } = useData();
  const { settings } = useSettings();
  const gentle = settings.gentleMode;

  const run = useMemo(() => cardRun(data.activities), [data.activities]);
  const outcomes = useMemo(() => fearedOutcomeSummary(data.activities), [data.activities]);
  const fears = useMemo(() => disconfirmedFears(data.activities), [data.activities]);
  const anxietyRows = useMemo(() => anxietyByOrdinal(data.activities), [data.activities]);
  const lengths = useMemo(() => cardLengthProgression(data.activities), [data.activities]);
  const tally = useMemo(() => compulsionTally(data.activities), [data.activities]);
  const resistance = useMemo(
    () => compulsionResistance(data.activities),
    [data.activities],
  );
  const optOuts = useMemo(() => optOutBreakdown(data.activities), [data.activities]);
  const categories = useMemo(() => categoryCoverage(data.activities), [data.activities]);
  const trends = useMemo(() => metricTrends(data.checkIns), [data.checkIns]);

  // Willingness rather than anxiety, deliberately. Leading with falling anxiety
  // teaches that anxiety is the problem to be eliminated, which is the opposite
  // of what the game is for.
  const [metric, setMetric] = useState<CheckInMetricKey>(WILLINGNESS);

  if (!ready) return null;

  if (run.length === 0) {
    return (
      <EmptyState
        title="Nothing to look back on yet"
        description="Once you have played a card or two, this page will show what you expected to happen next to what actually did."
        action={<ButtonLink href="/activity/new">Start a card</ButtonLink>}
      />
    );
  }

  const enough = run.length >= CHANGE_MIN_CARDS;
  const activeTrend = trends.find((trend) => trend.key === metric);
  const willingness = trends.find((trend) => trend.key === WILLINGNESS);

  return (
    <div className="space-y-5">
      <p className="sr-only">{summarise(run.length, outcomes, gentle)}</p>

      {/* ── The argument. The only thing that is open by default. ──────── */}
      <Card>
        <h2 className="sr-only">What you expected, and what happened</h2>
        <p data-speak className="text-lg leading-relaxed text-text sm:text-xl">
          {ledger(outcomes, gentle)}
        </p>

        {gentle ? null : (
          <OrdinalShareBar className="mt-5" segments={outcomeSegments(outcomes)} />
        )}
      </Card>

      {fears.length > 0 ? (
        <Card>
          <CardHeader
            title="What you were afraid of"
            description="Your own words, from before you started."
            icon="sparkle"
          />
          <ul className="space-y-4">
            {fears.map((fear) => (
              <li key={fear.id}>
                <blockquote className="border-l-2 border-primary-border pl-4">
                  <p className="italic leading-relaxed text-text">
                    &ldquo;{fear.fear}&rdquo;
                  </p>
                  <footer className="mt-1.5 text-sm text-text-muted">
                    {formatDate(fear.at)} &mdash; it did not happen
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* ── Everything else, ranked, closed, each labelled with its own
             finding so the closed page still reads as a summary. ───────── */}
      <div className="space-y-2.5">
        <h2 className="pt-2 text-sm font-semibold uppercase tracking-wide text-text-subtle">
          More detail, if you want it
        </h2>

        {!enough ? (
          <Card className="border-dashed bg-surface-sunken">
            <p className="text-text">
              There is not enough here yet to say anything honest about change.
            </p>
            <p className="mt-1.5 text-sm text-text-muted">
              After {CHANGE_MIN_CARDS - run.length}{" "}
              {CHANGE_MIN_CARDS - run.length === 1 ? "more card" : "more cards"}, this
              page will also show how your feelings and your choices have shifted across
              the run.
            </p>
          </Card>
        ) : (
          <>
            {lengths.run.length > 0 ? (
              <Disclosure
                icon="cards"
                summary={lengthSentence(lengths.earlier, lengths.recent, lengths.comparable)}
              >
                <p className="mb-3 text-sm">
                  Short, medium and long are ordered by how much not-knowing a card asks
                  of you. Each square is one card, in the order you played them.
                </p>
                <ul
                  className="flex flex-wrap gap-1"
                  role="img"
                  aria-label={lengths.run
                    .map((entry) => `Card ${entry.ordinal}: ${entry.length}`)
                    .join("; ")}
                >
                  {lengths.run.map((entry) => (
                    <li
                      key={entry.ordinal}
                      title={`Card ${entry.ordinal}: ${CARD_LENGTH_BY_ID[entry.length].label}`}
                      className="h-7 w-7 rounded-md"
                      style={{ backgroundColor: `var(${LENGTH_TOKENS[entry.length]})` }}
                    />
                  ))}
                </ul>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {(["short", "medium", "long"] as CardLength[]).map((length) => (
                    <li key={length} className="flex items-center gap-2 text-sm">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: `var(${LENGTH_TOKENS[length]})` }}
                      />
                      <span>{CARD_LENGTH_BY_ID[length].label}</span>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            ) : null}

            {anxietyRows.length > 0 ? (
              <Disclosure icon="pulse" summary={anxietyFinding(anxietyRows, gentle)}>
                <p className="mb-4 text-sm">
                  One row per card, in the order you played them. Gaps are cards you
                  stepped back from.
                </p>
                <Dumbbell rows={anxietyRows} />
              </Disclosure>
            ) : null}

            {resistance.anticipated > 0 ? (
              <Disclosure icon="balance" summary={compulsionFinding(resistance, gentle)}>
                <p className="mb-3 text-sm">
                  What you expected to feel dragged toward, and how often you sat with it
                  instead.
                </p>
                <ul className="space-y-2.5">
                  {tally.map((entry) => (
                    <li
                      key={entry.label}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="min-w-0 truncate text-text">{entry.label}</span>
                      <span className="shrink-0">
                        {gentle
                          ? entry.resisted > 0
                            ? "sat with it"
                            : "came up"
                          : `resisted ${entry.resisted} of ${entry.tempted}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            ) : null}

            {data.checkIns.length > 0 ? (
              <Disclosure icon="chart" summary={willingnessFinding(willingness)}>
                <p className="mb-3 text-sm">
                  Pick a dimension. Each one is its own panel rather than seven lines
                  sharing an axis.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {CHECK_IN_METRICS.map((definition) => {
                    const active = definition.key === metric;
                    return (
                      <button
                        key={definition.key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setMetric(definition.key)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                          active
                            ? "border-primary bg-primary-soft text-primary"
                            : "border-border bg-surface text-text-muted hover:border-border-strong hover:text-text",
                        )}
                      >
                        {definition.label}
                      </button>
                    );
                  })}
                </div>

                {/* The chart keeps a fixed 320-unit viewBox and a fixed height, so
                    at full width it letterboxes and drifts into the middle of a lot
                    of empty space. Capping the width keeps it looking placed. */}
                {activeTrend ? (
                  <div className="max-w-md">
                    <TrendChart points={activeTrend.points} label={activeTrend.label} />
                  </div>
                ) : null}
              </Disclosure>
            ) : null}

            {optOuts.total > 0 ? (
              <Disclosure icon="lifebuoy" summary={optOutFinding(optOuts, gentle)}>
                <p className="mb-3 text-sm">
                  Recorded as information, not as failures. Telling these apart is the
                  skill.
                </p>
                <ul className="space-y-2.5">
                  {(Object.keys(optOuts.counts) as ConcernNature[])
                    .filter((nature) => optOuts.counts[nature] > 0)
                    .map((nature) => (
                      <li
                        key={nature}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <span className="min-w-0 text-text">{CONCERN_LABELS[nature]}</span>
                        {gentle ? null : (
                          <span className="shrink-0 tabular-nums">
                            {optOuts.counts[nature]}
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </Disclosure>
            ) : null}

            {categories.length > 0 ? (
              <Disclosure
                icon="sparkle"
                summary={categoryFinding(categories.length, gentle)}
              >
                <ul className="flex flex-wrap gap-2">
                  {categories.map((entry) => (
                    <li key={entry.category}>
                      <Pill tone="primary">
                        {ACTIVITY_CATEGORY_LABELS[entry.category]}
                        {gentle ? null : (
                          <span className="tabular-nums opacity-70">{entry.count}</span>
                        )}
                      </Pill>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            ) : null}
          </>
        )}

        <Disclosure
          icon="journal"
          summary={`Every card you have played${gentle ? "" : ` — ${run.length} so far`}`}
        >
          <ul className="divide-y divide-border">
            {[...run].reverse().map(({ activity, ordinal }) => {
              const length = activity.pre.cardLength
                ? CARD_LENGTH_BY_ID[activity.pre.cardLength]
                : null;

              return (
                <li key={activity.id}>
                  <Link
                    href={`/activity/${activity.id}`}
                    className="-mx-2 flex items-start gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-bg-subtle"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-7 shrink-0 text-sm font-semibold tabular-nums text-text-subtle"
                    >
                      {ordinal}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-text">
                        {formatCardReference(activity.pre)}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5">
                        {length ? <Pill>{length.label}</Pill> : null}
                        {activity.status === "opted-out" ? (
                          <Pill tone="caution">Stepped back</Pill>
                        ) : activity.post ? (
                          <Pill
                            tone={
                              activity.post.fearedOutcome === "did-not-happen"
                                ? "success"
                                : "neutral"
                            }
                          >
                            {FEARED_OUTCOME_LABELS[activity.post.fearedOutcome]}
                          </Pill>
                        ) : null}
                        <span className="text-xs text-text-subtle">
                          {formatDate(activity.completedAt ?? activity.createdAt)}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4">
            <ButtonLink href="/activity" variant="quiet" size="sm">
              Open the full record
            </ButtonLink>
          </div>
        </Disclosure>
      </div>

      <Callout tone="erp" title="How to read this page">
        None of this is a score, and none of it is a target. Change is usually slower
        and less tidy than any chart suggests. If the numbers are becoming something
        to manage rather than something to notice, gentle mode in settings turns them
        off and leaves the rest.
      </Callout>
    </div>
  );
}

function outcomeSegments(
  outcomes: ReturnType<typeof fearedOutcomeSummary>,
): ShareSegment[] {
  return [
    {
      key: "did-not-happen",
      label: "Did not happen",
      value: outcomes.didNotHappen,
      token: "--chart-ord-1",
    },
    {
      key: "partly",
      label: "Some of it happened",
      value: outcomes.partly,
      token: "--chart-ord-2",
    },
    {
      key: "happened",
      label: "It happened",
      value: outcomes.happened,
      token: "--chart-ord-3",
    },
  ];
}

/**
 * The page's thesis, in one sentence.
 *
 * Built around how often the feared thing did *not* arrive, rather than how
 * often it did. Counting only the "it happened" bucket would let the sentence
 * read "it never happened" while some of it plainly did on other cards, and a
 * page whose whole purpose is testing predictions against reality cannot afford
 * to overstate its own case.
 */
function ledger(outcomes: ReturnType<typeof fearedOutcomeSummary>, gentle: boolean): string {
  if (outcomes.total === 0) {
    return "You have played cards, but none has been reflected on yet — so there is nothing to compare a prediction against.";
  }

  const arrived = outcomes.partly + outcomes.happened;

  if (gentle) {
    if (arrived === 0) return "So far, the thing you were afraid of has not arrived.";
    if (outcomes.didNotHappen === 0) {
      return "So far, some part of what you feared has arrived each time.";
    }
    if (outcomes.didNotHappen > arrived) {
      return "More often than not, the thing you were afraid of did not arrive.";
    }
    return "Sometimes the thing you were afraid of arrived, and sometimes it did not.";
  }

  const opening = `You have finished ${outcomes.total} ${
    outcomes.total === 1 ? "card" : "cards"
  }, naming what you were afraid of before each one.`;

  if (outcomes.didNotHappen === 0) {
    return `${opening} So far some part of what you feared has arrived each time, which is worth having on the record too.`;
  }

  return `${opening} ${timesPhrase(outcomes.didNotHappen)}, it did not happen at all.`;
}

function timesPhrase(count: number): string {
  if (count === 1) return "Once";
  if (count === 2) return "Twice";
  return `${count} times`;
}

/*
 * Summary lines for the collapsed sections.
 *
 * Each one states that section's actual finding rather than naming its topic.
 * "Anxiety" tells a reader nothing and makes them open it to find out; "anxiety
 * was lower afterwards on 6 of 7 cards" means they only open it if they want
 * the working.
 */

function anxietyFinding(rows: AnxietyRow[], gentle: boolean): string {
  const lower = rows.filter((row) => row.after < row.before).length;
  if (lower === 0) return "Anxiety did not come down afterwards";
  if (gentle) {
    return lower === rows.length
      ? "Anxiety was lower afterwards every time"
      : "Anxiety was usually lower afterwards";
  }
  return `Anxiety was lower afterwards on ${lower} of ${rows.length} cards`;
}

function compulsionFinding(
  resistance: ReturnType<typeof compulsionResistance>,
  gentle: boolean,
): string {
  if (gentle) {
    return resistance.resisted === 0
      ? "The pulls you expected, and what you did with them"
      : "You sat with most of the pulls you expected";
  }
  return `You sat with ${resistance.resisted} of the ${resistance.anticipated} pulls you expected`;
}

function willingnessFinding(trend: MetricTrend | undefined): string {
  if (!trend || trend.change === null) return "How your check-ins have moved";
  if (trend.change > 0.5) return "Willingness to sit with not knowing has been rising";
  if (trend.change < -0.5) return "Willingness to sit with not knowing has dipped";
  return "Willingness to sit with not knowing is about where it started";
}

function optOutFinding(
  optOuts: ReturnType<typeof optOutBreakdown>,
  gentle: boolean,
): string {
  const anxietyDriven = optOuts.counts["anxiety-driven"];
  if (gentle) {
    return anxietyDriven > 0
      ? "When you stepped back, and what was behind it"
      : "When you stepped back, it was for practical reasons";
  }
  const stepped = `You stepped back ${timesPhrase(optOuts.total).toLowerCase()}`;
  return anxietyDriven > 0
    ? `${stepped} — ${anxietyDriven} of them the anxiety talking`
    : `${stepped}, never because of the anxiety`;
}

function categoryFinding(count: number, gentle: boolean): string {
  if (gentle) return "The kinds of activity your cards have taken you into";
  return count === 1
    ? "Your cards have all been one kind of activity"
    : `Your cards have taken you into ${count} kinds of activity`;
}

function lengthSentence(
  earlier: LengthCounts,
  recent: LengthCounts,
  comparable: boolean,
): string {
  const recentTop = dominant(recent);
  if (!comparable || !recentTop) {
    return recentTop
      ? `Your cards have mostly been ${CARD_LENGTH_BY_ID[recentTop].label.toLowerCase()}`
      : "The cards you take on";
  }

  const earlierTop = dominant(earlier);
  if (!earlierTop || earlierTop === recentTop) {
    return `Your cards have mostly been ${CARD_LENGTH_BY_ID[
      recentTop
    ].label.toLowerCase()}, earlier and lately`;
  }

  return `Your cards have gone from mostly ${CARD_LENGTH_BY_ID[
    earlierTop
  ].label.toLowerCase()} to mostly ${CARD_LENGTH_BY_ID[recentTop].label.toLowerCase()}`;
}

function dominant(counts: LengthCounts): CardLength | null {
  const ranked = (["long", "medium", "short"] as CardLength[])
    .filter((length) => counts[length] > 0)
    .sort((a, b) => counts[b] - counts[a]);
  return ranked[0] ?? null;
}

/**
 * The whole page in one line, for screen readers arriving at the top.
 *
 * Spells out all three buckets rather than the headline claim. Someone who
 * cannot see the share bar underneath should not have to take the summary's
 * word for the shape of it — but gentle mode still applies, because someone who
 * turned the counts off meant it however they read the page.
 */
function summarise(
  cards: number,
  outcomes: ReturnType<typeof fearedOutcomeSummary>,
  gentle: boolean,
): string {
  if (gentle) return ledger(outcomes, true);
  if (outcomes.total === 0) return `${cards} cards played, none reflected on yet.`;
  return `${cards} cards played. Of ${outcomes.total} predictions recorded, what you feared did not happen ${outcomes.didNotHappen} times, partly happened ${outcomes.partly} times, and happened in full ${outcomes.happened} times.`;
}
