// The draggable line between the two panels (desktop only), also movable with the arrow keys when focused.
export function initSplitter(workspace, handle) {
  if (!handle) return;
  const set = pct => workspace.style.setProperty('--split-x', `${Math.max(30, Math.min(72, pct))}%`);
  const saved = parseFloat(sessionStorage.getItem('tricicle-split'));
  if (saved) set(saved);
  const pctAt = x => { const r = workspace.getBoundingClientRect(); return 100 * (x - r.left) / r.width; };
  handle.addEventListener('pointerdown', e => {
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('is-dragging');
    document.documentElement.dataset.resizing = 'x';
  });
  handle.addEventListener('pointermove', e => { if (handle.classList.contains('is-dragging')) set(pctAt(e.clientX)); });
  const end = () => {
    if (!handle.classList.contains('is-dragging')) return;
    handle.classList.remove('is-dragging');
    delete document.documentElement.dataset.resizing;
    sessionStorage.setItem('tricicle-split', parseFloat(workspace.style.getPropertyValue('--split-x')) || 52);
    dispatchEvent(new Event('resize'));
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
  handle.addEventListener('keydown', e => {
    const now = parseFloat(getComputedStyle(workspace).getPropertyValue('--split-x')) || 52;
    if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); set(now - 2); }
    if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); set(now + 2); }
  });
}
