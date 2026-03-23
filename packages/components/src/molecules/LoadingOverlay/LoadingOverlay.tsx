import React from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../../atoms/Spinner';

// Component token CSS
import '@nordlig/styles/tokens/loadingoverlay';

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lade-Text unter dem Spinner */
  text?: string;
  /** Backdrop-Blur aktivieren */
  blur?: boolean;
  /** Spinner-Groesse */
  spinnerSize?: 'sm' | 'md' | 'lg';
  /** Sichtbar/Unsichtbar */
  visible?: boolean;
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  (
    {
      className,
      text,
      blur = false,
      spinnerSize = 'md',
      visible = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-busy={visible ? 'true' : undefined}
        aria-label={text ?? 'Laden'}
        hidden={!visible || undefined}
        className={cn(
          'absolute inset-0 z-10 flex flex-col items-center justify-center',
          'rounded-[var(--radius-ldovl)]',
          'bg-[var(--color-ldovl-bg)]',
          blur && 'backdrop-blur-sm',
          className
        )}
        {...props}
      >
        <Spinner
          size={spinnerSize}
          aria-hidden="true"
          className="text-[color:var(--color-ldovl-spinner)]"
        />
        {text && (
          <p className="mt-[var(--spacing-ldovl-gap)] text-[length:var(--font-ldovl-text-size)] text-[color:var(--color-ldovl-text)]">
            {text}
          </p>
        )}
      </div>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';

export { LoadingOverlay };
