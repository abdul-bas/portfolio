const PROJECTS = {
  choicex: {
    name: 'ChoiceX – Multi-Vendor E-Commerce Platform',
    desc: 'Full-stack e-commerce platform featuring Customer mobile app, Seller web app and Admin web app with a shared Firebase backend.',
    links: [
      { label: 'GitHub · Customer', url: '' },
      { label: 'GitHub · Seller', url: '' },
      { label: 'GitHub · Admin', url: '' },
      { label: 'APK · Customer', url: '' },
      { label: 'Live · Seller', url: '' },
      { label: 'Live · Admin', url: '' },
    ],
  },

  thinksy: {
    name: 'Thinksy AI – AI Chat Application',
    desc: 'AI-powered chat application integrating Google Gemini API, Firebase Authentication and conversation context with BLoC and Clean Architecture.',
    links: [
      { label: 'GitHub', url: '' },
      { label: 'APK', url: '' },
    ],
  },

  netflix: {
    name: 'Netflix Clone – Movie Discovery App',
    desc: 'Netflix-inspired movie discovery application featuring seven screens, TMDB API integration, movie listings and debounced search.',
    links: [
      { label: 'GitHub', url: 'https://github.com/abdul-bas/court-click-mt' },
      { label: 'APK', url: '' },
    ],
  },

  expenzia: {
    name: 'Expenzia – Expense Tracker',
    desc: 'Expense management application featuring income and expense tracking, transaction history and dashboard insights, built using BLoC and Clean Architecture.',
    links: [
      { label: 'GitHub', url: 'https://github.com/abdul-bas/Expenzia' },
      { label: 'Figma', url: 'https://www.figma.com/design/WR6AeuIpBm5pI2i1RV7hYh/Flutter-Machine-Test--Copy-?t=YXs1U6DPGvo3rre3-0' },
    ],
  },

  movie: {
    name: 'Movie Review Hub',
    desc: 'Movie discovery and review application with User and Admin roles, movie management, ratings and reviews using local storage.',
    links: [
      { label: 'GitHub', url: '' },
      { label: 'APK', url: '' },
    ],
  },

  news: {
    name: 'News App',
    desc: 'News application integrating Firebase Authentication, NewsAPI and Firebase Remote Config for country-based news settings.',
    links: [
      { label: 'GitHub', url: '' },
    ],
  },

  todo: {
    name: 'To-Do List App',
    desc: 'Task management application with Firebase Cloud Firestore CRUD operations, due dates and completion tracking.',
    links: [
      { label: 'GitHub', url: '' },
    ],
  },

  native: {
    name: 'Flutter Native Integration',
    desc: 'Exploration of Flutter and Android native integration using MethodChannel for GPS, camera and accelerometer features.',
    links: [
      { label: 'GitHub', url: '' },
    ],
  },

  clones: {
    name: 'Responsive Website Clones',
    desc: 'Responsive website recreations of 7UP, Kopiko and Tesla using HTML, CSS, Bootstrap and JavaScript.',
    links: [
      { label: 'GitHub · 7UP', url: '' },
      { label: 'GitHub · Kopiko', url: '' },
      { label: 'GitHub · Tesla', url: '' },
      { label: 'Live · 7UP', url: '' },
      { label: 'Live · Kopiko', url: '' },
      { label: 'Live · Tesla', url: '' },
    ],
  },

  portfolio: {
    name: 'Personal Portfolio',
    desc: 'Personal portfolio showcasing Flutter projects, technical skills, certifications and development experience.',
    links: [
      { label: 'GitHub', url: 'https://github.com/abdul-bas' },
      { label: 'Live Website', url: 'https://abdul-bas.github.io/portfolio/' },
    ],
  },
};

  /* ================= YOUR SKILLS =================
     s(name, icon, [project ids], level)
     [] = familiar with, but not used in a project yet (amber label).     */
  const s = (name, icon, projects = [], level = '') => ({ name, icon, projects, level });
  const FLUTTER_APPS = ['choicex', 'movie', 'news', 'todo', 'native'];
const SKILLS = [
  {
    title: 'Programming Languages',
    items: [
      s('Dart', 'logos:dart', FLUTTER_APPS, 'Primary'),
      s('JavaScript', 'logos:javascript', ['clones', 'portfolio'], 'Basic'),
      s('HTML', 'logos:html-5', ['clones', 'portfolio'], 'Basic'),
      s('CSS', 'logos:css-3', ['clones', 'portfolio'], 'Basic'),
    ]
  },

  {
    title: 'Frameworks & UI',
    items: [
      s('Flutter', 'logos:flutter', FLUTTER_APPS, 'Primary'),
      s('Bootstrap', 'logos:bootstrap', ['clones'], 'Basic'),
      s('Responsive UI', 'mdi:responsive', ['choicex', 'clones', 'portfolio']),
      s('Custom Widgets', 'mdi:widgets-outline', FLUTTER_APPS),
      s('Navigation & Routing', 'mdi:routes', FLUTTER_APPS),
      s('Platform Channels', 'logos:android-icon', ['native']),
    ]
  },

  {
    title: 'State Management',
    items: [
      s('BLoC ', 'mdi:sitemap-outline', ['choicex', 'thinksy', 'netflix', 'expenzia']),
      s('Provider', 'mdi:layers-outline', ['choicex', 'luxora']),
      s('GetX', 'mdi:flash-outline', ['choicex']),
    ]
  },

  {
    title: 'Firebase & Backend',
    items: [
      s('Firebase Core & Config', 'logos:firebase', ['choicex', 'news', 'todo']),
      s('Firebase Authentication', 'mdi:account-lock-outline', ['choicex', 'news', 'thinksy']),
      s('Google & Facebook Auth', 'mdi:login-variant', ['choicex']),
      s('Cloud Firestore', 'mdi:database-outline', ['choicex', 'todo']),
      s('Realtime Database', 'mdi:database-sync-outline', ['choicex']),
      s('Firebase Storage', 'mdi:cloud-upload-outline', ['choicex']),
      s('Cloud Messaging (FCM)', 'mdi:bell-ring-outline', [], 'Learning'),
      s('Remote Config', 'mdi:tune-variant', ['news']),
      s('Analytics', 'mdi:chart-line', [], 'Basic'),
      s('Crashlytics', 'mdi:bug-outline', [], 'Basic'),
    ]
  },

  {
    title: 'API Integration',
    items: [
      s('REST API Integration', 'mdi:api', ['choicex', 'news', 'netflix', 'thinksy', 'luxora']),
      s('Dio', 'mdi:lan-connect', ['netflix', 'thinksy']),
      s('HTTP Requests', 'mdi:swap-horizontal', ['news', 'choicex']),
      s('JSON Parsing', 'mdi:code-json', ['news', 'netflix', 'thinksy']),
      s('API Error Handling', 'mdi:alert-circle-outline', ['netflix', 'thinksy']),
      s('Dio Interceptors', 'mdi:filter-outline', [], 'Learning'),
      s('Stripe Payments', 'logos:stripe', ['choicex'], 'Basic'),
      s('Google Gemini API', 'mdi:creation-outline', ['thinksy']),
    ]
  },

  {
    title: 'Local Storage',
    items: [
      s('Hive', 'mdi:beehive-outline', ['movie']),
      s('SQLite', 'logos:sqlite', ['expenzia'], 'Basic'),
      s('SharedPreferences', 'mdi:cog-outline', ['choicex', 'movie']),
      s('Flutter Secure Storage', 'mdi:shield-lock-outline', [], 'Basic'),
    ]
  },

  {
    title: 'Architecture & Design Patterns',
    items: [
    
      s('Clean Architecture', 'mdi:layers-outline', ['thinksy', 'expenzia','netflix']),
      s('MVVM', 'mdi:view-dashboard-outline', ['luxora'], 'Basic'),
      s('MVC', 'mdi:view-grid-outline', [], 'Basic'),
      s('Repository Pattern', 'mdi:source-repository', ['thinksy', 'netflix', 'expenzia']),
      s('Layered Architecture', 'mdi:format-list-group', ['netflix','choicex']),
    ]
  },

  {
    title: 'Tools & Fundamentals',
    items: [
      s('Git & GitHub', 'logos:git-icon', [
        'choicex', 'movie', 'news', 'todo', 'native',
        'clones', 'portfolio', 'thinksy', 'netflix', 'expenzia'
      ]),
      s('Android Studio', 'logos:android-icon', FLUTTER_APPS),
      s('VS Code', 'logos:visual-studio-code', ['clones', 'portfolio']),
      s('Postman', 'logos:postman-icon', [], 'Basic'),
      s('Figma', 'logos:figma', ['expenzia','netflix','choicex','movie','news','todo']),
      s('Object-Oriented Programming', 'mdi:cube-outline', FLUTTER_APPS),
      s('Data Structures & Algorithms', 'mdi:graph-outline', [], 'Fundamentals'),
      s('Debugging & Troubleshooting', 'mdi:bug-check-outline', FLUTTER_APPS),
    ]
  },
];