import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { CHECK_IN_METRICS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Check in",
  description:
    "A one-minute emotional check-in across mood, anxiety, urges and willingness to sit with uncertainty.",
};

export default function CheckInPage() {
  return (
    <>
      <PageHeader
        title="How are you doing?"
        description="Takes about a minute. There is no right answer and no streak to protect — skip a day whenever you like."
      />

      <PagePlaceholder
        summary="The check-in form is not built yet. All seven dimensions are defined in the data model and the rating component is built."
        planned={[
          ...CHECK_IN_METRICS.map((metric) => `${metric.label} — ${metric.help}`),
          "An optional free-text note",
          "A history list of previous check-ins",
        ]}
      />
    </>
  );
}
