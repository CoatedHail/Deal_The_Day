import type { Metadata } from "next";
import { Private } from "@/components/a11y/Private";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActivityDetail } from "./ActivityDetail";

export const metadata: Metadata = {
  title: "Activity",
  description: "A single Deal the Day activity, before and after.",
};

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="Activity"
        description="What you expected, what happened, and what you took from it."
      />
      <Private>
        <ActivityDetail activityId={id} />
      </Private>
    </>
  );
}
