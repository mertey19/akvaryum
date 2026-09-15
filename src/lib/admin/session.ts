import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import {
  createSessionToken,
  passwordMatches,
  sessionKey,
  verifySessionToken,
} from "./token";

const COOKIE = "dsn_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function key() {
  return sessionKey(
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "",
  );
}

export const isAdmin = cache(async () => {
  // Read the cookie before any early return so admin routes always render per
  // request, even when ADMIN_PASSWORD is missing at build time.
  const token = (await cookies()).get(COOKIE)?.value;
  return adminConfigured() && verifySessionToken(token, key());
});

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/yonetim/giris");
}

export async function assertAdmin() {
  if (!(await isAdmin())) throw new Error("Bu işlem için giriş yapmalısınız.");
}

export async function startSession(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!passwordMatches(password, expected)) return false;
  (await cookies()).set(
    COOKIE,
    createSessionToken(Date.now() + MAX_AGE_SECONDS * 1000, key()),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    },
  );
  return true;
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}
