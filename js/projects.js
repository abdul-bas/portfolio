
const projects = [
  // =========================
  // FLUTTER APPS
  // =========================

  {
    title: "Movie Review Hub",
    description:
      "Movie Review Hub is a responsive movie review application built with Flutter, designed with separate Admin and User roles. Users can explore movies, view detailed information, watch trailers, rate movies, write reviews, and interact through comments. Admins can manage movie content using dynamic CRUD operations. The application includes authentication and uses Hive for efficient local data storage, providing a smooth and responsive user experience",
    image: "assets/images/projects_images/movie_review_hub.png",
    category: "flutter",
    stack: ["Flutter", "Dart", "Hive", 'SharedPreferences'],
    live: "https://apkpure.net/review-hub/com.example.review_hub",
    code: "https://github.com/abdul-bas/movie_review_hub"
  },

  {
    title: "ChoiceX(user)",
    description:
      "ChoiceX is a full-stack e-commerce application developed with Flutter, focused on providing a smooth shopping experience for users. The user side allows customers to browse products, view product details, search and explore items, add products to the cart, manage their orders, and complete purchases through secure Stripe payment integration. Firebase is used for authentication and backend services, while the application follows a responsive and user-friendly interface for a seamless shopping experience",
    image: "assets/images/projects_images/choice_x.png",
    category: "flutter",
    stack: ["Flutter","Dart", "Firebase", "REST APIs", "BLoC", "Provider",],
    live: "https://apkpure.net/choicex/com.example.coice",
    code: "https://github.com/abdul-bas/choiceX-user-"
  },

  {
    title: "News Application",
    description:
      "A news application with Firebase authentication, live news data from News API, and dynamic country-based configuration using Firebase Remote Config.",
    image: "assets/images/projects_images/news_app.jpeg",
    category: "flutter",
    stack: ["Flutter", "Firebase", "News API", "Remote Config"],
    live: "#",
    code: "https://github.com/abdul-bas/news_app"
  },

  {
    title: "To-Do List App",
    description:
      "A task management application that allows users to create, update, delete, and manage tasks using Firebase Cloud Firestore.",
    image: "assets/images/projects_images/to_do_list.png",
    category: "flutter",
    stack: ["Flutter", "Dart", "Firestore", "CRUD"],
    live: "#",
    code: "https://github.com/abdul-bas/todo-list-app"
  },

  {
    title: "Kiddo Learn Adventure",
    description:
      "An educational learning application for children featuring alphabet learning, quizzes, XP, coins, achievements, and interactive learning activities.",
    image: "assets/images/kiddo-learn.jpg",
    category: "flutter",
    stack: ["Flutter", "Dart", "UI/UX", "Quiz", "Gamification"],
    live: "#",
    code: "#"
  },

  // =========================
  // FLUTTER WEB
  // =========================

  {
    title: "Flutter Web Application",
    description:
      "A responsive web application developed with Flutter Web, focusing on clean UI, responsive layouts, reusable widgets, and smooth user interaction.",
    image: "assets/images/flutter-web.jpg",
    category: "flutter-web",
    stack: ["Flutter Web", "Dart", "Responsive UI", "Firebase"],
    live: "#",
    code: "#"
  },

  // =========================
  // HTML & CSS
  // =========================

  {
    title: "Responsive Portfolio Website",
    description:
      "A modern responsive portfolio website designed using semantic HTML and CSS with responsive layouts, animations, custom sections, and clean UI.",
    image: "assets/images/portfolio.jpg",
    category: "html-css",
    stack: ["HTML5", "CSS3", "Responsive Design"],
    live: "#",
    code: "#"
  },

  // =========================
  // HTML & CSS & JAVASCRIPT
  // =========================

  {
    title: "JavaScript Web Application",
    description:
      "An interactive web application built with HTML, CSS, and JavaScript featuring dynamic content, DOM manipulation, event handling, and responsive UI.",
    image: "assets/images/javascript-project.jpg",
    category: "html-css-js",
    stack: ["HTML5", "CSS3", "JavaScript", "DOM"],
    live: "#",
    code: "#"
  },

  // =========================
  // HTML & CSS & JAVASCRIPT & BOOTSTRAP
  // =========================

  {
    title: "Responsive Bootstrap Website",
    description:
      "A responsive website built using HTML, CSS, JavaScript, and Bootstrap with reusable components, responsive layouts, navigation, forms, and interactive elements.",
    image: "assets/images/bootstrap-project.jpg",
    category: "bootstrap",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    live: "#",
    code: "#"
  }
];

// =========================
// CATEGORY LABELS
// =========================

const categoryLabels = {
  flutter: "Flutter App",
  "flutter-web": "Flutter Web",
  "html-css": "HTML & CSS",
  "html-css-js": "HTML & CSS & JavaScript",
  bootstrap: "HTML, CSS, JavaScript & Bootstrap"
};

// A link is "real" once it's been filled in with an actual URL.
// Until then we skip the button instead of shipping a dead "#" link.
function hasLink(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

// =========================
// PROJECT CARD
// =========================

function cardTemplate(project) {
  const tagLabel = categoryLabels[project.category] || project.category;

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
    <article class="project-card">
      <img
        class="project-image"
        src="${project.image}"
        alt="${project.title} preview"
        loading="lazy"
      />

      <div class="project-body">
        <span class="project-tag">${tagLabel}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-stack">${stackChips}</div>
        <div class="project-actions">
          ${liveButton}
          ${codeButton}
        </div>
      </div>
    </article>
  `;
}

// =========================
// RENDER PROJECTS
// =========================

function renderProjects(filter) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  grid.innerHTML = filtered.length
    ? filtered.map(cardTemplate).join("")
    : `<p class="empty-state">No projects in this category yet.</p>`;
}

// =========================
// FILTER BUTTONS
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const filterRow = document.getElementById("filterRow");
  if (!filterRow) return;

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