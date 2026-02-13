import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Notizen eingeben…" />);
    expect(screen.getByPlaceholderText('Notizen eingeben…')).toBeInTheDocument();
  });

  it('renders label with htmlFor', () => {
    render(<Textarea label="Notizen" />);
    const label = screen.getByText('Notizen');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for');
    const textarea = screen.getByRole('textbox');
    expect(textarea.id).toBe(label.getAttribute('for'));
  });

  it('renders custom id', () => {
    render(<Textarea id="my-textarea" label="Test" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-textarea');
    expect(screen.getByText('Test')).toHaveAttribute('for', 'my-textarea');
  });

  it('sets default rows to 4', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });

  it('accepts custom rows', () => {
    render(<Textarea rows={6} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
  });

  it('applies min-height class', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox').className).toContain('min-h-[var(--sizing-textarea-min-height)]');
  });

  // ─── Size Variants ──────────────────────────────────────────────────────

  it('renders sm size', () => {
    render(<Textarea inputSize="sm" />);
    expect(screen.getByRole('textbox').className).toContain('text-[length:var(--sizing-input-sm-font-size)]');
  });

  it('renders md size (default)', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox').className).toContain('text-[length:var(--sizing-input-md-font-size)]');
  });

  it('renders lg size', () => {
    render(<Textarea inputSize="lg" />);
    expect(screen.getByRole('textbox').className).toContain('text-[length:var(--sizing-input-lg-font-size)]');
  });

  // ─── States ─────────────────────────────────────────────────────────────

  it('applies error border', () => {
    render(<Textarea error />);
    expect(screen.getByRole('textbox').className).toContain('border-[var(--color-input-border-error)]');
  });

  it('applies error automatically with errorMessage', () => {
    render(<Textarea errorMessage="Pflichtfeld" />);
    expect(screen.getByRole('textbox').className).toContain('border-[var(--color-input-border-error)]');
  });

  it('shows error message', () => {
    render(<Textarea errorMessage="Pflichtfeld" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Pflichtfeld');
  });

  it('shows helper text', () => {
    render(<Textarea helperText="Max. 500 Zeichen" />);
    expect(screen.getByText('Max. 500 Zeichen')).toBeInTheDocument();
  });

  it('error message replaces helper text', () => {
    render(<Textarea helperText="Hilfe" errorMessage="Fehler" />);
    expect(screen.getByText('Fehler')).toBeInTheDocument();
    expect(screen.queryByText('Hilfe')).not.toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets aria-invalid on error', () => {
    render(<Textarea error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby for error', () => {
    render(<Textarea id="ta" errorMessage="Fehler" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('ta-error'));
  });

  it('sets aria-describedby for helper', () => {
    render(<Textarea id="ta" helperText="Hilfe" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('ta-helper'));
  });

  // ─── Character Counter ──────────────────────────────────────────────────

  it('shows character counter when showCounter is true', () => {
    render(<Textarea showCounter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('shows counter with maxLength format', () => {
    render(<Textarea showCounter maxLength={500} />);
    expect(screen.getByText('0/500')).toBeInTheDocument();
  });

  it('updates counter on typing', async () => {
    const user = userEvent.setup();
    render(<Textarea showCounter maxLength={500} />);
    await user.type(screen.getByRole('textbox'), 'Hello');
    expect(screen.getByText('5/500')).toBeInTheDocument();
  });

  it('counter turns red over maxLength', async () => {
    const user = userEvent.setup();
    render(<Textarea showCounter maxLength={5} />);
    await user.type(screen.getByRole('textbox'), 'Hello World');
    const counter = screen.getByText('11/5');
    expect(counter.className).toContain('text-[var(--color-textarea-counter-text-over)]');
  });

  it('counter has normal style under maxLength', async () => {
    const user = userEvent.setup();
    render(<Textarea showCounter maxLength={100} />);
    await user.type(screen.getByRole('textbox'), 'Hi');
    const counter = screen.getByText('2/100');
    expect(counter.className).toContain('text-[var(--color-textarea-counter-text)]');
  });

  it('counter has aria-live for screen readers', () => {
    render(<Textarea showCounter />);
    const counter = screen.getByText('0');
    expect(counter).toHaveAttribute('aria-live', 'polite');
  });

  it('includes counter in aria-describedby', () => {
    render(<Textarea id="ta" showCounter />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', expect.stringContaining('ta-counter'));
  });

  it('shows counter without maxLength', async () => {
    const user = userEvent.setup();
    render(<Textarea showCounter />);
    await user.type(screen.getByRole('textbox'), 'Test');
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  // ─── Auto Resize ────────────────────────────────────────────────────────

  it('applies resize-y by default', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox').className).toContain('resize-y');
  });

  it('applies resize-none with autoResize', () => {
    render(<Textarea autoResize />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toContain('resize-none');
    expect(textarea.className).toContain('overflow-hidden');
  });

  // ─── User Interaction ───────────────────────────────────────────────────

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('displays controlled value', () => {
    render(<Textarea value="Controlled" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('Controlled');
  });

  it('initializes counter from value prop', () => {
    render(<Textarea value="Hello" showCounter onChange={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('initializes counter from defaultValue', () => {
    render(<Textarea defaultValue="Default" showCounter />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  // ─── Ref / ClassName ────────────────────────────────────────────────────

  it('forwards ref to textarea', () => {
    const ref = { current: null } as React.RefObject<HTMLTextAreaElement>;
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies custom className to textarea', () => {
    render(<Textarea className="my-textarea" />);
    expect(screen.getByRole('textbox').className).toContain('my-textarea');
  });

  it('applies w-full for full width', () => {
    const { container } = render(<Textarea />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('w-full');
  });
});
