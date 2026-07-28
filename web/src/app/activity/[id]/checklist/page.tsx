import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChecklistExecution } from "./ChecklistExecution";

export const metadata: Metadata = {
  title: "Checklist",
  description: "The checklist written in advance for this kind of activity.",
};

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        eyebrow="Written in advance"
        title="The checklist"
        description="Someone wrote this before today, so it can be followed now without anyone needing to check in."
      />
      <ChecklistExecution activityId={id} />
    </>
  );
}
