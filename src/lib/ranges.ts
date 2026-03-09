import type { PageRange } from '../types';

export interface RangeParseResult {
  ok: boolean;
  ranges: PageRange[];
  error?: string;
}

export function parsePageRanges(input: string, totalPages: number): RangeParseResult {
  if (totalPages <= 0) {
    return { ok: false, ranges: [], error: 'There are no active pages to split.' };
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, ranges: [], error: 'Enter page ranges like 1-3, 4-6.' };
  }

  const parts = trimmed.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { ok: false, ranges: [], error: 'Enter at least one page range.' };
  }

  const ranges: PageRange[] = [];

  for (const part of parts) {
    const match = /^(\d+)(?:-(\d+))?$/.exec(part);
    if (!match) {
      return { ok: false, ranges: [], error: `"${part}" is not a valid range.` };
    }

    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);

    if (start < 1 || end < 1 || start > end) {
      return { ok: false, ranges: [], error: `"${part}" is not a valid ascending range.` };
    }

    if (end > totalPages) {
      return {
        ok: false,
        ranges: [],
        error: `"${part}" exceeds the ${totalPages} available page${totalPages === 1 ? '' : 's'}.`
      };
    }

    ranges.push({ start, end });
  }

  return { ok: true, ranges };
}
