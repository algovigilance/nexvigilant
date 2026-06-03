import type { PullData, ModeConfig, Tag } from '@/lib/modes'
import { scoreBand } from '@/lib/modes'

export function PullQuote({
  quote,
  attribution,
}: {
  quote: string
  attribution?: string
}) {
  return (
    <figure className="nv-pullquote">
      <div className="nv-pullquote__rule" aria-hidden="true" />
      <blockquote>{quote}</blockquote>
      {attribution ? <figcaption>{attribution}</figcaption> : null}
    </figure>
  )
}

// SPEC-001 §4.b "unit of scrutiny" / §8 + SPEC-003 §G1 "no naked numbers": each
// dimension score renders WITH its band (§5), label and a one-line derivation —
// never as a bare figure. The band is derived from the value (scoreBand), so the
// number and its band cannot drift.
function Score({
  label,
  value,
  reasoning,
}: {
  label: string
  value: number
  reasoning: string
}) {
  const band = scoreBand(value)
  return (
    <div className="nv-score">
      <div className="nv-score__value">
        {value}
        <span className="nv-score__max">/100</span>
      </div>
      <div className="nv-score__detail">
        <div className="nv-score__label">
          {label} <span className="nv-score__band">· {band}</span>
        </div>
        <p className="nv-score__reasoning">{reasoning}</p>
      </div>
    </div>
  )
}

export function EvidentiaryQuote({
  claim,
  cite,
  scores,
  tags,
}: {
  claim: string
  cite: string
  scores: { label: string; value: number; reasoning: string }[]
  tags: Tag[]
}) {
  return (
    <figure className="nv-evidence">
      <div className="nv-evidence__label">Claim under review</div>
      <blockquote>{claim}</blockquote>
      <cite>{cite}</cite>
      <div className="nv-evidence__scores">
        {scores.map((s) => (
          <Score key={s.label} {...s} />
        ))}
      </div>
      {tags.length > 0 ? (
        <div className="nv-evidence__tags">
          {tags.map((t) => (
            <span className="nv-tag" key={t.name}>
              <span className="nv-tag__name">{t.name}</span>
              <span className="nv-tag__trigger">{t.trigger}</span>
            </span>
          ))}
        </div>
      ) : null}
    </figure>
  )
}

export function PullQuoteForMode({
  cfg,
  pull,
}: {
  cfg: ModeConfig
  pull: PullData
}) {
  if (pull.kind === 'evidentiary') {
    return (
      <EvidentiaryQuote
        claim={pull.claim}
        cite={pull.cite}
        scores={pull.scores}
        tags={pull.tags}
      />
    )
  }
  return <PullQuote quote={pull.quote} attribution={pull.attribution} />
}
