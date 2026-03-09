export type ThumbnailState = 'idle' | 'loading' | 'ready' | 'error';

export interface PdfSource {
  id: string;
  name: string;
  bytes: Uint8Array;
  pageCount: number;
  originalRotations: number[];
  fileSize: number;
}

export interface PdfPageItem {
  id: string;
  sourceId: string;
  sourceName: string;
  sourcePageIndex: number;
  rotation: number;
  deleted: boolean;
  selected: boolean;
  thumbnailUrl: string | null;
  thumbnailState: ThumbnailState;
}

export type ExportMode = 'merge' | 'split-ranges' | 'split-single';

export interface ExportJob {
  mode: ExportMode;
  rangesText?: string;
}

export interface PageRange {
  start: number;
  end: number;
}
