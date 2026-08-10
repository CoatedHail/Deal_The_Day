import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { SETTINGS_BOOTSTRAP_SCRIPT } from "@/lib/settings";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { DataProvider } from "@/components/providers/DataProvider";
import { AppShell } from "@/components/layout/AppShell";
import { TourProvider } from "@/components/tour/TourProvider";
import { AccountMenu } from "@/components/auth/AccountMenu";
import { auth } from "@/auth";

/**
 * Atkinson Hyperlegible was designed by the Braille Institute specifically to
 * make letterforms hard to confuse with one another, which makes it a good
 * default for a product whose readers may be tired, anxious or dyslexic.
 */
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Deal the Day",
    template: "%s · Deal the Day",
  },
  description:
    "The digital companion to the Deal the Day family card game — a gentle way to practice tolerating uncertainty together, built on ERP principles.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read here rather than in the provider so the first render already knows
  // whether the record belongs to an account or to this browser, and no page
  // briefly shows the wrong one.
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies stored display preferences before first paint so the page
            never flashes the wrong theme or text size. */}
        <script dangerouslySetInnerHTML={{ __html: SETTINGS_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className={atkinson.variable}>
        <SettingsProvider>
          <DataProvider signedIn={Boolean(session?.user)}>
            {/* Above the shell, because the tour walks the real pages and its
                position has to outlive any one of them. */}
            <TourProvider>
              <AppShell account={<AccountMenu />}>{children}</AppShell>
            </TourProvider>
          </DataProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
