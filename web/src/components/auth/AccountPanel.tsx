import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/AuthButtons";
import { Icon } from "@/components/ui/Icon";

/**
 * Who you are, shown at the foot of the navigation.
 *
 * The avatar is drawn from initials rather than loading the Google profile
 * picture. That avoids a request to Google's servers on every page view, which
 * would quietly tell them where this person browses — a poor trade for a small
 * round image.
 */
export async function AccountPanel() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <div className="border-t border-border px-3 py-3">
        <Link
          href="/sign-in"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-text-muted transition-colors hover:bg-bg-subtle hover:text-text"
        >
          <Icon name="arrow-right" />
          <span className="min-w-0">
            <span className="block font-medium">Sign in</span>
            <span className="block text-xs text-text-subtle">
              Keep your record across devices
            </span>
          </span>
        </Link>
      </div>
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
    <div className="border-t border-border px-3 py-3">
      <div className="flex items-center gap-3 px-3 py-1.5">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary"
        >
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-text">{label}</span>
          {user.email && user.name ? (
            <span className="block truncate text-xs text-text-subtle">{user.email}</span>
          ) : null}
        </span>
      </div>
      <div className="mt-1 px-1">
        <SignOutButton />
      </div>
    </div>
  );
}
