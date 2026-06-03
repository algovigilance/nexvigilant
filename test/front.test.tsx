import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

// The front page is pure server components with plain <a> and no next/link or
// next/image in its graph, so it renders to static markup with no stubs.
import Home from '@/app/page'
import { NV_MODES, featuredArticle, MODE_ORDER, HOUSE } from '@/lib/modes'

const html = renderToStaticMarkup(<Home />)

describe('front page (/)', () => {
  it('renders the house cover wordmark + credit from the HOUSE constant', () => {
    expect(html).toContain(HOUSE.wordmark)
    expect(html).toContain(HOUSE.credit)
    expect(html).toContain(HOUSE.tagline)
  })

  it('renders exactly three imprint sections in canonical mode order', () => {
    const sections = html.match(/data-mode="(?:satire|critique|analysis)"/g) ?? []
    expect(sections).toEqual([
      'data-mode="satire"',
      'data-mode="critique"',
      'data-mode="analysis"',
    ])
    expect(MODE_ORDER).toEqual(['satire', 'critique', 'analysis'])
  })

  it('each section links to its /[mode] route', () => {
    for (const mode of MODE_ORDER) {
      expect(html).toContain(`href="/${mode}"`)
    }
  })

  it('teasers + nameplate marks are sourced from NV_ARTICLES/NV_MODES (no duplicated copy)', () => {
    for (const mode of MODE_ORDER) {
      // teaser headline is the exact featured-article headline
      expect(html).toContain(featuredArticle(mode).headline)
      // imprint nameplate-mark italicizes the distinguishing last word
      const last = NV_MODES[mode].imprint.split(' ').pop()!
      expect(html).toContain(`<em>${last}</em>`)
    }
  })

  it('is not a redirect (real cover markup is rendered)', () => {
    expect(html).toContain('nv-front-masthead')
    expect(html.length).toBeGreaterThan(500)
  })
})
