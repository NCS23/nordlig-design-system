import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

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
