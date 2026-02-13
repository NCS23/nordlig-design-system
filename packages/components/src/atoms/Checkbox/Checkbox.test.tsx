import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox, CheckboxField } from './Checkbox';

describe('Checkbox', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders as a checkbox', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('can be defaultChecked', () => {
    render(<Checkbox aria-label="Test" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  // ─── Interaction ────────────────────────────────────────────────────────

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Test" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles on Space key', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Test" onCheckedChange={onCheckedChange} />);

    screen.getByRole('checkbox').focus();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Test" disabled onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('has disabled attribute', () => {
    render(<Checkbox aria-label="Test" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  // ─── Token classes ──────────────────────────────────────────────────────

  it('uses token for background', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox')).toHaveClass('bg-[var(--color-checkbox-bg)]');
  });

  it('uses token for border', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox')).toHaveClass('border-[var(--color-checkbox-border)]');
  });

  it('uses token for radius', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox')).toHaveClass('rounded-[var(--radius-checkbox)]');
  });

  it('has checked state classes', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox')).toHaveClass('data-[state=checked]:bg-[var(--color-checkbox-checked-bg)]');
  });

  // ─── Ref & className ───────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Checkbox aria-label="Test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Checkbox aria-label="Test" className="custom-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });
});

describe('CheckboxField', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders checkbox with label', () => {
    render(<CheckboxField label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('associates label with checkbox via htmlFor', () => {
    render(<CheckboxField label="Accept terms" id="terms" />);
    const label = screen.getByText('Accept terms');
    expect(label).toHaveAttribute('for', 'terms');
  });

  it('renders description', () => {
    render(<CheckboxField label="Accept" description="Required for registration" />);
    expect(screen.getByText('Required for registration')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<CheckboxField label="Accept" />);
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  // ─── Interaction ────────────────────────────────────────────────────────

  it('toggles when clicking label', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<CheckboxField label="Accept" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByText('Accept'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  // ─── Token classes ──────────────────────────────────────────────────────

  it('uses token for label color', () => {
    render(<CheckboxField label="Accept" />);
    expect(screen.getByText('Accept')).toHaveClass('text-[var(--color-checkbox-label)]');
  });

  it('uses token for description color', () => {
    render(<CheckboxField label="Accept" description="Details" />);
    expect(screen.getByText('Details')).toHaveClass('text-[var(--color-checkbox-description)]');
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('label has disabled styling when checkbox is disabled', () => {
    render(<CheckboxField label="Accept" disabled />);
    expect(screen.getByText('Accept')).toHaveClass('opacity-50');
  });
});
