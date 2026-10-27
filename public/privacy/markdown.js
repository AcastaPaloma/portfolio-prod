// A small, safe Markdown renderer for the research journal: headings, paragraphs, nested lists with wrapped
// continuation lines, tables, block quotes, fenced code, rules, and inline code / bold / italic / http links.
// Every piece of source text is HTML-escaped before any markup is added. Known run names become links.
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ESCAPES[c]);
const reEscape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const LIST = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^\s*([-*_])(\s*\1){2,}\s*$/;
const TABLE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
const isTableStart = (lines, i) => /^\s*\|/.test(lines[i]) && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1]);
const isBlockStart = (lines, i) => {
  const l = lines[i];
  return HEADING.test(l) || /^\s*```/.test(l) || /^\s*>/.test(l) || RULE.test(l) || isTableStart(lines, i);
};
const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

export function renderMarkdown(src, { runNames = [], shift = 0 } = {}) {
  const names = [...runNames].filter(Boolean).sort((a, b) => b.length - a.length);
  const runRe = names.length ? new RegExp(`(?<![A-Za-z0-9_\\-])(${names.map(reEscape).join('|')})(?![A-Za-z0-9_\\-])`, 'g') : null;

  function linkRuns(html) {
    if (!runRe) return html;
    // Only touch text between tags, and never inside an existing link.
    let inLink = 0;
    return html.split(/(<[^>]+>)/).map(part => {
      if (part.startsWith('<')) { if (/^<a\b/.test(part)) inLink++; else if (/^<\/a>/.test(part)) inLink--; return part; }
      return inLink ? part : part.replace(runRe, n => `<a href="#run=${encodeURIComponent(n)}" class="run-ref" data-run="${n}">${n}</a>`);
    }).join('');
  }
  function span(text) {
    let h = esc(text);
    h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, label, url) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`);
    h = h.replace(/\*\*(?=\S)(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/(^|[^*\w])\*(?=\S)([^*]+?)\*(?!\w)/g, '$1<em>$2</em>');
    return h;
  }
  const inline = text => linkRuns(text.split(/(`[^`]+`)/).map((p, i) => i % 2 ? `<code>${esc(p.slice(1, -1))}</code>` : span(p)).join(''));

  const cells = line => line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));

  function buildList(items) {
    let html = '';
    const stack = [];
    for (const it of items) {
      if (!stack.length || it.indent > stack[stack.length - 1].indent) {
        stack.push(it); html += it.ordered ? '<ol>' : '<ul>';
      } else {
        while (stack.length > 1 && it.indent < stack[stack.length - 1].indent) { const s = stack.pop(); html += `</li>${s.ordered ? '</ol>' : '</ul>'}`; }
        html += '</li>';
      }
      html += `<li>${inline(it.text)}`;
    }
    while (stack.length) { const s = stack.pop(); html += `</li>${s.ordered ? '</ol>' : '</ul>'}`; }
    return html;
  }

  function blocks(lines) {
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }
      if (/^\s*```/.test(line)) {
        const buf = []; i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++]);
        i++; out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue;
      }
      let m = HEADING.exec(line);
      if (m) {
        const level = Math.min(6, m[1].length + shift), html = inline(m[2]);
        out.push(`<h${level} id="j-${slug(m[2])}">${html}</h${level}>`); i++; continue;
      }
      if (RULE.test(line)) { out.push('<hr>'); i++; continue; }
      if (isTableStart(lines, i)) {
        const head = cells(line);
        const aligns = cells(lines[i + 1]).map(c => c.startsWith(':') && c.endsWith(':') ? 'center' : c.endsWith(':') ? 'right' : '');
        i += 2;
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
        const td = (tag, c, k) => `<${tag}${aligns[k] ? ` style="text-align:${aligns[k]}"` : ''}>${inline(c)}</${tag}>`;
        out.push(`<div class="table-wrap"><table><thead><tr>${head.map((c, k) => td('th', c, k)).join('')}</tr></thead><tbody>${
          rows.map(r => `<tr>${head.map((_, k) => td('td', r[k] ?? '', k)).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      if (/^\s*>/.test(line)) {
        const buf = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''));
        out.push(`<blockquote>${blocks(buf)}</blockquote>`); continue;
      }
      if (LIST.test(line)) {
        const items = [];
        while (i < lines.length) {
          const l = lines[i];
          const lm = LIST.exec(l);
          if (lm) { items.push({ indent: lm[1].length, ordered: /\d/.test(lm[2]), text: lm[3] }); i++; continue; }
          if (!l.trim()) {
            let j = i + 1;
            while (j < lines.length && !lines[j].trim()) j++;
            if (j < lines.length && LIST.test(lines[j])) { i = j; continue; }
            break;
          }
          if (isBlockStart(lines, i)) break;
          items[items.length - 1].text += ' ' + l.trim(); i++;
        }
        out.push(buildList(items)); continue;
      }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines, i) && !(buf.length && LIST.test(lines[i]))) buf.push(lines[i++].trim());
      out.push(`<p>${inline(buf.join(' '))}</p>`);
    }
    return out.join('\n');
  }
  return blocks(String(src ?? '').replace(/\r\n?/g, '\n').split('\n'));
}
