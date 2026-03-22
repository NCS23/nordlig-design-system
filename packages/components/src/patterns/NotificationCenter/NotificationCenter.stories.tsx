import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NotificationCenter,
  useNotificationCenter,
  type Notification,
  type NotificationVariant,
} from './NotificationCenter';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof NotificationCenter> = {
  title: 'Patterns/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createSampleNotifications(): Notification[] {
  const now = Date.now();
  return [
    {
      id: '1',
      title: 'Training abgeschlossen',
      description: '10 km Lauf in 48:32 — persoenliche Bestzeit!',
      variant: 'success',
      timestamp: new Date(now - 2 * 60_000),
      read: false,
    },
    {
      id: '2',
      title: 'Herzfrequenz-Warnung',
      description: 'Maximale Herzfrequenz von 195 bpm ueberschritten waehrend Intervalltraining.',
      variant: 'warning',
      timestamp: new Date(now - 15 * 60_000),
      read: false,
    },
    {
      id: '3',
      title: 'Sync fehlgeschlagen',
      description: 'Verbindung zum Garmin-Server unterbrochen. Erneuter Versuch in 5 Minuten.',
      variant: 'error',
      timestamp: new Date(now - 45 * 60_000),
      read: false,
    },
    {
      id: '4',
      title: 'Wochenplanung aktualisiert',
      description: 'Der Trainingsplan fuer KW 9 wurde angepasst.',
      variant: 'info',
      timestamp: new Date(now - 3 * 3600_000),
      read: true,
    },
    {
      id: '5',
      title: 'Erholungsphase empfohlen',
      description: 'Basierend auf Ihrer Trainingsbelastung der letzten 7 Tage.',
      variant: 'info',
      timestamp: new Date(now - 24 * 3600_000),
      read: true,
    },
  ];
}

// ---------------------------------------------------------------------------
// 1. Default — Statische Notifications
// ---------------------------------------------------------------------------

export const Default: StoryObj<typeof NotificationCenter> = {
  name: 'Standard',
  render: () => {
    function DefaultDemo() {
      const {
        notifications,
        markRead,
        markAllRead,
        dismiss,
        clearAll,
      } = useNotificationCenter(createSampleNotifications());

      return (
        <div className="flex items-center justify-end p-4">
          <NotificationCenter
            notifications={notifications}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
            onDismiss={dismiss}
            onClearAll={clearAll}
          />
        </div>
      );
    }

    return <DefaultDemo />;
  },
};

// ---------------------------------------------------------------------------
// 2. LiveDemo — Notifications dynamisch hinzufuegen
// ---------------------------------------------------------------------------

const DEMO_MESSAGES: Array<{ title: string; description: string; variant: NotificationVariant }> = [
  { title: 'Lauf beendet', description: '5 km in 24:15 abgeschlossen.', variant: 'success' },
  { title: 'Neue Bestzeit!', description: '1 km Bestzeit: 4:12 min/km.', variant: 'success' },
  { title: 'Hohe Belastung', description: 'Trainingsbelastung ueber Schwellenwert.', variant: 'warning' },
  { title: 'GPS-Signal verloren', description: 'Position konnte nicht bestimmt werden.', variant: 'error' },
  { title: 'Trainingsplan verfuegbar', description: 'Neuer Plan fuer naechste Woche bereit.', variant: 'info' },
];

export const LiveDemo: StoryObj<typeof NotificationCenter> = {
  name: 'Live-Demo (dynamisch)',
  render: () => {
    function Live() {
      const {
        notifications,
        notify,
        markRead,
        markAllRead,
        dismiss,
        clearAll,
      } = useNotificationCenter();

      const addRandom = () => {
        const msg = DEMO_MESSAGES[Math.floor(Math.random() * DEMO_MESSAGES.length)];
        notify(msg);
      };

      return (
        <div className="flex items-center gap-4 p-4">
          <Button onClick={addRandom} variant="secondary" size="sm">
            Notification hinzufuegen
          </Button>
          <Text variant="muted">
            {notifications.length} gesamt, {notifications.filter((n) => !n.read).length} ungelesen
          </Text>
          <div className="ml-auto">
            <NotificationCenter
              notifications={notifications}
              onMarkRead={markRead}
              onMarkAllRead={markAllRead}
              onDismiss={dismiss}
              onClearAll={clearAll}
            />
          </div>
        </div>
      );
    }

    return <Live />;
  },
};

// ---------------------------------------------------------------------------
// 3. Empty — Leerer Zustand
// ---------------------------------------------------------------------------

export const Empty: StoryObj<typeof NotificationCenter> = {
  name: 'Leerer Zustand',
  render: () => (
    <div className="flex items-center justify-end p-4">
      <NotificationCenter
        notifications={[]}
        emptyText="Keine neuen Benachrichtigungen"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 4. AlleGelesen — Nur gelesene Notifications
// ---------------------------------------------------------------------------

export const AlleGelesen: StoryObj<typeof NotificationCenter> = {
  name: 'Alle gelesen',
  render: () => {
    const notifications = createSampleNotifications().map((n) => ({ ...n, read: true }));

    return (
      <div className="flex items-center justify-end p-4">
        <NotificationCenter
          notifications={notifications}
          onDismiss={() => {}}
          onClearAll={() => {}}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// 5. LeftSide — Sheet von links
// ---------------------------------------------------------------------------

export const LeftSide: StoryObj<typeof NotificationCenter> = {
  name: 'Sheet von links',
  render: () => {
    function LeftDemo() {
      const {
        notifications,
        markRead,
        markAllRead,
        dismiss,
        clearAll,
      } = useNotificationCenter(createSampleNotifications());

      return (
        <div className="flex items-center p-4">
          <NotificationCenter
            notifications={notifications}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
            onDismiss={dismiss}
            onClearAll={clearAll}
            side="left"
            title="Meldungen"
          />
        </div>
      );
    }

    return <LeftDemo />;
  },
};
