import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/icon';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'ref'> {
  /** Lucide-React Icon-Komponente */
  icon: LucideIcon;
  /** Benannte Groesse (token-basiert) oder Pixelwert */
  size?: IconSize | number;
  /** Barrierefreies Label — setzt aria-label und entfernt aria-hidden */
  label?: string;
}

const sizeClassMap: Record<IconSize, string> = {
  sm: 'h-[var(--sizing-icon-sm)] w-[var(--sizing-icon-sm)]',
  md: 'h-[var(--sizing-icon-md)] w-[var(--sizing-icon-md)]',
  lg: 'h-[var(--sizing-icon-lg)] w-[var(--sizing-icon-lg)]',
  xl: 'h-[var(--sizing-icon-xl)] w-[var(--sizing-icon-xl)]',
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = 'md', label, className, ...props }, ref) => {
    const isNamedSize = typeof size === 'string';

    return (
      <IconComponent
        ref={ref}
        {...props}
        {...(!isNamedSize ? { size } : {})}
        className={cn(
          'shrink-0',
          isNamedSize && sizeClassMap[size],
          className,
        )}
        aria-hidden={label ? undefined : true}
        aria-label={label || undefined}
        role={label ? 'img' : undefined}
      />
    );
  }
);
Icon.displayName = 'Icon';

export { Icon };
