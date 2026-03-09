import { describe, expect, it, vi } from 'vitest';
import { buildExportName } from '../src/lib/fileNames';

describe('buildExportName', () => {
  it('normalizes the base name and adds a date stamp', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-09T00:00:00Z'));
    expect(buildExportName('Quarterly Deck', 'merged', 'pdf')).toBe('quarterly-deck-merged-20260309.pdf');
    vi.useRealTimers();
  });
});
