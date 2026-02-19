import React from 'react';
import { cn } from '../../utils/cn';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '../AlertDialog';
import type { ConfirmOptions } from './useConfirm';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ConfirmDialogInnerProps {
  open: boolean;
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

// ─── Variant Styles ─────────────────────────────────────────────────────────

const actionVariantClasses: Record<NonNullable<ConfirmOptions['variant']>, string> = {
  info: [
    'bg-[var(--color-btn-primary-bg)]',
    'text-[var(--color-btn-primary-text)]',
    'hover:bg-[var(--color-btn-primary-bg-hover)]',
  ].join(' '),
  warning: [
    'bg-[var(--color-bg-warning-solid)]',
    'text-[var(--color-text-base)]',
    'hover:opacity-90',
  ].join(' '),
  danger: [
    'bg-[var(--color-bg-error-solid)]',
    'text-[var(--color-text-inverse)]',
    'hover:opacity-90',
  ].join(' '),
};

// ─── Component ──────────────────────────────────────────────────────────────

const ConfirmDialogInner: React.FC<ConfirmDialogInnerProps> = ({
  open,
  options,
  onConfirm,
  onCancel,
}) => {
  const variant = options.variant ?? 'info';

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>
          {options.message && (
            <AlertDialogDescription>{options.message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {options.cancelLabel ?? 'Abbrechen'}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(actionVariantClasses[variant])}
            onClick={onConfirm}
          >
            {options.confirmLabel ?? 'Bestätigen'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

ConfirmDialogInner.displayName = 'ConfirmDialogInner';

export { ConfirmDialogInner };
