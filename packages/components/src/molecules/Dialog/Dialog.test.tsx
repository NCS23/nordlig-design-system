import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './Dialog';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderDialog(props?: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
}) {
  return render(
    <Dialog
      defaultOpen={props?.defaultOpen}
      open={props?.open}
      onOpenChange={props?.onOpenChange}
    >
      <DialogTrigger>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent className={props?.contentClassName}>
        <DialogHeader>
          <DialogTitle>Test Title</DialogTitle>
          <DialogDescription>Test Description</DialogDescription>
        </DialogHeader>
        <p>Dialog body content</p>
        <DialogFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Dialog', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders trigger button', () => {
    renderDialog();
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // ─── Title and Description ────────────────────────────────────────────

  it('shows title and description', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  // ─── Overlay ────────────────────────────────────────────────────────

  it('renders overlay when open', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Verify overlay element is rendered with correct token class
    const overlay = document.querySelector('.bg-\\[var\\(--color-dialog-overlay\\)\\]');
    expect(overlay).toBeInTheDocument();
  });

  // ─── Escape ───────────────────────────────────────────────────────────

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('merges custom className on content', async () => {
    const user = userEvent.setup();
    renderDialog({ contentClassName: 'custom-dialog-class' });

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toHaveClass('custom-dialog-class');
  });

  // ─── Footer ───────────────────────────────────────────────────────────

  it('renders footer with action buttons', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('uses token classes for styling', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText('Open Dialog'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('bg-[var(--color-dialog-bg)]');
    expect(dialog).toHaveClass('border-[var(--color-dialog-border)]');
    expect(dialog).toHaveClass('rounded-[var(--radius-dialog)]');
    expect(dialog).toHaveClass('[box-shadow:var(--shadow-dialog)]');
    expect(dialog).toHaveClass('p-[var(--spacing-dialog-padding)]');
  });

  // ─── Controlled ───────────────────────────────────────────────────────

  it('supports controlled open/close', () => {
    const { rerender } = render(
      <Dialog open={true}>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled</DialogTitle>
            <DialogDescription>Controlled dialog</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(
      <Dialog open={false}>
        <DialogTrigger>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled</DialogTitle>
            <DialogDescription>Controlled dialog</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ─── onOpenChange ─────────────────────────────────────────────────────

  it('calls onOpenChange when opening', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    await user.click(screen.getByText('Open Dialog'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
