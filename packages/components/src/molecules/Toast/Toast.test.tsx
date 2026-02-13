import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toast, ToastProvider, useToast } from './Toast';
import * as ToastPrimitive from '@radix-ui/react-toast';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TestToastTrigger({
  variant = 'info',
  title = 'Test Toast',
  description,
  duration,
}: {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;
}) {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast({ title, description, variant, duration })}
    >
      Trigger Toast
    </button>
  );
}

function renderToast(props?: {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number;
}) {
  const { position, ...triggerProps } = props || {};
  return render(
    <ToastProvider position={position}>
      <TestToastTrigger {...triggerProps} />
    </ToastProvider>
  );
}

// ─── Direct Toast rendering ──────────────────────────────────────────────────

function renderDirectToast(props: {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
}) {
  return render(
    <ToastPrimitive.Provider>
      <Toast
        title={props.title || 'Direct Toast'}
        variant={props.variant || 'info'}
        description={props.description}
        open
      />
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Toast', () => {
  // ─── Direct rendering ────────────────────────────────────────────────────

  describe('direct rendering', () => {
    it('renders title', () => {
      renderDirectToast({ title: 'Hello Toast' });
      expect(screen.getByText('Hello Toast')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      renderDirectToast({ title: 'Title', description: 'Description text' });
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      renderDirectToast({ title: 'No Desc' });
      expect(screen.queryByText('Description text')).not.toBeInTheDocument();
    });

    it('renders close button', () => {
      renderDirectToast({ title: 'Closeable' });
      expect(screen.getByLabelText('Schließen')).toBeInTheDocument();
    });
  });

  // ─── Variant styling ────────────────────────────────────────────────────

  describe('variant styling', () => {
    it('applies success variant border class', () => {
      renderDirectToast({ variant: 'success', title: 'Success' });
      const toast = screen.getByText('Success').closest('[data-state]');
      expect(toast).toHaveClass('border-l-[var(--color-toast-success-border)]');
    });

    it('applies error variant border class', () => {
      renderDirectToast({ variant: 'error', title: 'Error' });
      const toast = screen.getByText('Error').closest('[data-state]');
      expect(toast).toHaveClass('border-l-[var(--color-toast-error-border)]');
    });

    it('applies warning variant border class', () => {
      renderDirectToast({ variant: 'warning', title: 'Warning' });
      const toast = screen.getByText('Warning').closest('[data-state]');
      expect(toast).toHaveClass('border-l-[var(--color-toast-warning-border)]');
    });

    it('applies info variant border class', () => {
      renderDirectToast({ variant: 'info', title: 'Info' });
      const toast = screen.getByText('Info').closest('[data-state]');
      expect(toast).toHaveClass('border-l-[var(--color-toast-info-border)]');
    });
  });

  // ─── Token-based styling ─────────────────────────────────────────────────

  describe('token-based styling', () => {
    it('uses token for background', () => {
      renderDirectToast({ title: 'Styled' });
      const toast = screen.getByText('Styled').closest('[data-state]');
      expect(toast).toHaveClass('bg-[var(--color-toast-bg)]');
    });

    it('uses token for border', () => {
      renderDirectToast({ title: 'Styled' });
      const toast = screen.getByText('Styled').closest('[data-state]');
      expect(toast).toHaveClass('border-[var(--color-toast-border)]');
    });

    it('uses token for shadow', () => {
      renderDirectToast({ title: 'Styled' });
      const toast = screen.getByText('Styled').closest('[data-state]');
      expect(toast).toHaveClass('[box-shadow:var(--shadow-toast)]');
    });

    it('uses token for radius', () => {
      renderDirectToast({ title: 'Styled' });
      const toast = screen.getByText('Styled').closest('[data-state]');
      expect(toast).toHaveClass('rounded-[var(--radius-toast)]');
    });

    it('uses token for title color', () => {
      renderDirectToast({ title: 'Styled Title' });
      const title = screen.getByText('Styled Title');
      expect(title).toHaveClass('text-[var(--color-toast-title)]');
    });

    it('uses token for description color', () => {
      renderDirectToast({ title: 'T', description: 'Desc text' });
      const desc = screen.getByText('Desc text');
      expect(desc).toHaveClass('text-[var(--color-toast-description)]');
    });
  });

  // ─── Icon rendering ──────────────────────────────────────────────────────

  describe('icon variants', () => {
    it('renders success icon with correct color class', () => {
      renderDirectToast({ variant: 'success', title: 'S' });
      const svg = screen.getByText('S').closest('[data-state]')?.querySelector('svg');
      expect(svg).toHaveClass('text-[var(--color-toast-success-icon)]');
    });

    it('renders error icon with correct color class', () => {
      renderDirectToast({ variant: 'error', title: 'E' });
      const svg = screen.getByText('E').closest('[data-state]')?.querySelector('svg');
      expect(svg).toHaveClass('text-[var(--color-toast-error-icon)]');
    });

    it('renders warning icon with correct color class', () => {
      renderDirectToast({ variant: 'warning', title: 'W' });
      const svg = screen.getByText('W').closest('[data-state]')?.querySelector('svg');
      expect(svg).toHaveClass('text-[var(--color-toast-warning-icon)]');
    });

    it('renders info icon with correct color class', () => {
      renderDirectToast({ variant: 'info', title: 'I' });
      const svg = screen.getByText('I').closest('[data-state]')?.querySelector('svg');
      expect(svg).toHaveClass('text-[var(--color-toast-info-icon)]');
    });
  });

  // ─── ToastProvider + useToast ────────────────────────────────────────────

  describe('ToastProvider + useToast', () => {
    it('creates toast via hook', async () => {
      const user = userEvent.setup();
      renderToast({ title: 'Hook Toast', variant: 'success' });

      await user.click(screen.getByText('Trigger Toast'));

      expect(screen.getByText('Hook Toast')).toBeInTheDocument();
    });

    it('creates toast with description', async () => {
      const user = userEvent.setup();
      renderToast({
        title: 'Title',
        description: 'Some description',
        variant: 'info',
      });

      await user.click(screen.getByText('Trigger Toast'));

      expect(screen.getByText('Some description')).toBeInTheDocument();
    });

    it('can create multiple toasts', async () => {
      const user = userEvent.setup();
      renderToast({ title: 'Multi Toast', variant: 'success' });

      await user.click(screen.getByText('Trigger Toast'));
      await user.click(screen.getByText('Trigger Toast'));

      const toasts = screen.getAllByText('Multi Toast');
      expect(toasts.length).toBe(2);
    });
  });

  // ─── useToast error ──────────────────────────────────────────────────────

  describe('useToast outside provider', () => {
    it('throws when used outside ToastProvider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestToastTrigger />);
      }).toThrow('useToast must be used within a ToastProvider');

      consoleError.mockRestore();
    });
  });
});
