import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders as aria-hidden div', () => {
    render(<Spacer data-testid="spacer" />);
    const el = screen.getByTestId('spacer');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders as div element', () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId('spacer').tagName).toBe('DIV');
  });

  it('applies default size', () => {
    render(<Spacer data-testid="spacer" />);
    const cls = screen.getByTestId('spacer').className;
    expect(cls).toContain('shrink-0');
  });

  it('applies sm size', () => {
    render(<Spacer size="sm" data-testid="spacer" />);
    expect(screen.getByTestId('spacer').className).toContain('h-');
  });

  it('applies xl size', () => {
    render(<Spacer size="xl" data-testid="spacer" />);
    expect(screen.getByTestId('spacer').className).toContain('h-');
  });

  it('applies grow', () => {
    render(<Spacer grow={true} data-testid="spacer" />);
    expect(screen.getByTestId('spacer').className).toContain('grow');
  });

  it('does not grow by default', () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId('spacer').className).not.toContain('grow');
  });

  it('merges custom className', () => {
    render(<Spacer className="extra" data-testid="spacer" />);
    expect(screen.getByTestId('spacer').className).toContain('extra');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Spacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
