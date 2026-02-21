import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SegmentedControl } from './SegmentedControl';

const defaultItems = [
  { value: 'alle', label: 'Alle' },
  { value: 'aktiv', label: 'Aktiv' },
  { value: 'archiviert', label: 'Archiviert' },
];

describe('SegmentedControl', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert alle Items', () => {
    render(<SegmentedControl items={defaultItems} />);
    expect(screen.getByText('Alle')).toBeInTheDocument();
    expect(screen.getByText('Aktiv')).toBeInTheDocument();
    expect(screen.getByText('Archiviert')).toBeInTheDocument();
  });

  it('selektiert standardmaessig das erste Item', () => {
    render(<SegmentedControl items={defaultItems} />);
    const buttons = screen.getAllByRole('radio');
    expect(buttons[0]).toHaveAttribute('aria-checked', 'true');
    expect(buttons[1]).toHaveAttribute('aria-checked', 'false');
    expect(buttons[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('defaultValue prop funktioniert', () => {
    render(<SegmentedControl items={defaultItems} defaultValue="aktiv" />);
    const buttons = screen.getAllByRole('radio');
    expect(buttons[0]).toHaveAttribute('aria-checked', 'false');
    expect(buttons[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('kontrollierter value prop funktioniert', () => {
    const { rerender } = render(
      <SegmentedControl items={defaultItems} value="alle" />
    );
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('aria-checked', 'true');

    rerender(<SegmentedControl items={defaultItems} value="archiviert" />);
    expect(screen.getAllByRole('radio')[2]).toHaveAttribute('aria-checked', 'true');
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('aria-checked', 'false');
  });

  // ─── onChange ─────────────────────────────────────────────────────────

  it('ruft onChange bei Klick auf', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SegmentedControl items={defaultItems} onChange={onChange} />);

    await user.click(screen.getByText('Aktiv'));
    expect(onChange).toHaveBeenCalledWith('aktiv');
  });

  // ─── Keyboard Navigation ─────────────────────────────────────────────

  it('navigiert mit ArrowRight zum naechsten Item', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl items={defaultItems} onChange={onChange} />
    );

    const firstButton = screen.getAllByRole('radio')[0];
    firstButton.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('aktiv');
  });

  it('navigiert mit ArrowLeft zum vorherigen Item', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl items={defaultItems} defaultValue="aktiv" onChange={onChange} />
    );

    const secondButton = screen.getAllByRole('radio')[1];
    secondButton.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('alle');
  });

  it('ueberspringt disabled Items bei Tastaturnavigation', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const itemsWithDisabled = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
      { value: 'c', label: 'C' },
    ];
    render(
      <SegmentedControl items={itemsWithDisabled} onChange={onChange} />
    );

    const firstButton = screen.getAllByRole('radio')[0];
    firstButton.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('c');
  });

  // ─── Disabled ─────────────────────────────────────────────────────────

  it('deaktiviert das gesamte Control', () => {
    render(
      <SegmentedControl items={defaultItems} disabled data-testid="control" />
    );
    const container = screen.getByTestId('control');
    expect(container.className).toContain('pointer-events-none');
    expect(container.className).toContain('opacity-50');
  });

  // ─── Size Variants ────────────────────────────────────────────────────

  it('wendet sm Token-Klassen an', () => {
    render(<SegmentedControl items={defaultItems} size="sm" />);
    const button = screen.getAllByRole('radio')[0];
    expect(button.className).toContain('h-[var(--sizing-seg-sm-height)]');
    expect(button.className).toContain('text-[length:var(--font-seg-size-sm)]');
    expect(button.className).toContain('px-[var(--spacing-seg-item-px)]');
  });

  it('wendet md Token-Klassen an (Standard)', () => {
    render(<SegmentedControl items={defaultItems} />);
    const button = screen.getAllByRole('radio')[0];
    expect(button.className).toContain('h-[var(--sizing-seg-md-height)]');
    expect(button.className).toContain('text-[length:var(--font-seg-size-md)]');
  });

  it('wendet lg Token-Klassen an', () => {
    render(<SegmentedControl items={defaultItems} size="lg" />);
    const button = screen.getAllByRole('radio')[0];
    expect(button.className).toContain('h-[var(--sizing-seg-lg-height)]');
    expect(button.className).toContain('text-[length:var(--font-seg-size-lg)]');
  });

  // ─── Accessibility ────────────────────────────────────────────────────

  it('hat aria-checked="true" auf dem aktiven Item', () => {
    render(<SegmentedControl items={defaultItems} defaultValue="aktiv" />);
    expect(screen.getByText('Aktiv').closest('[role="radio"]')).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('Container hat role="radiogroup"', () => {
    render(<SegmentedControl items={defaultItems} data-testid="control" />);
    expect(screen.getByTestId('control')).toHaveAttribute('role', 'radiogroup');
  });

  it('Items haben role="radio"', () => {
    render(<SegmentedControl items={defaultItems} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('verwendet Roving Tabindex (aktiv=0, inaktiv=-1)', () => {
    render(<SegmentedControl items={defaultItems} defaultValue="aktiv" />);
    const buttons = screen.getAllByRole('radio');
    expect(buttons[0]).toHaveAttribute('tabindex', '-1');
    expect(buttons[1]).toHaveAttribute('tabindex', '0');
    expect(buttons[2]).toHaveAttribute('tabindex', '-1');
  });

  // ─── Forwarding ───────────────────────────────────────────────────────

  it('leitet custom className weiter', () => {
    render(
      <SegmentedControl
        items={defaultItems}
        className="custom-class"
        data-testid="control"
      />
    );
    expect(screen.getByTestId('control').className).toContain('custom-class');
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<SegmentedControl ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ─── displayName ──────────────────────────────────────────────────────

  it('hat displayName "SegmentedControl"', () => {
    expect(SegmentedControl.displayName).toBe('SegmentedControl');
  });
});
