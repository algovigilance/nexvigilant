import type { PullData, ModeConfig } from '@/lib/modes'

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

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="nv-score">
      <div className="nv-score__value">
        {value}
        <span className="nv-score__max">/100</span>
      </div>
      <div className="nv-score__label">{label}</div>
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
  scores: { label: string; value: number }[]
  tags: string[]
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
        <div className="nv-evidence__tags">
          {tags.map((t) => (
            <span className="nv-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
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
