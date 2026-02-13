import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Select, type SelectOption, type SelectGroup } from './Select';

const options: SelectOption[] = [
  { value: 'laufen', label: 'Laufen' },
  { value: 'radfahren', label: 'Radfahren' },
  { value: 'schwimmen', label: 'Schwimmen' },
  { value: 'krafttraining', label: 'Krafttraining' },
];

const groupedOptions: SelectGroup[] = [
  {
    label: 'Ausdauer',
    options: [
      { value: 'laufen', label: 'Laufen' },
      { value: 'radfahren', label: 'Radfahren' },
      { value: 'schwimmen', label: 'Schwimmen' },
    ],
  },
  {
    label: 'Kraft',
    options: [
      { value: 'krafttraining', label: 'Krafttraining' },
      { value: 'crossfit', label: 'CrossFit' },
    ],
  },
];

// ─── Select Tests ────────────────────────────────────────────────────────────

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Auswählen…');
  });

  it('renders custom placeholder', () => {
    render(<Select options={options} placeholder="Sportart wählen" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Sportart wählen');
  });

  it('displays selected value label', () => {
    render(<Select options={options} value="radfahren" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Radfahren');
  });

  it('has aria-expanded false when closed', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-haspopup listbox', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders all options in popover', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    const items = within(listbox).getAllByRole('option');
    expect(items).toHaveLength(4);
  });

  it('calls onChange when clicking option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Schwimmen'));
    expect(onChange).toHaveBeenCalledWith('schwimmen');
  });

  it('closes popover after selection', async () => {
    const user = userEvent.setup();
    render(<Select options={options} onChange={vi.fn()} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByText('Laufen'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks selected option with aria-selected', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value="radfahren" />);
    await user.click(screen.getByRole('combobox'));
    const selected = screen.getByRole('option', { selected: true });
    expect(selected).toHaveTextContent('Radfahren');
  });

  it('shows check icon on selected option', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value="radfahren" />);
    await user.click(screen.getByRole('combobox'));
    const selected = screen.getByRole('option', { selected: true });
    expect(selected.querySelector('svg')).toBeInTheDocument();
  });

  it('applies error state', () => {
    render(<Select options={options} error />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('border-[var(--color-input-border-error)]');
  });

  it('applies disabled state', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not open popover when disabled', async () => {
    const user = userEvent.setup();
    render(<Select options={options} disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports disabled options', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const opts: SelectOption[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    render(<Select options={opts} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders grouped options', async () => {
    const user = userEvent.setup();
    render(<Select options={groupedOptions} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Ausdauer')).toBeInTheDocument();
    expect(screen.getByText('Kraft')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(5);
  });

  it('shows empty state when no options', async () => {
    const user = userEvent.setup();
    render(<Select options={[]} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Keine Optionen')).toBeInTheDocument();
  });

  it('forwards ref to wrapper div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Select options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(<Select options={options} className="my-select" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-select');
  });

  it('applies custom aria-label', () => {
    render(<Select options={options} aria-label="Sportart" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Sportart');
  });

  // ─── Keyboard Navigation ──────────────────────────────────────────────────

  it('opens on Enter key', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    screen.getByRole('combobox').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens on Space key', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    screen.getByRole('combobox').focus();
    await user.keyboard(' ');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens on ArrowDown key', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    screen.getByRole('combobox').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('navigates with ArrowDown', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('radfahren');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects with Enter key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('laufen');
  });

  it('chevron rotates when open', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    const trigger = screen.getByRole('combobox');
    const chevron = trigger.querySelector('svg');
    expect(chevron?.getAttribute('class')).not.toContain('rotate-180');
    await user.click(trigger);
    const chevronOpen = trigger.querySelector('svg');
    expect(chevronOpen?.getAttribute('class')).toContain('rotate-180');
  });
});
