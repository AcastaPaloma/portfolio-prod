// Success rates, Wilson intervals and paired McNemar tests, computed from every scored scene in data.js.
import {PAPER, RUNS, SEEDS, TASKS} from './data.js';

export {TASKS, SEEDS};
export const TASK_NAMES = {
  push_box: 'Push box', dual_buttons: 'Press buttons', bottle_fridge: 'Bottle in fridge', handover: 'Hand over item',
  handover_easy: 'Hand over (easy)', lift_ball: 'Lift ball', lift_tray: 'Lift tray', pick_laptop: 'Pick up laptop',
  pick_plate: 'Pick up plate', straighten_rope: 'Straighten rope', sweep_dustpan: 'Sweep into dustpan',
  tray_oven: 'Tray in oven', item_drawer: 'Item in drawer',
};
export const POLICIES = [
  {key: 'sa', name: 'SA', long: 'One agent for all arms', color: '#2a78d6'},
  {key: 'da', name: 'DA', long: 'Independent agents', color: '#eb6834'},
  {key: 'bic', name: 'BiCICLe', long: 'Leader-follower chain', color: '#1baf7a'},
];
export const POLICY = Object.fromEntries(POLICIES.map(p => [p.key, p]));
export const WORLDS = {
  rlbench: {name: "The paper's test", sub: '2 arms · RLBench, the paper\'s simulator'},
  twin: {name: 'TWIN-3', sub: '3 arms · demos with random pauses'},
  twin_regular: {name: 'No pauses', sub: '3 arms · TWIN-3 with the pauses removed'},
  triplet: {name: 'TRIPLET', sub: '3 arms · cameras, noise, randomised physics'},
};

export const ALL = [...PAPER.map(r => ({...r, paper: true})), ...RUNS];
export function getRun(world, model) {
  const r = ALL.find(x => x.world === world && x.model === model);
  if (!r) throw new Error(`no run ${world}/${model}`);
  return r;
}
export const runsIn = world => ALL.filter(r => r.world === world);

/** {k, n, p (percent), lo, hi}; paper runs only have the percentage. */
export function rate(run, policy, tasks = TASKS) {
  if (run.paper) {
    const p = tasks.reduce((s, t) => s + run.percent[policy][t], 0) / tasks.length;
    return {p, k: null, n: null, lo: null, hi: null};
  }
  let k = 0, n = 0;
  for (const t of tasks) { const s = run.scenes[policy][t]; k += [...s].filter(c => c === '1').length; n += s.length; }
  const [lo, hi] = wilson(k, n);
  return {k, n, p: 100 * k / n, lo, hi};
}

export function wilson(k, n, z = 1.96) {
  if (!n) return [0, 0];
  const p = k / n, d = 1 + z * z / n, c = (p + z * z / (2 * n)) / d;
  const h = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d;
  return [100 * Math.max(0, c - h), 100 * Math.min(1, c + h)];
}

function logChoose(n, k) {
  let s = 0;
  for (let i = 1; i <= k; i++) s += Math.log(n - k + i) - Math.log(i);
  return s;
}
/** Exact two-sided McNemar test: a scenes won only by one side, b only by the other. */
export function mcnemar(a, b) {
  const n = a + b;
  if (!n) return 1;
  const k = Math.min(a, b);
  let tail = 0;
  for (let i = 0; i <= k; i++) tail += Math.exp(logChoose(n, i) - n * Math.LN2);
  return Math.min(1, 2 * tail);
}

/** Scene-by-scene comparison of two runs on the same scenes (every world here shares its 13 tasks x 20 seeds). */
export function paired(runA, polA, runB, polB, tasks = TASKS) {
  const cells = [];
  let a = 0, b = 0, both = 0, neither = 0;
  for (const t of tasks) {
    const sa = runA.scenes[polA][t], sb = runB.scenes[polB][t];
    for (let i = 0; i < sa.length; i++) {
      const x = sa[i] === '1', y = sb[i] === '1';
      const c = x && y ? 'both' : x ? 'a' : y ? 'b' : 'neither';
      ({both: () => both++, a: () => a++, b: () => b++, neither: () => neither++})[c]();
      cells.push({task: t, seed: SEEDS[i], c});
    }
  }
  return {a, b, both, neither, p: mcnemar(a, b), cells};
}

export const pct = (x, d = 1) => `${x.toFixed(d)}%`;
export function pText(p) {
  if (p >= 0.01) return p.toFixed(2);
  if (p >= 0.001) return p.toFixed(3);
  const e = Math.floor(Math.log10(p));
  return `less than 1 in 10${superscript(-e - 1)}`;
}
const SUP = {'-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹'};
const superscript = n => String(n).split('').map(c => SUP[c]).join('');
