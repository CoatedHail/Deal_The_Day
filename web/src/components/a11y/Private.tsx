/**
 * Marks a region as showing part of a family's own record.
 *
 * Read-aloud walks the rendered page and speaks what it finds, so anything
 * drawn from what a family recorded — a card title, a reflection, a checklist
 * item, a review, a set of check-in ratings — has to be wrapped in this. Some
 * browsers speak using cloud voices, which would send that text to the voice
 * vendor, and the privacy policy says their entries go nowhere.
 *
 * Form fields are already safe: a value typed into an input or textarea is not
 * part of the page's text content and is never collected. This is for text the
 * app renders back out.
 *
 * See lib/speech.ts for the collector that honors this.
 */
export function Private({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  return (
    <Tag data-private className={className}>
      {children}
    </Tag>
  );
}
