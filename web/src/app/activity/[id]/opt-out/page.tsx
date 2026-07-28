import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { OPT_OUT_COPY } from "@/content/activity-flow";
import { OptOutForm } from "./OptOutForm";

export const metadata: Metadata = {
  title: "Safety valve",
  description:
    "Skip or adapt a card on purpose, and think through whether the reason is safety or anxiety.",
};

export default async function OptOutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        eyebrow="Safety valve"
        title="Skipping or changing this card"
        description={OPT_OUT_COPY.intro}
      />

      <Callout tone="erp" title="The question worth sitting with" className="mb-5">
        Not &ldquo;is this scary?&rdquo; but &ldquo;is this actually unsafe?&rdquo; Both
        answers are legitimate. Naming which one it is keeps the choice yours rather
        than the anxiety&rsquo;s.
      </Callout>

      <OptOutForm activityId={id} />
    </>
  );
}
