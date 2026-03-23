import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

// Component token CSS
import '@nordlig/styles/tokens/copybutton';

/** Groessen-Konfiguration fuer die drei Button-Varianten (token-basiert) */
const sizeMap = {
  sm: { btn: 'h-[var(--sizing-cpybtn-sm)] w-[var(--sizing-cpybtn-sm)]', icon: 14 },
  md: { btn: 'h-[var(--sizing-cpybtn-md)] w-[var(--sizing-cpybtn-md)]', icon: 16 },
  lg: { btn: 'h-[var(--sizing-cpybtn-lg)] w-[var(--sizing-cpybtn-lg)]', icon: 18 },
} as const;

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onError'> {
  /** Der zu kopierende Text */
  value: string;
  /** Dauer in ms, bis das Icon zurueckwechselt (Standard: 2000) */
  timeout?: number;
  /** Callback nach erfolgreichem Kopieren */
  onCopy?: () => void;
  /** Callback bei fehlgeschlagenem Kopieren */
  onError?: (error: Error) => void;
  /** Button-Groesse */
  size?: 'sm' | 'md' | 'lg';
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, timeout = 2000, onCopy, onError, size = 'md', onClick, ...props }, ref) => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Timeout beim Unmount aufraeumen
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleClick = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          onCopy?.();

          // Vorherigen Timeout loeschen, falls vorhanden
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            setCopied(false);
          }, timeout);
        } catch (err) {
          onError?.(err instanceof Error ? err : new Error('Clipboard write failed'));
        }

        onClick?.(e);
      },
      [value, timeout, onCopy, onError, onClick],
    );

    const { btn: btnSize, icon: iconSize } = sizeMap[size];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={copied ? 'Kopiert' : 'In Zwischenablage kopieren'}
        className={cn(
          'inline-flex items-center justify-center',
          btnSize,
          'rounded-[var(--radius-cpybtn)]',
          'border border-[var(--color-cpybtn-border)]',
          'bg-[var(--color-cpybtn-bg)]',
          'hover:bg-[var(--color-cpybtn-bg-hover)]',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
        onClick={handleClick}
      >
        {copied ? (
          <Icon icon={Check} size={iconSize} className="text-[var(--color-cpybtn-icon-copied)]" />
        ) : (
          <Icon icon={Copy} size={iconSize} className="text-[var(--color-cpybtn-icon)]" />
        )}
      </button>
    );
  },
);

CopyButton.displayName = 'CopyButton';

export { CopyButton };
