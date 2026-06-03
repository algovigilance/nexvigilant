# NexVigilant — Implementation

A production Next.js (App Router) implementation of the **NexVigilant** design system —
a web-native pharmaceutical-intelligence publication that renders **three editorial
registers** (satire / critique / analysis) from a single themed design system.

Built from the design handoff in `project/` (see `project/README.md` for the full
brand spec, content fundamentals, and visual foundations).

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → The Vigilant Press cover (front page)
npm run build    # static front page + all three mode routes
```

## Routes

Modes are **theming, not three designs** — one set of components renders all three
registers; only the accent (`--nv-accent`), badge, nameplate, pull-quote form, and
disclaimer change per mode.

| Route | Imprint | Accent | Pull-quote form |
|---|---|---|---|
| `/satire` | The Serial Vigilant | Red `#B91C1C` (Press-Navy tabloid flag nameplate) | Plain editorial pull quote |
| `/critique` | The Black Box | Ink `#1C1812` (heavy 8px warning box) | Evidentiary (claim + cite + scorecard) |
| `/analysis` | The Signal | Signal Blue `#1E3A5F` | Evidentiary (claim + cite + scorecard) |

`/` is the **The Vigilant Press cover** (front page) surfacing the three imprint sections;
the mode routes are statically generated via `generateStaticParams`.

## Structure

```
app/
  layout.tsx          # root html/body, imports globals.css
  page.tsx            # The Vigilant Press cover (front page) + WebSite JSON-LD
  [mode]/page.tsx     # the article page — validates mode, composes all components
components/
  masthead.tsx        # ModeBadge, ModeNav, EditionStrip, Nameplate, CompoundRule
  article.tsx         # ArticleHeader, Byline, Hedcut, ArticleFigure
  article-body.tsx    # two-column drop-cap body with mid-stream subhead + pull quote
  quotes.tsx          # PullQuote (editorial) + EvidentiaryQuote (scorecard) + selector
  footer.tsx          # ArticleFooter (mode disclaimer) + RelatedRail
lib/
  modes.ts            # NV_MODES config matrix + NV_ARTICLES copy + types (single source of truth)
styles/
  globals.css         # design tokens (color/type/spacing) + .nv component styles + responsive
public/
  fonts/              # 22 self-hosted woff2 (Newsreader / Inter / JetBrains Mono) + fonts.css
  assets/             # hedcut-1..3.png stipple author marks
tailwind.config.ts    # brand colors + type roles exposed as Tailwind tokens
```

## Design fidelity

- **Tokens** (`styles/globals.css`) port `project/colors_and_type.css` verbatim — same
  hex values, fluid `clamp()` type scale, spacing scale, line heights, tracking.
- **Component CSS** ports `project/ui_kits/publication/publication.css` — edition strip,
  nameplate (incl. the satire Press-Navy flag), compound rule, two-column justified body
  with `::first-letter` drop cap, both pull-quote forms, evidentiary scorecard, footer.
- **Semantic HTML** preserved: real `<article>`, `<h1>`/`<h2>` hierarchy, `<figure>`/
  `<figcaption>`, `<time>`, `<cite>`. The demo `text/babel` prototype became typed,
  server-rendered React components — no runtime Babel, no client JS on the article.
- **Responsive** per spec: two-column justified body at ≥1024px → single-column,
  left-aligned at <720px; drop cap scales down.

## Notes & deferred items (carried from the design handoff)

- **Scores are calibrated to NV-PUB-SPEC-003 (v1.1).** Each evidentiary score renders
  with its band (§5) and one-line derivation (§G1 no naked numbers); reasoning names the
  §4 verifiability gate where it applies; tags are drawn from the §6 controlled
  bias/fallacy vocabulary, each with its trigger. Band is derived from the value
  (`scoreBand`) so the two cannot drift. Per v1.1, a registration record / conference
  abstract is a *secondary report* (B1 cap 15, not the preprint cap) — the analysis
  scorecard reflects this — and conflict-of-interest is a source-credibility finding
  shown in the source annotation, never a §6 fallacy tag.
- **Structured data is emitted per NV-PUB-SPEC-005 (v1.0).** Each page server-renders one
  `<script type="application/ld+json">` built by `lib/jsonld.ts` from `NV_MODES`/`NV_ARTICLES`
  (no hand-authored JSON-LD). Satire → `Article` + `genre:"Satire"` (never `NewsArticle`, zero
  `ClaimReview`); critique → `OpinionNewsArticle` and analysis → `AnalysisNewsArticle`, each with
  one `ClaimReview` whose `reviewRating` is the on-page **gated Evidence Quality** score (band as
  `alternateName`); source credibility is not folded in (§4/§7.3, on-page only). `/` emits a single
  minimal `WebSite` node — no `CollectionPage`/`ItemList` until a real article index exists (§5/§7.1).
  Author `Person.url` is omitted until `/author/{slug}` pages exist (§7.2).
- **Hedcuts** are the procedurally generated stipple marks from the handoff; replace
  with real author portraits in production.
- **Inline figures** ship as flat placeholders (`ArticleFigure`) — supply real editorial
  art with alt text.
- **Mode navigation** (`ModeNav`) replaces the prototype's demo toolbar. It's a real top
  nav between the three registers; remove or relocate it if these become independent
  publications rather than registers of one system.
- **Imprint / umbrella names** (*The Serial Vigilant / The Black Box / The Signal*;
  "an imprint of The Vigilant Press") are spec candidates — confirm or correct.
