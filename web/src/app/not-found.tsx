import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="That page isn't here"
        description="Which is a small, low-stakes piece of uncertainty. Good practice, arguably."
      />
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Back to the dashboard</ButtonLink>
        <ButtonLink href="/learn" variant="secondary">
          Browse the explainers
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-text-muted">
        If you followed a link here from inside the site,{" "}
        <Link href="/resources/contact" className="text-primary underline">
          let us know
        </Link>
        .
      </p>
    </>
  );
}
