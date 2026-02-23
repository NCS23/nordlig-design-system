import type { Meta, StoryObj } from '@storybook/react';
import SessionCard, { type SessionData } from './SessionCard';
import { Heading } from '../../atoms/Heading';

// Mock session data
const baseSessionData: SessionData = {
  id: '1',
  type: 'running',
  duration: 45,
  distance: 8.5,
  date: new Date('2024-01-15T10:30:00'),
  title: 'Morgenlauf',
  description: 'Entspannter Lauf im Park bei perfektem Wetter',
  hrZones: {
    zone1: 5,
    zone2: 12,
    zone3: 15,
    zone4: 10,
    zone5: 3
  },
  metrics: {
    avgHeartRate: 145,
    maxHeartRate: 165,
    calories: 420,
    pace: '5:18/km',
    elevation: 120
  }
};

const cyclingSessionData: SessionData = {
  id: '2',
  type: 'cycling',
  duration: 120,
  distance: 35.2,
  date: new Date('2024-01-14T16:00:00'),
  title: 'Rennrad Tour',
  description: 'Lange Ausfahrt durch die Berge',
  hrZones: {
    zone1: 20,
    zone2: 45,
    zone3: 35,
    zone4: 15,
    zone5: 5
  },
  metrics: {
    avgHeartRate: 138,
    maxHeartRate: 172,
    calories: 1200,
    pace: '32.5 km/h',
    elevation: 850
  }
};

const swimmingSessionData: SessionData = {
  id: '3',
  type: 'swimming',
  duration: 60,
  distance: 2.0,
  date: new Date('2024-01-13T07:00:00'),
  title: 'Schwimmtraining',
  description: 'Techniktraining im Schwimmbad',
  metrics: {
    calories: 450
  }
};

const strengthSessionData: SessionData = {
  id: '4',
  type: 'strength',
  duration: 75,
  date: new Date('2024-01-12T18:30:00'),
  title: 'Krafttraining',
  description: 'Oberkörper und Core Training',
  metrics: {
    calories: 320,
    avgHeartRate: 110
  }
};

const minimalSessionData: SessionData = {
  id: '5',
  type: 'other',
  duration: 30,
  date: new Date('2024-01-11T12:00:00')
};

const meta: Meta<typeof SessionCard> = {
  title: 'Examples/SessionCard',
  component: SessionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Umfassende Trainingssitzungs-Anzeigekarte mit nordischen Designprinzipien. Zeigt Session-Typ, Dauer, Distanz, Herzfrequenzzonen und Performance-Metriken in minimalistischem Kartenlayout.'
      }
    }
  },
  argTypes: {
    sessionData: {
      description: 'Trainingssitzungsdaten mit Typ, Dauer, Distanz, HF-Zonen und Metriken',
      control: 'object'
    },
    onClick: {
      description: 'Optional: Klick-Handler für Navigation',
      control: 'boolean'
    },
    loading: {
      description: 'Zeige Skeleton Loading State',
      control: 'boolean'
    },
    error: {
      description: 'Fehlermeldung zum Anzeigen',
      control: 'text'
    },
    size: {
      description: 'Kartengröße',
      control: 'select',
      options: ['default', 'compact']
    },
    state: {
      description: 'Zustand der Karte',
      control: 'select',
      options: ['default', 'loading', 'error', 'interactive']
    },
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof SessionCard>;

/**
 * Standard SessionCard mit vollständigen Trainingsdaten
 */
export const Default: Story = {
  args: {
    sessionData: baseSessionData
  }
};

/**
 * Interaktive SessionCard mit Klick-Handler
 */
export const Interactive: Story = {
  args: {
    sessionData: baseSessionData,
    onClick: () => alert('Session geöffnet!')
  }
};

/**
 * Kompakte Variante für dichte Layouts
 */
export const Compact: Story = {
  args: {
    sessionData: baseSessionData,
    size: 'compact',
    onClick: () => alert('Kompakte Session geöffnet!')
  }
};

/**
 * Loading State mit Skeleton Animation
 */
export const Loading: Story = {
  args: {
    sessionData: baseSessionData,
    loading: true
  }
};

/**
 * Error State mit Fehlermeldung
 */
export const Error: Story = {
  args: {
    sessionData: baseSessionData,
    error: 'Verbindung zum Server fehlgeschlagen'
  }
};

/**
 * Rennrad-Training mit langer Distanz
 */
export const CyclingSession: Story = {
  args: {
    sessionData: cyclingSessionData,
    onClick: () => alert('Rennrad Tour geöffnet!')
  }
};

/**
 * Schwimmtraining ohne Herzfrequenzzonen
 */
export const SwimmingSession: Story = {
  args: {
    sessionData: swimmingSessionData,
    onClick: () => alert('Schwimmtraining geöffnet!')
  }
};

/**
 * Krafttraining ohne Distanz
 */
export const StrengthSession: Story = {
  args: {
    sessionData: strengthSessionData,
    onClick: () => alert('Krafttraining geöffnet!')
  }
};

/**
 * Minimale Session mit wenig Daten
 */
export const MinimalSession: Story = {
  args: {
    sessionData: minimalSessionData,
    onClick: () => alert('Minimale Session geöffnet!')
  }
};

/**
 * Dark Mode Variante — wird automatisch über CSS Custom Properties gesteuert
 */
export const DarkMode: Story = {
  args: {
    sessionData: baseSessionData,
    onClick: () => alert('Dark Mode Session geöffnet!')
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    )
  ]
};

/**
 * Session Grid - Mehrere Cards nebeneinander
 */
export const SessionGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SessionCard 
        sessionData={baseSessionData} 
        onClick={() => alert('Laufen geöffnet!')} 
      />
      <SessionCard 
        sessionData={cyclingSessionData} 
        onClick={() => alert('Radfahren geöffnet!')} 
      />
      <SessionCard 
        sessionData={swimmingSessionData} 
        size="compact"
        onClick={() => alert('Schwimmen geöffnet!')} 
      />
      <SessionCard 
        sessionData={strengthSessionData} 
        size="compact"
        onClick={() => alert('Krafttraining geöffnet!')} 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Beispiel für die Anordnung mehrerer SessionCards in einem Grid-Layout'
      }
    }
  }
};

/**
 * Verschiedene States nebeneinander
 */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Heading level={3} className="mb-4 font-semibold">Normal</Heading>
        <SessionCard sessionData={baseSessionData} />
      </div>
      <div>
        <Heading level={3} className="mb-4 font-semibold">Interactive</Heading>
        <SessionCard
          sessionData={baseSessionData}
          onClick={() => alert('Interaktiv!')}
        />
      </div>
      <div>
        <Heading level={3} className="mb-4 font-semibold">Loading</Heading>
        <SessionCard sessionData={baseSessionData} loading={true} />
      </div>
      <div>
        <Heading level={3} className="mb-4 font-semibold">Error</Heading>
        <SessionCard
          sessionData={baseSessionData}
          error="Netzwerk Fehler"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Übersicht über alle verfügbaren States der SessionCard'
      }
    }
  }
};