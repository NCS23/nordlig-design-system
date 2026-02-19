import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressField } from './ProgressField';

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
