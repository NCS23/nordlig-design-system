import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Radio label="Option A" description="Some details" />);
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });

  it('links description via aria-describedby', () => {
    render(<Radio label="Option A" description="Some details" />);
    const radio = screen.getByRole('radio');
    const descId = radio.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    expect(screen.getByText('Some details')).toHaveAttribute('id', descId);
  });

  it('does not set aria-describedby without description', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByRole('radio')).not.toHaveAttribute('aria-describedby');
  });

  it('does not render description without label', () => {
    render(<Radio description="Some details" />);
    expect(screen.queryByText('Some details')).not.toBeInTheDocument();
  });

  // ─── States ─────────────────────────────────────────────────────────────

  it('handles checked state', () => {
    render(<Radio checked readOnly />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('handles unchecked state', () => {
    render(<Radio checked={false} readOnly />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('handles disabled state', () => {
    render(<Radio disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Radio ref={ref} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  // ─── ID Generation ────────────────────────────────────────────────────

  it('generates accessible id when none provided', () => {
    render(<Radio label="Auto ID" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('id');
    // Outer <label> has htmlFor pointing to the radio input
    const outerLabel = radio.closest('label');
    expect(outerLabel).toHaveAttribute('for', radio.getAttribute('id'));
  });

  it('uses provided id', () => {
    render(<Radio id="custom-id" label="Custom" />);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'custom-id');
  });

  // ─── Interaction ──────────────────────────────────────────────────────

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio onChange={onChange} />);

    await user.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio onChange={onChange} disabled />);

    await user.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ─── Name & Value ─────────────────────────────────────────────────────

  it('supports name prop', () => {
    render(<Radio name="group1" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'group1');
  });

  it('supports value prop', () => {
    render(<Radio value="option-a" />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'option-a');
  });

  // ─── ClassName ────────────────────────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<Radio className="my-custom-class" />);
    expect(container.firstElementChild).toHaveClass('my-custom-class');
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('uses token for item row rounding', () => {
    const { container } = render(<Radio />);
    expect(container.firstElementChild).toHaveClass('rounded-[var(--radius-radio-item)]');
  });

  it('uses token for item gap', () => {
    const { container } = render(<Radio />);
    expect(container.firstElementChild).toHaveClass('gap-[var(--spacing-radio-item-gap)]');
  });

  it('uses token for label color', () => {
    render(<Radio label="Labeled" />);
    expect(screen.getByText('Labeled')).toHaveClass('text-[var(--color-radio-label)]');
  });

  it('uses token for description color', () => {
    render(<Radio label="Labeled" description="Desc" />);
    expect(screen.getByText('Desc')).toHaveClass('text-[var(--color-radio-description)]');
  });
});
