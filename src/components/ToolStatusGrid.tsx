const liveTools = ['Merge PDFs', 'Split by range', 'Split to pages', 'Rotate pages', 'Reorder pages', 'Delete pages'];
const plannedTools = ['Compress', 'Convert formats', 'OCR', 'Webpage to PDF', 'Watermark', 'Compare PDFs'];

export function ToolStatusGrid() {
  return (
    <section className="status-grid">
      <article className="panel">
        <p className="eyebrow">Available now</p>
        <h2>Core launch suite</h2>
        <div className="chip-wrap">
          {liveTools.map((tool) => (
            <span className="chip chip-live" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </article>
      <article className="panel">
        <p className="eyebrow">Planned</p>
        <h2>Next wave</h2>
        <div className="chip-wrap">
          {plannedTools.map((tool) => (
            <span className="chip chip-planned" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
