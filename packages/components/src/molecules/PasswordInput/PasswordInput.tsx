import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Groesse der Eingabe */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Fehlerzustand */
  error?: boolean;
  /** Passwort-Staerke (optional) */
  strength?: 'weak' | 'medium' | 'strong';
  /** Custom Staerke-Funktion (erhaelt Wert, gibt Staerke zurueck) */
  strengthFn?: (value: string) => 'weak' | 'medium' | 'strong' | undefined;
}

const strengthLabelMap = {
  weak: 'Schwach',
  medium: 'Mittel',
  strong: 'Stark',
} as const;

const strengthClassMap = {
  weak: 'bg-[var(--color-pwinput-strength-weak)]',
  medium: 'bg-[var(--color-pwinput-strength-medium)]',
  strong: 'bg-[var(--color-pwinput-strength-strong)]',
} as const;

const strengthWidthMap = {
  weak: 'w-1/3',
  medium: 'w-2/3',
  strong: 'w-full',
} as const;

const strengthValueMap = { weak: 1, medium: 2, strong: 3 } as const;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      inputSize = 'md',
      error = false,
      strength: strengthProp,
      strengthFn,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<string>(
      (defaultValue as string) ?? ''
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;

    // Staerke berechnen
    const computedStrength = strengthFn ? strengthFn(currentValue) : strengthProp;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const toggleVisibility = () => {
      setVisible((prev) => !prev);
    };

    return (
      <div className={cn('relative w-full', className)}>
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          aria-invalid={error || undefined}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            inputVariants({ inputSize, error }),
            'pr-[var(--spacing-pwinput-input-pr)]'
          )}
          {...props}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          aria-label={visible ? 'Passwort verbergen' : 'Passwort anzeigen'}
          className={cn(
            'absolute right-[var(--spacing-pwinput-toggle-inset)] top-1/2 -translate-y-1/2 transition-colors',
            'text-[color:var(--color-pwinput-toggle)] hover:text-[color:var(--color-pwinput-toggle-hover)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1 rounded-[var(--radius-pwinput-toggle)]',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          {visible ? <Icon icon={EyeOff} size="sm" /> : <Icon icon={Eye} size="sm" />}
        </button>

        {computedStrength && currentValue.length > 0 && (
          <div
            role="meter"
            aria-label="Passwortstaerke"
            aria-valuenow={strengthValueMap[computedStrength]}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuetext={strengthLabelMap[computedStrength]}
            className="mt-[var(--spacing-pwinput-strength-mt)]"
          >
            <div className="h-1 w-full rounded-[var(--radius-pwinput-strength)] bg-[var(--color-pwinput-toggle)] opacity-20">
              <div
                className={cn(
                  'h-full rounded-[var(--radius-pwinput-strength)] transition-all duration-300',
                  strengthWidthMap[computedStrength],
                  strengthClassMap[computedStrength]
                )}
              />
            </div>
            <p aria-live="polite" className="mt-[var(--spacing-pwinput-hint-mt)] text-[length:var(--font-pwinput-hint-size)] text-[color:var(--color-pwinput-toggle)]">
              {strengthLabelMap[computedStrength]}
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
