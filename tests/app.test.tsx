import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../src/App';

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('renders the workspace shell', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Organize the exact PDF you want, locally.' })).toBeInTheDocument();
  });

  it('shows the guided empty state before upload', () => {
    render(<App />);
    expect(screen.getByText('Pages will appear here after upload.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4. Download result' })).toBeDisabled();
  });

  it('rejects a non-pdf file upload', async () => {
    render(<App />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText('notes.txt was skipped because it is not a PDF.')).toBeInTheDocument();
  });

  it('shows split range guidance when custom ranges are selected', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Export mode'), { target: { value: 'split-ranges' } });
    expect(screen.getByText('Use commas to separate groups. Example: 1-3, 4-6, 9-10')).toBeInTheDocument();
  });
});
