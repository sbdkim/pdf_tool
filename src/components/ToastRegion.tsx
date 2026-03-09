import type { ToastMessage } from '../hooks/useWorkspace';

export function ToastRegion({
  messages,
  onDismiss
}: {
  messages: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div aria-live="polite" className="toast-region">
      {messages.map((message) => (
        <div className={`toast toast-${message.tone}`} key={message.id}>
          <span>{message.text}</span>
          <button onClick={() => onDismiss(message.id)} type="button">
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
