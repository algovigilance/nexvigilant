import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { NV_MODES, getArticles, type Mode } from '@/lib/modes'
import { ModeNav, Nameplate, CompoundRule } from '@/components/masthead'
import { ModeIndex } from '@/components/mode-index'
import { buildModeIndexLd, serializeJsonLd } from '@/lib/jsonld'

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
  return {
    title: `${cfg.imprint} — ${cfg.tagline}`,
    description: cfg.tagline,
  }
}

// The imprint index at /[mode]: the masthead nameplate over the mode's article list.
// SPEC-005 §5/§7.1: emits a CollectionPage + ItemList (a real index now exists).
export default function ModeIndexPage({
  params,
}: {
  params: { mode: string }
}) {
  const mode = params.mode as Mode
  if (!VALID_MODES.includes(mode)) notFound()

  const cfg = NV_MODES[mode]
  const articles = getArticles(mode)
  const isSatire = mode === 'satire'

  return (
    <div className="nv nv-page" data-mode={mode}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildModeIndexLd(mode, articles)) }}
      />
      <ModeNav current={mode} />

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
        <ModeIndex mode={mode} cfg={cfg} articles={articles} />
      </div>
    </div>
  )
}
