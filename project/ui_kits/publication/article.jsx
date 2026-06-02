/* article.jsx — Article header (kicker/headline/dek), byline w/ hedcut,
   two-column drop-cap body, inline figure.
   Exports: ArticleHeader, Byline, Hedcut, ArticleBody, Figure */

function ArticleHeader({ cfg, article }) {
  return (
    <div className="nv-article-header">
      <div className="nv-kicker">
        {article.section}
        <span className="nv-kicker__sub">&nbsp;·&nbsp;{cfg.badge.label.charAt(0) + cfg.badge.label.slice(1).toLowerCase()}</span>
      </div>
      <h1>{article.headline}</h1>
      <p className="nv-dek">{article.dek}</p>
    </div>
  );
}

function Hedcut({ src, name }) {
  return <img className="nv-hedcut" src={src} alt={`Stipple portrait of ${name}`} width="56" height="56" />;
}

function Byline({ article }) {
  const a = article.author;
  return (
    <div className="nv-byline">
      <Hedcut src={a.hedcut} name={a.name} />
      <div className="nv-byline__text">
        <span className="nv-byline__name">
          By {a.name}
          {a.creds ? <span className="nv-byline__creds">,&nbsp;{a.creds}</span> : null}
        </span>
        <span className="nv-byline__role">{a.role}</span>
        <span className="nv-byline__date">
          <time dateTime={article.dateISO}>{article.dateHuman}</time>
        </span>
      </div>
    </div>
  );
}

/* Body renders paragraphs with an <h2> subhead inserted mid-stream, plus the
   pull quote (form chosen by mode) and a figure. children = injected blocks. */
function ArticleBody({ article, pullQuote, figure }) {
  const paras = article.body;
  const midpoint = Math.ceil(paras.length / 2);
  return (
    <article className="nv-body">
      {paras.map((p, i) => (
        <React.Fragment key={i}>
          <p>{p}</p>
          {i === 1 && figure}
          {i === midpoint - 1 ? <h2>{article.subhead}</h2> : null}
          {i === midpoint ? pullQuote : null}
        </React.Fragment>
      ))}
    </article>
  );
}

/* Inline figure — flat placeholder (no generated imagery); supply real art in
   production. Demonstrates <figure>/<figcaption> + required alt. */
function Figure({ caption, credit, alt }) {
  return (
    <figure className="nv-figure">
      <div
        role="img"
        aria-label={alt}
        style={{
          aspectRatio: '16 / 9',
          background:
            'repeating-linear-gradient(135deg, var(--nv-newsprint-deep) 0 11px, #efe8d8 11px 22px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 0 0 1px var(--nv-rule)',
        }}
      >
        <span style={{
          fontFamily: 'var(--nv-sans)', fontSize: '0.66rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--nv-sepia)',
          background: 'var(--nv-newsprint)', padding: '0.4rem 0.8rem',
          boxShadow: 'inset 0 0 0 1px var(--nv-rule)',
        }}>
          Figure — supply art
        </span>
      </div>
      <figcaption>
        {caption}{credit ? <React.Fragment> <span className="nv-mono" style={{ fontSize: '0.66rem' }}>{credit}</span></React.Fragment> : null}
      </figcaption>
    </figure>
  );
}

Object.assign(window, { ArticleHeader, Byline, Hedcut, ArticleBody, Figure });
