import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Questions families ask",
  description:
    "What Deal the Day is for, who it suits, and what to do when a session does not go to plan.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Questions families ask"
        description="The ones that come up most often."
      />

      <PagePlaceholder
        summary="The FAQ is not written yet. The questions below are the planned list."
        planned={[
          "Do we need the physical deck to use this?",
          "What if my child does not want to play?",
          "What age is this suitable for?",
          "What if the activity genuinely goes badly?",
          "Is this a replacement for therapy?",
          "What if I am not diagnosed with anything?",
          "How often should we play?",
          "What if I cannot stop planning even during the game?",
          "Can two parents both use it?",
          "Where is my data stored?",
        ]}
      />
    </>
  );
}
