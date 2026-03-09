import { startTransition, useMemo, useState } from 'react';
import { HeroPanel } from './components/HeroPanel';
import { MarketingHeader } from './components/MarketingHeader';
import { ToastRegion } from './components/ToastRegion';
import { ToolStatusGrid } from './components/ToolStatusGrid';
import { UploadPanel } from './components/UploadPanel';
import { WorkspaceGrid } from './components/WorkspaceGrid';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { useWorkspace } from './hooks/useWorkspace';
import { trackEvent } from './lib/analytics';
import { validateExportJob } from './lib/exportValidation';
import { buildExportName } from './lib/fileNames';
import { getActivePages, movePageByOffset, reorderPages } from './lib/pageState';
import { parsePageRanges } from './lib/ranges';
import type { PdfPageItem, PdfSource } from './types';

export default function App() {
  const [draggedPageId, setDraggedPageId] = useState<string | null>(null);
  const {
    sources,
    setSources,
    pages,
    setPages,
    exportMode,
    setExportMode,
    rangeText,
    setRangeText,
    busyMessage,
    setBusyMessage,
    toasts,
    pushToast,
    dismissToast,
    resetWorkspace
  } = useWorkspace();

  const activePages = useMemo(() => getActivePages(pages), [pages]);
  const selectedPages = useMemo(() => pages.filter((page) => page.selected), [pages]);

  async function handleFiles(fileList: FileList | null) {
    const selectedFiles = Array.from(fileList ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    setBusyMessage(`Preparing ${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'}...`);
    const nextSources: PdfSource[] = [];
    const nextPages: PdfPageItem[] = [];

    for (const file of selectedFiles) {
      if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
        pushToast(`${file.name} was skipped because it is not a PDF.`, 'error');
        continue;
      }

      const duplicate = sources.some(
        (source) => source.name === file.name.replace(/\.pdf$/i, '') && source.fileSize === file.size
      );
      if (duplicate) {
        pushToast(`${file.name} looks like a duplicate upload. Keeping it anyway.`, 'info');
      }

      try {
        setBusyMessage(`Loading ${file.name}...`);
        const pdfModule = await import('./lib/pdf');
        const loaded = await pdfModule.loadPdfFile(file);
        nextSources.push(loaded.source);
        nextPages.push(...loaded.pages);
        loaded.warnings.forEach((warning) => pushToast(warning, 'info'));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown parsing error';
        pushToast(`${file.name} could not be loaded: ${message}`, 'error');
      }
    }

    startTransition(() => {
      setSources((current) => [...current, ...nextSources]);
      setPages((current) => [...current, ...nextPages]);
      setBusyMessage(null);
    });

    if (nextSources.length > 0) {
      trackEvent('files_added', { count: String(nextSources.length) });
      pushToast(
        `${nextSources.length} file${nextSources.length === 1 ? '' : 's'} added to the workspace.`,
        'success'
      );
    }
  }

  function togglePageSelection(pageId: string) {
    setPages((current) =>
      current.map((page) => (page.id === pageId ? { ...page, selected: !page.selected } : page))
    );
  }

  function toggleDelete(pageId: string) {
    setPages((current) =>
      current.map((page) => (page.id === pageId ? { ...page, deleted: !page.deleted } : page))
    );
  }

  function rotatePage(pageId: string, delta: number) {
    setPages((current) =>
      current.map((page) =>
        page.id === pageId ? { ...page, rotation: (page.rotation + delta + 360) % 360 } : page
      )
    );
  }

  function movePage(pageId: string, offset: number) {
    setPages((current) => movePageByOffset(current, pageId, offset));
  }

  function selectAllActive() {
    setPages((current) => current.map((page) => ({ ...page, selected: !page.deleted })));
  }

  function rotateSelected(delta: number) {
    if (selectedPages.length === 0) {
      pushToast('Select one or more pages first.', 'info');
      return;
    }

    setPages((current) =>
      current.map((page) =>
        page.selected ? { ...page, rotation: (page.rotation + delta + 360) % 360 } : page
      )
    );
  }

  function toggleDeleteSelected() {
    if (selectedPages.length === 0) {
      pushToast('Select one or more pages first.', 'info');
      return;
    }

    setPages((current) =>
      current.map((page) => (page.selected ? { ...page, deleted: !page.deleted } : page))
    );
  }

  function resetWithConfirmation() {
    if (pages.length > 0 && !window.confirm('Clear the current workspace and remove all loaded files?')) {
      return;
    }

    resetWorkspace();
    pushToast('Workspace reset.', 'success');
  }

  function onDrop(targetPageId: string) {
    if (!draggedPageId) {
      return;
    }

    setPages((current) => reorderPages(current, draggedPageId, targetPageId));
    setDraggedPageId(null);
  }

  async function exportWorkspace() {
    const validationError = validateExportJob(exportMode, pages, rangeText);
    if (validationError) {
      pushToast(validationError, 'error');
      return;
    }

    const baseName = sources[0]?.name ? `${sources[0].name}-workspace` : 'pdf-foundry';

    try {
      setBusyMessage('Preparing export...');
      const pdfModule = await import('./lib/pdf');

      if (exportMode === 'merge') {
        const blob = await pdfModule.exportMergedPdf(sources, activePages);
        pdfModule.downloadBlob(blob, buildExportName(baseName, 'merged', 'pdf'));
      } else if (exportMode === 'split-single') {
        const blob = await pdfModule.exportSplitZipByPages(sources, activePages, baseName);
        pdfModule.downloadBlob(blob, buildExportName(baseName, 'split-pages', 'zip'));
      } else {
        const parsed = parsePageRanges(rangeText, activePages.length);
        if (!parsed.ok) {
          throw new Error(parsed.error ?? 'Invalid ranges.');
        }
        const blob = await pdfModule.exportSplitZipByRanges(sources, activePages, parsed.ranges, baseName);
        pdfModule.downloadBlob(blob, buildExportName(baseName, 'split-ranges', 'zip'));
      }

      trackEvent('export_complete', { mode: exportMode });
      pushToast('Export is ready.', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown export error';
      pushToast(`Export failed: ${message}`, 'error');
    } finally {
      setBusyMessage(null);
    }
  }

  return (
    <div className="workspace-shell">
      <MarketingHeader />
      <main className="workspace-main">
        <HeroPanel />
        <ToolStatusGrid />
        <UploadPanel onClear={resetWithConfirmation} onFiles={handleFiles} />
        <WorkspaceToolbar
          activePageCount={activePages.length}
          busyMessage={busyMessage}
          exportMode={exportMode}
          onBulkDeleteToggle={toggleDeleteSelected}
          onBulkRotate={rotateSelected}
          onExport={exportWorkspace}
          onModeChange={setExportMode}
          onRangeTextChange={setRangeText}
          onSelectAll={selectAllActive}
          rangeText={rangeText}
          selectedCount={selectedPages.length}
        />
        <WorkspaceGrid
          onDeleteToggle={toggleDelete}
          onDragStart={setDraggedPageId}
          onDrop={onDrop}
          onMove={movePage}
          onRotate={rotatePage}
          onSelectToggle={togglePageSelection}
          pages={pages}
        />
      </main>
      <ToastRegion messages={toasts} onDismiss={dismissToast} />
    </div>
  );
}
