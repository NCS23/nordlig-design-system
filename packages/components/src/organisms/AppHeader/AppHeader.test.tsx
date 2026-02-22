import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert als header-Element', () => {
    render(<AppHeader data-testid="hdr">Inhalt</AppHeader>);
    const el = screen.getByTestId('hdr');
    expect(el.tagName).toBe('HEADER');
  });

  it('rendert Children', () => {
    render(<AppHeader>Logo und Navigation</AppHeader>);
    expect(screen.getByText('Logo und Navigation')).toBeInTheDocument();
  });

  // ─── Token-Klassen ──────────────────────────────────────────────────────

  it('wendet Token-basierte Hintergrund-Klasse an', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    expect(screen.getByTestId('hdr').className).toContain('bg-[var(--color-header-bg)]');
  });

  it('wendet Token-basierte Hoehe an', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    expect(screen.getByTestId('hdr').className).toContain('h-[var(--sizing-header-height)]');
  });

  it('wendet Token-basierte Padding-Klassen an', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    const cls = screen.getByTestId('hdr').className;
    expect(cls).toContain('px-[var(--spacing-header-px)]');
    expect(cls).toContain('py-[var(--spacing-header-py)]');
  });

  it('wendet Token-basierte Gap-Klasse an', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    expect(screen.getByTestId('hdr').className).toContain('gap-[var(--spacing-header-gap)]');
  });

  // ─── bordered prop ──────────────────────────────────────────────────────

  it('zeigt Border standardmaessig', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    const cls = screen.getByTestId('hdr').className;
    expect(cls).toContain('border-b');
    expect(cls).toContain('border-[var(--color-header-border)]');
  });

  it('entfernt Border bei bordered={false}', () => {
    render(<AppHeader data-testid="hdr" bordered={false}>X</AppHeader>);
    const cls = screen.getByTestId('hdr').className;
    expect(cls).not.toContain('border-b');
    expect(cls).not.toContain('border-[var(--color-header-border)]');
  });

  // ─── elevated prop ──────────────────────────────────────────────────────

  it('zeigt Shadow standardmaessig', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    expect(screen.getByTestId('hdr').className).toContain('[box-shadow:var(--shadow-header)]');
  });

  it('entfernt Shadow bei elevated={false}', () => {
    render(<AppHeader data-testid="hdr" elevated={false}>X</AppHeader>);
    expect(screen.getByTestId('hdr').className).not.toContain('[box-shadow:var(--shadow-header)]');
  });

  // ─── sticky prop ────────────────────────────────────────────────────────

  it('ist nicht sticky standardmaessig', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    const cls = screen.getByTestId('hdr').className;
    expect(cls).not.toContain('sticky');
    expect(cls).not.toContain('top-0');
  });

  it('wird sticky bei sticky={true}', () => {
    render(<AppHeader data-testid="hdr" sticky>X</AppHeader>);
    const cls = screen.getByTestId('hdr').className;
    expect(cls).toContain('sticky');
    expect(cls).toContain('top-0');
  });

  // ─── zIndex prop ────────────────────────────────────────────────────────

  it('setzt keinen z-index wenn nicht angegeben', () => {
    render(<AppHeader data-testid="hdr">X</AppHeader>);
    expect(screen.getByTestId('hdr').style.zIndex).toBe('');
  });

  it('wendet zIndex via style an', () => {
    render(<AppHeader data-testid="hdr" zIndex={20}>X</AppHeader>);
    expect(screen.getByTestId('hdr').style.zIndex).toBe('20');
  });

  // ─── Ref & Props ────────────────────────────────────────────────────────

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<AppHeader ref={ref}>X</AppHeader>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('HEADER');
  });

  it('wendet custom className an', () => {
    render(<AppHeader data-testid="hdr" className="extra">X</AppHeader>);
    expect(screen.getByTestId('hdr')).toHaveClass('extra');
  });

  it('hat korrekten displayName', () => {
    expect(AppHeader.displayName).toBe('AppHeader');
  });
});
