# Abdul Basith | Flutter Developer Portfolio

A responsive, dark-themed personal portfolio that showcases my Flutter applications, technical skills, certificates and education journey. It is built with plain HTML, CSS and JavaScript (no frameworks, no build step) and uses a **data-driven architecture**, so I can update my content by editing a few data files instead of touching the page markup.

**Live website:** https://abdul-bas.github.io/portfolio/

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [How Each Section Works](#how-each-section-works)
- [Updating the Content](#updating-the-content)
- [Run Locally](#run-locally)
- [Deployment](#deployment)
- [Accessibility and Performance](#accessibility-and-performance)
- [Connect With Me](#connect-with-me)

---

## Features

- **Hero** with a typewriter role animation, floating profile photo, "Open to Work" chip, social links and a downloadable resume.
- **About** section with a tilted photo frame, a Brototype verified badge and a short introduction.
- **Skills** grouped into 8 categories. Hovering or tapping a skill opens a popover showing the projects where I used it. A filter switches between *All*, *In projects* and *Familiar with*, and live stats are shown in the header.
- **Projects** with filters (Featured, Mini, Other, Flutter Apps, Flutter Web), expandable cards with stack chips and Live/Code buttons, a floating "hanging" animation on desktop and a swipeable carousel on mobile.
- **Certificates** with category filters, Google Drive thumbnails, a quick-preview dialog and cards that slide in alternately from the left and right.
- **Education timeline** with an alternating two-sided layout, a line that fills as you scroll, and a highlighted card for my Flutter immersive training.
- **Contact** section with a form that composes a pre-filled email through `mailto:`.
- **Navigation** with a sticky header, active-section tracking and a slide-in mobile menu.
- **Responsive** layout from large desktop down to small phones, with `prefers-reduced-motion` support.

---

## Tech Stack

| Area | Technology |
|------|------------|
| Markup | HTML5 (semantic sections, `<dialog>`, ARIA attributes) |
| Styling | CSS3 (custom properties, Grid, Flexbox, `color-mix`, CSS columns, keyframe animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Browser APIs | `IntersectionObserver`, `requestAnimationFrame`, `<dialog>`, `matchMedia` |
| Icons | Font Awesome 6.5.2, Devicon, Iconify API (skill icons) |
| Fonts | Sora, Inter, JetBrains Mono (Google Fonts) |
| Documents | Google Drive (certificate previews and links) |
| Hosting | GitHub Pages |

---

## Architecture

The portfolio follows a **data-driven, section-based architecture** with a clear separation of concerns:

1. **Data layer** (`data/`): plain JavaScript files that hold all content (projects, skills, certificates, education).
2. **Logic layer** (`js/`): one script per section that reads the data and renders the UI into empty containers in `index.html`.
3. **Presentation layer** (`css/`): one stylesheet per section, plus a shared `base.css` that holds the design tokens and global styles.
4. **Shell** (`index.html`): a single page that defines the sections and empty mount points such as `#projectsGrid`, `#skills-grid`, `#certGrid` and `#eduTimeline`.

### Data flow

```
 data/*.js                    js/*.js                      index.html
 (content as JS objects)      (render + behaviour)         (empty mount points)
 ───────────────────────      ────────────────────────     ─────────────────────
 project_data.js     ───────► projects.js       ────────►  #projectsGrid, #filterRow
 skills_data.js      ───────► skill.js          ────────►  #skills-grid, #skills-stats
 certificate_data.js ───────► certificate.js    ────────►  #certGrid, #certFilters
 education_data.js   ───────► education.js      ────────►  #eduTimeline, #eduFill
                              main.js           ────────►  header, nav, scroll-reveal,
                                                           contact form, footer year
```

Every script waits for `DOMContentLoaded`, checks that its data and DOM containers exist, and then renders. If a section's data or markup is missing, the script exits quietly without breaking the rest of the page.

### Design decisions

- **No framework or build tooling.** The site is static, loads fast and can be hosted anywhere.
- **Design tokens in `base.css`.** Colours, fonts, spacing, radii and easing are CSS variables on `:root`. Section stylesheets reuse them, so the theme stays consistent.
- **Scoped styles.** Sections use prefixes (`cert-`, `edu-`, `skill-`, `project-`, `contact-`) to avoid style collisions.
- **Safe rendering.** Dynamic text goes through an `esc()` helper that escapes HTML before it is inserted, and external links use `rel="noopener noreferrer"`.
- **Graceful fallbacks.** A failed skill icon becomes a letter badge, a failed certificate preview becomes a placeholder, and links that are empty or `#` become disabled "Coming Soon" or "Link unavailable" buttons.
- **Progressive enhancement.** Scroll animations are added by JavaScript only when `IntersectionObserver` is available and motion is not reduced, so content is never hidden if scripts fail.
- **Single source of truth for relationships.** Each skill lists the project IDs that used it, so the popovers, "used in projects" counts and stats are all computed from the data.

---

## Folder Structure

```
portfolio/
├── index.html
├── README.md
├── assets/
│   ├── icons/
│   ├── images/
│   │   ├── projects_images/        # project screenshots
│   │   ├── profile.png
│   │   ├── mine_last.jpg
│   │   ├── about_bg_img.png
│   │   ├── flutter_dev.png
│   │   ├── Verified Badge (1).png
│   │   └── Skills_Cartoon_Icons-*.png   # decorative section backgrounds
│   └── resume.pdf
├── css/
│   ├── base.css            # design tokens, reset, global utilities, reveal animations
│   ├── head_nav.css        # fixed header and navigation
│   ├── home.css            # hero section
│   ├── about.css           # about section
│   ├── skills.css          # skill cards, chips, popover
│   ├── projects.css        # project cards, filters, mobile carousel
│   ├── certificates.css    # certificate grid and preview dialog
│   ├── education.css       # timeline
│   └── contact.css         # contact form, footer, responsive rules
├── data/
│   ├── project_data.js     # projects, tier filters, category labels
│   ├── skills_data.js      # SKILLS list and PROJECTS lookup used by popovers
│   ├── certificate_data.js # certificate categories and entries
│   └── education_data.js   # education timeline entries
└── js/
    ├── main.js             # header, nav, scroll-reveal, contact form
    ├── projects.js         # project rendering, filtering, expand/collapse
    ├── skill.js            # skill rendering, popover, filtering, stats
    ├── certificate.js      # certificate rendering, filters, preview dialog
    └── education.js        # timeline rendering and scroll-fill line
```

---

## How Each Section Works

### Hero and Navigation (`home.css`, `head_nav.css`, `main.js`)
- The role text uses a CSS typewriter effect (`steps()` animation with a blinking cursor).
- The header gains a blurred background after scrolling, and the active link follows the section in view using an `IntersectionObserver`.
- On screens up to 768px the nav becomes a slide-in drawer controlled by a toggle button.

### Skills (`skills_data.js`, `skill.js`, `skills.css`)
- Skills are stored as `s(name, icon, [projectIds], level)`.
- An empty project list marks a skill as **Familiar with** (dashed outline).
- Icons come from the Iconify API, and cards use a masonry-style CSS column layout.
- The popover follows its skill on scroll (via `requestAnimationFrame`), pins on click, and closes on `Esc` or an outside click.

### Projects (`project_data.js`, `projects.js`, `projects.css`)
- Each project has a `category` (flutter, flutter-web, web) and a `tier` (featured, mini, other), and the filter buttons use both.
- Cards reveal on scroll, expand on hover, focus or tap, and are keyboard accessible (`Enter` / `Space`).
- On mobile the grid turns into a horizontal scroll-snap carousel.

### Certificates (`certificate_data.js`, `certificate.js`, `certificates.css`)
- A Google Drive share link is converted into a thumbnail URL and a preview URL.
- Clicking a thumbnail opens a native `<dialog>` containing the Drive preview, with an "Open in new tab" fallback.
- The featured certificate spans the full grid width.

### Education (`education_data.js`, `education.js`, `education.css`)
- Entries alternate left and right on desktop and collapse to a single column with a left-hand line on tablet and mobile.
- Nodes and cards animate in when scrolled into view, and the gradient line fills according to scroll progress.

### Contact (`contact.css`, `main.js`)
- Submitting the form validates the fields and opens the visitor's email client with the subject and message pre-filled. It needs no backend.

---

## Updating the Content

All content lives in `data/`, so most updates need no HTML changes.

**Add a project** in `data/project_data.js`:
```js
{
  title: "My New App",
  description: "What it does...",
  image: "assets/images/projects_images/my_app.png",
  category: "flutter",          // flutter | flutter-web | web
  tier: "featured",             // featured | mini | other
  stack: ["Flutter", "Dart"],
  live: "",                     // empty or "#" shows "Coming Soon"
  code: "https://github.com/abdul-bas/my-app"
}
```

**Add a skill** in `data/skills_data.js`:
```js
s('Riverpod', 'logos:riverpod', ['myproject'], 'Basic')
```
If you use a project ID, add a matching entry to the `PROJECTS` object in the same file.

**Add a certificate** in `data/certificate_data.js` by adding an object with `title`, `category`, `issuer`, `year` and a `driveUrl` (a Google Drive share link set to "Anyone with the link").

**Add an education entry** in `data/education_data.js` using the `type`, `icon`, `title`, `period`, `fields` and `driveUrl` keys.

---

## Run Locally

No installation is needed.

```bash
# 1. Clone the repository
git clone https://github.com/abdul-bas/portfolio.git
cd portfolio

# 2. Open index.html in your browser
#    or serve it with any static server, for example:
npx serve .
```

With VS Code you can also use the **Live Server** extension and click **Go Live**.

---

## Deployment

The site is deployed with **GitHub Pages**:

1. Push the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose the `main` branch and the `/ (root)` folder, then save.
4. The site is published at `https://<username>.github.io/<repository>/`.

Because everything is static, it also works on Netlify, Vercel or any other static host.

---

## Accessibility and Performance

- Semantic HTML with ARIA labels, `aria-expanded` and `aria-live` regions.
- Visible `:focus-visible` outlines and full keyboard support for cards and filters.
- `prefers-reduced-motion` support that disables heavy animations.
- Lazy-loaded images and a lightweight, dependency-free codebase.
- Mobile-first responsive breakpoints at 1024px, 900px, 860px, 768px, 640px, 560px and 480px.

---

## Connect With Me

- **GitHub:** [abdul-bas](https://github.com/abdul-bas)
- **LinkedIn:** [Abdul Basith Chempan](https://www.linkedin.com/in/abdul-basith-chempan-b17b09324/)
- **LeetCode:** [LeetCode Profile](https://leetcode.com/u/zvX54gmqAM/)
- **Location:** Kerala, India

I'm currently open to **Flutter Developer** opportunities. Feel free to reach out through the contact form on the website.

---

## License

This project is open for learning and inspiration. If you use the layout or code, please give credit and replace the content, images and certificates with your own.

&copy; Abdul Basith
