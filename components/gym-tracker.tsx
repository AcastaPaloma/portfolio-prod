"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_EXERCISES, type GymWorkout } from "@/lib/gym";

type Entry = { workoutDate: string; exercise: string; weightLbs: string; reps: string; sets: string };
const today = () => new Date().toISOString().slice(0, 10);
const createEntry = (): Entry => ({ workoutDate: today(), exercise: "Flat bench press", weightLbs: "185", reps: "5", sets: "5" });

export function GymTracker() {
  const [password, setPassword] = useState("");
  const [entry, setEntry] = useState<Entry>(createEntry);
  const [workouts, setWorkouts] = useState<GymWorkout[]>([]);
  const [status, setStatus] = useState("Private log — enter your password to continue.");
  const [state, setState] = useState<"locked" | "ready" | "unconfigured">("locked");
  const [unlocking, setUnlocking] = useState(false);
  const [saving, setSaving] = useState(false);
  const logHeadingRef = useRef<HTMLHeadingElement>(null);

  const loadWorkouts = useCallback(async () => {
    try {
      const response = await fetch("/api/gym/logs", { cache: "no-store" });
      if (response.status === 401) { setState("locked"); setStatus("Private log — enter your password to continue."); return false; }
      if (response.status === 503) { setState("unconfigured"); setStatus("Add the Supabase and gym access values to enable production logging."); return false; }
      if (!response.ok) { setState("locked"); setStatus("The log could not load. Please try again."); return false; }
      const data = await response.json() as { workouts: GymWorkout[] };
      setWorkouts(data.workouts);
      setState("ready");
      setStatus(data.workouts.length ? `${data.workouts.length} logged sets` : "No sets yet — log the first one below.");
      return true;
    } catch {
      setState("locked");
      setStatus("The log could not load. Check your connection and try again.");
      return false;
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => { void loadWorkouts(); });
    return () => window.cancelAnimationFrame(frame);
  }, [loadWorkouts]);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnlocking(true);
    setStatus("Unlocking…");
    try {
      const response = await fetch("/api/gym/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) { setStatus(data.error ?? "The log could not be unlocked."); if (response.status === 503) setState("unconfigured"); return; }
      setPassword("");
      if (await loadWorkouts()) window.requestAnimationFrame(() => logHeadingRef.current?.focus());
    } catch {
      setStatus("The log could not be unlocked. Check your connection and try again.");
    } finally {
      setUnlocking(false);
    }
  };

  const saveWorkout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("Saving set…");
    try {
      const response = await fetch("/api/gym/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workoutDate: entry.workoutDate, exercise: entry.exercise, weightLbs: Number(entry.weightLbs), reps: Number(entry.reps), sets: Number(entry.sets) }),
      });
      const data = await response.json().catch(() => ({})) as { workout?: GymWorkout; error?: string };
      if (!response.ok || !data.workout) { setStatus(data.error ?? "That set could not be saved."); return; }
      const workout = data.workout;
      setWorkouts((current) => [workout, ...current]);
      setStatus("Saved to your private training log.");
      setEntry((current) => ({ ...current, reps: "", sets: "" }));
    } catch {
      setStatus("That set could not be saved. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const lockLog = async () => {
    try {
      const response = await fetch("/api/gym/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Could not lock the log.");
      setState("locked");
      setStatus("Private log — enter your password to continue.");
    } catch {
      setStatus("The log could not be locked. Check your connection and try again.");
    }
  };

  return (
    <section className="gym-tracker" aria-labelledby="gym-log-title">
      <header className="gym-tracker-header">
        <div><p>Training log</p><h1 id="gym-log-title">The work, counted.</h1></div>
        <Link href="/" className="gym-back-link">Back to résumé</Link>
      </header>

      {state === "unconfigured" ? <aside className="gym-setup" aria-live="polite"><h2>One small production setup remains.</h2><p>Add the four values in <code>.env.local</code>, run the included SQL in your Supabase SQL Editor, then restart the app.</p><code>SUPABASE_URL · SUPABASE_SERVICE_ROLE_KEY · GYM_ADMIN_PASSWORD · GYM_SESSION_SECRET</code></aside> : null}
      {state === "locked" ? (
        <form className="gym-unlock" onSubmit={unlock}>
          <label htmlFor="gym-password">Gym log password</label>
          <div><input id="gym-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={unlocking} required /><button type="submit" disabled={unlocking}>{unlocking ? "Unlocking…" : "Unlock"}</button></div>
          <p className="gym-status" aria-live="polite">{status}</p>
        </form>
      ) : null}
      {state === "ready" ? (
        <div className="gym-dashboard">
          <form className="gym-entry-form" onSubmit={saveWorkout}>
            <div className="gym-form-heading"><h2 ref={logHeadingRef} tabIndex={-1}>Log a working set</h2><p>Starting bench suggestion: 185 lb × 5, inferred from a 225 lb one-rep max. Edit anything—these are yours.</p></div>
            <label>Date<input type="date" value={entry.workoutDate} onChange={(event) => setEntry((current) => ({ ...current, workoutDate: event.target.value }))} required /></label>
            <label className="gym-exercise-field">Exercise<input list="gym-exercises" value={entry.exercise} onChange={(event) => setEntry((current) => ({ ...current, exercise: event.target.value }))} required /><datalist id="gym-exercises">{DEFAULT_EXERCISES.map((exercise) => <option key={exercise} value={exercise} />)}</datalist></label>
            <label>Weight / lb<input type="number" inputMode="decimal" min="0" max="2000" step="0.5" value={entry.weightLbs} onChange={(event) => setEntry((current) => ({ ...current, weightLbs: event.target.value }))} required /></label>
            <label>Reps<input type="number" min="1" max="100" value={entry.reps} onChange={(event) => setEntry((current) => ({ ...current, reps: event.target.value }))} required /></label>
            <label>Sets<input type="number" min="1" max="30" value={entry.sets} onChange={(event) => setEntry((current) => ({ ...current, sets: event.target.value }))} required /></label>
            <button type="submit" disabled={saving}>{saving ? "Saving…" : "Save set"}</button>
            <p className="gym-status" aria-live="polite">{status}</p>
          </form>
          <section className="gym-history" aria-labelledby="gym-history-title">
            <div className="gym-history-heading"><h2 id="gym-history-title">Recent work</h2><button type="button" onClick={() => void lockLog()}>Lock log</button></div>
            {workouts.length ? <ol>{workouts.map((workout) => <li key={workout.id}><time dateTime={workout.workoutDate}>{new Date(`${workout.workoutDate}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</time><strong>{workout.exercise}</strong><span>{workout.weightLbs} lb × {workout.reps} · {workout.sets} {workout.sets === 1 ? "set" : "sets"}</span></li>)}</ol> : <p className="gym-empty">Your first logged set will appear here.</p>}
          </section>
        </div>
      ) : null}
    </section>
  );
}
