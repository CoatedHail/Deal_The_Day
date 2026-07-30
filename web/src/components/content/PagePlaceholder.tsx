import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";

/**
 * Marks a route that exists and is navigable but whose behavior is not built
 * yet.
 *
 * Listing the planned pieces keeps the scaffold reviewable without dressing an
 * empty page up as a finished one.
 */
export function PagePlaceholder({
  summary,
  planned,
}: {
  summary: string;
  planned: string[];
}) {
  return (
    <div className="space-y-5">
      <Callout tone="caution" title="Not built yet">
        {summary}
      </Callout>

      <Card>
        <h2 className="mb-3 text-lg font-semibold text-text">What will live here</h2>
        <ul className="space-y-2">
          {planned.map((item) => (
            <li key={item} className="flex gap-3 text-text-muted">
              <span aria-hidden="true" className="text-text-subtle">
                &bull;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
