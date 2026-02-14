import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

function renderPagination(props?: Partial<React.ComponentProps<typeof Pagination>>) {
  const defaultProps = {
    currentPage: 3,
    totalPages: 10,
    onPageChange: vi.fn(),
    ...props,
  };
  return { ...render(<Pagination {...defaultProps} />), onPageChange: defaultProps.onPageChange };
}

describe('Pagination', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders page buttons', () => {
    renderPagination();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Seite 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Seite 3')).toBeInTheDocument();
  });

  it('highlights active page with active-bg class', () => {
    renderPagination({ currentPage: 3 });
    const activeButton = screen.getByLabelText('Seite 3');
    expect(activeButton.className).toContain('bg-[var(--color-pagination-item-active-bg)]');
  });

  // ─── Navigation Buttons ──────────────────────────────────────────────────

  it('prev button exists with aria-label', () => {
    renderPagination();
    expect(screen.getByLabelText('Vorherige Seite')).toBeInTheDocument();
  });

  it('next button exists with aria-label', () => {
    renderPagination();
    expect(screen.getByLabelText('Naechste Seite')).toBeInTheDocument();
  });

  it('prev disabled on first page', () => {
    renderPagination({ currentPage: 1 });
    expect(screen.getByLabelText('Vorherige Seite')).toBeDisabled();
  });

  it('next disabled on last page', () => {
    renderPagination({ currentPage: 10, totalPages: 10 });
    expect(screen.getByLabelText('Naechste Seite')).toBeDisabled();
  });

  // ─── Click Interaction ──────────────────────────────────────────────────

  it('calls onPageChange when page clicked', async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPagination({ currentPage: 3 });
    await user.click(screen.getByLabelText('Seite 1'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when prev clicked (goes to page - 1)', async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPagination({ currentPage: 5 });
    await user.click(screen.getByLabelText('Vorherige Seite'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when next clicked (goes to page + 1)', async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPagination({ currentPage: 5 });
    await user.click(screen.getByLabelText('Naechste Seite'));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  // ─── Ellipsis ───────────────────────────────────────────────────────────

  it('shows ellipsis for many pages', () => {
    renderPagination({ currentPage: 5, totalPages: 10 });
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it('no ellipsis when totalPages <= 7', () => {
    renderPagination({ currentPage: 3, totalPages: 7 });
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  // ─── Sibling Count ─────────────────────────────────────────────────────

  it('siblingCount=2 shows more pages', () => {
    renderPagination({ currentPage: 10, totalPages: 20, siblingCount: 2 });
    // Mit siblingCount=2 sollten Seiten 8, 9, 10, 11, 12 sichtbar sein
    expect(screen.getByLabelText('Seite 8')).toBeInTheDocument();
    expect(screen.getByLabelText('Seite 9')).toBeInTheDocument();
    expect(screen.getByLabelText('Seite 10')).toBeInTheDocument();
    expect(screen.getByLabelText('Seite 11')).toBeInTheDocument();
    expect(screen.getByLabelText('Seite 12')).toBeInTheDocument();
  });

  // ─── Compact Variant ──────────────────────────────────────────────────

  it('compact variant shows "Seite X von Y"', () => {
    renderPagination({ variant: 'compact', currentPage: 3, totalPages: 10 });
    expect(screen.getByText('Seite 3 von 10')).toBeInTheDocument();
  });

  it('compact variant hides page numbers', () => {
    renderPagination({ variant: 'compact', currentPage: 3, totalPages: 10 });
    expect(screen.queryByLabelText('Seite 1')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Seite 3')).not.toBeInTheDocument();
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('accepts custom className', () => {
    renderPagination({ className: 'my-custom-class' });
    expect(screen.getByRole('navigation')).toHaveClass('my-custom-class');
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('active page uses active token classes (bg, text, border)', () => {
    renderPagination({ currentPage: 3 });
    const activeButton = screen.getByLabelText('Seite 3');
    expect(activeButton).toHaveClass('bg-[var(--color-pagination-item-active-bg)]');
    expect(activeButton).toHaveClass('text-[var(--color-pagination-item-active-text)]');
    expect(activeButton).toHaveClass('border-[var(--color-pagination-item-active-border)]');
  });

  it('normal page uses normal token classes', () => {
    renderPagination({ currentPage: 3 });
    const normalButton = screen.getByLabelText('Seite 1');
    expect(normalButton).toHaveClass('bg-[var(--color-pagination-item-bg)]');
    expect(normalButton).toHaveClass('text-[var(--color-pagination-item-text)]');
    expect(normalButton).toHaveClass('border-[var(--color-pagination-item-border)]');
  });

  it('uses token for border-radius', () => {
    renderPagination();
    const button = screen.getByLabelText('Seite 1');
    expect(button).toHaveClass('rounded-[var(--radius-pagination-item)]');
  });
});
