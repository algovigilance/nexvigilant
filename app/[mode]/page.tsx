import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { NV_MODES, NV_ARTICLES, type Mode } from '@/lib/modes'
import { ModeNav, EditionStrip, Nameplate, CompoundRule } from '@/components/masthead'
import { ArticleHeader, Byline } from '@/components/article'
import { ArticleBody } from '@/components/article-body'
import { ArticleFooter, RelatedRail } from '@/components/footer'
import { buildArticleLd, serializeJsonLd } from '@/lib/jsonld'

const VALID_MODES: Mode[] = ['satire', 'critique', 'analysis']

export function generateStaticParams() {
  return VALID_MODES.map((mode) => ({ mode }))
}

export async function generateMetadata({
  params,
}: {
  params: { mode: string }
}): Promise<Metadata> {
  const mode = params.mode as Mode
  if (!VALID_MODES.includes(mode)) return {}
  const cfg = NV_MODES[mode]
  const article = NV_ARTICLES[mode]
  return {
    title: `${article.headline} — ${cfg.imprint}`,
    description: article.dek,
  }
}

export default function ArticlePage({
  params,
}: {
  params: { mode: string }
}) {
  const mode = params.mode as Mode
  if (!VALID_MODES.includes(mode)) notFound()

  const cfg = NV_MODES[mode]
  const article = NV_ARTICLES[mode]
  const isSatire = mode === 'satire'

  return (
    <div className="nv nv-page" data-mode={mode}>
      {/* SPEC-005 §2–4: server-emitted JSON-LD. satire → Article + genre:Satire
          (never NewsArticle, zero ClaimReview); critique → OpinionNewsArticle and
          analysis → AnalysisNewsArticle, each with one ClaimReview whose
          reviewRating is the on-page gated Evidence Quality score. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildArticleLd(mode, article)) }}
      />
      <ModeNav current={mode} />

      <div className="nv-shell">
        <EditionStrip cfg={cfg} article={article} />
      </div>

      {isSatire ? (
        <div className="nv-nameplate--flag">
          <div className="nv-shell" style={{ padding: 0 }}>
            <Nameplate cfg={cfg} flag />
          </div>
        </div>
      ) : (
        <div className="nv-shell">
          <Nameplate cfg={cfg} />
        </div>
      )}

      <div className="nv-shell">
        <CompoundRule />
        <ArticleHeader cfg={cfg} article={article} />
        <Byline article={article} />
        <ArticleBody article={article} cfg={cfg} />
        <ArticleFooter cfg={cfg} article={article} />
      </div>

      <div className="nv-shell">
        <RelatedRail />
      </div>
    </div>
  )
}
