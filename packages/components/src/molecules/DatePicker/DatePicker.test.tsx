import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Calendar } from './Calendar';
import { DatePicker } from './DatePicker';

// ─── Calendar Tests ─────────────────────────────────────────────────────────

describe('Calendar', () => {
  const baseProps = {
    month: new Date(2025, 0, 1), // January 2025
    onSelect: vi.fn(),
    onMonthChange: vi.fn(),
  };

  it('renders grid with aria-label', () => {
    render(<Calendar {...baseProps} />);
    expect(screen.getByRole('grid')).toHaveAttribute(
      'aria-label',
      'Januar 2025'
    );
  });

  it('renders 7 weekday column headers', () => {
    render(<Calendar {...baseProps} />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(7);
    expect(headers[0]).toHaveTextContent('Mo');
    expect(headers[6]).toHaveTextContent('So');
  });

  it('renders day cells as gridcells', () => {
    render(<Calendar {...baseProps} />);
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBeGreaterThanOrEqual(28);
    expect(cells.length).toBeLessThanOrEqual(42);
  });

  it('displays month name in German', () => {
    render(<Calendar {...baseProps} />);
    expect(screen.getByText('Januar 2025')).toBeInTheDocument();
  });

  it('renders previous month button', () => {
    render(<Calendar {...baseProps} />);
    expect(
      screen.getByRole('button', { name: 'Vorheriger Monat' })
    ).toBeInTheDocument();
  });

  it('renders next month button', () => {
    render(<Calendar {...baseProps} />);
    expect(
      screen.getByRole('button', { name: 'Nächster Monat' })
    ).toBeInTheDocument();
  });

  it('calls onMonthChange when clicking previous', async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(<Calendar {...baseProps} onMonthChange={onMonthChange} />);
    await user.click(
      screen.getByRole('button', { name: 'Vorheriger Monat' })
    );
    expect(onMonthChange).toHaveBeenCalledTimes(1);
    const arg = onMonthChange.mock.calls[0][0] as Date;
    expect(arg.getMonth()).toBe(11); // December 2024
    expect(arg.getFullYear()).toBe(2024);
  });

  it('calls onMonthChange when clicking next', async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(<Calendar {...baseProps} onMonthChange={onMonthChange} />);
    await user.click(
      screen.getByRole('button', { name: 'Nächster Monat' })
    );
    expect(onMonthChange).toHaveBeenCalledTimes(1);
    const arg = onMonthChange.mock.calls[0][0] as Date;
    expect(arg.getMonth()).toBe(1); // February 2025
  });

  it('calls onSelect when clicking a day', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Calendar {...baseProps} onSelect={onSelect} />);
    // Click on "15"
    const day15 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '15' && !el.hasAttribute('disabled')
    );
    expect(day15).toBeDefined();
    await user.click(day15!);
    expect(onSelect).toHaveBeenCalledTimes(1);
    const selected = onSelect.mock.calls[0][0] as Date;
    expect(selected.getDate()).toBe(15);
    expect(selected.getMonth()).toBe(0); // January
  });

  it('marks selected day with aria-selected', () => {
    render(
      <Calendar {...baseProps} selected={new Date(2025, 0, 15)} />
    );
    const selectedCell = screen.getAllByRole('gridcell').find(
      (el) => el.getAttribute('aria-selected') === 'true'
    );
    expect(selectedCell).toBeDefined();
    expect(selectedCell!.textContent).toBe('15');
  });

  it('disables outside-month days', () => {
    render(<Calendar {...baseProps} />);
    // January 2025 starts on Wednesday, so Mon/Tue of first week are December days
    const cells = screen.getAllByRole('gridcell');
    const firstCell = cells[0];
    // Dec 30 is a Monday, should be disabled (outside month)
    expect(firstCell).toBeDisabled();
  });

  it('disables days before minDate', () => {
    render(
      <Calendar {...baseProps} minDate={new Date(2025, 0, 10)} />
    );
    const day5 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '5'
    );
    expect(day5).toBeDisabled();
  });

  it('disables days after maxDate', () => {
    render(
      <Calendar {...baseProps} maxDate={new Date(2025, 0, 20)} />
    );
    const day25 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '25' && !el.hasAttribute('disabled')
    );
    // All "25" should be disabled (either outside month or after maxDate)
    const allDay25 = screen.getAllByRole('gridcell').filter(
      (el) => el.textContent === '25'
    );
    allDay25.forEach((cell) => {
      expect(cell).toBeDisabled();
    });
  });

  it('shows today with special styling (border class)', () => {
    const today = new Date();
    render(
      <Calendar
        month={today}
        onSelect={vi.fn()}
        onMonthChange={vi.fn()}
      />
    );
    const todayCell = screen.getAllByRole('gridcell').find(
      (el) =>
        el.textContent === String(today.getDate()) &&
        !el.hasAttribute('disabled')
    );
    expect(todayCell).toBeDefined();
    expect(todayCell!.className).toContain(
      'border-[var(--color-datepicker-day-today-border)]'
    );
  });

  it('applies selected background class', () => {
    render(
      <Calendar {...baseProps} selected={new Date(2025, 0, 15)} />
    );
    const selectedCell = screen.getAllByRole('gridcell').find(
      (el) => el.getAttribute('aria-selected') === 'true'
    );
    expect(selectedCell!.className).toContain(
      'bg-[var(--color-datepicker-day-selected-bg)]'
    );
  });

  it('applies day-size token for cell dimensions', () => {
    render(<Calendar {...baseProps} />);
    const cell = screen.getAllByRole('gridcell')[7]; // first in-month cell area
    expect(cell.className).toContain(
      'h-[var(--sizing-datepicker-day-size)]'
    );
    expect(cell.className).toContain(
      'w-[var(--sizing-datepicker-day-size)]'
    );
  });

  it('has padding from popover-padding token', () => {
    const { container } = render(<Calendar {...baseProps} />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain(
      'p-[var(--spacing-datepicker-popover-padding)]'
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <Calendar {...baseProps} className="custom-cal" />
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'custom-cal'
    );
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Calendar {...baseProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ─── DatePicker Tests ───────────────────────────────────────────────────────

describe('DatePicker', () => {
  it('renders an input with placeholder', () => {
    render(<DatePicker />);
    expect(screen.getByPlaceholderText('TT.MM.JJJJ')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<DatePicker placeholder="Datum wählen" />);
    expect(screen.getByPlaceholderText('Datum wählen')).toBeInTheDocument();
  });

  it('renders calendar icon button', () => {
    render(<DatePicker />);
    expect(
      screen.getByRole('button', { name: 'Kalender öffnen' })
    ).toBeInTheDocument();
  });

  it('displays formatted date when value is set', () => {
    render(<DatePicker value={new Date(2025, 0, 15)} />);
    expect(screen.getByDisplayValue('15.01.2025')).toBeInTheDocument();
  });

  it('applies error state to input', () => {
    render(<DatePicker error data-testid="dp" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain(
      'border-[var(--color-input-border-error)]'
    );
  });

  it('applies disabled state to input', () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('has aria-label on input', () => {
    render(<DatePicker aria-label="Geburtsdatum" />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-label',
      'Geburtsdatum'
    );
  });

  it('has default aria-label', () => {
    render(<DatePicker />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-label',
      'Datum auswählen'
    );
  });

  it('has aria-haspopup=dialog', () => {
    render(<DatePicker />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-haspopup',
      'dialog'
    );
  });

  it('calls onChange when typing a valid date', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, '15.01.2025');
    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
    const date = lastCall[0] as Date;
    expect(date.getDate()).toBe(15);
    expect(date.getMonth()).toBe(0);
    expect(date.getFullYear()).toBe(2025);
  });

  it('calls onChange with undefined when input is cleared', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker value={new Date(2025, 0, 15)} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByRole('textbox'));
    // Radix Popover renders the calendar in a portal
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('closes popover after selecting a day', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        value={new Date(2025, 0, 1)}
        onChange={onChange}
      />
    );
    // Open
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('grid')).toBeInTheDocument();

    // Click day 20
    const day20 = screen.getAllByRole('gridcell').find(
      (el) => el.textContent === '20' && !el.hasAttribute('disabled')
    );
    await user.click(day20!);

    expect(onChange).toHaveBeenCalled();
    const lastDate = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
    expect(lastDate.getDate()).toBe(20);
  });

  it('has right padding class for calendar icon', () => {
    render(<DatePicker />);
    expect(screen.getByRole('textbox').className).toContain('pr-[var(--spacing-input-icon-inset)]');
  });

  it('forwards ref to input', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<DatePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes id to input', () => {
    render(<DatePicker id="my-date" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-date');
  });

  it('uses w-full for full width', () => {
    const { container } = render(<DatePicker />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('w-full');
  });

  it('applies custom className', () => {
    const { container } = render(<DatePicker className="my-picker" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-picker');
  });

  it('does not open popover when disabled', async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  it('navigates months in popover', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2025, 0, 15)} />);
    await user.click(screen.getByRole('textbox'));

    // Should show January 2025
    expect(screen.getByText('Januar 2025')).toBeInTheDocument();

    // Click next month
    await user.click(
      screen.getByRole('button', { name: 'Nächster Monat' })
    );
    expect(screen.getByText('Februar 2025')).toBeInTheDocument();
  });

  it('shows maxDate month when maxDate is in the past', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        minDate={new Date(2024, 5, 1)}
        maxDate={new Date(2024, 5, 30)}
      />
    );
    await user.click(screen.getByRole('textbox'));
    // Should jump to maxDate's month (June 2024), not current month
    expect(screen.getByText('Juni 2024')).toBeInTheDocument();
  });

  it('shows minDate month when minDate is in the future', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        minDate={new Date(2099, 0, 1)}
        maxDate={new Date(2099, 0, 31)}
      />
    );
    await user.click(screen.getByRole('textbox'));
    // Should jump to minDate's month (January 2099), not current month
    expect(screen.getByText('Januar 2099')).toBeInTheDocument();
  });

  it('shows current month when within min/max range', async () => {
    const user = userEvent.setup();
    const now = new Date();
    render(
      <DatePicker
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date(2099, 11, 31)}
      />
    );
    await user.click(screen.getByRole('textbox'));
    // Current month should be shown since it's within range
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute(
      'aria-label',
      expect.stringContaining(String(now.getFullYear()))
    );
  });
});
