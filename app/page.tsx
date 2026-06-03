import type { Metadata } from 'next'
import { HOUSE, MODE_ORDER } from '@/lib/modes'
import { FrontMasthead, ImprintSection } from '@/components/front'
import { buildSiteLd, serializeJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: HOUSE.wordmark,
  description: `${HOUSE.credit} — satire, critique and analysis from three imprints.`,
}

// IA(resolved): the root is The Vigilant Press cover — one house surface that
// surfaces the three imprint sections (SPEC-001 §2), not a mixed feed. This
// supersedes the prior placeholder 307 → /satire redirect.
export default function Home() {
  return (
    <main className="nv nv-front">
      {/* SPEC-005 §5: a single minimal WebSite node — no CollectionPage/ItemList
          until a real article index with stable URLs exists. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildSiteLd()) }}
      />
      <div className="nv-shell">
        <FrontMasthead />
      </div>
      <div className="nv-shell">
        <div className="nv-front__grid">
          {MODE_ORDER.map((mode) => (
            <ImprintSection key={mode} mode={mode} />
          ))}
        </div>
      </div>
    </main>
  )
}
