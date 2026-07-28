import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

/**
 * Database handle.
 *
 * Uses Neon's HTTP driver rather than a TCP pool because the app runs as
 * serverless functions — there is no long-lived process to hold a connection
 * open, and a pool would exhaust Postgres connection slots under load.
 */

if (!process.env.DATABASE_URL) {
  // Failing loudly at import beats a confusing "relation does not exist" on the
  // first query, or worse, silently behaving as though nobody is signed in.
  throw new Error(
    "DATABASE_URL is not set. Copy web/.env.example to web/.env.local and fill it in.",
  );
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
export { schema };
