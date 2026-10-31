document.addEventListener('DOMContentLoaded', () => {


  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const iconSrc = n =>
    `https://api.iconify.design/${n}.svg` + (n.startsWith('mdi:') ? '?color=%2338bdf8' : '');

  /* ---- header stats ---- */
  const allItems  = SKILLS.flatMap(c => c.items);
  const usedCount = allItems.filter(i => i.projects.length).length;
  const statsEl   = document.getElementById('skills-stats');
  if (statsEl) {
    statsEl.innerHTML =
      `<span><strong>${allItems.length}</strong> skills</span>` +
      `<span><strong>${usedCount}</strong> used in projects</span>` +
      `<span><strong>${Object.keys(PROJECTS).length}</strong> projects</span>`;
  }

  /* ---- render cards ---- */
  grid.innerHTML = SKILLS.map((cat, ci) => {
    const used = cat.items.filter(i => i.projects.length).length;
    const pct  = Math.round((used / cat.items.length) * 100);
    return `
    <article class="skill-card">
      <header class="skill-card-head">
        <h3 class="card-title">${esc(cat.title)}</h3>
        <span class="skill-count" title="${used} of ${cat.items.length} used in projects">${used}/${cat.items.length}</span>
      </header>
      <div class="skill-meter" aria-hidden="true"><i style="width:${pct}%"></i></div>
      <ul class="skill-list">
        ${cat.items.map((it, ii) => `
          <li>
            <button type="button"
                    class="skill-item ${it.projects.length ? '' : 'is-learning'}"
                    data-c="${ci}" data-i="${ii}" aria-expanded="false">
              <img src="${iconSrc(it.icon)}" alt="" width="18" height="18" decoding="async" />
              <span class="skill-name">${esc(it.name)}</span>
              <span class="skill-dot"></span>
            </button>
          </li>`).join('')}
      </ul>
    </article>`;
  }).join('');

  /* ---- icon fix: if an icon fails to load, show a letter badge instead ---- */
  grid.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    const name = img.closest('.skill-item')?.querySelector('.skill-name')?.textContent || '?';
    const badge = document.createElement('span');
    badge.className = 'skill-fallback';
    badge.textContent = name.trim().charAt(0).toUpperCase();
    img.replaceWith(badge);
  }, true);

  /* ---- popover ---- */
  const pop = document.createElement('div');
  pop.className = 'skill-pop';
  pop.setAttribute('role', 'tooltip');
  document.body.appendChild(pop);

  let current = null, pinned = false, raf = 0;

  function projectHTML(id) {
    const p = PROJECTS[id] || { name: id, desc: '', links: [] };
    const links = (p.links || []).filter(l => l.url);
    return `<li>${esc(p.name)}
      ${p.desc ? `<small>${esc(p.desc)}</small>` : ''}
      ${links.length ? `<span class="pop-links">${links.map(l =>
        `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</span>` : ''}
    </li>`;
  }

  function content(item) {
    const head = `
      <div class="pop-head">
        <span class="pop-title">${esc(item.name)}</span>
        ${item.level ? `<span class="pop-level">${esc(item.level)}</span>` : ''}
      </div>`;
    if (!item.projects.length) {
      return head + `
        <span class="pop-status learning"><i class="skill-dot is-learning"></i>Familiar with</span>
        <p class="pop-note">I'm familiar with this, but I haven't used it in a project yet.</p>`;
    }
    const n = item.projects.length;
    return head + `
      <span class="pop-status used"><i class="skill-dot"></i>Used in ${n} project${n > 1 ? 's' : ''}</span>
      <ul class="pop-projects">${item.projects.map(projectHTML).join('')}</ul>`;
  }

  function place() {
    if (!current) return;
    const r = current.getBoundingClientRect();
    const w = pop.offsetWidth, h = pop.offsetHeight;
    const left = Math.min(Math.max(12, r.left), window.innerWidth - w - 12);
    let top = r.bottom + 8;
    if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 8);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }
  function loop() { place(); raf = current ? requestAnimationFrame(loop) : 0; }

  function open(btn) {
    if (current) current.setAttribute('aria-expanded', 'false');
    current = btn;
    btn.setAttribute('aria-expanded', 'true');
    pop.innerHTML = content(SKILLS[btn.dataset.c].items[btn.dataset.i]);
    pop.classList.add('show');
    if (!raf) loop();
  }

  function close() {
    if (current) current.setAttribute('aria-expanded', 'false');
    current = null;
    pinned = false;
    pop.classList.remove('show', 'pinned');
    cancelAnimationFrame(raf);
    raf = 0;
  }

  grid.querySelectorAll('.skill-item').forEach(btn => {
    btn.addEventListener('mouseenter', () => { if (!pinned) open(btn); });
    btn.addEventListener('mouseleave', () => { if (!pinned) close(); });
    btn.addEventListener('focus',      () => { if (!pinned) open(btn); });
    btn.addEventListener('blur',       () => { if (!pinned) close(); });
    btn.addEventListener('click', () => {
      if (pinned && current === btn) close();
      else { pinned = true; open(btn); pop.classList.add('pinned'); }
    });
  });

  document.addEventListener('click', e => {
    if (pinned && !e.target.closest('.skill-item') && !e.target.closest('.skill-pop')) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---- filter: All / In projects / Familiar with ---- */
  const filterBtns = document.querySelectorAll('.skills-filter button');
  function applyFilter(f) {
    close();
    grid.querySelectorAll('.skill-list li').forEach(li => {
      const learning = li.firstElementChild.classList.contains('is-learning');
      li.hidden = (f === 'used' && learning) || (f === 'learning' && !learning);
    });
    grid.querySelectorAll('.skill-card').forEach(card => {
      card.hidden = !card.querySelector('.skill-list li:not([hidden])');
    });
  }
  filterBtns.forEach(b => b.addEventListener('click', () => {
    filterBtns.forEach(x => {
      x.classList.toggle('is-active', x === b);
      x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
    });
    applyFilter(b.dataset.filter);
  }));
});