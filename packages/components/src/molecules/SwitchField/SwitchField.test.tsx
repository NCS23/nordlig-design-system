import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SwitchField } from './SwitchField';

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
