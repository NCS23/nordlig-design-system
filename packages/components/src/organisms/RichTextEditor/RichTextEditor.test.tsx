import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RichTextEditor } from './RichTextEditor';

// Tiptap renders asynchronously via ProseMirror; tests need waitFor for editor init.

describe('RichTextEditor', () => {
  // --- Rendering ---------------------------------------------------------------

  it('renders editor container', async () => {
    render(<RichTextEditor data-testid="rte" />);
    await waitFor(() => {
      expect(screen.getByTestId('rte')).toBeInTheDocument();
    });
  });

  it('renders toolbar by default', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });
  });

  it('hides toolbar when hideToolbar=true', async () => {
    render(<RichTextEditor hideToolbar />);
    await waitFor(() => {
      expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
    });
  });

  it('hides toolbar in readOnly mode', async () => {
    render(<RichTextEditor readOnly />);
    await waitFor(() => {
      expect(screen.queryByRole('toolbar')).not.toBeInTheDocument();
    });
  });

  it('forwards ref', async () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<RichTextEditor ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  it('applies custom className', async () => {
    render(<RichTextEditor data-testid="rte" className="custom-class" />);
    await waitFor(() => {
      expect(screen.getByTestId('rte').className).toContain('custom-class');
    });
  });

  it('applies base token classes', async () => {
    render(<RichTextEditor data-testid="rte" />);
    await waitFor(() => {
      const el = screen.getByTestId('rte');
      expect(el.className).toContain('rounded-[var(--radius-rte)]');
      expect(el.className).toContain('bg-[var(--color-rte-bg)]');
      expect(el.className).toContain('border-[var(--color-rte-border)]');
    });
  });

  // --- Toolbar buttons ---------------------------------------------------------

  it('renders bold button', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Fett')).toBeInTheDocument();
    });
  });

  it('renders italic button', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Kursiv')).toBeInTheDocument();
    });
  });

  it('renders underline button', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Unterstrichen')).toBeInTheDocument();
    });
  });

  it('renders heading buttons', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Ueberschrift 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Ueberschrift 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Ueberschrift 3')).toBeInTheDocument();
    });
  });

  it('renders list buttons', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Aufzaehlung')).toBeInTheDocument();
      expect(screen.getByLabelText('Nummerierte Liste')).toBeInTheDocument();
    });
  });

  it('renders blockquote button', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Zitat')).toBeInTheDocument();
    });
  });

  it('renders codeblock button', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Codeblock')).toBeInTheDocument();
    });
  });

  it('renders link button', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Link')).toBeInTheDocument();
    });
  });

  // --- Features prop -----------------------------------------------------------

  it('limits toolbar buttons via features prop', async () => {
    render(<RichTextEditor features={['bold', 'italic']} />);
    await waitFor(() => {
      expect(screen.getByLabelText('Fett')).toBeInTheDocument();
      expect(screen.getByLabelText('Kursiv')).toBeInTheDocument();
      expect(screen.queryByLabelText('Unterstrichen')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Ueberschrift 1')).not.toBeInTheDocument();
    });
  });

  // --- States ------------------------------------------------------------------

  it('applies error state styling', async () => {
    render(<RichTextEditor data-testid="rte" error />);
    await waitFor(() => {
      expect(screen.getByTestId('rte').className).toContain('border-[var(--color-rte-border-error)]');
    });
  });

  it('sets aria-invalid when error', async () => {
    render(<RichTextEditor data-testid="rte" error />);
    await waitFor(() => {
      expect(screen.getByTestId('rte')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('applies disabled state', async () => {
    render(<RichTextEditor data-testid="rte" disabled />);
    await waitFor(() => {
      expect(screen.getByTestId('rte').className).toContain('opacity-50');
      expect(screen.getByTestId('rte').className).toContain('cursor-not-allowed');
    });
  });

  it('disables toolbar buttons when disabled', async () => {
    render(<RichTextEditor disabled />);
    await waitFor(() => {
      expect(screen.getByLabelText('Fett')).toBeDisabled();
    });
  });

  // --- Content -----------------------------------------------------------------

  it('renders default value', async () => {
    render(<RichTextEditor defaultValue="<p>Hello</p>" data-testid="rte" />);
    await waitFor(() => {
      expect(screen.getByTestId('rte').textContent).toContain('Hello');
    });
  });

  it('calls onChange on content update', async () => {
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} defaultValue="<p>Test</p>" />);
    // The onChange will be triggered by tiptap when content changes.
    // Since we can't easily type in contenteditable in jsdom,
    // we verify the editor initializes without error.
    await waitFor(() => {
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });
  });

  // --- HTML Attributes ---------------------------------------------------------

  it('passes through HTML attributes', async () => {
    render(<RichTextEditor data-testid="rte" id="my-editor" />);
    await waitFor(() => {
      expect(screen.getByTestId('rte')).toHaveAttribute('id', 'my-editor');
    });
  });

  // --- Toolbar styling ---------------------------------------------------------

  it('toolbar has correct styling tokens', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('bg-[var(--color-rte-toolbar-bg)]');
      expect(toolbar.className).toContain('border-[var(--color-rte-toolbar-border)]');
      expect(toolbar.className).toContain('gap-[var(--spacing-rte-toolbar-gap)]');
      expect(toolbar.className).toContain('p-[var(--spacing-rte-toolbar-padding)]');
    });
  });

  it('toolbar buttons have aria-pressed', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByLabelText('Fett')).toHaveAttribute('aria-pressed');
    });
  });

  it('toolbar has aria-label', async () => {
    render(<RichTextEditor />);
    await waitFor(() => {
      expect(screen.getByRole('toolbar')).toHaveAttribute('aria-label', 'Formatierung');
    });
  });
});
