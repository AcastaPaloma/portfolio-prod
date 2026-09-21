import { getDuolingoProfile } from "@/lib/duolingo";

export async function GET() {
  const profile = await getDuolingoProfile();
  const cache = profile.fallback ? "public, s-maxage=300" : "public, s-maxage=3600, stale-while-revalidate=86400";
  return Response.json(profile, { headers: { "Cache-Control": cache } });
}
