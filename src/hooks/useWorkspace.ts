import { useState } from 'react';
import type { ExportMode, PdfPageItem, PdfSource } from '../types';

export interface ToastMessage {
  id: string;
  tone: 'info' | 'success' | 'error';
  text: string;
}

export interface WorkspaceNotice {
  id: string;
  tone: 'info' | 'warning';
  text: string;
}

export function useWorkspace() {
  const [sources, setSources] = useState<PdfSource[]>([]);
  const [pages, setPages] = useState<PdfPageItem[]>([]);
  const [exportMode, setExportMode] = useState<ExportMode>('merge');
  const [rangeText, setRangeText] = useState('1-2');
  const [busyMessage, setBusyMessage] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [notices, setNotices] = useState<WorkspaceNotice[]>([]);

  function pushToast(text: string, tone: ToastMessage['tone']) {
    setToasts((current) => [...current, { id: crypto.randomUUID(), tone, text }]);
  }

  function pushNotice(text: string, tone: WorkspaceNotice['tone']) {
    setNotices((current) => [{ id: crypto.randomUUID(), tone, text }, ...current].slice(0, 4));
  }

  function dismissNotice(id: string) {
    setNotices((current) => current.filter((notice) => notice.id !== id));
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
    setNotices([]);
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
    notices,
    pushToast,
    pushNotice,
    dismissToast,
    dismissNotice,
    resetWorkspace
  };
}
