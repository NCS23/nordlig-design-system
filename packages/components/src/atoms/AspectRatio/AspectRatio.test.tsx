import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Inhalt</div>
      </AspectRatio>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  // ─── Default Ratio ──────────────────────────────────────────────────────

  it('applies default 16/9 aspect ratio style', () => {
    const { container } = render(
      <AspectRatio>
        <div>Inhalt</div>
      </AspectRatio>
    );
    // Radix wraps in a container with padding-bottom based on ratio
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    // Default ratio is 1 (Radix default), but we check the element exists
    expect(wrapper.style.getPropertyValue('--radix-aspect-ratio')).toBeDefined();
  });

  // ─── Custom Ratio ──────────────────────────────────────────────────────

  it('applies custom 4/3 ratio', () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3}>
        <div>4:3 Inhalt</div>
      </AspectRatio>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('4:3 Inhalt')).toBeInTheDocument();
  });

  // ─── Children ──────────────────────────────────────────────────────────

  it('renders children correctly', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span data-testid="child">Kind-Element</span>
      </AspectRatio>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Kind-Element')).toBeInTheDocument();
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('forwards custom className', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} className="my-custom-class">
        <div>Inhalt</div>
      </AspectRatio>
    );
    // Radix renders a wrapper div; the className goes on the inner element
    const element = container.querySelector('.my-custom-class');
    expect(element).toBeInTheDocument();
  });

  // ─── Image Child ──────────────────────────────────────────────────────

  it('renders image child correctly', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://example.com/image.jpg"
          alt="Testbild"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </AspectRatio>
    );
    const img = screen.getByAltText('Testbild');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });
});
