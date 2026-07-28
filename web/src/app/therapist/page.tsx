import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Therapist mode",
  description:
    "Export progress, print a summary and track ERP homework to bring to a session.",
};

export default function TherapistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Optional"
        title="Therapist mode"
        description="For bringing what you have recorded into a session. Nothing here is shared automatically."
      />

      <Callout tone="info" title="How sharing works" className="mb-5">
        Your entries stay on your device. Sharing means you generating a file or a
        printout and handing it over yourself — there is no account, no upload, and no
        third party in the middle.
      </Callout>

      <PagePlaceholder
        summary="The therapist portal is not built yet. Export and import already work in the data layer, and the print stylesheet is in place."
        planned={[
          "A printable summary report, formatted for a session",
          "Export everything as a JSON file, and import it back",
          "An ERP homework view: what was assigned, attempted and reflected on",
          "Therapist notes, as a placeholder until real clinician accounts exist",
          "A date range selector so you can share one period rather than everything",
          "A clear statement of what any given export does and does not contain",
        ]}
      />
    </>
  );
}
