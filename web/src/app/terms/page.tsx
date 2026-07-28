import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalBody } from "@/components/content/LegalBody";
import { TERMS_OF_SERVICE } from "@/content/legal";

export const metadata: Metadata = {
  title: TERMS_OF_SERVICE.title,
  description: TERMS_OF_SERVICE.summary,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={TERMS_OF_SERVICE.title}
        description={TERMS_OF_SERVICE.summary}
      />
      <LegalBody document={TERMS_OF_SERVICE} />
    </>
  );
}
