import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignInButton } from "@/components/auth/AuthButtons";
import { PageHeader } from "@/components/layout/PageHeader";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to keep your Deal the Day record across devices.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/");

  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader
        title="Sign in"
        description="So your record is still here tomorrow, and on your other devices. If you have not been here before, this creates your account — there is no separate sign-up."
      />

      <Card className="space-y-6">
        <SignInButton callbackUrl={callbackUrl ?? "/"} block />

        <div className="space-y-3 text-sm text-text-muted">
          <p>
            Signing in with Google means there is no new password to invent, and
            no password of yours stored here. We receive your name, email address
            and profile picture — nothing else. We cannot see your Gmail, your
            files or your calendar.
          </p>
          <p>
            By continuing you agree to our{" "}
            <Link href="/terms" className="font-medium text-primary underline">
              terms of use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </Card>

      <Callout tone="info" className="mt-6">
        You do not have to sign in to read anything on this site. The guides, the
        psychoeducation and the crisis page are all open. Signing in is only for
        keeping your own record.
      </Callout>
    </div>
  );
}
