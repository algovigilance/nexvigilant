// NV-PUB-SPEC-005 — structured data builders. Every node is derived from
// NV_MODES / NV_ARTICLES (single source of truth); no per-article JSON-LD is
// hand-authored. Builders are pure data → emitted server-side as one
// <script type="application/ld+json"> per page (no client JS).
import {
  HOUSE,
  NV_MODES,
  scoreBand,
  type Mode,
  type Article,
  type PullData,
  type ScoreItem,
} from '@/lib/modes'

// SPEC-005 §2: schema.org @type per editorial register. Satire is deliberately
// NOT a NewsArticle (§3) — asserting `NewsArticle` would tell crawlers it is news.
const ARTICLE_TYPE: Record<Mode, string> = {
  satire: 'Article',
  critique: 'OpinionNewsArticle',
  analysis: 'AnalysisNewsArticle',
}

type JsonLdNode = Record<string, unknown>

export interface JsonLdDoc {
  '@context': 'https://schema.org'
  '@graph': JsonLdNode[]
}

// SPEC-005 §1: the publisher Organization, emitted on every page. `brand` is the
// reader-facing masthead; `name` is the legal entity. Sourced from HOUSE.
function organization(): JsonLdNode {
  return {
    '@type': 'Organization',
    name: HOUSE.publisher,
    url: HOUSE.url,
    brand: HOUSE.wordmark,
  }
}

// SPEC-005 §1 / §7.2: author-as-entity. `url` (/author/{slug}) is omitted until
// author profile pages exist.
function author(article: Article): JsonLdNode {
  return {
    '@type': 'Person',
    name: article.author.name,
    jobTitle: article.author.role,
  }
}

const articleUrl = (mode: Mode) => `${HOUSE.url}/${mode}`

// SPEC-003 §1/§9: Evidence Quality (the gated B-score) is the only score that becomes
// ClaimReview.reviewRating. Source credibility is never folded in. The builder and the
// on-page scorecard read the SAME ScoreItem, so the rating cannot diverge from the
// rendered number (SPEC-005 §4 "G1 binding").
export const EVIDENCE_QUALITY_LABEL = 'Evidence quality'
export function evidenceQualityScore(pull: PullData): ScoreItem | undefined {
  if (pull.kind !== 'evidentiary') return undefined
  return pull.scores.find((s) => s.label === EVIDENCE_QUALITY_LABEL)
}

// SPEC-005 §4: one ClaimReview per evidentiary pull. reviewRating = gated Evidence
// Quality, bestRating 100 / worstRating 0, alternateName = band label.
function claimReview(mode: Mode, pull: PullData): JsonLdNode | null {
  if (pull.kind !== 'evidentiary') return null
  const score = evidenceQualityScore(pull)
  if (!score) return null
  return {
    '@type': 'ClaimReview',
    url: `${articleUrl(mode)}#claim-1`,
    claimReviewed: pull.claim,
    itemReviewed: {
      '@type': 'CreativeWork',
      name: pull.cite,
    },
    author: organization(),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: score.value,
      bestRating: 100,
      worstRating: 0,
      alternateName: scoreBand(score.value),
    },
  }
}

// SPEC-005 §2/§3/§4: the per-mode article document. Returns a @graph carrying the
// article node and (critique/analysis only) its ClaimReview. Satire produces zero
// ClaimReview nodes and is never a NewsArticle.
export function buildArticleLd(mode: Mode, article: Article): JsonLdDoc {
  const cfg = NV_MODES[mode]
  const node: JsonLdNode = {
    '@type': ARTICLE_TYPE[mode],
    headline: article.headline,
    description: article.dek,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    articleSection: article.section,
    inLanguage: 'en',
    url: articleUrl(mode),
    mainEntityOfPage: articleUrl(mode),
    author: author(article),
    publisher: organization(),
  }

  if (mode === 'satire') {
    // SPEC-005 §3 satire honesty encoding: never NewsArticle; genre + status flags +
    // the parody disclaimer verbatim in disambiguatingDescription.
    node.genre = 'Satire'
    node.creativeWorkStatus = 'Satire'
    node.disambiguatingDescription = `Satire. ${cfg.disclaimer}`
  }

  const graph: JsonLdNode[] = [node]
  const review = claimReview(mode, article.pull)
  if (review) graph.push(review)

  return { '@context': 'https://schema.org', '@graph': graph }
}

// SPEC-005 §5: the minimal WebSite node for `/`. No CollectionPage / ItemList — that
// is deferred until a real article index with stable URLs exists (§7.1).
export function buildSiteLd(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: HOUSE.wordmark,
    url: HOUSE.url,
    publisher: organization(),
  }
}

// Serialize for an inline <script type="application/ld+json">. `<` is escaped to
// < so a string value can never close the script tag — defensive, and still
// valid JSON (parses back identically). No client JS is involved.
export function serializeJsonLd(doc: unknown): string {
  return JSON.stringify(doc).replace(/</g, '\\u003c')
}
