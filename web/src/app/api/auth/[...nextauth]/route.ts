import { handlers } from "@/auth";

/**
 * Auth.js route handler.
 *
 * Serves every /api/auth/* endpoint, including the Google callback registered
 * in the Google Cloud console:
 *   /api/auth/callback/google
 */
export const { GET, POST } = handlers;
