# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## MORIA Framework — Claude Code Context

This is the project root for `marckernest.com/moria-framework`: an immersive portfolio landing page built around the MORIA systems thinking methodology. The experience is a pannable, zoomable parchment map with five city markers, each representing a phase of the framework. The visitor doesn't read about how Marck thinks — they experience it.

Read this file fully before starting any task. Then read the docs listed below.

---

## Project Docs

All reference material lives in `docs/`. Read these before building anything:

- `docs/MORIA_Product_Description.md` — what this is, how it works, the UX, and the collaboration model
- `docs/MORIA_Project_Plan.md` — six-phase plan, current status, and delegation breakdown
- `docs/MORIA_Framework.md` — the full written content for all five stage panels (copy is complete and approved)
- `docs/design.md` — the design system: colour tokens, typography, aesthetic principles

---

## Tech Stack (locked)

- **React** + **Framer Motion** + **Vite**
- **Google Fonts**: IM Fell English (headings, place names), Crimson Text (body)
- **GitHub** for version control
- **Vercel** for hosting — currently deployed at root (`base: '/'`). Will move to `/moria-framework` when marckernest.com has other projects alongside it.
- No UI libraries. No component frameworks. CSS variables from the design system only.

---

## Dev Commands

Once the Vite scaffold exists (`npm create vite@latest . -- --template react`):

```bash
npm install          # install deps (includes framer-motion)
npm run dev          # dev server at localhost:5173
npm run build        # production build to dist/
npm run preview      # serve the production build locally
```

`vite.config.js` must set `base: '/moria-framework'` for the Vercel subdirectory deployment to resolve assets correctly.

---

## Component Interaction Model

State lives in `App.jsx` and flows down:

- **`mapTransform`** — `{ x, y, scale }` — owned by `MapCanvas`, drives the CSS transform on the canvas element. Pan via pointer drag; zoom via wheel/pinch.
- **`activeStage`** — `string | null` — which city is expanded. Set by `CityMarker` click, cleared by `ContentPanel` close. Only one panel open at a time.
- **`coverOpen`** — `boolean` — whether the folded cover has been dragged open. Transitions once; the cover unmounts after the reveal animation completes.

`src/data/stages.js` is the single source of truth for city identity — each entry has `id`, `name`, `moiraStage`, `position` (as percentage coords on the map canvas), and the full panel content drawn from `docs/MORIA_Framework.md`. `CityMarker` and `ContentPanel` both receive a stage object from this array.

The ink-bleed panel expand animation originates at the clicked city's position on the canvas, not the viewport — `ContentPanel` needs the city's canvas coordinates translated to viewport coordinates at the moment of click.

---

## Design System (locked)

All colour and type decisions are final. Do not introduce new values.

### Colour tokens

```css
--color-ink: #1a1a18;
--color-paper: #f5f2eb;
--color-cream: #ede9de;
--color-rule: #c8c2b0;
--color-accent: #2a5c45;
--color-accent-light: #e8f0ec;
--color-danger: #8b2e2e;
```

### Typography

- `IM Fell English` — headings, city names, place labels, panel titles
- `Crimson Text` — body text, panel content, bio
- Monospace — UI chrome, labels, readouts (cassette-futurism layer, secondary to the map aesthetic)

### Aesthetic constraints

- Parchment texture via CSS noise and gradient layering. Darker at edges, lighter at centre. Visible fold lines.
- Map feel: traveled, worn, hand-placed. Slight irregularity is intentional.
- SVG terrain (hills, forests, rivers) in ink-line cartographic style — flat, minimal, no fills.
- Borders: visible and deliberate using `--color-rule`. Rounded corners: minimal or square. This is a map, not a consumer app.
- No drop shadows that feel digital. No animations that feel like a website. Everything should feel like the map is breathing.

---

## Current Project Status

### Content (Phase 1)
- Five stage panels: **complete** — content is in `docs/MORIA_Framework.md`, approved and ready to implement
- Front cover copy: **in progress** — title, tagline, and lead line are set; drag prompt copy needs finalising
- Bio: source material gathered, draft not yet written
- Case study distillation (short version for non-technical readers): not started
- Back cover copy: not started

### Design (Phase 2)
- Core decisions: **locked** (palette, type, layout, interactions, terrain style, map feel)
- Open: map composition (city placement, path curve), city marker design, content panel layout inside the map, compass rose, parchment texture weight

### Build (Phase 3 onward)
- **Starting fresh.** No prior code on disk. A previous session generated code in chat but it was not saved.
- Scaffold with Vite + React. Start from zero.

---

## Delegation Rules

These rules mirror the working model from the product description. Stick to them.

### Claude Code decides alone
- All code generation, component structure, animation logic
- SVG asset creation (terrain, compass rose, city markers, border treatments)
- CSS texture and atmosphere work (parchment noise, fold lines, vignette)
- CI/CD config (`.gitlab-ci.yml`), Vercel config (`vercel.json`)
- Back cover copy synthesis and case study distillation (drafts for Marck's review)

### Always flag before building
- Any decision that affects the visual feel or layout composition
- Map composition choices (where cities sit, how the path curves, terrain placement)
- City marker design direction
- Content panel layout — how stage content sits inside the expanded panel
- Anything that requires a subjective aesthetic call
- Anything where two reasonable approaches exist and the wrong one would mean a rebuild

### Marck's calls only
- Parchment texture weight (how aged the paper feels)
- All feel and composition reviews — these happen on real devices, not in previews
- Bio source material and personal voice
- Final approval at every phase before moving to the next

---

## Working Conventions

- **Immersion first.** A technically correct implementation that breaks the map feeling is a failure. If something works but doesn't feel right, it isn't done.
- **Ask the question before building the wrong thing.** Assumptions are expensive. If something is unclear, name it.
- **Feel reviews happen at real checkpoints.** Don't accumulate multiple components before Marck has seen anything. Build one thing, get a feel review, then continue.
- **No boilerplate output.** Every component should reflect genuine craft. If something looks like it came from a starter template, it needs more work.
- **Content and design inform each other.** If a panel layout feels wrong, the fix might be in the copy. Both are on the table.
- **The standard:** would the right visitor feel found? If not, we're not done.

---

## Folder Structure (target)

```
/
├── CLAUDE.md               ← you are here
├── docs/                   ← project reference (read-only during build)
│   ├── design.md
│   ├── MORIA_Framework.md
│   ├── MORIA_Product_Description.md
│   └── MORIA_Project_Plan.md
├── src/
│   ├── components/
│   │   ├── Cover/          ← folded map cover, drag-to-open gesture
│   │   ├── MapCanvas/      ← pannable zoomable canvas, terrain, path
│   │   ├── CityMarker/     ← five markers with labels and hover states
│   │   ├── ContentPanel/   ← ink-bleed expand, stage content layout
│   │   └── BackCover/      ← bio, closing statement, CTA
│   ├── assets/
│   │   └── svg/            ← terrain elements, compass rose, decorative border
│   ├── styles/
│   │   └── globals.css     ← CSS variables, base styles, font imports
│   ├── data/
│   │   └── stages.js       ← MORIA stage content (drawn from MORIA_Framework.md)
│   └── App.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── .gitlab-ci.yml
```

---

## Key Constraints to Remember

1. No separate mobile layout. The map experience is the same on desktop and mobile — pan and zoom with thumbs.
2. Performance is part of the experience. Lag on pan or stutter on panel open breaks the immersion.
3. All visual assets are CSS and SVG. No external illustration or image files.
4. The five cities and their MORIA stage mapping (locked):
   - The Shire → Map
   - Rivendell → Orientate
   - The Council of Elrond → Reason
   - The Mines of Moria → Implement
   - Lothlorien → Amplify
5. Panel content comes from `docs/MORIA_Framework.md` — do not rewrite or paraphrase the stage copy without flagging it first.
