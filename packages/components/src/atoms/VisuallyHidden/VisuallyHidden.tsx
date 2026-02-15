import React from 'react';
import { cn } from '../../utils/cn';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Versteckt Inhalte visuell, bleibt aber fuer Screen Reader zugaenglich.
 * Nutzt die sr-only Technik (position absolute, clip, 1px Groesse).
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('sr-only', className)} {...props} />
  )
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
