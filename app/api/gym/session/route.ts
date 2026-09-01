import { NextRequest, NextResponse } from "next/server";
import { createGymSession, gymSessionCookie, isGymAccessConfigured, verifyGymPassword } from "@/lib/gym-auth";
import { clearGymLoginAttempts, gymLoginRetryAfter, recordFailedGymLogin } from "@/lib/gym-rate-limit";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!isGymAccessConfigured()) return NextResponse.json({ error: "Gym access is not configured." }, { status: 503 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const retryAfter = gymLoginRetryAfter(client);
  if (retryAfter) return NextResponse.json({ error: "Try again shortly." }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
  try {
    const body = await request.json() as { password?: unknown };
    if (!verifyGymPassword(typeof body.password === "string" ? body.password : "")) {
      recordFailedGymLogin(client);
      const retryAfter = gymLoginRetryAfter(client);
      if (retryAfter) return NextResponse.json({ error: "Try again shortly." }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
      return NextResponse.json({ error: "That password did not unlock the gym log." }, { status: 401 });
    }
    clearGymLoginAttempts(client);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(gymSessionCookie.name, createGymSession(), gymSessionCookie.options);
    return response;
  } catch { return NextResponse.json({ error: "Enter the gym password to continue." }, { status: 400 }); }
}
export function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(gymSessionCookie.name, "", { ...gymSessionCookie.options, maxAge: 0 });
  return response;
}
