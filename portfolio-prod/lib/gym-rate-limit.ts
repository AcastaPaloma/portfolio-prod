const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

function recentAttempts(identifier: string, now = Date.now()) {
  const current = (attempts.get(identifier) ?? []).filter((attempt) => now - attempt < LOGIN_WINDOW_MS);
  if (current.length) attempts.set(identifier, current);
  else attempts.delete(identifier);
  return current;
}

export function gymLoginRetryAfter(identifier: string) {
  const current = recentAttempts(identifier);
  if (current.length < MAX_LOGIN_ATTEMPTS) return 0;
  return Math.max(1, Math.ceil((LOGIN_WINDOW_MS - (Date.now() - current[0])) / 1000));
}

export function recordFailedGymLogin(identifier: string) {
  const current = recentAttempts(identifier);
  current.push(Date.now());
  attempts.set(identifier, current);
}

export function clearGymLoginAttempts(identifier: string) {
  attempts.delete(identifier);
}
