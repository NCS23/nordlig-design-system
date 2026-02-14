import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders an SVG element', () => {
    render(<Spinner data-testid="spinner" />);
    const el = screen.getByTestId('spinner');
    expect(el.tagName).toBe('svg');
  });

  it('has role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label "Laden"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Laden');
  });

  it('uses custom aria-label from label prop', () => {
    render(<Spinner label="Daten laden" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Daten laden');
  });

  // ─── Size Variants ─────────────────────────────────────────────────────

  it('applies size=sm', () => {
    render(<Spinner data-testid="spinner" size="sm" />);
    const el = screen.getByTestId('spinner');
    expect(el.getAttribute('class')).toContain('w-[var(--sizing-spinner-sm)]');
    expect(el.getAttribute('class')).toContain('h-[var(--sizing-spinner-sm)]');
  });

  it('applies size=md by default', () => {
    render(<Spinner data-testid="spinner" />);
    const el = screen.getByTestId('spinner');
    expect(el.getAttribute('class')).toContain('w-[var(--sizing-spinner-md)]');
    expect(el.getAttribute('class')).toContain('h-[var(--sizing-spinner-md)]');
  });

  it('applies size=lg', () => {
    render(<Spinner data-testid="spinner" size="lg" />);
    const el = screen.getByTestId('spinner');
    expect(el.getAttribute('class')).toContain('w-[var(--sizing-spinner-lg)]');
  });

  it('applies size=xl', () => {
    render(<Spinner data-testid="spinner" size="xl" />);
    const el = screen.getByTestId('spinner');
    expect(el.getAttribute('class')).toContain('w-[var(--sizing-spinner-xl)]');
  });

  // ─── Token Classes ─────────────────────────────────────────────────────

  it('has animate-spin class', () => {
    render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId('spinner').getAttribute('class')).toContain('animate-spin');
  });

  it('uses token-based stroke colors on circles', () => {
    render(<Spinner data-testid="spinner" />);
    const svg = screen.getByTestId('spinner');
    const circles = svg.querySelectorAll('circle');
    expect(circles[0]).toHaveAttribute('stroke', 'var(--color-spinner-track)');
    expect(circles[1]).toHaveAttribute('stroke', 'var(--color-spinner-primary)');
  });

  // ─── Label ─────────────────────────────────────────────────────────────

  it('renders label text when provided', () => {
    render(<Spinner label="Lädt..." />);
    expect(screen.getByText('Lädt...')).toBeInTheDocument();
  });

  it('wraps in span when label is provided', () => {
    render(<Spinner label="Lädt..." />);
    const label = screen.getByText('Lädt...');
    expect(label.parentElement?.tagName).toBe('SPAN');
  });

  it('applies label token class', () => {
    render(<Spinner label="Lädt..." />);
    const label = screen.getByText('Lädt...');
    expect(label.className).toContain('text-[var(--color-spinner-label)]');
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('applies custom className', () => {
    render(<Spinner data-testid="spinner" className="custom" />);
    expect(screen.getByTestId('spinner').getAttribute('class')).toContain('custom');
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<SVGSVGElement>;
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
