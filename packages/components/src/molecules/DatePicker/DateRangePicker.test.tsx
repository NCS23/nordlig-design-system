import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Calendar, type DateRange } from './Calendar';
import { DateRangePicker } from './DateRangePicker';

// ─── Calendar Range Mode Tests ──────────────────────────────────────────────

describe('Calendar range mode', () => {
  const baseProps = {
    mode: 'range' as const,
    month: new Date(2025, 0, 1), // January 2025
    onRangeSelect: vi.fn(),
    onMonthChange: vi.fn(),
  };

  it('renders grid in range mode', () => {
    render(<Calendar {...baseProps} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('calls onRangeSelect with from on first click', async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(<Calendar {...baseProps} onRangeSelect={onRangeSelect} />);

    const day10 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '10' && !el.hasAttribute('disabled')
    );
    await user.click(day10!);

    expect(onRangeSelect).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: undefined,
    });
    const range = onRangeSelect.mock.calls[0][0] as DateRange;
    expect(range.from!.getDate()).toBe(10);
  });

  it('calls onRangeSelect with from+to on second click', async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10) }}
        onRangeSelect={onRangeSelect}
      />
    );

    const day20 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '20' && !el.hasAttribute('disabled')
    );
    await user.click(day20!);

    expect(onRangeSelect).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date),
    });
    const range = onRangeSelect.mock.calls[0][0] as DateRange;
    expect(range.from!.getDate()).toBe(10);
    expect(range.to!.getDate()).toBe(20);
  });

  it('swaps from/to when second click is before first', async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 20) }}
        onRangeSelect={onRangeSelect}
      />
    );

    const day5 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '5' && !el.hasAttribute('disabled')
    );
    await user.click(day5!);

    const range = onRangeSelect.mock.calls[0][0] as DateRange;
    expect(range.from!.getDate()).toBe(5);
    expect(range.to!.getDate()).toBe(20);
  });

  it('starts new range when clicking after complete range', async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
        onRangeSelect={onRangeSelect}
      />
    );

    const day25 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '25' && !el.hasAttribute('disabled')
    );
    await user.click(day25!);

    const range = onRangeSelect.mock.calls[0][0] as DateRange;
    expect(range.from!.getDate()).toBe(25);
    expect(range.to).toBeUndefined();
  });

  it('highlights range start with selected bg', () => {
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
      />
    );
    const day10 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '10' && !el.hasAttribute('disabled')
    );
    expect(day10!.className).toContain('bg-[var(--color-datepicker-day-selected-bg)]');
  });

  it('highlights range end with selected bg', () => {
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
      />
    );
    const day20 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '20' && !el.hasAttribute('disabled')
    );
    expect(day20!.className).toContain('bg-[var(--color-datepicker-day-selected-bg)]');
  });

  it('highlights in-range days with range bg', () => {
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
      />
    );
    const day15 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '15' && !el.hasAttribute('disabled')
    );
    expect(day15!.className).toContain('bg-[var(--color-datepicker-day-range-bg)]');
  });

  it('does not highlight days outside range', () => {
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
      />
    );
    const day5 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '5' && !el.hasAttribute('disabled')
    );
    expect(day5!.className).not.toContain('bg-[var(--color-datepicker-day-range-bg)]');
    expect(day5!.className).not.toContain('bg-[var(--color-datepicker-day-selected-bg)]');
  });

  it('sets aria-selected on range days', () => {
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
      />
    );
    const day15 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '15' && !el.hasAttribute('disabled')
    );
    expect(day15).toHaveAttribute('aria-selected', 'true');
  });

  it('handles same-day range (single day)', async () => {
    const user = userEvent.setup();
    const onRangeSelect = vi.fn();
    render(
      <Calendar
        {...baseProps}
        selectedRange={{ from: new Date(2025, 0, 15) }}
        onRangeSelect={onRangeSelect}
      />
    );

    const day15 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '15' && !el.hasAttribute('disabled')
    );
    await user.click(day15!);

    const range = onRangeSelect.mock.calls[0][0] as DateRange;
    expect(range.from!.getDate()).toBe(15);
    expect(range.to!.getDate()).toBe(15);
  });
});

// ─── DateRangePicker Tests ──────────────────────────────────────────────────

describe('DateRangePicker', () => {
  it('renders two inputs with placeholders', () => {
    render(<DateRangePicker />);
    expect(screen.getByPlaceholderText('Von')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bis')).toBeInTheDocument();
  });

  it('renders custom placeholders', () => {
    render(<DateRangePicker placeholderFrom="Start" placeholderTo="Ende" />);
    expect(screen.getByPlaceholderText('Start')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ende')).toBeInTheDocument();
  });

  it('renders calendar icon button', () => {
    render(<DateRangePicker />);
    expect(
      screen.getByRole('button', { name: 'Kalender öffnen' })
    ).toBeInTheDocument();
  });

  it('renders dash separator between inputs', () => {
    const { container } = render(<DateRangePicker />);
    const dash = container.querySelector('span');
    expect(dash).toHaveTextContent('–');
  });

  it('displays formatted dates when value is set', () => {
    render(
      <DateRangePicker
        value={{ from: new Date(2025, 0, 10), to: new Date(2025, 0, 20) }}
      />
    );
    expect(screen.getByDisplayValue('10.01.2025')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20.01.2025')).toBeInTheDocument();
  });

  it('applies error state to both inputs', () => {
    render(<DateRangePicker error />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input.className).toContain('border-[var(--color-input-border-error)]');
    });
  });

  it('applies disabled state to both inputs', () => {
    render(<DateRangePicker disabled />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('has aria-label on from input', () => {
    render(<DateRangePicker />);
    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute(
      'aria-label',
      'Startdatum'
    );
  });

  it('has aria-label on to input', () => {
    render(<DateRangePicker />);
    expect(screen.getAllByRole('textbox')[1]).toHaveAttribute(
      'aria-label',
      'Enddatum'
    );
  });

  it('opens popover on focus', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);
    await user.click(screen.getAllByRole('textbox')[0]);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('does not open popover when disabled', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker disabled />);
    await user.click(screen.getAllByRole('textbox')[0]);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  it('selects range via calendar clicks', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateRangePicker onChange={onChange} />);

    // Open popover
    await user.click(screen.getAllByRole('textbox')[0]);

    // Click first day (start)
    const enabledDays = screen.getAllByRole('gridcell').filter(
      (el) => !el.hasAttribute('disabled')
    );
    await user.click(enabledDays[5]); // Pick 6th enabled day

    expect(onChange).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: undefined,
    });
  });

  it('closes popover after completing range', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DateRangePicker
        value={{ from: new Date(2025, 0, 10) }}
        onChange={onChange}
      />
    );

    // Open popover
    await user.click(screen.getAllByRole('textbox')[0]);
    expect(screen.getByRole('grid')).toBeInTheDocument();

    // Click day to complete range
    const day20 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '20' && !el.hasAttribute('disabled')
    );
    await user.click(day20!);

    expect(onChange).toHaveBeenCalled();
    const lastRange = onChange.mock.calls[onChange.mock.calls.length - 1][0] as DateRange;
    expect(lastRange.to).toBeDefined();
  });

  it('calls onChange when typing a valid from date', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateRangePicker onChange={onChange} />);
    const fromInput = screen.getAllByRole('textbox')[0];
    await user.type(fromInput, '10.01.2025');
    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as DateRange;
    expect(lastCall.from!.getDate()).toBe(10);
  });

  it('calls onChange when typing a valid to date', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DateRangePicker
        value={{ from: new Date(2025, 0, 10) }}
        onChange={onChange}
      />
    );
    const toInput = screen.getAllByRole('textbox')[1];
    await user.type(toInput, '20.01.2025');
    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as DateRange;
    expect(lastCall.to!.getDate()).toBe(20);
  });

  it('forwards ref to wrapper div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<DateRangePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('uses w-full for full width', () => {
    const { container } = render(<DateRangePicker />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('w-full');
  });

  it('applies custom className', () => {
    const { container } = render(<DateRangePicker className="my-range" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-range');
  });
});
