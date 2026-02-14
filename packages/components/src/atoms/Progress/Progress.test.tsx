import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress, ProgressField } from './Progress';

describe('Progress', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders with role="progressbar"', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has correct aria-valuenow', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('has correct aria-valuemax', () => {
    render(<Progress value={30} max={200} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuemax', '200');
  });

  it('defaults max to 100', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  // ─── Size Variants ─────────────────────────────────────────────────────

  it('applies size=sm', () => {
    render(<Progress data-testid="progress" value={50} size="sm" />);
    expect(screen.getByTestId('progress').className).toContain('h-[var(--sizing-progress-sm-height)]');
  });

  it('applies size=md by default', () => {
    render(<Progress data-testid="progress" value={50} />);
    expect(screen.getByTestId('progress').className).toContain('h-[var(--sizing-progress-md-height)]');
  });

  it('applies size=lg', () => {
    render(<Progress data-testid="progress" value={50} size="lg" />);
    expect(screen.getByTestId('progress').className).toContain('h-[var(--sizing-progress-lg-height)]');
  });

  // ─── Color Variants ────────────────────────────────────────────────────

  it('applies default color (primary)', () => {
    render(<Progress data-testid="progress" value={50} />);
    const indicator = screen.getByTestId('progress').firstChild as HTMLElement;
    expect(indicator.className).toContain('bg-[var(--color-progress-fill)]');
  });

  it('applies color=success', () => {
    render(<Progress data-testid="progress" value={50} color="success" />);
    const indicator = screen.getByTestId('progress').firstChild as HTMLElement;
    expect(indicator.className).toContain('bg-[var(--color-progress-fill-success)]');
  });

  it('applies color=warning', () => {
    render(<Progress data-testid="progress" value={50} color="warning" />);
    const indicator = screen.getByTestId('progress').firstChild as HTMLElement;
    expect(indicator.className).toContain('bg-[var(--color-progress-fill-warning)]');
  });

  it('applies color=error', () => {
    render(<Progress data-testid="progress" value={50} color="error" />);
    const indicator = screen.getByTestId('progress').firstChild as HTMLElement;
    expect(indicator.className).toContain('bg-[var(--color-progress-fill-error)]');
  });

  // ─── Indeterminate ─────────────────────────────────────────────────────

  it('renders indeterminate mode', () => {
    render(<Progress data-testid="progress" indeterminate />);
    const indicator = screen.getByTestId('progress').firstChild as HTMLElement;
    expect(indicator.className).toContain('animate-progress-indeterminate');
  });

  it('does not set aria-valuenow when indeterminate', () => {
    render(<Progress indeterminate />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  // ─── Token Classes ─────────────────────────────────────────────────────

  it('applies track token class', () => {
    render(<Progress data-testid="progress" value={50} />);
    expect(screen.getByTestId('progress').className).toContain('bg-[var(--color-progress-track)]');
  });

  it('applies radius token class', () => {
    render(<Progress data-testid="progress" value={50} />);
    expect(screen.getByTestId('progress').className).toContain('rounded-[var(--radius-progress)]');
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('applies custom className', () => {
    render(<Progress data-testid="progress" value={50} className="custom" />);
    expect(screen.getByTestId('progress').className).toContain('custom');
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('ProgressField', () => {
  // ─── Label & Value ─────────────────────────────────────────────────────

  it('renders label text', () => {
    render(<ProgressField label="Fortschritt" value={50} />);
    expect(screen.getByText('Fortschritt')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<ProgressField label="Fortschritt" value={75} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not show value when showValue is false', () => {
    render(<ProgressField label="Fortschritt" value={75} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('uses custom valueFormat', () => {
    render(
      <ProgressField
        label="Kilometer"
        value={30}
        max={40}
        showValue
        valueFormat={(v, m) => `${v}/${m} km`}
      />
    );
    expect(screen.getByText('30/40 km')).toBeInTheDocument();
  });

  it('renders progress bar inside', () => {
    render(<ProgressField label="Fortschritt" value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies label token classes', () => {
    render(<ProgressField label="Fortschritt" value={50} />);
    const label = screen.getByText('Fortschritt');
    expect(label.className).toContain('text-[var(--color-progress-label)]');
  });

  it('applies value token classes', () => {
    render(<ProgressField label="Fortschritt" value={50} showValue />);
    const value = screen.getByText('50%');
    expect(value.className).toContain('text-[var(--color-progress-value)]');
  });
});
