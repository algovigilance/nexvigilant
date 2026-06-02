# NexVigilant — Design System

A web-native **pharmaceutical-intelligence publication** built on old-school broadsheet craft
(serif type, columns, hairline rules, real drop caps, restrained ink on warm paper) executed with
modern web discipline (fluid type, generous whitespace, crisp flat rendering, responsive,
accessible). *The bones of the Wall Street Journal, rendered for a contemporary reader.*

One publishing house — **NexVigilant**, an imprint of *The Vigilant Press* — renders **three
editorial registers** through a single design system:

| Mode | Imprint | Nature | Accent | Issue prefix |
|---|---|---|---|---|
| `satire` | **The Serial Vigilant** | Deadpan tabloid satire (fiction) | Accent Red `#B91C1C` | `NV-SV` |
| `critique` | **The Black Box** | Argues a thesis (opinion) | Ink `#1C1812` (heavy warning rule) | `NV-BB` |
| `analysis` | **The Signal** | Evidence-led assessment | Signal Blue `#1E3A5F` | `NV-SIG` |

> **Modes are theming, not three designs.** The same components render all three; only the accent
> color, badge, nameplate, pull-quote form and disclaimer change. The accent is a CSS variable
> (`--nv-accent`) flipped by a `[data-mode]` attribute on the article root.

## Sources & authority

- **`uploads/NV-PUB-SPEC-001_branding-and-page-layout.md`** — the governing brand & page-anatomy
  spec (v0.1, Matthew Campion, PharmD). This design system implements it. All tokens, type roles,
  color values and page anatomy trace to this document. Referenced sibling specs (NV-PUB-SPEC-002
  front-matter, -003 scoring rubric, -005 schema mapping) were **not** provided; anything depending
  on them is noted as a limitation below.
- No codebase or Figma was provided — this is a from-scratch reinvention (the spec explicitly
  supersedes the dark, sans-serif "v4.0 Clinical Intelligence Agency" brand for publication
  surfaces). Nothing was imported.

---

## CONTENT FUNDAMENTALS

**Voice splits by mode, but the craft is constant: deadpan, precise, never winking.**

- **Person & address.** Third person and institutional. Satire reports fiction with a straight
  face ("The pharmaceutical concern Velmora Therapeutics on Thursday unveiled…"). Analysis/critique
  use a measured first-person-plural of the desk ("We reached the trial's registration record…").
  Never "you"; the reader is addressed only through the clarity of the prose.
- **Casing.** **Sentence case everywhere** — masthead, headlines, subheads. Kickers, section
  labels, badges and the footer meta line are the *only* uppercase, set in Inter with wide tracking
  (`.12–.18em`). Faking hierarchy with size is forbidden; real `<h1>/<h2>` carry it.
- **Headlines** are believable-at-first-glance. Satire headlines are absurd-but-plausible
  ("…breakthrough drug that treats the side effects of its other drugs"). Analysis headlines pose
  the evidentiary question ("Does the claim hold up? The data tells a narrower story").
- **Deks (standfirsts)** run 40–55 words, serif italic. They *sell the premise* (satire), *state
  the thesis* (critique), or *frame the evidence question* (analysis).
- **Tone.** Dry, institutional, unhurried. Satire never breaks character or signals the joke — the
  **badge** does the labeling so the prose doesn't have to. Analysis is conditional and hedged on
  purpose ("a measurable benefit on a secondary endpoint, against a weak comparator, awaiting
  overall-survival data").
- **No emoji. No exclamation. No hype punctuation.** Numbers appear only with their derivation
  (a score never stands as a naked figure). Em dashes and proper typographic quotes (“ ” ‘ ’) are
  used throughout.
- **Honesty apparatus is load-bearing copy.** The satire disclaimer ("Content may be fabricated…
  no real persons") and the critique/analysis disclaimer ("reasoned opinion on publicly available
  materials… quotation limited and attributed for criticism and review") are mandatory and
  mode-routed.

---

## VISUAL FOUNDATIONS

**Thesis: editorial-modern, *never* skeuomorphic.** The paper feeling comes from type and rhythm —
not costume. No faux newsprint texture, sepia photo filters, torn-paper, or fold effects.

- **Color & light.** Light by default — warm off-white **Newsprint `#FBF8F1`** ground,
  **Ink `#1C1812`** body, **Press Navy `#101C34`** for masthead/headlines. **Sepia `#6B5D45`** for
  metadata. Accents (**Red**, **Editorial Gold** `#B45309`, **Signal Blue**) are sparing and
  mode-bound; gold is the shared house thread (tagline, drop cap, flourish). Dark mode is
  *deferred*, not the baseline — long-form reading favors dark-on-light.
- **Type is the system.** Three deliberately contrasted roles: **editorial serif (Newsreader)** for
  masthead/headline/dek/body/pull-quotes; **label sans (Inter)** for kickers/labels/byline/badges;
  **data mono (JetBrains Mono)** for scores and IDs. The serif/sans contrast is the modern-editorial
  tell. Fluid `clamp()` headlines; body line-height `1.62`; two-column justified body collapses to
  single-column left-aligned below 1024px.
- **Backgrounds.** Flat fills only. Newsprint, a slightly deeper `#F4EEE0` for sunk panels, white
  for evidentiary cards, Press Navy for the Serial Vigilant tabloid flag. **No gradients, no images
  as texture.** Inline media lives in `<figure>` with required `alt` + `<figcaption>`; production
  art is supplied by the image optimizer (placeholders ship in the kit).
- **Rules & dividers** carry the structure: 1px hairline (`#D8CDB6`), 3px heavy accent, the
  **compound rule** (accent over hairline) between masthead and article, and a double rule capping
  the footer. Column rule is a single hairline.
- **Corners & elevation.** Near-square — `1–2px` radius on panels and badges; **no drop shadows,
  no glow** on editorial surfaces (depth is forbidden by the spec). The only circle in the system is
  the **hedcut** author mark. Borders (not shadows) separate evidentiary cards; the critique mode
  swaps to a heavy 8px black "warning-box" border around the claim under scrutiny.
- **Motion.** Effectively none on the reading surface — this is print logic. The only animation is
  a 120ms color/background transition on the demo mode-switcher and link/related-rail hovers.
  No bounces, no parallax, no entrance animations on article content.
- **Hover / press.** Links and related-rail headlines shift from Press Navy to the mode accent on
  hover; the demo segmented control fills with newsprint on the active segment. No scale/press
  transforms on editorial elements.
- **Transparency & blur.** None on editorial surfaces. The only alpha use is the demo toolbar
  (dark chrome, clearly *not* the publication) and the navy-flag kicker.
- **Imagery vibe.** Warm, restrained, monochrome-leaning. The hedcut marks are ink/navy stipple on
  transparent — engraving, not photography.

---

## ICONOGRAPHY

**This is a publication, not an app — iconography is deliberately near-absent.** The visual system
is built from *typography and rules*, not icon glyphs. There is no icon font and no icon sprite.

- **No emoji, ever.** They violate the deadpan editorial tone.
- **Typographic marks do the work** unicode does carry meaning: the middot `·` separates edition
  and kicker fields; em dash `—` opens figure captions and pull-quote attributions; true curly
  quotes `“ ” ‘ ’` set quotations; the drop cap is a real glyph via `::first-letter`.
- **The only bespoke "mark"** is the **hedcut** (`assets/hedcut-1…3.png`) — a procedurally generated
  stipple/halftone author portrait (engraving style, ink or navy on transparent). It is generated,
  not photographed, and stands in for a fictional persona (satire) or a real-author mark (analysis).
- **If UI chrome ever needs icons** (a future reader app, share controls, etc.), use a hairline
  open-stroke set at ~1.5px to match the rule weight — **Lucide** (CDN: `https://unpkg.com/lucide`)
  is the recommended substitute and should be flagged where introduced. None are used in v0.

---

## FONTS — substitution note

All three families are open-source and **self-hosted** in `fonts/` (latin + latin-ext woff2,
weights as used), wired through `fonts/fonts.css`:

- **Newsreader** (editorial serif) — 400/500/600 + 400/500 italic
- **Inter** (label sans) — 400/500/600/700
- **JetBrains Mono** (data mono) — 400/500

These match the spec's recommended faces exactly — **no substitution was required.** If you want a
more distinctive headline serif (the spec leaves this open), swap only the `--nv-serif` display
usage and supply the licensed files.

---

## INDEX — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, index |
| `SKILL.md` | Agent-Skill manifest (works in Claude Code) |
| `colors_and_type.css` | **Start here.** All design tokens (color, type, spacing, scale) + semantic element defaults under `.nv` |
| `fonts/` | Self-hosted woff2 + `fonts.css` (`@import`-ed by `colors_and_type.css`) |
| `assets/` | `hedcut-1…3.png` — stipple author marks |
| `preview/` | 22 Design-System tab cards (Colors, Type, Spacing, Components, Brand) |
| `ui_kits/publication/` | **The article page** — the core product. See its README |
| `uploads/` | The governing spec, `NV-PUB-SPEC-001` |

### UI kits

- **`ui_kits/publication/`** — the single ARTICLE page, top to bottom, rendering all three modes
  from one system. Open `index.html` and use the segmented control to flip satire / critique /
  analysis. Factored into small React components: `masthead.jsx`, `article.jsx`, `quotes.jsx`,
  `footer.jsx`, composed by `app.jsx`, with content + the mode matrix in `modes.js`.

---

## LIMITATIONS & OPEN DECISIONS

- **Imprint names are candidates** (per spec §9): *The Serial Vigilant / The Black Box / The Signal*.
- **House/umbrella name** rendered here as *NexVigilant · an imprint of The Vigilant Press* — the
  spec leaves the umbrella name undecided; confirm.
- **Scoring & schema specs not provided.** NV-PUB-SPEC-003 (the score rubric) and -005 (JSON-LD /
  ClaimReview mapping) were not in scope, so evidentiary scores are *illustrative* and no JSON-LD is
  emitted. Wire these when the specs land.
- **Hedcut system** is a working procedural prototype, not the "repeatable stipple-portrait method"
  the spec defers to a later spec. Real author marks should replace the generated ones.
- **Inline figures** ship as flat placeholders — supply real editorial art (with alt text) in
  production.
- **Dark theme** is intentionally absent (light is the v0 baseline).
