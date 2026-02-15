import React from 'react';
import { cn } from '../../utils/cn';

// ─── Shimmer animation via inline style ──────────────────────────────────────
// Using inline keyframes since tailwindcss-animate doesn't include shimmer.
// The animation is applied via a CSS class with inline style for the gradient.

const shimmerStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(90deg, var(--color-skeleton-base) 0%, var(--color-skeleton-shimmer) 50%, var(--color-skeleton-base) 100%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export interface SkeletonCircleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('rounded-[var(--radius-skeleton)]', className)}
      style={{ ...shimmerStyle, ...style }}
      {...props}
    />
  )
);
Skeleton.displayName = 'Skeleton';

// ─── SkeletonText ────────────────────────────────────────────────────────────

const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className }) => (
  <div className={cn('space-y-2', className)} aria-hidden="true">
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
      />
    ))}
  </div>
);
SkeletonText.displayName = 'SkeletonText';

// ─── SkeletonCircle ──────────────────────────────────────────────────────────

const circleSize = {
  sm: 'w-[var(--sizing-skeleton-circle-sm)] h-[var(--sizing-skeleton-circle-sm)]',
  md: 'w-[var(--sizing-skeleton-circle-md)] h-[var(--sizing-skeleton-circle-md)]',
  lg: 'w-[var(--sizing-skeleton-circle-lg)] h-[var(--sizing-skeleton-circle-lg)]',
} as const;

const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ size = 'md', className }) => (
  <Skeleton
    className={cn(
      'rounded-[var(--radius-skeleton-circle)]',
      circleSize[size],
      className
    )}
  />
);
SkeletonCircle.displayName = 'SkeletonCircle';

// ─── Global Keyframes (injected once) ───────────────────────────────────────

const KEYFRAMES_ID = 'skeleton-shimmer-keyframes';

const SkeletonKeyframes: React.FC = () => {
  if (typeof document !== 'undefined' && document.getElementById(KEYFRAMES_ID)) {
    return null;
  }
  return (
    <style id={KEYFRAMES_ID}>{`
      @keyframes skeleton-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  );
};

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Skeleton, SkeletonText, SkeletonCircle, SkeletonKeyframes };
