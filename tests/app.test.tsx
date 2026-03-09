import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders the workspace shell', () => {
    render(<App />);
    expect(screen.getByText('Professional PDF cleanup without uploading your documents.')).toBeInTheDocument();
  });

  it('rejects a non-pdf file upload', async () => {
    render(<App />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText('notes.txt was skipped because it is not a PDF.')).toBeInTheDocument();
  });
});
