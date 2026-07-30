/**
 * How to reach the project.
 *
 * One source of truth, because these details appear in the footer, on the
 * contact page, and in the privacy policy — and a stale address in a policy is
 * worse than no address at all.
 *
 * Update here and every surface follows.
 */

export const CONTACT = {
  email: "dealtheday26@gmail.com",
  instagramHandle: "dealtheday",
  instagramUrl: "https://www.instagram.com/dealtheday/",
  /**
   * No phone line, deliberately recorded as absent rather than left out.
   * Somewhere expecting a number can then say so plainly instead of rendering
   * a blank, and the crisis page carries the numbers that actually matter.
   */
  phone: null,
} as const;

export const CONTACT_EMAIL_HREF = `mailto:${CONTACT.email}`;
