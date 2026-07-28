import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "If you need support right now",
  description:
    "Deal the Day is not a crisis service. Where to find immediate human support instead.",
};

/**
 * Crisis support.
 *
 * Deliberately built out rather than left as a placeholder — someone can arrive
 * here at a bad moment, and an unfinished page would be the wrong thing to meet
 * them with. The listings below are US-centric and need confirming for the
 * product's actual audience before launch.
 */
export default function CrisisPage() {
  return (
    <>
      <PageHeader
        title="If you need support right now"
        description="Deal the Day is a practice tool for ordinary uncertainty. It is not built for crises, it is not monitored, and nobody sees what you write here."
      />

      <Callout tone="caution" title="If someone is in immediate danger" className="mb-6">
        Call your local emergency number — <strong>911</strong> in the US,{" "}
        <strong>999</strong> in the UK, <strong>112</strong> across the EU. Do not wait
        to work out whether it counts as serious enough.
      </Callout>

      <div className="space-y-4">
        <Card>
          <h2 className="text-lg font-semibold text-text">988 Suicide &amp; Crisis Lifeline</h2>
          <p className="mt-1 text-text-muted">
            Free, confidential support 24/7 for anyone in distress — not only for
            suicidal thoughts.
          </p>
          <p className="mt-3 text-text">
            <strong>Call or text 988</strong> (United States) ·{" "}
            <a
              href="https://988lifeline.org"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              988lifeline.org
            </a>
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-text">Crisis Text Line</h2>
          <p className="mt-1 text-text-muted">
            Text-based support with a trained volunteer, if talking out loud feels like
            too much.
          </p>
          <p className="mt-3 text-text">
            <strong>Text HOME to 741741</strong> (US) ·{" "}
            <a
              href="https://www.crisistextline.org"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              crisistextline.org
            </a>
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-text">Outside the US</h2>
          <p className="mt-1 text-text-muted">
            Find a helpline in your country through these directories.
          </p>
          <ul className="mt-3 space-y-1.5 text-text">
            <li>
              <a
                href="https://findahelpline.com"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                findahelpline.com
              </a>
            </li>
            <li>
              <a
                href="https://www.iasp.info/resources/Crisis_Centres/"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                International Association for Suicide Prevention directory
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <Callout tone="info" title="One more thing" className="mt-6">
        Needing this page is not a failure of the game, and it does not mean you have to
        stop playing it. Difficult stretches and useful practice can happen in the same
        week.
      </Callout>
    </>
  );
}
