import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "portfolio_gym_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 24 * 30;

function hmac(value: string, secret: string) { return createHmac("sha256", secret).update(value).digest("base64url"); }
function matches(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isGymAccessConfigured() { return Boolean(process.env.GYM_ADMIN_PASSWORD && process.env.GYM_SESSION_SECRET); }
export function verifyGymPassword(password: string) { return Boolean(process.env.GYM_ADMIN_PASSWORD && matches(password, process.env.GYM_ADMIN_PASSWORD)); }
export function createGymSession() {
  const secret = process.env.GYM_SESSION_SECRET;
  if (!secret) throw new Error("GYM_SESSION_SECRET is not configured.");
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS);
  return `${expiresAt}.${hmac(expiresAt, secret)}`;
}
export function hasGymSession(request: NextRequest) {
  const secret = process.env.GYM_SESSION_SECRET;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!secret || !token) return false;
  const [expiresAt, signature, ...extra] = token.split(".");
  return Boolean(expiresAt && signature && extra.length === 0 && /^\d+$/.test(expiresAt) && Number(expiresAt) >= Math.floor(Date.now() / 1000) && matches(signature, hmac(expiresAt, secret)));
}
export const gymSessionCookie = { name: SESSION_COOKIE, options: { httpOnly: true, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_LIFETIME_SECONDS } };
