// What the left panel shows for each passage: videos, the prompt, the token decoder, the policy diagram, charts,
// heatmaps, the scene-by-scene comparison, the demo-timing illustration, the four worlds and the summary.
import {groupedBars, heatmap, tooltip} from './charts.js';
import {POLICY, TASKS, TASK_NAMES, getRun, paired, pText, rate} from './stats.js';

const NS = 'http://www.w3.org/2000/svg';
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const svgEl = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.append(e);
  return e;
};
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const caption = text => h(`<p class="stage-caption">${text}</p>`);

// ---- video ----------------------------------------------------------------------------------------------------------
function video(root, {name, caption: cap}) {
  const fig = h(`<div class="video-frame"><video src="videos/${name}.mp4" poster="videos/${name}.jpg" muted loop playsinline
    preload="auto" controls aria-label="${cap.replace(/<[^>]+>/g, '').replace(/"/g, '')}"></video></div>`);
  root.append(fig);
  const v = fig.querySelector('video');
  if (!reduced()) v.play().catch(() => {});
  const tools = h(`<div class="video-tools"><button class="chip-btn" type="button" data-act="restart">↺ Restart</button>
    <button class="chip-btn" type="button" data-act="slow" aria-pressed="false">½ speed</button>
    <a class="chip-btn" href="videos.html#${name}" style="text-decoration:none">All videos</a></div>`);
  tools.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.act === 'restart') { v.currentTime = 0; v.play().catch(() => {}); }
    if (b.dataset.act === 'slow') {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on); v.playbackRate = on ? 0.5 : 1;
    }
  });
  root.append(tools, caption(cap));
  return () => { v.pause(); v.removeAttribute('src'); v.load(); };
}

// ---- the prompt -----------------------------------------------------------------------------------------------------
const SYSTEM = 'You are the right arm of a bimanual robot with parallel grippers. We provide you with some demos in the ' +
  'format of observation>[action_1, action_2, ...]. Then you will receive a new observation and you need to output a ' +
  'list of actions that matches the trend in the demos. Do not output anything else.';
const DEMOS = ['{"box":[58,31,24]}>[[73,10,21,0,36,54,1],[77,63,20,71,38,54,1]]',
  '{"box":[51,32,24]}>[[66,12,21,0,36,54,1],[67,70,21,0,36,54,1]]',
  '{"box":[54,32,24]}>[[67,9,21,0,36,53,1],[73,67,21,0,36,53,1]]'];
const QUERY = '{"box":[49,29,24]}>';
const REPLY = '[[60,10,21,0,36,54,1],[71,66,20,0,36,54,1]]';
function prompt(root) {
  root.append(h('<p class="prompt-label">The prompt (push box, right arm, a real one)</p>'));
  const box = h(`<div class="prompt-box"><span class="sys">${SYSTEM}</span><span class="demo">${DEMOS.join('\n')}\n… 7 more solved examples …</span>\n<span class="query">${QUERY}</span><span class="reply"></span><span class="caret"></span></div>`);
  root.append(box);
  const out = box.querySelector('.reply');
  let i = 0, timer = null;
  const type = () => {
    out.textContent = REPLY.slice(0, i);
    if (i++ <= REPLY.length) timer = setTimeout(type, i === 1 ? 900 : 38);
    else timer = setTimeout(() => { i = 0; type(); }, 3200);
  };
  if (reduced()) out.textContent = REPLY; else type();
  root.append(caption('<strong>Grey:</strong> solved examples, each “what the scene looks like &gt; the moves”. ' +
    '<strong>Black:</strong> the new scene. <strong>Blue:</strong> what the model writes back. Nobody tells it the ' +
    'task is “push the box”.'));
  return () => clearTimeout(timer);
}

// ---- token decoder --------------------------------------------------------------------------------------------------
const LO = [-0.3, -0.5, 0.6], HI = [0.7, 0.5, 1.6];
const toM = (v, i) => LO[i] + (v + 0.5) / 99 * (HI[i] - LO[i]);
const ARMS = [
  {who: 'Right arm (the leader) writes', key: 'R', color: '#2a78d6', kf: [[60, 10, 21, 0, 36, 54, 1], [71, 66, 20, 0, 36, 54, 1]]},
  {who: 'Left arm (the follower) sees that, then writes', key: 'L', color: '#1baf7a', kf: [[32, 10, 21, 0, 36, 18, 1], [43, 66, 21, 0, 36, 18, 1]]},
];
function explain(v, i, arm, k) {
  const which = `${arm.who.split(' (')[0].toLowerCase()}, keyframe ${k + 1}`;
  if (i < 3) {
    const axis = ['x (left–right on the table)', 'y (forward–back)', 'z (height)'][i];
    return `<b>${v}</b> is a <b>position</b> number (${which}): grid box ${v} of 0–99 along ${axis}. ` +
      `The grid spans 1 m, so each box is about 1 cm; ${v} decodes to ${toM(v, i).toFixed(2)} m in the simulator's frame.`;
  }
  if (i < 6) {
    const axis = ['x', 'y', 'z'][i - 3];
    return `<b>${v}</b> is a <b>rotation</b> number (${which}): the hand's angle about the ${axis} axis, in 5° steps. ` +
      `${v} × 5° − 180° = <b>${v * 5 - 180}°</b>.`;
  }
  return `<b>${v}</b> is the <b>gripper</b> (${which}): 1 means open, 0 means closed. Pushing a box needs no grasp, so it stays open.`;
}
function tokens(root) {
  const lines = h('<div></div>');
  ARMS.forEach(arm => {
    const line = h(`<div class="tok-line"><span class="who">${arm.who}</span></div>`);
    arm.kf.forEach((kf, k) => {
      line.append(h(`<span class="tok-sep">${k ? '],[' : '[['}</span>`));
      kf.forEach((v, i) => line.append(h(`<button type="button" class="tok ${i < 3 ? 'pos' : i < 6 ? 'rot' : 'grip'}"
        data-arm="${arm.key}" data-k="${k}" data-i="${i}" aria-pressed="false">${v}</button>`)));
    });
    line.append(h('<span class="tok-sep">]]</span>'));
    lines.append(line);
  });
  root.append(h('<div class="tok-key"><span><i style="background:#e9eef9"></i>position</span><span><i style="background:#f6efe2"></i>rotation</span><span><i style="background:#e7f4ee"></i>gripper</span><span>· click any number</span></div>'), lines);
  // top-down map of the table: the box centre and both arms' two keyframes
  const W = 420, H = 250, pad = 26;
  const sx = v => pad + (v - 20) / 70 * (W - 2 * pad), sy = v => H - pad - v / 80 * (H - 2 * pad);
  const svg = svgEl('svg', {viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Top-down view of the push: both grippers move from y 10 to y 66 on either side of the box'});
  svg.style.cssText = 'width:100%;max-width:460px;height:auto;display:block';
  svgEl('rect', {x: pad, y: pad, width: W - 2 * pad, height: H - 2 * pad, fill: '#f3f2ee', stroke: '#d8d8d4'}, svg);
  for (let g = 20; g <= 90; g += 10) svgEl('line', {x1: sx(g), x2: sx(g), y1: pad, y2: H - pad, stroke: '#e4e3de'}, svg);
  for (let g = 0; g <= 80; g += 10) svgEl('line', {x1: pad, x2: W - pad, y1: sy(g), y2: sy(g), stroke: '#e4e3de'}, svg);
  const lab = (x, y, t, a = 'middle', c = '#5a5a5a') => { const e = svgEl('text', {x, y, 'text-anchor': a, 'font-size': 11, fill: c, 'font-family': '-apple-system,Arial,sans-serif'}, svg); e.textContent = t; return e; };
  lab(W / 2, H - 6, 'x (grid box) →');
  lab(10, pad + 4, 'y', 'start');
  svgEl('rect', {x: sx(49) - 7, y: sy(29) - 7, width: 14, height: 14, fill: '#b98a5a', rx: 2}, svg);
  lab(sx(49), sy(29) + 22, 'box centre (49, 29)', 'middle', '#1a1a1a');
  svgEl('defs', {}, svg).innerHTML = ARMS.map(a => `<marker id="ar${a.key}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${a.color}"/></marker>`).join('');
  const pts = {};
  ARMS.forEach(a => {
    const [p, q] = a.kf;
    svgEl('line', {x1: sx(p[0]), y1: sy(p[1]), x2: sx(q[0]), y2: sy(q[1]) + 6, stroke: a.color, 'stroke-width': 2, 'marker-end': `url(#ar${a.key})`}, svg);
    a.kf.forEach((kf, k) => {
      pts[`${a.key}${k}`] = svgEl('circle', {cx: sx(kf[0]), cy: sy(kf[1]), r: 5, fill: '#fbfbfa', stroke: a.color, 'stroke-width': 2}, svg);
    });
    lab(sx(p[0]), sy(p[1]) + 18, a.key === 'R' ? 'right arm' : 'left arm', 'middle', '#1a1a1a');
  });
  root.append(svg);
  const out = h('<p class="tok-explain">Both arms slide along y from 10 to 66 at the same moments, on either side of the box: they push it together.</p>');
  root.append(out);
  lines.addEventListener('click', e => {
    const b = e.target.closest('.tok');
    if (!b) return;
    lines.querySelectorAll('.tok').forEach(t => t.setAttribute('aria-pressed', t === b));
    const arm = ARMS.find(a => a.key === b.dataset.arm), k = +b.dataset.k, i = +b.dataset.i;
    out.innerHTML = explain(arm.kf[k][i], i, arm, k);
    Object.values(pts).forEach(c => c.setAttribute('r', 5));
    pts[`${arm.key}${k}`].setAttribute('r', 8);
  });
}

// ---- the three policies ---------------------------------------------------------------------------------------------
const MODES = {
  sa: {title: 'SA · one LLM call writes all three arms', text: 'One call, one long line: 21 numbers per keyframe (3 arms × 7).'},
  da: {title: 'DA · three separate calls, no talking', text: 'Three calls at the same time. Each sees only its own arm’s examples and never hears about the others.'},
  bic: {title: 'BiCICLe · a chain', text: 'Three calls, one after another. Arm A plans first; B’s call is shown A’s plan; C’s call is shown both.'},
};
function policies(root, {mode = 'sa'} = {}) {
  const seg = h(`<div class="seg" role="group" aria-label="Policy">${Object.keys(MODES).map(k =>
    `<button type="button" data-m="${k}" aria-pressed="${k === mode}">${POLICY[k].name}</button>`).join('')}</div>`);
  const title = h('<p class="panel-title" style="margin:6px 0 0"></p>');
  const W = 560, H = 270;
  const svg = svgEl('svg', {viewBox: `0 0 ${W} ${H}`, class: 'policy-svg', role: 'img'});
  svg.style.cssText = 'width:100%;height:auto;display:block';
  const text = caption('');
  root.append(seg, title, svg, text);
  const draw = m => {
    svg.replaceChildren();
    const c = POLICY[m].color, xs = [130, 280, 430], armY = 205, llmY = 70;
    svgEl('defs', {}, svg).innerHTML = `<marker id="pa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker><marker id="pg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#555"/></marker>`;
    const box = (x, w, label, delay = 0) => {
      const g = svgEl('g', {class: 'llm'}, svg);
      svgEl('rect', {x: x - w / 2, y: llmY - 20, width: w, height: 40, rx: 6, fill: c + '1f', stroke: c, 'stroke-width': 1.5, class: reduced() ? '' : 'pulse', style: `animation-delay:${delay}s`}, g);
      const t = svgEl('text', {x, y: llmY + 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 600, fill: '#1a1a1a'}, g);
      t.textContent = label;
    };
    const arrow = (x1, y1, x2, y2, col = c, mk = 'pa', cls = 'flow') =>
      svgEl('line', {x1, y1, x2, y2, stroke: col, 'stroke-width': 2, 'marker-end': `url(#${mk})`, class: reduced() ? '' : cls}, svg);
    if (m === 'sa') {
      box(280, 340, 'one LLM call');
      xs.forEach(x => arrow(280 + (x - 280) * 0.55, llmY + 20, x, armY - 22));
    } else {
      xs.forEach((x, i) => { box(x, 96, 'LLM', m === 'bic' ? i * 0.8 : 0); arrow(x, llmY + 20, x, armY - 22); });
      if (m === 'bic') {
        arrow(xs[0] + 50, llmY, xs[1] - 52, llmY, '#555', 'pg');
        arrow(xs[1] + 50, llmY, xs[2] - 52, llmY, '#555', 'pg');
        const t = svgEl('text', {x: 280, y: 28, 'text-anchor': 'middle', 'font-size': 12, fill: '#5a5a5a'}, svg);
        t.textContent = 'each call is shown the plans before it';
      } else {
        const t = svgEl('text', {x: 280, y: 28, 'text-anchor': 'middle', 'font-size': 12, fill: '#5a5a5a'}, svg);
        t.textContent = 'no arrows between the calls: nobody shares a plan';
      }
    }
    xs.forEach((x, i) => {
      svgEl('circle', {cx: x, cy: armY, r: 21, fill: '#fbfbfa', stroke: '#8b8b84', 'stroke-width': 1.5}, svg);
      const t = svgEl('text', {x, y: armY + 5, 'text-anchor': 'middle', 'font-size': 15, fill: '#1a1a1a'}, svg);
      t.textContent = 'ABC'[i];
    });
    const lt = svgEl('text', {x: 280, y: 255, 'text-anchor': 'middle', 'font-size': 12, fill: '#5a5a5a'}, svg);
    lt.textContent = 'robot arms';
    title.textContent = MODES[m].title;
    text.innerHTML = MODES[m].text;
    seg.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === m));
  };
  seg.addEventListener('click', e => { const b = e.target.closest('button'); if (b) draw(b.dataset.m); });
  draw(mode);
}

// ---- charts ---------------------------------------------------------------------------------------------------------
const NO_SWEEP = TASKS.filter(t => t !== 'sweep_dustpan');
const CHARTS = {
  paper: () => [{label: 'Qwen 2.5 7B', sub: 'paper', run: getRun('rlbench', 'paper-qwen2.5-7b')},
    {label: 'GPT-5-mini', sub: 'paper', run: getRun('rlbench', 'paper-gpt-5-mini')}],
  replica: () => [{label: 'Qwen 2.5 7B', sub: 'paper', run: getRun('rlbench', 'paper-qwen2.5-7b')},
    {label: 'Qwen 2.5 7B', sub: 'mine', run: getRun('rlbench', 'qwen2.5-7b')},
    {label: 'gpt-oss-120b', sub: 'mine', run: getRun('rlbench', 'gpt-oss-120b')},
    {label: 'Claude Sonnet 5.5', sub: 'mine', run: getRun('rlbench', 'claude-sonnet-5-5')}],
  twin_models: () => [['qwen2.5-7b', 'Qwen 2.5 7B'], ['haiku', 'Claude Haiku 5.5'], ['qwen3.8-27b', 'Qwen3.8 27B'],
    ['sonnet', 'Claude Sonnet 5.5']].map(([m, l]) => ({label: l, sub: 'TWIN-3', run: getRun('twin', m)})),
  pauses: () => [['qwen2.5-7b', 'Qwen 2.5 7B'], ['sonnet', 'Sonnet 5.5']].flatMap(([m, l]) => [
    {label: l, sub: 'with pauses', run: getRun('twin', m)}, {label: l, sub: 'without pauses', run: getRun('twin_regular', m)}]),
  triplet: () => [{label: 'Sonnet 5.5', sub: 'exact positions (TWIN-3)', run: getRun('twin', 'sonnet')},
    {label: 'Sonnet 5.5', sub: 'cameras + noise (TRIPLET)', run: getRun('triplet', 'sonnet')}],
};
function chart(root, {id, highlight = null, sweepToggle = false, caption: cap}) {
  const host = h('<div></div>');
  let tasks = TASKS;
  const draw = () => {
    host.replaceChildren();
    groupedBars(host, CHARTS[id]().map(g => ({...g, tasks})), {highlight});
  };
  if (sweepToggle) {
    const seg = h('<div class="seg" role="group" aria-label="Tasks"><button type="button" data-t="all" aria-pressed="true">All 13 tasks</button><button type="button" data-t="ns" aria-pressed="false">Without sweeping</button></div>');
    seg.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      tasks = b.dataset.t === 'all' ? TASKS : NO_SWEEP;
      seg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      draw();
    });
    root.append(seg);
  }
  root.append(host);
  draw();
  if (cap) root.append(caption(cap));
}

function heat(root, {runs, highlightTask, caption: cap}) {
  const host = h('<div class="heat-wrap"></div>');
  heatmap(host, runs.map(([w, m, label]) => ({run: getRun(w, m), label})), {highlightTask});
  root.append(host);
  if (cap) root.append(caption(cap));
}

// ---- scene-by-scene comparison --------------------------------------------------------------------------------------
export function dots(root, {a, b, labelA, labelB, caption: cap}) {
  const [wa, ma, pa] = a, [wb, mb, pb] = b;
  const r = paired(getRun(wa, ma), pa, getRun(wb, mb), pb);
  const ca = '#2a78d6', cb = '#eb6834';          // side A and side B, whatever their policies
  const COL = {both: '#b8c2db', a: ca, b: cb, neither: '#fbfbfa'};
  const host = h('<div class="chart"></div>');
  const W = 560, cell = 22, left = 128, top = 8, H = top + TASKS.length * cell + 6;
  const svg = svgEl('svg', {viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${labelA} vs ${labelB}, scene by scene`});
  host.append(svg);
  const tip = tooltip(host);
  TASKS.forEach((t, ti) => {
    const tt = svgEl('text', {x: left - 10, y: top + ti * cell + cell / 2 + 4, 'text-anchor': 'end', 'font-size': 11.5, fill: '#1a1a1a'}, svg);
    tt.textContent = TASK_NAMES[t];
  });
  r.cells.forEach((c, i) => {
    const ti = Math.floor(i / 20), si = i % 20;
    const dot = svgEl('circle', {cx: left + si * cell + cell / 2, cy: top + ti * cell + cell / 2, r: 7, fill: COL[c.c],
      stroke: c.c === 'neither' ? '#c9c8c2' : 'none', tabindex: -1}, svg);
    dot.addEventListener('pointerenter', () => {
      const bx = dot.getBoundingClientRect(), hb = host.getBoundingClientRect();
      const words = {both: 'both succeeded', a: `only ${labelA} succeeded`, b: `only ${labelB} succeeded`, neither: 'both failed'}[c.c];
      tip.show(`<div>${TASK_NAMES[c.task]} · scene ${c.seed - 99999}</div><b>${words}</b>`, bx.left - hb.left + bx.width / 2, bx.top - hb.top);
    });
    dot.addEventListener('pointerleave', () => tip.hide());
  });
  root.append(host);
  root.append(h(`<div class="dots-legend">
    <span style="--c:${ca}"><i></i>only ${labelA}: <b class="num">${r.a}</b></span>
    <span style="--c:${cb}"><i></i>only ${labelB}: <b class="num">${r.b}</b></span>
    <span style="--c:#b8c2db"><i></i>both succeeded: <span class="num">${r.both}</span></span>
    <span style="--c:#fbfbfa;--b:#c9c8c2"><i></i>both failed: <span class="num">${r.neither}</span></span></div>`));
  root.append(h(`<p class="verdict">They disagree on <b class="num">${r.a + r.b}</b> scenes. If the two were equally good, each of
    those would be a coin flip, and a split of ${Math.max(r.a, r.b)} : ${Math.min(r.a, r.b)} or more lopsided would happen
    <b>${r.p < 0.001 ? pText(r.p) : (r.p * 100).toFixed(r.p < 0.1 ? 1 : 0) + '%'}</b> of the time. That's the <i>p</i>-value.</p>`));
  if (cap) root.append(caption(cap));
}

// ---- demo timing illustration ---------------------------------------------------------------------------------------
const TIMES = {
  pauses: {demos: [['mgwl', 'mhgl', 'mgwl'], ['mhhgl', 'mgwwl', 'mhgwl'], ['mgl', 'mgl', 'mgl']], guess: ['mgl', 'mgwwl', 'mhgwl']},
  regular: {demos: [['mgl', 'mgl', 'mgl'], ['mgl', 'mgl', 'mgl'], ['mgl', 'mgl', 'mgl']], guess: ['mgl', 'mgl', 'mgl']},
};
function timeline(root, {mode = 'pauses'} = {}) {
  const seg = h('<div class="seg" role="group" aria-label="Demos"><button type="button" data-m="pauses">With random pauses</button><button type="button" data-m="regular">Without pauses</button></div>');
  const W = 560, rowH = 17, x0 = 150, kx = 54;
  const svg = svgEl('svg', {role: 'img', 'aria-label': 'Illustration of when each arm grabs and lifts, demo by demo'});
  svg.style.cssText = 'width:100%;height:auto;display:block';
  const note = caption('');
  root.append(seg, svg, note);
  const draw = m => {
    seg.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === m));
    svg.replaceChildren();
    const T = TIMES[m];
    let y = 18;
    const text = (x, yy, s, o = {}) => { const e = svgEl('text', {x, y: yy, 'font-size': 11.5, fill: '#5a5a5a', ...o}, svg); e.textContent = s; };
    text(x0 - 22, y, 'keyframe', {'text-anchor': 'end', 'font-size': 10.5});
    for (let k = 0; k < 5; k++) text(x0 + k * kx, y, `${k + 1}`, {'text-anchor': 'middle', 'font-size': 11});
    y += 14;
    const row = (seq, label, yy, col = '#1a1a1a') => {
      text(x0 - 22, yy + 4, label, {'text-anchor': 'end', fill: col});
      svgEl('line', {x1: x0 - 12, x2: x0 + 4 * kx + 12, y1: yy, y2: yy, stroke: '#e4e3de'}, svg);
      [...seq].forEach((c, k) => {
        const x = x0 + k * kx;
        if (c === 'g') svgEl('rect', {x: x - 6, y: yy - 6, width: 12, height: 12, fill: '#1a1a1a', rx: 1.5}, svg);
        else if (c === 'l') svgEl('path', {d: `M${x},${yy - 8} L${x + 8},${yy + 6} L${x - 8},${yy + 6} Z`, fill: '#1f3a8a'}, svg);
        else if (c === 'h') svgEl('circle', {cx: x, cy: yy, r: 5.5, fill: '#fbfbfa', stroke: '#c9a227', 'stroke-width': 2, 'stroke-dasharray': '2 2'}, svg);
        else svgEl('circle', {cx: x, cy: yy, r: 4, fill: c === 'w' ? '#d8d8d4' : '#8b8b84'}, svg);
      });
    };
    T.demos.forEach((d, di) => {
      y += 10;
      text(10, y + rowH, `Example ${di + 1}`, {fill: '#1a1a1a', 'font-size': 12});
      d.forEach((seq, ai) => { y += rowH; row(seq, `arm ${'ABC'[ai]}`, y); });
      y += 6;
    });
    y += 14;
    svgEl('line', {x1: 10, x2: W - 10, y1: y, y2: y, stroke: '#d8d8d4'}, svg);
    y += 8;
    const lifts = T.guess.map(s => s.indexOf('l'));
    const ok = lifts.every(v => v === lifts[0]);
    y += 6;
    text(10, y + 4, 'New scene: each independent agent copies its own arm\u2019s rows', {fill: '#1a1a1a', 'font-size': 12, 'font-weight': 600});
    y += 4;
    T.guess.forEach((seq, ai) => { y += rowH; row(seq, `arm ${'ABC'[ai]}`, y); });
    y += 26;
    text(x0 - 12, y, ok ? 'All three lift at keyframe 3 together: the tray comes up level.' :
      'Lifts at keyframes 3, 5 and 5: arm A lifts alone and the tray tips.', {fill: ok ? '#16823c' : '#be1e1e', 'font-size': 12.5});
    y += 22;
    const lg = [['●', 'move', '#8b8b84', 70], ['■', 'grab', '#1a1a1a', 70], ['▲', 'lift', '#1f3a8a', 64], ['◌', 'random pause', '#c9a227', 122], ['●', 'wait for the others', '#c8c8c2', 0]];
    let lx = 10;
    lg.forEach(([s, t, c, w]) => { text(lx, y, s, {fill: c, 'font-size': 13}); text(lx + 16, y, t, {'font-size': 11}); lx += w; });
    svg.setAttribute('viewBox', `0 0 ${W} ${y + 8}`);
    note.innerHTML = m === 'pauses'
      ? 'An illustration, not data. In my demos the script sometimes hovers before grabbing, so the lift lands on a different keyframe in each example. An independent agent for arm A only ever sees arm A’s rows, so it can’t know when B and C will be ready.'
      : 'Without pauses, every example lifts at the same keyframe. Each arm copying its own rows lands on the same moment, so independent agents stay in step for free. The paper’s demos look like this.';
  };
  seg.addEventListener('click', e => { const b = e.target.closest('button'); if (b) draw(b.dataset.m); });
  draw(mode);
}

// ---- the four worlds --------------------------------------------------------------------------------------------------
function worlds(root) {
  root.append(h(`<div class="ladder">
    <div class="world-card"><span class="tag">2 arms · CoppeliaSim</span><h4>The paper's test (RLBench TWIN)</h4><p>An exact copy of the paper's benchmark: same 13 tasks, cameras, number format and prompts.</p></div>
    <div class="ladder-step">same idea, three arms, my simulator</div>
    <div class="world-card"><span class="tag">3 arms · MuJoCo</span><h4>TWIN-3</h4><p>The 13 tasks rebuilt for three arms. My scripted demos pause at random moments.</p></div>
    <div class="ladder-step">remove the random pauses, change nothing else</div>
    <div class="world-card"><span class="tag">3 arms · MuJoCo</span><h4>No pauses (twin_regular)</h4><p>Same scenes, tasks and success tests as TWIN-3.</p></div>
    <div class="ladder-step">instead, from TWIN-3: add cameras, noise and random physics</div>
    <div class="world-card"><span class="tag">3 arms · MuJoCo</span><h4>TRIPLET</h4><p>Positions come from simulated cameras; masses, friction and arm accuracy are randomly perturbed.</p></div></div>`));
  root.append(caption('Each world changes one thing, so a change in the results can be pinned on it.'));
}

function summary(root) {
  const s = rate(getRun('twin', 'sonnet'), 'da').p, s2 = rate(getRun('twin_regular', 'sonnet'), 'da').p;
  const qb = rate(getRun('twin_regular', 'qwen2.5-7b'), 'bic').p, qs = rate(getRun('twin_regular', 'qwen2.5-7b'), 'sa').p;
  const rs = rate(getRun('rlbench', 'claude-sonnet-5-5'), 'sa').p, rb = rate(getRun('rlbench', 'claude-sonnet-5-5'), 'bic').p;
  root.append(h(`<div class="cards">
    <div class="stat-card"><div class="big num">${s.toFixed(1)} → ${s2.toFixed(1)}<small>%</small></div><p>Sonnet's independent agents, once the demos stop pausing at random. That part was my demos, not the model.</p></div>
    <div class="stat-card"><div class="big num">+${(qb - qs).toFixed(1)}<small> pts</small></div><p>The paper's small model gains from the chain on my three-arm suite (the paper: +3.7).</p></div>
    <div class="stat-card"><div class="big num">${rs.toFixed(1)} vs ${rb.toFixed(1)}<small>%</small></div><p>A strong model on the paper's own test: one agent beats the chain, with half the LLM calls.</p></div></div>`));
}

// ---- registry --------------------------------------------------------------------------------------------------------
const RENDER = {video, prompt, tokens, policies, chart, heat, dots, timeline, worlds, summary};
export function renderStage(root, spec) {
  return RENDER[spec.type](root, spec) || null;
}
