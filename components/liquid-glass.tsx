"use client";

import { useId, useSyncExternalStore, type ReactNode } from "react";

type Props = {
  as?: "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  // Sits behind the glass, so the glass bends it (used for thumbnails).
  underlay?: ReactNode;
  children: ReactNode;
  // Refraction strength in px at the rim.
  displacement?: number;
};

// Two effects in one map. The whole pane leans toward its centre, so content
// is magnified a little, like a lens. The rim adds a bend that pushes samples
// inward at the edges. Channel R carries x and channel G carries y, with 0.5 as flat.
const MAP_SIZE = 256;
const BEZEL = 0.2;
const MAGNIFY = 0.35;
const RIM = 0.55;
let mapUrl: string | null = null;
function displacementMap() {
  if (mapUrl) return mapUrl;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = MAP_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const image = ctx.createImageData(MAP_SIZE, MAP_SIZE);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  for (let y = 0; y < MAP_SIZE; y++) {
    for (let x = 0; x < MAP_SIZE; x++) {
      const u = (x + 0.5) / MAP_SIZE, v = (y + 0.5) / MAP_SIZE;
      // Lens: sample from a little toward the centre, which magnifies.
      let dx = -(u - 0.5) * 2 * MAGNIFY, dy = -(v - 0.5) * 2 * MAGNIFY;
      // Rim: near an edge, sample from further inside, which bends the light.
      const ex = Math.min(u, 1 - u), ey = Math.min(v, 1 - v);
      if (ex < ey) { const t = ex / BEZEL; if (t < 1) dx += (u < 0.5 ? 1 : -1) * RIM * (1 - t) * (1 - t); }
      else { const t = ey / BEZEL; if (t < 1) dy += (v < 0.5 ? 1 : -1) * RIM * (1 - t) * (1 - t); }
      const i = (y * MAP_SIZE + x) * 4;
      image.data[i] = clamp(128 + 127 * Math.max(-1, Math.min(1, dx)));
      image.data[i + 1] = clamp(128 + 127 * Math.max(-1, Math.min(1, dy)));
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  mapUrl = canvas.toDataURL();
  return mapUrl;
}

const subscribeNone = () => () => {};
const mapIfSupported = (filterId: string) => () =>
  typeof CSS !== "undefined" && CSS.supports("backdrop-filter", `url(#${filterId})`) ? displacementMap() : null;

export function LiquidGlass({ as = "div", href, target, rel, className = "", underlay, children, displacement = 70 }: Props) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `lg-${rawId}`;
  // Chromium supports SVG filters inside backdrop-filter. Elsewhere the glass
  // keeps its blur and saturation, and skips the bend.
  const map = useSyncExternalStore(subscribeNone, mapIfSupported(filterId), () => null);
  const refract = map !== null;

  const Tag = as;
  const backdrop = refract ? { backdropFilter: `url(#${filterId}) blur(0.4px) saturate(120%)` } : undefined;
  const s = displacement;

  return <Tag className={`liquid-glass ${className}`} href={href} target={target} rel={rel}>
    {refract && map && <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feImage href={map} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={s} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>}
    {underlay && <div className="lg-underlay">{underlay}</div>}
    <div className="lg-backdrop" style={backdrop} />
    <div className="lg-sheen" />
    <div className="lg-content">{children}</div>
  </Tag>;
}
