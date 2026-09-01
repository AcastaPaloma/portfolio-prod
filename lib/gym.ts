export const DEFAULT_EXERCISES = [
  "Flat bench press", "Incline bench press", "Smith bench press", "Smith incline bench press", "Smith bicep curl", "Tricep extension", "Seated rows", "Lat pulldown", "Chest fly",
] as const;

export type GymWorkout = { id: string; workoutDate: string; exercise: string; weightLbs: number; reps: number; sets: number; createdAt: string };
export type GymWorkoutInput = Omit<GymWorkout, "id" | "createdAt">;
type GymWorkoutRow = { id: string; workout_date: string; exercise: string; weight_lbs: number | string; reps: number; sets: number; created_at: string };

function requiredEnvironment(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function databaseConfiguration() {
  return { url: requiredEnvironment("SUPABASE_URL").replace(/\/$/, ""), serviceRoleKey: requiredEnvironment("SUPABASE_SERVICE_ROLE_KEY") };
}

function mapWorkout(row: GymWorkoutRow): GymWorkout {
  return { id: row.id, workoutDate: row.workout_date, exercise: row.exercise, weightLbs: Number(row.weight_lbs), reps: row.reps, sets: row.sets, createdAt: row.created_at };
}

export function isGymDatabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function parseGymWorkout(value: unknown): GymWorkoutInput {
  if (!value || typeof value !== "object") throw new Error("A workout entry is required.");
  const input = value as Record<string, unknown>;
  const exercise = typeof input.exercise === "string" ? input.exercise.trim() : "";
  const workoutDate = typeof input.workoutDate === "string" ? input.workoutDate : "";
  const weightLbs = Number(input.weightLbs);
  const reps = Number(input.reps);
  const sets = Number(input.sets);
  if (!exercise || exercise.length > 80) throw new Error("Enter an exercise name of up to 80 characters.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(workoutDate) || Number.isNaN(Date.parse(`${workoutDate}T12:00:00Z`))) throw new Error("Choose a valid workout date.");
  if (!Number.isFinite(weightLbs) || weightLbs < 0 || weightLbs > 2000) throw new Error("Weight must be between 0 and 2,000 lb.");
  if (!Number.isInteger(reps) || reps < 1 || reps > 100) throw new Error("Reps must be a whole number between 1 and 100.");
  if (!Number.isInteger(sets) || sets < 1 || sets > 30) throw new Error("Sets must be a whole number between 1 and 30.");
  return { exercise, workoutDate, weightLbs, reps, sets };
}

export async function listGymWorkouts() {
  const { url, serviceRoleKey } = databaseConfiguration();
  const response = await fetch(`${url}/rest/v1/gym_workouts?select=id,workout_date,exercise,weight_lbs,reps,sets,created_at&order=workout_date.desc,created_at.desc`, { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` }, cache: "no-store" });
  if (!response.ok) throw new Error("Could not load workout entries.");
  return (await response.json() as GymWorkoutRow[]).map(mapWorkout);
}

export async function createGymWorkout(workout: GymWorkoutInput) {
  const { url, serviceRoleKey } = databaseConfiguration();
  const response = await fetch(`${url}/rest/v1/gym_workouts`, {
    method: "POST",
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({ workout_date: workout.workoutDate, exercise: workout.exercise, weight_lbs: workout.weightLbs, reps: workout.reps, sets: workout.sets }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not save that workout entry.");
  const [row] = await response.json() as GymWorkoutRow[];
  return mapWorkout(row);
}
