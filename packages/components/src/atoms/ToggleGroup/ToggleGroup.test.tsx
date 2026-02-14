import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderToggleGroup(props?: {
  type?: 'single' | 'multiple';
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
}) {
  const type = props?.type ?? 'single';
  if (type === 'multiple') {
    return render(
      <ToggleGroup
        type="multiple"
        variant={props?.variant}
        size={props?.size}
        disabled={props?.disabled}
        defaultValue={props?.defaultValue as string[]}
        onValueChange={props?.onValueChange}
      >
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        <ToggleGroupItem value="c">Option C</ToggleGroupItem>
      </ToggleGroup>
    );
  }
  return render(
    <ToggleGroup
      type="single"
      variant={props?.variant}
      size={props?.size}
      disabled={props?.disabled}
      defaultValue={props?.defaultValue as string}
      onValueChange={props?.onValueChange}
    >
      <ToggleGroupItem value="a">Option A</ToggleGroupItem>
      <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      <ToggleGroupItem value="c">Option C</ToggleGroupItem>
    </ToggleGroup>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('ToggleGroup', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders toggle group with items', () => {
    renderToggleGroup();
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  // ─── Single Type ──────────────────────────────────────────────────────

  it('toggles single item on click', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderToggleGroup({ type: 'single', onValueChange });

    await user.click(screen.getByText('Option A'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  // ─── Multiple Type ────────────────────────────────────────────────────

  it('allows multiple selections', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderToggleGroup({ type: 'multiple', onValueChange });

    await user.click(screen.getByText('Option A'));
    expect(onValueChange).toHaveBeenCalledWith(['a']);

    await user.click(screen.getByText('Option B'));
    expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
  });

  // ─── Active State ─────────────────────────────────────────────────────

  it('applies data-state=on to active item', async () => {
    const user = userEvent.setup();
    renderToggleGroup({ type: 'single' });

    const itemA = screen.getByText('Option A');
    await user.click(itemA);

    expect(itemA).toHaveAttribute('data-state', 'on');
  });

  // ─── Size Variants ────────────────────────────────────────────────────

  it('applies sm size classes', () => {
    renderToggleGroup({ size: 'sm' });
    const item = screen.getByText('Option A');
    expect(item).toHaveClass('h-8');
    expect(item).toHaveClass('px-2.5');
  });

  it('applies md size classes by default', () => {
    renderToggleGroup();
    const item = screen.getByText('Option A');
    expect(item).toHaveClass('h-9');
    expect(item).toHaveClass('px-3');
  });

  it('applies lg size classes', () => {
    renderToggleGroup({ size: 'lg' });
    const item = screen.getByText('Option A');
    expect(item).toHaveClass('h-10');
    expect(item).toHaveClass('px-4');
  });

  // ─── Outline Variant ──────────────────────────────────────────────────

  it('applies outline variant classes', () => {
    renderToggleGroup({ variant: 'outline' });
    const item = screen.getByText('Option A');
    expect(item).toHaveClass('bg-transparent');
    expect(item).toHaveClass('border-[var(--color-toggle-border)]');
  });

  // ─── Disabled ─────────────────────────────────────────────────────────

  it('disables all items when group is disabled', () => {
    renderToggleGroup({ disabled: true });
    const item = screen.getByText('Option A');
    expect(item).toBeDisabled();
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('merges custom className on root', () => {
    render(
      <ToggleGroup type="single" className="custom-class">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByRole('group')).toHaveClass('custom-class');
  });

  // ─── onValueChange Callback ───────────────────────────────────────────

  it('calls onValueChange when value changes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderToggleGroup({ type: 'single', onValueChange });

    await user.click(screen.getByText('Option B'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  // ─── Keyboard Navigation ─────────────────────────────────────────────

  it('supports keyboard activation with Space/Enter', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderToggleGroup({ type: 'single', onValueChange });

    const itemA = screen.getByText('Option A');
    itemA.focus();
    await user.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('a');
  });
});
