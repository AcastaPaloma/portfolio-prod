"use client";

import { useEffect, useRef } from "react";

// The reference's floral film supplies the exact motion and texture. Its character
// field is reproduced below with the same spacing, waves, drift, and pointer pull.
export function GradientBackground() {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const film = video.current;
    const field = canvas.current;
    if (!film || !field) return;
    const context = field.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
    };
    const glyphs = [" ", ".", ":", "+", "*", "o", "O", "#"];
    let width = 0;
    let height = 0;
    let spacing = 22;
    let frame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let active = false;
    let disposed = false;

    const draw = () => {
      if (!context) return;
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      context.clearRect(0, 0, width, height);
      const columns = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      const radius = Math.min(width, height) * 0.24;
      const time = elapsed * 0.0012;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * spacing + (row % 2) * 5;
          const y = row * spacing + 8;
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / radius);
          const wave = Math.sin(x * 0.018 + time + row * 0.14)
            + Math.cos(y * 0.015 - time * 0.9 + column * 0.11);
          const driftX = Math.sin(time + row * 0.37 + column * 0.13) * 1.6;
          const driftY = Math.cos(time * 1.1 - row * 0.18 + column * 0.17) * 1.4;
          const pullX = distance > 0 ? (dx / distance) * influence * 9 : 0;
          const pullY = distance > 0 ? (dy / distance) * influence * 9 : 0;
          const intensity = (wave + 2) / 4 + influence * 0.9;
          const index = Math.min(glyphs.length - 1,
            Math.max(0, Math.floor(intensity * (glyphs.length - 1))));
          if (index === 0 && influence < 0.06) continue;
          context.fillStyle = influence > 0.18
            ? "rgba(80, 80, 80, 0.42)" : "rgba(90, 90, 90, 0.22)";
          context.globalAlpha = Math.min(0.7, 0.1 + influence * 0.5 + index * 0.045);
          context.fillText(glyphs[index], x + driftX + pullX, y + driftY + pullY);
        }
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      spacing = width < 720 ? 18 : 22;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      field.width = Math.floor(width * ratio);
      field.height = Math.floor(height * ratio);
      if (context) {
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `${width < 720 ? 12 : 13}px Menlo, Monaco, monospace`;
      }
      draw();
    };

    const render = (time: number) => {
      if (!active || disposed) return;
      if (time - lastFrame >= 1000 / 30) {
        elapsed += lastFrame ? Math.min(time - lastFrame, 100) : 0;
        lastFrame = time;
        draw();
      }
      frame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      active = false;
      window.cancelAnimationFrame(frame);
      lastFrame = 0;
      film.pause();
    };

    const update = () => {
      if (disposed) return;
      const shouldPlay = !document.hidden && !reduce.matches;
      if (!shouldPlay) { stop(); return; }
      void film.play().then(() => {
        if (disposed || document.hidden || reduce.matches) {
          stop();
          return;
        }
        if (!active) {
          active = true;
          frame = window.requestAnimationFrame(render);
        }
      }).catch(stop);
    };

    const move = (event: PointerEvent) => {
      if (!active) return;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
    };
    const leave = () => {
      pointer.targetX = width / 2;
      pointer.targetY = height / 2;
    };
    const error = () => {
      stop();
      // Keep the same grayscale-filtered poster visible if playback is unavailable.
      film.style.visibility = "hidden";
    };

    resize();
    update();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave, { passive: true });
    document.addEventListener("visibilitychange", update);
    reduce.addEventListener("change", update);
    film.addEventListener("error", error);
    return () => {
      disposed = true;
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", update);
      film.removeEventListener("error", error);
    };
  }, []);

  return <>
    <div className="gradient-backdrop" aria-hidden="true">
      <div className="gradient-film">
        <video ref={video} muted loop playsInline preload="none" tabIndex={-1}
          disablePictureInPicture disableRemotePlayback
          poster="/background/floral-blue-poster.webp">
          <source media="(max-width:48rem)" src="/background/floral-blue-small.mp4" type="video/mp4" />
          <source src="/background/floral-blue.mp4" type="video/mp4" />
        </video>
      </div>
      <canvas ref={canvas} className="gradient-details" />
    </div>
    <div className="gradient-shade" aria-hidden="true" />
  </>;
}
