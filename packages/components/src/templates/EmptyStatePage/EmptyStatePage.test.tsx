import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { EmptyStatePage } from './EmptyStatePage';

describe('EmptyStatePage', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders title', () => {
    render(<EmptyStatePage title="Keine Daten vorhanden" />);
    expect(screen.getByText('Keine Daten vorhanden')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <EmptyStatePage
        title="Keine Daten"
        description="Es sind noch keine Eintraege vorhanden."
      />
    );
    expect(
      screen.getByText('Es sind noch keine Eintraege vorhanden.')
    ).toBeInTheDocument();
  });

  it('renders illustration when provided', () => {
    render(
      <EmptyStatePage
        title="Leer"
        illustration={<span data-testid="illustration-icon">Icon</span>}
      />
    );
    expect(screen.getByTestId('illustration-icon')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <EmptyStatePage
        title="Leer"
        actions={<button>Erstellen</button>}
      />
    );
    expect(screen.getByText('Erstellen')).toBeInTheDocument();
  });

  // ─── Conditional rendering ──────────────────────────────────────────────

  it('does not render description when omitted', () => {
    const { container } = render(<EmptyStatePage title="Leer" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('does not render illustration when omitted', () => {
    const { container } = render(<EmptyStatePage title="Leer" />);
    const ariaHiddenEl = container.querySelector('[aria-hidden="true"]');
    expect(ariaHiddenEl).toBeNull();
  });

  it('does not render actions when omitted', () => {
    const { container } = render(<EmptyStatePage title="Leer" />);
    // Only the text-block div should exist inside the content wrapper
    const contentWrapper = container.firstChild!.firstChild as HTMLElement;
    // Should have exactly 1 child (text block), no actions div
    const childDivs = contentWrapper.querySelectorAll(':scope > div');
    expect(childDivs.length).toBe(1); // only text block
  });

  // ─── Semantics ──────────────────────────────────────────────────────────

  it('title uses h2 element', () => {
    render(<EmptyStatePage title="Titel" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Titel'
    );
  });

  it('root has role="status"', () => {
    const { container } = render(<EmptyStatePage title="Leer" />);
    expect(container.firstChild).toHaveAttribute('role', 'status');
  });

  it('illustration has aria-hidden', () => {
    const { container } = render(
      <EmptyStatePage
        title="Leer"
        illustration={<span>Bild</span>}
      />
    );
    const illustrationWrapper = container.querySelector('[aria-hidden="true"]');
    expect(illustrationWrapper).toBeInTheDocument();
    expect(illustrationWrapper).toHaveAttribute('aria-hidden', 'true');
  });

  // ─── Token-based styling ──────────────────────────────────────────────

  it('has max-width token class', () => {
    const { container } = render(<EmptyStatePage title="Leer" />);
    const contentWrapper = container.firstChild!.firstChild as HTMLElement;
    expect(contentWrapper.className).toContain(
      'max-w-[var(--sizing-emptypage-max-width)]'
    );
  });

  it('has padding-y token class', () => {
    const { container } = render(<EmptyStatePage title="Leer" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain(
      'py-[var(--spacing-emptypage-padding-y)]'
    );
  });

  // ─── className & Ref ──────────────────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(
      <EmptyStatePage title="Leer" className="my-custom-class" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('my-custom-class');
  });

  it('forwards ref (HTMLDivElement)', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<EmptyStatePage ref={ref} title="Leer" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
