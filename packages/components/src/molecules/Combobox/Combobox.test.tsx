import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Combobox, type ComboboxOption, type ComboboxGroup } from './Combobox';

const defaultOptions: ComboboxOption[] = [
  { value: 'apple', label: 'Apfel' },
  { value: 'banana', label: 'Banane' },
  { value: 'cherry', label: 'Kirsche' },
];

const groupedOptions: ComboboxGroup[] = [
  {
    label: 'Obst',
    options: [
      { value: 'apple', label: 'Apfel' },
      { value: 'banana', label: 'Banane' },
    ],
  },
  {
    label: 'Gemuese',
    options: [
      { value: 'carrot', label: 'Karotte' },
      { value: 'broccoli', label: 'Brokkoli' },
    ],
  },
];

describe('Combobox', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert die Komponente mit Placeholder', () => {
    render(
      <Combobox options={defaultOptions} placeholder="Bitte waehlen..." />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Bitte waehlen...')).toBeInTheDocument();
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Combobox ref={ref} options={defaultOptions} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merged className', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Combobox ref={ref} options={defaultOptions} className="custom-class" />
    );
    expect(ref.current).toHaveClass('custom-class');
  });

  it('hat displayName "Combobox"', () => {
    expect(Combobox.displayName).toBe('Combobox');
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen', () => {
    render(
      <Combobox options={defaultOptions} placeholder="Waehlen..." />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain(
      'text-[var(--color-cmb-trigger-placeholder)]'
    );
  });

  // ─── Placeholder ───────────────────────────────────────────────────────

  it('zeigt Placeholder-Text', () => {
    render(<Combobox options={defaultOptions} placeholder="Waehle Frucht" />);
    expect(screen.getByText('Waehle Frucht')).toBeInTheDocument();
  });

  // ─── Dropdown ───────────────────────────────────────────────────────────

  it('oeffnet Dropdown bei Klick', async () => {
    const user = userEvent.setup();
    render(<Combobox options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('zeigt Optionen im Dropdown', async () => {
    const user = userEvent.setup();
    render(<Combobox options={defaultOptions} />);
    await user.click(screen.getByRole('combobox'));

    expect(screen.getByText('Apfel')).toBeInTheDocument();
    expect(screen.getByText('Banane')).toBeInTheDocument();
    expect(screen.getByText('Kirsche')).toBeInTheDocument();
  });

  it('waehlt Option aus und ruft onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Combobox options={defaultOptions} onChange={onChange} />
    );
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Banane'));

    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('zeigt ausgewaehlten Text im Trigger', () => {
    render(
      <Combobox options={defaultOptions} value="banana" />
    );
    expect(screen.getByText('Banane')).toBeInTheDocument();
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('disabled Zustand verhindert Oeffnen', async () => {
    const user = userEvent.setup();
    render(<Combobox options={defaultOptions} disabled />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  // ─── ARIA ───────────────────────────────────────────────────────────────

  it('role="combobox" und aria-expanded sind gesetzt', () => {
    render(<Combobox options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('role', 'combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  // ─── Groessen ───────────────────────────────────────────────────────────

  it('verschiedene Groessen (inputSize sm/md/lg)', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(
        <Combobox options={defaultOptions} inputSize={size} />
      );
      const trigger = screen.getByRole('combobox');
      expect(trigger.className).toContain(size);
      unmount();
    }
  });
});
