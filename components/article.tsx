import type { ModeConfig, Article } from '@/lib/modes'
import Image from 'next/image'

export function ArticleHeader({ cfg, article }: { cfg: ModeConfig; article: Article }) {
  const modeLabel =
    cfg.badge.label.charAt(0) + cfg.badge.label.slice(1).toLowerCase()
  return (
    <div className="nv-article-header">
      <div className="nv-kicker">
        {article.section}
        <span className="nv-kicker__sub">&nbsp;·&nbsp;{modeLabel}</span>
      </div>
      <h1>{article.headline}</h1>
      <p className="nv-dek">{article.dek}</p>
    </div>
  )
}

export function Hedcut({ src, name }: { src: string; name: string }) {
  return (
    <Image
      className="nv-hedcut"
      src={src}
      alt={`Stipple portrait of ${name}`}
      width={56}
      height={56}
    />
  )
}

export function Byline({ article }: { article: Article }) {
  const a = article.author
  return (
    <div className="nv-byline">
      <Hedcut src={a.hedcut} name={a.name} />
      <div className="nv-byline__text">
        <span className="nv-byline__name">
          By {a.name}
          {a.creds ? (
            <span className="nv-byline__creds">,&nbsp;{a.creds}</span>
          ) : null}
        </span>
        <span className="nv-byline__role">{a.role}</span>
        <span className="nv-byline__date">
          <time dateTime={article.dateISO}>{article.dateHuman}</time>
        </span>
      </div>
    </div>
  )
}

export function ArticleFigure({
  caption,
  credit,
  alt,
}: {
  caption: string
  credit?: string
  alt: string
}) {
  return (
    <figure className="nv-figure">
      <div
        role="img"
        aria-label={alt}
        style={{
          aspectRatio: '16 / 9',
          background:
            'repeating-linear-gradient(135deg, var(--nv-newsprint-deep) 0 11px, #efe8d8 11px 22px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 0 0 1px var(--nv-rule)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--nv-sans)',
            fontSize: '0.66rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--nv-sepia)',
            background: 'var(--nv-newsprint)',
            padding: '0.4rem 0.8rem',
            boxShadow: 'inset 0 0 0 1px var(--nv-rule)',
          }}
        >
          Figure — supply art
        </span>
      </div>
      <figcaption>
        {caption}
        {credit ? (
          <>
            {' '}
            <span
              style={{ fontFamily: 'var(--nv-mono)', fontSize: '0.66rem' }}
            >
              {credit}
            </span>
          </>
        ) : null}
      </figcaption>
    </figure>
  )
}
