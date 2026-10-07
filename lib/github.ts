import saved from "./github-snapshot.json";

const USERNAME = "AcastaPaloma";
const REVALIDATE = 300;

export type GitHubDay = { date: string; count: number | null; level: number };
export type GitHubActivity = {
  username: string;
  days: GitHubDay[];
  calendarFallback: boolean;
  savedAt: string;
};

// GitHub serves its public contribution calendar as a fragment, including exact
// daily counts in tooltips. Parse data attributes rather than layout or colors.
export function parseContributions(html: string): GitHubDay[] {
  const counts = new Map<string, number | null>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    if (!id) continue;
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const count = text.match(/^([\d,]+) contribution/);
    counts.set(id, count ? Number(count[1].replaceAll(",", "")) : /^No contributions/i.test(text) ? 0 : null);
  }

  const days = new Map<string, GitHubDay>();
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const date = match[1].match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const level = match[1].match(/\bdata-level="([0-4])"/)?.[1];
    const id = match[1].match(/\bid="([^"]+)"/)?.[1];
    if (!date || level === undefined || !id) continue;
    days.set(date, { date, count: counts.get(id) ?? null, level: Number(level) });
  }
  const result = [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
  if (result.length < 350 || result.length > 376) throw new Error("Incomplete GitHub calendar");
  for (let index = 0; index < result.length; index += 1) {
    const timestamp = Date.parse(`${result[index].date}T00:00:00Z`);
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== result[index].date
      || (index > 0 && timestamp - Date.parse(`${result[index - 1].date}T00:00:00Z`) !== 86400000)) {
      throw new Error("Invalid GitHub calendar dates");
    }
  }
  return result;
}

async function getCalendar() {
  const response = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
    headers: { "User-Agent": "kuant.space GitHub activity" },
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("GitHub calendar unavailable");
  return parseContributions(await response.text());
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
  try {
    return {
      username: USERNAME,
      days: await getCalendar(),
      calendarFallback: false,
      savedAt: saved.verifiedAt,
    };
  } catch {
    // Keep real verified contributions visible if the public calendar is unavailable.
    return {
      username: USERNAME,
      days: saved.days,
      calendarFallback: true,
      savedAt: saved.verifiedAt,
    };
  }
}
