import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/slider';
import '@nordlig/styles/tokens/text';

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showValue?: boolean;
  /** Accessible label for the slider (required for a11y) */
  'aria-label'?: string;
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue = false, value, defaultValue, 'aria-label': ariaLabel, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? value ?? [0]
  );

  const currentValue = value ?? internalValue;

  const handleValueChange = (newValue: number[]) => {
    if (!value) {
      setInternalValue(newValue);
    }
    props.onValueChange?.(newValue);
  };

  return (
    <div className="flex w-full items-center gap-[var(--spacing-slider-gap)]">
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={value ? undefined : defaultValue}
        onValueChange={handleValueChange}
        aria-label={ariaLabel || 'Slider'}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-[var(--sizing-slider-track-height)] w-full grow overflow-hidden rounded-[var(--radius-slider-track)] bg-[var(--color-slider-track)]">
          <SliderPrimitive.Range className="absolute h-full bg-[var(--color-slider-range)]" />
        </SliderPrimitive.Track>
        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-[var(--sizing-slider-thumb-size)] w-[var(--sizing-slider-thumb-size)] rounded-[var(--radius-slider-thumb)] bg-[var(--color-slider-thumb)] [border-width:var(--sizing-slider-thumb-border-width)] border-[var(--color-slider-thumb-border)] hover:border-[var(--color-slider-thumb-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 transition-colors cursor-pointer"
          />
        ))}
      </SliderPrimitive.Root>
      {showValue && (
        <span className="min-w-[3ch] text-[length:var(--font-slider-value-size)] [font-weight:var(--font-slider-value-weight)] text-[var(--color-text-base)] tabular-nums">
          {currentValue.join(' – ')}
        </span>
      )}
    </div>
  );
});
Slider.displayName = 'Slider';

export { Slider };
