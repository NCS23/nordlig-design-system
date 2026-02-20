import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders with default placeholder', () => {
    render(<TimePicker />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toHaveAttribute(
      'placeholder',
      'HH:MM'
    );
  });

  it('renders custom placeholder', () => {
    render(<TimePicker placeholder="Uhrzeit wählen" />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toHaveAttribute(
      'placeholder',
      'Uhrzeit wählen'
    );
  });

  it('displays formatted time when value provided', () => {
    render(<TimePicker value="14:30" />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toHaveValue('14:30');
  });

  it('displays time with seconds when showSeconds is true', () => {
    render(<TimePicker value="14:30:45" showSeconds />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toHaveValue('14:30:45');
  });

  // ─── Popover ──────────────────────────────────────────────────────────────

  it('opens popover on input focus', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));
    expect(screen.getByLabelText('Std')).toBeInTheDocument();
    expect(screen.getByLabelText('Min')).toBeInTheDocument();
  });

  it('opens popover on icon click', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByLabelText('Uhrzeit öffnen'));
    expect(screen.getByLabelText('Std')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<TimePicker disabled />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));
    expect(screen.queryByLabelText('Std')).not.toBeInTheDocument();
  });

  it('shows hour and minute columns', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));
    expect(screen.getByLabelText('Std')).toBeInTheDocument();
    expect(screen.getByLabelText('Min')).toBeInTheDocument();
    expect(screen.queryByLabelText('Sek')).not.toBeInTheDocument();
  });

  it('shows seconds column when showSeconds is true', async () => {
    const user = userEvent.setup();
    render(<TimePicker showSeconds />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));
    expect(screen.getByLabelText('Sek')).toBeInTheDocument();
  });

  // ─── Selection ────────────────────────────────────────────────────────────

  it('selects hour on cell click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker value="14:30" onChange={onChange} />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const hourList = screen.getByLabelText('Std');
    const hour10 = within(hourList).getByText('10');
    await user.click(hour10);

    expect(onChange).toHaveBeenCalledWith('10:30');
  });

  it('selects minute on cell click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker value="14:30" onChange={onChange} />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const minList = screen.getByLabelText('Min');
    const min45 = within(minList).getByText('45');
    await user.click(min45);

    expect(onChange).toHaveBeenCalledWith('14:45');
  });

  it('selects seconds on cell click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker value="14:30:00" onChange={onChange} showSeconds />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const secList = screen.getByLabelText('Sek');
    const sec15 = within(secList).getByText('15');
    await user.click(sec15);

    expect(onChange).toHaveBeenCalledWith('14:30:15');
  });

  // ─── minuteStep ───────────────────────────────────────────────────────────

  it('applies minuteStep to minute values', async () => {
    const user = userEvent.setup();
    render(<TimePicker minuteStep={15} />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const minList = screen.getByLabelText('Min');
    const options = within(minList).getAllByRole('option');
    expect(options).toHaveLength(4); // 00, 15, 30, 45
    expect(options[0]).toHaveTextContent('00');
    expect(options[1]).toHaveTextContent('15');
    expect(options[2]).toHaveTextContent('30');
    expect(options[3]).toHaveTextContent('45');
  });

  // ─── Min / Max ────────────────────────────────────────────────────────────

  it('disables hours outside min/max range', async () => {
    const user = userEvent.setup();
    render(<TimePicker min="08:00" max="17:00" />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const hourList = screen.getByLabelText('Std');
    const hour05 = within(hourList).getByText('05');
    expect(hour05).toBeDisabled();

    const hour10 = within(hourList).getByText('10');
    expect(hour10).not.toBeDisabled();

    const hour20 = within(hourList).getByText('20');
    expect(hour20).toBeDisabled();
  });

  it('disables minutes outside min/max for current hour', async () => {
    const user = userEvent.setup();
    render(<TimePicker value="08:00" min="08:30" max="17:00" />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const minList = screen.getByLabelText('Min');
    const min15 = within(minList).getByText('15');
    expect(min15).toBeDisabled();

    const min30 = within(minList).getByText('30');
    expect(min30).not.toBeDisabled();
  });

  // ─── 12h Format ───────────────────────────────────────────────────────────

  it('shows AM/PM column in 12h format', async () => {
    const user = userEvent.setup();
    render(<TimePicker format="12h" value="14:30" />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('displays 12h format in input', () => {
    render(<TimePicker format="12h" value="14:30" />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toHaveValue('02:30 PM');
  });

  it('shows hours 1-12 in 12h format', async () => {
    const user = userEvent.setup();
    render(<TimePicker format="12h" />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    const hourList = screen.getByLabelText('Std');
    const options = within(hourList).getAllByRole('option');
    expect(options).toHaveLength(12);
    expect(options[0]).toHaveTextContent('01');
    expect(options[11]).toHaveTextContent('12');
  });

  it('toggles AM/PM correctly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker format="12h" value="14:30" onChange={onChange} />);
    await user.click(screen.getByLabelText('Uhrzeit auswählen'));

    await user.click(screen.getByText('AM'));
    expect(onChange).toHaveBeenCalledWith('02:30');
  });

  // ─── Input ────────────────────────────────────────────────────────────────

  it('calls onChange when valid time typed in input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker onChange={onChange} />);
    const input = screen.getByLabelText('Uhrzeit auswählen');
    await user.clear(input);
    await user.type(input, '09:15');
    expect(onChange).toHaveBeenCalledWith('09:15');
  });

  it('calls onChange with undefined when input cleared', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker value="14:30" onChange={onChange} />);
    const input = screen.getByLabelText('Uhrzeit auswählen');
    await user.clear(input);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  // ─── States ───────────────────────────────────────────────────────────────

  it('applies error state', () => {
    render(<TimePicker error />);
    const input = screen.getByLabelText('Uhrzeit auswählen');
    expect(input.className).toContain('border-[var(--color-input-border-error)]');
  });

  it('applies disabled state', () => {
    render(<TimePicker disabled />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toBeDisabled();
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  it('has aria-expanded that toggles', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    const input = screen.getByLabelText('Uhrzeit auswählen');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('has aria-haspopup dialog', () => {
    render(<TimePicker />);
    expect(screen.getByLabelText('Uhrzeit auswählen')).toHaveAttribute(
      'aria-haspopup',
      'dialog'
    );
  });

  it('applies custom aria-label', () => {
    render(<TimePicker aria-label="Startzeit" />);
    expect(screen.getByLabelText('Startzeit')).toBeInTheDocument();
  });

  // ─── Ref & className ─────────────────────────────────────────────────────

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<TimePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    const { container } = render(<TimePicker className="my-time" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-time');
  });
});
