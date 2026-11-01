const tierFilters = ["featured", "mini", "other"];
const projects = [
  // FEATURED FLUTTER PROJECTS

  {
    title: "ChoiceX – Customer App",
    description:
      "A multi-vendor e-commerce mobile application that enables customers to browse products, search and filter items, manage carts and wishlists, place orders, track order status, request returns and refunds, and complete purchases through Stripe integration. Built with Firebase services and state management solutions.",
    image: "assets/images/projects_images/choice_x.png",
    category: "flutter",
    tier: "featured",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "BLoC", "Provider", "Stripe"],
    live: "https://apkpure.net/choicex/com.example.coice",
    code: "https://github.com/abdul-bas/choiceX-user-"
  },

  {
    title: "Thinksy AI",
    description:
      "An AI-powered chat application integrating Google Gemini API to generate intelligent responses. Features Firebase Authentication, conversation context handling, and a structured architecture using BLoC for state management and Dio for API communication.",
    image: "assets/images/projects_images/thinksy_ai.png",
    category: "flutter",
    tier: "featured",
    stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "Firebase Auth", "Dio", "Gemini API"],
    live: "#",
    code: ""
  },

  {
    title: "Netflix Clone",
    description:
      "A Netflix-inspired movie discovery application featuring dynamic movie listings, trending content, upcoming releases, and search functionality. Integrated TMDB REST APIs using Dio, with BLoC state management, debounced search, and loading and error handling.",
    image: "assets/images/projects_images/netflix_clone.png",
    category: "flutter",
    tier: "featured",
    stack: ["Flutter", "Dart", "BLoC", "Dio", "REST APIs", "TMDB"],
    live: "#",
    code: "https://github.com/abdul-bas/court-click-mt"
  },

  {
    title: "Expenzia – Expense Tracker",
    description:
      "An expense-tracking application designed to manage income and expenses, view transaction history, and monitor financial activity through an organized dashboard. Built using BLoC and Clean Architecture with a Figma-based user interface.",
    image: "assets/images/projects_images/expenzia.png",
    category: "flutter",
    tier: "featured",
    stack: ["Flutter", "Dart", "BLoC", "Clean Architecture"],
    live: "#",
    code: "https://github.com/abdul-bas/Expenzia",
    design: "https://www.figma.com/design/WR6AeuIpBm5pI2i1RV7hYh/Flutter-Machine-Test--Copy-?t=YXs1U6DPGvo3rre3-0"
  },

  {
    title: "Movie Review Hub",
    description:
      "A movie discovery and review application with separate Admin and User roles. Users can explore movies, watch trailers, rate movies, write reviews, and interact through comments. Admins can manage movie content through CRUD operations. Uses Hive and SharedPreferences for local data storage.",
    image: "assets/images/projects_images/movie_review_hub.png",
    category: "flutter",
    tier: "featured",
    stack: ["Flutter", "Dart", "Hive", "SharedPreferences"],
    live: "https://apkpure.net/review-hub/com.example.review_hub",
    code: "https://github.com/abdul-bas/movie_review_hub"
  },

  // CHOICEX WEB APPLICATIONS

  {
    title: "ChoiceX – Seller Dashboard",
    description:
      "A Flutter Web application that allows sellers to manage their stores through product and order management, return and refund handling, and customer communication using an integrated chat system.",
    image: "assets/images/projects_images/choice_x_seller.png",
    category: "flutter-web",
    tier: "featured",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Provider", "GetX"],
    live: "https://choice8590-seller.web.app/",
    code: "https://github.com/abdul-bas/choice_X-seller-"
  },

  {
    title: "ChoiceX – Admin Dashboard",
    description:
      "A Flutter Web admin dashboard for managing the e-commerce platform, including products, categories, brands, users, sellers, orders, returns, refunds, and promotional coupons.",
    image: "assets/images/projects_images/choice_x_admin.png",
    category: "flutter-web",
    tier: "featured",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Provider"],
    live: "https://choice8590-admi.web.app/",
    code: "https://github.com/abdul-bas/choice_X-admin-"
  },

  // ADDITIONAL FLUTTER PROJECTS

  {
    title: "News Application",
    description:
      "A news application featuring Firebase Authentication, live news data through NewsAPI, and dynamic country-based configuration using Firebase Remote Config.",
    image: "assets/images/projects_images/news_app.jpeg",
    category: "flutter",
    tier: "mini",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Remote Config"],
    live: "#",
    code: "https://github.com/abdul-bas/news_app"
  },

  {
    title: "To-Do List App",
    description:
      "A task management application that supports creating, updating, deleting, and managing tasks using Firebase Cloud Firestore.",
    image: "assets/images/projects_images/to_do_list.png",
    category: "flutter",
    tier: "mini",
    stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "CRUD"],
    live: "#",
    code: "https://github.com/abdul-bas/todo-list-app"
  },

  {
    title: "Kiddo Learn Adventure",
    description:
      "An educational application for children featuring alphabet learning, interactive quizzes, XP, coins, achievements, and gamified learning activities.",
    image: "assets/images/projects_images/kidoo_img.jpeg",
    category: "flutter",
    tier: "mini",
    stack: ["Flutter", "Dart", "UI/UX", "Quizzes", "Gamification"],
    live: "#",
    code: "https://github.com/abdul-bas/meetup_app"
  },

  {
    title: "Flutter Native Integration",
    description:
      "An exploration of Flutter and Android native integration using MethodChannel to access device features such as GPS, camera, and accelerometer.",
    image: "assets/images/projects_images/native_features.png",
    category: "flutter",
    tier: "mini",
    stack: ["Flutter", "Dart", "Android", "Kotlin", "MethodChannel"],
    live: "#",
    code: ""
  },

  // OTHER TECHNOLOGY PROJECTS

  {
    title: "7UP Website Clone",
    description:
      "A responsive website recreation inspired by the 7UP brand, featuring its main layout, navigation, sections, and brand-focused design.",
    image: "assets/images/projects_images/7up.png",
    category: "web",
    tier: "other",
    stack: ["HTML", "CSS"],
    live: "https://abdul-bas.github.io/7up_clone/",
    code: "https://github.com/abdul-bas/7up_clone"
  },

  {
    title: "Kopiko Website Clone",
    description:
      "A responsive website recreation inspired by the Kopiko brand, featuring responsive layouts, navigation, and interactive elements.",
    image: "assets/images/projects_images/kopiko.png",
    category: "web",
    tier: "other",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    live: "https://abdul-bas.github.io/kopiko_responsive_web/",
    code: "https://github.com/abdul-bas/kopiko_responsive_web"
  },

  {
    title: "Tesla Website Clone",
    description:
      "A responsive website recreation inspired by Tesla, featuring a modern automotive-style layout, navigation, and responsive sections.",
    image: "assets/images/projects_images/tesla.png",
    category: "web",
    tier: "other",
    stack: ["HTML", "CSS"],
    live: "https://abdul-bas.github.io/tesla_clone/",
    code: "https://github.com/abdul-bas/tesla_clone"
  }
];

const categoryLabels = {
  flutter: "Flutter App",
  "flutter-web": "Flutter Web",
  "html-css": "HTML & CSS",
  "html-css-js": "HTML & CSS & JavaScript",
  bootstrap: "HTML, CSS, JavaScript & Bootstrap"
};