const DUOLINGO_USERNAME = "coini2";
type DuolingoResponse = { users?: Array<{ picture?: string | null; streak?: number; username?: string }> };

export async function GET() {
  try {
    const url = new URL("https://www.duolingo.com/2017-06-30/users");
    url.searchParams.set("username", DUOLINGO_USERNAME);
    url.searchParams.set("fields", "users{username,picture,streak}");
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 3600 } });
    const data = await response.json() as DuolingoResponse;
    const user = data.users?.[0];
    if (!response.ok || !user || typeof user.streak !== "number") throw new Error("Incomplete profile");
    const picture = user.picture?.startsWith("//") ? `https:${user.picture}/xlarge` : user.picture ?? null;
    return Response.json({ username: user.username ?? "Coini2", streak: user.streak, picture, fallback: false }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return Response.json({ username: "Coini2", streak: 1223, picture: null, fallback: true }, { headers: { "Cache-Control": "public, s-maxage=300" } });
  }
}
