import type { PdfPageItem } from '../types';

export function getActivePages(pages: PdfPageItem[]): PdfPageItem[] {
  return pages.filter((page) => !page.deleted);
}

export function reorderPages(
  pages: PdfPageItem[],
  fromPageId: string,
  toPageId: string
): PdfPageItem[] {
  const fromIndex = pages.findIndex((page) => page.id === fromPageId);
  const toIndex = pages.findIndex((page) => page.id === toPageId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return pages;
  }

  const nextPages = [...pages];
  const [movedPage] = nextPages.splice(fromIndex, 1);
  nextPages.splice(toIndex, 0, movedPage);
  return nextPages;
}

export function movePageByOffset(
  pages: PdfPageItem[],
  pageId: string,
  offset: number
): PdfPageItem[] {
  const index = pages.findIndex((page) => page.id === pageId);
  const targetIndex = index + offset;

  if (index < 0 || targetIndex < 0 || targetIndex >= pages.length) {
    return pages;
  }

  return reorderPages(pages, pageId, pages[targetIndex].id);
}
