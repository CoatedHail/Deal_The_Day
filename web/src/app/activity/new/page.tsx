import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PRE_ACTIVITY_COPY } from "@/content/activity-flow";
import { isCardLength } from "@/lib/card-lengths";
import { NewActivityForm } from "./NewActivityForm";

export const metadata: Metadata = {
  title: "Start a card",
  description: "Record what you expect before you begin today's Deal the Day activity.",
};

export default async function NewActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ length?: string | string[] }>;
}) {
  const { length } = await searchParams;
  const requestedLength = Array.isArray(length) ? length[0] : length;
  const initialCardLength = isCardLength(requestedLength) ? requestedLength : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Before you go"
        title="Start a card"
        description={PRE_ACTIVITY_COPY.intro}
      />
      <NewActivityForm initialCardLength={initialCardLength} />
    </>
  );
}
