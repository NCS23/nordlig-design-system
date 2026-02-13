import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, CheckCircle, XCircle, AlertTriangle, Info, type LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

// ─── Toast Variant Styles ────────────────────────────────────────────────────

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-start gap-[var(--spacing-toast-gap)]',
    'overflow-hidden rounded-[var(--radius-toast)] border border-[var(--color-toast-border)]',
    'bg-[var(--color-toast-bg)] p-[var(--spacing-toast-padding)]',
    '[box-shadow:var(--shadow-toast)]',
    'border-l-4',
    'data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=open]:fade-in-0',
    'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
    'data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full',
    'duration-300',
  ].join(' '),
  {
    variants: {
      variant: {
        success: 'border-l-[var(--color-toast-success-border)]',
        error: 'border-l-[var(--color-toast-error-border)]',
        warning: 'border-l-[var(--color-toast-warning-border)]',
        info: 'border-l-[var(--color-toast-info-border)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  onClose?: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

// ─── Default durations per variant ───────────────────────────────────────────

const DEFAULT_DURATIONS: Record<ToastVariant, number> = {
  success: 3000,
  error: 7000,
  warning: 5000,
  info: 4000,
};

// ─── Icon Map ────────────────────────────────────────────────────────────────

const VARIANT_ICONS: Record<ToastVariant, LucideIcon> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const VARIANT_ICON_CLASSES: Record<ToastVariant, string> = {
  success: 'text-[var(--color-toast-success-icon)]',
  error: 'text-[var(--color-toast-error-icon)]',
  warning: 'text-[var(--color-toast-warning-icon)]',
  info: 'text-[var(--color-toast-info-icon)]',
};

// ─── Toast Context ───────────────────────────────────────────────────────────

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// ─── Viewport Position ───────────────────────────────────────────────────────

const VIEWPORT_POSITIONS = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
} as const;

// ─── Single Toast ────────────────────────────────────────────────────────────

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = 'info', title, description, onClose, ...props }, ref) => {
  const Icon = VARIANT_ICONS[variant!];
  const iconClass = VARIANT_ICON_CLASSES[variant!];

  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant, className }))}
      {...props}
    >
      <div className="flex-shrink-0 pt-0.5">
        <Icon size={20} className={iconClass} />
      </div>
      <div className="flex-1 min-w-0">
        <ToastPrimitive.Title className="text-sm font-semibold text-[var(--color-toast-title)]">
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="mt-1 text-sm text-[var(--color-toast-description)]">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>
      <ToastPrimitive.Close
        className={cn(
          'flex-shrink-0 inline-flex items-center justify-center',
          'h-5 w-5 rounded transition-colors',
          'text-[var(--color-toast-description)]',
          'hover:bg-[var(--color-toast-close-hover-bg)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]'
        )}
        aria-label="Schließen"
        onClick={onClose}
      >
        <X size={14} />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
});
Toast.displayName = 'Toast';

// ─── Toast Provider ──────────────────────────────────────────────────────────

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const contextValue = React.useMemo(
    () => ({ toast, dismiss }),
    [toast, dismiss]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant || 'info'}
            title={t.title}
            description={t.description}
            duration={t.duration || DEFAULT_DURATIONS[t.variant || 'info']}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
            onClose={() => dismiss(t.id)}
          />
        ))}
        <ToastPrimitive.Viewport
          className={cn(
            'fixed z-[100] flex flex-col gap-2',
            'p-[var(--spacing-toast-viewport-padding)]',
            'max-w-md w-full',
            VIEWPORT_POSITIONS[position]
          )}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
ToastProvider.displayName = 'ToastProvider';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Toast, ToastProvider, toastVariants };
