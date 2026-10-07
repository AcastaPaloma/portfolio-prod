import { getGitHubActivity } from "@/lib/github";

export async function GET() {
  const activity = await getGitHubActivity();
  return Response.json(activity, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
