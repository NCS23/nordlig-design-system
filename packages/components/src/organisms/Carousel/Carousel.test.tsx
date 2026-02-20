import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Carousel, CarouselItem } from './Carousel';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderCarousel(props: Partial<React.ComponentProps<typeof Carousel>> = {}) {
  return render(
    <Carousel {...props}>
      <CarouselItem>
        <div data-testid="slide-1">Slide 1</div>
      </CarouselItem>
      <CarouselItem>
        <div data-testid="slide-2">Slide 2</div>
      </CarouselItem>
      <CarouselItem>
        <div data-testid="slide-3">Slide 3</div>
      </CarouselItem>
    </Carousel>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Carousel', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────────

  it('renders all slides', () => {
    renderCarousel();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('renders as a carousel region', () => {
    renderCarousel();
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('renders slide groups with aria-roledescription', () => {
    renderCarousel();
    const groups = screen.getAllByRole('group');
    expect(groups).toHaveLength(3);
    groups.forEach((group) => {
      expect(group).toHaveAttribute('aria-roledescription', 'slide');
    });
  });

  it('applies custom className', () => {
    renderCarousel({ className: 'my-custom-class' });
    expect(screen.getByRole('region')).toHaveClass('my-custom-class');
  });

  // ─── CarouselItem ──────────────────────────────────────────────────────────

  it('CarouselItem renders children', () => {
    render(
      <CarouselItem data-testid="item">
        <span>Content</span>
      </CarouselItem>
    );
    expect(screen.getByTestId('item')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('CarouselItem has min-w-full and flex-shrink-0', () => {
    render(<CarouselItem data-testid="item">Content</CarouselItem>);
    const item = screen.getByTestId('item');
    expect(item).toHaveClass('min-w-full');
    expect(item).toHaveClass('flex-shrink-0');
  });

  // ─── Arrows ─────────────────────────────────────────────────────────────────

  it('does not show arrows by default', () => {
    renderCarousel();
    expect(screen.queryByLabelText('Vorheriger Slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Naechster Slide')).not.toBeInTheDocument();
  });

  it('shows next arrow when showArrows is true', () => {
    renderCarousel({ showArrows: true });
    expect(screen.getByLabelText('Naechster Slide')).toBeInTheDocument();
  });

  it('does not show prev arrow on first slide when loop=false', () => {
    renderCarousel({ showArrows: true, loop: false });
    expect(screen.queryByLabelText('Vorheriger Slide')).not.toBeInTheDocument();
  });

  it('shows prev arrow on first slide when loop=true', () => {
    renderCarousel({ showArrows: true, loop: true });
    expect(screen.getByLabelText('Vorheriger Slide')).toBeInTheDocument();
  });

  it('navigates to next slide on arrow click', async () => {
    const user = userEvent.setup();
    renderCarousel({ showArrows: true });

    const nextBtn = screen.getByLabelText('Naechster Slide');
    await user.click(nextBtn);

    // After clicking next, prev arrow should appear
    expect(screen.getByLabelText('Vorheriger Slide')).toBeInTheDocument();
  });

  it('navigates to previous slide on arrow click', async () => {
    const user = userEvent.setup();
    renderCarousel({ showArrows: true });

    // Go to slide 2 first
    await user.click(screen.getByLabelText('Naechster Slide'));
    // Then go back
    await user.click(screen.getByLabelText('Vorheriger Slide'));

    // On first slide, prev arrow should be hidden (no loop)
    expect(screen.queryByLabelText('Vorheriger Slide')).not.toBeInTheDocument();
  });

  it('hides next arrow on last slide when loop=false', async () => {
    const user = userEvent.setup();
    renderCarousel({ showArrows: true, loop: false });

    // Navigate to last slide
    await user.click(screen.getByLabelText('Naechster Slide'));
    await user.click(screen.getByLabelText('Naechster Slide'));

    expect(screen.queryByLabelText('Naechster Slide')).not.toBeInTheDocument();
  });

  it('loops from last to first when loop=true', async () => {
    const user = userEvent.setup();
    renderCarousel({ showArrows: true, loop: true });

    // Navigate to last slide
    await user.click(screen.getByLabelText('Naechster Slide'));
    await user.click(screen.getByLabelText('Naechster Slide'));

    // Next should still be visible with loop
    expect(screen.getByLabelText('Naechster Slide')).toBeInTheDocument();
  });

  // ─── Dots ───────────────────────────────────────────────────────────────────

  it('does not show dots by default', () => {
    renderCarousel();
    expect(screen.queryByLabelText('Gehe zu Slide 1')).not.toBeInTheDocument();
  });

  it('shows dots when showDots is true', () => {
    renderCarousel({ showDots: true });
    expect(screen.getByLabelText('Gehe zu Slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Gehe zu Slide 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Gehe zu Slide 3')).toBeInTheDocument();
  });

  it('first dot is active initially', () => {
    renderCarousel({ showDots: true });
    const dot1 = screen.getByLabelText('Gehe zu Slide 1');
    expect(dot1).toHaveAttribute('aria-current', 'true');
  });

  it('navigates to specific slide on dot click', async () => {
    const user = userEvent.setup();
    renderCarousel({ showDots: true });

    await user.click(screen.getByLabelText('Gehe zu Slide 3'));

    const dot3 = screen.getByLabelText('Gehe zu Slide 3');
    expect(dot3).toHaveAttribute('aria-current', 'true');

    const dot1 = screen.getByLabelText('Gehe zu Slide 1');
    expect(dot1).not.toHaveAttribute('aria-current');
  });

  // ─── Keyboard Navigation ───────────────────────────────────────────────────

  it('navigates with ArrowRight key', async () => {
    const user = userEvent.setup();
    renderCarousel({ showDots: true });

    const carousel = screen.getByRole('region');
    carousel.focus();

    await user.keyboard('{ArrowRight}');

    const dot2 = screen.getByLabelText('Gehe zu Slide 2');
    expect(dot2).toHaveAttribute('aria-current', 'true');
  });

  it('navigates with ArrowLeft key', async () => {
    const user = userEvent.setup();
    renderCarousel({ showDots: true });

    const carousel = screen.getByRole('region');
    carousel.focus();

    // Go to slide 2 first
    await user.keyboard('{ArrowRight}');
    // Go back
    await user.keyboard('{ArrowLeft}');

    const dot1 = screen.getByLabelText('Gehe zu Slide 1');
    expect(dot1).toHaveAttribute('aria-current', 'true');
  });

  it('does not go below 0 with ArrowLeft on first slide', async () => {
    const user = userEvent.setup();
    renderCarousel({ showDots: true });

    const carousel = screen.getByRole('region');
    carousel.focus();

    await user.keyboard('{ArrowLeft}');

    const dot1 = screen.getByLabelText('Gehe zu Slide 1');
    expect(dot1).toHaveAttribute('aria-current', 'true');
  });

  // ─── AutoPlay ──────────────────────────────────────────────────────────────

  describe('autoPlay', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('advances slides automatically', () => {
      renderCarousel({ autoPlay: true, interval: 3000, showDots: true });

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      const dot2 = screen.getByLabelText('Gehe zu Slide 2');
      expect(dot2).toHaveAttribute('aria-current', 'true');
    });

    it('advances multiple times', () => {
      renderCarousel({ autoPlay: true, interval: 1000, showDots: true });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByLabelText('Gehe zu Slide 2')).toHaveAttribute('aria-current', 'true');

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByLabelText('Gehe zu Slide 3')).toHaveAttribute('aria-current', 'true');
    });

    it('stops at last slide when loop=false', () => {
      renderCarousel({ autoPlay: true, interval: 1000, showDots: true, loop: false });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      const dot3 = screen.getByLabelText('Gehe zu Slide 3');
      expect(dot3).toHaveAttribute('aria-current', 'true');
    });

    it('loops back to first slide when loop=true', () => {
      renderCarousel({ autoPlay: true, interval: 1000, showDots: true, loop: true });

      // Advance past all 3 slides
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      const dot1 = screen.getByLabelText('Gehe zu Slide 1');
      expect(dot1).toHaveAttribute('aria-current', 'true');
    });

    it('cleans up interval on unmount', () => {
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      const { unmount } = render(
        <Carousel autoPlay interval={1000}>
          <CarouselItem><div>Slide 1</div></CarouselItem>
          <CarouselItem><div>Slide 2</div></CarouselItem>
        </Carousel>
      );

      unmount();
      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });

  // ─── Token-based styling ───────────────────────────────────────────────────

  describe('token-based styling', () => {
    it('uses card radius token', () => {
      renderCarousel();
      expect(screen.getByRole('region')).toHaveClass('rounded-[var(--radius-card)]');
    });

    it('arrow buttons use paper background token', () => {
      renderCarousel({ showArrows: true });
      const nextBtn = screen.getByLabelText('Naechster Slide');
      expect(nextBtn).toHaveClass('bg-[var(--color-bg-paper)]/80');
    });

    it('active dot uses white background', () => {
      renderCarousel({ showDots: true });
      const activeDot = screen.getByLabelText('Gehe zu Slide 1');
      const dotVisual = activeDot.querySelector('span');
      expect(dotVisual).toHaveClass('bg-[var(--color-bg-paper)]');
    });
  });
});
