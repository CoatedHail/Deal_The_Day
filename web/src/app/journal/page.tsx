import { redirect } from "next/navigation";

/**
 * The journal merged into /activity.
 *
 * Kept as a redirect rather than deleted: the two pages showed the same record,
 * and keeping both meant choosing one before you could look anything up. Anyone
 * who bookmarked this, or follows an older link, still lands somewhere sensible.
 */
export default function JournalPage() {
  redirect("/activity");
}
