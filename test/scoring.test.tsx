import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { EvidentiaryQuote } from '@/components/quotes'
import { NV_MODES, getArticles, featuredArticle, MODE_ORDER, scoreBand } from '@/lib/modes'

// SPEC-003 v1.1 §6 controlled vocabulary (bias/fallacy taxonomy). Conflict-of-interest
// was removed in v1.1 — it is an Instrument-A source-credibility finding, never a tag.
const TAG_VOCAB = new Set([
  // cognitive biases
  'Confirmation', 'Availability', 'Anchoring', 'Survivorship', 'Cherry-picking',
  // fallacies
  'Ad hominem', 'Straw man', 'False dichotomy', 'Appeal to authority (misused)',
  'Correlation≠causation', 'Unfalsifiable', 'Appeal to emotion', 'False urgency',
  'Hasty generalization',
])

describe('SPEC-003 §5 — scoreBand', () => {
  it.each([
    [100, 'High'], [81, 'High'],
    [80, 'Substantial'], [61, 'Substantial'],
    [60, 'Mixed / caution'], [41, 'Mixed / caution'],
    [40, 'Low'], [21, 'Low'],
    [20, 'Not credible / unsupported'], [0, 'Not credible / unsupported'],
  ] as const)('maps %i → %s', (value, band) => {
    expect(scoreBand(value)).toBe(band)
  })
})

describe('SPEC-003 data conformance', () => {
  it('§G4 — no satire article carries scores or tags (every one stays editorial)', () => {
    for (const a of getArticles('satire')) {
      expect(a.pull.kind).toBe('satirical')
    }
  })

  it.each(['critique', 'analysis'] as const)(
    '%s carries the two evidentiary axes, each with reasoning (§G1 no naked numbers)',
    (mode) => {
      const pull = featuredArticle(mode).pull
      expect(pull.kind).toBe('evidentiary')
      if (pull.kind !== 'evidentiary') return
      const labels = pull.scores.map((s) => s.label)
      expect(labels).toContain('Evidence quality')
      expect(labels).toContain('Source credibility')
      for (const s of pull.scores) {
        expect(s.value).toBeGreaterThanOrEqual(0)
        expect(s.value).toBeLessThanOrEqual(100)
        expect(s.reasoning.trim().length).toBeGreaterThan(0)
      }
    },
  )

  it.each(['critique', 'analysis'] as const)(
    '%s tags come from the §6 controlled vocabulary, each with a trigger',
    (mode) => {
      const pull = featuredArticle(mode).pull
      if (pull.kind !== 'evidentiary') throw new Error('expected evidentiary')
      expect(pull.tags.length).toBeGreaterThan(0)
      for (const t of pull.tags) {
        expect(TAG_VOCAB.has(t.name)).toBe(true)
        expect(t.trigger.trim().length).toBeGreaterThan(0)
      }
    },
  )
})

describe('SPEC-003 rendering — band + tag triggers are visible', () => {
  it.each(['critique', 'analysis'] as const)(
    '%s scorecard renders the band label and every tag trigger',
    (mode) => {
      const pull = featuredArticle(mode).pull
      if (pull.kind !== 'evidentiary') throw new Error('expected evidentiary')
      const html = renderToStaticMarkup(
        <EvidentiaryQuote
          claim={pull.claim}
          cite={pull.cite}
          scores={pull.scores}
          tags={pull.tags}
        />,
      )
      // each score's derived band shows on-page (§5 / §G1)
      for (const s of pull.scores) {
        expect(html).toContain(scoreBand(s.value))
      }
      // each tag shows name + its one-line trigger (§6)
      for (const t of pull.tags) {
        expect(html).toContain(t.name)
        expect(html).toContain(t.trigger)
      }
    },
  )

  it('canonical mode order is unchanged (satire → critique → analysis)', () => {
    expect(MODE_ORDER).toEqual(['satire', 'critique', 'analysis'])
    expect(Object.keys(NV_MODES)).toEqual(['satire', 'critique', 'analysis'])
  })
})
