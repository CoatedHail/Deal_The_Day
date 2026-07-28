import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Progress",
  description:
    "Activities completed, anxiety trends, resisted compulsions and the insights you have kept.",
};

export default function ProgressPage() {
  return (
    <>
      <PageHeader
        title="Progress"
        description="Change is usually slower and less tidy than a chart suggests. Read these as notes, not as a score."
      />

      <PagePlaceholder
        summary="The progress dashboard is not built yet. Every statistic it needs is already computed in the stats module, and the four chart components are built and colour-validated."
        planned={[
          "Activities completed, and how often the feared outcome did not arrive",
          "Anxiety before against after, per activity",
          "Trends across all seven check-in dimensions",
          "Compulsions resisted against compulsions anticipated",
          "Weekly summaries for the last eight weeks",
          "Insights you chose to keep from your reflections",
          "Gentle milestones, which can be switched off entirely in settings",
        ]}
      />
    </>
  );
}
