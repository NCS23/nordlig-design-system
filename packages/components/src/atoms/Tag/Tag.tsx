import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-[var(--radius-tag)] [border-width:var(--sizing-tag-border-width)] [font-weight:var(--font-tag-weight)] transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-tag-bg-default)] text-[var(--color-tag-text-default)] border-[var(--color-tag-border-default)]',
        success:
          'bg-[var(--color-tag-bg-success)] text-[var(--color-tag-text-success)] border-[var(--color-tag-border-success)]',
        warning:
          'bg-[var(--color-tag-bg-warning)] text-[var(--color-tag-text-warning)] border-[var(--color-tag-border-warning)]',
        error:
          'bg-[var(--color-tag-bg-error)] text-[var(--color-tag-text-error)] border-[var(--color-tag-border-error)]',
        info:
          'bg-[var(--color-tag-bg-info)] text-[var(--color-tag-text-info)] border-[var(--color-tag-border-info)]',
      },
      size: {
        sm: 'px-2 py-0.5 text-[length:var(--font-tag-sm-size)]',
        md: 'px-3 py-1 text-[length:var(--font-tag-md-size)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'>,
    VariantProps<typeof tagVariants> {
  /** Tag-Inhalt */
  children: React.ReactNode;
  /** Zeigt X-Button und macht Tag entfernbar */
  onRemove?: () => void;
  /** Macht Tag klickbar */
  onClick?: () => void;
}

/**
 * Tag/Chip-Komponente fuer kategorisierte Informationen oder Status.
 * Unterstuetzt Varianten, Groessen, Entfernen und Klick-Interaktion.
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ children, variant, size, onRemove, onClick, className, ...props }, ref) => {
    const isInteractive = !!onClick;

    const handleClick = () => {
      onClick?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick();
      }
    };

    const handleRemove = (event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove?.();
    };

    const handleRemoveKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        onRemove?.();
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ variant, size }),
          isInteractive && 'cursor-pointer hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tag-border-focus)] focus-visible:ring-offset-1',
          className
        )}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        {...props}
      >
        <span className="truncate">{children}</span>
        {onRemove && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-tag-border-focus)] transition-colors"
            onClick={handleRemove}
            onKeyDown={handleRemoveKeyDown}
            aria-label="Tag entfernen"
          >
            <X size={size === 'sm' ? 10 : 12} />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
