import React from 'react';
import { cn } from '../../utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SpoilerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Ob der Inhalt sichtbar ist (controlled) */
  open?: boolean;
  /** Callback bei Zustandswechsel */
  onOpenChange?: (open: boolean) => void;
  /** Text im verdeckten Zustand */
  label?: string;
}

// ─── Spoiler ────────────────────────────────────────────────────────────────

const Spoiler = React.forwardRef<HTMLSpanElement, SpoilerProps>(
  (
    {
      className,
      children,
      open: controlledOpen,
      onOpenChange,
      label = 'Spoiler',
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
      onClick?.(e);
    };

    return (
      <span
        ref={ref}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className={cn(
          'inline rounded-[var(--radius-spl)]',
          'px-[var(--spacing-spl-px)] py-[var(--spacing-spl-py)]',
          'cursor-pointer transition-colors select-none',
          isOpen
            ? 'bg-transparent text-[color:var(--color-spl-text)]'
            : 'bg-[var(--color-spl-bg)] text-[color:var(--color-spl-bg)] hover:border-[var(--color-spl-border)]',
          className
        )}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
          }
        }}
        {...props}
      >
        {isOpen ? (
          children
        ) : (
          <span
            className="text-[length:var(--font-spl-hint-size)] text-[color:var(--color-spl-hint)]"
            aria-hidden="true"
          >
            {label}
          </span>
        )}
      </span>
    );
  }
);

Spoiler.displayName = 'Spoiler';

export { Spoiler };
