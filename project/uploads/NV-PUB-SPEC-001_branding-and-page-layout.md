# Branding & Page Layout Specification

| Field | Value |
|---|---|
| Document | NV-PUB-SPEC-001 |
| Version | 0.1 |
| Status | Draft |
| Classification | Internal |
| Author | Matthew Campion, PharmD |
| Purpose | Define the reinvented visual identity and article page anatomy for the NexVigilant editorial publication |

> **Scope note.** This is a *reinvention*, not an extension of the NexVigilant v4.0 "Clinical
> Intelligence Agency" brand. The v4.0 system is dark-mode-dominant, sans-serif (Inter), and
> intelligence-agency in feel. The publication is deliberately the opposite: light, paper, serif,
> editorial. Only non-visual governance threads are retained (document-numbering, company name,
> founder). Every visual decision below supersedes v4.0 for publication surfaces.

---

## 1. Positioning

**What this is:** a web-native publication that reads like an old-school broadsheet but executes
with modern web craft — *the ultimate modern-day Onion, with the bones of the Wall Street Journal.*

**The design thesis (one line):** newspaper structure (serif, columns, rules, drop caps, restrained
ink) executed with contemporary discipline (fluid type, generous whitespace, crisp rendering,
responsive, accessible). **Editorial-modern, never skeuomorphic** — no faux newsprint texture, no
sepia photo filters, no fold lines. The paper *feeling* comes from type and rhythm, not costume.

**The house and its two surfaces.** One publishing house renders two fundamentally different
editorial products through one design system:

| Surface | Nature | Needs | Engine? |
|---|---|---|---|
| **Satire** | Creative authorship (fiction) | Template + voice + characters | No — it is writing, not a pipeline |
| **Analysis / Critique** | Evaluative methodology (non-fiction) | Rubric + ClaimReview + governance | Yes — the analysis engine |

These never share a methodology. The `mode` field routes a piece to one surface or the other and
governs its badge, disclaimer, schema type, quoting rules, and legal posture.

---

## 2. The imprint family

Each mode publishes under a distinct masthead. The distinct names are not branding flourish — they
are the **visible boundary between fiction and accountable analysis**, committing each piece publicly
before a reader, author, or court can confuse the two. All imprints share one design system; only the
nameplate, accent, and apparatus differ.

| Mode | Imprint (candidate) | Concept | Accent | Issue prefix |
|---|---|---|---|---|
| `satire` | **The Serial Vigilant** | Tabloid-deadpan satire | Accent Red | `NV-SV` |
| `critique` | **The Black Box** | FDA black-box-warning motif; argues a thesis | Ink (heavy warning rule) | `NV-BB` |
| `analysis` | **The Signal** | Signal detection; evidence-led | Signal Blue | `NV-SIG` |

Names are candidates pending final ruling. Critique and analysis share the *same* analytical engine;
they differ only in voice register (argue-a-thesis vs. let-evidence-decide).

---

## 3. Brand foundation (reinvented)

### 3.1 Color system

Paper and ink. Light surface, deep editorial ink, sparing accent. Gold is the shared house thread.

| Token | Hex | Role |
|---|---|---|
| **Newsprint** | `#FBF8F1` | Page background (warm off-white — the "paper") |
| **Press Navy** | `#101C34` | Masthead field, headlines, primary ink *(the one thread kept from v4.0 Foundation Navy, recontextualized as editorial ink)* |
| **Ink** | `#1C1812` | Body text (warm near-black) |
| **Sepia Gray** | `#6B5D45` | Captions, bylines, metadata |
| **Rule** | `#D8CDB6` | Hairline dividers, column rules |
| **Accent Red** | `#B91C1C` | Serial Vigilant accent; "breaking" kicker |
| **Editorial Gold** | `#B45309` | House accent — footer tagline, drop cap, flourishes (a serious ochre, not a cheerful yellow) |
| **Signal Blue** | `#1E3A5F` | The Signal accent; analysis kickers |

**Per-mode accent mapping**

| Mode | Accent | Signature treatment |
|---|---|---|
| Satire | Accent Red `#B91C1C` | Red nameplate flag, red drop cap |
| Critique | Ink `#1C1812` | Heavy black warning-box rule around the claim under critique |
| Analysis | Signal Blue `#1E3A5F` | Blue kicker, blue evidentiary-quote border |

**Mode of operation:** light by default (the opposite of v4.0's 80/20 dark). A dark theme is a
*later* option, not the baseline — long-form reading favors dark-on-light.

### 3.2 Typography

Three roles, deliberately contrasted — the serif/sans pairing is the tell of *modern* editorial
design, not 1990s newsprint.

| Role | Typeface (recommended) | Fallback stack | Used for |
|---|---|---|---|
| **Editorial serif** | Newsreader *(designed for long-form news)* | Source Serif 4, Georgia, serif | Masthead, headlines, dek, body, pull quotes |
| **Label sans** | Inter *(thread kept from v4.0)* | Arial, system-ui, sans-serif | Kickers, section labels, byline, badges, metadata |
| **Data mono** | JetBrains Mono *(thread kept from v4.0)* | Consolas, monospace | Scores, ratings, issue IDs, ClaimReview values |

**Type scale** — fluid, `rem`-based, `clamp()` for headlines so it breathes across viewports.

| Element | Size (target) | Face | Weight | Notes |
|---|---|---|---|---|
| Masthead | `clamp(2.4rem, 6vw, 3rem)` | Serif | 500 | Sentence-case logotype, letter-spacing .01em |
| Headline | `clamp(1.7rem, 4.5vw, 2.1rem)` | Serif | 500 | line-height 1.12 |
| Dek / standfirst | `1rem` | Serif italic | 400 | line-height 1.45, Sepia or Ink |
| Kicker / section label | `0.7rem` | Sans | 500 | UPPERCASE, letter-spacing .16em, mode accent |
| Byline | `0.75rem` | Sans | 500 name / 400 detail | Sepia Gray |
| Body | `1rem` (≈18px) | Serif | 400 | line-height 1.62, justified in multi-column |
| Drop cap | ≈4× body | Serif | 500 | CSS `::first-letter`, mode/house accent |
| Pull quote | `1.2rem` | Serif | 500 | Ink/Press Navy |
| Score / rating | `1.5rem` value | Mono | 500 | analysis mode only |
| Footer disclaimer | `0.66rem` | Sans | 400 italic | Sepia Gray |

---

## 4. Page anatomy (article layout)

Top to bottom, the components of a single article page. Each maps to a front-matter field
(specified in NV-PUB-SPEC-002) and to semantic HTML (Section 6).

1. **Edition strip** — thin sans row above the nameplate: `Vol · No · Est · price-flavor`, and the
   **mode badge** (see 4.a). Self-labels the piece before the reader is a sentence in.
2. **Nameplate (masthead)** — the imprint logotype in editorial serif, centered, with tagline beneath.
   Sits on Newsprint by default; the Serial Vigilant may use a Press-Navy field for tabloid weight.
3. **Compound rule** — a two-line divider (mode accent over Rule) separating masthead from article.
4. **Kicker** — UPPERCASE sans, mode accent: `Section · Sub-tag` (e.g., `Drug Development · Analysis`).
5. **Headline** — serif, Press Navy, sentence case, believable-at-first-glance.
6. **Dek / standfirst** — serif italic, 40–55 words, sells the premise (satire) or states the thesis
   (critique) or frames the evidence question (analysis).
7. **Byline block** — author-as-entity: stipple **hedcut** mark + name + credentials + role +
   dateline + ISO date. Hedcut is a fictional stipple portrait (satire) or a real-author mark
   (analysis). Bordered top/bottom with Rule.
8. **Body** — editorial serif, two-column justified on wide viewports (single column ≤ 720px),
   hairline column rule, **CSS `::first-letter` drop cap** on the opening paragraph.
   **Subhead cadence:** an `<h2>` roughly every 8–12 paragraphs (observed convention from real
   editorial pages), sentence-case serif.
9. **Pull quote(s)** — see 4.b. Retained in all modes (WSJ + Onion both rely on them).
10. **Inline media** — `<figure>` with `<figcaption>`; responsive images (build uses the platform
    image optimizer). Require alt text.
11. **Footer** — house line, tagline (Editorial Gold), issue metadata, and the **mode-dependent
    disclaimer** (4.c). Rendered as one non-splitting unit.
12. **Related rail** — 3–4 related-headline teasers (topic-tag driven).

### 4.a Mode badge

| Mode | Badge label | Treatment |
|---|---|---|
| Satire | `SATIRE` | Accent Red field, Newsprint text, in the edition strip |
| Critique | `CRITIQUE` | Ink field, in the edition strip |
| Analysis | `ANALYSIS` | Signal Blue field, in the edition strip |

The satire badge is **non-negotiable and always visible**. Clearly-labeled satire is protected;
unlabeled "indistinguishable from news" is the failure mode. Craft makes it believable at a glance;
the badge keeps it honest on inspection.

### 4.b Pull quotes — two distinct forms

| Form | Mode | Structure | Semantics |
|---|---|---|---|
| **Satirical** | satire | Fictional self-incriminating quote + fictional attribution | `<figure><blockquote><figcaption>` |
| **Evidentiary** | critique/analysis | Real quoted claim (short, verbatim, attributed) + `<cite>` to source + verdict apparatus (credibility/evidence scores + bias/fallacy tags) | `<figure><blockquote><cite>` + score block |

The evidentiary quote is the **unit of scrutiny** — the extracted claim under review. Its scores are
governed by NV-PUB-SPEC-003 and **never appear as a naked number**; the dimension breakdown and
reasoning render with them.

### 4.c Footer disclaimer (mode-dependent)

| Mode | Disclaimer posture |
|---|---|
| Satire | "Content may be fabricated for illustrative purposes; no real persons. Any resemblance is coincidental." |
| Critique / Analysis | "Assessment of publicly available materials; reflects the author's reasoned opinion, not statements of fact. Quotation limited and attributed for criticism and review." |

The satire disclaimer must **never** appear on a piece that names real entities — it would be both
false and credibility-destroying.

---

## 5. Responsive behavior

- **≥ 1024px:** two-column justified body, full nameplate, related rail beside or below.
- **640–1023px:** single column, body left-aligned (justification creates rivers at narrow widths),
  full nameplate.
- **< 640px:** single column, condensed edition strip, nameplate scales via `clamp()`, drop cap
  retained but reduced. Mode badge always remains visible.
- Drop cap via `::first-letter` (degrades gracefully). No fixed positioning.

---

## 6. Accessibility & SEO envelope

**Semantic HTML map** (exceeds the reference publication, which renders a flat body div):

| Component | Element |
|---|---|
| Article | `<article>` |
| Headline | `<h1>` |
| Subheads | `<h2>` (real hierarchy, not font-size faking) |
| Byline date | `<time datetime="ISO-8601">` |
| Pull quote | `<figure><blockquote>…<figcaption>` |
| Source citation | `<cite>` |
| Image | `<img alt>` inside `<figure>` |

**Accessibility:** color contrast verified on Newsprint for all ink/accent tokens; alt text required;
logical heading order; the satire disclaimer is machine-readable (Section 6 schema), not visual-only.

**Structured data (JSON-LD) by mode:**

| Mode | Primary type | Claim-level |
|---|---|---|
| Satire | `NewsArticle` + `satire: true` honesty fields | — |
| Critique | `OpinionNewsArticle` | `ClaimReview` per evidentiary quote |
| Analysis | `AnalysisNewsArticle` | `ClaimReview` per evidentiary quote |

`ClaimReview.reviewRating` carries the Evidence Quality score (`bestRating:100, worstRating:0`).
Source credibility is a separate annotation, never folded into the rating. (Full mapping in
NV-PUB-SPEC-005.)

---

## 7. Mode configuration matrix (the single source of truth)

One lookup, keyed by `mode`, governs the whole pipeline:

| `mode` | Imprint | Accent | Badge | Disclaimer | Schema | Quoting | Bylines |
|---|---|---|---|---|---|---|---|
| `satire` | The Serial Vigilant | Red | SATIRE | fabricated; no real persons | `NewsArticle`+satire | unlimited (invented) | fictional personas OK |
| `critique` | The Black Box | Ink | CRITIQUE | reasoned opinion on public materials | `OpinionNewsArticle`+`ClaimReview` | short, attributed, fair-use | real accountability |
| `analysis` | The Signal | Signal Blue | ANALYSIS | evidence-based assessment; not statements of fact | `AnalysisNewsArticle`+`ClaimReview` | short, attributed, fair-use | real accountability |

**Mode-assignment gate (run before publish — the load-bearing boundary check):**
- Names real entities and makes factual-sounding claims? → **not satire**.
- Verdict precedes the evidence (started from the thesis)? → **critique** (label opinion).
- Verdict follows from disclosed evidence? → **analysis**.

---

## 8. Anti-patterns

- ✗ Skeuomorphic newsprint texture, sepia filters, torn-paper or fold effects (reads as costume).
- ✗ Gradients, drop shadows, glow on editorial surfaces.
- ✗ Faking heading hierarchy with font size instead of `<h2>` (breaks SEO + screen readers).
- ✗ A score without its derivation visible.
- ✗ The satire disclaimer on a piece that names real entities.
- ✗ The analytical scoring apparatus attached to satire (manufactures false authority — the exact
  thing this publication exists to expose).
- ✗ Dark-mode-dominant v4.0 styling on long-form reading surfaces.

---

## 9. Open decisions & limitations

1. **Imprint names not final.** *The Serial Vigilant / The Black Box / The Signal* are candidates.
2. **Typeface licensing.** Newsreader, Inter, JetBrains Mono are all open/free; confirm before build,
   or substitute licensed faces if a more distinctive headline serif is wanted.
3. **House name undecided.** The umbrella over the three imprints (e.g., "The Vigilant Press" /
   "NexVigilant Editorial") is unspecified.
4. **Dark theme deferred.** Light is baseline; a dark reading theme is a later spec, not v0.
5. **Hedcut system unscoped.** A repeatable stipple-portrait method for authors/personas is its own
   small design problem (candidate for a later spec).
6. **This spec is design intent, not production CSS.** The prototypes proved the feel (~45/100
   production-readiness); the renderer is built against NV-PUB-SPEC-002/005, not this document.

---

**NexVigilant, LLC** · *Empowerment Through Vigilance*
