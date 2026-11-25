// The reader: builds the article, tracks the passage being read, swaps the left panel to match, and handles
// Contents, the arrow keys and the panel divider.
import {PASSAGES} from './content.js';
import {renderStage} from './stage.js';
import {initSplitter} from './split.js';

const article = document.getElementById('article');
const reader = document.getElementById('reader');
const stage = document.getElementById('stage');
const counter = document.getElementById('step-counter');
const chapterLabel = document.getElementById('chapter-label');
const stageTitle = document.getElementById('stage-title');
const toc = document.getElementById('toc');
const menu = document.getElementById('contents-menu');
const toggle = document.getElementById('contents-toggle');
const pad = i => String(i).padStart(2, '0');

let chapter = '';
const chapters = PASSAGES.map(p => (chapter = p.chapter || chapter));
PASSAGES.forEach((p, i) => {
  const sec = document.createElement('section');
  sec.className = `reading-block${p.major ? ' is-major' : ''}`;
  sec.id = p.id;
  sec.innerHTML = `<div class="passage-meta"><span>${pad(i)}</span>${p.chapter ? `<span class="chapter-tag">${p.chapter}</span>` : ''}</div>
    ${i === 0 ? `<h1>${p.title}</h1>` : `<h2>${p.title}</h2>`}<div class="passage-body">${p.body}</div>`;
  article.append(sec);
});
const sections = [...article.querySelectorAll('.reading-block')];

// Contents
let html = '', last = null;
PASSAGES.forEach((p, i) => {
  if (chapters[i] !== last) { html += `<div class="toc-chapter">${chapters[i]}</div>`; last = chapters[i]; }
  html += `<button type="button" class="toc-link" data-i="${i}"><span class="toc-number">${pad(i)}</span><span>${p.title}</span></button>`;
});
toc.innerHTML = html;
const tocLinks = [...toc.querySelectorAll('.toc-link')];
const setMenu = open => { menu.hidden = !open; toggle.setAttribute('aria-expanded', open); };
toggle.addEventListener('click', () => setMenu(menu.hidden));
toc.addEventListener('click', e => {
  const b = e.target.closest('.toc-link');
  if (!b) return;
  setMenu(false);
  go(+b.dataset.i);
});
document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });

// Stage
let current = -1, stageKey = '', cleanup = null, swapTimer = null;
const STAGE_NAMES = {video: 'video', prompt: 'the prompt', tokens: 'decoding the numbers', policies: 'the three policies',
  chart: 'results', heat: 'per task', dots: 'scene by scene', timeline: 'demo timing', worlds: 'four worlds', summary: 'in three numbers'};
function showStage(spec) {
  const key = JSON.stringify(spec);
  if (key === stageKey) return;
  stageKey = key;
  clearTimeout(swapTimer);
  const old = stage.firstElementChild;
  const build = () => {
    if (cleanup) { try { cleanup(); } catch { /* the old figure is gone either way */ } }
    stage.replaceChildren();
    const inner = document.createElement('div');
    inner.className = 'stage-inner';
    stage.append(inner);
    cleanup = renderStage(inner, spec);
    stage.scrollTop = 0;
    stageTitle.textContent = `· ${STAGE_NAMES[spec.type]}`;
  };
  if (old && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    old.classList.add('is-leaving');
    swapTimer = setTimeout(build, 180);
  } else build();
}
function setCurrent(i) {
  if (i === current) return;
  if (current >= 0) sections[current].classList.remove('is-current');
  current = i;
  sections[i].classList.add('is-current');
  counter.textContent = `${pad(i)} / ${pad(PASSAGES.length - 1)}`;
  chapterLabel.textContent = chapters[i];
  tocLinks.forEach((b, j) => (j === i ? b.setAttribute('aria-current', 'location') : b.removeAttribute('aria-current')));
  showStage(PASSAGES[i].stage);
  if (history.replaceState) history.replaceState(null, '', i ? `#${PASSAGES[i].id}` : location.pathname);
}

// The current passage is the last one whose top has crossed 38% of the reader's height.
let lockUntil = 0;                       // while go() scrolls, the passage it chose stays current
function track() {
  if (performance.now() < lockUntil) return;
  const line = reader.getBoundingClientRect().top + reader.clientHeight * 0.38;
  let i = 0;
  sections.forEach((s, j) => { if (s.getBoundingClientRect().top <= line) i = j; });
  if (reader.scrollTop + reader.clientHeight >= reader.scrollHeight - 4) i = sections.length - 1;
  setCurrent(i);
}
let raf = 0;
reader.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(track); }, {passive: true});
reader.addEventListener('scrollend', () => { lockUntil = 0; track(); });
addEventListener('resize', track);

function go(i) {
  i = Math.max(0, Math.min(sections.length - 1, i));
  lockUntil = performance.now() + 1200;
  sections[i].scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
  setCurrent(i);
}
document.addEventListener('keydown', e => {
  if (e.target.closest('input, select, textarea, video') || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === 'Escape') setMenu(false);
  if (e.key === 'ArrowRight' || (e.key === 'ArrowDown' && e.target === document.body)) { e.preventDefault(); go(current + 1); }
  if (e.key === 'ArrowLeft' || (e.key === 'ArrowUp' && e.target === document.body)) { e.preventDefault(); go(current - 1); }
});

initSplitter(document.getElementById('workspace'), document.querySelector('.splitter'));
const start = PASSAGES.findIndex(p => `#${p.id}` === location.hash);
if (start > 0) { sections[start].scrollIntoView({block: 'start'}); setCurrent(start); } else setCurrent(0);
