import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  // ─── Title ──────────────────────────────────────────────────────────────────

  it('renders title', () => {
    render(<EmptyState title="Keine Daten" />);
    expect(screen.getByText('Keine Daten')).toBeInTheDocument();
  });

  // ─── Description ────────────────────────────────────────────────────────────

  it('renders description', () => {
    render(
      <EmptyState
        title="Keine Daten"
        description="Laden Sie eine Datei hoch, um zu beginnen."
      />
    );
    expect(
      screen.getByText('Laden Sie eine Datei hoch, um zu beginnen.')
    ).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<EmptyState title="Keine Daten" />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  // ─── Icon ───────────────────────────────────────────────────────────────────

  it('renders icon', () => {
    render(
      <EmptyState
        title="Keine Daten"
        icon={<svg data-testid="icon" />}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon when omitted', () => {
    const { container } = render(<EmptyState title="Keine Daten" />);
    // The icon wrapper div with mb-4 should not be present
    const iconWrapper = container.querySelector('.mb-4');
    expect(iconWrapper).not.toBeInTheDocument();
  });

  // ─── Action ─────────────────────────────────────────────────────────────────

  it('renders action', () => {
    render(
      <EmptyState
        title="Keine Daten"
        action={<button data-testid="action-btn">Hochladen</button>}
      />
    );
    expect(screen.getByTestId('action-btn')).toBeInTheDocument();
  });

  it('does not render action when omitted', () => {
    render(<EmptyState title="Keine Daten" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  // ─── Variant icon color classes ─────────────────────────────────────────────

  it('applies default variant icon color class', () => {
    const { container } = render(
      <EmptyState
        title="Default"
        icon={<svg data-testid="icon" />}
      />
    );
    const iconWrapper = container.querySelector('.mb-4');
    expect(iconWrapper).toHaveClass('text-[var(--color-emptystate-icon)]');
  });

  it('applies error variant icon color class', () => {
    const { container } = render(
      <EmptyState
        title="Error"
        variant="error"
        icon={<svg data-testid="icon" />}
      />
    );
    const iconWrapper = container.querySelector('.mb-4');
    expect(iconWrapper).toHaveClass('text-[var(--color-emptystate-icon-error)]');
  });

  it('applies success variant icon color class', () => {
    const { container } = render(
      <EmptyState
        title="Success"
        variant="success"
        icon={<svg data-testid="icon" />}
      />
    );
    const iconWrapper = container.querySelector('.mb-4');
    expect(iconWrapper).toHaveClass(
      'text-[var(--color-emptystate-icon-success)]'
    );
  });

  // ─── Custom className ──────────────────────────────────────────────────────

  it('applies custom className', () => {
    render(
      <EmptyState data-testid="empty" title="Custom" className="custom-class" />
    );
    expect(screen.getByTestId('empty')).toHaveClass('custom-class');
  });

  // ─── Token-based text styling ──────────────────────────────────────────────

  it('title has correct text class', () => {
    render(<EmptyState title="Styled Title" />);
    const heading = screen.getByText('Styled Title');
    expect(heading).toHaveClass('text-[var(--color-emptystate-title)]');
  });

  it('description has correct text class', () => {
    render(
      <EmptyState title="Title" description="Styled Description" />
    );
    const desc = screen.getByText('Styled Description');
    expect(desc).toHaveClass('text-[var(--color-emptystate-description)]');
  });
});
