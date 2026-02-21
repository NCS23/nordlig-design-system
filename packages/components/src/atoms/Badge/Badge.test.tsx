import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Badge data-testid="badge">Text</Badge>);
    expect(screen.getByTestId('badge').tagName).toBe('SPAN');
  });

  it('applies default variants (neutral, md)', () => {
    render(<Badge data-testid="badge">Default</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--color-badge-neutral-bg)]');
    expect(badge.className).toContain('text-[var(--color-badge-neutral-text)]');
    expect(badge.className).toContain('border-[var(--color-badge-neutral-border)]');
    expect(badge.className).toContain('px-[var(--sizing-badge-md-padding-x)]');
  });

  it('applies variant=success', () => {
    render(<Badge data-testid="badge" variant="success">OK</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--color-badge-success-bg)]');
    expect(badge.className).toContain('text-[var(--color-badge-success-text)]');
    expect(badge.className).toContain('border-[var(--color-badge-success-border)]');
  });

  it('applies variant=warning', () => {
    render(<Badge data-testid="badge" variant="warning">Warn</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--color-badge-warning-bg)]');
    expect(badge.className).toContain('text-[var(--color-badge-warning-text)]');
  });

  it('applies variant=error', () => {
    render(<Badge data-testid="badge" variant="error">Error</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--color-badge-error-bg)]');
    expect(badge.className).toContain('text-[var(--color-badge-error-text)]');
  });

  it('applies variant=info', () => {
    render(<Badge data-testid="badge" variant="info">Info</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--color-badge-info-bg)]');
    expect(badge.className).toContain('text-[var(--color-badge-info-text)]');
  });

  it('applies size=xs', () => {
    render(<Badge data-testid="badge" size="xs">Tiny</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('px-[var(--sizing-badge-xs-padding-x)]');
    expect(badge.className).toContain('py-[var(--sizing-badge-xs-padding-y)]');
    expect(badge.className).toContain('text-[length:var(--sizing-badge-xs-font-size)]');
  });

  it('applies size=sm', () => {
    render(<Badge data-testid="badge" size="sm">Small</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('px-[var(--sizing-badge-sm-padding-x)]');
    expect(badge.className).toContain('py-[var(--sizing-badge-sm-padding-y)]');
    expect(badge.className).toContain('text-[length:var(--sizing-badge-sm-font-size)]');
  });

  it('applies size=lg', () => {
    render(<Badge data-testid="badge" size="lg">Large</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('px-[var(--sizing-badge-lg-padding-x)]');
    expect(badge.className).toContain('py-[var(--sizing-badge-lg-padding-y)]');
    expect(badge.className).toContain('text-[length:var(--sizing-badge-lg-font-size)]');
  });

  it('applies pill shape radius', () => {
    render(<Badge data-testid="badge">Pill</Badge>);
    expect(screen.getByTestId('badge').className).toContain('rounded-[var(--radius-badge)]');
  });

  it('applies custom className', () => {
    render(<Badge data-testid="badge" className="custom">Text</Badge>);
    expect(screen.getByTestId('badge').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<Badge ref={ref}>Text</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through HTML attributes', () => {
    render(<Badge data-testid="badge" aria-label="Status badge" role="status">Active</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('aria-label', 'Status badge');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('has inline-flex display for inline usage', () => {
    render(<Badge data-testid="badge">Inline</Badge>);
    expect(screen.getByTestId('badge').className).toContain('inline-flex');
  });

  it('has border for definition', () => {
    render(<Badge data-testid="badge">Bordered</Badge>);
    expect(screen.getByTestId('badge').className).toContain('border');
  });
});
