import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

const statCardVariants = cva(
  'rounded-[var(--radius-stat-card)] border border-[var(--color-stat-card-border)] bg-[var(--color-stat-card-bg)] p-6',
  {
    variants: {
      variant: {
        default: '',
        success: 'border-l-4 border-l-[var(--color-stat-card-border-success)]',
        warning: 'border-l-4 border-l-[var(--color-stat-card-border-warning)]',
        error: 'border-l-4 border-l-[var(--color-stat-card-border-error)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** Titel/Label der Metrik */
  title: string;
  /** Hauptwert */
  value: string | number;
  /** Einheit (km, min/km, bpm, etc.) */
  unit?: string;
  /** Trend-Indikator */
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  /** Icon links oben */
  icon?: React.ReactNode;
  /** Beschreibung unter dem Wert */
  description?: string;
}

const TrendIndicator: React.FC<{
  value: number;
  direction: 'up' | 'down' | 'neutral';
  label?: string;
}> = ({ value, direction, label }) => {
  const trendIcon = {
    up: <TrendingUp size={16} aria-hidden="true" />,
    down: <TrendingDown size={16} aria-hidden="true" />,
    neutral: <Minus size={16} aria-hidden="true" />,
  };

  const trendLabel = {
    up: 'Trend steigend',
    down: 'Trend fallend',
    neutral: 'Trend gleichbleibend',
  };

  const trendColor = {
    up: 'text-[var(--color-stat-card-trend-up)]',
    down: 'text-[var(--color-stat-card-trend-down)]',
    neutral: 'text-[var(--color-stat-card-text-secondary)]',
  };

  const formattedValue = direction === 'up'
    ? `+${value}%`
    : direction === 'down'
      ? `${value}%`
      : `${value}%`;

  return (
    <div className="flex flex-col items-end">
      <span
        className={cn(
          'inline-flex items-center gap-1 text-sm font-medium',
          trendColor[direction]
        )}
        aria-label={`${trendLabel[direction]}: ${formattedValue}`}
      >
        {trendIcon[direction]}
        {formattedValue}
      </span>
      {label && (
        <span className="text-xs text-[var(--color-stat-card-text-secondary)]">{label}</span>
      )}
    </div>
  );
};

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      variant,
      title,
      value,
      unit,
      trend,
      icon,
      description,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(statCardVariants({ variant, className }))}
        {...props}
      >
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-[var(--color-stat-card-text-secondary)]">{icon}</span>
            )}
            <span className="text-sm font-medium text-[var(--color-stat-card-text-secondary)]">
              {title}
            </span>
          </div>
          {trend && (
            <TrendIndicator
              value={trend.value}
              direction={trend.direction}
              label={trend.label}
            />
          )}
        </div>

        {/* Value */}
        <div className="mt-2">
          <span className="text-3xl font-bold text-[var(--color-stat-card-text-primary)]">
            {value}
          </span>
          {unit && (
            <span className="ml-1 text-lg font-normal text-[var(--color-stat-card-text-secondary)]">
              {unit}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-1 text-sm text-[var(--color-stat-card-text-secondary)]">
            {description}
          </p>
        )}
      </div>
    );
  }
);
StatCard.displayName = 'StatCard';

export { StatCard, statCardVariants };
