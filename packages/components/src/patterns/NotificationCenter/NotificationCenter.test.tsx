import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NotificationCenter, useNotificationCenter, type Notification } from './NotificationCenter';
import { renderHook, act } from '@testing-library/react';

/* ─── Helpers ─── */

function createNotification(overrides: Partial<Notification> = {}): Notification {
  return {
    id: `n-${Math.random().toString(36).slice(2, 6)}`,
    title: 'Test-Nachricht',
    variant: 'info',
    timestamp: new Date(),
    read: false,
    ...overrides,
  };
}

function createNotifications(count: number, readCount = 0): Notification[] {
  return Array.from({ length: count }, (_, i) =>
    createNotification({
      id: `n-${i}`,
      title: `Nachricht ${i + 1}`,
      read: i < readCount,
      timestamp: new Date(Date.now() - i * 60_000),
    })
  );
}

/* ─── Component Tests ─── */

describe('NotificationCenter', () => {
  // --- 1. Rendert Trigger-Button ---
  it('rendert den Trigger-Button', () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' })).toBeInTheDocument();
  });

  // --- 2. Zeigt Badge mit ungelesener Anzahl ---
  it('zeigt Badge mit Anzahl ungelesener Notifications', () => {
    const notifications = createNotifications(5, 2);
    render(<NotificationCenter notifications={notifications} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  // --- 3. Kein Badge wenn alle gelesen ---
  it('zeigt kein Badge wenn alle gelesen sind', () => {
    const notifications = createNotifications(3, 3);
    render(<NotificationCenter notifications={notifications} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  // --- 4. Badge zeigt 99+ bei > 99 ---
  it('zeigt 99+ bei mehr als 99 ungelesenen Notifications', () => {
    const notifications = createNotifications(120);
    render(<NotificationCenter notifications={notifications} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  // --- 5. Oeffnet Sheet bei Klick ---
  it('oeffnet das Sheet bei Klick auf Trigger', async () => {
    const user = userEvent.setup();
    const notifications = createNotifications(2);
    render(<NotificationCenter notifications={notifications} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByText('Benachrichtigungen')).toBeInTheDocument();
  });

  // --- 6. Zeigt Notification-Items ---
  it('zeigt alle Notifications im geoeffneten Panel', async () => {
    const user = userEvent.setup();
    const notifications = createNotifications(3);
    render(<NotificationCenter notifications={notifications} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByText('Nachricht 1')).toBeInTheDocument();
    expect(screen.getByText('Nachricht 2')).toBeInTheDocument();
    expect(screen.getByText('Nachricht 3')).toBeInTheDocument();
  });

  // --- 7. Zeigt leeren Zustand ---
  it('zeigt Leer-Nachricht wenn keine Notifications', async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={[]} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByText('Keine Benachrichtigungen')).toBeInTheDocument();
  });

  // --- 8. Zeigt benutzerdefinierten leeren Text ---
  it('zeigt benutzerdefinierten Leer-Text', async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={[]} emptyText="Alles erledigt!" />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByText('Alles erledigt!')).toBeInTheDocument();
  });

  // --- 9. Zeigt benutzerdefinierten Titel ---
  it('zeigt benutzerdefinierten Titel im Sheet', async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={[]} title="Meldungen" />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByText('Meldungen')).toBeInTheDocument();
  });

  // --- 10. Ruft onMarkRead auf ---
  it('ruft onMarkRead Callback auf', async () => {
    const user = userEvent.setup();
    const onMarkRead = vi.fn();
    const notifications = [createNotification({ id: 'n-1', title: 'Ungelesene Nachricht', read: false })];
    render(<NotificationCenter notifications={notifications} onMarkRead={onMarkRead} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    const markBtn = screen.getByRole('button', { name: 'Ungelesene Nachricht als gelesen markieren' });
    await user.click(markBtn);
    expect(onMarkRead).toHaveBeenCalledWith('n-1');
  });

  // --- 11. Ruft onDismiss auf ---
  it('ruft onDismiss Callback auf', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const notifications = [createNotification({ id: 'n-2', title: 'Zu entfernen' })];
    render(<NotificationCenter notifications={notifications} onDismiss={onDismiss} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    const dismissBtn = screen.getByRole('button', { name: 'Zu entfernen entfernen' });
    await user.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledWith('n-2');
  });

  // --- 12. Ruft onMarkAllRead auf ---
  it('ruft onMarkAllRead Callback auf', async () => {
    const user = userEvent.setup();
    const onMarkAllRead = vi.fn();
    const notifications = createNotifications(3);
    render(<NotificationCenter notifications={notifications} onMarkAllRead={onMarkAllRead} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    await user.click(screen.getByRole('button', { name: /Alle gelesen/i }));
    expect(onMarkAllRead).toHaveBeenCalledOnce();
  });

  // --- 13. Ruft onClearAll auf ---
  it('ruft onClearAll Callback auf', async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    const notifications = createNotifications(2);
    render(<NotificationCenter notifications={notifications} onClearAll={onClearAll} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    await user.click(screen.getByRole('button', { name: /Alle entfernen/i }));
    expect(onClearAll).toHaveBeenCalledOnce();
  });

  // --- 14. Zeigt Beschreibungstext ---
  it('zeigt Notification-Beschreibung', async () => {
    const user = userEvent.setup();
    const notifications = [
      createNotification({ title: 'Titel', description: 'Detailtext hier' }),
    ];
    render(<NotificationCenter notifications={notifications} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByText('Detailtext hier')).toBeInTheDocument();
  });

  // --- 15. Token-basierte Klassen vorhanden ---
  it('verwendet Token-basierte CSS-Klassen', async () => {
    const user = userEvent.setup();
    const notifications = [createNotification({ read: false })];
    render(<NotificationCenter notifications={notifications} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    const item = screen.getByRole('article');
    expect(item.className).toContain('var(--spacing-notifcenter-item-padding)');
    expect(item.className).toContain('var(--radius-notifcenter-item)');
    expect(item.className).toContain('var(--color-notifcenter-item-bg-unread)');
  });

  // --- 16. Ungelesen-Punkt wird bei ungelesener Nachricht angezeigt ---
  it('zeigt Ungelesen-Punkt bei ungelesener Nachricht', async () => {
    const user = userEvent.setup();
    const notifications = [createNotification({ read: false })];
    render(<NotificationCenter notifications={notifications} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    const item = screen.getByRole('article');
    const dot = item.querySelector('span[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
    expect(dot?.className).toContain('var(--color-notifcenter-dot-unread)');
  });

  // --- 17. Kein Ungelesen-Punkt bei gelesener Nachricht ---
  it('zeigt keinen Ungelesen-Punkt bei gelesener Nachricht', async () => {
    const user = userEvent.setup();
    const notifications = [createNotification({ read: true })];
    render(<NotificationCenter notifications={notifications} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    const item = screen.getByRole('article');
    const dot = item.querySelector('span[aria-hidden="true"]');
    expect(dot).not.toBeInTheDocument();
  });

  // --- 18. displayName ---
  it('hat displayName', () => {
    expect(NotificationCenter.displayName).toBe('NotificationCenter');
  });

  // --- 19. Feed-Role fuer Notification-Liste ---
  it('verwendet role="feed" fuer die Notification-Liste', async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={createNotifications(2)} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.getByRole('feed')).toBeInTheDocument();
  });

  // --- 20. Zeigt "Alle gelesen"-Button nicht wenn keine ungelesenen ---
  it('versteckt "Alle gelesen" wenn alle gelesen', async () => {
    const user = userEvent.setup();
    const notifications = createNotifications(3, 3);
    render(<NotificationCenter notifications={notifications} onMarkAllRead={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Benachrichtigungen anzeigen' }));
    expect(screen.queryByRole('button', { name: /Alle gelesen/i })).not.toBeInTheDocument();
  });
});

/* ─── useNotificationCenter Hook Tests ─── */

describe('useNotificationCenter', () => {
  // --- 21. Initialisiert mit leerem Array ---
  it('initialisiert mit leerem Array', () => {
    const { result } = renderHook(() => useNotificationCenter());
    expect(result.current.notifications).toEqual([]);
    expect(result.current.unreadCount).toBe(0);
  });

  // --- 22. Initialisiert mit uebergebenen Daten ---
  it('initialisiert mit uebergebenen Notifications', () => {
    const initial = [createNotification({ id: 'init-1', read: false })];
    const { result } = renderHook(() => useNotificationCenter(initial));
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.unreadCount).toBe(1);
  });

  // --- 23. notify fuegt neue Notification hinzu ---
  it('fuegt Notification via notify hinzu', () => {
    const { result } = renderHook(() => useNotificationCenter());

    act(() => {
      result.current.notify({ title: 'Neue Nachricht', variant: 'success' });
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].title).toBe('Neue Nachricht');
    expect(result.current.notifications[0].read).toBe(false);
    expect(result.current.unreadCount).toBe(1);
  });

  // --- 24. markRead setzt read auf true ---
  it('markiert Notification als gelesen', () => {
    const initial = [createNotification({ id: 'mr-1', read: false })];
    const { result } = renderHook(() => useNotificationCenter(initial));

    act(() => {
      result.current.markRead('mr-1');
    });

    expect(result.current.notifications[0].read).toBe(true);
    expect(result.current.unreadCount).toBe(0);
  });

  // --- 25. markAllRead setzt alle auf read ---
  it('markiert alle als gelesen', () => {
    const initial = createNotifications(5);
    const { result } = renderHook(() => useNotificationCenter(initial));

    act(() => {
      result.current.markAllRead();
    });

    expect(result.current.unreadCount).toBe(0);
    expect(result.current.notifications.every((n) => n.read)).toBe(true);
  });

  // --- 26. dismiss entfernt Notification ---
  it('entfernt Notification via dismiss', () => {
    const initial = [
      createNotification({ id: 'd-1' }),
      createNotification({ id: 'd-2' }),
    ];
    const { result } = renderHook(() => useNotificationCenter(initial));

    act(() => {
      result.current.dismiss('d-1');
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].id).toBe('d-2');
  });

  // --- 27. clearAll entfernt alle ---
  it('entfernt alle Notifications via clearAll', () => {
    const initial = createNotifications(5);
    const { result } = renderHook(() => useNotificationCenter(initial));

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  // --- 28. notify gibt ID zurueck ---
  it('gibt ID der neuen Notification zurueck', () => {
    const { result } = renderHook(() => useNotificationCenter());
    let id: string;

    act(() => {
      id = result.current.notify({ title: 'Test' });
    });

    expect(id!).toBeTruthy();
    expect(typeof id!).toBe('string');
  });
});
