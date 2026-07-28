import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePlaceholder } from "@/components/content/PagePlaceholder";

export const metadata: Metadata = {
  title: "Recommended books",
  description: "Reading on OCD, OCPD, ERP and anxious parenting — for adults and children.",
};

export default function BooksPage() {
  return (
    <>
      <PageHeader
        title="Recommended books"
        description="A short, opinionated list rather than everything in print."
      />

      <PagePlaceholder
        summary="The reading list is not compiled yet."
        planned={[
          "For parents: understanding your own OCD or OCPD",
          "For parents: anxious parenting and family accommodation",
          "Workbooks that pair well with ERP",
          "Picture books for younger children about worry and uncertainty",
          "Books for older children and teenagers",
          "For clinicians using the game with clients",
        ]}
      />
    </>
  );
}
