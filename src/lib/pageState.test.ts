import { describe, expect, it } from 'vitest';
import { getActivePages, reorderPages } from './pageState';
import type { PdfPageItem } from '../types';

const pages: PdfPageItem[] = [
  {
    id: 'a',
    sourceId: 'source-1',
  sourceName: 'doc-a',
  sourcePageIndex: 0,
  rotation: 0,
  deleted: false,
  selected: false,
  thumbnailUrl: null,
  thumbnailState: 'ready'
},
  {
    id: 'b',
    sourceId: 'source-1',
  sourceName: 'doc-a',
  sourcePageIndex: 1,
  rotation: 0,
  deleted: true,
  selected: false,
  thumbnailUrl: null,
  thumbnailState: 'ready'
},
  {
    id: 'c',
    sourceId: 'source-2',
  sourceName: 'doc-b',
  sourcePageIndex: 0,
  rotation: 90,
  deleted: false,
  selected: true,
  thumbnailUrl: null,
  thumbnailState: 'ready'
  }
];

describe('pageState helpers', () => {
  it('filters deleted pages from the active list', () => {
    expect(getActivePages(pages).map((page) => page.id)).toEqual(['a', 'c']);
  });

  it('reorders items by page id', () => {
    expect(reorderPages(pages, 'c', 'a').map((page) => page.id)).toEqual(['c', 'a', 'b']);
  });
});
