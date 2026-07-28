import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/AuthButtons";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Account control for the top bar.
 *
 * The avatar is drawn from initials rather than loading the Google profile
 * picture. That avoids a request to Google's servers on every page view, which
 * would quietly tell them where this person browses — a poor trade for a small
 * round image.
 */
export async function AccountMenu() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <ButtonLink href="/sign-in" size="sm">
        Sign in
      </ButtonLink>
    );
  }

  const label = user.name?.trim() || user.email || "Signed in";
  const initials = (user.name?.trim() || user.email || "?")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary"
      >
        {initials}
      </span>
      {/* The name is decoration next to the avatar; hidden on narrow screens
          where the sign-out control matters more than knowing who you are. */}
      <span className="hidden max-w-[12rem] truncate text-sm text-text-muted sm:block">
        {label}
      </span>
      <SignOutButton />
    </div>
  );
}
