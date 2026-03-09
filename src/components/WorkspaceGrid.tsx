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
        <h2>Drop in a couple of PDFs to begin.</h2>
        <p>Your workspace will show thumbnails, selection tools, and export options as soon as files are loaded.</p>
      </section>
    );
  }

  return (
    <section className="workspace-grid">
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
    </section>
  );
}
