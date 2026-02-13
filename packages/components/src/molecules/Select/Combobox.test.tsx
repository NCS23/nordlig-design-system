import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Combobox } from './Combobox';
import type { SelectOption, SelectGroup } from './Select';

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
    ],
  },
  {
    label: 'Kraft',
    options: [{ value: 'krafttraining', label: 'Krafttraining' }],
  },
];

describe('Combobox', () => {
  it('renders trigger with placeholder', () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Auswählen…');
  });

  it('displays selected value label', () => {
    render(<Combobox options={options} value="schwimmen" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Schwimmen');
  });

  it('opens popover with search input on click', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Optionen durchsuchen')).toBeInTheDocument();
  });

  it('shows search placeholder', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} searchPlaceholder="Sportart suchen…" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByPlaceholderText('Sportart suchen…')).toBeInTheDocument();
  });

  it('renders all options initially', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('filters options when typing in search', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'rad');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByText('Radfahren')).toBeInTheDocument();
  });

  it('shows empty text when no options match', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} emptyText="Nichts gefunden" />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'xyz');
    expect(screen.getByText('Nichts gefunden')).toBeInTheDocument();
  });

  it('shows default empty text', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'xyz');
    expect(screen.getByText('Keine Ergebnisse')).toBeInTheDocument();
  });

  it('calls onChange when clicking option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Laufen'));
    expect(onChange).toHaveBeenCalledWith('laufen');
  });

  it('closes popover after selection', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} onChange={vi.fn()} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Laufen'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks selected option with check icon', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} value="laufen" />);
    await user.click(screen.getByRole('combobox'));
    const selected = screen.getByRole('option', { selected: true });
    expect(selected.querySelector('svg')).toBeInTheDocument();
  });

  it('resets search on reopen', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'rad');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    // Close by pressing escape
    await user.keyboard('{Escape}');
    // Reopen
    await user.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('filter is case insensitive', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'RAD');
    expect(screen.getAllByRole('option')).toHaveLength(1);
  });

  it('applies error state', () => {
    render(<Combobox options={options} error />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('border-[var(--color-input-border-error)]');
  });

  it('applies disabled state', () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders grouped options', async () => {
    const user = userEvent.setup();
    render(<Combobox options={groupedOptions} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Ausdauer')).toBeInTheDocument();
    expect(screen.getByText('Kraft')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Combobox options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(<Combobox options={options} className="my-combo" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-combo');
  });

  // ─── Keyboard Navigation ──────────────────────────────────────────────────

  it('navigates with ArrowDown in search', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    // ArrowDown moves focus: -1→0 (Laufen), 0→1 (Radfahren)
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('radfahren');
  });

  it('closes with Escape from search', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects first item with ArrowDown + Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('laufen');
  });
});
