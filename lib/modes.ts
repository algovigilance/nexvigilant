export type Mode = 'satire' | 'critique' | 'analysis'

export interface ModeBadge {
  label: string
  field: string
}

export interface ModeConfig {
  mode: Mode
  imprint: string
  tagline: string
  accent: string
  badge: ModeBadge
  schema: string
  disclaimer: string
  issuePrefix: string
  pullQuoteKind: 'satirical' | 'evidentiary'
}

export interface Author {
  name: string
  role: string
  creds: string
  hedcut: string
}

export interface ScoreItem {
  label: string
  value: number
  // SPEC-001 §4.b/§8: a score never renders as a naked number — its derivation
  // must be visible. One-line reasoning per dimension.
  // TODO(SPEC-003): values + reasoning are illustrative until the scoring rubric lands.
  reasoning: string
}

export type PullData =
  | { kind: 'satirical'; quote: string; attribution: string }
  | { kind: 'evidentiary'; claim: string; cite: string; scores: ScoreItem[]; tags: string[] }

export interface Article {
  section: string
  subtag: string
  headline: string
  dek: string
  issueNo: string
  vol: string
  dateISO: string
  dateHuman: string
  price: string
  author: Author
  body: string[]
  subhead: string
  pull: PullData
}

export const NV_MODES: Record<Mode, ModeConfig> = {
  satire: {
    mode: 'satire',
    imprint: 'The Serial Vigilant',
    tagline: 'Tabloid vigilance for the credulous age',
    accent: 'var(--nv-accent-red)',
    badge: { label: 'SATIRE', field: 'var(--nv-accent-red)' },
    schema: 'NewsArticle + satire:true',
    disclaimer:
      'Content may be fabricated for illustrative purposes; no real persons. Any resemblance to actual entities, living or dead, is coincidental.',
    issuePrefix: 'NV-SV',
    pullQuoteKind: 'satirical',
  },
  critique: {
    mode: 'critique',
    imprint: 'The Black Box',
    tagline: 'Reading the warning label so you don’t have to',
    accent: 'var(--nv-ink)',
    badge: { label: 'CRITIQUE', field: 'var(--nv-ink)' },
    schema: 'OpinionNewsArticle + ClaimReview',
    disclaimer:
      'Assessment of publicly available materials; reflects the author’s reasoned opinion, not statements of fact. Quotation limited and attributed for criticism and review.',
    issuePrefix: 'NV-BB',
    pullQuoteKind: 'evidentiary',
  },
  analysis: {
    mode: 'analysis',
    imprint: 'The Signal',
    tagline: 'Evidence before verdict',
    accent: 'var(--nv-signal-blue)',
    badge: { label: 'ANALYSIS', field: 'var(--nv-signal-blue)' },
    schema: 'AnalysisNewsArticle + ClaimReview',
    disclaimer:
      'Evidence-based assessment of publicly available materials; reflects reasoned analysis, not statements of fact. Source credibility is annotated separately from evidence quality.',
    issuePrefix: 'NV-SIG',
    pullQuoteKind: 'evidentiary',
  },
}

export const NV_ARTICLES: Record<Mode, Article> = {
  satire: {
    section: 'Drug Development',
    subtag: 'Pipeline',
    headline:
      'Pharma giant announces breakthrough drug that treats the side effects of its other drugs',
    dek:
      'Analysts hailed the vertically integrated therapy as a landmark in shareholder value, noting that patients can now remain on the original compound indefinitely without the inconvenience of stopping.',
    issueNo: '0417',
    vol: 'XII',
    dateISO: '2026-05-29',
    dateHuman: 'May 29, 2026',
    price: 'Two doses · complimentary',
    author: {
      name: 'Margaret A. Voss',
      role: 'Pipeline Correspondent',
      creds: 'Special to The Serial Vigilant',
      hedcut: '/assets/hedcut-1.png',
    },
    body: [
      'The pharmaceutical concern Velmora Therapeutics on Thursday unveiled what executives described as the most patient-centered innovation in the company’s history: a once-daily tablet engineered specifically to manage the adverse events produced by its flagship product.',
      'The new compound, branded Reliexa, addresses the nausea, insomnia and “generalized sense of unease” commonly reported by patients taking the company’s blockbuster therapy Cardivance — a drug that itself treats a condition the company helped name in 2019.',
      '“Our patients told us they wanted to stay on Cardivance,” said chief commercial officer Dale Pruitt, addressing investors from a stage flanked by two enormous pie charts. “They just didn’t want to feel the way Cardivance makes them feel. Reliexa lets them have both.”',
      'Wall Street responded warmly. Shares rose four percent on the announcement, with one analyst noting that the therapy “elegantly converts a churn problem into a recurring revenue opportunity.” The same analyst declined to estimate how many additional compounds might eventually be required to manage the side effects of Reliexa.',
      'Company materials describe the regimen as a “care continuum,” a phrase that appears forty-one times in the eighteen-page launch deck and is trademarked in three jurisdictions.',
      'Internally, the project carried the working name “Ouroboros,” after the ancient symbol of a serpent consuming its own tail. A spokesperson confirmed the name was retired after focus groups found it “directionally accurate but tonally concerning.”',
      'Reliexa’s own label lists eleven potential adverse reactions, including a recurrence of the original symptoms Cardivance was prescribed to treat. Executives characterized this as “the market telling us where to innovate next.”',
      'Prescribing guidance recommends that patients experiencing side effects from Reliexa consult their physician, who may, at their discretion, prescribe Cardivance.',
    ],
    subhead: 'A continuum of care, and of billing',
    pull: {
      kind: 'satirical',
      quote: 'We don’t see side effects. We see an underserved indication.',
      attribution: 'Dale Pruitt, Chief Commercial Officer, Velmora Therapeutics',
    },
  },
  analysis: {
    section: 'Clinical Evidence',
    subtag: 'Oncology',
    headline:
      'Does the new oncology drug’s survival claim hold up? The trial data tells a narrower story',
    dek:
      'A widely shared press release credits the compound with a “40% survival benefit.” We trace the figure to its source table and find a relative reduction in a secondary endpoint, measured against a comparator arm few clinicians would choose.',
    issueNo: '0096',
    vol: 'III',
    dateISO: '2026-05-27',
    dateHuman: 'May 27, 2026',
    price: 'Evidence-weighted',
    author: {
      name: 'Dr. Anil Kothari',
      role: 'Senior Analyst, Clinical Evidence',
      creds: 'MD, MPH',
      hedcut: '/assets/hedcut-2.png',
    },
    body: [
      'A press release issued last week reported that the investigational therapy demonstrated a “40% survival benefit” in a phase II trial. The figure traveled quickly across investor channels and trade press, frequently shortened to the claim that the drug “cut deaths by 40 percent.”',
      'The number is real. What it measures is the contested part. The 40% refers to a relative reduction in a hazard ratio for progression-free survival — a secondary endpoint — not overall survival, and not an absolute difference in deaths.',
      'In absolute terms, the trial reported a median progression-free survival of 8.1 months in the treatment arm versus 5.9 months in the comparator. The difference is real and not trivial; it is also a different statement than the one the release implied.',
      'The comparator arm matters as much as the headline. Patients in the control group received a regimen that has not been a preferred first-line standard in this indication since 2021, which tends to widen any observed benefit relative to current practice.',
      'None of this makes the compound ineffective. It makes the press release’s framing more favorable than the underlying table supports — a gap that disappears the moment one reads the endpoint definitions rather than the summary.',
      'We reached the trial’s registration record and the conference abstract; both are consistent with the narrower reading. The sponsor did not dispute the figures when we described our reading prior to publication.',
      'The appropriate reader takeaway is conditional: a measurable benefit on a secondary endpoint, against a weak comparator, awaiting overall-survival data and peer review.',
      'Until that data matures, the strongest defensible claim is the modest one — which is also the one the release chose not to lead with.',
    ],
    subhead: 'Tracing the number to its table',
    pull: {
      kind: 'evidentiary',
      claim: 'A 40% survival benefit in patients treated with the investigational therapy.',
      cite: 'Veridian Oncology, press release, May 19 2026',
      scores: [
        {
          label: 'Evidence quality',
          value: 58,
          reasoning:
            'Real effect on a secondary endpoint (progression-free, not overall survival); modest in absolute terms — 8.1 vs 5.9 months.',
        },
        {
          label: 'Source credibility',
          value: 41,
          reasoning:
            'Sponsor press release, not peer-reviewed; comparator arm below the current first-line standard.',
        },
      ],
      tags: ['Secondary endpoint', 'Weak comparator'],
    },
  },
  critique: {
    section: 'Marketing & Claims',
    subtag: 'Direct-to-consumer',
    headline:
      'The “clinically proven” wellness supplement is neither clinical nor proven',
    dek:
      'This is an opinion piece, and it begins from a thesis: the campaign’s central phrase is engineered to borrow the authority of evidence it does not possess. The label is the argument.',
    issueNo: '0231',
    vol: 'VII',
    dateISO: '2026-05-25',
    dateHuman: 'May 25, 2026',
    price: 'Warning enclosed',
    author: {
      name: 'Dr. Anil Kothari',
      role: 'Senior Analyst, Marketing & Claims',
      creds: 'MD, MPH',
      hedcut: '/assets/hedcut-3.png',
    },
    body: [
      'The phrase “clinically proven” does a great deal of work in modern wellness marketing, and almost none of it is the work a reader assumes. It implies a controlled trial, a measured outcome, and a standard of proof. The campaign under discussion supplies none of these, and that is the point.',
      'The cited study is real in the narrow sense that a document exists. It is an eight-week, open-label observation of twenty-two participants, funded by the manufacturer, with no control group and a self-reported primary outcome.',
      'An open-label design with self-reported outcomes and no control is the precise configuration in which the placebo response is largest and least distinguishable from a true effect. “Proven” is not a word this design can earn.',
      'The advertisement’s asterisk leads to a footnote, and the footnote leads to a sentence acknowledging that the statements have not been evaluated by any regulator. The disclosure is present; it is simply set in the smallest type the layout permits.',
      'This is the mechanism worth naming: the campaign does not lie outright. It assembles true-ish fragments into a false impression, then relies on a disclaimer to absorb the liability the impression creates.',
      'The supplement may be harmless. The claim is not, because the claim is what transfers unearned authority from the apparatus of science to a bottle that never entered it.',
      'A fair reader, shown the study alongside the slogan, would not describe the result as proof. The campaign is built so that the fair reader never sees them together.',
      'Stripped of its borrowed authority, the honest version of the claim is unremarkable: some people who took it reported feeling better over eight weeks. That sentence does not sell, which is why it is not the one on the box.',
    ],
    subhead: 'What the asterisk is hiding',
    pull: {
      kind: 'evidentiary',
      claim: 'Clinically proven to improve energy and focus in just eight weeks.*',
      cite: 'Product landing page, asterisk linking to manufacturer-funded study',
      scores: [
        {
          label: 'Evidence quality',
          value: 19,
          reasoning:
            'Open-label, n=22, self-reported primary outcome, no control arm — placebo response indistinguishable from effect.',
        },
        {
          label: 'Source credibility',
          value: 27,
          reasoning:
            'Manufacturer-funded, no independent replication; regulatory non-evaluation disclosed only in fine print.',
        },
      ],
      tags: ['Open-label', 'Conflict of interest'],
    },
  },
}

export const RELATED_ITEMS = [
  {
    kicker: 'Regulatory',
    head: 'FDA approves first drug whose only studied benefit is shareholder confidence',
  },
  {
    kicker: 'Clinical Evidence',
    head: 'Re-reading a “groundbreaking” meta-analysis that pooled eleven studies it should not have',
  },
  {
    kicker: 'Marketing & Claims',
    head: 'The footnote economy: how disclaimers became the load-bearing wall of wellness ads',
  },
]
