import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { POST_ACTIVITY_COPY } from "@/content/activity-flow";
import { ReflectForm } from "./ReflectForm";

export const metadata: Metadata = {
  title: "Reflect",
  description: "Record what actually happened after a Deal the Day activity.",
};

export default async function ReflectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        eyebrow="Afterwards"
        title="How did it go?"
        description={POST_ACTIVITY_COPY.intro}
      />
      <ReflectForm activityId={id} />
    </>
  );
}
