/* ============================================================================
   modes.js — The mode configuration matrix (single source of truth).
   One lookup, keyed by `mode`, governs accent, badge, disclaimer, imprint and
   apparatus. Modes are THEMING, not three designs: the same components render
   all three; only the values below change. (NV-PUB-SPEC-001 §7)
   ========================================================================== */

window.NV_MODES = {
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
    tagline: 'Reading the warning label so you don\u2019t have to',
    accent: 'var(--nv-ink)',
    badge: { label: 'CRITIQUE', field: 'var(--nv-ink)' },
    schema: 'OpinionNewsArticle + ClaimReview',
    disclaimer:
      'Assessment of publicly available materials; reflects the author\u2019s reasoned opinion, not statements of fact. Quotation limited and attributed for criticism and review.',
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
};

/* ---- Per-mode article copy ------------------------------------------------
   Distinct pieces share ONE layout system. The design does not change between
   modes — only accent, badge, disclaimer, nameplate and the pull-quote form. */

window.NV_ARTICLES = {
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
    author: { name: 'Margaret A. Voss', role: 'Pipeline Correspondent', creds: 'Special to The Serial Vigilant', hedcut: 'assets/hedcut-1.png' },
    body: [
      'The pharmaceutical concern Velmora Therapeutics on Thursday unveiled what executives described as the most patient-centered innovation in the company\u2019s history: a once-daily tablet engineered specifically to manage the adverse events produced by its flagship product.',
      'The new compound, branded Reliexa, addresses the nausea, insomnia and \u201Cgeneralized sense of unease\u201D commonly reported by patients taking the company\u2019s blockbuster therapy Cardivance \u2014 a drug that itself treats a condition the company helped name in 2019.',
      '\u201COur patients told us they wanted to stay on Cardivance,\u201D said chief commercial officer Dale Pruitt, addressing investors from a stage flanked by two enormous pie charts. \u201CThey just didn\u2019t want to feel the way Cardivance makes them feel. Reliexa lets them have both.\u201D',
      'Wall Street responded warmly. Shares rose four percent on the announcement, with one analyst noting that the therapy \u201Celegantly converts a churn problem into a recurring revenue opportunity.\u201D The same analyst declined to estimate how many additional compounds might eventually be required to manage the side effects of Reliexa.',
      'Company materials describe the regimen as a \u201Ccare continuum,\u201D a phrase that appears forty-one times in the eighteen-page launch deck and is trademarked in three jurisdictions.',
      'Internally, the project carried the working name \u201COuroboros,\u201D after the ancient symbol of a serpent consuming its own tail. A spokesperson confirmed the name was retired after focus groups found it \u201Cdirectionally accurate but tonally concerning.\u201D',
      'Reliexa\u2019s own label lists eleven potential adverse reactions, including a recurrence of the original symptoms Cardivance was prescribed to treat. Executives characterized this as \u201Cthe market telling us where to innovate next.\u201D',
      'Prescribing guidance recommends that patients experiencing side effects from Reliexa consult their physician, who may, at their discretion, prescribe Cardivance.',
    ],
    subhead: 'A continuum of care, and of billing',
    pull: {
      quote: 'We don\u2019t see side effects. We see an underserved indication.',
      attribution: 'Dale Pruitt, Chief Commercial Officer, Velmora Therapeutics',
    },
  },
  analysis: {
    section: 'Clinical Evidence',
    subtag: 'Oncology',
    headline:
      'Does the new GLP-pathway oncology claim hold up? The trial data tells a narrower story',
    dek:
      'A widely shared press release credits the compound with a \u201C40% survival benefit.\u201D We trace the figure to its source table and find a relative reduction in a secondary endpoint, measured against a comparator arm few clinicians would choose.',
    issueNo: '0096',
    vol: 'III',
    dateISO: '2026-05-27',
    dateHuman: 'May 27, 2026',
    price: 'Evidence-weighted',
    author: { name: 'Dr. Anil Kothari', role: 'Senior Analyst, Clinical Evidence', creds: 'MD, MPH', hedcut: 'assets/hedcut-2.png' },
    body: [
      'A press release issued last week reported that the investigational therapy demonstrated a \u201C40% survival benefit\u201D in a phase II trial. The figure traveled quickly across investor channels and trade press, frequently shortened to the claim that the drug \u201Ccut deaths by 40 percent.\u201D',
      'The number is real. What it measures is the contested part. The 40% refers to a relative reduction in a hazard ratio for progression-free survival \u2014 a secondary endpoint \u2014 not overall survival, and not an absolute difference in deaths.',
      'In absolute terms, the trial reported a median progression-free survival of 8.1 months in the treatment arm versus 5.9 months in the comparator. The difference is real and not trivial; it is also a different statement than the one the release implied.',
      'The comparator arm matters as much as the headline. Patients in the control group received a regimen that has not been a preferred first-line standard in this indication since 2021, which tends to widen any observed benefit relative to current practice.',
      'None of this makes the compound ineffective. It makes the press release\u2019s framing more favorable than the underlying table supports \u2014 a gap that disappears the moment one reads the endpoint definitions rather than the summary.',
      'We reached the trial\u2019s registration record and the conference abstract; both are consistent with the narrower reading. The sponsor did not dispute the figures when we described our reading prior to publication.',
      'The appropriate reader takeaway is conditional: a measurable benefit on a secondary endpoint, against a weak comparator, awaiting overall-survival data and peer review.',
      'Until that data matures, the strongest defensible claim is the modest one \u2014 which is also the one the release chose not to lead with.',
    ],
    subhead: 'Tracing the number to its table',
    pull: {
      claim: 'A 40% survival benefit in patients treated with the investigational therapy.',
      cite: 'Veridian Oncology, press release, May 19 2026',
      scores: [
        { label: 'Evidence quality', value: 58 },
        { label: 'Source credibility', value: 41 },
      ],
      tags: ['Secondary endpoint', 'Weak comparator'],
    },
  },
  critique: {
    section: 'Marketing & Claims',
    subtag: 'Direct-to-consumer',
    headline:
      'The \u201Cclinically proven\u201D wellness supplement is neither clinical nor proven',
    dek:
      'This is an opinion piece, and it begins from a thesis: the campaign\u2019s central phrase is engineered to borrow the authority of evidence it does not possess. The label is the argument.',
    issueNo: '0231',
    vol: 'VII',
    dateISO: '2026-05-25',
    dateHuman: 'May 25, 2026',
    price: 'Warning enclosed',
    author: { name: 'Dr. Anil Kothari', role: 'Senior Analyst, Marketing & Claims', creds: 'MD, MPH', hedcut: 'assets/hedcut-3.png' },
    body: [
      'The phrase \u201Cclinically proven\u201D does a great deal of work in modern wellness marketing, and almost none of it is the work a reader assumes. It implies a controlled trial, a measured outcome, and a standard of proof. The campaign under discussion supplies none of these, and that is the point.',
      'The cited study is real in the narrow sense that a document exists. It is an eight-week, open-label observation of twenty-two participants, funded by the manufacturer, with no control group and a self-reported primary outcome.',
      'An open-label design with self-reported outcomes and no control is the precise configuration in which the placebo response is largest and least distinguishable from a true effect. \u201CProven\u201D is not a word this design can earn.',
      'The advertisement\u2019s asterisk leads to a footnote, and the footnote leads to a sentence acknowledging that the statements have not been evaluated by any regulator. The disclosure is present; it is simply set in the smallest type the layout permits.',
      'This is the mechanism worth naming: the campaign does not lie outright. It assembles true-ish fragments into a false impression, then relies on a disclaimer to absorb the liability the impression creates.',
      'The supplement may be harmless. The claim is not, because the claim is what transfers unearned authority from the apparatus of science to a bottle that never entered it.',
      'A fair reader, shown the study alongside the slogan, would not describe the result as proof. The campaign is built so that the fair reader never sees them together.',
      'Stripped of its borrowed authority, the honest version of the claim is unremarkable: some people who took it reported feeling better over eight weeks. That sentence does not sell, which is why it is not the one on the box.',
    ],
    subhead: 'What the asterisk is hiding',
    pull: {
      claim: 'Clinically proven to improve energy and focus in just eight weeks.*',
      cite: 'Product landing page, asterisk linking to manufacturer-funded study',
      scores: [
        { label: 'Evidence quality', value: 19 },
        { label: 'Source credibility', value: 27 },
      ],
      tags: ['Open-label', 'Conflict of interest'],
    },
  },
};
