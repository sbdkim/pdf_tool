import type { ExportMode } from '../types';

export function WorkspaceToolbar(props: {
  exportMode: ExportMode;
  rangeText: string;
  activePageCount: number;
  selectedCount: number;
  busyMessage: string | null;
  exportError: string | null;
  onModeChange: (mode: ExportMode) => void;
  onRangeTextChange: (value: string) => void;
  onExport: () => void;
  onBulkRotate: (delta: number) => void;
  onBulkDeleteToggle: () => void;
  onSelectAll: () => void;
}) {
  const {
    exportMode,
    rangeText,
    activePageCount,
    selectedCount,
    busyMessage,
    exportError,
    onModeChange,
    onRangeTextChange,
    onExport,
    onBulkRotate,
    onBulkDeleteToggle,
    onSelectAll
  } = props;

  return (
    <div className="toolbar-layout">
      <section className="panel toolbar-panel">
        <div className="section-heading">
          <div>
            <h2>2. Review and edit pages</h2>
            <p>Select multiple pages for bulk actions, then fine-tune individual pages in the grid.</p>
          </div>
          <div className="stats-row">
            <span>{activePageCount} active</span>
            <span>{selectedCount} selected</span>
          </div>
        </div>
        <div className="bulk-actions">
          <button className="button button-secondary" onClick={onSelectAll} type="button">
            Select all active
          </button>
          <button className="button button-secondary" onClick={() => onBulkRotate(-90)} type="button">
            Rotate selected left
          </button>
          <button className="button button-secondary" onClick={() => onBulkRotate(90)} type="button">
            Rotate selected right
          </button>
          <button className="button button-secondary" onClick={onBulkDeleteToggle} type="button">
            Toggle delete selected
          </button>
        </div>
      </section>
      <section className="panel export-panel">
        <div className="section-heading">
          <div>
            <h2>3. Choose export</h2>
            <p>Pick how the current active pages should be packaged for download.</p>
          </div>
        </div>
        <div className="toolbar-grid">
          <label>
            Export mode
            <select onChange={(event) => onModeChange(event.target.value as ExportMode)} value={exportMode}>
              <option value="merge">Merge into one PDF</option>
              <option value="split-single">One PDF per page</option>
              <option value="split-ranges">Custom page ranges in a ZIP</option>
            </select>
          </label>
          <label className={exportMode === 'split-ranges' ? '' : 'is-muted'}>
            Page ranges
            <input
              disabled={exportMode !== 'split-ranges'}
              onChange={(event) => onRangeTextChange(event.target.value)}
              placeholder="1-3, 4-6"
              value={rangeText}
            />
          </label>
          {exportMode === 'split-ranges' ? (
            <p className="form-hint">Use commas to separate groups. Example: 1-3, 4-6, 9-10</p>
          ) : null}
          {exportError ? <p className="form-error">{exportError}</p> : null}
          {busyMessage ? <p className="form-hint">{busyMessage}</p> : null}
          <button
            className="button button-primary export-button"
            disabled={Boolean(busyMessage) || Boolean(exportError)}
            onClick={onExport}
            type="button"
          >
            {busyMessage ? 'Preparing download...' : '4. Download result'}
          </button>
        </div>
      </section>
    </div>
  );
}
