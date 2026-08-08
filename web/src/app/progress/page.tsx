import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressBoard } from "./ProgressBoard";

export const metadata: Metadata = {
  title: "Progress",
  description:
    "The cards you have played, and how your feelings and behaviour have changed across them.",
};

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        title="Progress"
        description="Change is usually slower and less tidy than a chart suggests. Read these as notes, not as a score."
      />

      <ProgressBoard />
    </>
  );
}
