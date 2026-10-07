"use client";

import { useEffect, useState } from "react";
import { InlineIcon } from "@/components/inline-icon";
import type { GitHubActivity as Activity, GitHubDay } from "@/lib/github";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "America/Toronto" });
const dayFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
const intensities = [0.1, 0.3, 0.5, 0.72, 1];

function ContributionGraph({ days }: { days: GitHubDay[] }) {
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const columns = Math.ceil((days.length + offset) / 7);
  const summary = days.every(day => day.count !== null)
    ? `${days.reduce((total, day) => total + (day.count ?? 0), 0).toLocaleString("en-US")} contributions over the past year`
    : "GitHub contributions over the past year";
  return <svg className="github-graph"
    viewBox={`0 0 ${columns * 7 - 2} 47`} width={columns * 7 - 2} height={47}
    role="img" aria-label={summary}>
    {days.map((day, index) => <rect key={day.date}
      x={Math.floor((index + offset) / 7) * 7} y={((index + offset) % 7) * 7}
      width={5} height={5} rx={0.8} fill="currentColor" opacity={intensities[day.level]}>
      <title>{`${day.count === null ? "Contributions" : `${day.count} ${day.count === 1 ? "contribution" : "contributions"}`} on ${dayFormat.format(new Date(`${day.date}T00:00:00Z`))}`}</title>
    </rect>)}
  </svg>;
}

export function GitHubActivity({ initial }: { initial: Activity }) {
  const [activity, setActivity] = useState(initial);
  useEffect(() => {
    const controller = new AbortController();
    const compact = window.matchMedia("(max-width:64rem)");
    const load = () => {
      if (compact.matches) return;
      fetch("/api/github", { cache: "no-store", signal: controller.signal })
        .then(response => response.ok ? response.json() as Promise<Activity> : null)
        .then(data => { if (data?.days.length) setActivity(data); })
        .catch(() => undefined);
    };
    const visible = () => { if (!document.hidden) load(); };
    load();
    document.addEventListener("visibilitychange", visible);
    compact.addEventListener("change", load);
    return () => { controller.abort(); document.removeEventListener("visibilitychange", visible); compact.removeEventListener("change", load); };
  }, []);

  const profileUrl = `https://github.com/${activity.username}`;
  return <aside className="github-activity text-layer" aria-labelledby="github-heading">
    <div className="github-heading ink">
      <h2 id="github-heading"><a href={profileUrl} target="_blank" rel="noreferrer"><InlineIcon name="code"/>GitHub</a></h2>
      <span>past year</span>
    </div>
    {activity.days.length > 0 && <a className="github-graph-link" href={profileUrl}
      target="_blank" rel="noreferrer" aria-label="View my contribution graph on GitHub">
      <ContributionGraph days={activity.days}/>
    </a>}
    {activity.calendarFallback && <p className="github-note ink"
      title="GitHub is temporarily unavailable; showing verified saved activity.">Saved activity · {dateFormat.format(new Date(activity.savedAt))}</p>}
  </aside>;
}
