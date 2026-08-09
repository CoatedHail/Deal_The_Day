"use client";

import { useTour } from "@/components/tour/TourProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TOUR_COPY } from "@/content/tour";

/**
 * Starts the tour.
 *
 * A button rather than something that fires on a first visit. "First visit" is
 * not a thing the app can know honestly — a cleared browser, a second device or
 * a shared family laptop all look identical to a new user — and ambushing
 * someone with a tour they did not ask for is a poor first impression either
 * way. Asking is cheap.
 */
export function StartTourButton({
  variant = "primary",
  label,
}: {
  variant?: "primary" | "secondary" | "quiet";
  label?: string;
}) {
  const { start, active } = useTour();

  return (
    <Button variant={variant} onClick={start} disabled={active}>
      <Icon name="sparkle" size={18} />
      {label ?? TOUR_COPY.start}
    </Button>
  );
}
