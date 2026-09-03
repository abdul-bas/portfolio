
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
    image: "assets/images/projects_images/kidoo_img.jpeg",
    category: "flutter",
    stack: ["Flutter", "Dart", "UI/UX", "Quiz", "Gamification"],
    live: "#",
    code: "https://github.com/abdul-bas/meetup_app"
  },

  // =========================
  // FLUTTER WEB
  // =========================

  {
    title: "choice_x(seller)",
    description:
      "ChoiceX Seller is a Flutter Web application that provides sellers with a secure dashboard to manage their online store. It includes secure authentication, complete product CRUD operations, order management, return and refund handling, and an integrated chat system for communication. The dashboard provides sellers with a centralized platform to manage products, customer interactions, and orders efficiently.",
    image: "assets/images/projects_images/choice_x_seller.png",
    category: "flutter-web",
    stack: ["Flutter","Dart", "Firebase", "REST APIs"," Provider", "GetX"],
    live: "https://choice8590-seller.web.app/",
    code: "https://github.com/abdul-bas/choice_X-seller-"
  },
{
    title: "choice_x(admin)",
    description:
      "ChoiceX Admin is a Flutter Web application that provides a secure admin dashboard for managing the entire e-commerce platform. It includes secure authentication, product and category management with complete CRUD operations, user and seller management, order monitoring, return and refund management, and promotional features such as brand management and coupon management. The dashboard provides administrators with centralized control over products, categories, brands, users, sellers, orders, refunds, and promotional activities",
    image: "assets/images/projects_images/choice_x_admin.png",
    category: "flutter-web",
    stack: ["Flutter","Dart", "Firebase", "REST APIs"," Provider", ],
    live: "https://choice8590-admi.web.app/",
    code: "https://github.com/abdul-bas/choice_X-admin-"
  },
  

  // =========================
  // HTML & CSS & JAVASCRIPT & BOOTSTRAP
  // =========================
{
  title: "7UP Website Clone",
  description:
    "A responsive website clone inspired by the 7UP brand, developed using HTML and CSS. Recreated the main layout, sections, navigation, and brand-focused design with a responsive interface.",
  image: "assets/images/projects_images/7up.png",
    category: "bootstrap",
  stack: ["HTML", "CSS"],
  live: "https://abdul-bas.github.io/7up_clone/",
  code: "https://github.com/abdul-bas/7up_clone"
},

{
  title: "Kopiko Website Clone",
  description:
    "A responsive website clone inspired by the Kopiko brand, developed using HTML, CSS, JavaScript, and Bootstrap. Recreated the website layout with responsive sections, navigation, and interactive elements.",
  image: "assets/images/projects_images/kopiko.png",
  category: "bootstrap",
  stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  live: "https://abdul-bas.github.io/kopiko_responsive_web/",
  code: "https://github.com/abdul-bas/kopiko_responsive_web"
},

{
  title: "Tesla Website Clone",
  description:
    "A responsive website clone inspired by Tesla, developed using HTML and CSS. Recreated the modern automotive-style layout with responsive sections, navigation, and clean user interface elements.",
  image: "assets/images/projects_images/tesla.png",
    category: "bootstrap",
  stack: ["HTML", "CSS"],
  live: "https://abdul-bas.github.io/tesla_clone/",
  code: "https://github.com/abdul-bas/tesla_clone"
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