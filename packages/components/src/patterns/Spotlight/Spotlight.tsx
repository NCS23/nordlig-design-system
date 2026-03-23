import React, { useState, useEffect, useCallback } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';
import { Kbd } from '../../atoms/Kbd';

// Component token CSS
import '@nordlig/styles/tokens/spotlight';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SpotlightItem {
  /** Eindeutige ID */
  id: string;
  /** Anzeigename */
  label: string;
  /** Optionale Beschreibung */
  description?: string;
  /** Icon (ReactNode) */
  icon?: React.ReactNode;
  /** Tastenkombination-Anzeige (z.B. "Ctrl+N") */
  shortcut?: string;
  /** Callback bei Auswahl */
  onSelect?: () => void;
  /** Deaktiviert */
  disabled?: boolean;
  /** Schluesselwoerter fuer erweiterte Suche */
  keywords?: string[];
}

export interface SpotlightGroup {
  /** Gruppen-Label */
  label: string;
  /** Items in der Gruppe */
  items: SpotlightItem[];
}

export interface SpotlightProps {
  /** Suchbare Items/Gruppen */
  groups: SpotlightGroup[];
  /** Kontrolliert: offen/geschlossen */
  open?: boolean;
  /** Callback bei Oeffnen/Schliessen */
  onOpenChange?: (open: boolean) => void;
  /** Placeholder im Suchfeld */
  placeholder?: string;
  /** Text wenn nichts gefunden */
  emptyMessage?: string;
  /** Tastenkuerzel zum Oeffnen (default: "k") */
  shortcutKey?: string;
  /** Meta-Taste verwenden (default: true -> Cmd/Ctrl+K) */
  useMetaKey?: boolean;
  /** Callback nach Auswahl (zusaetzlich zu item.onSelect) */
  onSelect?: (item: SpotlightItem) => void;
  /** Zusaetzliche CSS-Klassen */
  className?: string;
}

// ─── Spotlight Component ────────────────────────────────────────────────────

function Spotlight({
  groups,
  open: controlledOpen,
  onOpenChange,
  placeholder = 'Suchen…',
  emptyMessage = 'Keine Ergebnisse gefunden',
  shortcutKey = 'k',
  useMetaKey = true,
  onSelect,
  className,
}: SpotlightProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const metaMatch = useMetaKey
        ? event.metaKey || event.ctrlKey
        : true;

      if (event.key === shortcutKey && metaMatch) {
        event.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcutKey, useMetaKey, isOpen, setOpen]);

  const handleSelect = useCallback(
    (item: SpotlightItem) => {
      item.onSelect?.();
      onSelect?.(item);
      setOpen(false);
    },
    [onSelect, setOpen]
  );

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-[var(--color-spotlight-overlay)]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
          )}
        />

        {/* Content — positioned near top, not center */}
        <DialogPrimitive.Content
          aria-label="Globale Suche"
          className={cn(
            'fixed left-1/2 top-[20%] z-50 -translate-x-1/2',
            'w-full max-w-[560px]',
            'bg-[var(--color-spotlight-bg)]',
            'border border-[var(--color-spotlight-border)]',
            'rounded-[var(--radius-spotlight)]',
            '[box-shadow:var(--shadow-spotlight)]',
            'overflow-hidden',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'duration-200',
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">Globale Suche</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Suche nach Aktionen und Seiten
          </DialogPrimitive.Description>

          <CommandPrimitive className="w-full" data-testid="spotlight-command">
            {/* Search Input */}
            <div className="flex items-center border-b border-[var(--color-spotlight-separator)] px-[var(--spacing-spotlight-input-px)]">
              <Icon
                icon={Search}
                size="sm"
                className="mr-[var(--spacing-spotlight-icon-mr)] opacity-50"
              />
              <CommandPrimitive.Input
                placeholder={placeholder}
                className={cn(
                  'flex h-12 w-full bg-transparent',
                  'text-[length:var(--font-spotlight-input-size)]',
                  'text-[var(--color-spotlight-input-text)]',
                  'placeholder:text-[var(--color-spotlight-input-placeholder)]',
                  'outline-none border-none'
                )}
              />
            </div>

            {/* Results */}
            <CommandPrimitive.List
              className={cn(
                'max-h-[300px] overflow-y-auto',
                'p-[var(--spacing-spotlight-list-padding)]'
              )}
            >
              <CommandPrimitive.Empty
                className={cn(
                  'py-[var(--spacing-spotlight-empty-py)] text-center',
                  'text-[length:var(--font-spotlight-item-size)]',
                  'text-[var(--color-spotlight-empty-text)]'
                )}
              >
                {emptyMessage}
              </CommandPrimitive.Empty>

              {groups.map((group) => (
                <CommandPrimitive.Group
                  key={group.label}
                  heading={group.label}
                  className={cn(
                    'overflow-hidden p-[var(--spacing-spotlight-list-padding)]',
                    '[&_[cmdk-group-heading]]:text-[length:var(--font-spotlight-heading-size)]',
                    '[&_[cmdk-group-heading]]:[font-weight:var(--font-spotlight-heading-weight)]',
                    '[&_[cmdk-group-heading]]:text-[var(--color-spotlight-group-heading)]',
                    '[&_[cmdk-group-heading]]:px-[var(--spacing-spotlight-group-heading-px)]',
                    '[&_[cmdk-group-heading]]:py-[var(--spacing-spotlight-group-heading-py)]'
                  )}
                >
                  {group.items.map((item) => (
                    <CommandPrimitive.Item
                      key={item.id}
                      value={[item.label, ...(item.keywords || [])].join(' ')}
                      disabled={item.disabled}
                      onSelect={() => handleSelect(item)}
                      className={cn(
                        'relative flex cursor-pointer select-none items-center',
                        'min-h-[44px] rounded-[var(--radius-spotlight)]',
                        'px-[var(--spacing-spotlight-item-px)] py-[var(--spacing-spotlight-item-py)]',
                        'text-[length:var(--font-spotlight-item-size)]',
                        'text-[var(--color-spotlight-item-text)]',
                        'outline-none transition-colors',
                        'data-[selected=true]:bg-[var(--color-spotlight-item-hover-bg)]',
                        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50'
                      )}
                    >
                      {item.icon && (
                        <span className="mr-[var(--spacing-spotlight-icon-mr)] flex-shrink-0">
                          {item.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.description && (
                          <span className="ml-2 text-[var(--color-spotlight-group-heading)] truncate">
                            {item.description}
                          </span>
                        )}
                      </div>
                      {item.shortcut && (
                        <Kbd size="sm" className="ml-auto flex-shrink-0">
                          {item.shortcut}
                        </Kbd>
                      )}
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              ))}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

Spotlight.displayName = 'Spotlight';

// ─── useSpotlight Hook ──────────────────────────────────────────────────────

/** Convenience-Hook fuer Spotlight State-Management */
export function useSpotlight() {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    toggle: () => setOpen((prev) => !prev),
  };
}

// ─── Exports ────────────────────────────────────────────────────────────────

export { Spotlight };
