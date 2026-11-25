// Grouped bar charts and per-task heatmaps, drawn as SVG/HTML with a hover (and keyboard focus) tooltip.
import {POLICIES, TASK_NAMES, TASKS, rate} from './stats.js';

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.append(e);
  return e;
};

export function legend(policies = POLICIES) {
  const d = document.createElement('div');
  d.className = 'legend';
  d.innerHTML = policies.map(p => `<span style="--c:${p.color}"><i></i>${p.name}: ${p.long.toLowerCase()}</span>`).join('');
  return d;
}

export function tooltip(host) {
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.setAttribute('role', 'status');
  host.append(tip);
  return {
    show(html, x, y) {
      tip.innerHTML = html;
      tip.classList.add('is-on');
      const hw = host.clientWidth, tw = tip.offsetWidth, th = tip.offsetHeight;
      tip.style.left = `${Math.max(0, Math.min(hw - tw, x - tw / 2))}px`;
      tip.style.top = `${Math.max(0, y - th - 12)}px`;
    },
    hide() { tip.classList.remove('is-on'); },
  };
}

function rateLine(r) {
  if (r.k == null) return `<b>${r.p.toFixed(1)}%</b> <span class="tip-sub">(paper's figure)</span>`;
  return `<b>${r.p.toFixed(1)}%</b> <span class="tip-sub">${r.k} of ${r.n} scenes<br>95% interval ${r.lo.toFixed(0)}–${r.hi.toFixed(0)}%</span>`;
}

/**
 * groups: [{label, sub, run, tasks?}] -> three bars each (SA, DA, BiCICLe). highlight: index of a group to keep at
 * full strength while the others dim.
 */
export function groupedBars(host, groups, {highlight = null, height = 300} = {}) {
  host.classList.add('chart');
  host.append(legend());
  const W = 640, H = height, top = 22, bottom = 46, left = 34, right = 6;
  const svg = el('svg', {viewBox: `0 0 ${W} ${H}`, role: 'img'});
  host.append(svg);
  const tip = tooltip(host);
  const plotH = H - top - bottom, y = v => top + plotH * (1 - v / 100);
  for (const v of [0, 20, 40, 60, 80, 100]) {
    el('line', {x1: left, x2: W - right, y1: y(v), y2: y(v), stroke: v ? '#e7e6e1' : '#b9b8b2', 'stroke-width': v ? 1 : 1.2}, svg);
    el('text', {x: left - 7, y: y(v) + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#5a5a5a'}, svg).textContent = v;
  }
  const gw = (W - left - right) / groups.length, bw = Math.min(46, gw / 3.8), gap = 2;
  const desc = [];
  groups.forEach((g, gi) => {
    const gx = left + gw * gi + gw / 2;
    const gEl = el('g', {class: highlight != null && highlight !== gi ? 'group-dim' : ''}, svg);
    POLICIES.forEach((p, pi) => {
      const r = rate(g.run, p.key, g.tasks);
      const x = gx + (pi - 1) * (bw + gap) - bw / 2, yy = y(r.p), h = y(0) - yy, rr = Math.min(4, h / 2);
      const path = `M${x},${y(0)} V${yy + rr} Q${x},${yy} ${x + rr},${yy} H${x + bw - rr} Q${x + bw},${yy} ${x + bw},${yy + rr} V${y(0)} Z`;
      const bar = el('path', {d: path, fill: p.color, class: 'bar', tabindex: 0,
        'aria-label': `${g.label}${g.sub ? ' ' + g.sub : ''}, ${p.name}: ${r.p.toFixed(1)} percent`}, gEl);
      el('text', {x: x + bw / 2, y: yy - 5, 'text-anchor': 'middle', 'font-size': 11.5, fill: '#1a1a1a'}, gEl).textContent = r.p.toFixed(0);
      const show = () => {
        const box = bar.getBoundingClientRect(), hb = host.getBoundingClientRect();
        tip.show(`<div>${g.label}${g.sub ? ` <span class="tip-sub">${g.sub}</span>` : ''}</div><div>${p.name} · ${p.long.toLowerCase()}</div>${rateLine(r)}`,
          box.left - hb.left + box.width / 2, box.top - hb.top);
      };
      bar.addEventListener('pointerenter', show);
      bar.addEventListener('focus', show);
      bar.addEventListener('pointerleave', () => tip.hide());
      bar.addEventListener('blur', () => tip.hide());
      desc.push(`${g.label} ${g.sub || ''} ${p.name} ${r.p.toFixed(1)}%`);
    });
    const t = el('text', {x: gx, y: H - bottom + 18, 'text-anchor': 'middle', 'font-size': 12.5, fill: '#1a1a1a'}, gEl);
    t.textContent = g.label;
    if (g.sub) el('text', {x: gx, y: H - bottom + 34, 'text-anchor': 'middle', 'font-size': 11.5, fill: '#5a5a5a'}, gEl).textContent = g.sub;
  });
  el('title', {}, svg).textContent = desc.join('; ');
  return host;
}

const shade = p => {                       // one hue, light -> dark (sequential), paper to the navy accent
  const a = [238, 241, 248], b = [31, 58, 138], t = Math.pow(p / 100, 0.9);
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
};

/** Per-task heatmap: columns are (run x policy). runs: [{run, label}]. */
export function heatmap(host, runs, {highlightTask = null, tasks = TASKS} = {}) {
  host.classList.add('heat-host');
  host.style.position = 'relative';
  const tip = tooltip(host);
  const table = document.createElement('table');
  table.className = 'heat';
  const head1 = `<tr><th class="task"></th>${runs.map((r, i) => `${i ? '<th class="gap"></th>' : ''}<th colspan="3">${r.label}</th>`).join('')}</tr>`;
  const head2 = `<tr><th class="task">Task</th>${runs.map((r, i) => `${i ? '<th class="gap"></th>' : ''}${POLICIES.map(p => `<th>${p.key === 'bic' ? 'BiC' : p.name}</th>`).join('')}`).join('')}</tr>`;
  const cell = (run, p, ts, label, foot) => {
    const r = rate(run, p.key, ts);
    const best = Math.max(...POLICIES.map(q => rate(run, q.key, ts).p));
    const dark = r.p > 58;
    const txt = foot ? r.p.toFixed(1) : r.p.toFixed(0);
    return `<td class="cell" tabindex="0" data-tip="${encodeURIComponent(`<div>${label} · ${ts.length === 1 ? TASK_NAMES[ts[0]] : 'all tasks'}</div><div>${p.name} · ${p.long.toLowerCase()}</div>${rateLine(r)}`)}"
      style="background:${shade(r.p)};color:${dark ? '#fff' : '#1a1a1a'};${Math.abs(r.p - best) < 1e-9 ? 'font-weight:700' : ''}">${txt}</td>`;
  };
  const rows = tasks.map(t => `<tr class="${t === highlightTask ? 'is-hl' : ''}"><td class="task">${TASK_NAMES[t]}</td>${runs.map((r, i) =>
    `${i ? '<td class="gap"></td>' : ''}${POLICIES.map(p => cell(r.run, p, [t], r.label)).join('')}`).join('')}</tr>`).join('');
  const foot = `<tr><td class="task">Average</td>${runs.map((r, i) => `${i ? '<td class="gap"></td>' : ''}${POLICIES.map(p => cell(r.run, p, tasks, r.label, true)).join('')}`).join('')}</tr>`;
  table.innerHTML = `<thead>${head1}${head2}</thead><tbody>${rows}</tbody><tfoot>${foot}</tfoot>`;
  host.append(table);
  const show = e => {
    const td = e.target.closest('td.cell');
    if (!td) return;
    const b = td.getBoundingClientRect(), hb = host.getBoundingClientRect();
    tip.show(decodeURIComponent(td.dataset.tip), b.left - hb.left + b.width / 2, b.top - hb.top + host.scrollTop);
  };
  table.addEventListener('pointerover', show);
  table.addEventListener('focusin', show);
  table.addEventListener('pointerleave', () => tip.hide());
  table.addEventListener('focusout', () => tip.hide());
  return host;
}
