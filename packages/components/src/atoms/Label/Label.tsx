import React from 'react';
import { cn } from '../../utils/cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Zeigt einen roten Stern (*) an, um Pflichtfelder zu kennzeichnen */
  required?: boolean;
  /** Reduziert die Deckkraft und deaktiviert den Cursor */
  disabled?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, disabled, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-[length:var(--font-label-size)] [font-weight:var(--font-label-weight)] text-[var(--color-text-base)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span aria-hidden="true" className="text-[var(--color-text-error)] ml-0.5">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };
