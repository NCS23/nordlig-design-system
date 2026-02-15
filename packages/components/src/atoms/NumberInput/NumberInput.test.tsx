import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  it('rendert ein number-Input', () => {
    render(<NumberInput />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('zeigt den Default-Wert', () => {
    render(<NumberInput defaultValue={5} />);
    expect(screen.getByRole('spinbutton')).toHaveValue(5);
  });

  it('zeigt den kontrollierten Wert', () => {
    render(<NumberInput value={42} />);
    expect(screen.getByRole('spinbutton')).toHaveValue(42);
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<NumberInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merged zusaetzliche classNames', () => {
    const { container } = render(<NumberInput className="extra" />);
    expect(container.firstChild).toHaveClass('extra');
  });

  // Accessibility
  describe('Accessibility', () => {
    it('hat role=group auf dem Container', () => {
      const { container } = render(<NumberInput />);
      expect(container.firstChild).toHaveAttribute('role', 'group');
    });

    it('hat default aria-label auf dem Container', () => {
      const { container } = render(<NumberInput />);
      expect(container.firstChild).toHaveAttribute('aria-label', 'Numerische Eingabe');
    });

    it('nutzt uebergebenes aria-label', () => {
      const { container } = render(<NumberInput aria-label="Anzahl Personen" />);
      expect(container.firstChild).toHaveAttribute('aria-label', 'Anzahl Personen');
    });

    it('setzt aria-valuemin', () => {
      render(<NumberInput min={0} />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuemin', '0');
    });

    it('setzt aria-valuemax', () => {
      render(<NumberInput max={100} />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuemax', '100');
    });

    it('setzt aria-valuenow', () => {
      render(<NumberInput value={42} />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuenow', '42');
    });

    it('erlaubt custom Stepper-Labels', () => {
      render(<NumberInput decrementLabel="Decrease" incrementLabel="Increase" />);
      expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument();
    });
  });

  // Stepper Buttons
  describe('Stepper Buttons', () => {
    it('hat Minus- und Plus-Button', () => {
      render(<NumberInput />);
      expect(screen.getByRole('button', { name: 'Wert verringern' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Wert erhoehen' })).toBeInTheDocument();
    });

    it('inkrementiert beim Klick auf Plus', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={5} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('dekrementiert beim Klick auf Minus', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={5} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert verringern' }));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('nutzt step fuer Inkremente', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={10} step={5} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(onChange).toHaveBeenCalledWith(15);
    });
  });

  // Floating-Point Praezision
  describe('Floating-Point Praezision', () => {
    it('addiert 0.1 + 0.2 korrekt', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={0.1} step={0.2} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(onChange).toHaveBeenCalledWith(0.3);
    });

    it('subtrahiert 0.3 - 0.1 korrekt', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={0.3} step={0.1} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert verringern' }));
      expect(onChange).toHaveBeenCalledWith(0.2);
    });

    it('setzt inputMode=decimal bei Dezimal-Step', () => {
      render(<NumberInput step={0.1} />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('inputMode', 'decimal');
    });

    it('setzt inputMode=numeric bei Integer-Step', () => {
      render(<NumberInput step={1} />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('inputMode', 'numeric');
    });
  });

  // Min/Max
  describe('Min/Max', () => {
    it('begrenzt auf min', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={1} min={0} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert verringern' }));
      expect(onChange).toHaveBeenCalledWith(0);
      await user.click(screen.getByRole('button', { name: 'Wert verringern' }));
      expect(onChange).toHaveBeenLastCalledWith(0);
    });

    it('begrenzt auf max', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={9} max={10} onChange={onChange} />);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(onChange).toHaveBeenCalledWith(10);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(onChange).toHaveBeenLastCalledWith(10);
    });

    it('deaktiviert Minus-Button bei min', () => {
      render(<NumberInput value={0} min={0} />);
      expect(screen.getByRole('button', { name: 'Wert verringern' })).toBeDisabled();
    });

    it('deaktiviert Plus-Button bei max', () => {
      render(<NumberInput value={10} max={10} />);
      expect(screen.getByRole('button', { name: 'Wert erhoehen' })).toBeDisabled();
    });

    it('clampt Wert bei onBlur', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={5} min={0} max={10} onChange={onChange} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '999');
      await user.tab(); // blur
      expect(onChange).toHaveBeenLastCalledWith(10);
    });
  });

  // Keyboard
  describe('Keyboard', () => {
    it('inkrementiert mit ArrowUp', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={5} onChange={onChange} />);
      const input = screen.getByRole('spinbutton');
      input.focus();
      await user.keyboard('{ArrowUp}');
      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('dekrementiert mit ArrowDown', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={5} onChange={onChange} />);
      const input = screen.getByRole('spinbutton');
      input.focus();
      await user.keyboard('{ArrowDown}');
      expect(onChange).toHaveBeenCalledWith(4);
    });
  });

  // Manuelle Eingabe
  describe('Manuelle Eingabe', () => {
    it('erlaubt das Leeren und Neueintippen', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={5} onChange={onChange} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '42');
      expect(onChange).toHaveBeenCalledWith(42);
    });

    it('setzt bei leerem Feld auf Blur den letzten Wert zurueck', async () => {
      const user = userEvent.setup();
      render(<NumberInput defaultValue={5} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.tab(); // blur
      expect(input).toHaveValue(5);
    });

    it('akzeptiert Dezimalzahlen per Eingabe', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<NumberInput defaultValue={0} step={0.1} onChange={onChange} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '3.14');
      expect(onChange).toHaveBeenCalledWith(3.14);
    });
  });

  // Disabled
  describe('Disabled', () => {
    it('deaktiviert das Input-Feld', () => {
      render(<NumberInput disabled />);
      expect(screen.getByRole('spinbutton')).toBeDisabled();
    });

    it('deaktiviert beide Buttons', () => {
      render(<NumberInput disabled />);
      expect(screen.getByRole('button', { name: 'Wert verringern' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Wert erhoehen' })).toBeDisabled();
    });

    it('hat disabled Styling', () => {
      const { container } = render(<NumberInput disabled />);
      expect(container.firstChild).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  // Error
  describe('Error', () => {
    it('setzt aria-invalid', () => {
      render(<NumberInput error />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
    });

    it('hat Error-Border-Token', () => {
      const { container } = render(<NumberInput error />);
      expect((container.firstChild as HTMLElement).className).toContain('--color-numberinput-border-error');
    });

    it('hat keinen aria-invalid ohne error', () => {
      render(<NumberInput />);
      expect(screen.getByRole('spinbutton')).not.toHaveAttribute('aria-invalid');
    });

    it('behaelt Error-Border bei hover', () => {
      const { container } = render(<NumberInput error />);
      expect((container.firstChild as HTMLElement).className).toContain('hover:border-[var(--color-numberinput-border-error)]');
    });
  });

  // Sizes
  describe('Sizes', () => {
    it('rendert sm Size mit Token-Hoehe', () => {
      const { container } = render(<NumberInput inputSize="sm" />);
      expect((container.firstChild as HTMLElement).className).toContain('--sizing-input-sm-height');
    });

    it('rendert md Size mit Token-Hoehe (default)', () => {
      const { container } = render(<NumberInput />);
      expect((container.firstChild as HTMLElement).className).toContain('--sizing-input-md-height');
    });

    it('rendert lg Size mit Token-Hoehe', () => {
      const { container } = render(<NumberInput inputSize="lg" />);
      expect((container.firstChild as HTMLElement).className).toContain('--sizing-input-lg-height');
    });

    it('nutzt Token-basierte Font-Size', () => {
      render(<NumberInput inputSize="sm" />);
      expect(screen.getByRole('spinbutton').className).toContain('--sizing-input-sm-font-size');
    });
  });

  // Token-Klassen
  describe('Token-Klassen', () => {
    it('hat Background-Token', () => {
      const { container } = render(<NumberInput />);
      expect((container.firstChild as HTMLElement).className).toContain('--color-numberinput-bg');
    });

    it('hat Border-Token', () => {
      const { container } = render(<NumberInput />);
      expect((container.firstChild as HTMLElement).className).toContain('--color-numberinput-border');
    });

    it('hat Radius-Token', () => {
      const { container } = render(<NumberInput />);
      expect((container.firstChild as HTMLElement).className).toContain('--radius-numberinput');
    });

    it('hat Text-Token auf Input', () => {
      render(<NumberInput />);
      expect(screen.getByRole('spinbutton').className).toContain('--color-numberinput-text');
    });
  });

  // Controlled vs Uncontrolled
  describe('Controlled vs Uncontrolled', () => {
    it('aktualisiert internen State (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<NumberInput defaultValue={0} />);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(screen.getByRole('spinbutton')).toHaveValue(1);
    });

    it('aendert Anzeige nicht bei controlled ohne onChange', async () => {
      const user = userEvent.setup();
      render(<NumberInput value={5} />);
      await user.click(screen.getByRole('button', { name: 'Wert erhoehen' }));
      expect(screen.getByRole('spinbutton')).toHaveValue(5);
    });
  });
});
