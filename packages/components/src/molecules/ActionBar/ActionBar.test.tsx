import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActionBar } from './ActionBar';

describe('ActionBar', () => {
  it('renders children', () => {
    render(<ActionBar>Bar content</ActionBar>);
    expect(screen.getByText('Bar content')).toBeInTheDocument();
  });

  it('has role="toolbar"', () => {
    render(<ActionBar data-testid="bar">Content</ActionBar>);
    expect(screen.getByTestId('bar')).toHaveAttribute('role', 'toolbar');
  });

  it('is sticky by default', () => {
    render(<ActionBar data-testid="bar">Content</ActionBar>);
    expect(screen.getByTestId('bar').className).toContain('sticky');
    expect(screen.getByTestId('bar').className).toContain('bottom-0');
  });

  it('removes sticky when sticky=false', () => {
    render(
      <ActionBar data-testid="bar" sticky={false}>
        Content
      </ActionBar>
    );
    expect(screen.getByTestId('bar').className).not.toContain('sticky');
  });

  it('applies token-based styles', () => {
    render(<ActionBar data-testid="bar">Content</ActionBar>);
    const el = screen.getByTestId('bar');
    expect(el.className).toContain('bg-[var(--color-actionbar-bg)]');
    expect(el.className).toContain('border-[var(--color-actionbar-border)]');
    expect(el.className).toContain('rounded-t-[var(--radius-actionbar)]');
  });

  it('merges custom className', () => {
    render(
      <ActionBar data-testid="bar" className="custom-class">
        Content
      </ActionBar>
    );
    expect(screen.getByTestId('bar').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ActionBar ref={ref}>Content</ActionBar>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
