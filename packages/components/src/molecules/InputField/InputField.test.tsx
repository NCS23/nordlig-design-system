import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders an input element', () => {
    render(<InputField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label linked to input', () => {
    render(<InputField label="Name" />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('label has token-based font weight', () => {
    render(<InputField label="Name" />);
    const label = screen.getByText('Name');
    expect(label.tagName).toBe('LABEL');
    expect(label.className).toContain('[font-weight:var(--font-inputfield-label-weight)]');
  });

  it('renders helper text', () => {
    render(<InputField helperText="Enter your name" />);
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  it('helper text has muted color', () => {
    render(<InputField helperText="Help" />);
    expect(screen.getByText('Help').className).toContain('text-[var(--color-text-muted)]');
  });

  it('renders error message', () => {
    render(<InputField errorMessage="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('error message has error color', () => {
    render(<InputField errorMessage="Error" />);
    expect(screen.getByText('Error').className).toContain('text-[var(--color-text-error)]');
  });

  it('error message has role=alert', () => {
    render(<InputField errorMessage="Error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error');
  });

  it('shows error message instead of helper when both provided', () => {
    render(<InputField helperText="Help" errorMessage="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });

  it('sets error state on Input when errorMessage provided', () => {
    render(<InputField errorMessage="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets error state on Input when error=true', () => {
    render(<InputField error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('links input to error via aria-describedby', () => {
    render(<InputField id="test" errorMessage="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-error');
  });

  it('links input to helper via aria-describedby', () => {
    render(<InputField id="test" helperText="Help" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-helper');
  });

  it('passes inputSize to Input', () => {
    render(<InputField inputSize="lg" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('h-[var(--sizing-input-lg-height)]');
  });

  it('passes placeholder to Input', () => {
    render(<InputField placeholder="Type..." />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Type...');
  });

  it('forwards ref to input', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<InputField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses provided id', () => {
    render(<InputField id="my-input" label="Name" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('id', 'my-input');
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(<InputField className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
