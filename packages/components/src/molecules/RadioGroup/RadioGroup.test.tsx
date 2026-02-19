import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../../atoms/Radio';

function renderRadioGroup(props?: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
}) {
  return render(
    <RadioGroup
      aria-label="Test Group"
      name="test-group"
      value={props?.value}
      defaultValue={props?.defaultValue}
      onValueChange={props?.onValueChange}
      orientation={props?.orientation}
      disabled={props?.disabled}
    >
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" disabled />
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

  it('has aria-orientation defaulting to vertical', () => {
    renderRadioGroup();
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('has aria-orientation horizontal when set', () => {
    renderRadioGroup({ orientation: 'horizontal' });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  // ─── Selection (Controlled) ───────────────────────────────────────────

  it('selects on click', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderRadioGroup({ onValueChange });

    await user.click(screen.getByText('Option A'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('shows selected state (controlled)', () => {
    renderRadioGroup({ value: 'b' });
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toBeChecked();
  });

  it('shows unselected state (controlled)', () => {
    renderRadioGroup({ value: 'b' });
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
  });

  // ─── Selection (Uncontrolled) ─────────────────────────────────────────

  it('supports defaultValue', () => {
    renderRadioGroup({ defaultValue: 'a' });
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeChecked();
  });

  it('updates selection on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    renderRadioGroup({ defaultValue: 'a' });

    await user.click(screen.getByText('Option B'));
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  // ─── Keyboard Navigation ───────────────────────────────────────────────

  it('supports keyboard focus on radio items', () => {
    renderRadioGroup({ value: 'a' });
    const firstRadio = screen.getAllByRole('radio')[0];
    firstRadio.focus();
    expect(document.activeElement).toBe(firstRadio);
  });

  it('moves focus to next radio on ArrowDown', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderRadioGroup({ defaultValue: 'a', onValueChange });

    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await user.keyboard('{ArrowDown}');
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('moves focus to previous radio on ArrowUp', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderRadioGroup({ defaultValue: 'b', onValueChange });

    const radios = screen.getAllByRole('radio');
    radios[1].focus();
    await user.keyboard('{ArrowUp}');
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('wraps around from last to first on ArrowDown', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    // Option C is disabled, so enabled radios are a and b
    renderRadioGroup({ defaultValue: 'b', onValueChange });

    const radios = screen.getAllByRole('radio');
    // Focus the last enabled radio (index 1 = Option B)
    radios[1].focus();
    await user.keyboard('{ArrowDown}');
    expect(onValueChange).toHaveBeenCalledWith('a');
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

  it('disables all items when group is disabled', () => {
    renderRadioGroup({ disabled: true });
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
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

  it('uses token for label color', () => {
    renderRadioGroup();
    expect(screen.getByText('Option A')).toHaveClass('text-[var(--color-radio-label)]');
  });

  it('uses token for item row rounding', () => {
    renderRadioGroup();
    const itemRow = screen.getByText('Option A').closest('label[class*="rounded"]');
    expect(itemRow).toHaveClass('rounded-[var(--radius-radio-item)]');
  });

  // ─── Name Propagation ─────────────────────────────────────────────────

  it('passes name to child radios', () => {
    renderRadioGroup();
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'test-group');
    });
  });
});

describe('Radio inside RadioGroup', () => {
  it('renders with description', () => {
    render(
      <RadioGroup aria-label="Test" name="test">
        <Radio value="a" label="Option" description="Some details" />
      </RadioGroup>
    );
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });

  it('uses token for description color', () => {
    render(
      <RadioGroup aria-label="Test" name="test">
        <Radio value="a" label="Option" description="Details" />
      </RadioGroup>
    );
    expect(screen.getByText('Details')).toHaveClass('text-[var(--color-radio-description)]');
  });
});
