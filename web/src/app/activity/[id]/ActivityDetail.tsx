"use client";

import { useRouter } from "next/navigation";
import { useData } from "@/components/providers/DataProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { formatCardReference } from "@/lib/cards";
import { formatDate, formatRelative } from "@/lib/date";
import {
  ACTIVITY_CATEGORY_LABELS,
  ActivityEntry,
  FEARED_OUTCOME_LABELS,
} from "@/lib/types";

function StatusPill({ status }: { status: ActivityEntry["status"] }) {
  if (status === "completed") return <Pill tone="success">Completed</Pill>;
  if (status === "opted-out") return <Pill tone="caution">Safety valve used</Pill>;
  return <Pill tone="info">Awaiting reflection</Pill>;
}

export function ActivityDetail({ activityId }: { activityId: string }) {
  const router = useRouter();
  const { data, ready, deleteActivity, saveInsight } = useData();

  const activity = data.activities.find((entry) => entry.id === activityId);

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
        description="Records live in this browser only, so it may have been made elsewhere or deleted."
        action={<ButtonLink href="/activity">Back to activities</ButtonLink>}
      />
    );
  }

  const { pre, post, optOut } = activity;
  const awaiting = activity.status === "awaiting-reflection";
  const checklist = activity.checklistSnapshot ?? [];

  function handleDelete() {
    deleteActivity(activityId);
    router.push("/activity");
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-text">{formatCardReference(pre)}</h2>
          <StatusPill status={activity.status} />
          {pre.cardCategory ? (
            <Pill>{ACTIVITY_CATEGORY_LABELS[pre.cardCategory]}</Pill>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-text-subtle">
          Drawn {formatRelative(activity.createdAt)} · {formatDate(activity.createdAt, "long")}
        </p>
      </Card>

      {awaiting ? (
        <Callout tone="erp" title="Still open">
          Once you have done the card, come back and record what actually happened.
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href={`/activity/${activityId}/reflect`} size="sm">
              Record what happened
            </ButtonLink>
            <ButtonLink
              href={`/activity/${activityId}/opt-out`}
              size="sm"
              variant="secondary"
            >
              We did not do it
            </ButtonLink>
          </div>
        </Callout>
      ) : null}

      {awaiting && checklist.length > 0 ? (
        <Card>
          <CardHeader
            title="There is a checklist for this category"
            description={`${checklist.length} ${checklist.length === 1 ? "item" : "items"}, written in advance. Hand the phone over rather than reading it out.`}
            level={3}
          />
          <ButtonLink href={`/activity/${activityId}/checklist`} variant="secondary">
            <Icon name="check" size={18} />
            Open the checklist
          </ButtonLink>
        </Card>
      ) : null}

      {/* Completion is shown only once the activity is over. A live view of
          items being ticked off would be the checking compulsion with a
          progress bar. */}
      {!awaiting && checklist.length > 0 ? (
        <Card>
          <CardHeader
            title="The checklist"
            description={
              activity.executedBy
                ? `Followed by ${activity.executedBy}.`
                : "As it stood when the card was drawn."
            }
            level={3}
          />
          <ul className="space-y-2">
            {checklist.map((item) => {
              const done = activity.checklistCompleted?.includes(item.id);
              return (
                <li key={item.id} className="flex items-start gap-3 text-sm">
                  {done ? (
                    <Icon name="check" size={16} className="mt-0.5 text-success" />
                  ) : (
                    // An empty marker rather than a cross: an unticked item is
                    // simply unrecorded, not a failure, and should not be
                    // coloured like one.
                    <span
                      aria-hidden="true"
                      className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-border-strong"
                    />
                  )}
                  <span className={done ? "text-text" : "text-text-muted"}>{item.text}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Beforehand" level={3} />
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-text-muted">You expected</dt>
              <dd className="mt-0.5 leading-relaxed text-text">{pre.predictedOutcome}</dd>
            </div>
            {pre.biggestFear ? (
              <div>
                <dt className="font-medium text-text-muted">Most worried about</dt>
                <dd className="mt-0.5 leading-relaxed text-text">{pre.biggestFear}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-medium text-text-muted">Anxiety</dt>
              <dd className="mt-0.5">
                <Pill tone="primary">{pre.anxiety} / 10</Pill>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-text-muted">Felt able to handle it</dt>
              <dd className="mt-0.5">
                <Pill>{pre.confidence} / 10</Pill>
              </dd>
            </div>
            {pre.notes ? (
              <div>
                <dt className="font-medium text-text-muted">Notes</dt>
                <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-text">
                  {pre.notes}
                </dd>
              </div>
            ) : null}
          </dl>
        </Card>

        <Card>
          <CardHeader title="Afterwards" level={3} />
          {post ? (
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-text-muted">What happened</dt>
                <dd className="mt-0.5 leading-relaxed text-text">{post.whatHappened}</dd>
              </div>
              <div>
                <dt className="font-medium text-text-muted">The thing you feared</dt>
                <dd className="mt-0.5 leading-relaxed text-text">
                  {FEARED_OUTCOME_LABELS[post.fearedOutcome]}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-text-muted">Anxiety</dt>
                <dd className="mt-0.5 flex items-center gap-2">
                  <Pill>{pre.anxiety} / 10</Pill>
                  <Icon name="arrow-right" size={16} className="text-text-subtle" />
                  <Pill tone="primary">{post.anxietyAfter} / 10</Pill>
                </dd>
              </div>
              {post.whatSurprisedYou ? (
                <div>
                  <dt className="font-medium text-text-muted">Surprised you</dt>
                  <dd className="mt-0.5 leading-relaxed text-text">
                    {post.whatSurprisedYou}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : optOut ? (
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-text-muted">Why</dt>
                <dd className="mt-0.5 leading-relaxed text-text">{optOut.reason}</dd>
              </div>
              {optOut.modifiedInstead ? (
                <div>
                  <dt className="font-medium text-text-muted">Done differently</dt>
                  <dd className="mt-0.5 leading-relaxed text-text">
                    {optOut.modificationDescription ?? "Adapted rather than skipped."}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="text-sm text-text-muted">Nothing recorded yet.</p>
          )}
        </Card>
      </div>

      {pre.temptedCompulsions.length > 0 ? (
        <Card>
          <CardHeader
            title="Urges you noted beforehand"
            description={post ? undefined : "You will be asked about these afterwards."}
            level={3}
          />
          <ul className="flex flex-wrap gap-2">
            {pre.temptedCompulsions.map((item) => {
              const resisted = post?.compulsionsResisted.includes(item);
              return (
                <li key={item}>
                  <Pill tone={post ? (resisted ? "success" : "neutral") : "neutral"}>
                    {item}
                    {post ? (resisted ? " · resisted" : " · did it") : null}
                  </Pill>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}

      {post?.whatDidYouLearn ? (
        <Card>
          <CardHeader title="What you took from it" level={3} />
          <p className="leading-relaxed text-text">{post.whatDidYouLearn}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => saveInsight(post.whatDidYouLearn, activityId)}
          >
            <Icon name="sparkle" size={16} />
            Keep this
          </Button>
        </Card>
      ) : null}

      {post?.reflection ? (
        <Card>
          <CardHeader title="Reflection" level={3} />
          <p className="whitespace-pre-wrap leading-relaxed text-text">
            {post.reflection}
          </p>
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        <ButtonLink href="/activity" variant="secondary">
          <Icon name="arrow-left" size={18} />
          All activities
        </ButtonLink>
        <Button variant="danger" onClick={handleDelete}>
          Delete this record
        </Button>
      </div>
    </div>
  );
}
