import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Automatisch zwischen Slides wechseln */
  autoPlay?: boolean;
  /** Interval in Millisekunden fuer autoPlay */
  interval?: number;
  /** Punkt-Indikatoren anzeigen */
  showDots?: boolean;
  /** Navigations-Pfeile anzeigen */
  showArrows?: boolean;
  /** Endlos-Schleife */
  loop?: boolean;
}

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─── CarouselItem ────────────────────────────────────────────────────────────

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('min-w-full flex-shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CarouselItem.displayName = 'CarouselItem';

// ─── Carousel ────────────────────────────────────────────────────────────────

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      children,
      autoPlay = false,
      interval = 5000,
      showDots = false,
      showArrows = false,
      loop = false,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = React.Children.toArray(children);
    const slideCount = slides.length;

    const goToNext = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev >= slideCount - 1) {
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, [slideCount, loop]);

    const goToPrev = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev <= 0) {
          return loop ? slideCount - 1 : prev;
        }
        return prev - 1;
      });
    }, [slideCount, loop]);

    const goToSlide = useCallback((index: number) => {
      setCurrentIndex(index);
    }, []);

    // AutoPlay
    useEffect(() => {
      if (!autoPlay || slideCount <= 1) return;

      const timer = setInterval(() => {
        goToNext();
      }, interval);

      return () => clearInterval(timer);
    }, [autoPlay, interval, goToNext, slideCount]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goToPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          goToNext();
        }
      },
      [goToNext, goToPrev]
    );

    const canGoPrev = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < slideCount - 1;

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-[var(--radius-card)]',
          className
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label="Karussell"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Slide Track */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live="off"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} von ${slideCount}`}
              className="min-w-full flex-shrink-0"
            >
              {slide}
            </div>
          ))}
        </div>

        {/* Arrow: Previous */}
        {showArrows && canGoPrev && (
          <button
            type="button"
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-10 left-[var(--spacing-carousel-nav-offset)]',
              'w-[var(--sizing-carousel-nav-size)] h-[var(--sizing-carousel-nav-size)] rounded-[var(--radius-carousel-nav)] bg-[var(--color-bg-paper)]/80 backdrop-blur-sm',
              'flex items-center justify-center',
              'text-[var(--color-text-base)] hover:bg-[var(--color-bg-paper)] transition-colors',
              '[box-shadow:var(--shadow-card-raised)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
            )}
            onClick={goToPrev}
            aria-label="Vorheriger Slide"
          >
            <Icon icon={ChevronLeft} size="sm" />
          </button>
        )}

        {/* Arrow: Next */}
        {showArrows && canGoNext && (
          <button
            type="button"
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-10 right-[var(--spacing-carousel-nav-offset)]',
              'w-[var(--sizing-carousel-nav-size)] h-[var(--sizing-carousel-nav-size)] rounded-[var(--radius-carousel-nav)] bg-[var(--color-bg-paper)]/80 backdrop-blur-sm',
              'flex items-center justify-center',
              'text-[var(--color-text-base)] hover:bg-[var(--color-bg-paper)] transition-colors',
              '[box-shadow:var(--shadow-card-raised)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
            )}
            onClick={goToNext}
            aria-label="Naechster Slide"
          >
            <Icon icon={ChevronRight} size="sm" />
          </button>
        )}

        {/* Dot Indicators */}
        {showDots && slideCount > 1 && (
          <div className="absolute bottom-[var(--spacing-carousel-dots-bottom)] left-1/2 -translate-x-1/2 flex z-10 bg-[var(--color-bg-overlay)] backdrop-blur-sm rounded-[var(--radius-carousel-dots)] px-[var(--spacing-carousel-dots-px)] py-[var(--spacing-carousel-dots-py)]">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  'relative min-h-11 min-w-11 flex items-center justify-center rounded-[var(--radius-carousel-dot-btn)] transition-colors duration-200 cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Gehe zu Slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              >
                <span
                  className={cn(
                    'block w-[var(--sizing-carousel-dot-size)] h-[var(--sizing-carousel-dot-size)] rounded-[var(--radius-carousel-dot)] transition-colors duration-200',
                    index === currentIndex
                      ? 'bg-[var(--color-bg-paper)]'
                      : 'bg-[var(--color-bg-paper)]/50 hover:bg-[var(--color-bg-paper)]/70'
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Carousel.displayName = 'Carousel';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Carousel, CarouselItem };
