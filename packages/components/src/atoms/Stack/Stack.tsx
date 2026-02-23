import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    gap: {
      none: 'gap-0',
      '2xs': 'gap-[var(--spacing-component-gap-2xs)]',
      xs: 'gap-[var(--spacing-component-gap-xs)]',
      sm: 'gap-[var(--spacing-component-gap-sm)]',
      md: 'gap-[var(--spacing-component-gap-md)]',
      lg: 'gap-[var(--spacing-component-gap-lg)]',
      xl: 'gap-[var(--spacing-component-gap-xl)]',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof stackVariants> {
  as?: 'div' | 'section' | 'nav' | 'ul' | 'ol' | 'main' | 'aside' | 'article';
}

const Stack = React.forwardRef<HTMLElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, as: Tag = 'div', ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<never>}
        className={cn(stackVariants({ direction, gap, align, justify, wrap, className }))}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';

export type VStackProps = Omit<StackProps, 'direction'>;
export type HStackProps = Omit<StackProps, 'direction'>;

const VStack = React.forwardRef<HTMLElement, VStackProps>(
  (props, ref) => <Stack ref={ref as React.Ref<HTMLElement>} direction="vertical" {...props} />
);

VStack.displayName = 'VStack';

const HStack = React.forwardRef<HTMLElement, HStackProps>(
  (props, ref) => <Stack ref={ref as React.Ref<HTMLElement>} direction="horizontal" {...props} />
);

HStack.displayName = 'HStack';

export { Stack, VStack, HStack, stackVariants };
