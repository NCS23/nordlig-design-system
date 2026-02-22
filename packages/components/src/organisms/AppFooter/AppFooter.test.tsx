import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppFooter } from './AppFooter';

describe('AppFooter', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert als footer-Element', () => {
    render(<AppFooter data-testid="ftr">Inhalt</AppFooter>);
    const el = screen.getByTestId('ftr');
    expect(el.tagName).toBe('FOOTER');
  });

  it('rendert Children', () => {
    render(<AppFooter>Copyright 2026</AppFooter>);
    expect(screen.getByText('Copyright 2026')).toBeInTheDocument();
  });

  // ─── Token-Klassen ──────────────────────────────────────────────────────

  it('wendet Token-basierte Hintergrund-Klasse an', () => {
    render(<AppFooter data-testid="ftr">X</AppFooter>);
    expect(screen.getByTestId('ftr').className).toContain('bg-[var(--color-footer-bg)]');
  });

  it('wendet Token-basierte Hoehe an', () => {
    render(<AppFooter data-testid="ftr">X</AppFooter>);
    expect(screen.getByTestId('ftr').className).toContain('h-[var(--sizing-footer-height)]');
  });

  it('wendet Token-basierte Padding-Klassen an', () => {
    render(<AppFooter data-testid="ftr">X</AppFooter>);
    const cls = screen.getByTestId('ftr').className;
    expect(cls).toContain('px-[var(--spacing-footer-px)]');
    expect(cls).toContain('py-[var(--spacing-footer-py)]');
  });

  // ─── bordered prop ──────────────────────────────────────────────────────

  it('zeigt Border standardmaessig', () => {
    render(<AppFooter data-testid="ftr">X</AppFooter>);
    const cls = screen.getByTestId('ftr').className;
    expect(cls).toContain('border-t');
    expect(cls).toContain('border-[var(--color-footer-border)]');
  });

  it('entfernt Border bei bordered={false}', () => {
    render(<AppFooter data-testid="ftr" bordered={false}>X</AppFooter>);
    const cls = screen.getByTestId('ftr').className;
    expect(cls).not.toContain('border-t');
    expect(cls).not.toContain('border-[var(--color-footer-border)]');
  });

  // ─── Ref & Props ────────────────────────────────────────────────────────

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<AppFooter ref={ref}>X</AppFooter>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('FOOTER');
  });

  it('wendet custom className an', () => {
    render(<AppFooter data-testid="ftr" className="extra">X</AppFooter>);
    expect(screen.getByTestId('ftr')).toHaveClass('extra');
  });

  it('hat korrekten displayName', () => {
    expect(AppFooter.displayName).toBe('AppFooter');
  });
});
