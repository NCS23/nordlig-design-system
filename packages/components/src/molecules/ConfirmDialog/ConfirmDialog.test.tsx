import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useConfirm } from './useConfirm';
import type { ConfirmOptions } from './useConfirm';

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

/** Test-Wrapper, der den useConfirm-Hook verwendet */
function TestHarness({
  onResult,
  options,
}: {
  onResult?: (result: boolean) => void;
  options?: Partial<ConfirmOptions>;
}) {
  const { confirm, ConfirmDialogComponent } = useConfirm();

  const handleClick = async () => {
    const result = await confirm({
      title: 'Test Title',
      message: 'Test Message',
      variant: 'info',
      ...options,
    });
    onResult?.(result);
  };

  return (
    <>
      <button onClick={handleClick}>Open Confirm</button>
      <ConfirmDialogComponent />
    </>
  );
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('ConfirmDialog / useConfirm', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders dialog when confirm() is called', async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  // ─── Confirm (true) ──────────────────────────────────────────────────────

  it('resolves true when action button is clicked', async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(<TestHarness onResult={onResult} />);

    await user.click(screen.getByText('Open Confirm'));
    await user.click(screen.getByText('Bestätigen'));

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith(true);
    });
  });

  // ─── Cancel (false) ─────────────────────────────────────────────────────

  it('resolves false when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(<TestHarness onResult={onResult} />);

    await user.click(screen.getByText('Open Confirm'));
    await user.click(screen.getByText('Abbrechen'));

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith(false);
    });
  });

  // ─── Titel und Beschreibung ───────────────────────────────────────────

  it('shows custom title and message', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness
        options={{ title: 'Eintrag loeschen?', message: 'Das kann nicht rueckgaengig gemacht werden.' }}
      />
    );

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByText('Eintrag loeschen?')).toBeInTheDocument();
    expect(screen.getByText('Das kann nicht rueckgaengig gemacht werden.')).toBeInTheDocument();
  });

  // ─── Varianten-Styling ────────────────────────────────────────────────

  it('shows correct variant styling for info', async () => {
    const user = userEvent.setup();
    render(<TestHarness options={{ variant: 'info' }} />);

    await user.click(screen.getByText('Open Confirm'));
    const actionButton = screen.getByText('Bestätigen');
    expect(actionButton).toHaveClass('bg-[var(--color-btn-primary-bg)]');
  });

  it('shows correct variant styling for danger', async () => {
    const user = userEvent.setup();
    render(<TestHarness options={{ variant: 'danger' }} />);

    await user.click(screen.getByText('Open Confirm'));
    const actionButton = screen.getByText('Bestätigen');
    expect(actionButton).toHaveClass('bg-[var(--color-bg-error-solid)]');
  });

  it('shows correct variant styling for warning', async () => {
    const user = userEvent.setup();
    render(<TestHarness options={{ variant: 'warning' }} />);

    await user.click(screen.getByText('Open Confirm'));
    const actionButton = screen.getByText('Bestätigen');
    expect(actionButton).toHaveClass('bg-[var(--color-bg-warning-solid)]');
  });

  // ─── Standard-Labels ──────────────────────────────────────────────────

  it('uses default labels when none provided', async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByText('Bestätigen')).toBeInTheDocument();
    expect(screen.getByText('Abbrechen')).toBeInTheDocument();
  });

  // ─── Benutzerdefinierte Labels ────────────────────────────────────────

  it('uses custom labels when provided', async () => {
    const user = userEvent.setup();
    render(
      <TestHarness
        options={{ confirmLabel: 'Ja, loeschen', cancelLabel: 'Nein, behalten' }}
      />
    );

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByText('Ja, loeschen')).toBeInTheDocument();
    expect(screen.getByText('Nein, behalten')).toBeInTheDocument();
  });

  // ─── Dialog schliesst nach Bestaetigung ───────────────────────────────

  it('closes dialog after confirmation', async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.click(screen.getByText('Bestätigen'));
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });

  // ─── Dialog schliesst nach Abbruch ────────────────────────────────────

  it('closes dialog after cancellation', async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.click(screen.getByText('Abbrechen'));
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });

  // ─── Escape-Taste ─────────────────────────────────────────────────────

  it('handles escape key (resolves false)', async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(<TestHarness onResult={onResult} />);

    await user.click(screen.getByText('Open Confirm'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith(false);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });
});
