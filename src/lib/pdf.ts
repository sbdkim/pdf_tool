import JSZip from 'jszip';
import { degrees, PDFDocument } from 'pdf-lib';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { PageRange, PdfPageItem, PdfSource } from '../types';

GlobalWorkerOptions.workerSrc = workerSrc;

type SourceLookup = Map<string, PdfSource>;

function ensurePdfExtension(name: string): string {
  return name.toLowerCase().endsWith('.pdf') ? name : `${name}.pdf`;
}

function toMap(sources: PdfSource[]): SourceLookup {
  return new Map(sources.map((source) => [source.id, source]));
}

export async function renderThumbnails(bytes: Uint8Array, pageCount: number): Promise<string[]> {
  const loadingTask = getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const thumbnails: string[] = [];

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 0.32 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas rendering is not available in this browser.');
    }

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    thumbnails.push(canvas.toDataURL('image/png'));
  }

  await pdf.destroy();
  return thumbnails;
}

export async function loadPdfFile(
  file: File
): Promise<{ source: PdfSource; pages: PdfPageItem[]; warnings: string[] }> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const exportBytes = Uint8Array.from(bytes);
  const previewBytes = Uint8Array.from(bytes);
  const pdf = await PDFDocument.load(exportBytes);
  const pageCount = pdf.getPageCount();
  const sourceId = `source-${crypto.randomUUID()}`;
  const originalRotations = pdf.getPages().map((page) => page.getRotation().angle);
  const warnings: string[] = [];

  if (file.size > 25 * 1024 * 1024) {
    warnings.push(`${file.name} is large, so preview generation and export may take longer.`);
  }

  const thumbnails = await renderThumbnails(previewBytes, pageCount);
  const sourceName = file.name.replace(/\.pdf$/i, '');

  return {
    source: {
      id: sourceId,
      name: sourceName,
      bytes: exportBytes,
      pageCount,
      originalRotations,
      fileSize: file.size
    },
    warnings,
    pages: thumbnails.map((thumbnailUrl, pageIndex) => ({
      id: `page-${crypto.randomUUID()}`,
      sourceId,
      sourceName,
      sourcePageIndex: pageIndex,
      rotation: 0,
      deleted: false,
      selected: false,
      thumbnailUrl,
      thumbnailState: 'ready'
    }))
  };
}

async function getLoadedSourceDocs(sources: PdfSource[]): Promise<Map<string, PDFDocument>> {
  const entries = await Promise.all(
    sources.map(async (source) => [source.id, await PDFDocument.load(source.bytes)] as const)
  );
  return new Map(entries);
}

async function appendPagesToDocument(
  output: PDFDocument,
  selectedPages: PdfPageItem[],
  sourceDocs: Map<string, PDFDocument>,
  sources: SourceLookup
): Promise<void> {
  for (const item of selectedPages) {
    const source = sources.get(item.sourceId);
    const sourceDoc = sourceDocs.get(item.sourceId);

    if (!source || !sourceDoc) {
      throw new Error('A source PDF could not be found for export.');
    }

    const [copiedPage] = await output.copyPages(sourceDoc, [item.sourcePageIndex]);
    const baseRotation = source.originalRotations[item.sourcePageIndex] ?? 0;
    copiedPage.setRotation(degrees((baseRotation + item.rotation + 360) % 360));
    output.addPage(copiedPage);
  }
}

export async function exportMergedPdf(sources: PdfSource[], pages: PdfPageItem[]): Promise<Blob> {
  const sourceDocs = await getLoadedSourceDocs(sources);
  const output = await PDFDocument.create();
  await appendPagesToDocument(output, pages, sourceDocs, toMap(sources));
  const bytes = await output.save();
  const blobBytes = Uint8Array.from(bytes);
  return new Blob([blobBytes], { type: 'application/pdf' });
}

export async function exportSplitZipByPages(
  sources: PdfSource[],
  pages: PdfPageItem[],
  baseName: string
): Promise<Blob> {
  const sourceDocs = await getLoadedSourceDocs(sources);
  const zip = new JSZip();
  const sourceMap = toMap(sources);

  for (const [index, page] of pages.entries()) {
    const output = await PDFDocument.create();
    await appendPagesToDocument(output, [page], sourceDocs, sourceMap);
    const bytes = await output.save();
    zip.file(`${baseName}-page-${index + 1}.pdf`, bytes);
  }

  return zip.generateAsync({ type: 'blob' });
}

export async function exportSplitZipByRanges(
  sources: PdfSource[],
  pages: PdfPageItem[],
  ranges: PageRange[],
  baseName: string
): Promise<Blob> {
  const sourceDocs = await getLoadedSourceDocs(sources);
  const zip = new JSZip();
  const sourceMap = toMap(sources);

  for (const range of ranges) {
    const selection = pages.slice(range.start - 1, range.end);
    const output = await PDFDocument.create();
    await appendPagesToDocument(output, selection, sourceDocs, sourceMap);
    const bytes = await output.save();
    zip.file(`${baseName}-${range.start}-${range.end}.pdf`, bytes);
  }

  return zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, name: string): void {
  const safeName = ensurePdfExtension(name).replace(/\.zip\.pdf$/i, '.zip');
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = safeName;
  anchor.click();
  URL.revokeObjectURL(url);
}
