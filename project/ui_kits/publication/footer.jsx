/* footer.jsx — mode-dependent footer + related rail.
   Exports: ArticleFooter, RelatedRail */

function ArticleFooter({ cfg, article }) {
  const issueId = `${cfg.issuePrefix}-${article.issueNo}`;
  return (
    <footer className="nv-footer">
      <div className="nv-footer__house">NexVigilant</div>
      <div className="nv-footer__tagline">Empowerment Through Vigilance</div>
      <div className="nv-footer__meta">
        {cfg.imprint.toUpperCase()} · {issueId} · VOL.&nbsp;{article.vol} · {article.dateHuman.toUpperCase()} · {cfg.schema}
      </div>
      <p className="nv-footer__disclaimer">{cfg.disclaimer}</p>
    </footer>
  );
}

const RELATED = [
  { kicker: 'Regulatory', head: 'FDA approves first drug whose only studied benefit is shareholder confidence' },
  { kicker: 'Clinical Evidence', head: 'Re-reading a \u201Cgroundbreaking\u201D meta-analysis that pooled eleven studies it should not have' },
  { kicker: 'Marketing & Claims', head: 'The footnote economy: how disclaimers became the load-bearing wall of wellness ads' },
];

function RelatedRail() {
  return (
    <section className="nv-related" aria-label="Related coverage">
      <div className="nv-related__title">More from the desk</div>
      <div className="nv-related__grid">
        {RELATED.map((r, i) => (
          <a className="nv-related__item" href="#" key={i} onClick={(e) => e.preventDefault()}>
            <div className="nv-related__kicker">{r.kicker}</div>
            <div className="nv-related__head">{r.head}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { ArticleFooter, RelatedRail });
