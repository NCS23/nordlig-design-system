import React from 'react';
import { ConfirmDialogInner, type ConfirmDialogInnerProps } from './ConfirmDialog';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ConfirmOptions {
  /** Titel des Bestaetigungsdialogs */
  title: string;
  /** Optionale Beschreibung / Nachricht */
  message?: string;
  /** Variante bestimmt das Styling des Aktions-Buttons */
  variant?: 'info' | 'warning' | 'danger';
  /** Label fuer den Bestaetigungs-Button (Standard: "Bestaetigen") */
  confirmLabel?: string;
  /** Label fuer den Abbrechen-Button (Standard: "Abbrechen") */
  cancelLabel?: string;
}

export interface UseConfirmReturn {
  /** Oeffnet den Dialog und gibt ein Promise zurueck, das mit true (bestaetigt) oder false (abgebrochen) aufgeloest wird */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  /** Die Dialog-Komponente, die im Render-Tree eingebunden werden muss */
  ConfirmDialogComponent: React.FC;
}

// ─── Internal State ─────────────────────────────────────────────────────────

interface ConfirmState {
  open: boolean;
  options: ConfirmOptions;
}

const DEFAULT_OPTIONS: ConfirmOptions = {
  title: '',
  variant: 'info',
  confirmLabel: 'Bestätigen',
  cancelLabel: 'Abbrechen',
};

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useConfirm(): UseConfirmReturn {
  const [state, setState] = React.useState<ConfirmState>({
    open: false,
    options: DEFAULT_OPTIONS,
  });

  const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

  // Cleanup on unmount: resolve any pending promise as cancelled
  React.useEffect(() => {
    return () => {
      resolveRef.current?.(false);
      resolveRef.current = null;
    };
  }, []);

  const confirm = React.useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      // Resolve any pending previous promise as cancelled
      resolveRef.current?.(false);
      resolveRef.current = resolve;
      setState({
        open: true,
        options: { ...DEFAULT_OPTIONS, ...options },
      });
    });
  }, []);

  const handleConfirm = React.useCallback(() => {
    resolveRef.current?.(true);
    resolveRef.current = null;
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const handleCancel = React.useCallback(() => {
    resolveRef.current?.(false);
    resolveRef.current = null;
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const ConfirmDialogComponent = React.useCallback<React.FC>(
    () =>
      React.createElement(ConfirmDialogInner, {
        open: state.open,
        options: state.options,
        onConfirm: handleConfirm,
        onCancel: handleCancel,
      } satisfies ConfirmDialogInnerProps),
    [state.open, state.options, handleConfirm, handleCancel]
  );

  ConfirmDialogComponent.displayName = 'ConfirmDialogComponent';

  return {
    confirm,
    ConfirmDialogComponent,
  };
}
