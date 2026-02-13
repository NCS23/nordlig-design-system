import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').tagName).toBe('INPUT');
  });

  it('applies default size (md) classes', () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('h-[var(--sizing-input-md-height)]');
    expect(input.className).toContain('text-[length:var(--sizing-input-md-font-size)]');
    expect(input.className).toContain('rounded-[var(--sizing-input-md-radius)]');
  });

  it('applies sm size classes', () => {
    render(<Input data-testid="input" inputSize="sm" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('h-[var(--sizing-input-sm-height)]');
    expect(input.className).toContain('text-[length:var(--sizing-input-sm-font-size)]');
  });

  it('applies lg size classes', () => {
    render(<Input data-testid="input" inputSize="lg" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('h-[var(--sizing-input-lg-height)]');
    expect(input.className).toContain('text-[length:var(--sizing-input-lg-font-size)]');
  });

  it('applies default border when no error', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('border-[var(--color-input-border)]');
  });

  it('applies error border when error=true', () => {
    render(<Input data-testid="input" error />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('border-[var(--color-input-border-error)]');
  });

  it('sets aria-invalid when error=true', () => {
    render(<Input data-testid="input" error />);
    expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when no error', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input')).not.toHaveAttribute('aria-invalid');
  });

  it('has background token class', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('bg-[var(--color-input-bg)]');
  });

  it('has text color token class', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('text-[var(--color-input-text)]');
  });

  it('has placeholder color class', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('placeholder:text-[var(--color-input-text-placeholder)]');
  });

  it('has hover border class', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('hover:border-[var(--color-input-border-hover)]');
  });

  it('has focus ring classes', () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('focus-visible:ring-2');
    expect(input.className).toContain('focus-visible:ring-[var(--color-input-border-focus)]');
  });

  it('has disabled styling classes', () => {
    render(<Input data-testid="input" disabled />);
    const input = screen.getByTestId('input');
    expect(input.className).toContain('disabled:cursor-not-allowed');
    expect(input.className).toContain('disabled:bg-[var(--color-input-bg-disabled)]');
  });

  it('accepts text input', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input');
    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('supports placeholder', () => {
    render(<Input data-testid="input" placeholder="Type here..." />);
    expect(screen.getByTestId('input')).toHaveAttribute('placeholder', 'Type here...');
  });

  it('supports type attribute', () => {
    render(<Input data-testid="input" type="email" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
  });

  it('applies custom className', () => {
    render(<Input data-testid="input" className="custom" />);
    expect(screen.getByTestId('input').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('is full width', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('w-full');
  });

  it('has padding-x from spacing token', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('px-[var(--spacing-input-padding-x)]');
  });
});
