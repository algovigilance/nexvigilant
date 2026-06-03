import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { PullQuoteForMode } from '@/components/quotes'
import { NV_MODES, featuredArticle } from '@/lib/modes'

// quotes.tsx is pure (type-only imports) so it renders to static markup with no
// next/* stubs. This pins the discriminated-union selector: `kind` decides form.
describe('PullQuoteForMode discriminated union', () => {
  it('renders the plain editorial form for kind="satirical"', () => {
    const html = renderToStaticMarkup(
      <PullQuoteForMode cfg={NV_MODES.satire} pull={featuredArticle('satire').pull} />,
    )
    expect(html).toContain('class="nv-pullquote"')
    expect(html).toContain('<figcaption>')
    expect(html).toContain('underserved indication') // from the satire quote
    // never the evidentiary apparatus
    expect(html).not.toContain('Claim under review')
    expect(html).not.toContain('nv-score')
  })

  it.each(['critique', 'analysis'] as const)(
    'renders the evidentiary form for kind="evidentiary" (%s)',
    (mode) => {
      const html = renderToStaticMarkup(
        <PullQuoteForMode cfg={NV_MODES[mode]} pull={featuredArticle(mode).pull} />,
      )
      expect(html).toContain('class="nv-evidence"')
      expect(html).toContain('Claim under review')
      expect(html).toContain('<cite>')
      // §4.b/§8: scores never naked — value, dimension label, and reasoning all render
      expect(html).toContain('/100')
      expect(html).toContain('Evidence quality')
      expect(html).toContain('Source credibility')
      expect(html).toContain('nv-score__reasoning')
      // not the plain form
      expect(html).not.toContain('class="nv-pullquote"')
    },
  )
})
