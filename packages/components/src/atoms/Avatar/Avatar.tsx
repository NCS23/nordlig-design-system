import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-[var(--radius-avatar)] bg-[var(--color-avatar-bg)] [border-width:var(--sizing-avatar-border-width)] border-[var(--color-avatar-border)]',
  {
    variants: {
      size: {
        sm: 'h-[var(--sizing-avatar-sm)] w-[var(--sizing-avatar-sm)]',
        md: 'h-[var(--sizing-avatar-md)] w-[var(--sizing-avatar-md)]',
        lg: 'h-[var(--sizing-avatar-lg)] w-[var(--sizing-avatar-lg)]',
        xl: 'h-[var(--sizing-avatar-xl)] w-[var(--sizing-avatar-xl)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

const fallbackSizeMap: Record<string, string> = {
  sm: 'text-[length:var(--font-avatar-sm-size)]',
  md: 'text-[length:var(--font-avatar-md-size)]',
  lg: 'text-[length:var(--font-avatar-lg-size)]',
  xl: 'text-[length:var(--font-avatar-xl-size)]',
};

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size = 'md', ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center text-[var(--color-avatar-text)] [font-weight:var(--font-avatar-fallback-weight)]',
      fallbackSizeMap[size],
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
