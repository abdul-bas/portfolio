const PROJECTS = {
    choicex: {
      name: 'ChoiceX – E-Commerce Platform',
      desc: 'Multi-vendor platform: Customer app, Seller web app and Admin web app on one Firebase backend',
      links: [
        { label: 'GitHub · User',   url: '' },
        { label: 'GitHub · Seller', url: '' },
        { label: 'GitHub · Admin',  url: '' },
        { label: 'APK · Customer',  url: '' },
        { label: 'Live · Seller',   url: '' },
        { label: 'Live · Admin',    url: '' },
      ],
    },
    movie: {
      name: 'Movie Review Hub',
      desc: 'Movie discovery and reviews with User and Admin roles, built local-first with Hive',
      links: [
        { label: 'GitHub', url: '' },
        { label: 'APK',    url: '' },
      ],
    },
    news: {
      name: 'News App',
      desc: 'Firebase Authentication, NewsAPI and Remote Config for country-based setup',
      links: [{ label: 'GitHub', url: '' }],
    },
    todo: {
      name: 'To-Do List App',
      desc: 'Task manager with Firestore CRUD, due dates and completion status',
      links: [{ label: 'GitHub', url: '' }],
    },
    native: {
      name: 'Native Features',
      desc: 'Flutter + Android native code over MethodChannel (GPS, camera, accelerometer)',
      links: [{ label: 'GitHub', url: '' }],
    },
    clones: {
      name: 'Responsive Website Clones',
      desc: '7UP, Kopiko and Tesla clones in HTML, CSS, Bootstrap and JavaScript',
      links: [
        { label: 'GitHub · 7UP',    url: '' },
        { label: 'GitHub · Kopiko', url: '' },
        { label: 'GitHub · Tesla',  url: '' },
        { label: 'Live · 7UP',      url: '' },
        { label: 'Live · Kopiko',   url: '' },
        { label: 'Live · Tesla',    url: '' },
      ],
    },
    portfolio: {
      name: 'Personal Portfolio',
      desc: 'This website',
      links: [],
    },
  };

  /* ================= YOUR SKILLS =================
     s(name, icon, [project ids], level)
     [] = familiar with, but not used in a project yet (amber label).     */
  const s = (name, icon, projects = [], level = '') => ({ name, icon, projects, level });
  const FLUTTER_APPS = ['choicex', 'movie', 'news', 'todo', 'native'];

  const SKILLS = [
    { title: 'Programming Languages', items: [
      s('Dart',       'logos:dart',       FLUTTER_APPS,                   'Primary'),
      s('JavaScript', 'logos:javascript', ['clones', 'portfolio'],        'Basic'),
      s('HTML',       'logos:html-5',     ['clones', 'portfolio'],        'Basic'),
      s('CSS',        'logos:css-3',      ['clones', 'portfolio'],        'Basic'),
    ]},
    { title: 'Frameworks & UI', items: [
      s('Flutter',              'logos:flutter',       FLUTTER_APPS),
      s('Bootstrap',            'logos:bootstrap',     ['clones'], 'Basic'),
      s('Responsive UI',        'mdi:responsive',      ['choicex', 'clones', 'portfolio']),
      s('Custom Widgets',       'mdi:widgets-outline', []),
      s('Navigation & Routing', 'mdi:routes',          ['choicex', 'movie']),
      s('Platform Channels',    'logos:android-icon',  ['native']),
    ]},
    { title: 'State Management', items: [
      s('BLoC / Cubit', 'mdi:sitemap-outline', ['choicex']),
      s('Provider',     'mdi:layers-outline',  ['choicex']),
      s('GetX',         'mdi:flash-outline',   ['choicex']),
    ]},
    { title: 'Firebase & Backend', items: [
      s('Firebase Core & Config', 'logos:firebase',            ['choicex', 'news', 'todo']),
      s('Authentication',         'mdi:account-lock-outline',  ['choicex', 'news']),
      s('Google & Facebook Auth', 'mdi:login-variant',         []),
      s('Cloud Firestore',        'mdi:database-outline',      ['choicex', 'todo']),
      s('Realtime Database',      'mdi:database-sync-outline', ['choicex']),
      s('Firebase Storage',       'mdi:cloud-upload-outline',  ['choicex']),
      s('Cloud Messaging (FCM)',  'mdi:bell-ring-outline',     []),
      s('Remote Config',          'mdi:tune-variant',          ['news']),
      s('Analytics',              'mdi:chart-line',            []),
      s('Crashlytics',            'mdi:bug-outline',           []),
    ]},
    { title: 'API Integration', items: [
      s('REST APIs',          'mdi:api',                  ['choicex', 'news']),
      s('Stripe Payments',    'logos:stripe',             ['choicex']),
      s('Dio',                'mdi:lan-connect',          []),
      s('HTTP Requests',      'mdi:swap-horizontal',      []),
      s('JSON Parsing',       'mdi:code-json',            ['news']),
      s('API Error Handling', 'mdi:alert-circle-outline', []),
      s('Dio Interceptors',   'mdi:filter-outline',       []),
    ]},
    { title: 'Local Storage', items: [
      s('Hive',                   'mdi:beehive-outline',     ['movie']),
      s('SQLite',                 'logos:sqlite',            []),
      s('SharedPreferences',      'mdi:cog-outline',         ['choicex', 'movie']),
      s('Flutter Secure Storage', 'mdi:shield-lock-outline', []),
    ]},
    { title: 'Architecture & Patterns', items: [
      s('Feature-based Architecture', 'mdi:layers-triple-outline',  ['choicex']),
      s('Clean Architecture',         'mdi:layers-outline',         []),
      s('MVVM',                       'mdi:view-dashboard-outline', []),
      s('MVC',                        'mdi:view-grid-outline',      []),
      s('Repository Pattern',         'mdi:source-repository',      []),
      s('Layered Architecture',       'mdi:format-list-group',      []),
    ]},
    { title: 'Tools & Fundamentals', items: [
      s('Git & GitHub',   'logos:git-icon',           ['choicex', 'movie', 'news', 'todo', 'native', 'clones', 'portfolio']),
      s('Android Studio', 'logos:android-icon',       ['native']),
      s('VS Code',        'logos:visual-studio-code', ['clones', 'portfolio']),
      s('Postman',        'logos:postman-icon',       [], 'Basics'),
      s('Figma',          'logos:figma',              []),
      s('OOP',            'mdi:cube-outline',         FLUTTER_APPS),
      s('DSA',            'mdi:graph-outline',        []),
    ]},
  ];