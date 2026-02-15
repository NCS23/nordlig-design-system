import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingOverlay } from './LoadingOverlay';

describe('LoadingOverlay', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert mit role=status und aria-busy=true', () => {
    render(<LoadingOverlay visible />);
    const overlay = screen.getByRole('status');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute('aria-busy', 'true');
  });

  it('zeigt Spinner (SVG innerhalb)', () => {
    const { container } = render(<LoadingOverlay visible />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('zeigt Text wenn prop gesetzt', () => {
    render(<LoadingOverlay visible text="Laden..." />);
    expect(screen.getByText('Laden...')).toBeInTheDocument();
  });

  it('zeigt keinen Text ohne prop', () => {
    const { container } = render(<LoadingOverlay visible />);
    // Only SVG spinner should exist, no text node with content
    const statusEl = screen.getByRole('status');
    const textContent = statusEl.textContent?.trim() ?? '';
    // May have accessible label but no visible text paragraph
    expect(container.querySelector('p, [data-text]')).toBeNull();
  });

  // ─── Sichtbarkeit ─────────────────────────────────────────────────────

  it('visible=false rendert nichts', () => {
    const { container } = render(<LoadingOverlay visible={false} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // ─── Blur ─────────────────────────────────────────────────────────────

  it('wendet blur-Klasse an bei blur=true', () => {
    const { container } = render(<LoadingOverlay visible blur />);
    const overlay = screen.getByRole('status');
    expect(overlay.className).toContain('backdrop-blur');
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen fuer Hintergrund', () => {
    render(<LoadingOverlay visible />);
    const overlay = screen.getByRole('status');
    expect(overlay.className).toContain('bg-[var(--color-ldovl-bg)]');
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('leitet ref auf HTMLDivElement weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<LoadingOverlay ref={ref} visible />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ─── className ──────────────────────────────────────────────────────────

  it('merged className', () => {
    render(<LoadingOverlay visible className="custom-overlay" />);
    const overlay = screen.getByRole('status');
    expect(overlay).toHaveClass('custom-overlay');
  });

  // ─── displayName ────────────────────────────────────────────────────────

  it('hat displayName "LoadingOverlay"', () => {
    expect(LoadingOverlay.displayName).toBe('LoadingOverlay');
  });
});
