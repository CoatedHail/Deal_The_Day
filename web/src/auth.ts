import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

/**
 * Authentication.
 *
 * Google is the only provider, deliberately: it means no password of anyone's
 * is ever stored here, so there is nothing of that kind to leak. We receive a
 * name, an email address and an avatar URL, and nothing else — no calendar, no
 * mail, no contacts.
 *
 * Sessions are stored in the database rather than in a JWT. For an app holding
 * health information that matters: a database session can be revoked
 * immediately, whereas a signed token stays valid until it expires no matter
 * what happens at our end.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
  session: { strategy: "database" },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session({ session, user }) {
      // Expose the user id so server code can scope queries to the signed-in
      // account without a second lookup.
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
});
