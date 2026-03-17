import React from 'react';
import { cn } from '../../utils/cn';

// ─── RadioGroup ──────────────────────────────────────────────────────────────

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the group */
  'aria-label'?: string;
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical';
  /** Name attribute passed to child Radio inputs */
  name?: string;
  /** Currently selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Called when selection changes */
  onValueChange?: (value: string) => void;
  /** Disables all radios in the group */
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      children,
      orientation = 'vertical',
      name,
      value,
      defaultValue,
      onValueChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = React.useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const radios = Array.from(
          e.currentTarget.querySelectorAll<HTMLInputElement>(
            'input[type="radio"]:not(:disabled)'
          )
        );
        const currentIndex = radios.findIndex(
          (r) => r === document.activeElement
        );
        if (currentIndex === -1) return;

        let nextIndex: number | null = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % radios.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + radios.length) % radios.length;
        }

        if (nextIndex !== null) {
          e.preventDefault();
          radios[nextIndex].focus();
          radios[nextIndex].click();
        }
      },
      []
    );

    // Clone children to inject name, checked, onChange, and disabled props
    interface RadioChildProps {
      value?: string;
      checked?: boolean;
      name?: string;
      disabled?: boolean;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }

    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement<RadioChildProps>(child)) return child;

      const childProps: Record<string, unknown> = {};

      // Pass name to children
      if (name) {
        childProps.name = name;
      }

      // Manage checked state — always set to avoid uncontrolled→controlled warning
      if (child.props.value !== undefined) {
        childProps.checked = child.props.value === currentValue;
      }

      // Manage onChange
      childProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (child.props.value !== undefined) {
          handleChange(child.props.value);
        }
        // Also call the child's original onChange if present
        if (typeof child.props.onChange === 'function') {
          child.props.onChange(e);
        }
      };

      // Pass disabled from group level (child-level disabled takes precedence)
      if (disabled && child.props.disabled === undefined) {
        childProps.disabled = true;
      }

      return React.cloneElement(child, childProps);
    });

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-orientation={orientation}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex',
          orientation === 'vertical'
            ? 'flex-col gap-[var(--spacing-radio-group-gap-v)]'
            : 'flex-row gap-[var(--spacing-radio-group-gap-h)]',
          className
        )}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { RadioGroup };
