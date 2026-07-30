import Link from "next/link";
import { CONTACT, CONTACT_EMAIL_HREF } from "@/content/contact";

/**
 * Site footer.
 *
 * The disclaimer lives here rather than behind a link because it needs to be
 * present on every page — this is educational material, not treatment.
 */
export function SiteFooter() {
  return (
    <footer
      data-app-footer
      className="mt-auto border-t border-border bg-surface-sunken px-4 py-8 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-4xl space-y-4 text-sm text-text-muted">
        <p>
          <strong className="text-text">Deal the Day</strong> is an educational companion
          to the physical card game. It is not a substitute for professional mental
          health treatment, diagnosis, or therapy. The material here follows
          evidence-based principles of Exposure and Response Prevention, and works best
          alongside a qualified clinician who knows you.
        </p>
        <p>
          If you are in crisis or worried about your safety, this app is not the right
          tool.{" "}
          <Link href="/resources/crisis" className="font-medium text-primary underline">
            Find immediate support
          </Link>
          .
        </p>
        {/* The address itself, not just a link to a page that has it. Someone
            looking for a way to reach a mental health project should not have
            to navigate to find one. */}
        <p>
          Questions?{" "}
          <a href={CONTACT_EMAIL_HREF} className="font-medium text-primary underline">
            {CONTACT.email}
          </a>{" "}
          · Instagram{" "}
          <a
            href={CONTACT.instagramUrl}
            rel="noreferrer"
            className="font-medium text-primary underline"
          >
            @{CONTACT.instagramHandle}
          </a>
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          <Link href="/resources/faq" className="underline hover:text-text">
            FAQ
          </Link>
          <Link href="/team" className="underline hover:text-text">
            Meet the team
          </Link>
          <Link href="/resources/crisis" className="underline hover:text-text">
            Crisis support
          </Link>
          <Link href="/resources/contact" className="underline hover:text-text">
            Contact
          </Link>
          <Link href="/settings" className="underline hover:text-text">
            Your data
          </Link>
          <Link href="/privacy" className="underline hover:text-text">
            Privacy
          </Link>
          <Link href="/terms" className="underline hover:text-text">
            Terms
          </Link>
        </nav>
        <p className="text-xs text-text-subtle">
          Signed out, everything you record stays in this browser. Signed in, it is
          saved to your account and nobody else can read it.
        </p>
      </div>
    </footer>
  );
}
