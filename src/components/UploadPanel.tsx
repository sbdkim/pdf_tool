import type { WorkspaceNotice } from '../hooks/useWorkspace';

export function UploadPanel({
  activePageCount,
  busyMessage,
  notices,
  onFiles,
  onClear,
  onDismissNotice,
  sourceCount,
  totalPageCount
}: {
  activePageCount: number;
  busyMessage: string | null;
  notices: WorkspaceNotice[];
  onFiles: (files: FileList | null) => void;
  onClear: () => void;
  onDismissNotice: (id: string) => void;
  sourceCount: number;
  totalPageCount: number;
}) {
  return (
    <section className="panel upload-panel">
      <div className="section-heading">
        <div>
          <h2>1. Add PDFs</h2>
          <p>Start with one file or combine several. Everything stays in your browser.</p>
        </div>
        <div className="upload-summary" aria-label="Upload summary">
          <span>{sourceCount} files loaded</span>
          <span>{totalPageCount} pages total</span>
          <span>{activePageCount} pages active</span>
        </div>
      </div>
      <div className="upload-actions">
        <label className="button button-primary">
          Choose PDF files
          <input hidden accept="application/pdf,.pdf" multiple onChange={(event) => onFiles(event.target.files)} type="file" />
        </label>
        <button className="button button-secondary" onClick={onClear} type="button">
          Reset workspace
        </button>
      </div>
      <div className="upload-guidance">
        <p>After upload, pages appear below in the order they will export.</p>
        <p>Use selection, rotate, move, and delete controls before downloading the final result.</p>
      </div>
      {busyMessage ? <div className="inline-status">{busyMessage}</div> : null}
      {notices.length > 0 ? (
        <div className="notice-list" aria-label="Upload notices">
          {notices.map((notice) => (
            <div className={`notice notice-${notice.tone}`} key={notice.id}>
              <span>{notice.text}</span>
              <button onClick={() => onDismissNotice(notice.id)} type="button">
                Dismiss
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
