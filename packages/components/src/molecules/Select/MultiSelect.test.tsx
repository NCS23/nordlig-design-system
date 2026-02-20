import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MultiSelect } from './MultiSelect';
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

describe('MultiSelect', () => {
  it('renders trigger with placeholder', () => {
    render(<MultiSelect options={options} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Auswählen…');
  });

  it('renders custom placeholder', () => {
    render(<MultiSelect options={options} placeholder="Sportarten wählen" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Sportarten wählen');
  });

  it('displays selected values as badges', () => {
    render(<MultiSelect options={options} value={['laufen', 'radfahren']} />);
    expect(screen.getByText('Laufen')).toBeInTheDocument();
    expect(screen.getByText('Radfahren')).toBeInTheDocument();
  });

  it('limits visible badges with maxBadges', () => {
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren', 'schwimmen', 'krafttraining']}
        maxBadges={2}
      />
    );
    expect(screen.getByText('Laufen')).toBeInTheDocument();
    expect(screen.getByText('Radfahren')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.queryByText('Schwimmen')).not.toBeInTheDocument();
  });

  it('shows remove button on badges', () => {
    render(<MultiSelect options={options} value={['laufen']} />);
    expect(screen.getByLabelText('Laufen entfernen')).toBeInTheDocument();
  });

  it('removes value when clicking badge X', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren']}
        onChange={onChange}
      />
    );
    await user.click(screen.getByLabelText('Laufen entfernen'));
    expect(onChange).toHaveBeenCalledWith(['radfahren']);
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('has search input in popover', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByLabelText('Optionen durchsuchen')).toBeInTheDocument();
  });

  it('renders all options with checkboxes', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('toggles value on option click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Laufen'));
    expect(onChange).toHaveBeenCalledWith(['laufen']);
  });

  it('removes value on second click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect options={options} value={['laufen']} onChange={onChange} />
    );
    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    const laufenOption = within(listbox).getByText('Laufen');
    await user.click(laufenOption);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('does NOT close popover after selection', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} value={[]} onChange={vi.fn()} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Laufen'));
    // MultiSelect should stay open for multiple selections
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters options when typing in search', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'kraft');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByText('Krafttraining')).toBeInTheDocument();
  });

  it('shows empty text when no match', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'xyz');
    expect(screen.getByText('Keine Ergebnisse')).toBeInTheDocument();
  });

  it('shows "Alle auswählen" button', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Alle auswählen')).toBeInTheDocument();
  });

  it('selects all on "Alle auswählen" click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alle auswählen'));
    expect(onChange).toHaveBeenCalledWith([
      'laufen',
      'radfahren',
      'schwimmen',
      'krafttraining',
    ]);
  });

  it('shows "Alle abwählen" when all selected', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren', 'schwimmen', 'krafttraining']}
      />
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Alle abwählen')).toBeInTheDocument();
  });

  it('deselects all on "Alle abwählen" click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren', 'schwimmen', 'krafttraining']}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alle abwählen'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('shows selection count', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect options={options} value={['laufen', 'radfahren']} />
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('(2/4)')).toBeInTheDocument();
  });

  it('hides select all when showSelectAll is false', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} showSelectAll={false} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Alle auswählen')).not.toBeInTheDocument();
  });

  it('applies error state', () => {
    render(<MultiSelect options={options} error />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('border-[var(--color-input-border-error)]');
  });

  it('applies disabled state', () => {
    render(<MultiSelect options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not show remove button on badges when disabled', () => {
    render(
      <MultiSelect options={options} value={['laufen']} disabled />
    );
    expect(screen.queryByLabelText('Laufen entfernen')).not.toBeInTheDocument();
  });

  it('renders grouped options', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={groupedOptions} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Ausdauer')).toBeInTheDocument();
    expect(screen.getByText('Kraft')).toBeInTheDocument();
  });

  it('has aria-multiselectable on listbox', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<MultiSelect options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MultiSelect options={options} className="my-multi" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-multi');
  });

  // ─── Keyboard Navigation ──────────────────────────────────────────────────

  it('toggles with ArrowDown + Enter in search', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith(['laufen']);
  });

  it('closes with Escape', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={options} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('handles disabled options in selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const opts: SelectOption[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    render(<MultiSelect options={opts} value={[]} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('select all skips disabled options', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const opts: SelectOption[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
      { value: 'c', label: 'C' },
    ];
    render(<MultiSelect options={opts} value={[]} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alle auswählen'));
    expect(onChange).toHaveBeenCalledWith(['a', 'c']);
  });

  // ─── maxItems ──────────────────────────────────────────────────────────────

  it('does not exceed maxItems limit', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren']}
        onChange={onChange}
        maxItems={2}
      />
    );
    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    await user.click(within(listbox).getByText('Schwimmen'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('allows removing when at maxItems', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren']}
        onChange={onChange}
        maxItems={2}
      />
    );
    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    await user.click(within(listbox).getByText('Laufen'));
    expect(onChange).toHaveBeenCalledWith(['radfahren']);
  });

  it('select all respects maxItems', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect options={options} value={[]} onChange={onChange} maxItems={2} />
    );
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alle auswählen'));
    expect(onChange).toHaveBeenCalledWith(['laufen', 'radfahren']);
  });

  it('dims non-selected items when maxItems reached', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren']}
        maxItems={2}
      />
    );
    await user.click(screen.getByRole('combobox'));
    const schwimmen = screen.getAllByRole('option').find(
      (el) => within(el).queryByText('Schwimmen') !== null
    );
    expect(schwimmen).toHaveAttribute('aria-disabled', 'true');
  });

  // ─── Backspace ─────────────────────────────────────────────────────────────

  it('removes last value on Backspace when search is empty', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={['laufen', 'radfahren']}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{Backspace}');
    expect(onChange).toHaveBeenCalledWith(['laufen']);
  });

  it('does not remove on Backspace when search has text', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={['laufen']}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Optionen durchsuchen'), 'abc');
    await user.keyboard('{Backspace}');
    expect(onChange).not.toHaveBeenCalled();
  });
});
