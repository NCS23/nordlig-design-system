import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders as a switch', () => {
    render(<Switch aria-label="Test" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Switch aria-label="Test" />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
  });

  it('can be defaultChecked', () => {
    render(<Switch aria-label="Test" defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  // ─── Interaction ────────────────────────────────────────────────────────

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Test" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles on Space key', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Test" onCheckedChange={onCheckedChange} />);

    screen.getByRole('switch').focus();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Test" disabled onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('has disabled attribute', () => {
    render(<Switch aria-label="Test" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  // ─── Token classes ──────────────────────────────────────────────────────

  it('uses token for track bg', () => {
    render(<Switch aria-label="Test" />);
    expect(screen.getByRole('switch')).toHaveClass('bg-[var(--color-switch-track-bg)]');
  });

  it('has checked track class', () => {
    render(<Switch aria-label="Test" />);
    expect(screen.getByRole('switch')).toHaveClass('data-[state=checked]:bg-[var(--color-switch-track-bg-checked)]');
  });

  it('renders thumb with token bg', () => {
    render(<Switch aria-label="Test" />);
    const thumb = screen.getByRole('switch').querySelector('span');
    expect(thumb).toHaveClass('bg-[var(--color-switch-thumb-bg)]');
  });

  it('renders thumb with token shadow', () => {
    render(<Switch aria-label="Test" />);
    const thumb = screen.getByRole('switch').querySelector('span');
    expect(thumb).toHaveClass('[box-shadow:var(--shadow-switch-thumb)]');
  });

  // ─── Ref & className ───────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Switch aria-label="Test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Switch aria-label="Test" className="custom-class" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-class');
  });
});
