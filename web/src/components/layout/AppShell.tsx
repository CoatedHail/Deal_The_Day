"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReadAloud } from "@/components/a11y/ReadAloud";
import { Icon } from "@/components/ui/Icon";
import {
  NAV_ITEMS,
  NAV_SECTIONS,
  PRIMARY_NAV,
  SECONDARY_NAV,
  UNSECTIONED_NAV,
  isActivePath,
  navSection,
} from "@/lib/nav";
import { Wordmark } from "@/components/layout/Wordmark";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TourBar } from "@/components/tour/TourBar";
import { cn } from "@/lib/cn";

export function AppShell({
  children,
  account,
}: {
  children: React.ReactNode;
  /**
   * Slot for the account panel. Passed in from the server layout rather than
   * imported here, because this component is a client component and the panel
   * needs to read the session on the server.
   */
  account?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close the mobile sheet whenever navigation happens.
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Escape closes the sheet, matching normal dialog behavior.
  useEffect(() => {
    if (!moreOpen) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [moreOpen]);

  return (
    <div className="min-h-dvh lg:flex">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to main content
      </a>

      {/* Desktop sidebar */}
      <nav
        data-app-nav
        aria-label="Main"
        className="hidden shrink-0 border-r border-border bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:flex-col"
      >
        <div className="px-5 py-4">
          <Wordmark />
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="space-y-0.5">
            {UNSECTIONED_NAV.map((item) => (
              <li key={item.href}>
                <NavLink item={item} active={isActivePath(pathname, item.href)} />
              </li>
            ))}
          </ul>

          {NAV_SECTIONS.map((section) => (
            <div key={section.id} className="mt-5">
              <h2 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-text-subtle">
                {section.label}
              </h2>
              <ul className="space-y-0.5">
                {navSection(section.id).map((item) => (
                  <li key={item.href}>
                    <NavLink item={item} active={isActivePath(pathname, item.href)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar. Present on every page and at every width: the wordmark
            shows only on mobile, where there is no sidebar carrying it, while
            the account control sits on the right throughout. */}
        <header
          data-app-nav
          className="sticky top-0 z-30 border-b border-border bg-surface/95 px-4 py-2 backdrop-blur sm:px-6 lg:px-10"
        >
          <div className="mx-auto flex w-full max-w-4xl items-center gap-4">
            <div className="lg:hidden">
              <Wordmark />
            </div>
            <Link
              href="/get-the-deck"
              aria-label="Get the printed cards — coming soon"
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors lg:hidden",
                isActivePath(pathname, "/get-the-deck")
                  ? "border-primary-border bg-primary-soft text-primary"
                  : "border-border bg-surface text-text-muted hover:bg-bg-subtle hover:text-text",
              )}
            >
              <Icon name="store" size={17} />
              <span>Cards</span>
              <span className="rounded-full bg-caution-soft px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-caution">
                Soon
              </span>
            </Link>
            <div className="lg:ml-auto">{account}</div>
          </div>
        </header>

        <main id="main" className="flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-10 lg:py-10 lg:pb-10">
          <div className="mx-auto w-full max-w-4xl">
            {/* Above the page rather than floating over it: someone who wants
                it should meet it before they start reading. */}
            <ReadAloud />
            <TourBar />
            {children}
          </div>
        </main>

        <SiteFooter />
      </div>

      {/* Mobile bottom bar */}
      <nav
        data-app-nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg">
          {PRIMARY_NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-1 px-1 py-2.5 text-xs transition-colors",
                    active ? "text-primary" : "text-text-muted",
                  )}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-controls="more-menu"
              className={cn(
                "flex w-full flex-col items-center gap-1 px-1 py-2.5 text-xs transition-colors",
                moreOpen ? "text-primary" : "text-text-muted",
              )}
            >
              <Icon name="menu" />
              More
            </button>
          </li>
        </ul>
      </nav>

      {moreOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          />
          <div
            id="more-menu"
            className="fixed inset-x-0 bottom-[3.75rem] z-40 rounded-t-2xl border-t border-border bg-surface p-3 shadow-lg lg:hidden"
          >
            <ul className="space-y-0.5">
              {SECONDARY_NAV.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} active={isActivePath(pathname, item.href)} showDescription />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

    </div>
  );
}

function NavLink({
  item,
  active,
  showDescription,
}: {
  item: (typeof NAV_ITEMS)[number];
  active: boolean;
  showDescription?: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors",
        active
          ? "bg-primary-soft font-medium text-text"
          : "text-text-muted hover:bg-bg-subtle hover:text-text",
      )}
    >
      <Icon name={item.icon} className={cn("mt-0.5", active && "text-primary")} />
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="block">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full bg-caution-soft px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-caution">
              {item.badge}
            </span>
          ) : null}
        </span>
        {showDescription && item.description ? (
          <span className="block text-xs text-text-subtle">{item.description}</span>
        ) : null}
      </span>
    </Link>
  );
}
