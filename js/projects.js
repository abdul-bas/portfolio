




function hasLink(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}


function chevronIcon() {
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
  );
}


function cardTemplate(project, index) {
  const stackChips = project.stack
    .map((item) => `<span class="stack-chip">${item}</span>`)
    .join("");

  const liveButton = hasLink(project.live)
    ? `<a class="btn btn-live" href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
    : `<span class="btn btn-live btn-disabled" aria-disabled="true">Coming Soon</span>`;

  const codeButton = hasLink(project.code)
    ? `<a class="btn btn-code" href="${project.code}" target="_blank" rel="noopener noreferrer">Code</a>`
    : "";

  return `
    <article class="project-card" data-index="${index}" tabindex="0" role="button"
      aria-expanded="false" aria-label="${project.title}, show details">
      <div class="project-card-inner">
        <div class="project-visual">
          <img class="project-image" src="${project.image}" alt="${project.title} preview" loading="lazy" />
        </div>

        <div class="project-summary">
          <h3 class="project-title">${project.title}</h3>

          <span class="expand-toggle">View details ${chevronIcon()}</span>
        </div>

        <div class="project-details">
          <div class="project-details-inner">
            <div class="project-details-content">
              <div class="project-stack">${stackChips}</div>
              <p class="project-desc">${project.description}</p>
              <div class="project-actions">
                ${liveButton}
                ${codeButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}


// SCROLL-REVEAL ANIMATION


let revealObserver = null;

function setupRevealAnimation(grid) {
  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  const cards = grid.querySelectorAll(".project-card");
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${Math.min(i * 90, 360)}ms`;
   
    card.style.animationDelay = `${(i % 6) * -1.3}s`;
    revealObserver.observe(card);
  });
}


// EXPAND / COLLAPSE


function toggleCard(card) {
  const isExpanded = card.classList.toggle("expanded");
  card.setAttribute("aria-expanded", isExpanded ? "true" : "false");
}


// RENDER PROJECTS


function renderProjects(filter) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  let filtered;
  if (filter === "all") {
    filtered = projects;
  } else if (tierFilters.includes(filter)) {
    // Featured / Mini / Other buttons
    filtered = projects.filter((project) => (project.tier || "other") === filter);
  } else {
    // Flutter / Flutter Web / HTML, CSS, JS & Bootstrap buttons (unchanged)
    filtered = projects.filter((project) => project.category === filter);
  }

  grid.innerHTML = filtered.length
    ? filtered.map((project, index) => cardTemplate(project, index)).join("")
    : `<p class="empty-state">No projects in this category yet.</p>`;

  setupRevealAnimation(grid);
}


// EVENTS


document.addEventListener("DOMContentLoaded", () => {
  const filterRow = document.getElementById("filterRow");
  const grid = document.getElementById("projectsGrid");
  if (!filterRow || !grid) return;

  grid.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const card = event.target.closest(".project-card");
    if (card) toggleCard(card);
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".project-card");
    if (!card) return;
    event.preventDefault();
    toggleCard(card);
  });

  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    filterRow.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });

  renderProjects("all");
});