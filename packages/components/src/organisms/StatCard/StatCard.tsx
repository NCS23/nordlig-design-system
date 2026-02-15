import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

const statCardVariants = cva(
  'rounded-[var(--radius-card)] border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6',
  {
    variants: {
      variant: {
        default: '',
        success: 'border-l-4 border-l-[var(--color-border-success)]',
        warning: 'border-l-4 border-l-[var(--color-border-warning)]',
        error: 'border-l-4 border-l-[var(--color-border-error)]',
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
    up: <TrendingUp size={16} />,
    down: <TrendingDown size={16} />,
    neutral: <Minus size={16} />,
  };

  const trendColor = {
    up: 'text-[var(--color-text-success)]',
    down: 'text-[var(--color-text-error)]',
    neutral: 'text-[var(--color-text-muted)]',
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
      >
        {trendIcon[direction]}
        {formattedValue}
      </span>
      {label && (
        <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
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
              <span className="text-[var(--color-text-muted)]">{icon}</span>
            )}
            <span className="text-sm font-medium text-[var(--color-text-muted)]">
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
          <span className="text-3xl font-bold text-[var(--color-text-base)]">
            {value}
          </span>
          {unit && (
            <span className="ml-1 text-lg font-normal text-[var(--color-text-muted)]">
              {unit}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
      </div>
    );
  }
);
StatCard.displayName = 'StatCard';

export { StatCard, statCardVariants };
