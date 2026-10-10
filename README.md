# Aries B. Samson — E-Portfolio

A dark, cinematic "game menu" style personal portfolio built with React + Vite + Tailwind CSS v4.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── main.jsx                 # App entry point
├── App.jsx                  # Root component with providers
├── index.css                # Tailwind v4 + design tokens (@theme)
├── data/                    # ALL content lives here (edit only these files)
│   ├── profile.js           # Name, bio, socials, email, CV path
│   ├── projects.js          # 6 projects with descriptions, tech, links
│   ├── resume.js            # Education, experience, skills, languages
│   └── skills.js            # Tech icons for marquee & About section
├── hooks/                   # Custom React hooks
│   ├── useScrollSpy.js      # Active nav section detection
│   ├── useReveal.js         # IntersectionObserver fade-in
│   └── useTyping.js         # Rotating typed role text
├── context/
│   └── OptionsContext.jsx   # Accent color + reduce motion state (localStorage)
├── components/
│   ├── layout/              # BackgroundGlow, Navbar, Footer
│   ├── ui/                  # Button, Pill, Card, Modal, Toast, SafeImage, SectionTitle
│   └── sections/            # Home, About, Projects, Resume, Contact, TechMarquee, OptionsModal, ExitModal
public/
├── Aries_Samson_CV.pdf      # Placeholder CV (replace with real one)
├── favicon.svg              # Monogram "AS" favicon
└── images/
    ├── profile.jpg          # Placeholder profile (replace with real photo)
    └── projects/            # 6 project screenshots (replace with real images)
```

## ✏️ Editing Content

**All personal content is in `src/data/*.js`** — never hardcode in JSX.

| File | What to Edit |
|------|--------------|
| `profile.js` | Name, roles, bio, email, social URLs, CV path |
| `projects.js` | Project descriptions, features, tech stack, live URLs |
| `resume.js` | Education, experience, skill levels, languages |
| `skills.js` | Tech icons for marquee (uses `react-icons/si`) |

**Look for `// TODO:` comments** — these mark placeholder content you should replace.

## 🖼️ Adding Real Assets

Replace these placeholder files with your actual assets:

| Asset | Location | Recommended Specs |
|-------|----------|-------------------|
| Profile photo | `public/images/profile.jpg` | 400×400+, plain/dark background |
| CV PDF | `public/Aries_Samson_CV.pdf` | One-page PDF |
| Project screenshots | `public/images/projects/<slug>.png` | 1280×720 (16:10) |

The `SafeImage` component automatically shows a gradient placeholder if an image is missing — no broken image icons.

## 📧 Contact Form (EmailJS)

The contact form works **without any backend** by default — it opens a `mailto:` link with prefilled data.

To enable real email delivery via EmailJS:

1. Create an account at [EmailJS](https://dashboard.emailjs.com/)
2. Create a service, template, and get your public key
3. Copy `.env.example` to `.env` and fill in:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Restart the dev server (`npm run dev`)

**Template variables** expected in your EmailJS template:
- `from_name`, `from_email`, `subject`, `message`, `to_email`

## 🎨 Design System

All design tokens are in `src/index.css` under `@theme`:

- **Colors**: `--color-bg`, `--color-surface`, `--color-ink`, `--color-blue`, `--color-accent` (via CSS variable `--accent`)
- **Fonts**: Anton (headings), Montserrat (body) — loaded via Google Fonts in `index.html`
- **Spacing**: Container `max-w-6xl`, section padding `py-20 md:py-28`
- **Radius**: Cards `rounded-2xl`, buttons/pills `rounded-full`

### Accent Color Switching

Users can change the accent color via the Options panel (OPTIONS menu):
- **Red** (default): `#D4162B`
- **Blue**: `#2E8BFF`
- **Green**: `#2BD18B`

Persisted to `localStorage` with try/catch wrapper.

## ♿ Accessibility

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Skip link at top of page
- Visible focus rings (`focus-visible:ring-2 ring-blue-bright`)
- Modal focus trap, ESC to close, backdrop click to close
- Form labels + `aria-invalid`/`aria-describedby` for errors
- `prefers-reduced-motion` respected + in-app Reduce Motion toggle
- Minimum 44×44px touch targets

## 📱 Responsive Breakpoints

Tested at: **360px** (mobile), **768px** (tablet), **1024px** (desktop), **1440px** (wide)

No horizontal scroll at 360px.

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com/new)
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add Environment Variables (if using EmailJS):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
7. Deploy

## ✅ Verification Checklist

Before deploying, verify:

- [ ] All 5 sections reachable from navbar, scroll-spy highlights active section
- [ ] All 8 interactive features work:
  - [ ] Project filter + View More modal
  - [ ] Contact form validation + success state
  - [ ] Download CV button + toast
  - [ ] START/OPTIONS/EXIT menu (keyboard accessible)
  - [ ] Options panel (accent switch + reduce motion, persisted)
  - [ ] Resume tabs + animated skill bars
  - [ ] Scroll-spy navbar + mobile hamburger
  - [ ] Typed role text, scroll reveal, back-to-top
- [ ] Form blocks invalid input, shows inline errors
- [ ] Download CV triggers file download
- [ ] Modals close on ESC + backdrop click, focus returns to trigger
- [ ] All 6 project live links open correctly in new tabs
- [ ] No broken images (placeholders show when files missing)
- [ ] No horizontal scroll at 360px
- [ ] `npm run build` passes with no errors
- [ ] Lighthouse: Performance ≥ 85, Accessibility ≥ 90

## 📝 License

MIT — feel free to use as a template for your own portfolio.