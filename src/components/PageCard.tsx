import type { PdfPageItem } from '../types';

export function PageCard(props: {
  page: PdfPageItem;
  workspaceIndex: number;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onSelectToggle: (pageId: string) => void;
  onRotate: (pageId: string, delta: number) => void;
  onDeleteToggle: (pageId: string) => void;
  onMove: (pageId: string, offset: number) => void;
  onDragStart: (pageId: string) => void;
  onDrop: (pageId: string) => void;
}) {
  const {
    page,
    workspaceIndex,
    canMoveLeft,
    canMoveRight,
    onSelectToggle,
    onRotate,
    onDeleteToggle,
    onMove,
    onDragStart,
    onDrop
  } = props;

  return (
    <article
      className={`page-card${page.deleted ? ' is-deleted' : ''}${page.selected ? ' is-selected' : ''}`}
      draggable
      onDragOver={(event) => event.preventDefault()}
      onDragStart={() => onDragStart(page.id)}
      onDrop={() => onDrop(page.id)}
    >
      <div className="page-card-header">
        <div className="page-meta">
          <span className="page-index">Page {workspaceIndex + 1}</span>
          <span className="drag-handle" title="Drag to reorder">
            Drag
          </span>
        </div>
        <label className="checkbox">
          <input checked={page.selected} onChange={() => onSelectToggle(page.id)} type="checkbox" />
          Select
        </label>
      </div>
      <div className="page-preview">
        {page.thumbnailUrl ? (
          <img alt={`${page.sourceName} page ${page.sourcePageIndex + 1}`} src={page.thumbnailUrl} />
        ) : (
          <span className="page-preview-empty">Preview unavailable</span>
        )}
      </div>
      <div className="page-content">
        <h3>{page.sourceName}</h3>
        <p>{`Source page ${page.sourcePageIndex + 1} · Rotation ${page.rotation}deg`}</p>
        {page.deleted ? <p className="page-state">Marked for removal from export</p> : null}
      </div>
      <div className="page-actions">
        <button disabled={!canMoveLeft} onClick={() => onMove(page.id, -1)} type="button">
          Move earlier
        </button>
        <button disabled={!canMoveRight} onClick={() => onMove(page.id, 1)} type="button">
          Move later
        </button>
        <button onClick={() => onRotate(page.id, -90)} type="button">
          Rotate -90deg
        </button>
        <button onClick={() => onRotate(page.id, 90)} type="button">
          Rotate +90deg
        </button>
        <button onClick={() => onDeleteToggle(page.id)} type="button">
          {page.deleted ? 'Restore' : 'Delete'}
        </button>
      </div>
    </article>
  );
}
