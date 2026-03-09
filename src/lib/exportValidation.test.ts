import { describe, expect, it } from 'vitest';
import { validateExportJob } from './exportValidation';
import type { PdfPageItem } from '../types';

const activePage: PdfPageItem = {
  id: 'page-1',
  sourceId: 'source-1',
  sourceName: 'doc-a',
  sourcePageIndex: 0,
  rotation: 0,
  deleted: false,
  selected: false,
  thumbnailUrl: null,
  thumbnailState: 'ready'
};

describe('validateExportJob', () => {
  it('requires active pages before export', () => {
    expect(validateExportJob('merge', [], '1-2')).toBe('Add at least one active page before exporting.');
  });

  it('validates split ranges against active page count', () => {
    expect(validateExportJob('split-ranges', [activePage], '3-4')).toBe(
      '"3-4" exceeds the 1 available page.'
    );
  });

  it('accepts a valid merge export', () => {
    expect(validateExportJob('merge', [activePage], '1-2')).toBeNull();
  });
});
