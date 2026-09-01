-- Run once in the Supabase SQL Editor before adding the production environment values.
-- Browser roles receive no table access; the service-role key stays in server Route Handlers.
create table if not exists public.gym_workouts (
  id uuid primary key default gen_random_uuid(),
  workout_date date not null,
  exercise text not null check (char_length(exercise) between 1 and 80),
  weight_lbs numeric(6, 2) not null check (weight_lbs >= 0 and weight_lbs <= 2000),
  reps integer not null check (reps between 1 and 100),
  sets integer not null check (sets between 1 and 30),
  created_at timestamptz not null default now()
);
create index if not exists gym_workouts_workout_date_idx on public.gym_workouts (workout_date desc, created_at desc);
alter table public.gym_workouts enable row level security;
revoke all on table public.gym_workouts from anon, authenticated;
