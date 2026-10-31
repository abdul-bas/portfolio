document.addEventListener('DOMContentLoaded', () => {
  if (typeof EDUCATION === 'undefined') return;

  const track = document.getElementById('eduTrack');
  const list  = document.getElementById('eduTimeline');
  const fill  = document.getElementById('eduFill');
  if (!track || !list) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc    = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const isHttp = u => /^https?:\/\//i.test(u || '');

  /* ---------- Google Drive helpers (only the link you paste is used) ---------- */
  const driveId = url => {
    const m = url.match(/\/d\/([\w-]{10,})/) || url.match(/[?&]id=([\w-]{10,})/);
    return m ? m[1] : null;
  };
  function certLinks(item) {
    const url = (item.driveUrl || '').trim();
    if (!isHttp(url)) return null;
    const id = driveId(url);
    return id
      ? { view:  `https://drive.google.com/file/d/${id}/view`,
          thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w600` }
      : { view: url, thumb: '' };
  }

  /* ---------- icons ---------- */
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICON = {
    book:   svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>'),
    school: svg('<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9 21v-6h6v6"/>'),
    degree: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5"/><line x1="22" y1="10" x2="22" y2="16"/>'),
    mobile: svg('<rect x="5" y="2" width="14" height="20" rx="3"/><polyline points="10 9 8 12 10 15"/><polyline points="14 9 16 12 14 15"/>'),
    check:  svg('<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><polyline points="22 4 12 14 9 11"/>'),
    cal:    svg('<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>'),
    out:    svg('<line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/>'),
    doc:    svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/>'),
  };
  const TYPE_LABEL = { academic: 'Academic', professional: 'Professional Training' };

  /* ---------- render ---------- */
  function itemHTML(it, i) {
    const side  = i % 2 === 0 ? 'left' : 'right';           // 1st left, 2nd right, ...
    const links = certLinks(it);
    const fields = (it.fields || []).filter(f => f && f.value);

    const cert = links ? `
      <div class="edu-cert">
        ${links.thumb ? `<a class="edu-cert-thumb" href="${esc(links.view)}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
          <img src="${esc(links.thumb)}" alt="" loading="lazy" referrerpolicy="no-referrer"></a>` : ''}
        <div class="edu-cert-info">
          <span class="edu-cert-label">${ICON.doc} Certificate</span>
          <a class="edu-btn" href="${esc(links.view)}" target="_blank" rel="noopener noreferrer"
             aria-label="View certificate: ${esc(it.title)}">View Certificate ${ICON.out}</a>
        </div>
      </div>` : '';

    return `
      <li class="edu-item side-${side} type-${esc(it.type)} ${it.featured ? 'is-featured' : ''}">
        <span class="edu-node" aria-hidden="true">${ICON[it.icon] || ICON.book}</span>
        <article class="edu-card">
          <div class="edu-meta">
            <span class="edu-badge">${esc(TYPE_LABEL[it.type] || it.type)}</span>
            ${it.featured ? '<span class="edu-major">Major Achievement</span>' : ''}
          </div>
          <h3 class="edu-title">${esc(it.title)}</h3>
          ${it.period ? `<p class="edu-period">${ICON.cal}<span>${esc(it.period)}</span></p>` : ''}
          ${fields.length ? `<dl class="edu-fields">${fields.map(f =>
            `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>` : ''}
          ${it.achievement ? `<p class="edu-achievement">${ICON.check}<span>${esc(it.achievement)}</span></p>` : ''}
          ${cert}
        </article>
      </li>`;
  }

  list.innerHTML = EDUCATION.map(itemHTML).join('');

  // certificate preview failed (private file, offline...) -> keep the button, drop the preview
  list.addEventListener('error', e => {
    const img = e.target;
    if (img instanceof HTMLImageElement) img.closest('.edu-cert-thumb')?.remove();
  }, true);

  /* ---------- scroll-in: alternate left / right ---------- */
  const items = [...list.querySelectorAll('.edu-item')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
  } else {
    track.classList.add('is-animated');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------- connecting line fills as you scroll ---------- */
  function updateLine() {
    if (!fill) return;
    const r = track.getBoundingClientRect();
    const mark = window.innerHeight * 0.6;                 // fill up to ~60% down the viewport
    const p = reduceMotion ? 1 : Math.min(1, Math.max(0, (mark - r.top) / r.height));
    fill.style.height = (p * 100) + '%';
  }
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateLine(); ticking = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateLine();
});