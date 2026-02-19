import React, { useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Berechnet die Anzahl Dezimalstellen eines Wertes */
function getPrecision(val: number): number {
  const str = String(val);
  const dot = str.indexOf('.');
  return dot === -1 ? 0 : str.length - dot - 1;
}

/** Praezises Addieren ohne Floating-Point-Fehler */
function preciseAdd(a: number, b: number): number {
  const precision = Math.max(getPrecision(a), getPrecision(b));
  const factor = 10 ** precision;
  return Math.round(a * factor + b * factor) / factor;
}

const numberInputVariants = cva(
  [
    'flex items-center [border-width:var(--sizing-numberinput-border-width)] rounded-[var(--radius-numberinput)] bg-[var(--color-numberinput-bg)]',
    'transition-colors',
    'focus-within:ring-2 focus-within:ring-[var(--color-numberinput-border-focus)] focus-within:ring-offset-1 focus-within:border-[var(--color-numberinput-border-focus)]',
  ].join(' '),
  {
    variants: {
      inputSize: {
        sm: 'h-[var(--sizing-input-sm-height)]',
        md: 'h-[var(--sizing-input-md-height)]',
        lg: 'h-[var(--sizing-input-lg-height)]',
      },
      error: {
        true: 'border-[var(--color-numberinput-border-error)] hover:border-[var(--color-numberinput-border-error)] focus-within:ring-[var(--color-numberinput-border-error)] focus-within:border-[var(--color-numberinput-border-error)]',
        false: 'border-[var(--color-numberinput-border)] hover:border-[var(--color-numberinput-border-hover)]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed bg-[var(--color-numberinput-bg-disabled)]',
        false: '',
      },
    },
    defaultVariants: {
      inputSize: 'md',
      error: false,
      disabled: false,
    },
  }
);

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'type'>,
    Omit<VariantProps<typeof numberInputVariants>, 'error' | 'disabled'> {
  /** Aktueller Wert (controlled) */
  value?: number;
  /** Default-Wert (uncontrolled) */
  defaultValue?: number;
  /** Change-Handler */
  onChange?: (value: number) => void;
  /** Minimaler Wert */
  min?: number;
  /** Maximaler Wert */
  max?: number;
  /** Schrittweite */
  step?: number;
  /** Fehlerzustand */
  error?: boolean;
  /** Deaktiviert */
  disabled?: boolean;
  /** aria-label fuer Minus-Button */
  decrementLabel?: string;
  /** aria-label fuer Plus-Button */
  incrementLabel?: string;
}

/**
 * Numerisches Eingabefeld mit +/- Stepper-Buttons.
 * Unterstuetzt min/max, step, Keyboard (ArrowUp/Down) und Mouse-Wheel.
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      min,
      max,
      step = 1,
      error = false,
      disabled = false,
      inputSize = 'md',
      decrementLabel = 'Wert verringern',
      incrementLabel = 'Wert erhoehen',
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [displayValue, setDisplayValue] = React.useState(String(defaultValue));
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Display-Wert synchronisieren wenn sich controlled-Value aendert
    React.useEffect(() => {
      if (isControlled) {
        setDisplayValue(String(controlledValue));
      }
    }, [isControlled, controlledValue]);

    const clamp = useCallback(
      (val: number) => {
        let clamped = val;
        if (min !== undefined) clamped = Math.max(min, clamped);
        if (max !== undefined) clamped = Math.min(max, clamped);
        return clamped;
      },
      [min, max]
    );

    const updateValue = useCallback(
      (newValue: number) => {
        const clamped = clamp(newValue);
        if (!isControlled) {
          setInternalValue(clamped);
          setDisplayValue(String(clamped));
        }
        onChange?.(clamped);
      },
      [clamp, isControlled, onChange]
    );

    const increment = () => {
      if (disabled) return;
      updateValue(preciseAdd(currentValue, step));
    };

    const decrement = () => {
      if (disabled) return;
      updateValue(preciseAdd(currentValue, -step));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setDisplayValue(raw);

      // Erlaube leeres Feld und Zwischenzustaende wie "-" oder "1."
      if (raw === '' || raw === '-' || raw.endsWith('.')) return;

      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        if (!isControlled) setInternalValue(parsed);
        onChange?.(parsed);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Beim Verlassen: clampen und Display synchronisieren
      const parsed = parseFloat(displayValue);
      if (isNaN(parsed) || displayValue === '' || displayValue === '-') {
        // Ungueltig → auf aktuellen Wert zuruecksetzen
        setDisplayValue(String(currentValue));
      } else {
        const clamped = clamp(parsed);
        updateValue(clamped);
        setDisplayValue(String(clamped));
      }
      props.onBlur?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      }
    };

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      if (document.activeElement !== e.currentTarget) return;
      e.preventDefault();
      if (e.deltaY < 0) increment();
      else if (e.deltaY > 0) decrement();
    };

    const isAtMin = min !== undefined && currentValue <= min;
    const isAtMax = max !== undefined && currentValue >= max;

    const iconSize = inputSize === 'sm' ? 14 : inputSize === 'lg' ? 18 : 16;
    const hasDecimalStep = getPrecision(step) > 0;

    return (
      <div
        role="group"
        aria-label={ariaLabel || 'Numerische Eingabe'}
        className={cn(
          numberInputVariants({ inputSize, error, disabled }),
          className
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled || isAtMin}
          onClick={decrement}
          aria-label={decrementLabel}
          className="flex items-center justify-center px-2 h-full text-[var(--color-numberinput-stepper-text)] hover:text-[var(--color-numberinput-stepper-text-hover)] hover:bg-[var(--color-numberinput-stepper-bg-hover)] rounded-l-[var(--radius-numberinput)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <Minus size={iconSize} />
        </button>

        <input
          ref={ref}
          type="number"
          inputMode={hasDecimalStep ? 'decimal' : 'numeric'}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          aria-invalid={error || undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          className={cn(
            'w-full text-center bg-transparent border-none outline-none text-[var(--color-numberinput-text)] [font-weight:var(--font-numberinput-weight)]',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            inputSize === 'sm'
              ? 'text-[length:var(--sizing-input-sm-font-size)]'
              : inputSize === 'lg'
                ? 'text-[length:var(--sizing-input-lg-font-size)]'
                : 'text-[length:var(--sizing-input-md-font-size)]'
          )}
          {...props}
          onBlur={handleBlur}
        />

        <button
          type="button"
          tabIndex={-1}
          disabled={disabled || isAtMax}
          onClick={increment}
          aria-label={incrementLabel}
          className="flex items-center justify-center px-2 h-full text-[var(--color-numberinput-stepper-text)] hover:text-[var(--color-numberinput-stepper-text-hover)] hover:bg-[var(--color-numberinput-stepper-bg-hover)] rounded-r-[var(--radius-numberinput)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <Plus size={iconSize} />
        </button>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export { NumberInput, numberInputVariants };
