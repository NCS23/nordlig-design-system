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

describe('Input password toggle', () => {
  it('renders toggle button for type=password', () => {
    render(<Input type="password" data-testid="input" />);
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
  });

  it('does not render toggle for other types', () => {
    render(<Input type="text" data-testid="input" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('starts with password hidden', () => {
    render(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('toggles to text on button click', async () => {
    const user = userEvent.setup();
    render(<Input type="password" data-testid="input" />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
  });

  it('toggles back to password on second click', async () => {
    const user = userEvent.setup();
    render(<Input type="password" data-testid="input" />);
    const btn = screen.getByRole('button');
    await user.click(btn);
    await user.click(btn);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('updates aria-label on toggle', async () => {
    const user = userEvent.setup();
    render(<Input type="password" data-testid="input" />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label', 'Show password');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-label', 'Hide password');
  });

  it('wraps input in relative container', () => {
    const { container } = render(<Input type="password" />);
    expect(container.firstChild).toHaveClass('relative');
  });

  it('adds right padding for toggle button', () => {
    render(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId('input').className).toContain('pr-[var(--spacing-input-icon-inset)]');
  });

  it('forwards ref for password input', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<Input ref={ref} type="password" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies error state on password input', () => {
    render(<Input type="password" data-testid="input" error />);
    expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByTestId('input').className).toContain('border-[var(--color-input-border-error)]');
  });
});
