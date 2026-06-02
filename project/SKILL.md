---
name: nexvigilant-design
description: Use this skill to generate well-branded interfaces and assets for NexVigilant — a web-native pharmaceutical-intelligence publication (broadsheet craft + modern web execution) that renders three editorial modes (satire / critique / analysis) from one design system. Contains essential design guidelines, colors, type, fonts, the stipple hedcut author mark, and a React article-page UI kit for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill first, and explore the other available files
(`colors_and_type.css` for tokens, `ui_kits/publication/` for the article-page components,
`preview/` for specimen cards, `assets/` for hedcut marks, `uploads/NV-PUB-SPEC-001…` for the
governing spec).

**Core idea to internalize:** NexVigilant is editorial-modern, **never** skeuomorphic. The "paper"
feeling comes from serif type, columns, hairline rules and real drop caps — *not* from texture,
sepia filters, or fold effects. Light baseline (warm Newsprint `#FBF8F1`, dark-on-light). Three
type roles in deliberate contrast: serif (Newsreader) for editorial, sans (Inter) for labels, mono
(JetBrains Mono) for scores/IDs. **Modes are theming, not three designs** — only the accent
(`--nv-accent`), badge, nameplate, pull-quote form and disclaimer change between satire (Red),
critique (Ink heavy warning rule) and analysis (Signal Blue). The satire badge is always visible;
scores never appear as naked numbers.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the fonts + `assets/` +
`colors_and_type.css` out and build static HTML files for the user to view — set `data-mode` on the
article root to theme. If working on production code, copy the assets and apply the rules here to
become an expert in designing with this brand (target stack: Next.js App Router + Tailwind).

If the user invokes this skill without other guidance, ask what they want to build or design, ask a
few focused questions (which mode? satire vs. accountable analysis? what's the topic?), and act as an
expert editorial designer who outputs HTML artifacts *or* production code, depending on the need.
