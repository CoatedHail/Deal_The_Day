import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Worksheets",
  description:
    "Printable versions of the pre- and post-activity questions, for when a screen is not welcome.",
};

export default function WorksheetsPage() {
  return (
    <>
      <PageHeader
        title="Worksheets"
        description="Paper versions of everything the app asks. Some families would rather not bring a phone to dinner."
      />

      <PagePlaceholder
        summary="The printable worksheets are not built yet. The print stylesheet they will use is already in place."
        planned={[
          "Before-the-activity sheet: prediction, feared outcome, tempted compulsions",
          "After-the-activity sheet: what happened, what surprised you, what you learned",
          "A combined single-page version for shorter activities",
          "A blank weekly tracker",
          "A safety valve reflection sheet",
          "All of them printable directly from the browser",
        ]}
      />
    </>
  );
}
