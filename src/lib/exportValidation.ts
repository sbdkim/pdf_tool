import { getActivePages } from './pageState';
import { parsePageRanges } from './ranges';
import type { ExportMode, PdfPageItem } from '../types';

export function validateExportJob(
  mode: ExportMode,
  pages: PdfPageItem[],
  rangeText: string
): string | null {
  const activePages = getActivePages(pages);

  if (activePages.length === 0) {
    return 'Add at least one active page before exporting.';
  }

  if (mode === 'split-ranges') {
    const result = parsePageRanges(rangeText, activePages.length);
    if (!result.ok) {
      return result.error ?? 'Invalid page ranges.';
    }
  }

  return null;
}
