import React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ──────────────────────────────────────────────────────────────────

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

// ─── Command Root ───────────────────────────────────────────────────────────

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'rounded-[var(--radius-command)]',
      'border border-[var(--color-command-border)]',
      'bg-[var(--color-command-bg)]',
      '[box-shadow:var(--shadow-command)]',
      'overflow-hidden',
      className
    )}
    {...props}
  />
));
Command.displayName = 'Command';

// ─── CommandInput ───────────────────────────────────────────────────────────

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-[var(--color-command-border)] px-3" cmdk-input-wrapper="" role="search">
    <Icon icon={Search} size="sm" className="mr-2 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      role="combobox"
      className={cn(
        'flex h-[var(--sizing-input-md-height)] w-full bg-transparent text-sm',
        'text-[var(--color-command-input-text)]',
        'placeholder:text-[var(--color-command-input-placeholder)]',
        'outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = 'CommandInput';

// ─── CommandList ────────────────────────────────────────────────────────────

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'max-h-[300px] overflow-y-auto overflow-x-hidden p-1',
      className
    )}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

// ─── CommandEmpty ───────────────────────────────────────────────────────────

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(
      'py-6 text-center text-sm text-[var(--color-command-empty-text)]',
      className
    )}
    {...props}
  />
));
CommandEmpty.displayName = 'CommandEmpty';

// ─── CommandGroup ───────────────────────────────────────────────────────────

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1',
      '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
      '[&_[cmdk-group-heading]]:text-[var(--color-command-group-heading)]',
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5',
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

// ─── CommandItem ────────────────────────────────────────────────────────────

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-[var(--radius-component-md)] px-2 py-1.5 text-sm',
      'text-[var(--color-command-item-text)]',
      'outline-none transition-colors',
      'data-[selected=true]:bg-[var(--color-command-item-hover-bg)]',
      'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className
    )}
    {...props}
  />
));
CommandItem.displayName = 'CommandItem';

// ─── CommandSeparator ───────────────────────────────────────────────────────

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(
      'h-px bg-[var(--color-command-separator)] -mx-1 my-1',
      className
    )}
    {...props}
  />
));
CommandSeparator.displayName = 'CommandSeparator';

// ─── CommandShortcut ────────────────────────────────────────────────────────

const CommandShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'ml-auto text-xs tracking-widest opacity-60',
      className
    )}
    {...props}
  />
));
CommandShortcut.displayName = 'CommandShortcut';

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
