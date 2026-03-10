import type { ExportMode } from '../types';

function getExportLabel(exportMode: ExportMode): string {
  if (exportMode === 'split-single') {
    return 'One PDF per page';
  }

  if (exportMode === 'split-ranges') {
    return 'ZIP of custom page ranges';
  }

  return 'One merged PDF';
}

export function ToolStatusGrid({
  activePageCount,
  deletedPageCount,
  exportMode,
  sourceCount,
  totalPageCount
}: {
  activePageCount: number;
  deletedPageCount: number;
  exportMode: ExportMode;
  sourceCount: number;
  totalPageCount: number;
}) {
  return (
    <section className="status-strip" aria-label="Workspace details">
      <article className="panel status-panel">
        <h2>Loaded workspace</h2>
        <p>
          {sourceCount} file{sourceCount === 1 ? '' : 's'} and {totalPageCount} total page
          {totalPageCount === 1 ? '' : 's'} are currently in this session.
        </p>
      </article>
      <article className="panel status-panel">
        <h2>Pages ready to export</h2>
        <p>
          {activePageCount} active and {deletedPageCount} removed. Deleted pages stay here until
          you restore them or reset the workspace.
        </p>
      </article>
      <article className="panel status-panel">
        <h2>Current output</h2>
        <p>{getExportLabel(exportMode)}</p>
      </article>
    </section>
  );
}
