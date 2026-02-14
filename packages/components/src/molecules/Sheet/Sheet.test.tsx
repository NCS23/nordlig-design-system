import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './Sheet';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderSheet(props?: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
}) {
  return render(
    <Sheet defaultOpen={props?.defaultOpen} onOpenChange={props?.onOpenChange}>
      <SheetTrigger>
        <button>Open Sheet</button>
      </SheetTrigger>
      <SheetContent side={props?.side} className={props?.contentClassName}>
        <SheetHeader>
          <SheetTitle>Test Title</SheetTitle>
          <SheetDescription>Test Description</SheetDescription>
        </SheetHeader>
        <div>Sheet body content</div>
        <SheetFooter>
          <button>Save</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Sheet', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders trigger button', () => {
    renderSheet();
    expect(screen.getByText('Open Sheet')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    renderSheet();

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows content when open', async () => {
    const user = userEvent.setup();
    renderSheet();

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByText('Sheet body content')).toBeInTheDocument();
  });

  // ─── Close Button ────────────────────────────────────────────────────

  it('closes on close button click', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderSheet({ onOpenChange });

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Schliessen'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // ─── Side Positioning ─────────────────────────────────────────────────

  it('applies left side positioning', async () => {
    const user = userEvent.setup();
    renderSheet({ side: 'left' });

    await user.click(screen.getByText('Open Sheet'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('inset-y-0');
    expect(dialog).toHaveClass('left-0');
  });

  it('applies bottom side positioning', async () => {
    const user = userEvent.setup();
    renderSheet({ side: 'bottom' });

    await user.click(screen.getByText('Open Sheet'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('inset-x-0');
    expect(dialog).toHaveClass('bottom-0');
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('merges custom className on content', async () => {
    const user = userEvent.setup();
    renderSheet({ contentClassName: 'custom-sheet-class' });

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toHaveClass('custom-sheet-class');
  });

  // ─── Title and Description ────────────────────────────────────────────

  it('renders title and description', async () => {
    const user = userEvent.setup();
    renderSheet();

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  // ─── Overlay ──────────────────────────────────────────────────────────

  it('renders overlay when open', async () => {
    const user = userEvent.setup();
    renderSheet({ defaultOpen: true });

    const overlay = document.querySelector('[data-state]');
    expect(overlay).toBeInTheDocument();
  });

  // ─── Escape ───────────────────────────────────────────────────────────

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderSheet({ onOpenChange });

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
