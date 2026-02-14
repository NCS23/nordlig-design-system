import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders an hr element by default', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').tagName).toBe('HR');
  });

  it('renders a div element when vertical', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);
    expect(screen.getByTestId('sep').tagName).toBe('DIV');
  });

  // ─── Orientation ──────────────────────────────────────────────────────

  it('horizontal has border-t class', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').className).toContain('border-t');
  });

  it('vertical has border-l class', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);
    expect(screen.getByTestId('sep').className).toContain('border-l');
  });

  it('vertical sets aria-orientation to vertical', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('aria-orientation', 'vertical');
  });

  // ─── Accessibility ────────────────────────────────────────────────────

  it('has role=none and aria-hidden when decorative (default)', () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveAttribute('role', 'none');
    expect(sep).toHaveAttribute('aria-hidden', 'true');
  });

  it('has role=separator when not decorative', () => {
    render(<Separator data-testid="sep" decorative={false} />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveAttribute('role', 'separator');
    expect(sep).toHaveAttribute('aria-hidden', 'false');
  });

  it('vertical non-decorative has role=separator with aria-orientation', () => {
    render(<Separator data-testid="sep" orientation="vertical" decorative={false} />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveAttribute('role', 'separator');
    expect(sep).toHaveAttribute('aria-orientation', 'vertical');
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('applies token class for separator color', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').className).toContain('border-[var(--color-separator)]');
  });

  it('applies token class on vertical separator', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);
    expect(screen.getByTestId('sep').className).toContain('border-[var(--color-separator)]');
  });

  // ─── Custom ClassName ─────────────────────────────────────────────────

  it('applies custom className', () => {
    render(<Separator data-testid="sep" className="my-custom-class" />);
    expect(screen.getByTestId('sep').className).toContain('my-custom-class');
  });

  it('applies custom className on vertical', () => {
    render(<Separator data-testid="sep" orientation="vertical" className="my-custom-class" />);
    expect(screen.getByTestId('sep').className).toContain('my-custom-class');
  });

  // ─── HTML Attributes ──────────────────────────────────────────────────

  it('passes through HTML attributes', () => {
    render(<Separator data-testid="sep" id="my-separator" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('id', 'my-separator');
  });

  it('has shrink-0 for flex layout stability', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').className).toContain('shrink-0');
  });
});
