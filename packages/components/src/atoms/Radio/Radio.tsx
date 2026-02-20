import React from 'react';
import { cn } from '../../utils/cn';

// ─── Radio ──────────────────────────────────────────────────────────────────

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text displayed next to the radio */
  label?: string;
  /** Description below the label */
  description?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    const autoId = React.useId();
    const radioId = id || autoId;
    const descriptionId = description ? `${radioId}-desc` : undefined;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'flex items-start gap-[var(--spacing-radio-item-gap)] p-2 rounded-[var(--radius-radio-item)] transition-colors',
          !disabled && 'hover:bg-[var(--color-radio-item-hover-bg)] cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        {/* Radio visual container: hidden input + circle + dot as siblings for peer selectors */}
        <span className="relative mt-0.5 inline-flex h-[var(--sizing-radio-button-size)] w-[var(--sizing-radio-button-size)] shrink-0 items-center justify-center">
          {/* Hidden native input — first child so peer-* works on siblings */}
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            aria-describedby={descriptionId}
            className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            {...props}
          />
          {/* Circle border — sibling of peer input */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0 rounded-full border-2 transition-all duration-200',
              'border-[var(--color-radio-border)] bg-[var(--color-radio-bg)]',
              'peer-hover:border-[var(--color-radio-border-hover)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-radio-focus-ring)] peer-focus-visible:ring-offset-1',
              'peer-disabled:cursor-not-allowed peer-disabled:bg-[var(--color-radio-disabled-bg)]',
              'peer-checked:border-[var(--color-radio-selected-border)]'
            )}
          />
          {/* Inner dot — sibling of peer input */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute rounded-full bg-[var(--color-radio-selected-dot)] transition-transform duration-200',
              'h-[var(--sizing-radio-dot-size)] w-[var(--sizing-radio-dot-size)]',
              'scale-0 peer-checked:scale-100'
            )}
          />
        </span>
        {/* Label + description */}
        {label && (
          <div className="flex flex-col gap-[var(--spacing-radio-content-gap)]">
            <span
              className={cn(
                'text-[length:var(--font-radio-label-size)] [font-weight:var(--font-radio-label-weight)] cursor-pointer text-[var(--color-radio-label)]',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </span>
            {description && (
              <p id={descriptionId} className="text-[length:var(--font-radio-description-size)] text-[var(--color-radio-description)]">
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);
Radio.displayName = 'Radio';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Radio };
