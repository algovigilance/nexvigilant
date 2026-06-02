import { Fragment } from 'react'
import type { Article, ModeConfig } from '@/lib/modes'
import { ArticleFigure } from './article'
import { PullQuoteForMode } from './quotes'

export function ArticleBody({
  article,
  cfg,
}: {
  article: Article
  cfg: ModeConfig
}) {
  const paras = article.body
  const midpoint = Math.ceil(paras.length / 2)

  return (
    <article className="nv-body">
      {paras.map((p, i) => (
        <Fragment key={i}>
          <p>{p}</p>
          {i === 1 && (
            <ArticleFigure
              alt="Editorial illustration accompanying the article."
              caption="Editorial illustration accompanies the piece in production."
              credit="ART — TK"
            />
          )}
          {i === midpoint - 1 && <h2>{article.subhead}</h2>}
          {i === midpoint && <PullQuoteForMode cfg={cfg} pull={article.pull} />}
        </Fragment>
      ))}
    </article>
  )
}
