# The MORIA Framework

An immersive portfolio landing page built around the MORIA systems-thinking methodology. Instead of describing how Marck Ernest approaches complex problems, the site puts visitors inside the process: a pannable, zoomable parchment map with five city markers, each one a phase of the framework, illustrated through a real case study.

**Live:** https://moria-framework.vercel.app/

## The five stages

| City | MORIA Stage |
|---|---|
| The Shire | Map |
| Rivendell | Orientate |
| The Council of Elrond | Reason |
| The Mines of Moria | Implement |
| Lothlórien | Amplify |

The visitor opens a folded map cover, drags/swipes into the map canvas, and clicks each city to expand a content panel with that stage's method and case-study narrative.

## Stack

- React + Framer Motion + Vite
- Google Fonts: IM Fell English (headings), Crimson Text (body)
- No UI libraries or component frameworks — all visuals are hand-built CSS and SVG
- Hosted on Vercel, deployed from `main`

## Getting started

```bash
npm install
npm run dev       # localhost:5173
```

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

There is no test suite or linter configured for this project.

## Project structure

```text
src/
├── App.jsx                  # top-level state: cover/map/panel visibility
├── components/
│   ├── Cover/                # front cover + mobile bio carousel
│   ├── MapCanvas/             # pannable/zoomable canvas, terrain, city markers
│   └── ContentPanel/           # ink-bleed stage panel, paging, stage nav
├── data/stages.js            # single source of truth for city + stage content
├── hooks/useIsMobile.js
└── styles/globals.css        # design tokens, fonts, base styles
```

## Documentation

Project reference material lives in [`docs/`](docs/):

- [`docs/MORIA_Product_Description.md`](docs/MORIA_Product_Description.md) — what this is and how it works
- [`docs/MORIA_Project_Plan.md`](docs/MORIA_Project_Plan.md) — phased plan and status
- [`docs/MORIA_Framework.md`](docs/MORIA_Framework.md) — full stage copy
- [`docs/design.md`](docs/design.md) — design system: colour, type, aesthetic principles

For guidance on working in this repo with Claude Code, see [`CLAUDE.md`](CLAUDE.md).