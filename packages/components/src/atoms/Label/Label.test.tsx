import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  // --- Rendering ---------------------------------------------------------------

  it('renders children', () => {
    render(<Label>Benutzername</Label>);
    expect(screen.getByText('Benutzername')).toBeInTheDocument();
  });

  it('renders as a label element', () => {
    render(<Label data-testid="label">Text</Label>);
    expect(screen.getByTestId('label').tagName).toBe('LABEL');
  });

  it('applies base text styling', () => {
    render(<Label data-testid="label">Text</Label>);
    const label = screen.getByTestId('label');
    expect(label.className).toContain('text-[length:var(--font-label-size)]');
    expect(label.className).toContain('[font-weight:var(--font-label-weight)]');
    expect(label.className).toContain('text-[var(--color-text-base)]');
  });

  // --- Required ----------------------------------------------------------------

  it('shows required asterisk when required is true', () => {
    render(<Label required>Pflichtfeld</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('required asterisk has aria-hidden', () => {
    render(<Label required>Pflichtfeld</Label>);
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('required asterisk has error color class', () => {
    render(<Label required>Pflichtfeld</Label>);
    const asterisk = screen.getByText('*');
    expect(asterisk.className).toContain('text-[var(--color-text-error)]');
    expect(asterisk.className).toContain('ml-0.5');
  });

  it('does not show asterisk when required is false', () => {
    render(<Label data-testid="label">Optional</Label>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  // --- Disabled ----------------------------------------------------------------

  it('applies disabled styles when disabled', () => {
    render(<Label data-testid="label" disabled>Deaktiviert</Label>);
    const label = screen.getByTestId('label');
    expect(label.className).toContain('opacity-50');
    expect(label.className).toContain('cursor-not-allowed');
  });

  it('does not apply disabled styles when not disabled', () => {
    render(<Label data-testid="label">Aktiv</Label>);
    const label = screen.getByTestId('label');
    expect(label.className).not.toContain('opacity-50');
    expect(label.className).not.toContain('cursor-not-allowed');
  });

  // --- htmlFor -----------------------------------------------------------------

  it('applies htmlFor attribute', () => {
    render(<Label data-testid="label" htmlFor="email-input">E-Mail</Label>);
    expect(screen.getByTestId('label')).toHaveAttribute('for', 'email-input');
  });

  // --- Custom className --------------------------------------------------------

  it('applies custom className', () => {
    render(<Label data-testid="label" className="custom-class">Text</Label>);
    expect(screen.getByTestId('label').className).toContain('custom-class');
  });

  // --- Ref forwarding ----------------------------------------------------------

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLLabelElement>;
    render(<Label ref={ref}>Text</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  // --- HTML Attributes ---------------------------------------------------------

  it('passes through HTML attributes', () => {
    render(<Label data-testid="label" id="my-label" aria-describedby="help">Text</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('id', 'my-label');
    expect(label).toHaveAttribute('aria-describedby', 'help');
  });

  // --- Combined states ---------------------------------------------------------

  it('shows required asterisk and disabled styles together', () => {
    render(<Label data-testid="label" required disabled>Pflichtfeld</Label>);
    const label = screen.getByTestId('label');
    expect(label.className).toContain('opacity-50');
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
