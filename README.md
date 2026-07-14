# Sumit Raj — Portfolio

A dark-themed developer portfolio built with **React 18**, **Vite 6**, **Tailwind CSS 3**, and **React Router v7**. Features a playable Snake game, interactive 3D cube grid, animated text effects, and a mobile-first responsive layout.

---

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 6 |
| Tailwind CSS | 3 |
| React Router | 7 |
| Framer Motion | 12 |
| GSAP | 3 |
| Three.js | 0.185 |
| Postprocessing | 6 |
| Lucide React | 0.400 |
| EmailJS | 4 |

---

## Project Structure

```
src/
├── main.jsx                  # Vite entry point, mounts <App />
├── App.jsx                   # BrowserRouter + Routes
├── index.css                 # Tailwind directives + global styles
│
├── pages/
│   ├── Home.jsx              # _hello page — hero text + Snake game + 3D cube
│   ├── AboutMe.jsx           # _about-me page — accordion tree bio + TypingPanel
│   ├── Projects.jsx          # _projects page — filter accordion + project cards
│   ├── ContactMe.jsx         # _contact-me page — form + contact accordion + code preview
│   └── NotFoundPage.jsx      # 404 — pixel-style fallback
│
├── components/
│   ├── Header.jsx            # Top nav bar — desktop NavLinks / mobile hamburger
│   ├── NavDrawer.jsx         # Mobile slide-in drawer with nav + social footer
│   ├── Layout.jsx            # Shared layout wrapper (Header + <Outlet /> + Footer)
│   ├── Footer.jsx            # Bottom bar — social links
│   │
│   ├── SnakeGame.jsx         # Canvas snake game — keyboard + D-pad controls
│   ├── AccordionSection.jsx  # Collapsible row (conditional render)
│   ├── AccordionTree.jsx     # Recursive file-tree with onSelect + active highlight
│   ├── CommentCard.jsx       # Dismissible card with avatar + CodeSnippet
│   ├── CodeSnippet.jsx       # Syntax-highlighted code block with line numbers
│   ├── ContactForm.jsx       # Controlled form with onBlur validation
│   ├── ThankYou.jsx          # Post-submit thank-you view
│   ├── TypingPanel.jsx       # Animated typing effect (used in AboutMe)
│   ├── ProjectCard.jsx       # Thumbnail, tags, links card
│   │
│   └── Animation/
│       ├── Cube.jsx          # 3D spinning cube grid with GSAP + ripple
│       └── ShinyText.jsx     # Shiny gradient sweep animation using Framer Motion
│
├── hooks/
│   └── useMediaQuery.js      # matchMedia-based responsive breakpoint hook
│
├── data/
│   └── portfolioData.js      # All profile, skill, education, project, tag data
│
├── ...
vite.config.js                # Vite config with React plugin + SPA fallback
tailwind.config.js            # Custom colors, font (JetBrains Mono)
postcss.config.js             # Tailwind + Autoprefixer
```

---

## Pages & Routing

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero intro + ShinyText name + Snake game + 3D cube grid |
| `/about-me` | AboutMe | Bio accordion tree, TypingPanel, CommentCard |
| `/projects` | Projects | Tag filter accordion + grid of project cards |
| `/contact-me` | ContactMe | Form with validation, live code preview, contact info |
| `*` | NotFound | 404 pixel-style page |

Each page has two layouts — **mobile** (single-column, accordion-based) and **desktop** (multi-column grid), switched via `useMediaQuery("(min-width: 768px)")`.

---

## Key Features

### Snake Game (`SnakeGame.jsx`)
- Canvas-rendered 8x15 grid
- Arrow keys (desktop) + D-pad (mobile)
- 8 food targets to win; skip/continue flow
- `gameStarted` state controls D-pad activation
- Single control row on mobile (no duplicate start button)

### Accordion Tree (`AccordionTree.jsx`)
- Recursive folder/file rendering
- `onSelect` callback for leaf nodes
- `active` prop highlights selected node in teal

### Contact Form (`ContactForm.jsx`)
- Controlled inputs with onBlur validation
- Regex email validation
- Disabled submit until valid
- Desktop: shared form state with live code preview sidebar

### 3D Cube Animation (`Cube.jsx`)
- GSAP-powered spinning cube grid
- Click ripple effect
- Auto-animate mode

### ShinyText (`ShinyText.jsx`)
- Framer Motion gradient sweep across text
- Configurable speed, direction, spread, yoyo

---

## Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Used by `ContactForm.jsx` to send contact form submissions via EmailJS.

---

## Design

- **Theme**: Dark navy (`#0d1117` background), teal accents (`#4fd8c4`), blue (`#4fa8ff`), amber (`#f0a860`), purple (`#c792ea`)
- **Font**: JetBrains Mono (monospace)
- **Layout**: Mobile-first responsive, `md:` breakpoint at 768px
- **Accordions**: Simple conditional render (`{open && children}`)
