import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from './Modal';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderModal(props: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showClose?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
} = {}) {
  const { size, showClose, onOpenChange, defaultOpen } = props;
  return render(
    <Modal defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalContent size={size} showClose={showClose}>
        <ModalHeader>
          <ModalTitle>Test Title</ModalTitle>
          <ModalDescription>Test Description</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Body content</p>
        </ModalBody>
        <ModalFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Modal', () => {
  it('renders trigger button', () => {
    renderModal();
    expect(screen.getByText('Open Modal')).toBeInTheDocument();
  });

  it('does not show content when closed', () => {
    renderModal();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('Open Modal'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays title and description', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('Open Modal'));

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays body and footer content', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('Open Modal'));

    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('shows close button by default', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('Open Modal'));

    expect(screen.getByLabelText('Schließen')).toBeInTheDocument();
  });

  it('hides close button when showClose=false', async () => {
    const user = userEvent.setup();
    renderModal({ showClose: false });

    await user.click(screen.getByText('Open Modal'));

    expect(screen.queryByLabelText('Schließen')).not.toBeInTheDocument();
  });

  it('closes on close button click', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderModal({ onOpenChange });

    await user.click(screen.getByText('Open Modal'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Schließen'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderModal({ onOpenChange });

    await user.click(screen.getByText('Open Modal'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('has proper ARIA attributes', async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByText('Open Modal'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('role', 'dialog');
  });

  it('renders with defaultOpen', () => {
    renderModal({ defaultOpen: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // ─── Size Variants ─────────────────────────────────────────────────────────

  describe('size variants', () => {
    it('applies sm size class', async () => {
      const user = userEvent.setup();
      renderModal({ size: 'sm' });
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');
    });

    it('applies md size class by default', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('max-w-md');
    });

    it('applies lg size class', async () => {
      const user = userEvent.setup();
      renderModal({ size: 'lg' });
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('max-w-lg');
    });

    it('applies xl size class', async () => {
      const user = userEvent.setup();
      renderModal({ size: 'xl' });
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('max-w-2xl');
    });
  });

  // ─── Token classes ──────────────────────────────────────────────────────────

  describe('token-based styling', () => {
    it('uses token for content background', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('bg-[var(--color-modal-bg)]');
    });

    it('uses token for content shadow', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('[box-shadow:var(--shadow-modal-content)]');
    });

    it('uses token for content radius', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      expect(screen.getByRole('dialog')).toHaveClass('rounded-[var(--radius-modal)]');
    });

    it('uses token for title color', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      const title = screen.getByText('Test Title');
      expect(title).toHaveClass('text-[var(--color-modal-title)]');
    });

    it('uses token for description color', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      const desc = screen.getByText('Test Description');
      expect(desc).toHaveClass('text-[var(--color-modal-description)]');
    });
  });

  // ─── Sub-components ─────────────────────────────────────────────────────────

  describe('sub-components', () => {
    it('ModalHeader has border-b divider', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      const header = screen.getByText('Test Title').closest('div');
      expect(header).toHaveClass('border-b');
      expect(header).toHaveClass('border-[var(--color-modal-divider)]');
    });

    it('ModalFooter has border-t divider', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      const footer = screen.getByText('Confirm').closest('div');
      expect(footer).toHaveClass('border-t');
      expect(footer).toHaveClass('border-[var(--color-modal-divider)]');
    });

    it('ModalBody has overflow-auto', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      const body = screen.getByText('Body content').closest('div');
      expect(body).toHaveClass('overflow-auto');
    });

    it('ModalFooter has justify-end layout', async () => {
      const user = userEvent.setup();
      renderModal();
      await user.click(screen.getByText('Open Modal'));
      const footer = screen.getByText('Confirm').closest('div');
      expect(footer).toHaveClass('justify-end');
    });
  });
});
