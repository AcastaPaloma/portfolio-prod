import { getDuolingoProfile } from "@/lib/duolingo";

export async function GET() {
  const profile = await getDuolingoProfile();
  const cache = profile.fallback ? "public, s-maxage=300" : "public, s-maxage=300, stale-while-revalidate=3600";
  return Response.json(profile, { headers: { "Cache-Control": cache } });
}
