import { describe, it, expect, vi } from 'vitest'

// Stub the framework signals/components so the route module imports in node.
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))
vi.mock('next/image', () => ({ default: () => null }))
vi.mock('next/link', () => ({ default: () => null }))

import ArticlePage, { generateStaticParams } from '@/app/[mode]/[slug]/page'
import { allArticleSlugs, getArticles } from '@/lib/modes'

describe('[mode]/[slug] article route', () => {
  it('generateStaticParams returns one entry per article (all modes)', () => {
    const params = generateStaticParams()
    expect(params).toEqual(allArticleSlugs())
    // satire now has two pieces → total is articles across all modes
    const total =
      getArticles('satire').length +
      getArticles('critique').length +
      getArticles('analysis').length
    expect(params).toHaveLength(total)
    expect(params).toContainEqual({
      mode: 'satire',
      slug: 'aldermere-inertia-placebo-patent',
    })
  })

  it('notFound for an unknown mode', () => {
    expect(() =>
      ArticlePage({ params: { mode: 'bogus', slug: 'whatever' } }),
    ).toThrow('NEXT_NOT_FOUND')
  })

  it('notFound for a valid mode but unknown slug', () => {
    expect(() =>
      ArticlePage({ params: { mode: 'satire', slug: 'no-such-article' } }),
    ).toThrow('NEXT_NOT_FOUND')
  })

  it('renders for every real (mode, slug) pair', () => {
    for (const { mode, slug } of allArticleSlugs()) {
      expect(() => ArticlePage({ params: { mode, slug } })).not.toThrow()
    }
  })
})
