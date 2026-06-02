/* quotes.jsx — the two pull-quote forms.
   (a) PullQuote      — plain editorial pull quote (satire & general)
   (b) EvidentiaryQuote — claim under scrutiny + <cite> + scorecard + tags
   Exports: PullQuote, EvidentiaryQuote, PullQuoteForMode */

function PullQuote({ quote, attribution }) {
  return (
    <figure className="nv-pullquote">
      <div className="nv-pullquote__rule" aria-hidden="true" />
      <blockquote>{quote}</blockquote>
      {attribution ? <figcaption>{attribution}</figcaption> : null}
    </figure>
  );
}

function Score({ label, value }) {
  return (
    <div className="nv-score">
      <div className="nv-score__value">
        {value}<span className="nv-score__max">/100</span>
      </div>
      <div className="nv-score__label">{label}</div>
    </div>
  );
}

/* The unit of scrutiny. A score never appears as a naked number — it sits with
   its dimension label and the claim + source it derives from. */
function EvidentiaryQuote({ claim, cite, scores, tags }) {
  return (
    <figure className="nv-evidence">
      <div className="nv-evidence__label">Claim under review</div>
      <blockquote>{claim}</blockquote>
      <cite>{cite}</cite>
      <div className="nv-evidence__scores">
        {scores.map((s) => <Score key={s.label} {...s} />)}
        <div className="nv-evidence__tags">
          {tags.map((t) => <span className="nv-tag" key={t}>{t}</span>)}
        </div>
      </div>
    </figure>
  );
}

/* Pick the correct form for the mode. Satire = invented self-incriminating
   quote; critique/analysis = evidentiary claim with apparatus. */
function PullQuoteForMode({ cfg, article }) {
  if (cfg.pullQuoteKind === 'evidentiary') {
    return <EvidentiaryQuote {...article.pull} />;
  }
  return <PullQuote quote={article.pull.quote} attribution={article.pull.attribution} />;
}

Object.assign(window, { PullQuote, EvidentiaryQuote, PullQuoteForMode, Score });
