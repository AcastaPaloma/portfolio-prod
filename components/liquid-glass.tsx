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

// A rim-weighted displacement map: pixels near an edge push their sample inward,
// so the glass bends what is behind it the way a lens does. Flat in the middle.
const MAP_SIZE = 256;
const BEZEL = 0.24;
let mapUrl: string | null = null;
function displacementMap() {
  if (mapUrl) return mapUrl;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = MAP_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const image = ctx.createImageData(MAP_SIZE, MAP_SIZE);
  for (let y = 0; y < MAP_SIZE; y++) {
    for (let x = 0; x < MAP_SIZE; x++) {
      const u = (x + 0.5) / MAP_SIZE, v = (y + 0.5) / MAP_SIZE;
      const ex = Math.min(u, 1 - u), ey = Math.min(v, 1 - v);
      let dx = 0, dy = 0, t: number;
      if (ex < ey) { t = ex / BEZEL; dx = u < 0.5 ? 1 : -1; }
      else { t = ey / BEZEL; dy = v < 0.5 ? 1 : -1; }
      const m = t < 1 ? (1 - t) * (1 - t) : 0;
      const i = (y * MAP_SIZE + x) * 4;
      image.data[i] = 128 + 127 * dx * m;
      image.data[i + 1] = 128 + 127 * dy * m;
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

export function LiquidGlass({ as = "div", href, target, rel, className = "", underlay, children, displacement = 64 }: Props) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `lg-${rawId}`;
  // Chromium supports SVG filters inside backdrop-filter. Elsewhere the glass
  // keeps its blur and saturation, and skips the bend.
  const map = useSyncExternalStore(subscribeNone, mapIfSupported(filterId), () => null);
  const refract = map !== null;

  const Tag = as;
  const backdrop = refract ? { backdropFilter: `url(#${filterId}) blur(0.6px) saturate(170%)` } : undefined;
  const s = displacement;

  return <Tag className={`liquid-glass ${className}`} href={href} target={target} rel={rel}>
    {refract && map && <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feImage href={map} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={s} xChannelSelector="R" yChannelSelector="G" result="dR" />
          <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="R" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={s * 0.93} xChannelSelector="R" yChannelSelector="G" result="dG" />
          <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="G" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={s * 0.86} xChannelSelector="R" yChannelSelector="G" result="dB" />
          <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="B" />
          <feComposite in="R" in2="G" operator="arithmetic" k2="1" k3="1" result="RG" />
          <feComposite in="RG" in2="B" operator="arithmetic" k2="1" k3="1" />
        </filter>
      </defs>
    </svg>}
    {underlay && <div className="lg-underlay">{underlay}</div>}
    <div className="lg-backdrop" style={backdrop} />
    <div className="lg-sheen" />
    <div className="lg-content">{children}</div>
  </Tag>;
}
