import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Safety valve",
  description:
    "Skip or adapt a card on purpose, and think through whether the reason is safety or anxiety.",
};

export default function OptOutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Safety valve"
        title="Skipping or changing this card"
        description="Some cards genuinely should not happen. Using this is allowed, and it is not the same as giving up."
      />

      <Callout tone="erp" title="The question worth sitting with" className="mb-5">
        Not &ldquo;is this scary?&rdquo; but &ldquo;is this actually unsafe?&rdquo; Both
        answers are legitimate. Naming which one it is keeps the choice yours rather
        than the anxiety&rsquo;s.
      </Callout>

      <PagePlaceholder
        summary="The safety valve flow is not built yet. Its data model, including the distinction between a practical concern and anxiety-driven avoidance, is already in place."
        planned={[
          "A short prompt to say why in your own words",
          "Choosing what kind of concern it is: practical safety, genuinely impossible, anxiety-driven, or unsure",
          "The option to adapt the card rather than skip it entirely",
          "A note that 'unsure' and 'anxiety-driven' are honest answers, recorded without penalty",
          "Opt-outs shown in progress as engagement, not as failures",
        ]}
      />
    </>
  );
}
