import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Podcasts and talks",
  description: "Listening on OCD, OCPD, ERP and living with uncertainty.",
};

export default function PodcastsPage() {
  return (
    <>
      <PageHeader
        title="Podcasts and talks"
        description="For the car, the walk, or the washing up."
      />

      <PagePlaceholder
        summary="The listening list is not compiled yet."
        planned={[
          "Podcasts hosted by ERP clinicians",
          "First-person accounts from people with OCD",
          "Episodes specifically on OCPD, which is far less covered",
          "Talks on family accommodation",
          "Individual episodes worth singling out",
        ]}
      />
    </>
  );
}
