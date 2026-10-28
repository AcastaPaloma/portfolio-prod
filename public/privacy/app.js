// Live research dashboard for privacy-preserving video. Fetches dashboard.json (written by the research loop
// about every 15 minutes) every two minutes and on demand, then draws the selected run's results on the left
// and the experiment tree, the machines and the research journal on the right.
import { lineChart, scatterChart } from './charts.js?v=20261027-d';
import { renderMarkdown, esc } from './markdown.js?v=20261027-d';
import { addSplitter } from './splitter.mjs?v=20261027-d';

const DATA_URL = 'https://raw.githubusercontent.com/AcastaPaloma/openlatent/privacy-research/research/privacy-obfuscation/results/dashboard.json';
const REFRESH_MS = 2 * 60 * 1000;
const TABS = ['experiments', 'live', 'journal'];
const VIEWS = ['results', 'figures', 'motion'];

const C = { action: '#3b5bb5', frame: '#b8860b', video: '#b0472c', entropy: '#2f7d4f', sigma: '#7a5c99', grey: '#8b8b84', extra: ['#4f8a9e', '#a0527a', '#6b6b2f', '#c06a2b'] };
const FAMILY_COLORS = { raw: '#1a1a1a', controls: '#8b8b84', 'fixed filters': '#b8860b', 'person removal': '#7a5c99', 'BDQ (learned)': '#3b5bb5', '3D U-Net (learned)': '#2f7d4f', 'frozen VAE + latent edit': '#b0472c' };
const DATASETS = {
  kth: { name: 'KTH', privacy: 'identity top-1', privacyLong: 'identity top-1 (which of 25 people)', floorLabel: 'chance', classes: ['boxing', 'handclapping', 'handwaving', 'jogging', 'running', 'walking'] },
  ucf101_vp: { name: 'VP-UCF101', privacy: 'attribute cMAP', privacyLong: 'attribute cMAP over five private attributes', floorLabel: 'blind floor', attrs: ['face', 'skin colour', 'gender', 'nudity', 'relationship'] },
  charades: { name: 'Charades', privacy: 'identity top-1', privacyLong: 'identity top-1 (which of 90 people, filmed in their own homes)', floorLabel: 'chance', action: 'action mAP (157 classes)' },
  utdmhad: { name: 'UTD-MHAD', privacy: 'identity top-1', privacyLong: 'identity top-1 (which of 8 people; one lab, but each person recorded in a separate session)', floorLabel: 'chance' },
  hmdb51_vp: { name: 'VP-HMDB51', privacy: 'attribute cMAP', privacyLong: 'attribute cMAP over five private attributes', floorLabel: 'blind floor', attrs: ['face', 'skin colour', 'gender', 'nudity', 'relationship'] },
};
const dsInfo = ds => DATASETS[ds] ?? { name: ds ?? 'unknown', privacy: 'privacy', privacyLong: 'privacy score', floorLabel: 'floor' };
const SPLITS = { ilic: 'Ilic split', scenario: 'scenario split', seq: 'sequence split', s1: 'split 1' };
const ANON = { raw: 'raw video', blur: 'Gaussian blur', down: 'downsample', pixelate: 'pixelate', diff: 'frame difference', bdq: 'BDQ (learned)', bdq_fixed: 'fixed BDQ',
  unet3d: '3D U-Net (learned)', vae_latent: 'frozen VAE + latent edit', bg_median: 'scene only (temporal median)', fg_only: 'person only (foreground mask)', person_box: 'person box' };
const MODELS = { r2p1d: ['video', 'R(2+1)D-18'], r3d: ['video', 'R3D-18'], frame_r50: ['frame', 'ResNet-50'], frame_r18: ['frame', 'ResNet-18'] };
const TASKS = { action: 'Action', person: 'Identity', attr: 'Attributes' };

const $ = id => document.getElementById(id);
const finite = v => typeof v === 'number' && Number.isFinite(v);
const fmt = (v, d = 1) => finite(v) ? v.toFixed(d) : '–';
const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

const state = { data: null, sig: '', tab: 'experiments', run: null, view: 'results', auto: true, fetching: false, error: null, checked: 0, closed: new Set(), figures: [], figIndex: 0 };

/* ---------- labels ---------- */
function model(name) {
  const known = MODELS[name];
  if (known) return { kind: known[0], net: known[1] };
  const kind = /frame|dino|vit|clip|r18|r50/i.test(name) ? 'frame' : 'video';
  return { kind, net: name.replace(/^frame_/, '').replace(/_/g, ' ').replace(/dinov2/i, 'DINOv2') };
}
function attacker(key) {
  const [task, name = ''] = key.split('/');
  const m = model(name);
  return { key, task, name, taskLabel: TASKS[task] ?? task, kind: task === 'action' ? 'action' : m.kind, net: m.net, isAction: task === 'action' };
}
function attackerColor(a, index = 0) {
  if (a.isAction) return C.action;
  if (index > 0) return C.extra[(index - 1) % C.extra.length];
  return a.kind === 'frame' ? C.frame : C.video;
}
// Colours keyed by attacker so the same model keeps its colour in every chart of a run.
function colorMap(keys) {
  const seen = { frame: 0, video: 0 }, out = {};
  for (const key of keys) {
    const a = attacker(key);
    if (a.isAction) { out[key] = C.action; continue; }
    out[key] = attackerColor(a, seen[a.kind]++);
  }
  return out;
}
const advColor = (name, i) => { const m = model(name); return i < 2 ? (m.kind === 'frame' ? C.frame : C.video) : C.extra[i % C.extra.length]; };
const prettySplit = s => s ? (SPLITS[s] ?? `${s} split`) : '';
const num = v => typeof v === 'number' ? (Math.abs(v) < 0.01 && v !== 0 ? v.toExponential(0) : String(+v.toPrecision(4))) : String(v);
function prettyFigure(name) {
  const isGallery = /^gallery_/.test(String(name));
  let base = String(name).replace(/\.png$/i, '').replace(/^gallery_/, '');
  const ds = Object.keys(DATASETS).sort((a, b) => b.length - a.length).find(k => base.startsWith(`${k}_`));
  if (!ds) return base.replace(/_/g, ' ');
  base = base.slice(ds.length + 1).replace(/^(\w+?)_v_\1_/, '$1 ');
  if (isGallery) return `${dsInfo(ds).name} · all runs, page ${base.slice(ds.length + 1)}`;
  return `${dsInfo(ds).name} · ${base.replace(/_/g, ' ')}`;
}
function relTime(iso) {
  const t = typeof iso === 'number' ? iso : Date.parse(iso);
  if (!Number.isFinite(t)) return 'unknown';
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 10) return 'just now';
  if (s < 60) return `${s} s ago`;
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) { const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return m ? `${h} h ${m} min ago` : `${h} h ago`; }
  return new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
// UTC, to match the log lines and the journal.
const clock = iso => { const d = new Date(iso); return Number.isNaN(+d) ? '' : `${d.toISOString().slice(11, 16)} UTC`; };

/* ---------- data helpers ---------- */
const runs = () => state.data?.runs ?? {};
const runList = () => Object.entries(runs()).map(([name, r]) => ({ ...r, name: r.name ?? name }));
function treeIndex() {
  const idx = {};
  for (const phase of state.data?.tree ?? []) for (const fam of phase.families ?? []) for (const n of fam.runs ?? []) idx[n] = { phase: phase.phase, family: fam.family };
  return idx;
}
function hostState() {
  const failed = {}, pending = {}, running = {};
  for (const h of state.data?.live?.hosts ?? []) {
    for (const n of h.failed ?? []) failed[n] = h.name;
    for (const n of h.pending ?? []) pending[n] = h.name;
    for (const j of h.running ?? []) running[j.name] = { host: h.name, last_line: j.last_line };
  }
  return { failed, pending, running };
}
function statusOf(r, hs) {
  if (r.status === 'done') return 'done';
  if (r.status === 'running') return 'running';
  if (hs.failed[r.name] || r.status === 'failed') return 'failed';
  if (hs.pending[r.name]) return 'pending';
  return r.status || 'unknown';
}
const mainSplit = ds => {
  const counts = {};
  for (const r of runList()) if (r.dataset === ds && r.status === 'done') counts[r.split] = (counts[r.split] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
};
function rawFor(r) {
  const raws = runList().filter(x => x.status === 'done' && x.dataset === r.dataset && x.config?.anonymizer?.type === 'raw');
  return raws.find(x => x.split === r.split) ?? raws.find(x => x.split === mainSplit(r.dataset)) ?? raws[0];
}
function progress(line) {
  const m = /\[([a-z_]+)\]\s+epoch\s+(\d+)\/(\d+)/i.exec(line ?? '');
  if (!m) return null;
  const stage = { adv: 'adversarial training', action: 'action model', person: 'identity attacker', attr: 'attribute attacker' }[m[1]] ?? m[1];
  return { stage, epoch: +m[2], of: +m[3] };
}
function quietMinutes(line, liveTime) {
  const m = /^\[(\d\d):(\d\d):(\d\d)\]/.exec(line ?? ''), t = new Date(liveTime);
  if (!m || Number.isNaN(+t)) return null;
  const now = t.getUTCHours() * 3600 + t.getUTCMinutes() * 60 + t.getUTCSeconds();
  let diff = now - (+m[1] * 3600 + +m[2] * 60 + +m[3]);
  if (diff < -300) diff += 86400;
  return Math.round(diff / 60);
}

/* ---------- hash state ---------- */
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  state.run = p.get('run') || null;
  state.tab = TABS.includes(p.get('tab')) ? p.get('tab') : state.tab;
  state.view = VIEWS.includes(p.get('view')) ? p.get('view') : 'results';
}
function writeHash() {
  const p = new URLSearchParams();
  if (state.run) p.set('run', state.run);
  if (state.tab !== 'experiments') p.set('tab', state.tab);
  if (state.view !== 'results') p.set('view', state.view);
  const next = p.toString();
  if (location.hash.slice(1) !== next) history.replaceState(null, '', next ? `#${next}` : location.pathname + location.search);
}
function selectRun(name, { scroll = true } = {}) {
  state.run = name; state.view = 'results'; writeHash();
  renderStage(); renderTreeSelection(); renderJobsSelection();
  if (scroll) $('stage').scrollTo({ top: 0 });
}

/* ---------- fetching ---------- */
async function load() {
  if (state.fetching) return;
  state.fetching = true; renderSync();
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json || typeof json !== 'object' || typeof json.runs !== 'object') throw new Error('unexpected data');
    state.error = null; state.checked = Date.now();
    const sig = `${json.generated}|${json.live?.time}`;
    if (sig !== state.sig || !state.data) {
      const first = !state.data;
      state.data = json; state.sig = sig; renderAll();
      // On the first load of a shared link, bring the selected run's row into view in the tree.
      if (first && state.run) document.querySelector(`.run[aria-current=true]`)?.scrollIntoView({ block: 'center' });
    }
  } catch (err) {
    state.error = err; state.checked = Date.now();
    if (!state.data) renderStage();
  } finally {
    state.fetching = false; renderSync();
  }
}

/* ---------- sync indicator and header ---------- */
function renderSync() {
  const sync = $('sync');
  sync.classList.toggle('is-fetching', state.fetching);
  sync.classList.toggle('is-error', !!state.error && !state.fetching);
  sync.classList.toggle('is-paused', !state.auto && !state.error && !state.fetching);
  const gen = state.data?.generated;
  $('sync-label').textContent = state.fetching ? 'updating…' : state.error ? (gen ? `offline · ${relTime(gen)}` : 'offline') : gen ? `updated ${relTime(gen)}` : 'loading';
  $('refresh').disabled = state.fetching;
  const status = $('status');
  if (!state.data) { status.innerHTML = state.error ? `<span class="is-error">Couldn’t load the results (${esc(state.error.message)}).</span>` : 'Loading the latest results…'; return; }
  status.innerHTML = `Results written by the research loop at <b>${esc(clock(gen))}</b> (${esc(relTime(gen))}); checked ${esc(relTime(state.checked))}. `
    + (state.error ? `<span class="is-error">The last check failed (${esc(state.error.message)}); showing the copy above.</span> ` : '')
    + `${state.auto ? 'Refreshing every 2 minutes' : 'Auto-refresh paused'} · <button type="button" class="link-button" data-action="toggle-auto">${state.auto ? 'Pause' : 'Resume'}</button> · <button type="button" class="link-button" data-action="refresh">Refresh now</button>`;
}

/* ---------- right panel: tabs ---------- */
function setTab(tab, focus = false) {
  state.tab = tab; writeHash();
  for (const t of TABS) {
    const b = $(`tab-${t}`), on = t === tab;
    b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
    $(`panel-${t}`).hidden = !on;
  }
  if (focus) $(`tab-${tab}`).focus();
  $('reader').scrollTo({ top: 0 });
}

/* ---------- right panel: experiments tree ---------- */
function renderExperiments() {
  const hs = hostState(), all = runList();
  const done = all.filter(r => r.status === 'done').length, running = all.filter(r => r.status === 'running').length;
  const ref = state.data.reference ?? {};
  const rawK = ref.raw?.kth, floorK = ref.floor?.kth, rawU = ref.raw?.ucf101_vp, floorU = ref.floor?.ucf101_vp;
  let html = `<section class="reading-block">
    <p class="lede">Each run hides something in video, then attackers try to recover who is in it while an action model checks the video is still useful. On KTH the attackers name which of 25 people is filmed (chance ${fmt(floorK, 0)}%, raw video ${fmt(rawK)}%); on VP-UCF101 they predict five private attributes (cMAP: blind floor ${fmt(floorU)}, raw ${fmt(rawU)}). Pick a run to see its numbers, curves and where it sits on the trade-off.</p>
    <div class="protocol">
      <p><b>Strong</b> attackers are retrained on the obfuscated video. This is the protocol that matters: a real adversary adapts.</p>
      <p><b>Weak</b> attackers are trained on raw video and only tested on the obfuscated video. They usually overstate privacy.</p>
    </div>
    <dl class="keys">
      <dt>action ↑</dt><dd>action top-1 % of a retrained R(2+1)D model</dd>
      <dt>privacy ↓</dt><dd>best retrained attacker: identity top-1 % (KTH) or attribute cMAP (VP-UCF101)</dd>
      <dt>leakage ↓</dt><dd>privacy rescaled: 100 = as leaky as raw video, 0 = blind guess</dd>
    </dl>
    <div class="tree-legend" aria-hidden="true"><span class="lg"><i class="dot"></i>done</span><span class="lg"><i class="dot is-running"></i>running</span><span class="lg"><i class="dot is-failed"></i>failed</span></div>
    <div class="tree-cols" aria-hidden="true"><span>run</span><span>action</span><span><i class="long">privacy</i><i class="short">priv.</i></span><span><i class="long">leakage</i><i class="short">leak</i></span></div>`;
  for (const phase of state.data.tree ?? []) {
    const pKey = `p:${phase.phase}`;
    const names = (phase.families ?? []).flatMap(f => f.runs ?? []);
    const nRunning = names.filter(n => runs()[n]?.status === 'running').length;
    html += `<details class="phase" data-key="${esc(pKey)}"${state.closed.has(pKey) ? '' : ' open'}><summary>${esc(phase.phase)}<span class="count">${names.length} runs${nRunning ? ` · ${nRunning} running` : ''}</span></summary>`;
    for (const fam of phase.families ?? []) {
      const fKey = `f:${phase.phase}/${fam.family}`;
      html += `<details class="family" data-key="${esc(fKey)}"${state.closed.has(fKey) ? '' : ' open'}><summary>${esc(fam.family)}<span class="count">${(fam.runs ?? []).length}</span></summary><ul class="runs">`;
      for (const n of fam.runs ?? []) html += runRow(n, runs()[n] ?? { name: n }, hs);
      html += '</ul></details>';
    }
    html += '</details>';
  }
  html += `<p class="tree-foot">${all.length} runs: ${done} done, ${running} running. Privacy is the best of the retrained attackers.</p></section>`;
  $('panel-experiments').innerHTML = html;
  renderTreeSelection();
}
function runRow(name, r, hs) {
  const st = statusOf({ ...r, name }, hs);
  const dot = `<i class="dot${st === 'done' ? '' : ` is-${st === 'pending' ? 'pending' : st === 'running' ? 'running' : 'failed'}`}" aria-hidden="true"></i>`;
  let cells = '', sub = '';
  if (st === 'done') {
    const leak = finite(r.leakage) ? r.leakage : null;
    cells = `<span class="run-num">${fmt(r.action)}</span><span class="run-num">${fmt(r.privacy)}</span><span class="leak-cell"><span class="run-num">${leak == null ? '–' : fmt(leak, 0)}</span><span class="leak"><i style="width:${clamp(leak ?? 0)}%"></i></span></span>`;
    if (hs.failed[name]) sub = `<span class="run-sub is-failed">a later attempt failed on ${esc(hs.failed[name])}</span>`;
  } else {
    cells = '<span></span><span></span><span></span>';
    const job = hs.running[name], line = job?.last_line ?? r.last_line;
    const p = progress(line);
    if (st === 'running') sub = `<span class="run-sub">${esc(r.host ?? job?.host ?? '')}${p ? ` · ${esc(p.stage)} epoch ${p.epoch}/${p.of}` : line ? ` · ${esc(line.replace(/^\[[\d:]+\]\s*/, ''))}` : ''}</span>`;
    else if (st === 'failed') sub = `<span class="run-sub is-failed">failed on ${esc(hs.failed[name] ?? 'a machine')}</span>`;
    else if (st === 'pending') sub = `<span class="run-sub">queued on ${esc(hs.pending[name])}</span>`;
  }
  const label = `${name}, ${st}${st === 'done' ? `, action ${fmt(r.action)}, privacy ${fmt(r.privacy)}` : ''}`;
  return `<li><button type="button" class="run" data-run="${esc(name)}" data-status="${esc(st)}" aria-label="${esc(label)}">${dot}<span class="run-name">${esc(name)}</span>${cells}${sub}</button></li>`;
}
function renderTreeSelection() {
  for (const b of document.querySelectorAll('.run[data-run]')) {
    if (b.dataset.run === state.run) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
  }
}

/* ---------- right panel: live machines ---------- */
function renderLive() {
  const live = state.data.live ?? {}, hosts = live.hosts ?? [];
  const nRun = hosts.reduce((s, h) => s + (h.running?.length ?? 0), 0), nPend = hosts.reduce((s, h) => s + (h.pending?.length ?? 0), 0), nFail = hosts.reduce((s, h) => s + (h.failed?.length ?? 0), 0);
  let html = `<section class="reading-block"><h2>Machines</h2><p class="lede">Snapshot taken at ${esc(clock(live.time))} (${esc(relTime(live.time))}): ${hosts.length} machine${hosts.length === 1 ? '' : 's'}, ${nRun} job${nRun === 1 ? '' : 's'} running, ${nPend} queued, ${nFail} failed.</p>`;
  if (!hosts.length) html += '<p class="muted">No machines reported in this snapshot.</p>';
  for (const h of hosts) {
    const util = parseFloat(String(h.gpu ?? '').split('%')[0]);
    html += `<div class="host"><div class="host-head"><span class="host-name">${esc(h.name)}</span><span class="gpu">${finite(util) ? `<span class="gpu-bar" aria-hidden="true"><i style="width:${clamp(util)}%"></i></span>` : ''}GPU ${esc(h.gpu ?? 'n/a')}</span></div>`;
    if (h.running?.length) {
      html += '<ul class="jobs">';
      for (const j of h.running) {
        const p = progress(j.last_line), quiet = quietMinutes(j.last_line, live.time);
        html += `<li class="job" data-run="${esc(j.name)}"><div class="job-head"><button type="button" class="job-name" data-run="${esc(j.name)}">${esc(j.name)}</button>`
          + `${p ? `<span class="job-stage">${esc(p.stage)} · epoch ${p.epoch}/${p.of}</span>` : ''}${quiet != null && quiet >= 20 ? `<span class="job-quiet">no new log line for ${quiet >= 90 ? `${Math.floor(quiet / 60)} h ${quiet % 60} min` : `${quiet} min`}</span>` : ''}</div>`
          + `${p ? `<span class="job-progress" aria-hidden="true"><i style="width:${clamp(p.epoch / p.of * 100)}%"></i></span>` : ''}`
          + `<code class="last-line">${esc(j.last_line ?? '')}</code></li>`;
      }
      html += '</ul>';
    } else html += '<p class="muted" style="font:13px/1.5 Arial,sans-serif;margin:0">Idle.</p>';
    const chips = (list, cls) => list.map(n => runs()[n] ? `<button type="button" class="chip ${cls}" data-run="${esc(n)}">${esc(n)}</button>` : `<span class="chip ${cls}">${esc(n)}</span>`).join('');
    if (h.pending?.length) html += `<p class="queue"><span class="queue-label">Queued</span>${chips(h.pending, 'is-pending')}</p>`;
    if (h.failed?.length) html += `<p class="queue"><span class="queue-label">Failed</span>${chips(h.failed, 'is-failed')}</p>`;
    html += '</div>';
  }
  html += '</section>';
  $('panel-live').innerHTML = html;
  renderJobsSelection();
}
function renderJobsSelection() {
  for (const b of document.querySelectorAll('.job-name')) b.style.fontStyle = b.dataset.run === state.run ? 'italic' : '';
}

/* ---------- right panel: journal ---------- */
function renderJournal() {
  const md = state.data.journal ?? '';
  const html = renderMarkdown(md, { runNames: Object.keys(runs()), shift: 1 });
  $('panel-journal').innerHTML = `<div class="journal-tools"><span>Hypotheses H1…Hn and dated findings, newest at the bottom. Run names link to their results.</span><button type="button" class="link-button" data-action="latest">Latest entry ↓</button></div><div class="journal" id="journal">${html || '<p class="muted">The journal is empty.</p>'}</div>`;
}

/* ---------- left stage ---------- */
function renderCrumbs(r) {
  const crumbs = $('crumbs');
  if (state.view === 'figures') { crumbs.innerHTML = `<span class="crumb-here">Figures · original vs every technique</span>`; return; }
  if (state.view === 'motion') { crumbs.innerHTML = `<span class="crumb-here">Motion · every technique as released, animated</span>`; return; }
  if (!r) { crumbs.innerHTML = '<span class="crumb-here">Overview · all runs</span>'; return; }
  crumbs.innerHTML = `<button type="button" class="crumb-parent" data-action="overview">Overview</button><span class="crumb-sep" aria-hidden="true">/</span><span class="crumb-here">${esc(r.name)}</span>`;
}
function renderStage() {
  const inner = $('stage-inner');
  $('view-results').setAttribute('aria-pressed', String(state.view === 'results'));
  $('view-figures').setAttribute('aria-pressed', String(state.view === 'figures'));
  $('view-motion').setAttribute('aria-pressed', String(state.view === 'motion'));
  if (!state.data) {
    renderCrumbs(null);
    inner.innerHTML = state.error
      ? `<p class="stage-note is-error">Couldn’t load the results (${esc(state.error.message)}). <button type="button" class="link-button" data-action="refresh">Try again</button></p>`
      : '<p class="stage-note">Loading the latest results…</p>';
    return;
  }
  const r = state.run && runs()[state.run] ? { ...runs()[state.run], name: state.run } : null;
  renderCrumbs(r);
  inner.replaceChildren();
  if (state.view === 'figures') return renderFiguresView(inner);
  if (state.view === 'motion') return renderMotionView(inner);
  if (!r) return renderOverview(inner);
  renderRun(inner, r);
}
function section(parent, title, note) {
  const s = document.createElement('section'); s.className = 'section';
  s.innerHTML = `<h3>${esc(title)}</h3>${note ? `<p class="section-note">${note}</p>` : ''}`;
  parent.append(s); return s;
}
function renderOverview(inner) {
  const all = runList(), hs = hostState();
  const done = all.filter(r => r.status === 'done'), running = all.filter(r => r.status === 'running');
  const hosts = state.data.live?.hosts?.length ?? 0;
  const head = document.createElement('header'); head.className = 'run-head';
  head.innerHTML = `<p class="run-label">Overview</p><h2 class="run-title">All experiments</h2>
    <p class="run-lede">${done.length} finished runs and ${running.length} running on ${hosts} machine${hosts === 1 ? '' : 's'}${Object.keys(hs.failed).length ? `; ${Object.keys(hs.failed).length} run${Object.keys(hs.failed).length === 1 ? '' : 's'} with a failed attempt` : ''}. Each dot below is a finished run: up is more useful video, left is more private. Click a dot, or a run on the right, to open it.</p>`;
  inner.append(head);
  for (const ds of datasets()) {
    const s = section(inner, `${dsInfo(ds).name}: action vs privacy`, scatterNote(ds));
    const fig = scatter(ds); if (fig) s.append(fig);
  }
  const figs = figuresFor(null);
  if (figs.length) {
    const s = section(inner, 'What the obfuscations look like', 'The same clip under every technique, with the learned models’ intermediate stages. Click to enlarge.');
    s.append(gallery(figs));
  }
}
function renderFiguresView(inner) {
  const head = document.createElement('header'); head.className = 'run-head';
  head.innerHTML = `<p class="run-label">Figures</p><h2 class="run-title">Original vs every obfuscation</h2><p class="run-lede">Each panel shows one clip from a dataset as raw video and under each technique, including the learned models’ intermediate stages. Click a panel to enlarge it.</p>`;
  inner.append(head);
  const figs = figuresFor(null);
  if (!figs.length) { inner.insertAdjacentHTML('beforeend', '<p class="stage-note">No figures in this snapshot.</p>'); return; }
  for (const ds of [...new Set(figs.map(f => f.dataset))]) {
    const s = section(inner, ds ? dsInfo(ds).name : 'Other');
    s.append(gallery(figs.filter(f => f.dataset === ds), true));
  }
}
function renderMotionView(inner) {
  const head = document.createElement('header'); head.className = 'run-head';
  head.innerHTML = `<p class="run-label">Motion</p><h2 class="run-title">Every obfuscation, as the attackers see it</h2><p class="run-lede">Each tile loops the same four test clips through one finished run's release path, frame for frame at the attackers' frame rate, 8-bit as released. Stills hide what the strongest attackers use: silhouettes and gait over time. Tiles are ordered from most to least leaky; the numbers are action accuracy and the best retrained attacker's privacy score. Click a tile to open the run.</p>`;
  inner.append(head);
  const g = state.data.gifs ?? {};
  const dss = Object.keys(g).filter(ds => g[ds]?.runs?.length);
  if (!dss.length) { inner.insertAdjacentHTML('beforeend', '<p class="stage-note">No animations in this snapshot yet.</p>'); return; }
  for (const ds of dss) {
    const info = dsInfo(ds), clips = (g[ds].clips ?? []).map(c => c.action).filter(Boolean);
    const s = section(inner, info.name, clips.length ? `Clips, left to right and top to bottom: ${esc(clips.join(', '))}.` : '');
    const grid = document.createElement('div'); grid.className = 'motion';
    for (const e of g[ds].runs) {
      if (!/^https:\/\//.test(e.url ?? '')) continue;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'motion-tile'; b.dataset.run = e.run;
      const img = document.createElement('img'); img.loading = 'lazy'; img.decoding = 'async'; img.src = e.url;
      img.alt = `${e.run}: four test clips after obfuscation, animated`;
      const split = e.split && !['ilic', 's1'].includes(e.split) ? ` · ${esc(prettySplit(e.split))}` : '';
      const cap = document.createElement('span');
      cap.innerHTML = `<b>${esc(e.run)}</b>${split}<br>action ${fmt(e.action)} · ${esc(info.privacy)} ${fmt(e.privacy)}${finite(e.leakage) ? ` · leak ${fmt(e.leakage, 0)}%` : ''}`;
      b.append(img, cap); grid.append(b);
    }
    s.append(grid);
  }
}
function datasets() {
  const ref = Object.keys(state.data.reference?.raw ?? {});
  const seen = [...new Set(runList().filter(r => r.status === 'done').map(r => r.dataset))];
  return [...new Set([...ref, ...seen])].filter(ds => runList().some(r => r.status === 'done' && r.dataset === ds));
}
function scatterNote(ds) {
  const ref = state.data.reference ?? {}, info = dsInfo(ds), split = mainSplit(ds);
  return `x: ${esc(info.privacyLong)} of the best retrained attacker (lower is more private); y: action top-1 %. Dashed lines: raw video ${fmt(ref.raw?.[ds])} and the ${esc(info.floorLabel)} ${fmt(ref.floor?.[ds])}. Filled dots use the ${esc(prettySplit(split) || 'main split')}; hollow dots another split.`;
}
function scatter(ds) {
  const ref = state.data.reference ?? {}, idx = treeIndex(), split = mainSplit(ds);
  const pts = runList().filter(r => r.status === 'done' && r.dataset === ds).map(r => {
    const fam = r.family ?? idx[r.name]?.family;
    return { name: r.name, x: r.privacy, y: r.action, family: fam, color: FAMILY_COLORS[fam] ?? C.grey, hollow: r.split !== split, extra: finite(r.leakage) ? `leakage ${fmt(r.leakage, 0)}%` : '' };
  });
  const fams = [...new Set(pts.map(p => p.family))];
  return scatterChart({
    title: '', points: pts, selected: state.run, onSelect: name => selectRun(name),
    refs: [{ x: ref.raw?.[ds], label: 'raw video' }, { x: ref.floor?.[ds], label: dsInfo(ds).floorLabel }],
    xLabel: `${dsInfo(ds).privacy} (%) of the best retrained attacker  ← more private`, yLabel: `${dsInfo(ds).action ?? 'action top-1'} (%) ↑`,
    legendItems: fams.map(f => ({ label: f ?? 'other', color: FAMILY_COLORS[f] ?? C.grey, kind: 'dot' })),
  });
}
function figuresFor(ds) {
  return (state.data.figures ?? []).map((f, i) => {
    const name = String(f.name ?? f.url ?? '');
    const bare = name.replace(/^gallery_/, '');
    const dataset = Object.keys(DATASETS).sort((a, b) => b.length - a.length).find(k => bare.startsWith(`${k}_`)) ?? null;
    return { url: f.url, name, label: prettyFigure(name), dataset, i };
  }).filter(f => /^https:\/\//.test(f.url ?? '') && (!ds || f.dataset === ds));
}
function gallery(figs, large = false) {
  const g = document.createElement('div'); g.className = `gallery${large ? ' is-large' : ''}`;
  for (const f of figs) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'thumb'; b.dataset.figure = String(f.i);
    const img = document.createElement('img'); img.loading = 'lazy'; img.decoding = 'async'; img.src = f.url; img.alt = `Side-by-side obfuscations: ${f.label}`;
    const cap = document.createElement('span'); cap.textContent = f.label;
    b.append(img, cap); g.append(b);
  }
  return g;
}

function configChips(r) {
  const cfg = r.config ?? {}, an = cfg.anonymizer ?? {}, adv = cfg.adv, ev = cfg.eval;
  const chips = [];
  const anonParams = Object.entries(an).filter(([k]) => k !== 'type').map(([k, v]) => `${k} ${num(v)}`).join(', ');
  chips.push(`<b>${esc(ANON[an.type] ?? an.type ?? 'unknown')}</b>${anonParams ? ` · ${esc(anonParams)}` : ''}`);
  if (adv) {
    const advs = [].concat(adv.adversary ?? []).map(a => { const m = model(a); return `${m.kind} ${m.net}`; });
    if (finite(adv.alpha)) chips.push(`privacy weight α <b>${num(adv.alpha)}</b>`);
    if (advs.length) chips.push(`trained against <b>${esc(advs.join(' + '))}</b>`);
    if (adv.epochs) chips.push(`<b>${num(adv.epochs)}</b> adversarial epochs`);
    if (adv.lr_f != null) chips.push(`lr <b>${esc(num(adv.lr_f))}</b>`);
    const rest = Object.entries(adv).filter(([k]) => !['alpha', 'adversary', 'epochs', 'lr_f', 'utility', 'batch', 'repeats'].includes(k));
    for (const [k, v] of rest) chips.push(`${esc(k.replace(/_/g, ' '))} ${esc(num(v))}`);
  }
  if (ev?.epochs) chips.push(`attackers trained <b>${num(ev.epochs)}</b> epochs`);
  if (cfg.seed != null) chips.push(`seed ${esc(num(cfg.seed))}`);
  if (finite(r.minutes)) chips.push(`${r.minutes >= 90 ? `${Math.floor(r.minutes / 60)} h ${Math.round(r.minutes % 60)} min` : `${Math.round(r.minutes)} min`}`);
  return `<div class="config">${chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>`;
}

function renderRun(inner, r) {
  const idx = treeIndex()[r.name] ?? {}, info = dsInfo(r.dataset), hs = hostState(), st = statusOf(r, hs);
  const ref = state.data.reference ?? {};
  const head = document.createElement('header'); head.className = 'run-head';
  const label = [idx.phase ?? r.phase, r.family ?? idx.family, [info.name, prettySplit(r.split)].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
  head.innerHTML = `<p class="run-label">${esc(label)}</p><h2 class="run-title">${esc(r.name)}</h2>${configChips(r)}`;
  inner.append(head);

  if (st !== 'done') {
    const job = hs.running[r.name], line = job?.last_line ?? r.last_line, p = progress(line);
    const s = section(inner, st === 'running' ? `Running on ${r.host ?? job?.host ?? 'a machine'}` : st === 'failed' ? 'Failed' : st === 'pending' ? 'Queued' : 'Not finished',
      st === 'running' ? 'Scores appear when the run finishes and its attackers have been retrained on the obfuscated video. The latest log line:' : '');
    if (p) s.insertAdjacentHTML('beforeend', `<p class="section-note">${esc(p.stage)} · epoch ${p.epoch} of ${p.of}</p><span class="job-progress"><i style="width:${clamp(p.epoch / p.of * 100)}%"></i></span>`);
    if (line) s.insertAdjacentHTML('beforeend', `<code class="last-line">${esc(line)}</code>`);
  } else {
    renderHeadline(inner, r, info, ref);
    renderAttackers(inner, r);
    renderDetails(inner, r, info);
    renderCurves(inner, r, info);
  }
  if (r.dataset && runList().some(x => x.status === 'done' && x.dataset === r.dataset)) {
    const s = section(inner, `Where it sits among ${info.name} runs`, scatterNote(r.dataset));
    const fig = scatter(r.dataset); if (fig) s.append(fig);
  }
  const figs = figuresFor(r.dataset);
  if (figs.length) {
    const s = section(inner, `${info.name} side by side`, 'Raw clips next to every obfuscation, including the learned models’ intermediate stages. Click to enlarge.');
    s.append(gallery(figs));
  }
}
function renderHeadline(inner, r, info, ref) {
  const raw = rawFor(r), rawRef = ref.raw?.[r.dataset], floor = ref.floor?.[r.dataset];
  const strongPriv = Object.entries(r.strong ?? {}).filter(([k]) => !attacker(k).isAction);
  const weakPriv = Object.entries(r.weak ?? {}).filter(([k]) => !attacker(k).isAction);
  const bestStrong = strongPriv.reduce((a, b) => (b[1] > (a?.[1] ?? -Infinity) ? b : a), null);
  const bestWeak = weakPriv.reduce((a, b) => (b[1] > (a?.[1] ?? -Infinity) ? b : a), null);
  const frame = strongPriv.filter(([k]) => attacker(k).kind === 'frame').sort((a, b) => b[1] - a[1])[0];
  const video = strongPriv.filter(([k]) => attacker(k).kind === 'video').sort((a, b) => b[1] - a[1])[0];
  const leak = r.leakage;
  const tiles = document.createElement('div'); tiles.className = 'tiles';
  tiles.innerHTML = `
    <div class="tile"><span class="tile-label">Action ↑</span><span class="tile-value">${fmt(r.action)}<small>%</small></span><span class="tile-note">top-1 of a retrained R(2+1)D${raw ? ` · raw video ${fmt(raw.action)}` : ''}</span></div>
    <div class="tile"><span class="tile-label">Privacy ↓</span><span class="tile-value">${fmt(r.privacy)}<small>${r.privacy_metric === 'cmap' ? ' cMAP' : '%'}</small></span><span class="tile-note">${esc(info.privacy)}, best retrained attacker · raw ${fmt(rawRef)} · ${esc(info.floorLabel)} ${fmt(floor)}</span></div>
    <div class="tile"><span class="tile-label">Leakage ↓</span><span class="tile-value">${fmt(leak, 0)}<small>%</small></span><div class="scale" aria-hidden="true"><i style="width:${clamp(leak ?? 0)}%"></i></div><span class="scale-ends"><span>0 blind guess</span><span>100 raw video</span></span></div>
    <div class="tile"><span class="tile-label">Frame vs video attacker</span><span class="tile-value">${fmt(frame?.[1])}<small> / </small>${fmt(video?.[1])}</span><span class="tile-note">retrained ${frame ? esc(attacker(frame[0]).net) : 'frame'} vs ${video ? esc(attacker(video[0]).net) : 'video'} attacker</span></div>`;
  inner.append(tiles);
  if (bestStrong && bestWeak) {
    const gap = bestStrong[1] - bestWeak[1];
    const p = document.createElement('p'); p.className = 'callout';
    const what = r.privacy_metric === 'cmap' ? 'attribute cMAP' : 'identity accuracy';
    p.innerHTML = `Attackers trained on raw video (weak) reach <b>${fmt(bestWeak[1])}</b> ${what}; retrained on this output (strong) they reach <b>${fmt(bestStrong[1])}</b>${
      Math.abs(gap) >= 1 ? `, so the weak protocol ${gap > 0 ? 'overstates' : 'understates'} privacy by ${fmt(Math.abs(gap))} points` : ', about the same'}.${
      frame && video && Math.abs(frame[1] - video[1]) >= 5 ? ` The ${frame[1] > video[1] ? 'frame' : 'video'} attacker recovers ${fmt(Math.abs(frame[1] - video[1]))} points more than the ${frame[1] > video[1] ? 'video' : 'frame'} attacker.` : ''}`;
    inner.append(p);
  }
}
function renderAttackers(inner, r) {
  const keys = [...new Set([...Object.keys(r.strong ?? {}), ...Object.keys(r.weak ?? {})])];
  if (!keys.length) return;
  keys.sort((a, b) => attacker(b).isAction - attacker(a).isAction);
  const raw = rawFor(r), isRaw = raw?.name === r.name;
  const s = section(inner, 'Strong vs weak attackers', '<b>Strong</b>: retrained on the obfuscated video (the protocol that matters). <b>Weak</b>: trained on raw video, tested on the obfuscated video. Bold marks the attacker that sets the privacy score.');
  const best = Object.entries(r.strong ?? {}).filter(([k]) => !attacker(k).isAction).sort((a, b) => b[1] - a[1])[0]?.[0];
  const colors = colorMap(keys);
  const bar = (v, c) => finite(v) ? `<span class="cell-bar"><i style="width:${clamp(v)}%;background:${c}"></i></span>` : '';
  let rows = '';
  for (const k of keys) {
    const a = attacker(k), c = colors[k];
    rows += `<tr><th scope="row"><span class="kind kind-${a.kind}">${esc(a.kind)}</span>${esc(a.taskLabel)} · ${esc(a.net)}</th>
      <td class="${k === best ? 'is-strong' : ''}">${fmt(r.strong?.[k])}${bar(r.strong?.[k], c)}</td><td>${fmt(r.weak?.[k])}${bar(r.weak?.[k], c)}</td>${isRaw ? '' : `<td>${fmt(raw?.strong?.[k])}</td>`}</tr>`;
  }
  const wrap = document.createElement('div'); wrap.className = 'table-wrap';
  wrap.innerHTML = `<table class="data-table"><thead><tr><th scope="col" style="text-align:left">attacker</th><th scope="col">strong · retrained</th><th scope="col">weak · raw-trained</th>${isRaw ? '' : `<th scope="col">raw video${raw ? '' : ' (n/a)'}</th>`}</tr></thead><tbody>${rows}</tbody></table>`;
  s.append(wrap);
}
function renderDetails(inner, r, info) {
  const d = r.details ?? {};
  const attrKeys = Object.keys(d).filter(k => Array.isArray(d[k]?.ap));
  if (attrKeys.length) {
    const names = info.attrs ?? d[attrKeys[0]].ap.map((_, i) => `attribute ${i + 1}`);
    const order = attrKeys.sort((a, b) => (a.startsWith('weak') - b.startsWith('weak')) || a.localeCompare(b));
    const s = section(inner, 'Per-attribute average precision', 'AP of each attacker per private attribute (higher means the attribute leaks). F1 is the macro F1 at a 0.5 threshold.');
    const head = order.map(k => { const [proto, ...rest] = k.split('/'); const a = attacker(rest.join('/')); return `<th scope="col">${esc(proto)}<br>${esc(a.kind)} ${esc(a.net)}</th>`; }).join('');
    const rows = names.map((n, i) => `<tr><th scope="row">${esc(n)}</th>${order.map(k => `<td>${fmt(d[k].ap[i])}</td>`).join('')}</tr>`).join('')
      + (order.some(k => finite(d[k].f1)) ? `<tr><th scope="row">macro F1</th>${order.map(k => `<td>${fmt(d[k].f1)}</td>`).join('')}</tr>` : '');
    const wrap = document.createElement('div'); wrap.className = 'table-wrap';
    wrap.innerHTML = `<table class="data-table"><thead><tr><th scope="col" style="text-align:left">attribute</th>${head}</tr></thead><tbody>${rows}</tbody></table>`;
    s.append(wrap);
  }
  const byKeys = Object.keys(d).filter(k => k.startsWith('strong/') && d[k]?.by_action);
  const nClasses = Math.max(0, ...byKeys.map(k => Object.keys(d[k].by_action).length));
  if (byKeys.length && nClasses && nClasses <= 12) {
    const classes = info.classes ?? [...Array(nClasses)].map((_, i) => `class ${i}`);
    byKeys.sort((a, b) => attacker(b.slice(7)).isAction - attacker(a.slice(7)).isAction);
    const colors = colorMap(byKeys.map(k => k.slice(7)));
    const s = section(inner, 'By action class (strong protocol)', 'Accuracy of each retrained model on the clips of each action. Identity that survives in some actions and not others points at what leaks it (gait shows in walking, jogging and running).');
    const head = byKeys.map(k => { const a = attacker(k.slice(7)); return `<th scope="col">${esc(a.taskLabel)}<br>${esc(a.kind)} ${esc(a.net)}</th>`; }).join('');
    const rows = classes.map((c, i) => `<tr><th scope="row">${esc(c)}</th>${byKeys.map(k => { const v = d[k].by_action[String(i)]; return `<td>${fmt(v)}<span class="cell-bar"><i style="width:${clamp(v ?? 0)}%;background:${colors[k.slice(7)]}"></i></span></td>`; }).join('')}</tr>`).join('');
    const wrap = document.createElement('div'); wrap.className = 'table-wrap';
    wrap.innerHTML = `<table class="data-table"><thead><tr><th scope="col" style="text-align:left">action</th>${head}</tr></thead><tbody>${rows}</tbody></table>`;
    s.append(wrap);
  }
}
function renderCurves(inner, r, info) {
  const hist = Array.isArray(r.adv_history) ? r.adv_history : [];
  const curves = r.curves ?? {};
  if (!hist.length && !Object.keys(curves).length) return;
  if (hist.length) {
    const s = section(inner, 'Adversarial training', 'The obfuscator is trained to keep the action model accurate while its adversaries fail; accuracies are on training batches. Rings mark the epochs the collapse guard kept.');
    const charts = document.createElement('div'); charts.className = 'charts';
    const kept = hist.filter(h => h.kept).map(h => h.epoch);
    const advNames = [...new Set(hist.flatMap(h => Object.keys(h.train_adv_accs ?? {})))];
    const accSeries = [{ label: 'action model', color: C.action, points: hist.map(h => ({ x: h.epoch, y: h.train_action_acc })), marks: kept }];
    if (advNames.length) advNames.forEach((n, i) => { const m = model(n); accSeries.push({ label: `${m.kind} adversary · ${m.net}`, color: advColor(n, i), points: hist.map(h => ({ x: h.epoch, y: h.train_adv_accs?.[n] })) }); });
    else accSeries.push({ label: 'adversary', color: C.video, points: hist.map(h => ({ x: h.epoch, y: h.train_adv_acc })) });
    const add = fig => fig && charts.append(fig);
    add(lineChart({ title: 'Training accuracy', note: 'Action should stay high; adversaries should fall.', series: accSeries, yLabel: '%' }));
    const maxEnt = r.privacy_metric === 'top1' && finite(state.data.reference?.floor?.[r.dataset]) ? Math.log(100 / state.data.reference.floor[r.dataset])
      : r.privacy_metric === 'cmap' ? (info.attrs?.length ?? 5) * Math.LN2 : null;
    add(lineChart({ title: 'Adversary entropy', note: 'Uncertainty of the adversary’s prediction; the dashed line is a blind guess.', series: [{ label: 'entropy (nats)', color: C.entropy, points: hist.map(h => ({ x: h.epoch, y: h.adv_entropy })) }],
      refs: maxEnt ? [{ y: maxEnt, label: `max ${maxEnt.toFixed(2)}` }] : [], yFmt: v => v.toFixed(2) }));
    add(lineChart({ title: 'Losses', series: [{ label: 'action loss', color: C.action, points: hist.map(h => ({ x: h.epoch, y: h.action_loss })) }, { label: 'adversary loss', color: C.video, points: hist.map(h => ({ x: h.epoch, y: h.adv_loss })) }], yFmt: v => v.toFixed(3) }));
    if (hist.some(h => finite(h.sigma))) add(lineChart({ title: 'BDQ blur σ', note: 'The learned Gaussian blur width.', series: [{ label: 'σ', color: C.sigma, points: hist.map(h => ({ x: h.epoch, y: h.sigma })) }], yFmt: v => v.toFixed(2) }));
    s.append(charts);
  }
  const keys = Object.keys(curves).filter(k => Array.isArray(curves[k]) && curves[k].length);
  if (keys.length) {
    const s = section(inner, 'Evaluation models', 'Each attacker and the action model trained from scratch on this run’s output (strong). Dashed lines, where present, are the same models trained on clean video.');
    const charts = document.createElement('div'); charts.className = 'charts';
    const parts = keys.map(k => { const [proto, ...rest] = k.split(' '); return { k, proto, a: attacker(rest.join(' ')) }; });
    const colors = colorMap([...new Set(parts.map(p => p.a.key))]);
    const series = metric => parts.map(p => ({ label: `${p.proto === 'strong' ? '' : `${p.proto} · `}${p.a.taskLabel.toLowerCase()} ${p.a.kind === 'action' ? '' : `${p.a.kind} `}${p.a.net}`, color: colors[p.a.key], dash: p.proto === 'strong' ? null : '4 3',
      points: curves[p.k].map(e => ({ x: e.epoch, y: e[metric] })) }));
    for (const fig of [lineChart({ title: 'Accuracy', note: 'Training accuracy per epoch (% correct; attribute models count correct attribute decisions).', series: series('acc'), yLabel: '%' }),
      lineChart({ title: 'Loss', series: series('loss'), yFmt: v => v.toFixed(3) })]) if (fig) charts.append(fig);
    s.append(charts);
  }
}

/* ---------- lightbox ---------- */
function openFigure(i) {
  state.figures = figuresFor(null);
  const pos = state.figures.findIndex(f => f.i === i);
  if (pos < 0) return;
  state.figIndex = pos; showFigure();
  const box = $('lightbox');
  if (!box.open) box.showModal();
}
function showFigure() {
  const f = state.figures[state.figIndex];
  $('lightbox-img').src = f.url; $('lightbox-img').alt = `Side-by-side obfuscations: ${f.label}`;
  $('lightbox-title').textContent = `${f.label} (${state.figIndex + 1} of ${state.figures.length})`;
  $('lightbox-open').href = f.url;
}
function stepFigure(d) { if (!state.figures.length) return; state.figIndex = (state.figIndex + d + state.figures.length) % state.figures.length; showFigure(); }

/* ---------- wiring ---------- */
function renderAll() {
  if (state.run && !runs()[state.run]) state.run = null;
  renderExperiments(); renderLive(); renderJournal(); renderStage(); renderSync();
}
function onAction(action) {
  if (action === 'refresh') load();
  else if (action === 'toggle-auto') { state.auto = !state.auto; renderSync(); if (state.auto && Date.now() - state.checked > REFRESH_MS) load(); }
  else if (action === 'overview') { state.run = null; state.view = 'results'; writeHash(); renderStage(); renderTreeSelection(); renderJobsSelection(); }
  else if (action === 'latest') { const hs = $('journal')?.querySelectorAll('h4'); hs?.[hs.length - 1]?.scrollIntoView({ block: 'start' }); }
}
document.addEventListener('click', event => {
  const t = event.target.closest('[data-action],[data-run],[data-figure]');
  if (!t) return;
  if (t.dataset.action) { onAction(t.dataset.action); return; }
  if (t.dataset.figure != null) { openFigure(+t.dataset.figure); return; }
  if (t.dataset.run && (t.matches('button, a'))) { event.preventDefault(); selectRun(t.dataset.run); }
});
$('panel-experiments').addEventListener('toggle', event => {
  const key = event.target.dataset?.key; if (!key) return;
  if (event.target.open) state.closed.delete(key); else state.closed.add(key);
}, true);
$('refresh').addEventListener('click', () => load());
for (const t of TABS) $(`tab-${t}`).addEventListener('click', () => setTab(t));
document.querySelector('.page-tabs').addEventListener('keydown', event => {
  const i = TABS.indexOf(state.tab);
  const next = event.key === 'ArrowRight' ? (i + 1) % TABS.length : event.key === 'ArrowLeft' ? (i + TABS.length - 1) % TABS.length : event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : -1;
  if (next < 0) return;
  event.preventDefault(); setTab(TABS[next], true);
});
$('view-results').addEventListener('click', () => { state.view = 'results'; writeHash(); renderStage(); });
$('view-figures').addEventListener('click', () => { state.view = 'figures'; writeHash(); renderStage(); $('stage').scrollTo({ top: 0 }); });
$('view-motion').addEventListener('click', () => { state.view = 'motion'; writeHash(); renderStage(); $('stage').scrollTo({ top: 0 }); });
$('lightbox-close').addEventListener('click', () => $('lightbox').close());
$('lightbox-prev').addEventListener('click', () => stepFigure(-1));
$('lightbox-next').addEventListener('click', () => stepFigure(1));
$('lightbox').addEventListener('click', event => { if (event.target === $('lightbox')) $('lightbox').close(); });
$('lightbox').addEventListener('keydown', event => { if (event.key === 'ArrowLeft') stepFigure(-1); else if (event.key === 'ArrowRight') stepFigure(1); });
window.addEventListener('hashchange', () => { readHash(); setTab(state.tab); if (state.data) { renderStage(); renderTreeSelection(); renderJobsSelection(); } });
document.addEventListener('visibilitychange', () => { if (!document.hidden && state.auto && Date.now() - state.checked > REFRESH_MS) load(); });
setInterval(() => { if (state.auto && !document.hidden) load(); }, REFRESH_MS);
setInterval(() => { if (!state.data) return; renderSync(); if (state.tab === 'live') renderLiveTimes(); }, 15000);
function renderLiveTimes() {
  const p = $('panel-live').querySelector('.lede');
  if (p && state.data?.live?.time) p.textContent = p.textContent.replace(/\(([^)]*)\)/, `(${relTime(state.data.live.time)})`);
}

addSplitter($('workspace'), { name: 'privacy', label: 'Resize the results and reading panels' });
readHash(); setTab(state.tab);
load();
