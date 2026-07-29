/**
 * Who is allowed to read the card reviews.
 *
 * ── To give someone access ──────────────────────────────────────────────────
 * Either add their Google account address to REVIEWER_EMAILS below and deploy,
 * or — without touching the code — add it to the REVIEWER_EMAILS environment
 * variable in Vercel as a comma-separated list. The two are combined.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * A hard-coded list is the right tool at this size. A roles table would need a
 * screen to manage it and a way to stop someone granting themselves access,
 * which is a lot of machinery for a handful of people on one project team.
 * Revisit it if the list outgrows a dozen names.
 *
 * This must only ever be consulted on the server. The list is a set of real
 * people's addresses, and the check is an authorisation decision — neither
 * belongs in a JavaScript bundle the public can read.
 */

const REVIEWER_EMAILS: readonly string[] = [
  "oscarsmily@gmail.com",
  // The repo owner, so the screen can be checked without editing this file.
  // Remove this line if it should not be a standing grant.
  "zpple.li@gmail.com",
];

/** Addresses are compared case-insensitively; Google does not distinguish case. */
function normalise(email: string): string {
  return email.trim().toLowerCase();
}

function allowedEmails(): Set<string> {
  const fromEnv = (process.env.REVIEWER_EMAILS ?? "")
    .split(",")
    .map(normalise)
    .filter(Boolean);
  return new Set([...REVIEWER_EMAILS.map(normalise), ...fromEnv]);
}

/**
 * Whether this address may read card reviews.
 *
 * Takes the email off the server session rather than anything the client sends,
 * so a signed-in visitor cannot claim to be someone else.
 */
export function isReviewer(email: string | null | undefined): boolean {
  if (!email) return false;
  return allowedEmails().has(normalise(email));
}
