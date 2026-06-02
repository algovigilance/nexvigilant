# Publication UI kit — the NexVigilant article page

The core product: a single **article page**, top to bottom, rendering all three editorial modes
from **one** design system. Open `index.html` and use the segmented control (demo chrome — not part
of the publication) to flip **satire / critique / analysis**. Switching a mode flips `data-mode` on
the article root, which swaps the accent, badge, nameplate, pull-quote form and footer disclaimer —
**the layout never changes.**

## Page anatomy (NV-PUB-SPEC-001 §4)

Edition strip + mode badge → nameplate (imprint wordmark + tagline) → compound rule → kicker
(`Section · Mode`) → headline (`<h1>`) → italic dek → byline block (stipple hedcut + name + creds +
role + ISO `<time>`) → two-column justified drop-cap body with an `<h2>` subhead mid-stream → pull
quote → inline figure → footer with mode-dependent disclaimer → related rail.

## Files

| File | Responsibility |
|---|---|
| `index.html` | Shell — pulls `../../colors_and_type.css`, `publication.css`, React/Babel, and the scripts below |
| `modes.js` | **Mode configuration matrix** (accent, badge, imprint, disclaimer, schema) + per-mode article copy. The single source of truth |
| `masthead.jsx` | `EditionStrip`, `ModeBadge`, `Nameplate`, `CompoundRule` |
| `article.jsx` | `ArticleHeader`, `Byline`, `Hedcut`, `ArticleBody` (drop cap + mid-stream `<h2>`), `Figure` |
| `quotes.jsx` | `PullQuote` (editorial form a), `EvidentiaryQuote` (form b: claim + `<cite>` + scorecard + tags), `PullQuoteForMode` |
| `footer.jsx` | `ArticleFooter` (mode disclaimer), `RelatedRail` |
| `app.jsx` | `ModeSwitcher` + `ArticlePage` composition + mount |
| `publication.css` | All component styles, built on the root token sheet. Responsive rules live here |
| `assets/` | Local copy of the hedcut marks |

## Semantics & accessibility

Real `<article>/<h1>/<h2>`, `<figure>/<blockquote>/<figcaption>`, `<cite>`, `<time datetime>`.
Hierarchy is structural, never font-size faking. Two-column justified body at ≥1024px → single
column, left-aligned below. Drop cap via `::first-letter`. Contrast meets WCAG AA on Newsprint.

## Notes

- The **evidentiary** pull quote is the unit of scrutiny — its mono scores render *with* their
  dimension labels and the claim/source they derive from (never a naked number).
- Inline figures are flat placeholders; supply real art (with `alt`) in production.
- Scores are illustrative pending NV-PUB-SPEC-003 (rubric) and -005 (ClaimReview/JSON-LD).
