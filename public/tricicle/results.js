// The Results tab: summary charts, the per-task explorer and the scene-by-scene comparison of any two policies.
import {heatmap} from './charts.js';
import {dots, renderStage} from './stage.js';
import {ALL, POLICIES, POLICY, SEEDS, TASKS, WORLDS, getRun, rate, runsIn} from './stats.js';

const $ = id => document.getElementById(id);
$('n-attempts').textContent = (ALL.filter(r => !r.paper).length * POLICIES.length * TASKS.length * SEEDS.length).toLocaleString('en-US');
renderStage($('c-replica'), {type: 'chart', id: 'replica', sweepToggle: true});
renderStage($('c-models'), {type: 'chart', id: 'twin_models'});
renderStage($('c-pauses'), {type: 'chart', id: 'pauses'});
renderStage($('c-triplet'), {type: 'chart', id: 'triplet'});

// ---- explorer -------------------------------------------------------------------------------------------------------
let world = 'rlbench';
const picked = {};
function drawExplorer() {
  $('world-seg').innerHTML = Object.entries(WORLDS).map(([k, w]) =>
    `<button type="button" data-w="${k}" aria-pressed="${k === world}">${w.name}</button>`).join('');
  const runs = runsIn(world);
  picked[world] ??= new Set(runs.map(r => r.model));
  $('model-boxes').innerHTML = runs.map(r => `<label><input type="checkbox" data-m="${r.model}" ${picked[world].has(r.model) ? 'checked' : ''}> ${r.label}</label>`).join(' ');
  $('world-note').textContent = `${WORLDS[world].name}: ${WORLDS[world].sub}.` +
    (world === 'rlbench' ? ' Rows marked “paper” are the paper\'s published percentages; the rest I ran.' : '');
  const host = $('heat');
  host.replaceChildren();
  const show = runs.filter(r => picked[world].has(r.model));
  if (show.length) heatmap(host, show.map(r => ({run: r, label: r.label})));
  else host.innerHTML = '<p class="note">Pick at least one model.</p>';
}
$('world-seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { world = b.dataset.w; drawExplorer(); } });
$('model-boxes').addEventListener('change', e => {
  const m = e.target.dataset.m;
  e.target.checked ? picked[world].add(m) : picked[world].delete(m);
  drawExplorer();
});
drawExplorer();

// ---- compare any two ------------------------------------------------------------------------------------------------
const sides = {a: {world: 'twin_regular', model: 'qwen2.5-7b', policy: 'bic'}, b: {world: 'twin_regular', model: 'qwen2.5-7b', policy: 'sa'}};
const opt = (v, label, sel) => `<option value="${v}" ${v === sel ? 'selected' : ''}>${label}</option>`;
function drawSide(key) {
  const s = sides[key], el = $(`side-${key}`);
  const models = runsIn(s.world).filter(r => !r.paper);
  if (!models.some(r => r.model === s.model)) s.model = models[models.length - 1].model;
  el.querySelectorAll('label').forEach(x => x.remove());
  el.insertAdjacentHTML('beforeend', `
    <label class="sans" style="font-size:13px;color:#5a5a5a">World<select data-k="world">${Object.entries(WORLDS).map(([k, w]) => opt(k, w.name, s.world)).join('')}</select></label>
    <label class="sans" style="font-size:13px;color:#5a5a5a">Model<select data-k="model">${models.map(r => opt(r.model, r.label, s.model)).join('')}</select></label>
    <label class="sans" style="font-size:13px;color:#5a5a5a">Policy<select data-k="policy">${POLICIES.map(p => opt(p.key, `${p.name}: ${p.long.toLowerCase()}`, s.policy)).join('')}</select></label>`);
}
function describe(s) {
  return `${POLICY[s.policy].name}, ${getRun(s.world, s.model).label}, ${WORLDS[s.world].name}`;
}
function drawCompare() {
  drawSide('a');
  drawSide('b');
  const out = $('cmp-dots');
  out.replaceChildren();
  const A = sides.a, B = sides.b;
  if (A.world === B.world && A.model === B.model && A.policy === B.policy) {
    out.innerHTML = '<p class="note">A and B are the same. Change one of them.</p>';
    $('cmp-rates').replaceChildren();
    return;
  }
  if ((A.world === 'rlbench') !== (B.world === 'rlbench')) {
    out.innerHTML = '<p class="note">The paper\'s two-arm test and my three-arm worlds have different tasks, so their scenes don\'t pair up. Pick two from the same side.</p>';
    $('cmp-rates').replaceChildren();
    return;
  }
  dots(out, {a: [A.world, A.model, A.policy], b: [B.world, B.model, B.policy], labelA: 'A', labelB: 'B'});
  const ra = rate(getRun(A.world, A.model), A.policy), rb = rate(getRun(B.world, B.model), B.policy);
  const line = (tag, col, s, r) => `<div class="stat-card" style="border-left:4px solid ${col}"><div class="big num">${r.p.toFixed(1)}<small>%</small></div>
    <p><b style="color:#1a1a1a">${tag}</b> · ${describe(s)}<br>${r.k} of ${r.n} scenes · 95% interval ${r.lo.toFixed(0)}–${r.hi.toFixed(0)}%</p></div>`;
  $('cmp-rates').innerHTML = `<div class="cards" style="grid-template-columns:1fr">${line('A', '#2a78d6', A, ra)}${line('B', '#eb6834', B, rb)}</div>`;
}
for (const key of ['a', 'b']) {
  $(`side-${key}`).addEventListener('change', e => {
    const k = e.target.dataset.k;
    if (k) { sides[key][k] = e.target.value; drawCompare(); }
  });
}
drawCompare();
