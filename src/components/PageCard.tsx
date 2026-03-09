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
        <span className="drag-handle" title="Drag to reorder">
          :::
        </span>
        <label className="checkbox">
          <input checked={page.selected} onChange={() => onSelectToggle(page.id)} type="checkbox" />
          Select
        </label>
      </div>
      <div className="page-preview">
        {page.thumbnailUrl ? <img alt={`${page.sourceName} page ${page.sourcePageIndex + 1}`} src={page.thumbnailUrl} /> : <span>Preview unavailable</span>}
      </div>
      <div className="page-content">
        <p className="page-kicker">Workspace page {workspaceIndex + 1}</p>
        <h3>{page.sourceName}</h3>
        <p>
          Original page {page.sourcePageIndex + 1} · Rotation {page.rotation}°
        </p>
      </div>
      <div className="page-actions">
        <button disabled={!canMoveLeft} onClick={() => onMove(page.id, -1)} type="button">
          Move left
        </button>
        <button disabled={!canMoveRight} onClick={() => onMove(page.id, 1)} type="button">
          Move right
        </button>
        <button onClick={() => onRotate(page.id, -90)} type="button">
          Rotate left
        </button>
        <button onClick={() => onRotate(page.id, 90)} type="button">
          Rotate right
        </button>
        <button onClick={() => onDeleteToggle(page.id)} type="button">
          {page.deleted ? 'Restore' : 'Delete'}
        </button>
      </div>
    </article>
  );
}
