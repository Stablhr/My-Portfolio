# Plan.md — Aries B. Samson E-Portfolio

> Implementation plan for a ReactJS + Tailwind CSS portfolio website.
> Companion files: `DESIGN.md` (visual system) and `OPENCODE_PROMPT.md` (build prompt).

---

## 1. Goal

Build a personal e-portfolio for **Aries B. Samson** that meets the course requirements:

| Requirement | How it is met |
|---|---|
| ReactJS for structure and reusable components | Vite + React, one component per section, shared UI primitives (`Button`, `Card`, `SectionTitle`, `Pill`, `Modal`) |
| Tailwind CSS for styling, layout, responsive design | Tailwind v4 with design tokens in `@theme`, mobile-first breakpoints |
| React state and event handling | `useState`, `useEffect`, `useRef`, controlled form inputs, click and scroll handlers |
| Required sections | Home, About Me, Projects, Resume/CV, Contact (details in section 4) |
| At least 3 interactive features | 8 planned (section 5), well above the minimum |

**Design direction:** a dark, cinematic "game menu" portfolio (from the reference screenshot): deep black with a blue radial glow, a red accent, bold condensed headings, pill navigation, and a Start / Options / Exit intro. Layout rhythm borrows from https://joenelseve.vercel.app/ (tech marquee, project cards with a "Project Details" action, a scrolling image strip, process steps).

---

## 2. Tech Stack

- **Build tool:** Vite (React template, JavaScript or TypeScript; default to JavaScript/JSX unless stated)
- **UI:** React 18+ (function components and hooks only)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (tokens in `src/index.css` with `@theme`)
- **Icons:** `lucide-react` for UI icons, `react-icons` (`fa6`/`si`) for brand and tech icons
- **Fonts:** Google Fonts: `Anton` (headings), `Montserrat` (body), loaded in `index.html`
- **Contact form delivery:** EmailJS (optional, env-driven). If no keys are set, fall back to a `mailto:` link so the form always works
- **Hosting:** Vercel (matches existing projects)
- **No** routing library: single-page with anchor sections and scroll-spy (simpler, and fits the reference)

---

## 3. Project Structure

```
aries-portfolio/
├─ public/
│  ├─ Aries_Samson_CV.pdf          # placeholder, replace with real CV
│  ├─ favicon.svg
│  └─ images/
│     ├─ profile.jpg               # placeholder
│     └─ projects/                 # one screenshot per project
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css                    # Tailwind import, @theme tokens, keyframes
│  ├─ data/
│  │  ├─ profile.js                # name, role, bio, socials, email
│  │  ├─ projects.js               # the 6 projects
│  │  ├─ resume.js                 # education, experience, skills
│  │  └─ skills.js                 # tech list for marquee and About
│  ├─ hooks/
│  │  ├─ useScrollSpy.js           # active section for nav pills
│  │  ├─ useReveal.js              # IntersectionObserver fade-in
│  │  └─ useTyping.js              # rotating typed role text
│  ├─ components/
│  │  ├─ layout/  Navbar.jsx, Footer.jsx, BackgroundGlow.jsx
│  │  ├─ ui/      Button.jsx, Pill.jsx, SectionTitle.jsx, Card.jsx, Modal.jsx, Toast.jsx
│  │  └─ sections/
│  │     ├─ Home.jsx               # start-menu hero
│  │     ├─ About.jsx
│  │     ├─ Projects.jsx           # filter, grid, modal
│  │     ├─ Resume.jsx             # tabs and Download CV
│  │     └─ Contact.jsx            # links, form, thank-you panel
└─ README.md
```

All content lives in `src/data/*.js`. Components never hardcode personal info, so the user can edit text without touching JSX.

---

## 4. Sections (content and behaviour)

### 4.1 Home (Dashboard)
- Top-left logo mark (monogram "AS"). Centered pill navbar: **Home · About · Projects · Resume · Contact**.
- Hero (cover-slide style): circular/rounded photo cropped into a red shape on the left, giant **"PORTFOLIO"** heading with year **2026** to the right.
- Welcome message: "Hello, I'm Aries B. Samson", animated typed role line (e.g. *Web Developer · Front-End · UI Builder*).
- Short introduction (2 to 3 lines).
- **Game menu**: `START` (scrolls to About), `OPTIONS` (opens options panel), `EXIT` (opens a friendly "Thanks for visiting" modal with a Contact shortcut). Keyboard accessible (arrow keys and Enter).
- Tech marquee strip under the hero (infinite scroll, pause on hover).

### 4.2 About Me
- Two-column layout: portrait with blue glow and subtle floating ember particles (CSS) on the left; text on the right.
- **Personal background** paragraph.
- **Skills** as icon tiles (React, Tailwind, JavaScript, HTML5, CSS3, Git/GitHub, Vercel, Figma, etc.), with hover tooltip.
- **Interests** as chips.
- Quick-facts row (location: Bicol, Philippines; focus; availability).

### 4.3 Projects / Work Samples
Six real projects (data in `projects.js`):

| # | Project | Live URL | Tag(s) | Notes |
|---|---|---|---|---|
| 1 | **Fluely** | https://fluely.vercel.app | Web App | Project-management system with a social media content planner |
| 2 | **Calculator** | https://samson-calculator.vercel.app/ | Web App, UI | Frosted-glass scientific calculator |
| 3 | **To-Do List** | https://samson-to-do-list.vercel.app/ | Web App | Task manager with a warm cream theme |
| 4 | **UCJM Church Website** | https://ucjmwebsite.vercel.app/ | Website | Church information website |
| 5 | **Grace & Glory Café** | https://grace-glory-cafe.vercel.app | Website, E-commerce UI | Café site with filterable menu, order cart and checkout, "What's Your Vibe?" AI picks, FAQ, validated contact form, gallery carousel |
| 6 | **SlotHEOD (EOD Report)** | https://slotheod.vercel.app/ | Web App | End-of-day report tool |

- Card: screenshot, title, one-line description, tech badges, **View More** button, **Live Demo** link.
- Filter pills: **All · Web App · Website · UI**.
- **View More** opens a modal (or inline expand) with the long description, features list, tech stack and links.
- Layout inspired by the "Recap Project" grid in the reference; below it, an optional auto-scrolling screenshot strip like Joenel's site.
- Screenshots: use `public/images/projects/<slug>.png`; if the file is missing, render a gradient placeholder with the project initial (no broken images).

### 4.4 Resume / CV
- Tabs: **Education · Experience · Skills** (state-driven, animated panel switch).
- Education timeline (placeholder entries until the user supplies real ones).
- Experience timeline (projects count as experience if no jobs yet).
- Skills with animated proficiency bars (animate when scrolled into view) and a languages block like the reference (e.g. Filipino / English with percentage bars).
- **Download CV** button: downloads `/Aries_Samson_CV.pdf` and shows a toast "CV download started".

### 4.5 Contact
- "CONTACT ME" heading with social icon rows: **Email, Facebook, Instagram, LinkedIn** (icon buttons with handle text, opens in a new tab with `rel="noopener noreferrer"`).
- **Contact form** (name, email, subject, message with 500-character counter).
  - Validation: required fields, email regex, minimum message length (10), inline error messages, disabled submit while sending.
  - Success state: replace form with "Thank you" panel + "Send another" button.
  - Delivery: EmailJS if `VITE_EMAILJS_*` env vars exist; otherwise open `mailto:`.
- Closing "THANK YOU 2026" banner in the style of the reference's last slide, then footer.

---

## 5. Interactive React Features (≥ 3 required, 8 planned)

| # | Feature | React concepts |
|---|---|---|
| 1 | **Project filter and View More modal** (show/hide details) | `useState` (filter, selected project), conditional rendering, derived list |
| 2 | **Contact form with validation** and success state | controlled inputs, `onChange`/`onSubmit`, error state object, conditional rendering |
| 3 | **Download CV** button with toast | event handler, `useState`, timed `useEffect` |
| 4 | **Start / Options / Exit** game menu with keyboard control | `useState`, `onKeyDown`, modal, `useRef` |
| 5 | **Options panel**: accent color switch (red/blue/green) and reduce-motion toggle | state lifted to `App`, CSS variables set on `<html>` |
| 6 | **Resume tabs** + animated skill bars | `useState`, `IntersectionObserver` |
| 7 | **Scroll-spy navbar** and mobile hamburger menu | `useEffect`, custom hook, conditional classes |
| 8 | **Typed role text**, scroll-reveal animations, back-to-top button | custom hooks, Tailwind transitions |

---

## 6. Phased Build Order

Each phase ends with `npm run dev` working and no console errors.

**Phase 0: Setup**
1. `npm create vite@latest aries-portfolio -- --template react`
2. Install Tailwind v4 (`tailwindcss @tailwindcss/vite`), `lucide-react`, `react-icons`, `@emailjs/browser`
3. Configure the Vite plugin, `index.css` tokens, Google Fonts, favicon, page title and meta tags

**Phase 1: Foundation**
4. Create `data/` files with real content and clearly marked `TODO` placeholders
5. Build UI primitives, `BackgroundGlow`, `Navbar` (with scroll-spy and mobile menu), `Footer`

**Phase 2: Sections**
6. `Home` (hero, menu, marquee), then `About`
7. `Projects` (cards, filter, modal, placeholder images)
8. `Resume` (tabs, timelines, bars, Download CV)
9. `Contact` (links, validated form, success state, thank-you banner)

**Phase 3: Polish**
10. Reveal animations, hover states, focus rings, `prefers-reduced-motion` support
11. Responsive pass at 360 / 768 / 1024 / 1440 px
12. Accessibility pass (semantic landmarks, alt text, labels, contrast, keyboard)
13. Performance pass (lazy-load images, optimized sizes, no layout shift)

**Phase 4: Ship**
14. `npm run build` passes with zero errors/warnings that matter
15. README with setup, content editing guide, env vars
16. Deploy to Vercel, test live URL

---

## 7. Acceptance Checklist

- [ ] All five required sections present, reachable from the navbar
- [ ] At least three interactive features working (target: all 8)
- [ ] Uses `useState` and conditional rendering visibly in the code
- [ ] Layout works at 360px with no horizontal scroll
- [ ] All six project links open correctly in a new tab
- [ ] Contact form blocks invalid input and shows clear errors
- [ ] Download CV triggers a file download
- [ ] Keyboard-only navigation works (menu, modal with Esc to close, form)
- [ ] No broken images (placeholders used where files are missing)
- [ ] Lighthouse: Performance ≥ 85, Accessibility ≥ 90
- [ ] No hardcoded personal info outside `src/data/`

---

## 8. Content You Need To Provide (placeholders until then)

1. **Profile photo** (portrait, ideally with plain background) → `public/images/profile.jpg`
2. **CV PDF** → `public/Aries_Samson_CV.pdf`
3. **Project screenshots** (1280×720 or similar) → `public/images/projects/`
4. **Education** (school, course, years) and **experience** details
5. Your **skill levels** and **interests**
6. A confirmed **email address**: your message had `ariessamson18@gmail.om`; this plan uses `ariessamson18@gmail.com`, so please confirm
7. Optional: EmailJS service ID, template ID and public key for a real contact form

---

## 9. Risks and Decisions

- **Dark design and contrast:** keep body text at ≥ 4.5:1 against the background; never put small gray text on the blue glow.
- **Heavy visuals:** the glow and particles are pure CSS (no large images), so performance stays good.
- **Motion:** respect `prefers-reduced-motion` and the in-app reduce-motion option.
- **Do not copy** the reference portfolios' text, photos or branding: use only the *layout ideas and mood*. All content is Aries's own.
- **Single page vs. multi-page:** single page chosen for simplicity; routing can be added later if needed.
