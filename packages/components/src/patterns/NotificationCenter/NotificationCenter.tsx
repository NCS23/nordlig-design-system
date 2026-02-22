import React from 'react';
import {
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
  CheckCheck,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon as IconAtom } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Separator } from '../../atoms/Separator';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../molecules/Sheet';

// ─── Types ──────────────────────────────────────────────────────────────────

/** Variante einer Notification (bestimmt Icon und Farbe) */
export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

/** Einzelne Notification */
export interface Notification {
  /** Eindeutige ID */
  id: string;
  /** Titel der Notification */
  title: string;
  /** Optionale Beschreibung */
  description?: string;
  /** Variante (default: 'info') */
  variant?: NotificationVariant;
  /** Zeitstempel */
  timestamp: Date;
  /** Ob die Notification gelesen wurde */
  read: boolean;
}

/** Props fuer das NotificationCenter Pattern */
export interface NotificationCenterProps {
  /** Liste der Notifications */
  notifications: Notification[];
  /** Callback wenn eine Notification als gelesen markiert wird */
  onMarkRead?: (id: string) => void;
  /** Callback wenn alle als gelesen markiert werden */
  onMarkAllRead?: () => void;
  /** Callback wenn eine Notification entfernt wird */
  onDismiss?: (id: string) => void;
  /** Callback wenn alle Notifications entfernt werden */
  onClearAll?: () => void;
  /** Titel im Sheet-Header */
  title?: string;
  /** Text wenn keine Notifications vorhanden sind */
  emptyText?: string;
  /** Label fuer den Trigger-Button (Screenreader) */
  triggerLabel?: string;
  /** Sheet-Seite */
  side?: 'left' | 'right';
  /** Zusaetzliche CSS-Klassen fuer den aeusseren Container */
  className?: string;
}

// ─── Variant Maps ───────────────────────────────────────────────────────────

const VARIANT_ICONS: Record<NotificationVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const VARIANT_ICON_CLASSES: Record<NotificationVariant, string> = {
  info: 'text-[var(--color-toast-info-icon)]',
  success: 'text-[var(--color-toast-success-icon)]',
  warning: 'text-[var(--color-toast-warning-icon)]',
  error: 'text-[var(--color-toast-error-icon)]',
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Gerade eben';
  if (diffMin < 60) return `Vor ${diffMin} Min.`;
  if (diffHour < 24) return `Vor ${diffHour} Std.`;
  if (diffDay < 7) return `Vor ${diffDay} Tag${diffDay > 1 ? 'en' : ''}`;
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ─── NotificationItem ───────────────────────────────────────────────────────

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

function NotificationItem({ notification, onMarkRead, onDismiss }: NotificationItemProps) {
  const variant = notification.variant || 'info';
  const VariantIcon = VARIANT_ICONS[variant];
  const iconClass = VARIANT_ICON_CLASSES[variant];

  return (
    <div
      role="article"
      aria-label={notification.title}
      className={cn(
        'relative flex items-start gap-[var(--spacing-notifcenter-header-gap)]',
        'p-[var(--spacing-notifcenter-item-padding)]',
        'rounded-[var(--radius-notifcenter-item)]',
        'border border-[var(--color-notifcenter-item-border)]',
        'transition-colors duration-200',
        notification.read
          ? 'bg-[var(--color-notifcenter-item-bg)]'
          : 'bg-[var(--color-notifcenter-item-bg-unread)]'
      )}
    >
      {/* Ungelesen-Punkt */}
      {!notification.read && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-[var(--spacing-notifcenter-item-padding)] left-[var(--spacing-notifcenter-item-padding)]',
            'w-[var(--sizing-notifcenter-dot)] h-[var(--sizing-notifcenter-dot)]',
            'rounded-full bg-[var(--color-notifcenter-dot-unread)]'
          )}
        />
      )}

      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <IconAtom icon={VariantIcon} size="md" className={iconClass} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-[length:var(--font-notifcenter-title-size)] text-[var(--color-text-base)]',
            !notification.read && '[font-weight:var(--font-notifcenter-title-weight)]'
          )}
        >
          {notification.title}
        </p>
        {notification.description && (
          <Text variant="muted" className="mt-0.5 line-clamp-2">
            {notification.description}
          </Text>
        )}
        <time
          dateTime={notification.timestamp.toISOString()}
          className="block mt-1 text-[length:var(--font-notifcenter-timestamp-size)] text-[var(--color-notifcenter-timestamp)]"
        >
          {formatRelativeTime(notification.timestamp)}
        </time>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-0.5">
        {!notification.read && onMarkRead && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className={cn(
              'inline-flex items-center justify-center',
              'min-h-11 min-w-11 rounded transition-colors',
              'text-[var(--color-notifcenter-timestamp)]',
              'hover:bg-[var(--color-notifcenter-item-border)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
            )}
            aria-label={`${notification.title} als gelesen markieren`}
          >
            <IconAtom icon={CheckCircle} size={14} />
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={() => onDismiss(notification.id)}
            className={cn(
              'inline-flex items-center justify-center',
              'min-h-11 min-w-11 rounded transition-colors',
              'text-[var(--color-notifcenter-timestamp)]',
              'hover:bg-[var(--color-notifcenter-item-border)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
            )}
            aria-label={`${notification.title} entfernen`}
          >
            <IconAtom icon={X} size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── NotificationCenter ─────────────────────────────────────────────────────

const NotificationCenter = React.forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      notifications,
      onMarkRead,
      onMarkAllRead,
      onDismiss,
      onClearAll,
      title = 'Benachrichtigungen',
      emptyText = 'Keine Benachrichtigungen',
      triggerLabel = 'Benachrichtigungen anzeigen',
      side = 'right',
      className,
    },
    ref
  ) => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    const hasNotifications = notifications.length > 0;
    const hasUnread = unreadCount > 0;

    // Sortierung: ungelesene zuerst, dann nach Zeitstempel absteigend
    const sorted = React.useMemo(
      () =>
        [...notifications].sort((a, b) => {
          if (a.read !== b.read) return a.read ? 1 : -1;
          return b.timestamp.getTime() - a.timestamp.getTime();
        }),
      [notifications]
    );

    return (
      <div ref={ref} className={cn(className)} data-testid="notification-center">
        <Sheet>
          {/* Trigger mit Badge */}
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              aria-label={triggerLabel}
            >
              <IconAtom icon={Bell} size="md" />
              {hasUnread && (
                <Badge
                  variant="error"
                  size="xs"
                  className="absolute -top-1 -right-1"
                  aria-label={`${unreadCount} ungelesen`}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          {/* Panel */}
          <SheetContent side={side} aria-label={title}>
            <SheetHeader>
              <div className="flex items-center justify-between gap-[var(--spacing-notifcenter-header-gap)] pr-10">
                <SheetTitle>{title}</SheetTitle>
                {hasUnread && (
                  <Badge variant="info" size="sm">
                    {unreadCount} neu
                  </Badge>
                )}
              </div>

              {/* Aktionen */}
              {hasNotifications && (
                <div className="flex items-center gap-[var(--spacing-notifcenter-header-gap)]">
                  {hasUnread && onMarkAllRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMarkAllRead}
                    >
                      <IconAtom icon={CheckCheck} size="sm" />
                      Alle gelesen
                    </Button>
                  )}
                  {onClearAll && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearAll}
                    >
                      Alle entfernen
                    </Button>
                  )}
                </div>
              )}
            </SheetHeader>

            <Separator className="my-[var(--spacing-notifcenter-header-gap)]" />

            {/* Notification-Liste */}
            {hasNotifications ? (
              <div
                role="feed"
                aria-label={title}
                className="flex flex-col gap-[var(--spacing-notifcenter-item-gap)] overflow-y-auto flex-1"
              >
                {sorted.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={onMarkRead}
                    onDismiss={onDismiss}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-[var(--spacing-notifcenter-empty-padding)] flex-1">
                <IconAtom
                  icon={Bell}
                  size="xl"
                  className="text-[var(--color-notifcenter-empty-text)] mb-[var(--spacing-notifcenter-section-gap)]"
                />
                <Text variant="muted">{emptyText}</Text>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    );
  }
);

NotificationCenter.displayName = 'NotificationCenter';

// ─── useNotificationCenter Hook ─────────────────────────────────────────────

/** Convenience-Hook fuer lokales Notification-State-Management */
export function useNotificationCenter(initial: Notification[] = []) {
  const [notifications, setNotifications] = React.useState<Notification[]>(initial);

  /** Neue Notification hinzufuegen */
  const notify = React.useCallback(
    (data: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      const id = Math.random().toString(36).slice(2, 9);
      setNotifications((prev) => [
        { ...data, id, timestamp: new Date(), read: false },
        ...prev,
      ]);
      return id;
    },
    []
  );

  /** Notification als gelesen markieren */
  const markRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  /** Alle als gelesen markieren */
  const markAllRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  /** Notification entfernen */
  const dismiss = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /** Alle entfernen */
  const clearAll = React.useCallback(() => {
    setNotifications([]);
  }, []);

  /** Anzahl ungelesener Notifications */
  const unreadCount = React.useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  return {
    notifications,
    notify,
    markRead,
    markAllRead,
    dismiss,
    clearAll,
    unreadCount,
  };
}

// ─── Exports ────────────────────────────────────────────────────────────────

export { NotificationCenter };
