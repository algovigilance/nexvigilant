/* app.jsx — composes the full article page and the demo mode switcher.
   Modes are theming: switching mode flips data-mode (accent), badge, nameplate,
   pull-quote form and disclaimer — the layout itself never changes. */

const { useState } = React;

function ModeSwitcher({ mode, onChange }) {
  const modes = ['satire', 'critique', 'analysis'];
  return (
    <div className="kit-toolbar">
      <span className="kit-toolbar__label">NexVigilant · Article</span>
      <span style={{ opacity: 0.55, fontStyle: 'italic', fontFamily: 'var(--nv-serif)' }}>
        One system, three registers — only the accent, badge &amp; disclaimer change.
      </span>
      <div className="kit-segmented" role="group" aria-label="View mode">
        {modes.map((m) => (
          <button
            key={m}
            aria-pressed={mode === m}
            onClick={() => onChange(m)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

function ArticlePage({ mode }) {
  const cfg = window.NV_MODES[mode];
  const article = window.NV_ARTICLES[mode];
  const flag = mode === 'satire'; // Serial Vigilant may use a Press-Navy field

  return (
    <div className="nv nv-page" data-mode={mode} data-screen-label="Article">
      <div className="nv-shell">
        <EditionStrip cfg={cfg} article={article} />
      </div>
      <div className={flag ? '' : 'nv-shell'}>
        {flag ? (
          <div className="nv-nameplate--flag">
            <div className="nv-shell" style={{ padding: 0 }}>
              <Nameplate cfg={cfg} flag />
            </div>
          </div>
        ) : (
          <Nameplate cfg={cfg} />
        )}
      </div>
      <div className="nv-shell">
        <CompoundRule />
        <ArticleHeader cfg={cfg} article={article} />
        <Byline article={article} />
        <ArticleBody
          article={article}
          figure={<Figure
            alt="Placeholder for an editorial illustration accompanying the article."
            caption="Editorial illustration accompanies the piece in production."
            credit="ART — TK"
          />}
          pullQuote={<PullQuoteForMode cfg={cfg} article={article} />}
        />
        <ArticleFooter cfg={cfg} article={article} />
      </div>
      <div className="nv-shell">
        <RelatedRail />
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState('satire');
  return (
    <React.Fragment>
      <ModeSwitcher mode={mode} onChange={setMode} />
      <ArticlePage mode={mode} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
