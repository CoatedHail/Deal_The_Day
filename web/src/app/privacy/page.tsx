import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalBody } from "@/components/content/LegalBody";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.summary,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={PRIVACY_POLICY.title}
        description={PRIVACY_POLICY.summary}
      />
      <LegalBody document={PRIVACY_POLICY} />
    </>
  );
}
