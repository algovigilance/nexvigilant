import type { ModeConfig, Article } from '@/lib/modes'
import { RELATED_ITEMS } from '@/lib/modes'
import Link from 'next/link'

export function ArticleFooter({
  cfg,
  article,
}: {
  cfg: ModeConfig
  article: Article
}) {
  const issueId = `${cfg.issuePrefix}-${article.issueNo}`
  return (
    <footer className="nv-footer">
      <div className="nv-footer__house">NexVigilant</div>
      <div className="nv-footer__tagline">Empowerment Through Vigilance</div>
      <div className="nv-footer__meta">
        {cfg.imprint.toUpperCase()} · {issueId} · VOL.&nbsp;{article.vol} ·{' '}
        {article.dateHuman.toUpperCase()} · {cfg.schema}
      </div>
      <p className="nv-footer__disclaimer">{cfg.disclaimer}</p>
    </footer>
  )
}

export function RelatedRail() {
  return (
    <section className="nv-related" aria-label="Related coverage">
      <div className="nv-related__title">More from the desk</div>
      <div className="nv-related__grid">
        {RELATED_ITEMS.map((r, i) => (
          <Link className="nv-related__item" href="#" key={i}>
            <div className="nv-related__kicker">{r.kicker}</div>
            <div className="nv-related__head">{r.head}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
