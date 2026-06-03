import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  buildArticleLd,
  buildSiteLd,
  buildModeIndexLd,
  serializeJsonLd,
  evidenceQualityScore,
} from '@/lib/jsonld'
import { EvidentiaryQuote } from '@/components/quotes'
import {
  HOUSE,
  featuredArticle,
  getArticles,
  scoreBand,
  MODE_ORDER,
  type Mode,
} from '@/lib/modes'

type Node = Record<string, any>
const graphOf = (mode: Mode): Node[] => buildArticleLd(mode, featuredArticle(mode))['@graph']
const claimReviews = (g: Node[]) => g.filter((n) => n['@type'] === 'ClaimReview')

describe('SPEC-005 §3 — satire honesty encoding', () => {
  const g = graphOf('satire')
  const article = g[0]

  it('is @type "Article" and NEVER "NewsArticle"', () => {
    expect(article['@type']).toBe('Article')
    for (const n of g) expect(n['@type']).not.toBe('NewsArticle')
  })

  it('carries genre/status + the parody disclaimer, and zero ClaimReview', () => {
    expect(article.genre).toBe('Satire')
    expect(article.creativeWorkStatus).toBe('Satire')
    expect(String(article.disambiguatingDescription)).toMatch(/^Satire\./)
    expect(claimReviews(g)).toHaveLength(0)
  })
})

describe('SPEC-005 §2/§4 — critique & analysis ClaimReview', () => {
  it.each([
    ['critique', 'OpinionNewsArticle'],
    ['analysis', 'AnalysisNewsArticle'],
  ] as const)('%s → @type %s with exactly one ClaimReview', (mode, type) => {
    const g = graphOf(mode)
    expect(g[0]['@type']).toBe(type)
    expect(claimReviews(g)).toHaveLength(1)
  })

  it.each(['critique', 'analysis'] as const)(
    '%s reviewRating == the on-page gated Evidence Quality score (G1 binding)',
    (mode) => {
      const pull = featuredArticle(mode).pull
      if (pull.kind !== 'evidentiary') throw new Error('expected evidentiary')
      const evidence = evidenceQualityScore(pull)!
      const rating = claimReviews(graphOf(mode))[0].reviewRating

      // the rating IS the evidence-quality number, with the 0–100 scale + band
      expect(rating.ratingValue).toBe(evidence.value)
      expect(rating.bestRating).toBe(100)
      expect(rating.worstRating).toBe(0)
      expect(rating.alternateName).toBe(scoreBand(evidence.value))

      // source credibility is NOT folded into the headline rating
      const sourceCred = pull.scores.find((s) => s.label === 'Source credibility')!
      expect(rating.ratingValue).not.toBe(sourceCred.value)

      // and the SAME number is what the scorecard renders on-page → cannot diverge
      const html = renderToStaticMarkup(
        <EvidentiaryQuote
          claim={pull.claim}
          cite={pull.cite}
          scores={pull.scores}
          tags={pull.tags}
        />,
      )
      expect(html).toContain(`${rating.ratingValue}`)
    },
  )

  it.each(['critique', 'analysis'] as const)(
    '%s ClaimReview reviews the quote against the cited source',
    (mode) => {
      const pull = featuredArticle(mode).pull
      if (pull.kind !== 'evidentiary') throw new Error('expected evidentiary')
      const review = claimReviews(graphOf(mode))[0]
      expect(review.claimReviewed).toBe(pull.claim)
      expect(review.itemReviewed['@type']).toBe('CreativeWork')
      expect(review.itemReviewed.name).toBe(pull.cite)
    },
  )
})

describe('SPEC-005 §5 — front page WebSite', () => {
  const site = buildSiteLd() as Node

  it('is exactly one WebSite node named for the masthead, with a publisher', () => {
    expect(site['@type']).toBe('WebSite')
    expect(site.name).toBe(HOUSE.wordmark)
    expect(site.url).toBe(HOUSE.url)
    expect((site.publisher as Node)['@type']).toBe('Organization')
  })

  it('emits no ItemList / CollectionPage', () => {
    const json = serializeJsonLd(site)
    expect(json).not.toContain('ItemList')
    expect(json).not.toContain('CollectionPage')
  })
})

describe('SPEC-005 §6 — serialized JSON-LD is valid and script-safe', () => {
  it.each(['satire', 'critique', 'analysis'] as const)(
    '%s document parses back to the same object',
    (mode) => {
      const doc = buildArticleLd(mode, featuredArticle(mode))
      const json = serializeJsonLd(doc)
      expect(json).not.toContain('</script')
      expect(JSON.parse(json)).toEqual(doc)
    },
  )

  it('site document parses back to the same object', () => {
    const site = buildSiteLd()
    expect(JSON.parse(serializeJsonLd(site))).toEqual(site)
  })
})

describe('SPEC-005 §2 — multi-article model (every article, not just the lead)', () => {
  it.each(MODE_ORDER)('every %s article builds with the right @type + slug URL', (mode) => {
    for (const article of getArticles(mode)) {
      const g = buildArticleLd(mode, article)['@graph']
      const node = g[0]
      // satire is Article + zero ClaimReview; critique/analysis are NewsArticle subtypes
      expect(node['@type']).not.toBe('NewsArticle')
      if (mode === 'satire') expect(claimReviews(g)).toHaveLength(0)
      // the article node URL is the stable per-article /[mode]/[slug]
      expect(node.url).toContain(`/${mode}/${article.slug}`)
    }
  })
})

describe('SPEC-005 §5/§7.1 — per-mode index CollectionPage + ItemList', () => {
  it.each(MODE_ORDER)('%s index lists every article as an ordered ListItem', (mode) => {
    const articles = getArticles(mode)
    const doc = buildModeIndexLd(mode, articles) as Node
    expect(doc['@type']).toBe('CollectionPage')
    const list = doc.mainEntity as Node
    expect(list['@type']).toBe('ItemList')
    const items = list.itemListElement as Node[]
    expect(items).toHaveLength(articles.length)
    items.forEach((item, i) => {
      expect(item['@type']).toBe('ListItem')
      expect(item.position).toBe(i + 1)
      expect(item.url).toContain(`/${mode}/${articles[i].slug}`)
      expect(item.name).toBe(articles[i].headline)
    })
    expect(JSON.parse(serializeJsonLd(doc))).toEqual(doc)
  })

  it('the satire index now carries two items (new piece added)', () => {
    const list = buildModeIndexLd('satire', getArticles('satire')).mainEntity as Node
    expect((list.itemListElement as Node[]).length).toBe(2)
  })
})
