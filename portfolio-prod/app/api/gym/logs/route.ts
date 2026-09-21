import { NextRequest, NextResponse } from "next/server";
import { hasGymSession } from "@/lib/gym-auth";
import { createGymWorkout, isGymDatabaseConfigured, listGymWorkouts, parseGymWorkout } from "@/lib/gym";

export const runtime = "nodejs";
const unauthorized = () => NextResponse.json({ error: "Unlock the gym log to access workout data." }, { status: 401 });
const notConfigured = () => NextResponse.json({ error: "The Supabase workout database is not configured." }, { status: 503 });
export async function GET(request: NextRequest) {
  if (!hasGymSession(request)) return unauthorized();
  if (!isGymDatabaseConfigured()) return notConfigured();
  try { return NextResponse.json({ workouts: await listGymWorkouts() }); } catch { return NextResponse.json({ error: "Could not load workout data." }, { status: 502 }); }
}
export async function POST(request: NextRequest) {
  if (!hasGymSession(request)) return unauthorized();
  if (!isGymDatabaseConfigured()) return notConfigured();
  try { return NextResponse.json({ workout: await createGymWorkout(parseGymWorkout(await request.json())) }, { status: 201 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save that workout entry." }, { status: 400 }); }
}
