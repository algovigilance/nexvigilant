/* masthead.jsx — Edition strip, mode badge, nameplate wordmark, compound rule.
   Exports: EditionStrip, ModeBadge, Nameplate, CompoundRule */

function ModeBadge({ cfg }) {
  return (
    <span className="nv-badge" style={{ '--badge-field': cfg.badge.field }}>
      {cfg.badge.label}
    </span>
  );
}

function EditionStrip({ cfg, article }) {
  const issueId = `${cfg.issuePrefix}-${article.issueNo}`;
  return (
    <div className="nv-edition">
      <ModeBadge cfg={cfg} />
      <div className="nv-edition__meta">
        <span>Vol.&nbsp;{article.vol}</span>
        <span className="nv-edition__sep">·</span>
        <span>No.&nbsp;{article.issueNo}</span>
        <span className="nv-edition__sep">·</span>
        <span>Est.&nbsp;2026</span>
        <span className="nv-edition__sep">·</span>
        <span>{article.price}</span>
      </div>
      <span className="nv-edition__spacer" />
      <span className="nv-mono" style={{ fontSize: '0.66rem', letterSpacing: '0.04em' }}>{issueId}</span>
    </div>
  );
}

/* The "NexVigilant" master nameplate plus the per-mode imprint line.
   The wordmark sets the imprint name; NexVigilant signs the house above it. */
function Nameplate({ cfg, flag = false }) {
  return (
    <header className={'nv-nameplate' + (flag ? ' nv-nameplate--flag' : '')}>
      <div className="nv-nameplate__kicker">NexVigilant&nbsp;·&nbsp;An imprint of The Vigilant Press</div>
      <h1 className="nv-wordmark" aria-label={cfg.imprint}>
        {renderImprint(cfg.imprint)}
      </h1>
      <div className="nv-nameplate__tagline">{cfg.tagline}</div>
    </header>
  );
}

/* Italicize the distinguishing noun of each imprint in the accent color */
function renderImprint(name) {
  const parts = name.split(' ');
  const last = parts.pop();
  return (
    <React.Fragment>
      {parts.join(' ')} <em>{last}</em>
    </React.Fragment>
  );
}

function CompoundRule() {
  return (
    <div className="nv-compound-rule" role="separator" aria-hidden="true">
      <div className="nv-compound-rule__accent" />
      <div className="nv-compound-rule__hair" />
    </div>
  );
}

Object.assign(window, { ModeBadge, EditionStrip, Nameplate, CompoundRule });
