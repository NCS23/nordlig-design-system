import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog';

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

function renderAlertDialog(props?: {
  defaultOpen?: boolean;
  contentClassName?: string;
  onAction?: () => void;
}) {
  return render(
    <AlertDialog defaultOpen={props?.defaultOpen}>
      <AlertDialogTrigger asChild>
        <button>Open AlertDialog</button>
      </AlertDialogTrigger>
      <AlertDialogContent className={props?.contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle>Test Title</AlertDialogTitle>
          <AlertDialogDescription>Test Description</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction onClick={props?.onAction}>
            Loeschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('AlertDialog', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders trigger button', () => {
    renderAlertDialog();
    expect(screen.getByText('Open AlertDialog')).toBeInTheDocument();
  });

  it('opens on trigger click and shows alertdialog role', async () => {
    const user = userEvent.setup();
    renderAlertDialog();

    await user.click(screen.getByText('Open AlertDialog'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  // ─── Titel und Beschreibung ─────────────────────────────────────────────

  it('shows title and description', async () => {
    const user = userEvent.setup();
    renderAlertDialog();

    await user.click(screen.getByText('Open AlertDialog'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  // ─── Action-Button ──────────────────────────────────────────────────────

  it('action button calls handler and closes', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    renderAlertDialog({ onAction });

    await user.click(screen.getByText('Open AlertDialog'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.click(screen.getByText('Loeschen'));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  // ─── Cancel-Button ─────────────────────────────────────────────────────

  it('cancel button closes dialog', async () => {
    const user = userEvent.setup();
    renderAlertDialog();

    await user.click(screen.getByText('Open AlertDialog'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.click(screen.getByText('Abbrechen'));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('uses token classes for styling', async () => {
    const user = userEvent.setup();
    renderAlertDialog();

    await user.click(screen.getByText('Open AlertDialog'));
    const alertdialog = screen.getByRole('alertdialog');
    expect(alertdialog).toHaveClass('bg-[var(--color-alertdlg-bg)]');
    expect(alertdialog).toHaveClass('border-[var(--color-alertdlg-border)]');
    expect(alertdialog).toHaveClass('rounded-[var(--radius-alertdlg)]');
    expect(alertdialog).toHaveClass('[box-shadow:var(--shadow-alertdlg)]');
    expect(alertdialog).toHaveClass('p-[var(--spacing-alertdlg-padding)]');
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('merges custom className on content', async () => {
    const user = userEvent.setup();
    renderAlertDialog({ contentClassName: 'custom-alertdlg-class' });

    await user.click(screen.getByText('Open AlertDialog'));
    expect(screen.getByRole('alertdialog')).toHaveClass('custom-alertdlg-class');
  });

  // ─── displayName ───────────────────────────────────────────────────────

  it('has correct displayName for all sub-components', () => {
    expect(AlertDialog.displayName).toBe('AlertDialog');
    expect(AlertDialogTrigger.displayName).toBe('AlertDialogTrigger');
    expect(AlertDialogContent.displayName).toBe('AlertDialogContent');
    expect(AlertDialogHeader.displayName).toBe('AlertDialogHeader');
    expect(AlertDialogTitle.displayName).toBe('AlertDialogTitle');
    expect(AlertDialogDescription.displayName).toBe('AlertDialogDescription');
    expect(AlertDialogFooter.displayName).toBe('AlertDialogFooter');
    expect(AlertDialogAction.displayName).toBe('AlertDialogAction');
    expect(AlertDialogCancel.displayName).toBe('AlertDialogCancel');
  });
});
