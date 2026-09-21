"use client";

import { useEffect, useState } from "react";
import type { DuolingoProfile } from "@/lib/duolingo";

const AVATAR_FALLBACK = "/resume/duolingo-avatar.webp";

// The page ships a server-rendered count so the card never opens empty, then this
// refetches on mount and whenever the tab comes back, so a lesson finished on the
// phone shows up without a reload.
export function StreakCard({ initial }: { initial: DuolingoProfile }) {
  const [profile, setProfile] = useState(initial);

  useEffect(() => {
    const controller = new AbortController();
    const load = () => {
      fetch("/api/duolingo", { signal: controller.signal, cache: "no-store" })
        .then(response => (response.ok ? response.json() as Promise<DuolingoProfile> : null))
        .then(data => { if (data && typeof data.streak === "number") setProfile(data); })
        .catch(() => undefined);
    };
    load();
    const onVisible = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { controller.abort(); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  return <div className="streak-card">
    <div className="streak-card-copy">
      <p className="streak-card-label ink">Current Streak</p>
      <div className="streak-card-figure">
        {/* 5:3 is the flag's official ratio. The black band is the page's ink rather
            than pure black, so it still separates when the boundary turns the page
            dark, without needing a frame the rest of the page does not have. */}
        <svg className="streak-card-flag" viewBox="0 0 5 3" role="img" aria-label="Flag of Germany">
          <rect width="5" height="3" fill="#ffce00"/>
          <rect width="5" height="2" fill="#dd0000"/>
          <rect width="5" height="1" fill="#202020"/>
        </svg>
        <p className="streak-card-count ink"><span className="streak-days">{profile.streak.toLocaleString("en-US")}</span> days</p>
      </div>
    </div>
    <img
      className="streak-card-avatar"
      src={profile.picture}
      alt={`${profile.username}'s Duolingo avatar`}
      width={96}
      height={96}
      decoding="async"
      onError={event => { if (event.currentTarget.src !== AVATAR_FALLBACK) event.currentTarget.src = AVATAR_FALLBACK; }}
    />
  </div>;
}
