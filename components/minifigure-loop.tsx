"use client";

import { useEffect, useRef, useState } from "react";

export function MinifigureLoop() {
  const video = useRef<HTMLVideoElement>(null);
  const choice = useRef<boolean | null>(null);
  const sync = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let mounted = true;
    const update = () => {
      const wantsMotion = choice.current ?? !reducedMotion.matches;
      if (visible && !document.hidden && wantsMotion) {
        void element.play().then(() => { if (!mounted) element.pause(); }).catch(() => {});
      } else element.pause();
    };
    sync.current = update;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.1 });
    observer.observe(element);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      mounted = false;
      observer.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element.pause();
    };
  }, []);

  return <figure className="dither-hero minifigure-figure">
    <div className="minifigure-media">
      <video ref={video} width={768} height={1032} muted loop playsInline preload="none"
        poster="/animation/minifigure-poster.webp" aria-label="A shiny LEGO version of Kuan Yi in a green cap and blue shirt, turning in flickering colored dither against black"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source media="(max-width: 48rem)" src="/animation/minifigure-spin-small.mp4" type="video/mp4" />
        <source src="/animation/minifigure-spin.mp4" type="video/mp4" />
      </video>
    </div>
    <figcaption className="minifigure-caption"><span>A small version of me.</span>
      <button type="button" aria-label={playing ? "Pause minifigure spin" : "Play minifigure spin"}
        onClick={() => { choice.current = video.current?.paused ?? true; sync.current(); }}>
        {playing ? "Pause" : "Play"}
      </button>
    </figcaption>
  </figure>;
}
