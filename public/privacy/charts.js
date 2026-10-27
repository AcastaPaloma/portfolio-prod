// Small inline-SVG charts for the dashboard: line charts over epochs and the utility-vs-privacy scatter.
// Both follow the /pi/ loss chart: thin grid, grey Arial ticks, crosshair and a paper tooltip on hover.
const NS = 'http://www.w3.org/2000/svg';
export function svg(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) node.setAttribute(k, v);
  return node;
}
function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}
const finite = v => typeof v === 'number' && Number.isFinite(v);

function niceStep(span, count) {
  const raw = (span || 1) / count, mag = 10 ** Math.floor(Math.log10(raw)), norm = raw / mag;
  return (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
}
// Percent axes stay within [0, 100] when the data does.
function niceDomain(lo, hi, count = 4, pad = 0.04) {
  const pct = lo >= 0 && hi <= 100;
  if (lo === hi) { lo -= 1; hi += 1; }
  const p = (hi - lo) * pad; lo -= p; hi += p;
  const step = niceStep(hi - lo, count);
  lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
  if (pct) { lo = Math.max(0, lo); hi = Math.min(100, hi); }
  const ticks = [];
  for (let v = lo; v <= hi + step / 1e6; v += step) ticks.push(+v.toPrecision(12));
  return { lo, hi, ticks, step };
}
const tickText = (v, step) => step >= 1 ? String(Math.round(v)) : v.toFixed(Math.min(3, Math.ceil(-Math.log10(step))));

function swatch(color, dash, kind = 'line') {
  const s = svg('svg', { viewBox: '0 0 18 8', 'aria-hidden': 'true' });
  if (kind === 'dot') s.append(svg('circle', { cx: 9, cy: 4, r: 3.6, fill: color }));
  else if (kind === 'hollow') s.append(svg('circle', { cx: 9, cy: 4, r: 3.2, fill: 'none', stroke: color, 'stroke-width': 1.5 }));
  else if (kind === 'ring') s.append(svg('circle', { cx: 9, cy: 4, r: 3.4, fill: '#fbfbfa', stroke: color, 'stroke-width': 1.5 }));
  else s.append(svg('line', { x1: 0, x2: 18, y1: 4, y2: 4, stroke: color, 'stroke-width': 2, 'stroke-dasharray': dash || null }));
  return s;
}
function legend(items) {
  const box = el('div', 'legend');
  for (const it of items) { const s = el('span'); s.append(swatch(it.color, it.dash, it.kind), document.createTextNode(it.label)); box.append(s); }
  return box;
}
function placeTip(tip, plot, root, vx, vy, W) {
  const box = root.getBoundingClientRect(), host = plot.getBoundingClientRect();
  const k = box.width / W;
  const px = box.left - host.left + vx * k, py = box.top - host.top + vy * k;
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  let left = px + 12; if (left + tw > host.width) left = px - tw - 12; left = Math.max(0, left);
  let top = py - th - 10; if (top < 0) top = py + 12;
  tip.style.left = `${left}px`; tip.style.top = `${top}px`;
}

/* Line chart over epochs.
   series: [{label, color, dash, points:[{x,y}], marks:[x]}]; refs: [{y, label}] horizontal reference lines. */
export function lineChart({ title, note, series, refs = [], yFmt = v => v.toFixed(1), xLabel = 'epoch', yLabel = '', W = 360, H = 200 }) {
  series = series.filter(s => s.points?.some(p => finite(p.x) && finite(p.y)));
  if (!series.length) return null;
  const M = { l: 38, r: 12, t: 12, b: 30 };
  const xs = series.flatMap(s => s.points.map(p => p.x)).filter(finite);
  const ys = series.flatMap(s => s.points.map(p => p.y)).filter(finite).concat(refs.map(r => r.y).filter(finite));
  let x0 = Math.min(...xs), x1 = Math.max(...xs); if (x0 === x1) { x0 -= 0.5; x1 += 0.5; }
  const yd = niceDomain(Math.min(...ys), Math.max(...ys), 4);
  const X = v => M.l + (v - x0) / (x1 - x0) * (W - M.l - M.r);
  const Y = v => M.t + (1 - (v - yd.lo) / (yd.hi - yd.lo)) * (H - M.t - M.b);

  const fig = el('figure', 'chart');
  const cap = el('figcaption');
  cap.append(el('span', 'chart-title', title));
  if (note) cap.append(el('span', 'chart-note', note));
  cap.append(legend(series.map(s => ({ label: s.label, color: s.color, dash: s.dash })).concat(
    series.some(s => s.marks?.length) ? [{ label: 'kept checkpoint', color: '#1a1a1a', kind: 'ring' }] : [])));
  fig.append(cap);

  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${title}: ${series.map(s => s.label).join(', ')} by ${xLabel}` });
  for (const v of yd.ticks) {
    root.append(svg('line', { x1: M.l, x2: W - M.r, y1: Y(v), y2: Y(v), stroke: '#ebebe6' }));
    const t = svg('text', { x: M.l - 6, y: Y(v) + 3.5, 'text-anchor': 'end' }); t.textContent = tickText(v, yd.step); root.append(t);
  }
  const xstep = Math.max(1, niceStep(x1 - x0, 5));
  for (let v = Math.ceil(x0 / xstep) * xstep; v <= x1 + 1e-9; v += xstep) {
    const t = svg('text', { x: X(v), y: H - M.b + 14, 'text-anchor': 'middle' }); t.textContent = String(Math.round(v)); root.append(t);
  }
  const xl = svg('text', { x: W - M.r, y: H - 2, 'text-anchor': 'end', class: 'axis-label' }); xl.textContent = xLabel; root.append(xl);
  if (yLabel) { const yl = svg('text', { x: M.l, y: M.t - 2, class: 'axis-label' }); yl.textContent = yLabel; root.append(yl); }
  root.append(svg('line', { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, stroke: '#d8d8d4' }));
  for (const r of refs) {
    if (!finite(r.y)) continue;
    root.append(svg('line', { x1: M.l, x2: W - M.r, y1: Y(r.y), y2: Y(r.y), stroke: '#8b8b84', 'stroke-dasharray': '3 3' }));
    const t = svg('text', { x: W - M.r, y: Y(r.y) - 4, 'text-anchor': 'end', class: 'ref-label' }); t.textContent = r.label; root.append(t);
  }
  for (const s of series) {
    const pts = s.points.filter(p => finite(p.x) && finite(p.y)).sort((a, b) => a.x - b.x);
    root.append(svg('path', { d: pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`).join(''), fill: 'none', stroke: s.color,
      'stroke-width': 1.8, 'stroke-dasharray': s.dash || null, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    if (pts.length <= 24) for (const p of pts) root.append(svg('circle', { cx: X(p.x), cy: Y(p.y), r: 1.8, fill: s.color }));
    for (const mx of s.marks || []) {
      const p = pts.find(q => q.x === mx); if (!p) continue;
      root.append(svg('circle', { cx: X(p.x), cy: Y(p.y), r: 4.2, fill: '#fbfbfa', stroke: '#1a1a1a', 'stroke-width': 1.4 }));
    }
  }
  // hover: crosshair, dots and a tooltip with every series at the nearest epoch
  const allX = [...new Set(xs)].sort((a, b) => a - b);
  const cross = svg('line', { y1: M.t, y2: H - M.b, stroke: '#1a1a1a33', visibility: 'hidden' });
  const dots = series.map(s => svg('circle', { r: 3.4, fill: s.color, stroke: '#fbfbfa', 'stroke-width': 1.6, visibility: 'hidden' }));
  const hit = svg('rect', { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b, fill: 'transparent' });
  root.append(cross, ...dots, hit);
  const plot = el('div', 'chart-plot'); plot.append(root);
  const tip = el('div', 'tip'); tip.hidden = true; plot.append(tip);
  const hide = () => { tip.hidden = true; cross.setAttribute('visibility', 'hidden'); dots.forEach(d => d.setAttribute('visibility', 'hidden')); };
  hit.addEventListener('pointermove', event => {
    const box = root.getBoundingClientRect();
    const vx = (event.clientX - box.left) / box.width * W;
    const xv = x0 + (vx - M.l) / (W - M.l - M.r) * (x1 - x0);
    const near = allX.reduce((a, b) => Math.abs(b - xv) < Math.abs(a - xv) ? b : a, allX[0]);
    cross.setAttribute('x1', X(near)); cross.setAttribute('x2', X(near)); cross.setAttribute('visibility', 'visible');
    tip.replaceChildren();
    const head = el('div'); head.append(el('b', null, `${xLabel} ${near}`)); tip.append(head);
    let topY = H;
    series.forEach((s, i) => {
      const p = s.points.find(q => q.x === near && finite(q.y));
      if (!p) { dots[i].setAttribute('visibility', 'hidden'); return; }
      dots[i].setAttribute('cx', X(p.x)); dots[i].setAttribute('cy', Y(p.y)); dots[i].setAttribute('visibility', 'visible');
      topY = Math.min(topY, Y(p.y));
      const row = el('div'); const sw = el('i'); sw.style.background = s.color;
      row.append(sw, document.createTextNode(`${s.label}: ${yFmt(p.y)}`)); tip.append(row);
    });
    tip.hidden = false; placeTip(tip, plot, root, X(near), topY, W);
  });
  hit.addEventListener('pointerleave', hide);
  fig.append(plot);
  return fig;
}

/* Utility-vs-privacy scatter. points: [{name, x, y, color, hollow, family, extra}]; refs: [{x, label}] vertical lines. */
export function scatterChart({ title, note, points, refs = [], selected, onSelect, xLabel, yLabel, legendItems = [], W = 640, H = 340 }) {
  points = points.filter(p => finite(p.x) && finite(p.y));
  if (!points.length) return null;
  const M = { l: 40, r: 16, t: 32, b: 40 };
  const xd = niceDomain(Math.min(...points.map(p => p.x), ...refs.map(r => r.x).filter(finite)), Math.max(...points.map(p => p.x), ...refs.map(r => r.x).filter(finite)), 6, 0.03);
  const yd = niceDomain(Math.min(...points.map(p => p.y)), Math.max(...points.map(p => p.y)), 5, 0.05);
  const X = v => M.l + (v - xd.lo) / (xd.hi - xd.lo) * (W - M.l - M.r);
  const Y = v => M.t + (1 - (v - yd.lo) / (yd.hi - yd.lo)) * (H - M.t - M.b);

  const fig = el('figure', 'chart scatter');
  const cap = el('figcaption');
  cap.append(el('span', 'chart-title', title));
  if (note) cap.append(el('span', 'chart-note', note));
  if (legendItems.length) cap.append(legend(legendItems));
  fig.append(cap);
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, role: 'group', 'aria-label': title });
  for (const v of yd.ticks) {
    root.append(svg('line', { x1: M.l, x2: W - M.r, y1: Y(v), y2: Y(v), stroke: '#ebebe6' }));
    const t = svg('text', { x: M.l - 6, y: Y(v) + 3.5, 'text-anchor': 'end' }); t.textContent = tickText(v, yd.step); root.append(t);
  }
  for (const v of xd.ticks) {
    root.append(svg('line', { x1: X(v), x2: X(v), y1: M.t, y2: H - M.b, stroke: '#f1f1ec' }));
    const t = svg('text', { x: X(v), y: H - M.b + 14, 'text-anchor': 'middle' }); t.textContent = tickText(v, xd.step); root.append(t);
  }
  root.append(svg('line', { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, stroke: '#d8d8d4' }));
  const xl = svg('text', { x: (M.l + W - M.r) / 2, y: H - 6, 'text-anchor': 'middle', class: 'axis-label' }); xl.textContent = xLabel; root.append(xl);
  const yl = svg('text', { x: M.l, y: 11, class: 'axis-label' }); yl.textContent = yLabel; root.append(yl);
  for (const r of refs) {
    if (!finite(r.x)) continue;
    root.append(svg('line', { x1: X(r.x), x2: X(r.x), y1: M.t, y2: H - M.b, stroke: '#8b8b84', 'stroke-dasharray': '4 3' }));
    const anchor = X(r.x) > W - 90 ? 'end' : X(r.x) < M.l + 60 ? 'start' : 'middle';
    const t = svg('text', { x: X(r.x) + (anchor === 'end' ? -4 : anchor === 'start' ? 4 : 0), y: M.t - 6, 'text-anchor': anchor, class: 'ref-label' }); t.textContent = r.label; root.append(t);
  }
  const plot = el('div', 'chart-plot');
  const tip = el('div', 'tip'); tip.hidden = true;
  const ordered = [...points].sort((a, b) => (a.name === selected) - (b.name === selected));
  for (const p of ordered) {
    const isSel = p.name === selected;
    const g = svg('g', { class: 'point', tabindex: 0, role: 'button', 'aria-label': `${p.name}: action ${p.y.toFixed(1)}, privacy ${p.x.toFixed(1)}${isSel ? ' (selected)' : ''}` });
    if (isSel) g.append(svg('circle', { cx: X(p.x), cy: Y(p.y), r: 11, fill: '#1f3a8a1f' }));
    g.append(svg('circle', { cx: X(p.x), cy: Y(p.y), r: isSel ? 6.5 : 4.6, fill: p.hollow ? '#fbfbfa' : p.color, stroke: p.hollow ? p.color : isSel ? '#1f3a8a' : '#fbfbfa',
      'stroke-width': p.hollow ? 1.6 : isSel ? 2 : 1 }));
    if (isSel) {
      const right = X(p.x) < W - 160;
      const t = svg('text', { x: X(p.x) + (right ? 12 : -12), y: Y(p.y) - 9, 'text-anchor': right ? 'start' : 'end', class: 'point-label' }); t.textContent = p.name; g.append(t);
    }
    const show = () => {
      tip.replaceChildren(el('b', null, p.name));
      for (const line of [`${p.family ?? ''}`, `action ${p.y.toFixed(1)} · privacy ${p.x.toFixed(1)}${p.extra ? ` · ${p.extra}` : ''}`]) if (line) tip.append(el('div', 'tip-sub', line));
      tip.hidden = false; placeTip(tip, plot, root, X(p.x), Y(p.y), W);
    };
    g.addEventListener('pointerenter', show); g.addEventListener('focus', show);
    g.addEventListener('pointerleave', () => { tip.hidden = true; }); g.addEventListener('blur', () => { tip.hidden = true; });
    g.addEventListener('click', () => onSelect?.(p.name));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(p.name); } });
    root.append(g);
  }
  plot.append(root, tip);
  fig.append(plot);
  return fig;
}
