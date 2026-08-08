# Progress — page specification

Status: built. `/progress` renders `ProgressBoard`; the stats it needs live in
`src/lib/stats.ts`.

## What this page is for

To show a family how their behaviour and feelings have changed **as they play
the game**, and to keep the run of cards they have played in one readable place.

That second word matters. Progress here is measured in cards played, not in days
elapsed. A family plays irregularly — three cards one week, nothing for a month —
so anything plotted against a calendar axis reports the gaps instead of the
change. Everything sequence-based on this page is indexed by card ordinal: 1st
card, 2nd card, 3rd. This is also the conventional way exposure work is charted.

## What this page is not

- **Not the record.** `/activity` is where you open a single entry and read
  everything it holds. This page never tries to replace that, and every card
  listed here links into it.
- **Not a dashboard.** The journal was folded into `/activity` because two views
  of one dataset meant choosing which to open before you could look anything up.
  A third view would repeat that mistake. This page earns its place by making an
  argument the record cannot make on its own.
- **Not a score.** Nothing here is a target. No goals, no completion percentages,
  nothing that improves by being driven upward.

## Structure

Ranked, not laid out flat. Built as three sections and then reorganised: laid
out in full it was a wall nobody would read to the bottom of, which makes even
the good parts useless.

What survives open is the argument — the ledger sentence, the share bar, and the
fears quoted back. Everything else is a closed dropdown.

**The rule that makes this work: a dropdown's summary line states its finding,
not its topic.** "Anxiety" tells a reader nothing and forces them to open it to
find out. "Anxiety was lower afterwards on 7 of 7 cards" means the closed page
already told them, and they open it only if they want the working. Read top to
bottom without opening anything, the page is about fifteen seconds long.

Order of the collapsed sections, most to least important:

1. Card length — movement along the difficulty ladder
2. Anxiety before against after
3. Compulsions sat with against anticipated
4. Check-in trends
5. Opt-outs by nature of concern
6. Categories covered
7. Every card played, linking into `/activity`

The three sections below describe what goes in them.

### 1. The run

The cards played, most recent first, one line each: card number, length,
what was predicted, whether it happened. Compact enough to take in at a glance —
the whole run on one screen is the thing you cannot get anywhere else today.

Above it, the ledger, written as a sentence rather than a statistic:

> You have drawn 14 cards. Before each one you named what you were afraid of.
> It happened twice.

With `OrdinalShareBar` beneath it showing did-not-happen / partly / happened.

Then the disconfirmed fears, quoted in the family's own words with dates:

> *"He'll melt down in the restaurant and we'll have to leave."*
> — 12 March, didn't happen

This is the most important thing on the page and should be built first. It is
not a chart; it is the family's own predictions handed back to them next to what
actually occurred, which is the mechanism by which exposure changes belief.
Chronological order buries these among everything else. Here they are the point.

### 2. How your feelings have changed

- Anxiety before against after, one row per card, via `Dumbbell`.
- Check-in metrics across the run via `TrendChart`. Default to **willingness to
  sit with not knowing** rather than anxiety. Leading with falling anxiety
  quietly teaches that anxiety is the problem to be eliminated, which is the
  opposite of what the game is for. The other metrics stay available behind a
  selector.

Check-ins carrying a `linkedActivityId` can be placed on the card axis. Standalone
check-ins have no card to attach to and keep a date axis; label the two clearly
so they are not read as one series.

### 3. How your behaviour has changed

Underweighted in earlier drafts, and probably the centrepiece. Feelings at this
sample size are noisy; behaviour is countable and the changes are real.

- **Card length as a difficulty ladder.** `cardLength` is already short / medium
  / long. "Your first five cards were short. Four of your last six have been
  medium." Concrete, and nobody had to rate anything to produce it.
- **Compulsions resisted against performed**, across the run rather than as a
  lifetime total.
- **Opt-outs by nature of concern.** A mix shifting from `anxiety-driven` toward
  `practical-safety` is arguably the best single signal in the dataset: it means
  someone is learning to tell the two apart. Never present opt-outs as failures.
- **Categories attempted.** Breadth as its own kind of movement. Frame as where
  you have been, never as gaps to fill, or it becomes a completion checklist.

## Data

Already in `src/lib/stats.ts`:

| Function | Used by |
|---|---|
| `completedActivities` | all sections |
| `fearedOutcomeSummary` | the ledger |
| `anxietyShift` | section 2 summary line |
| `compulsionResistance` | section 3 |
| `metricTrends` | section 2 |

New, all pure functions over `AppData`:

| Function | Returns | Notes |
|---|---|---|
| `cardRun(activities)` | completed and opted-out entries in play order with an ordinal | the foundation every sequence-based figure indexes on |
| `disconfirmedFears(activities, limit)` | `biggestFear` plus date where `fearedOutcome === "did-not-happen"` | section 1 |
| `anxietyByOrdinal(activities)` | `DumbbellRow[]` labelled by card ordinal | feeds `Dumbbell` unchanged |
| `cardLengthProgression(activities)` | length per ordinal, plus first-half against second-half distribution | section 3 |
| `optOutBreakdown(activities)` | counts by `natureOfConcern`, split earlier against recent | section 3 |
| `compulsionTally(activities)` | most frequent compulsions, tempted against resisted | free text from `TagInput`; normalise by trimming, lowercasing and collapsing whitespace before counting |
| `categoryCoverage(activities)` | count per `ActivityCategory` | section 3 |

No schema changes. Every field this page needs already exists on
`ActivityEntry`, `CheckIn` and `OptOutRecord`.

## Thresholds

The page changes shape as data accumulates. At three cards there is no trend,
and drawing a two-point line implies a finding that is not there — which matters
most early, when a family is deciding whether any of this is worth continuing.

- **Section 1** renders from the first card.
- **Sections 2 and 3** need at least **4 completed cards** before showing any
  change. `metricTrends` already uses 4 as its floor for computing change; reuse
  it rather than inventing a second threshold.
- Below the threshold, a section says what it is collecting and why, and shows
  no chart. It does not apologise and it does not show an empty axis.
- The disconfirmed-fears block needs at least one qualifying entry; with none, it
  is absent rather than empty.

## Gentle mode

`settings.gentleMode` hides streaks, counts and badges. This page has to still
work with it on, which is a large part of why it is built out of sentences and
quotations rather than tiles.

With gentle mode on:

- Counts become qualitative. "More often than not, the thing you feared did not
  arrive" rather than "12 of 14". Every dropdown summary has a gentle variant.
- No badges, no streak, no numeric stat tiles, and no share bar.
- Quotations, the run, and the before/after chart all stay. They are
  observations, not scores.
- The screen-reader summary at the top follows the same rule. Someone who turned
  the counts off meant it however they read the page.

## Accessibility

- The charts already carry `role="img"` with real aria labels. A page of eight
  such labels is still rough to listen through, so the page also needs a single
  text summary near the top that states the same conclusions in prose.
- Quoted fears and insights are real `<blockquote>` elements with attribution.
- The page must be usable under `ReadAloud`; check the reading order puts each
  section's prose summary before its chart.

## Open questions

1. **The tab's name.** "Progress" is the word that turns a page into a
   scoreboard. "Look back" describes what it is for. Keep the `/progress` route
   either way so existing links survive.
2. **Export.** A print or export view for handing to a therapist is a natural
   fit here. Note that `README.md` still refers to a `/therapist` route that was
   removed in `cba4eed`; that reference needs correcting regardless.
3. **Badges.** `badges()` exists in `stats.ts` and nothing renders it. Decide
   deliberately whether this page is its home or whether it stays unused —
   leaving it half-wired is the worst of the three options.
