import { describe, expect, it } from 'vitest';
import { parsePageRanges } from './ranges';

describe('parsePageRanges', () => {
  it('parses simple and explicit ranges', () => {
    expect(parsePageRanges('1-3, 5, 7-8', 8)).toEqual({
      ok: true,
      ranges: [
        { start: 1, end: 3 },
        { start: 5, end: 5 },
        { start: 7, end: 8 }
      ]
    });
  });

  it('rejects out-of-bounds ranges', () => {
    expect(parsePageRanges('2-6', 4)).toEqual({
      ok: false,
      ranges: [],
      error: '"2-6" exceeds the 4 available pages.'
    });
  });
});
