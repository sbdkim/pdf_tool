import type { PdfPageItem } from '../types';
import { PageCard } from './PageCard';

export function WorkspaceGrid(props: {
  pages: PdfPageItem[];
  onSelectToggle: (pageId: string) => void;
  onRotate: (pageId: string, delta: number) => void;
  onDeleteToggle: (pageId: string) => void;
  onMove: (pageId: string, offset: number) => void;
  onDragStart: (pageId: string) => void;
  onDrop: (pageId: string) => void;
}) {
  const { pages, onSelectToggle, onRotate, onDeleteToggle, onMove, onDragStart, onDrop } = props;

  if (pages.length === 0) {
    return (
      <section className="panel empty-panel">
        <h2>Pages will appear here after upload.</h2>
        <p>
          Once files are loaded, you can inspect thumbnails, select multiple pages, change order,
          rotate pages, and mark any page for removal before export.
        </p>
      </section>
    );
  }

  return (
    <section className="workspace-grid-section">
      <div className="section-heading">
        <div>
          <h2>Page review</h2>
          <p>The grid below reflects the exact order of the final export.</p>
        </div>
      </div>
      <div className="workspace-grid">
      {pages.map((page, index) => (
        <PageCard
          canMoveLeft={index > 0}
          canMoveRight={index < pages.length - 1}
          key={page.id}
          onDeleteToggle={onDeleteToggle}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onMove={onMove}
          onRotate={onRotate}
          onSelectToggle={onSelectToggle}
          page={page}
          workspaceIndex={index}
        />
      ))}
      </div>
    </section>
  );
}
