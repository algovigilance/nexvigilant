import { describe, it, expect, vi } from 'vitest'

// notFound() normally throws a framework-internal signal; stub it with a
// recognizable sentinel so we can assert the route guards unknown slugs.
// next/image and next/link are stubbed so the route module imports in node.
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))
vi.mock('next/image', () => ({ default: () => null }))
vi.mock('next/link', () => ({ default: () => null }))

import ArticlePage, { generateStaticParams } from '@/app/[mode]/page'

describe('[mode] route', () => {
  it('generateStaticParams returns exactly the three modes', () => {
    expect(generateStaticParams()).toEqual([
      { mode: 'satire' },
      { mode: 'critique' },
      { mode: 'analysis' },
    ])
  })

  it('triggers notFound for an unknown mode slug', () => {
    expect(() => ArticlePage({ params: { mode: 'bogus' } })).toThrow(
      'NEXT_NOT_FOUND',
    )
  })

  it.each(['satire', 'critique', 'analysis'])(
    'does not call notFound for valid mode "%s"',
    (mode) => {
      expect(() => ArticlePage({ params: { mode } })).not.toThrow()
    },
  )
})
