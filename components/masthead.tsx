import type { ModeConfig, Article, Mode } from '@/lib/modes'
import Link from 'next/link'

export function ModeBadge({ cfg }: { cfg: ModeConfig }) {
  return (
    <span
      className="nv-badge"
      style={{ '--badge-field': cfg.badge.field } as React.CSSProperties}
    >
      {cfg.badge.label}
    </span>
  )
}

export function ModeNav({ current }: { current: Mode }) {
  const modes: Mode[] = ['satire', 'critique', 'analysis']
  return (
    <nav className="nv-mode-nav" aria-label="Publication modes">
      {modes.map((m) => (
        <Link
          key={m}
          href={`/${m}`}
          aria-current={current === m ? 'page' : undefined}
        >
          {m}
        </Link>
      ))}
    </nav>
  )
}

export function EditionStrip({ cfg, article }: { cfg: ModeConfig; article: Article }) {
  const issueId = `${cfg.issuePrefix}-${article.issueNo}`
  return (
    <div className="nv-edition">
      <ModeBadge cfg={cfg} />
      <div className="nv-edition__meta">
        <span>Vol.&nbsp;{article.vol}</span>
        <span className="nv-edition__sep">·</span>
        <span>No.&nbsp;{article.issueNo}</span>
        <span className="nv-edition__sep">·</span>
        <span>Est.&nbsp;2026</span>
        <span className="nv-edition__sep">·</span>
        <span>{article.price}</span>
      </div>
      <span className="nv-edition__spacer" />
      <span className="nv-mono" style={{ fontSize: '0.66rem', letterSpacing: '0.04em', fontFamily: 'var(--nv-mono)' }}>
        {issueId}
      </span>
    </div>
  )
}

export function Nameplate({ cfg, flag = false }: { cfg: ModeConfig; flag?: boolean }) {
  const parts = cfg.imprint.split(' ')
  const last = parts.pop()!
  return (
    <header className={`nv-nameplate${flag ? ' nv-nameplate--flag' : ''}`}>
      <div className="nv-nameplate__kicker">
        NexVigilant&nbsp;·&nbsp;An imprint of The Vigilant Press
      </div>
      <h1 className="nv-wordmark" aria-label={cfg.imprint}>
        {parts.join(' ')} <em>{last}</em>
      </h1>
      <div className="nv-nameplate__tagline">{cfg.tagline}</div>
    </header>
  )
}

export function CompoundRule() {
  return (
    <div className="nv-compound-rule" role="separator" aria-hidden="true">
      <div className="nv-compound-rule__accent" />
      <div className="nv-compound-rule__hair" />
    </div>
  )
}
