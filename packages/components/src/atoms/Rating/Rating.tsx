import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Aktuelle Bewertung */
  value?: number;
  /** Callback bei Wertaenderung */
  onChange?: (value: number) => void;
  /** Maximale Anzahl Sterne */
  max?: number;
  /** Read-only Modus */
  readOnly?: boolean;
  /** Groesse */
  size?: 'sm' | 'md' | 'lg';
  /** Halbe Sterne erlauben */
  precision?: 0.5 | 1;
  /** Disabled */
  disabled?: boolean;
}

const sizeMap = {
  sm: { icon: 16, class: 'w-[var(--sizing-rtg-sm)] h-[var(--sizing-rtg-sm)]' },
  md: { icon: 20, class: 'w-[var(--sizing-rtg-md)] h-[var(--sizing-rtg-md)]' },
  lg: { icon: 24, class: 'w-[var(--sizing-rtg-lg)] h-[var(--sizing-rtg-lg)]' },
} as const;

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      onChange,
      max = 5,
      readOnly = false,
      size = 'md',
      precision = 1,
      disabled = false,
      'aria-label': ariaLabel,
      ...restProps
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const isInteractive = !readOnly && !disabled;
    const useRadioGroupRole = isInteractive;
    const displayValue = hoverValue ?? value;

    const handleClick = (starValue: number) => {
      if (!isInteractive) return;
      onChange?.(starValue);
    };

    const handleMouseEnter = (starValue: number) => {
      if (!isInteractive) return;
      setHoverValue(starValue);
    };

    const handleMouseLeave = () => {
      if (!isInteractive) return;
      setHoverValue(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isInteractive) return;

      let newValue = value;
      const step = precision;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = Math.min(value + step, max);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = Math.max(value - step, 0);
          break;
        case 'Home':
          e.preventDefault();
          newValue = 0;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      onChange?.(newValue);
    };

    const { icon: iconSize } = sizeMap[size];
    const activeStarIndex = Math.max(0, Math.ceil(value) - 1);

    const renderStar = (index: number) => {
      const starNumber = index + 1;
      const isFull = displayValue >= starNumber;
      const isHalf = precision === 0.5 && !isFull && displayValue >= starNumber - 0.5;

      return (
        <span
          key={index}
          role={useRadioGroupRole ? 'radio' : undefined}
          aria-checked={useRadioGroupRole ? value >= starNumber : undefined}
          aria-label={useRadioGroupRole ? `${starNumber} Stern${starNumber > 1 ? 'e' : ''}` : undefined}
          tabIndex={useRadioGroupRole ? (index === activeStarIndex ? 0 : -1) : -1}
          onClick={() => {
            if (precision === 0.5) {
              handleClick(value === starNumber ? starNumber - 0.5 : starNumber);
            } else {
              handleClick(starNumber);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (precision === 0.5) {
                handleClick(value === starNumber ? starNumber - 0.5 : starNumber);
              } else {
                handleClick(starNumber);
              }
            }
          }}
          onMouseEnter={() => handleMouseEnter(starNumber)}
          className={cn(
            'relative inline-flex shrink-0',
            sizeMap[size].class,
            isInteractive && 'cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {/* Leerer Stern (Hintergrund) */}
          <Star
            size={iconSize}
            aria-hidden="true"
            className="absolute inset-0 text-[color:var(--color-rtg-empty)]"
            fill="currentColor"
            strokeWidth={0}
          />

          {/* Voller oder halber Stern */}
          {(isFull || isHalf) && (
            <Star
              size={iconSize}
              aria-hidden="true"
              className={cn(
                'absolute inset-0',
                hoverValue !== null
                  ? 'text-[color:var(--color-rtg-hover)]'
                  : 'text-[color:var(--color-rtg-filled)]'
              )}
              fill="currentColor"
              strokeWidth={0}
              style={isHalf ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
            />
          )}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        role={useRadioGroupRole ? 'radiogroup' : 'img'}
        aria-label={ariaLabel ?? `Bewertung: ${value} von ${max}`}
        aria-orientation={useRadioGroupRole ? 'horizontal' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-[var(--spacing-rtg-gap)]',
          isInteractive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1 rounded-sm',
          className
        )}
        {...restProps}
      >
        {Array.from({ length: max }, (_, i) => renderStar(i))}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export { Rating };
