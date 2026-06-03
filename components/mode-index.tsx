import type { Mode, ModeConfig, Article } from '@/lib/modes'
import Link from 'next/link'

// The imprint index: an ordered list of the mode's articles, each a teaser linking
// to /[mode]/[slug]. Themed via the data-mode wrapper (inherits the mode accent).
// The page's <h1> is the imprint nameplate, so teaser headlines are <h2>.
export function ModeIndex({
  mode,
  cfg,
  articles,
}: {
  mode: Mode
  cfg: ModeConfig
  articles: Article[]
}) {
  return (
    <section className="nv-index" data-mode={mode} aria-label={`${cfg.imprint} — articles`}>
      <ul className="nv-index__list">
        {articles.map((a) => (
          <li className="nv-index__item" key={a.slug}>
            <article className="nv-teaser">
              <div className="nv-kicker">{a.section}</div>
              <h2 className="nv-teaser__head">
                <Link href={`/${mode}/${a.slug}`}>{a.headline}</Link>
              </h2>
              <p className="nv-dek nv-teaser__dek">{a.dek}</p>
              <span className="nv-teaser__byline">By {a.author.name}</span>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
