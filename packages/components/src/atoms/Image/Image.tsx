import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ImageOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

// Component token CSS
import '@nordlig/styles/tokens/image';

// CVA-Varianten fuer Rundung und Objektanpassung
const imageVariants = cva(
  'overflow-hidden relative',
  {
    variants: {
      rounded: {
        none: 'rounded-[var(--radius-img-none)]',
        sm:   'rounded-[var(--radius-img-sm)]',
        md:   'rounded-[var(--radius-img-md)]',
        lg:   'rounded-[var(--radius-img-lg)]',
        full: 'rounded-[var(--radius-img-full)]',
      },
      objectFit: {
        cover:   '[&>img]:object-cover',
        contain: '[&>img]:object-contain',
        fill:    '[&>img]:object-fill',
        none:    '[&>img]:object-none',
      },
    },
    defaultVariants: { rounded: 'md', objectFit: 'cover' },
  }
);

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError' | 'alt'>,
    VariantProps<typeof imageVariants> {
  /** Alt-Text (Pflicht fuer Accessibility, leerer String fuer dekorative Bilder) */
  alt: string;
  /** Benutzerdefinierter Fallback bei Ladefehler */
  fallback?: React.ReactNode;
  /** Seitenverhaeltnis des Wrappers (z.B. 16/9, 4/3, 1) */
  aspectRatio?: number;
  /** Callback nach erfolgreichem Laden */
  onLoadingComplete?: () => void;
  /** Callback bei Ladefehler */
  onError?: () => void;
}

const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      className,
      rounded,
      objectFit,
      fallback,
      aspectRatio,
      onLoadingComplete,
      onError,
      src,
      alt,
      style,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');

    // Status zuruecksetzen wenn sich die Quelle aendert
    React.useEffect(() => {
      setStatus('loading');
    }, [src]);

    const handleLoad = () => {
      setStatus('loaded');
      onLoadingComplete?.();
    };

    const handleError = () => {
      setStatus('error');
      onError?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          imageVariants({ rounded, objectFit }),
          'bg-[var(--color-img-bg)]',
          className
        )}
        style={{ ...(aspectRatio != null ? { aspectRatio } : {}), ...style }}
        data-testid="image-wrapper"
        data-loading={status === 'loading' ? '' : undefined}
      >
        {status === 'error' ? (
          fallback ?? (
            <div
              className="flex h-full w-full items-center justify-center bg-[var(--color-img-fallback-bg)]"
              data-testid="image-fallback"
            >
              <Icon icon={ImageOff} className="text-[color:var(--color-img-fallback-text)]" />
            </div>
          )
        ) : (
          <img
            src={src}
            alt={alt}
            className="h-full w-full"
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';

export { Image, imageVariants };
