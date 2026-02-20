import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Skeleton, SkeletonKeyframes } from '../../atoms/Skeleton/Skeleton';

/**
 * Typ für Trainingssitzungsdaten
 */
export interface SessionData {
  id: string;
  type: 'running' | 'cycling' | 'swimming' | 'strength' | 'other';
  duration: number; // in Minuten
  distance?: number; // in km
  date: Date;
  hrZones?: {
    zone1: number; // in Minuten
    zone2: number;
    zone3: number;
    zone4: number;
    zone5: number;
  };
  metrics?: {
    avgHeartRate?: number;
    maxHeartRate?: number;
    calories?: number;
    pace?: string; // z.B. "5:30/km"
    elevation?: number; // in m
  };
  title?: string;
  description?: string;
}

/**
 * Styling-Varianten für die SessionCard
 */
const sessionCardVariants = cva(
  'relative rounded-[var(--radius-session-card)] border border-[var(--color-session-card-border)] bg-[var(--color-session-card-bg)] transition-all duration-200',
  {
    variants: {
      size: {
        default: 'p-[var(--spacing-session-card-padding)]',
        compact: 'p-[var(--spacing-session-card-padding)]'
      },
      state: {
        default: '',
        loading: '',
        error: 'border-[var(--color-session-card-border-error)] bg-[var(--color-session-card-bg-error)]',
        interactive: 'cursor-pointer hover:border-[var(--color-session-card-border-hover)] hover:bg-[var(--color-session-card-bg-hover)] hover:[box-shadow:var(--shadow-elevation-medium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-session-card-focus-ring)] focus-visible:ring-offset-1'
      }
    },
    defaultVariants: {
      size: 'default',
      state: 'default'
    }
  }
);

/**
 * Herzfrequenzzonen-Balken Komponente
 */
const HrZoneBar: React.FC<{ zones?: SessionData['hrZones']; totalDuration: number }> = ({ zones, totalDuration }) => {
  if (!zones) return null;

  const zoneColors = [
    '--color-session-card-zone-1',
    '--color-session-card-zone-2', 
    '--color-session-card-zone-3',
    '--color-session-card-zone-4',
    '--color-session-card-zone-5'
  ];

  const zoneData = [
    { name: 'Zone 1', duration: zones.zone1 },
    { name: 'Zone 2', duration: zones.zone2 },
    { name: 'Zone 3', duration: zones.zone3 },
    { name: 'Zone 4', duration: zones.zone4 },
    { name: 'Zone 5', duration: zones.zone5 }
  ];

  return (
    <div className="mt-[var(--spacing-session-card-section-gap)]">
      <div className="flex items-center justify-between mb-[var(--spacing-session-card-zone-header-mb)]">
        <span className="text-[length:var(--font-session-card-text-size)] [font-weight:var(--font-session-card-value-weight)] text-[var(--color-session-card-text-secondary)]">Herzfrequenzzonen</span>
      </div>
      <div className="h-2 rounded-[var(--radius-full)] bg-[var(--color-session-card-zone-bg)] overflow-hidden flex">
        {zoneData.map((zone, index) => {
          const percentage = totalDuration > 0 ? (zone.duration / totalDuration) * 100 : 0;
          return (
            <div
              key={zone.name}
              className="h-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: `var(${zoneColors[index]})`
              }}
              title={`${zone.name}: ${zone.duration}min`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[length:var(--font-session-card-hint-size)] text-[var(--color-session-card-text-tertiary)] mt-[var(--spacing-session-card-zone-label-mt)]">
        <span>Z1</span>
        <span>Z2</span>
        <span>Z3</span>
        <span>Z4</span>
        <span>Z5</span>
      </div>
    </div>
  );
};

/**
 * Metriken-Grid Komponente — zeigt max. 4 Werte für Minimalismus
 */
const MetricsGrid: React.FC<{ metrics?: SessionData['metrics']; distance?: number }> = ({ metrics, distance }) => {
  const metricItems: { label: string; value: string }[] = [];

  if (distance) {
    metricItems.push({ label: 'Distanz', value: `${distance.toFixed(1)} km` });
  }

  if (metrics?.pace) {
    metricItems.push({ label: 'Pace', value: metrics.pace });
  }

  if (metrics?.avgHeartRate) {
    metricItems.push({ label: 'Ø HF', value: `${metrics.avgHeartRate} bpm` });
  }

  if (metrics?.calories) {
    metricItems.push({ label: 'Kalorien', value: `${metrics.calories} kcal` });
  }

  if (metricItems.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-[var(--spacing-session-card-grid-gap)] mt-[var(--spacing-session-card-section-gap)]">
      {metricItems.slice(0, 4).map((item) => (
        <div key={item.label}>
          <div className="text-[length:var(--font-session-card-text-size)] [font-weight:var(--font-session-card-value-weight)] text-[var(--color-session-card-text-primary)]">{item.value}</div>
          <div className="text-[length:var(--font-session-card-hint-size)] text-[var(--color-session-card-text-secondary)]">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton Loading Komponente
 */
const SessionCardSkeleton: React.FC = () => (
  <>
    <SkeletonKeyframes />
    <div className="flex items-start justify-between mb-[var(--spacing-session-card-section-gap)]">
      <div>
        <Skeleton className="h-4 w-24 mb-[var(--spacing-session-card-zone-header-mb)]" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-2 rounded-[var(--radius-full)] mb-[var(--spacing-session-card-section-gap)]" />
    <div className="grid grid-cols-2 gap-[var(--spacing-session-card-grid-gap)]">
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </div>
  </>
);

/**
 * SessionCard Props
 */
export interface SessionCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof sessionCardVariants> {
  /** Trainingssitzungsdaten */
  sessionData: SessionData;
  /** Optional: Klick-Handler für Navigation */
  onClick?: () => void;
  /** Zeige Skeleton Loading State */
  loading?: boolean;
  /** Fehlermeldung zum Anzeigen */
  error?: string;
}

/**
 * SessionCard - Umfassende Trainingssitzungs-Anzeigekarte mit nordischen Designprinzipien
 * 
 * @param sessionData - Trainingssitzungsdaten mit Typ, Dauer, Distanz, HF-Zonen und Metriken
 * @param onClick - Optional: Klick-Handler für Navigation 
 * @param loading - Zeige Skeleton Loading State
 * @param error - Fehlermeldung zum Anzeigen
 * @param size - Kartengröße: 'default' | 'compact'
 * @param state - Zustand: 'default' | 'loading' | 'error' | 'interactive'
 */
const SessionCard = React.forwardRef<HTMLDivElement, SessionCardProps>(
  ({
    sessionData,
    onClick,
    loading = false,
    error,
    size = 'default',
    state = 'default',
    className,
    ...props
  }, ref) => {
    // Bestimme finalen State
    const finalState = loading ? 'loading' : error ? 'error' : onClick ? 'interactive' : state;

    // Session-Typ-Label
    const getSessionLabel = (type: SessionData['type']) => {
      const labels: Record<string, string> = {
        running: 'Laufen',
        cycling: 'Radfahren',
        swimming: 'Schwimmen',
        strength: 'Krafttraining',
        other: 'Training'
      };
      return labels[type] || labels.other;
    };

    // Format Duration
    const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
        return `${hours}h ${mins}min`;
      }
      return `${mins}min`;
    };

    // Format Date
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('de-DE', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      }).format(date);
    };

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(sessionCardVariants({ size, state: finalState }), className)}
          {...props}
        >
          <SessionCardSkeleton />
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(sessionCardVariants({ size, state: finalState }), className)}
          {...props}
        >
          <div className="flex items-center justify-center p-[var(--spacing-session-card-error-padding)]">
            <div className="text-center">
              <div className="text-[length:var(--font-session-card-text-size)] [font-weight:var(--font-session-card-value-weight)] text-[var(--color-session-card-text-error)] mb-[var(--spacing-session-card-error-gap)]">Fehler beim Laden</div>
              <div className="text-[length:var(--font-session-card-hint-size)] text-[var(--color-session-card-text-secondary)]">{error}</div>
            </div>
          </div>
        </div>
      );
    }

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(sessionCardVariants({ size, state: finalState }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? `Trainingssitzung ${sessionData.title || getSessionLabel(sessionData.type)} vom ${formatDate(sessionData.date)} öffnen` : undefined}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-[var(--spacing-session-card-section-gap)]">
          <div>
            <h3 className="[font-weight:var(--font-session-card-title-weight)] text-[var(--color-session-card-text-primary)]">
              {sessionData.title || getSessionLabel(sessionData.type)}
            </h3>
            <div className="text-[length:var(--font-session-card-text-size)] text-[var(--color-session-card-text-secondary)] mt-[var(--spacing-session-card-date-mt)]">
              {formatDate(sessionData.date)}
            </div>
          </div>
          <div className="text-right">
            <div className="[font-weight:var(--font-session-card-value-weight)] text-[var(--color-session-card-text-primary)]">
              {formatDuration(sessionData.duration)}
            </div>
          </div>
        </div>

        {/* Beschreibung */}
        {sessionData.description && (
          <div className="text-[length:var(--font-session-card-text-size)] text-[var(--color-session-card-text-secondary)] mb-[var(--spacing-session-card-section-gap)]">
            {sessionData.description}
          </div>
        )}

        {/* Herzfrequenzzonen */}
        <HrZoneBar zones={sessionData.hrZones} totalDuration={sessionData.duration} />

        {/* Metriken */}
        <MetricsGrid
          metrics={sessionData.metrics}
          distance={sessionData.distance}
        />
      </div>
    );
  }
);

SessionCard.displayName = 'SessionCard';

export default SessionCard;
export { sessionCardVariants };