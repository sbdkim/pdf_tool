import type { ExportMode } from '../types';

export function WorkspaceToolbar(props: {
  exportMode: ExportMode;
  rangeText: string;
  activePageCount: number;
  selectedCount: number;
  busyMessage: string | null;
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
    onModeChange,
    onRangeTextChange,
    onExport,
    onBulkRotate,
    onBulkDeleteToggle,
    onSelectAll
  } = props;

  return (
    <section className="panel toolbar-panel">
      <div className="toolbar-header">
        <div>
          <p className="eyebrow">Workspace controls</p>
          <h2>Organize before export</h2>
        </div>
        <div className="stats-row">
          <span>{activePageCount} active pages</span>
          <span>{selectedCount} selected</span>
        </div>
      </div>
      <div className="toolbar-grid">
        <label>
          Export mode
          <select onChange={(event) => onModeChange(event.target.value as ExportMode)} value={exportMode}>
            <option value="merge">Merge into one PDF</option>
            <option value="split-single">Split into one PDF per page</option>
            <option value="split-ranges">Split into custom ranges</option>
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
        <div className="action-row">
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
          <button className="button button-primary" disabled={Boolean(busyMessage)} onClick={onExport} type="button">
            {busyMessage ? 'Working...' : 'Export'}
          </button>
        </div>
      </div>
    </section>
  );
}
