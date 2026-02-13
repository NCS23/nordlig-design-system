import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Switch, SwitchField } from './Switch';

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

describe('SwitchField', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders switch with label', () => {
    render(<SwitchField label="Notifications" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('associates label with switch via htmlFor', () => {
    render(<SwitchField label="Notifications" id="notif" />);
    const label = screen.getByText('Notifications');
    expect(label).toHaveAttribute('for', 'notif');
  });

  it('renders description', () => {
    render(<SwitchField label="Notif" description="Email on updates" />);
    expect(screen.getByText('Email on updates')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<SwitchField label="Notif" />);
    expect(screen.queryByText('Email')).not.toBeInTheDocument();
  });

  // ─── Interaction ────────────────────────────────────────────────────────

  it('toggles when clicking label', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<SwitchField label="Toggle me" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByText('Toggle me'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  // ─── Layout ─────────────────────────────────────────────────────────────

  it('has justify-between layout', () => {
    render(<SwitchField label="Test" />);
    const container = screen.getByText('Test').closest('div[class*="justify-between"]');
    expect(container).toBeInTheDocument();
  });

  // ─── Token classes ──────────────────────────────────────────────────────

  it('uses token for label color', () => {
    render(<SwitchField label="Test" />);
    expect(screen.getByText('Test')).toHaveClass('text-[var(--color-switch-label)]');
  });

  it('uses token for description color', () => {
    render(<SwitchField label="Test" description="Details" />);
    expect(screen.getByText('Details')).toHaveClass('text-[var(--color-switch-description)]');
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('label has disabled styling when switch is disabled', () => {
    render(<SwitchField label="Test" disabled />);
    expect(screen.getByText('Test')).toHaveClass('opacity-50');
  });
});
