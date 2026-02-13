import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

function renderRadioGroup(props?: {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
}) {
  return render(
    <RadioGroup
      aria-label="Test Group"
      value={props?.value}
      onValueChange={props?.onValueChange}
      orientation={props?.orientation}
      disabled={props?.disabled}
    >
      <RadioGroupItem value="a" label="Option A" />
      <RadioGroupItem value="b" label="Option B" />
      <RadioGroupItem value="c" label="Option C" disabled />
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders a radiogroup', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all radio items', () => {
    renderRadioGroup();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders labels', () => {
    renderRadioGroup();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('has aria-label on group', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Test Group');
  });

  // ─── Selection ──────────────────────────────────────────────────────────

  it('selects on click', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderRadioGroup({ onValueChange });

    await user.click(screen.getByText('Option A'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('shows selected state', () => {
    renderRadioGroup({ value: 'b' });
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('data-state', 'checked');
  });

  it('shows unselected state', () => {
    renderRadioGroup({ value: 'b' });
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('data-state', 'unchecked');
  });

  // ─── Keyboard Navigation ───────────────────────────────────────────────

  it('supports keyboard focus on radio items', () => {
    renderRadioGroup({ value: 'a' });
    const firstRadio = screen.getAllByRole('radio')[0];
    firstRadio.focus();
    expect(document.activeElement).toBe(firstRadio);
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('disables individual items', () => {
    renderRadioGroup();
    const radios = screen.getAllByRole('radio');
    expect(radios[2]).toBeDisabled();
  });

  it('does not select disabled items', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderRadioGroup({ onValueChange });

    await user.click(screen.getByText('Option C'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  // ─── Orientation ────────────────────────────────────────────────────────

  it('defaults to vertical layout', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toHaveClass('flex-col');
  });

  it('supports horizontal layout', () => {
    renderRadioGroup({ orientation: 'horizontal' });
    expect(screen.getByRole('radiogroup')).toHaveClass('flex-row');
  });

  // ─── Token classes ──────────────────────────────────────────────────────

  it('uses token for radio border', () => {
    renderRadioGroup();
    const radio = screen.getAllByRole('radio')[0];
    expect(radio).toHaveClass('border-[var(--color-radio-border)]');
  });

  it('uses token for radio bg', () => {
    renderRadioGroup();
    const radio = screen.getAllByRole('radio')[0];
    expect(radio).toHaveClass('bg-[var(--color-radio-bg)]');
  });

  it('uses token for checked border', () => {
    renderRadioGroup();
    const radio = screen.getAllByRole('radio')[0];
    expect(radio).toHaveClass('data-[state=checked]:border-[var(--color-radio-selected-border)]');
  });

  it('uses token for label color', () => {
    renderRadioGroup();
    expect(screen.getByText('Option A')).toHaveClass('text-[var(--color-radio-label)]');
  });

  it('uses token for item row rounding', () => {
    renderRadioGroup();
    const itemRow = screen.getByText('Option A').closest('div[class*="rounded"]');
    expect(itemRow).toHaveClass('rounded-[var(--radius-radio-item)]');
  });
});

describe('RadioGroupItem', () => {
  it('renders with description', () => {
    render(
      <RadioGroup aria-label="Test">
        <RadioGroupItem value="a" label="Option" description="Some details" />
      </RadioGroup>
    );
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });

  it('uses token for description color', () => {
    render(
      <RadioGroup aria-label="Test">
        <RadioGroupItem value="a" label="Option" description="Details" />
      </RadioGroup>
    );
    expect(screen.getByText('Details')).toHaveClass('text-[var(--color-radio-description)]');
  });

  it('renders children as label', () => {
    render(
      <RadioGroup aria-label="Test">
        <RadioGroupItem value="a">Child Label</RadioGroupItem>
      </RadioGroup>
    );
    expect(screen.getByText('Child Label')).toBeInTheDocument();
  });
});
