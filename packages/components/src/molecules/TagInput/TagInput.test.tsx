import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagInput } from './TagInput';

describe('TagInput', () => {
  // --- Rendering ---------------------------------------------------------------

  it('renders with placeholder', () => {
    render(<TagInput placeholder="Add tag" />);
    expect(screen.getByPlaceholderText('Add tag')).toBeInTheDocument();
  });

  it('renders as a div container', () => {
    render(<TagInput data-testid="taginput" />);
    expect(screen.getByTestId('taginput').tagName).toBe('DIV');
  });

  it('renders default tags from defaultValue', () => {
    render(<TagInput defaultValue={['React', 'Vue']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  it('renders controlled tags from value', () => {
    render(<TagInput value={['TypeScript']} onChange={() => {}} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<TagInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<TagInput data-testid="taginput" className="custom-class" />);
    expect(screen.getByTestId('taginput').className).toContain('custom-class');
  });

  it('applies base token classes', () => {
    render(<TagInput data-testid="taginput" />);
    const el = screen.getByTestId('taginput');
    expect(el.className).toContain('p-[var(--spacing-taginput-padding)]');
    expect(el.className).toContain('rounded-[var(--radius-taginput)]');
    expect(el.className).toContain('bg-[var(--color-taginput-bg)]');
    expect(el.className).toContain('border-[var(--color-taginput-border)]');
    expect(el.className).toContain('gap-[var(--spacing-taginput-gap)]');
  });

  // --- Tag Creation ------------------------------------------------------------

  it('creates tag on Enter', () => {
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['React']);
  });

  it('clears input after creating tag', () => {
    render(<TagInput />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('');
  });

  it('does not create empty tags', () => {
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('creates tag with custom delimiter', () => {
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} delimiters={['Tab']} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Tab' });
    expect(onChange).toHaveBeenCalledWith(['React']);
  });

  it('trims whitespace from tags', () => {
    const onChange = vi.fn();
    render(<TagInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  React  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['React']);
  });

  // --- Tag Removal -------------------------------------------------------------

  it('removes tag via remove button', () => {
    const onChange = vi.fn();
    render(<TagInput value={['React', 'Vue']} onChange={onChange} />);
    const removeButtons = screen.getAllByLabelText('Tag entfernen');
    fireEvent.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(['Vue']);
  });

  it('removes last tag on Backspace when input is empty', () => {
    const onChange = vi.fn();
    render(<TagInput value={['React', 'Vue']} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith(['React']);
  });

  it('does not remove tag on Backspace when input has text', () => {
    const onChange = vi.fn();
    render(<TagInput value={['React']} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'text' } });
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange).not.toHaveBeenCalled();
  });

  // --- Constraints -------------------------------------------------------------

  it('respects maxTags limit', () => {
    const onChange = vi.fn();
    render(<TagInput defaultValue={['React', 'Vue']} maxTags={2} onChange={onChange} />);
    // Input should be hidden at limit
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('prevents duplicates by default', () => {
    const onChange = vi.fn();
    render(<TagInput value={['React']} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('allows duplicates when allowDuplicates is true', () => {
    const onChange = vi.fn();
    render(<TagInput value={['React']} onChange={onChange} allowDuplicates />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['React', 'React']);
  });

  it('validates with custom function — rejection', () => {
    const onChange = vi.fn();
    const validate = (tag: string) => tag.length >= 2;
    render(<TagInput onChange={onChange} validate={validate} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('validates with custom function — acceptance', () => {
    const onChange = vi.fn();
    const validate = (tag: string) => tag.length >= 2;
    render(<TagInput onChange={onChange} validate={validate} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['ab']);
  });

  // --- States ------------------------------------------------------------------

  it('applies disabled state', () => {
    render(<TagInput data-testid="taginput" disabled />);
    const container = screen.getByTestId('taginput');
    expect(container.className).toContain('cursor-not-allowed');
    expect(container.className).toContain('opacity-50');
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('does not create tags when disabled', () => {
    const onChange = vi.fn();
    render(<TagInput disabled onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not show remove buttons when disabled', () => {
    render(<TagInput value={['React']} disabled onChange={() => {}} />);
    expect(screen.queryByLabelText('Tag entfernen')).not.toBeInTheDocument();
  });

  it('applies error state styling', () => {
    render(<TagInput data-testid="taginput" error />);
    const container = screen.getByTestId('taginput');
    expect(container.className).toContain('border-[var(--color-taginput-border-error)]');
  });

  it('sets aria-invalid when error', () => {
    render(<TagInput data-testid="taginput" error placeholder="Add tag" />);
    expect(screen.getByLabelText('Add tag')).toHaveAttribute('aria-invalid', 'true');
  });

  // --- Focus -------------------------------------------------------------------

  it('focuses input when container is clicked', () => {
    render(<TagInput data-testid="taginput" />);
    fireEvent.click(screen.getByTestId('taginput'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  // --- Uncontrolled mode -------------------------------------------------------

  it('works in uncontrolled mode', () => {
    render(<TagInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  // --- Placeholder behavior ----------------------------------------------------

  it('hides placeholder when tags exist', () => {
    render(<TagInput defaultValue={['React']} placeholder="Add tag" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.placeholder).toBe('');
  });

  it('shows placeholder when no tags', () => {
    render(<TagInput placeholder="Add tag" />);
    expect(screen.getByPlaceholderText('Add tag')).toBeInTheDocument();
  });

  // --- Accessibility -----------------------------------------------------------

  it('has aria-live region for screenreaders', () => {
    render(<TagInput />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('input has aria-label', () => {
    render(<TagInput placeholder="Tags eingeben" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Tags eingeben');
  });

  // --- HTML attributes ---------------------------------------------------------

  it('passes through HTML attributes', () => {
    render(<TagInput data-testid="taginput" id="my-tags" />);
    expect(screen.getByTestId('taginput')).toHaveAttribute('id', 'my-tags');
  });
});
