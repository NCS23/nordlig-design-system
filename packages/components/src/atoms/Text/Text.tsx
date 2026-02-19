import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-[length:var(--font-text-body-size)] text-[var(--color-text-base)]',
      caption: 'text-[length:var(--font-text-caption-size)] text-[var(--color-text-base)]',
      small: 'text-[length:var(--font-text-small-size)] text-[var(--color-text-base)]',
      muted: 'text-[length:var(--font-text-muted-size)] text-[var(--color-text-muted)]',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as: Tag = 'p', ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(textVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
