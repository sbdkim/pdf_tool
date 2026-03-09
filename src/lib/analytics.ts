declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, props: Record<string, string> = {}): void {
  window.dispatchEvent(new CustomEvent('pdf-foundry:track', { detail: { eventName, props } }));
  window.plausible?.(eventName, { props });
  window.gtag?.('event', eventName, props);
}
