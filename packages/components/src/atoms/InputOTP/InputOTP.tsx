import React from 'react';
import { OTPInput, OTPInputContext, type OTPInputProps as BaseOTPInputProps } from 'input-otp';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/input';
import '@nordlig/styles/tokens/inputotp';

/* ─── InputOTP ──────────────────────────────────────────────────────────────── */

export type InputOTPProps = BaseOTPInputProps & {
  error?: boolean;
};

const InputOTP = React.forwardRef<React.ComponentRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, error, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        'flex items-center gap-[var(--spacing-inputotp-gap)] group/otp',
        error && 'has-error',
        containerClassName
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
);
InputOTP.displayName = 'InputOTP';

/* ─── InputOTPGroup ─────────────────────────────────────────────────────────── */

export interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-[var(--spacing-inputotp-gap)]', className)}
      {...props}
    />
  )
);
InputOTPGroup.displayName = 'InputOTPGroup';

/* ─── InputOTPSlot ──────────────────────────────────────────────────────────── */

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const slot = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center',
          'h-[var(--sizing-inputotp-slot-size)] w-[var(--sizing-inputotp-slot-size)]',
          '[border-width:var(--sizing-inputotp-border-width)] border-[var(--color-inputotp-border)]',
          'bg-[var(--color-inputotp-bg)]',
          'rounded-[var(--radius-inputotp)]',
          'text-[length:var(--font-inputotp-size)] [font-weight:var(--font-inputotp-weight)] text-[var(--color-inputotp-text)]',
          'transition-colors',
          slot?.isActive && 'z-10 ring-2 ring-[var(--color-inputotp-border-focus)]',
          // Fehlerzustand vom Eltern-Element via .has-error Klasse
          'group-[.has-error]/otp:border-[var(--color-inputotp-border-error)]',
          className
        )}
        {...props}
      >
        {slot?.char ?? ''}
        {slot?.hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-[var(--color-inputotp-caret)]" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

/* ─── InputOTPSeparator ─────────────────────────────────────────────────────── */

export interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className="text-[var(--color-inputotp-separator)]"
      {...props}
    >
      &mdash;
    </div>
  )
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
