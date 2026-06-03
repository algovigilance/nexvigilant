import type { Mode, ModeConfig } from '@/lib/modes'
import { HOUSE, NV_MODES, NV_ARTICLES } from '@/lib/modes'

// Badge rendered inline (not imported from masthead) so the front page's module
// graph stays free of next/link — keeps `/` at the zero-client-JS baseline. The
// label/field still come from NV_MODES (cfg.badge); same .nv-badge CSS contract.
function ModeBadge({ cfg }: { cfg: ModeConfig }) {
  return (
    <span
      className="nv-badge"
      style={{ '--badge-field': cfg.badge.field } as React.CSSProperties}
    >
      {cfg.badge.label}
    </span>
  )
}

// Italicize the distinguishing last word of an imprint in the accent color —
// same CSS contract as the route nameplate (.nv-wordmark em / .nv-imprint__name em).
function ImprintMark({ name }: { name: string }) {
  const parts = name.split(' ')
  const last = parts.pop()!
  return (
    <>
      {parts.join(' ')} <em>{last}</em>
    </>
  )
}

// The Vigilant Press cover wordmark. h1 of the front page; string lives in the
// HOUSE constant (single source of truth), never hardcoded here.
export function FrontMasthead() {
  return (
    <header className="nv-front-masthead">
      <div className="nv-front-masthead__credit">{HOUSE.credit}</div>
      <h1 className="nv-wordmark nv-front-masthead__wordmark">{HOUSE.wordmark}</h1>
      <div className="nv-nameplate__tagline">{HOUSE.tagline}</div>
    </header>
  )
}

// One imprint column on the cover: themed by data-mode, badge + nameplate-mark
// (h2) + accent rule, then the mode's teaser (h3 headline + dek) linking to
// /[mode]. All copy is read from NV_MODES / NV_ARTICLES.
export function ImprintSection({ mode }: { mode: Mode }) {
  const cfg = NV_MODES[mode]
  const article = NV_ARTICLES[mode]
  const href = `/${mode}`
  return (
    <section className="nv-imprint" data-mode={mode} aria-label={cfg.imprint}>
      <div className="nv-imprint__head">
        <ModeBadge cfg={cfg} />
        <h2 className="nv-imprint__name">
          <ImprintMark name={cfg.imprint} />
        </h2>
        <p className="nv-imprint__tagline">{cfg.tagline}</p>
      </div>
      <div className="nv-imprint__rule" aria-hidden="true" />
      <article className="nv-teaser">
        <div className="nv-kicker">{article.section}</div>
        <h3 className="nv-teaser__head">
          <a href={href}>{article.headline}</a>
        </h3>
        <p className="nv-dek nv-teaser__dek">{article.dek}</p>
        <a className="nv-teaser__more" href={href}>
          Read in {cfg.imprint} →
        </a>
      </article>
    </section>
  )
}
