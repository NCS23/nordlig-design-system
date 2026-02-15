import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  // --- Rendering ---------------------------------------------------------------

  it('renders children', () => {
    render(<Kbd>Esc</Kbd>);
    expect(screen.getByText('Esc')).toBeInTheDocument();
  });

  it('renders as a kbd element', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    expect(screen.getByTestId('kbd').tagName).toBe('KBD');
  });

  it('applies base styling classes', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd.className).toContain('inline-flex');
    expect(kbd.className).toContain('items-center');
    expect(kbd.className).toContain('justify-center');
    expect(kbd.className).toContain('font-mono');
  });

  it('applies token classes for border, bg, text, and shadow', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd.className).toContain('border-[var(--color-kbd-border)]');
    expect(kbd.className).toContain('bg-[var(--color-kbd-bg)]');
    expect(kbd.className).toContain('text-[var(--color-kbd-text)]');
    expect(kbd.className).toContain('[box-shadow:var(--shadow-kbd)]');
  });

  it('applies radius token class', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    expect(screen.getByTestId('kbd').className).toContain('rounded-[var(--radius-kbd)]');
  });

  // --- Sizes -------------------------------------------------------------------

  it('applies default size (md)', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd.className).toContain('px-1.5');
    expect(kbd.className).toContain('text-xs');
  });

  it('applies size=sm', () => {
    render(<Kbd data-testid="kbd" size="sm">K</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd.className).toContain('px-1');
    expect(kbd.className).toContain('py-0.5');
    expect(kbd.className).toContain('text-[11px]');
  });

  it('applies size=md', () => {
    render(<Kbd data-testid="kbd" size="md">K</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd.className).toContain('px-1.5');
    expect(kbd.className).toContain('py-0.5');
    expect(kbd.className).toContain('text-xs');
  });

  it('applies size=lg', () => {
    render(<Kbd data-testid="kbd" size="lg">K</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd.className).toContain('px-2');
    expect(kbd.className).toContain('py-1');
    expect(kbd.className).toContain('text-sm');
  });

  // --- Custom className --------------------------------------------------------

  it('applies custom className', () => {
    render(<Kbd data-testid="kbd" className="custom-class">K</Kbd>);
    expect(screen.getByTestId('kbd').className).toContain('custom-class');
  });

  // --- Ref forwarding ----------------------------------------------------------

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Kbd ref={ref}>K</Kbd>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('KBD');
  });

  // --- HTML Attributes ---------------------------------------------------------

  it('passes through HTML attributes', () => {
    render(<Kbd data-testid="kbd" id="my-kbd" aria-label="Escape-Taste">Esc</Kbd>);
    const kbd = screen.getByTestId('kbd');
    expect(kbd).toHaveAttribute('id', 'my-kbd');
    expect(kbd).toHaveAttribute('aria-label', 'Escape-Taste');
  });

  it('has inline-flex display for inline usage', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    expect(screen.getByTestId('kbd').className).toContain('inline-flex');
  });

  it('has border for definition', () => {
    render(<Kbd data-testid="kbd">K</Kbd>);
    expect(screen.getByTestId('kbd').className).toContain('border');
  });
});
