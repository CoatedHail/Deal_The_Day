import type { Config } from "drizzle-kit";

/**
 * Drizzle Kit config, used only by the `db:push` and `db:generate` scripts.
 * The running app never reads this file.
 */
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
