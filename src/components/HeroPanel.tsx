export function HeroPanel({
  activePageCount,
  selectedCount,
  sourceCount
}: {
  activePageCount: number;
  selectedCount: number;
  sourceCount: number;
}) {
  return (
    <section className="workspace-intro panel">
      <div className="workspace-intro-copy">
        <p className="section-label">Northline PDF</p>
        <h1>Organize the exact PDF you want, locally.</h1>
        <p>
          Add one or more PDFs, review every page in order, make quick edits, and export the final
          result without sending documents to a server.
        </p>
      </div>
      <dl className="workspace-intro-stats" aria-label="Workspace summary">
        <div>
          <dt>Files</dt>
          <dd>{sourceCount}</dd>
        </div>
        <div>
          <dt>Active pages</dt>
          <dd>{activePageCount}</dd>
        </div>
        <div>
          <dt>Selected</dt>
          <dd>{selectedCount}</dd>
        </div>
      </dl>
    </section>
  );
}
