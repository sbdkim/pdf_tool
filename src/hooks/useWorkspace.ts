import { useState } from 'react';
import type { ExportMode, PdfPageItem, PdfSource } from '../types';

export interface ToastMessage {
  id: string;
  tone: 'info' | 'success' | 'error';
  text: string;
}

export function useWorkspace() {
  const [sources, setSources] = useState<PdfSource[]>([]);
  const [pages, setPages] = useState<PdfPageItem[]>([]);
  const [exportMode, setExportMode] = useState<ExportMode>('merge');
  const [rangeText, setRangeText] = useState('1-2');
  const [busyMessage, setBusyMessage] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function pushToast(text: string, tone: ToastMessage['tone']) {
    setToasts((current) => [...current, { id: crypto.randomUUID(), tone, text }]);
  }

  function dismissToast(id: string) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function resetWorkspace() {
    setSources([]);
    setPages([]);
    setExportMode('merge');
    setRangeText('1-2');
    setBusyMessage(null);
    setToasts([]);
  }

  return {
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
  };
}
