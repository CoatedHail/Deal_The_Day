import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Schedule Deal the Day sessions, set reminders and track weekly streaks.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="Calendar"
        description="Pick a day, or several. Scheduling is optional — plenty of families just draw a card when the moment arrives."
      />

      <PagePlaceholder
        summary="Scheduling is not built yet. Sessions already exist in the data model, including an optional time and a reminder flag."
        planned={[
          "Schedule a session on a date, with an optional time",
          "Turn a scheduled session into an actual activity",
          "Reminder toggle per session",
          "Weekly streak, counted by week rather than by day",
          "Google Calendar and Apple Calendar sync, mocked until credentials exist",
          "An .ics download as the no-credentials fallback",
        ]}
      />

      <Callout tone="info" title="A deliberate design choice" className="mt-5">
        Times are optional. Pinning an exact minute tends to invite exactly the kind of
        planning ritual the game is trying to loosen, so the app never asks for one.
      </Callout>
    </>
  );
}
