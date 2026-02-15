import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const headingVariants = cva('', {
  variants: {
    level: {
      1: 'text-4xl font-bold tracking-tight text-[var(--color-text-heading)]',
      2: 'text-3xl font-bold tracking-tight text-[var(--color-text-heading)]',
      3: 'text-2xl font-semibold text-[var(--color-text-heading)]',
      4: 'text-xl font-semibold text-[var(--color-text-heading)]',
      5: 'text-lg font-medium text-[var(--color-text-heading)]',
      6: 'text-base font-medium text-[var(--color-text-heading)]',
    },
  },
});

const levelTagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Tag = as ?? levelTagMap[level];

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
