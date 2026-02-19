import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CheckboxField } from './CheckboxField';

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
