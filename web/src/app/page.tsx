"use client";

import Link from "next/link";
import { useData } from "@/components/providers/DataProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { Private } from "@/components/a11y/Private";
import { CardLengthPicker } from "@/components/activity/CardLengthPicker";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Disclosure } from "@/components/ui/Disclosure";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";
import { formatDate, formatRelative, isFutureOrToday, parseDateKey } from "@/lib/date";
import { completedActivities, fearedOutcomeSummary, weeklyStreak } from "@/lib/stats";
import { CHECK_IN_METRICS } from "@/lib/types";

export default function DashboardPage() {
  const { data, ready } = useData();
  const { settings } = useSettings();

  const completed = completedActivities(data.activities);
  const outcomes = fearedOutcomeSummary(data.activities);
  const streak = weeklyStreak(data.activities);

  // An activity that was started but never reflected on is the single most
  // useful thing to surface — the reflection is where the learning happens.
  const awaitingReflection = data.activities.find(
    (activity) => activity.status === "awaiting-reflection",
  );

  const upcoming = data.sessions
    .filter((session) => isFutureOrToday(session.date) && !session.fulfilledByActivityId)
    .slice(0, 3);

  const recentCheckIns = data.checkIns.slice(0, 3);
  const isNew = ready && data.activities.length === 0 && data.checkIns.length === 0;

  return (
    <>
      <PageHeader
        title={settings.displayName ? `Hello, ${settings.displayName}` : "Welcome"}
        description={
          isNew
            ? "This is the companion to your Deal the Day deck. Nothing here needs to be done perfectly, or in order."
            : "Here is where things stand. Take what is useful and leave the rest."
        }
      />

      <section className="mb-7 rounded-card border border-info-border bg-info-soft p-5 sm:p-7" aria-labelledby="settings-guidance">
        <div className="flex items-start gap-4">
          <span className="rounded-xl bg-surface p-2.5 text-info shadow-sm">
            <Icon name="settings" size={24} />
          </span>
          <div className="min-w-0">
            <h2 id="settings-guidance" className="text-xl font-semibold text-text sm:text-2xl">
              Make the site comfortable for you
            </h2>
            <p className="mt-2 max-w-[var(--reading-measure)] text-base leading-relaxed text-text sm:text-lg">
              In Settings, you can customize the font, text size, color scheme,
              contrast, motion, and read-aloud preferences at any time.
            </p>
            <ButtonLink href="/settings" variant="secondary" size="lg" className="mt-4">
              Open Settings
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <Introduction defaultOpen={isNew} />

      <CardLengthPicker />

      {awaitingReflection ? (
        <Card className="mb-6 border-primary-border bg-primary-soft">
          {/* The card title is whatever the family wrote down. */}
          <Private>
            <CardHeader
              title="You have an activity in progress"
              description={`"${awaitingReflection.pre.cardTitle}" — drawn ${formatRelative(
                awaitingReflection.createdAt,
              )}.`}
            />
          </Private>
          <p className="mb-4 text-sm text-text">
            When you are ready, look back at what actually happened. There is no rush,
            and there is no wrong answer.
          </p>
          <ButtonLink href={`/activity/${awaitingReflection.id}/reflect`}>
            Reflect on it
            <Icon name="arrow-right" size={18} />
          </ButtonLink>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader
            title="Today's activity"
            description="Draw a card from the deck, then work through it here."
          />
          <ButtonLink href="/activity/new" size="lg">
            Start today&rsquo;s card
            <Icon name="arrow-right" size={18} />
          </ButtonLink>
        </Card>
      )}

      {!isNew ? (
        <section className="mb-6" aria-labelledby="progress-summary">
          <h2 id="progress-summary" className="mb-3 text-lg font-semibold text-text">
            Where you are
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatTile label="Activities completed" value={completed.length} />
            <StatTile
              label="Feared outcome did not happen"
              value={outcomes.didNotHappen}
              caption={
                outcomes.total > 0 ? `out of ${outcomes.total} recorded` : undefined
              }
            />
            {settings.gentleMode ? (
              <StatTile label="Check-ins" value={data.checkIns.length} />
            ) : (
              <StatTile
                label="Weeks in a row"
                value={streak}
                caption="Weeks with at least one card"
              />
            )}
          </div>
          <p className="mt-3 text-sm text-text-subtle">
            <Link href="/progress" className="underline hover:text-text">
              See the fuller picture
            </Link>
          </p>
        </section>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <Card as="section">
          <CardHeader
            title="Coming up"
            action={
              <Link href="/calendar" className="text-sm text-primary underline">
                Calendar
              </Link>
            }
          />
          {upcoming.length > 0 ? (
            <ul data-private className="space-y-3">
              {upcoming.map((session) => (
                <li key={session.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text">{session.title}</p>
                    <p className="text-sm text-text-muted">
                      {formatDate(parseDateKey(session.date), "long")}
                      {session.time ? ` · ${session.time}` : ""}
                    </p>
                  </div>
                  {session.reminderEnabled ? <Pill tone="info">Reminder</Pill> : null}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Nothing scheduled"
              description="Some families like a set day. Others prefer to draw a card when the mood strikes — both work."
            />
          )}
        </Card>

        <Card as="section">
          <CardHeader
            title="Recent check-ins"
            action={
              <Link href="/check-in" className="text-sm text-primary underline">
                Check in
              </Link>
            }
          />
          {recentCheckIns.length > 0 ? (
            <ul data-private className="space-y-3.5">
              {recentCheckIns.map((checkIn) => (
                <li key={checkIn.id}>
                  <p className="text-sm text-text-muted">
                    {formatRelative(checkIn.recordedAt)}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {CHECK_IN_METRICS.slice(0, 3).map((metric) => (
                      <li key={metric.key}>
                        <Pill>
                          {metric.label} {checkIn.ratings[metric.key]}
                        </Pill>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No check-ins yet"
              description="A check-in takes about a minute and gives the trends something to draw from."
            />
          )}
        </Card>
      </div>

    </>
  );
}

function Introduction({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <Card className="mb-6">
      <CardHeader title="What Deal the Day is" icon="book" />
      <Disclosure summary="Read the game and website introduction" defaultOpen={defaultOpen}>
        <div className="max-w-[var(--reading-measure)] space-y-3 text-text">
          <p>
            Deal the Day is a game for families with parents who plan compulsively.
            Someone draws a card with an activity, maybe a restaurant, an attraction, a
            small trip, or even everyday errands. The goal is for a person without
            OCD/OCPD-like symptoms to plan the activity and for the parent to manage
            uncertainty.
          </p>
          <p>
            This website works alongside the game by providing extra assistance,
            including how to talk to kids about OCD/OCPD, an online log for each of the
            cards with check-ins built in before the activity, check-ins after an
            activity, a journal, a calendar, and other forms of support.
          </p>
        </div>
      </Disclosure>
      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink href="/learn" variant="secondary">
          Learn the ideas behind it
        </ButtonLink>
        <ButtonLink href="/guide" variant="secondary">
          Talking with your kids
        </ButtonLink>
      </div>
    </Card>
  );
}
