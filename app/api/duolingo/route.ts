const DUOLINGO_USERNAME = "coini2";
type DuolingoResponse = { users?: Array<{ picture?: string | null; streak?: number; username?: string }> };

export async function GET() {
  try {
    const url = new URL("https://www.duolingo.com/2017-06-30/users");
    url.searchParams.set("username", DUOLINGO_USERNAME);
    url.searchParams.set("fields", "users{username,picture,streak}");
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) });
    const data = await response.json() as DuolingoResponse;
    const user = data.users?.[0];
    if (!response.ok || !user || typeof user.streak !== "number") throw new Error("Incomplete profile");
    const rawPicture = user.picture?.startsWith("//") ? `https:${user.picture}` : user.picture;
    const picture = rawPicture?.startsWith("https://")
      ? `${rawPicture.replace(/\/(?:xlarge|large|medium|small)\/?$/, "")}/xlarge`
      : "/resume/duolingo-avatar.webp";
    return Response.json({ username: user.username ?? "Coini2", streak: user.streak, picture, fallback: false }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    try {
      // Public normalized API from marlonangeli/duolingo-streak-tracker.
      const response = await fetch(`https://duolingo-streak-tracker.vercel.app/api/stats/${DUOLINGO_USERNAME}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) });
      const profile = await response.json() as { username?: string; streak?: number; avatarUrl?: string };
      if (!response.ok || typeof profile.streak !== "number") throw new Error("Incomplete tracker profile");
      return Response.json({ username: profile.username ?? "Coini2", streak: profile.streak, picture: profile.avatarUrl?.startsWith("https://") ? profile.avatarUrl : "/resume/duolingo-avatar.webp", fallback: false }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
    } catch {
      // Verified public snapshot, 2026-09-05. The saved avatar survives upstream outages.
      return Response.json({ username: "Coini2", streak: 1225, picture: "/resume/duolingo-avatar.webp", fallback: true }, { headers: { "Cache-Control": "public, s-maxage=300" } });
    }
  }
}
