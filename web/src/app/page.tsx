"use client";

import Link from "next/link";
import { useData } from "@/components/providers/DataProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
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

      {isNew ? <Introduction /> : null}

      {awaitingReflection ? (
        <Card className="mb-6 border-primary-border bg-primary-soft">
          <CardHeader
            title="You have an activity in progress"
            description={`"${awaitingReflection.pre.cardTitle}" — drawn ${formatRelative(
              awaitingReflection.createdAt,
            )}.`}
          />
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
            <ul className="space-y-3">
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
            <ul className="space-y-3.5">
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

      <Callout tone="erp" title="A reminder" className="mt-6">
        The goal is not to feel calm before you start. It is to go ahead while the
        feeling is still there, and let your family see you do it.
      </Callout>
    </>
  );
}

function Introduction() {
  return (
    <Card className="mb-6">
      <CardHeader
        title="What this is"
        description="A short orientation — you only need to read it once."
      />
      <div className="max-w-[var(--reading-measure)] space-y-3 text-text">
        <p>
          Deal the Day is a card game your family plays together. Someone draws a card
          with an activity on it — pick a restaurant, visit a park, take a small trip —
          and then you do it, without the research, the backup plans, or the round of
          &ldquo;are you sure this is okay?&rdquo;
        </p>
        <p>
          This site is the part that happens around the game. Before you go, you write
          down what you expect to happen and what you are most worried about.
          Afterwards, you write down what actually happened. Over time, those two
          columns start to disagree with each other in a useful way.
        </p>
        <p>
          That is the whole mechanism. Not thinking your way out of anxiety, but
          collecting evidence that you can handle not knowing.
        </p>
      </div>
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
