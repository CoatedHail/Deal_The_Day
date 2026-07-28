import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Reflect",
  description: "Record what actually happened after a Deal the Day activity.",
};

export default function ReflectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Afterwards"
        title="How did it go?"
        description="This is the part that does the work. Comparing what you expected against what happened is how the learning sticks."
      />

      <PagePlaceholder
        summary="The post-activity reflection is not built yet. Its questions are already defined in the data model."
        planned={[
          "What actually happened",
          "Anxiety afterwards, 0 to 10",
          "What surprised you",
          "Whether the feared outcome occurred, partly occurred, or did not",
          "What you learned",
          "Which compulsions you resisted and which you did",
          "A longer reflection journal entry",
          "Your original prediction shown alongside, so the comparison is direct",
        ]}
      />
    </>
  );
}
