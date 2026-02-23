import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';
import { Card } from '../../molecules/Card';

const statCardVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        success: 'border-l-4 border-l-[var(--color-statcard-border-success)]',
        warning: 'border-l-4 border-l-[var(--color-statcard-border-warning)]',
        error: 'border-l-4 border-l-[var(--color-statcard-border-error)]',
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
    up: <Icon icon={TrendingUp} size="sm" />,
    down: <Icon icon={TrendingDown} size="sm" />,
    neutral: <Icon icon={Minus} size="sm" />,
  };

  const trendLabel = {
    up: 'Trend steigend',
    down: 'Trend fallend',
    neutral: 'Trend gleichbleibend',
  };

  const trendColor = {
    up: 'text-[var(--color-statcard-trend-up)]',
    down: 'text-[var(--color-statcard-trend-down)]',
    neutral: 'text-[var(--color-statcard-text-secondary)]',
  };

  const formattedValue = direction === 'up'
    ? `+${value}%`
    : direction === 'down'
      ? `${value}%`
      : `${value}%`;

  return (
    <div className="flex items-center gap-[var(--spacing-statcard-trend-inner-gap)]">
      <span
        className={cn(
          'inline-flex items-center gap-[var(--spacing-statcard-trend-gap)] text-[length:var(--font-statcard-trend-size)] [font-weight:var(--font-statcard-trend-weight)]',
          trendColor[direction]
        )}
        aria-label={`${trendLabel[direction]}: ${formattedValue}`}
      >
        {trendIcon[direction]}
        {formattedValue}
      </span>
      {label && (
        <span className="text-[length:var(--font-statcard-label-size)] text-[var(--color-statcard-text-secondary)] hidden sm:inline">{label}</span>
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
      <Card
        ref={ref}
        elevation="raised"
        padding="normal"
        className={cn(statCardVariants({ variant }), className)}
        {...props}
      >
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-[var(--spacing-statcard-header-gap)]">
            {icon && (
              <span className="text-[var(--color-statcard-text-secondary)]">{icon}</span>
            )}
            <span className="text-[length:var(--font-statcard-title-size)] [font-weight:var(--font-statcard-title-weight)] text-[var(--color-statcard-text-secondary)]">
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
        <div className="mt-[var(--spacing-statcard-value-mt)]">
          <span className="text-[length:var(--font-statcard-value-size)] [font-weight:var(--font-statcard-value-weight)] text-[var(--color-statcard-text-primary)]">
            {value}
          </span>
          {unit && (
            <span className="ml-[var(--spacing-statcard-trend-gap)] text-[length:var(--font-statcard-unit-size)] [font-weight:var(--font-statcard-unit-weight)] text-[var(--color-statcard-text-secondary)]">
              {unit}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-[var(--spacing-statcard-trend-mt)] text-[length:var(--font-statcard-desc-size)] text-[var(--color-statcard-text-secondary)]">
            {description}
          </p>
        )}
      </Card>
    );
  }
);
StatCard.displayName = 'StatCard';

export { StatCard, statCardVariants };
