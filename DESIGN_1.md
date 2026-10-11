# DESIGN.md — Aries B. Samson E-Portfolio

Visual system for the portfolio. Mood reference: a dark, cinematic portfolio (black background, blue radial glow, red accent, bold condensed titles, pill navigation). Layout rhythm reference: https://joenelseve.vercel.app/ (tech marquee, project cards, process steps, scrolling screenshot strip).

Use the reference for **mood and structure only**. Do not copy its text, images, logos or names.

---

## 1. Design Principles

1. **Cinematic and dark.** Near-black canvas, soft blue light pooling at the corners, one strong red accent.
2. **Cinematic hero.** The Home screen is a bold title screen: a red-framed portrait, a giant `PORTFOLIO` heading and one clear **View Projects** action.
3. **Big type, little clutter.** Giant condensed headings, small tracked uppercase labels, generous spacing.
4. **Content first.** Projects and skills are the stars; decoration stays behind them.
5. **Readable and accessible.** Contrast ≥ 4.5:1 for body text, visible focus rings, motion can be reduced.

---

## 2. Color Tokens

Define in `src/index.css` under `@theme` so Tailwind generates utilities (`bg-bg`, `text-ink`, `border-line`, etc.).

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#050608` | Page background |
| `--color-surface` | `#0B0F14` | Cards, panels |
| `--color-surface-2` | `#111823` | Raised cards, modal |
| `--color-line` | `rgba(255,255,255,0.10)` | Borders, dividers |
| `--color-ink` | `#F2F4F8` | Primary text |
| `--color-ink-muted` | `#A7B0BD` | Secondary text (≥ 4.5:1 on bg) |
| `--color-ink-dim` | `#6B7685` | Decorative/placeholder only, not for body text |
| `--color-blue` | `#1B6FA8` | Glow, links, active states |
| `--color-blue-deep` | `#0A2A44` | Gradient shadow end |
| `--color-blue-bright` | `#6CC4FF` | Active pill, focus ring, highlights |
| `--color-accent` | `#D4162B` | **Red accent** (hero shape, primary buttons, underline marks) |
| `--color-accent-hover` | `#F0344A` | Hover state of accent |
| `--color-success` | `#3DDC97` | Form success |
| `--color-danger` | `#FF5D6C` | Form errors |

**Accent:** a single fixed red accent, `--color-accent: #D4162B`. There is no in-app accent switcher.

### Background recipe
```css
body {
  background:
    radial-gradient(1200px 600px at 100% 0%, rgba(27,111,168,.35), transparent 60%),
    radial-gradient(900px 500px at 0% 100%, rgba(10,42,68,.55), transparent 60%),
    #050608;
}
```
Add a very subtle noise/grain overlay (2–3% opacity, CSS-only or tiny inline SVG) for the textured look. A fixed `BackgroundGlow` component renders these layers behind everything (`pointer-events-none`, `-z-10`).

---

## 3. Typography

| Role | Font | Weight | Style |
|---|---|---|---|
| Display / headings | **Anton** (fallback `Impact`, `sans-serif`) | 400 | Uppercase, `tracking-wide`, tight `leading-[0.95]` |
| Body / UI | **Montserrat** | 400, 500, 600 | Sentence case |
| Labels / nav | Montserrat | 600 | Uppercase, `tracking-[0.2em]`, `text-xs` |

Load via Google Fonts in `index.html` with `display=swap`.

**Scale (mobile → desktop):**

| Use | Mobile | Desktop |
|---|---|---|
| Hero "PORTFOLIO" | `text-6xl` | `text-[9rem]` (clamp ok) |
| Hero year "2026" | `text-3xl` | `text-5xl` (outlined text: transparent fill, 1px `ink-muted` stroke) |
| Section title | `text-4xl` | `text-6xl` |
| Subheading | `text-xl` | `text-2xl` |
| Body | `text-sm`/`text-base` | `text-base` |
| Label | `text-xs` | `text-xs` |

Section titles use a **silver-to-gray gradient text** (`from-white to-zinc-400`, `bg-clip-text text-transparent`) like the chrome-looking "PORTFOLIO" heading in the reference.

---

## 4. Layout and Spacing

- Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-20 md:py-28`; each section has `id` and `scroll-mt-24`
- Grid: 12-column on desktop; stack to one column below `md`
- Radius: cards `rounded-2xl`, buttons/pills `rounded-full`, images `rounded-xl`
- Breakpoints (Tailwind defaults): `sm 640 · md 768 · lg 1024 · xl 1280`; test 360, 768, 1024, 1440
- Shadows: soft and colored, e.g. `shadow-[0_20px_60px_-20px_rgba(27,111,168,.45)]`

---

## 5. Navigation

**Navbar** (fixed, top, centered):
- Left: logo monogram "AS" (white, bold, small).
- Center: pill group. Items **Home · About · Projects · Resume · Contact**.
  - Container: `rounded-full bg-white/5 backdrop-blur border border-line px-2 py-1`
  - Item: `text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full text-ink-muted`
  - **Active item:** `bg-blue-bright/90 text-black` (light-blue pill, as in the reference), driven by scroll-spy.
- Right (desktop): "Download CV" ghost button.
- Mobile (< `md`): hamburger toggles a full-width dropdown panel (`useState`), closes on link click and on Esc.

---

## 6. Section Designs

### 6.1 Home (title screen)
- Full viewport height (`min-h-screen`), content vertically centered.
- **Left:** portrait cropped inside a **red rounded shape** (large circle/D-shape bleeding off the left edge, as in the reference cover). Placeholder: gradient circle with initials if no photo.
- **Right:** `PORTFOLIO` (chrome gradient, Anton, huge) + outlined `2026`.
- Under heading: small label row `■ WEB DEVELOPER` (white square bullet + tracked uppercase), then the typed rotating line.
- 2–3 line intro in `ink-muted`, max width ~`max-w-md`.
- A single **View Projects** button (accent) that scrolls to the Projects section.
- Bottom: tech marquee (see section 8).

### 6.2 About Me
- Left: portrait inside a **blue radial glow**; subtle floating ember dots (6–10 absolutely positioned spans with a `float-up` keyframe, low opacity).
- Right: small label "HELLO, I AM" → name in Anton → **ABOUT ME** heading → paragraph.
- **Skills** heading + row of rounded-square icon tiles (56px, `bg-surface-2 border-line`, hover lift and brand-color glow, tooltip with the skill name).
- **Interests** as outlined chips.
- Mini-columns: quick facts (Location · Focus · Availability).

### 6.3 Projects ("Recap Project 2026")
- Title `RECAP PROJECT 2026` centered, chrome gradient.
- Filter pills below title (same style as nav pills). Active = bright blue pill.
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6`.
- **Project card:**
  - 16:10 screenshot, `rounded-xl`, slow zoom on hover (`group-hover:scale-105 transition duration-500`), dark gradient overlay at the bottom.
  - Title (Montserrat 600), one-line description (`ink-muted`, 2-line clamp), 2–3 tech badges (tiny pills).
  - Buttons: **View More** (outline) and **Live Demo ↗** (accent fill).
  - Border `border-line`, hover `border-blue/50`, lift `-translate-y-1`.
- **Modal:** `surface-2`, blurred backdrop, large screenshot, full description, key features list, tech stack, "Visit site" and "Close". Esc and backdrop click close it. Focus is trapped while open; scroll lock on `<body>`.
- Optional below the grid: auto-scrolling screenshot strip (two rows, opposite directions), like the reference site's "Curious what else I've created?" strip. Pause on hover.

### 6.4 Resume / CV
- Pill tabs: **Experience · Skills** (Experience is the default tab). Panel cross-fades (`opacity` + `translate-y` transition, 250ms).
- Timeline: vertical 1px `line` rail, dot markers (accent for current item), cards on the right.
- Skills tab: progress bars (`h-1.5 rounded-full bg-white/10`, fill uses blue→bright gradient), width animates from 0 when scrolled into view.
- Languages block with percentages (reference style).
- Primary button **Download CV** (accent). On click: starts the download and shows a toast.

### 6.5 Contact
- Heading `CONTACT ME`.
- Left: social list. Each row = round icon button (44px, `bg-white text-black` like the reference's white circular icons) + handle text. Rows: Email, Facebook, Instagram, LinkedIn.
- Right: form card (`surface`, `border-line`, `rounded-2xl`, `p-4 sm:p-6 md:p-8`).
  - Inputs: `bg-bg/60 border border-line rounded-xl px-4 py-3`, focus `ring-2 ring-blue-bright/60 border-transparent`.
  - Error: red border + `text-danger text-xs` message under the field, `aria-invalid` and `aria-describedby` set.
  - Message field shows a `0/500` counter.
  - Submit: accent button with a spinner while sending.
  - Success: card swaps to a check icon, "Thank you, I'll reply soon", and a "Send another" button.
- Footer: tiny copyright, social icons, back-to-top button.

---

## 7. Components (reusable)

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant` (`primary` \| `outline` \| `ghost`), `size`, `href?`, `icon?`, `onClick` | Renders `<a>` when `href` is set |
| `Pill` | `active`, `onClick`, `children` | Used by nav, filters, tabs |
| `SectionTitle` | `eyebrow`, `title`, `align` | Chrome gradient title with small eyebrow |
| `Card` | `className`, `children` | `surface` + border + radius |
| `Modal` | `open`, `onClose`, `title`, `children` | Portal, Esc, backdrop click, focus trap |
| `Toast` | `message`, `visible` | Bottom-center, auto-hides after 3s, `role="status"` |
| `Reveal` | `delay?` | Wraps children, fades up when in view |
| `ProjectCard` | `project`, `onOpen` | See 6.3 |
| `SkillTile` | `icon`, `label` | See 6.2 |
| `TimelineItem` | `title`, `subtitle`, `period`, `current?` | See 6.4 |

---

## 8. Motion

| Effect | Spec |
|---|---|
| Scroll reveal | `opacity-0 translate-y-6` → `opacity-100 translate-y-0`, `duration-700 ease-out`, stagger 80ms |
| Hover lift | `transition-transform duration-300 hover:-translate-y-1` |
| Tech marquee | CSS keyframe `marquee` 30s linear infinite, content duplicated, `hover:[animation-play-state:paused]` |
| Ember float | `float-up` 6–10s ease-in-out infinite, opacity 0 → .6 → 0 |
| Typed text | 70ms/char type, 40ms/char delete, 1.4s pause (no caret; role text only) |
| Skill bars | width 0 → value, 900ms ease-out, triggered once |
| Modal | backdrop fade 200ms, panel scale `.96 → 1` |

**Reduced motion:** decorative animation is disabled automatically inside `@media (prefers-reduced-motion: reduce)`; there is no in-app toggle.

---

## 9. Iconography and Imagery

- UI icons: `lucide-react` (stroke 1.75).
- Brand icons: `react-icons/fa6` for Facebook, Instagram, LinkedIn; `react-icons/si` for tech (React, Tailwind, JS, HTML5, CSS3, Git, GitHub, Vercel, Figma).
- Photos: portrait with plain or dark background works best; add `object-cover object-top`. Provide a gradient placeholder fallback.
- All `<img>` need meaningful `alt`; decorative images use `alt=""` and `aria-hidden`.
- Use `loading="lazy"` and explicit `width`/`height` to avoid layout shift.

---

## 10. Accessibility

- Semantic landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Skip link "Skip to content" at the top.
- Visible focus: `focus-visible:ring-2 ring-blue-bright ring-offset-2 ring-offset-bg`.
- Buttons vs links: navigation = `<a>`, actions = `<button>`.
- Modal: `role="dialog" aria-modal="true"`, labelled by its title, returns focus to the trigger on close.
- Form: every input has a `<label>`; errors announced via `aria-live="polite"`.
- Minimum touch target 44×44px.

---

## 11. Do and Don't

**Do**
- Keep one accent color visible at a time; use blue for light, accent for action.
- Let headings be huge and body copy small and calm.
- Keep every card on the same radius, border and spacing.

**Don't**
- Don't use pure `#000` backgrounds under text-heavy areas (use `bg`/`surface`).
- Don't add more than 2 animated decorations in the same viewport.
- Don't use `ink-dim` for anything a visitor must read.
- Don't copy reference text, imagery or branding.
