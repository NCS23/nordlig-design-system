import React from 'react';
import {
  Group as PanelGroup,
  Panel,
  Separator as PanelSeparator,
  type GroupProps,
  type PanelProps as LibPanelProps,
  type SeparatorProps,
} from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ──────────────────────────────────────────────────────────────────

export type ResizablePanelGroupProps = GroupProps;

export type ResizablePanelProps = LibPanelProps;

export interface ResizableHandleProps extends SeparatorProps {
  /** Zeigt einen visuellen Griff-Indikator in der Mitte des Handles */
  withHandle?: boolean;
}

// ─── ResizablePanelGroup ────────────────────────────────────────────────────
// Group in v4 nutzt elementRef statt ref, forwardRef wrapper fuer konsistente API

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(({ className, ...props }, ref) => (
  <PanelGroup
    elementRef={ref}
    className={cn(
      'flex h-full w-full',
      className
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

// ─── ResizablePanel ─────────────────────────────────────────────────────────
// Panel hat einen eigenen ref-Mechanismus (panelRef/elementRef), daher kein forwardRef noetig

const ResizablePanel = Panel;
ResizablePanel.displayName = 'ResizablePanel';

// ─── ResizableHandle ────────────────────────────────────────────────────────
// Separator (v4) akzeptiert children und className
// forwardRef fuer konsistente API, Hit-Area mind. 24px breit (WCAG 2.5.8)

const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  ResizableHandleProps
>(({ className, withHandle = false, ...props }, ref) => (
  <PanelSeparator
    className={cn(
      'relative flex w-px items-center justify-center',
      'bg-[var(--color-rsz-panel-border)]',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-6 after:-translate-x-1/2',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
      '[&[data-separator=active]]:bg-[var(--color-rsz-handle-hover-bg)]',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        ref={ref}
        className={cn(
          'z-10 flex h-4 w-3 items-center justify-center',
          'rounded-[var(--radius-rsz-handle)]',
          'border border-[var(--color-rsz-handle-border)]',
          'bg-[var(--color-rsz-handle-bg)]',
        )}
      >
        <Icon icon={GripVertical} size={10} className="text-[var(--color-rsz-handle-border)]" />
      </div>
    )}
  </PanelSeparator>
));
ResizableHandle.displayName = 'ResizableHandle';

// ─── Exports ────────────────────────────────────────────────────────────────

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
