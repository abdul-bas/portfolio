document.addEventListener('DOMContentLoaded', () => {
  if (typeof CERTIFICATES === 'undefined' || typeof CERTIFICATE_CATEGORIES === 'undefined') return;

  const grid       = document.getElementById('certGrid');
  const filterRow  = document.getElementById('certFilters');
  const live       = document.getElementById('certLive');
  const dialog     = document.getElementById('certDialog');
  const frame      = document.getElementById('certDialogFrame');
  const dlgTitle   = document.getElementById('certDialogTitle');
  const dlgOpen    = document.getElementById('certDialogOpen');
  if (!grid || !filterRow || !dialog) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const isHttp = u => /^https?:\/\//i.test(u || '');

  /* ---------- Google Drive helpers (nothing is invented: only the link you paste is used) ---------- */
  const driveId = url => {
    const m = url.match(/\/d\/([\w-]{10,})/) || url.match(/[?&]id=([\w-]{10,})/);
    return m ? m[1] : null;
  };

  function linksFor(cert) {
    const url = (cert.driveUrl || '').trim();
    if (!isHttp(url)) return null;                   
    const id = driveId(url);
    if (id) {
      return {
        view:    `https://drive.google.com/file/d/${id}/view`,     
        preview: `https://drive.google.com/file/d/${id}/preview`,   
        thumb:   cert.thumbnail || `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
      };
    }
    // not a Drive link (e.g. a direct file URL): use it as it is
    return { view: url, preview: url, thumb: cert.thumbnail || (cert.type === 'image' ? url : '') };
  }

  /* ---------- small inline icons ---------- */
  const ICON = {
    doc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
    cal:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
    out:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/></svg>',
  };
  const catLabel = id => (CERTIFICATE_CATEGORIES.find(c => c.id === id) || {}).label || id;

  /* ---------- filters ---------- */
  let active = 'all';
  const countFor = id => id === 'all' ? CERTIFICATES.length : CERTIFICATES.filter(c => c.category === id).length;

  filterRow.innerHTML = CERTIFICATE_CATEGORIES.map(c => `
    <button type="button" class="cert-filter ${c.id === active ? 'is-active' : ''}" data-filter="${esc(c.id)}" aria-pressed="${c.id === active}">
      ${esc(c.label)} <span class="cert-count">${countFor(c.id)}</span>
    </button>`).join('');

  /* ---------- card ---------- */
  function cardHTML(cert, i) {
    const links = linksFor(cert);
    const hasThumb = links && links.thumb;
    const type = cert.type ? String(cert.type).toUpperCase() : '';

    const thumb = hasThumb
      ? `<img class="cert-img" src="${esc(links.thumb)}" alt="Preview of ${esc(cert.title)}" loading="lazy" referrerpolicy="no-referrer">`
      : `<span class="cert-fallback">${ICON.doc}<span>Preview unavailable</span></span>`;

    const thumbWrap = `
      <button type="button" class="cert-thumb" data-i="${i}" ${links ? '' : 'disabled'}
              aria-label="${links ? `Quick preview of ${esc(cert.title)}` : `${esc(cert.title)} preview unavailable`}">
        ${thumb}
        <span class="cert-badge cat-${esc(cert.category)}">${esc(catLabel(cert.category))}</span>
        ${type ? `<span class="cert-type">${esc(type)}</span>` : ''}
        ${links ? '<span class="cert-peek">Quick preview</span>' : ''}
      </button>`;

    const action = links
      ? `<a class="cert-btn" href="${esc(links.view)}" target="_blank" rel="noopener noreferrer">View Certificate ${ICON.out}</a>`
      : `<span class="cert-btn is-disabled" aria-disabled="true">Link unavailable</span>`;

    return `
      <article class="cert-card ${cert.featured ? 'is-featured' : ''}" style="--d:${Math.min(i * 70, 280)}ms">
        ${thumbWrap}
        <div class="cert-body">
          ${cert.featured ? '<span class="cert-featured">Featured &middot; Flutter Development</span>' : ''}
          <h3 class="cert-title">${esc(cert.title)}</h3>
          ${cert.issuer ? `<p class="cert-issuer">${esc(cert.issuer)}</p>` : ''}
          ${cert.qualification ? `<p class="cert-qual">${esc(cert.qualification)}</p>` : ''}
          ${cert.year ? `<p class="cert-year">${ICON.cal}<span>${esc(cert.year)}</span></p>` : ''}
          ${(cert.tags && cert.tags.length) ? `<div class="cert-tags">${cert.tags.map(t => `<span class="cert-tag">${esc(t)}</span>`).join('')}</div>` : ''}
          <div class="cert-actions">${action}</div>
        </div>
      </article>`;
  }

  /* ---------- scroll slide-in: odd cards from the left, even cards from the right ---------- */
  let io = null;
  function animateCards() {
    if (io) io.disconnect();
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const cards = [...grid.querySelectorAll('.cert-card')];
    cards.forEach(c => c.classList.add('slide-pre'));

    io = new IntersectionObserver(entries => {
      let k = 0;                                           
      entries.filter(e => e.isIntersecting).forEach(e => {
        const card = e.target;
        const dir = cards.indexOf(card) % 2 === 0 ? 'slide-from-left' : 'slide-from-right';
        card.style.animationDelay = (k++ * 110) + 'ms';
        card.classList.remove('slide-pre');
        card.classList.add(dir);
        card.addEventListener('animationend', () => {
          card.classList.remove(dir);                     
          card.style.animationDelay = '';
        }, { once: true });
        io.unobserve(card);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    cards.forEach(c => io.observe(c));
  }

  let shown = [];
  function render() {
    shown = CERTIFICATES
      .filter(c => active === 'all' || c.category === active)
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));  

    grid.innerHTML = shown.length
      ? shown.map(cardHTML).join('')
      : '<p class="cert-empty">No certificates in this category yet.</p>';
    live.textContent = `${shown.length} certificate${shown.length === 1 ? '' : 's'} shown`;
    animateCards();
  }

  // smooth category switch: fade out, swap, fade in
  function setFilter(id) {
    if (id === active) return;
    active = id;
    filterRow.querySelectorAll('.cert-filter').forEach(b => {
      const on = b.dataset.filter === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
    if (reduceMotion) { render(); return; }
    grid.classList.add('is-switching');
    setTimeout(() => { render(); grid.classList.remove('is-switching'); }, 180);
  }

  filterRow.addEventListener('click', e => {
    const b = e.target.closest('.cert-filter');
    if (b) setFilter(b.dataset.filter);
  });

  /* preview image failed (private file, offline, …) -> graceful placeholder */
  grid.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    const ph = document.createElement('span');
    ph.className = 'cert-fallback';
    ph.innerHTML = `${ICON.doc}<span>Preview unavailable</span>`;
    img.replaceWith(ph);
  }, true);

  /* ---------- quick preview dialog ---------- */
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.cert-thumb');
    if (!btn || btn.disabled) return;
    const cert = shown[+btn.dataset.i];
    const links = cert && linksFor(cert);
    if (!links) return;
    dlgTitle.textContent = cert.title;
    dlgOpen.href = links.view;
    frame.src = links.preview;
    dialog.showModal();
  });
  const closeDialog = () => dialog.close();
  document.getElementById('certDialogClose').addEventListener('click', closeDialog);
  dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => { frame.src = 'about:blank'; });

  render();
});