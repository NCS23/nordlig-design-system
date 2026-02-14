import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

// Radix Slider uses pointer events, mock getBoundingClientRect for positioning
beforeEach(() => {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 200,
    height: 20,
    top: 0,
    right: 200,
    bottom: 20,
    left: 0,
    toJSON: () => {},
  }));
});

describe('Slider', () => {
  // --- Rendering ---

  it('renders the slider', () => {
    render(<Slider data-testid="slider" defaultValue={[50]} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(<Slider defaultValue={[25]} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-valuenow', '25');
  });

  it('renders with controlled value', () => {
    render(<Slider value={[75]} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-valuenow', '75');
  });

  it('calls onValueChange callback', () => {
    const handleChange = vi.fn();
    render(<Slider defaultValue={[50]} onValueChange={handleChange} />);
    const thumb = screen.getByRole('slider');
    // Simulate keyboard interaction
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects min and max props', () => {
    render(<Slider defaultValue={[5]} min={0} max={10} />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '10');
  });

  it('respects step prop', () => {
    const handleChange = vi.fn();
    render(
      <Slider defaultValue={[50]} step={10} onValueChange={handleChange} />
    );
    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith([60]);
  });

  it('renders disabled state', () => {
    render(<Slider defaultValue={[50]} disabled />);
    const thumb = screen.getByRole('slider');
    expect(thumb).toHaveAttribute('data-disabled', '');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Slider defaultValue={[50]} className="my-slider" />
    );
    const root = container.querySelector('[data-orientation]');
    expect(root?.className).toContain('my-slider');
  });

  it('supports keyboard arrow key interaction', () => {
    const handleChange = vi.fn();
    render(<Slider defaultValue={[50]} onValueChange={handleChange} />);
    const thumb = screen.getByRole('slider');
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith([51]);
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith([50]);
  });

  it('uses token classes for track, range, and thumb', () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    // Track
    const track = container.querySelector('[data-orientation]')?.querySelector('[data-orientation]');
    expect(track?.className).toContain('bg-[var(--color-slider-track)]');
    expect(track?.className).toContain('rounded-[var(--radius-slider-track)]');

    // Range
    const range = track?.firstElementChild;
    expect(range?.className).toContain('bg-[var(--color-slider-range)]');

    // Thumb
    const thumb = screen.getByRole('slider');
    expect(thumb.className).toContain('bg-[var(--color-slider-thumb)]');
    expect(thumb.className).toContain('border-[var(--color-slider-thumb-border)]');
    expect(thumb.className).toContain('rounded-[var(--radius-slider-thumb)]');
  });
});
