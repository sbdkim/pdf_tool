export function UploadPanel({
  onFiles,
  onClear
}: {
  onFiles: (files: FileList | null) => void;
  onClear: () => void;
}) {
  return (
    <section className="panel upload-panel">
      <div>
        <p className="eyebrow">Upload</p>
        <h2>Add PDFs to your workspace</h2>
        <p className="muted">Files stay local. Duplicate uploads are allowed, but flagged for clarity.</p>
      </div>
      <div className="action-row">
        <label className="button button-primary">
          Add PDFs
          <input hidden accept="application/pdf,.pdf" multiple onChange={(event) => onFiles(event.target.files)} type="file" />
        </label>
        <button className="button button-secondary" onClick={onClear} type="button">
          Reset workspace
        </button>
      </div>
    </section>
  );
}
