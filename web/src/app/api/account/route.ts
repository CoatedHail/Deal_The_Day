import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteAccount } from "@/db/appData";

/**
 * Deletes the signed-in account and everything in it.
 *
 * Acts only on the user id from the server session, so this can only ever
 * delete the caller's own account — there is nothing in the request to point at
 * someone else.
 *
 * The confirmation step lives in the UI. This endpoint does not ask twice.
 */

export const dynamic = "force-dynamic";

export async function DELETE() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    await deleteAccount(userId);
  } catch {
    return NextResponse.json(
      { error: "Could not delete the account." },
      { status: 500 },
    );
  }

  // The session row went with the user, so the cookie still in the browser now
  // refers to nothing and the next request reads as signed out.
  return NextResponse.json({ ok: true });
}
