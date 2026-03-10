export function MarketingHeader() {
  return (
    <header className="workspace-topbar">
      <div className="brand-block">
        <a className="brand" href="/">
          PDF Foundry
        </a>
        <p>Local PDF cleanup for merge, split, reorder, rotate, and export.</p>
      </div>
      <nav className="workspace-nav">
        <a href="/">Home</a>
        <a href="/faq.html">FAQ</a>
        <a href="/privacy.html">Privacy</a>
        <a href="https://github.com/sbdkim/pdf_tool/issues" rel="noreferrer" target="_blank">
          Support
        </a>
      </nav>
    </header>
  );
}
