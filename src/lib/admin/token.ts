import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export function sessionKey(secret: string) {
  return createHash("sha256").update(`dsn-admin-session:${secret}`).digest();
}

export function createSessionToken(expiresAt: number, key: Buffer) {
  const payload = String(expiresAt);
  const signature = createHmac("sha256", key)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(
  token: string | undefined,
  key: Buffer,
  now = Date.now(),
) {
  if (!token) return false;
  const [payload, signature, ...rest] = token.split(".");
  if (!payload || !signature || rest.length || !/^\d+$/.test(payload))
    return false;
  const expected = createHmac("sha256", key).update(payload).digest();
  const given = Buffer.from(signature, "base64url");
  return (
    given.length === expected.length &&
    timingSafeEqual(given, expected) &&
    Number(payload) > now
  );
}

export function passwordMatches(input: string, expected: string) {
  if (!expected) return false;
  // Hashing first gives equal-length buffers so the comparison stays constant-time.
  return timingSafeEqual(
    createHash("sha256").update(input).digest(),
    createHash("sha256").update(expected).digest(),
  );
}
