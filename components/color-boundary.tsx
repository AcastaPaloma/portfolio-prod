"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export function ColorBoundary() {
  const [value, setValue] = useState(0);
  const position = useRef(0);
  const frame = useRef(0);
  const dragging = useRef(false);
  const interacted = useRef(false);
  const control = useRef<HTMLDivElement>(null);

  const apply = (next: number) => {
    position.current = Math.max(0, Math.min(100, next));
    const surface = control.current?.closest<HTMLElement>(".dither-page");
    surface?.style.setProperty("--split", `${position.current}%`);
    surface?.style.setProperty("--split-px", `${window.innerWidth*position.current/100}px`);
    window.dispatchEvent(new CustomEvent("portfolio-inversion",{detail:position.current/100}));
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  useEffect(() => {
    const surface = control.current?.closest<HTMLElement>(".dither-page");
    let resizeFrame = 0;
    let valueFrame = 0;
    // Resolve each ink gradient against the viewport without fixed backgrounds,
    // which mobile Safari does not consistently support. The paired globe follows the same boundary.
    const measure = () => {
      if (surface && !interacted.current) {
        // Let CSS place the initial boundary inside the empty left gutter.
        surface.style.removeProperty("--split");
        const initialLeft = surface.querySelector<HTMLElement>(".color-inversion")?.getBoundingClientRect().left ?? 0;
        position.current = initialLeft / window.innerWidth * 100;
        cancelAnimationFrame(valueFrame);
        valueFrame = requestAnimationFrame(() => setValue(Math.round(position.current)));
      }
      surface?.style.setProperty("--split-px", `${window.innerWidth*position.current/100}px`);
      surface?.querySelectorAll<HTMLElement>(".ink").forEach(element => {
        element.style.setProperty("--ink-left", `${element.getBoundingClientRect().left}px`);
      });
      window.dispatchEvent(new CustomEvent("portfolio-inversion", { detail: position.current / 100 }));
    };
    const resized = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("resize", resized);
    return () => { window.removeEventListener("resize", resized); cancelAnimationFrame(resizeFrame); cancelAnimationFrame(valueFrame); };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const next = event.clientX / window.innerWidth * 100;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(next));
  };
  const finish = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    cancelAnimationFrame(frame.current);
    if (event.type !== "pointercancel") apply(event.clientX / window.innerWidth * 100);
    dragging.current = false;
    setValue(Math.round(position.current));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const key = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -2, ArrowRight: 2, ArrowDown: -2, ArrowUp: 2, PageDown: -10, PageUp: 10 };
    if (!(event.key in steps) && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    interacted.current = true;
    apply(event.key === "Home" ? 0 : event.key === "End" ? 100 : position.current + steps[event.key]);
    setValue(Math.round(position.current));
  };

  return <>
    <div className="color-inversion" aria-hidden="true" />
    <div className="color-boundary" ref={control} role="slider" tabIndex={0}
      aria-label="Text and background inversion boundary" aria-orientation="horizontal"
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}
      aria-valuetext={`${100 - value} percent dark; text, helmet and handwriting follow the boundary; photo colors unchanged`}
      aria-describedby="color-boundary-help"
      onKeyDown={key}
      onPointerDown={(event) => { if (event.button !== 0) return; interacted.current = true; apply(position.current); dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.focus({ preventScroll: true }); }}
      onPointerMove={move} onPointerUp={finish} onPointerCancel={finish}
      onLostPointerCapture={() => { dragging.current = false; }}>
      <span className="boundary-line" />
      <span className="boundary-grip" aria-hidden="true"><svg viewBox="0 0 32 16"><path d="m8 4-4 4 4 4M24 4l4 4-4 4M13 3v10M19 3v10" /></svg></span>
      <span className="boundary-hint" id="color-boundary-help">drag to invert</span>
    </div>
  </>;
}
