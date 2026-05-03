# marckernest Design System

**marckernest** — a modular design toolkit for tools, sites, and dashboards built on cassette-futurism: the warm analog optimism of late-70s/80s tech hardware.

---

## Aesthetic

Cassette-futurism — the warm, analog optimism of late-70s/80s consumer and industrial technology. Think Braun appliances, NASA mission control, early synthesizers, VHS hardware, portable tape decks. Functional beauty with no unnecessary ornamentation. Tactile, purposeful, engineered warmth.

---

## Color Palette

| Token | Hex | Role |
|---|---|---|
| `ink` | `#1a1a18` | Primary text, deep backgrounds |
| `paper` | `#f5f2eb` | Primary background — aged, warm off-white |
| `cream` | `#ede9de` | Secondary surfaces, cards, recessed panels |
| `rule` | `#c8c2b0` | Borders, dividers, subtle separators |
| `accent` | `#2a5c45` | Primary interactive — CTAs, active states (deep forest green) |
| `accent-light` | `#e8f0ec` | Accent backgrounds, hover states, tinted surfaces |
| `danger` | `#8b2e2e` | Errors, destructive actions, warnings |

---

## Typography

Mixed hierarchy:

- **Monospace** for data, readouts, labels, and UI chrome — feels like terminal output or a cassette label
- **Geometric sans-serif** for headings — wide, tight, engineered (Eurostile/Microgramma energy)
- **Body text** should feel like a printed manual: clear, structured, no-nonsense

### MORIA Framework overrides

The MORIA site uses a literary/cartographic type system that diverges from the base system:

- **IM Fell English** — headings and place names (map aesthetic)
- **Crimson Text** — body text (printed document feel)

These overrides are scoped to the MORIA project and do not replace the system defaults.

---

## Systems Thinking

The design system is a modular toolkit — components like interchangeable cassette parts. Everything has a clear purpose and a defined state. Think instrument panel logic: status indicators, segmented information, clear affordances. Dense but not cluttered. Every element earns its place.

---

## Surfaces & Texture

Subtle texture on surfaces to evoke analog materiality — not heavy, just enough to feel physical. Slightly matte, warm. Borders should be visible and deliberate (`rule` color). Rounded corners should be minimal or square — this is hardware, not bubbly consumer software.

---

## Use Cases

This system will power:

- **Tools** — productivity and utility apps
- **Sites** — personal, portfolio, and project websites
- **Dashboards** — data-dense interfaces

Components should scale across all three contexts.

---

## Voice

Technical, precise, understated. Like a good piece of equipment: it does exactly what it says.

---

## Project-Specific Notes

### MORIA Framework (`marckernest.com/moria-framework`)

The MORIA site is the first major deployment of this system. It applies the base palette in full but uses a cartographic/literary aesthetic layer on top — parchment textures, ink-line SVG terrain, IM Fell English type. The cassette-futurism DNA is present in the structural logic (modular panels, deliberate borders, earned ornamentation) even where the surface feel leans older.

**CSS variables in use:**

```css
--color-ink: #1a1a18;
--color-paper: #f5f2eb;
--color-cream: #ede9de;
--color-rule: #c8c2b0;
--color-accent: #2a5c45;
--color-accent-light: #e8f0ec;
--color-danger: #8b2e2e;
```
