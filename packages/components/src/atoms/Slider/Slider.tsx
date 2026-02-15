import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showValue?: boolean;
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue = false, value, defaultValue, ...props }, ref) => {
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
    <div className="flex w-full items-center gap-3">
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={value ? undefined : defaultValue}
        onValueChange={handleValueChange}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-[var(--radius-slider-track)] bg-[var(--color-slider-track)]">
          <SliderPrimitive.Range className="absolute h-full bg-[var(--color-slider-range)]" />
        </SliderPrimitive.Track>
        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-[var(--radius-slider-thumb)] bg-[var(--color-slider-thumb)] border-2 border-[var(--color-slider-thumb-border)] hover:border-[var(--color-slider-thumb-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 transition-colors cursor-pointer"
          />
        ))}
      </SliderPrimitive.Root>
      {showValue && (
        <span className="min-w-[3ch] text-sm font-medium tabular-nums">
          {currentValue.join(' – ')}
        </span>
      )}
    </div>
  );
});
Slider.displayName = 'Slider';

export { Slider };
