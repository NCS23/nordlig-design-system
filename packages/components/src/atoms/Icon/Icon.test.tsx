import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Info, AlertTriangle, X } from 'lucide-react';
import { Icon } from './Icon';

describe('Icon', () => {
  // --- Grundlegendes Rendering ---

  it('rendert ein SVG-Element', () => {
    const { container } = render(<Icon icon={Info} data-testid="icon" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('rendert das korrekte Lucide-Icon', () => {
    const { container } = render(<Icon icon={AlertTriangle} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  // --- Benannte Groessen (token-basiert) ---

  it('wendet Standard-Groesse md an', () => {
    const { container } = render(<Icon icon={Info} />);
    const svg = container.querySelector('svg');
    expect(svg?.className.baseVal || svg?.getAttribute('class')).toContain(
      'h-[var(--sizing-icon-md)]'
    );
    expect(svg?.className.baseVal || svg?.getAttribute('class')).toContain(
      'w-[var(--sizing-icon-md)]'
    );
  });

  it('wendet sm-Groesse korrekt an', () => {
    const { container } = render(<Icon icon={Info} size="sm" />);
    const svg = container.querySelector('svg');
    const cls = svg?.className.baseVal || svg?.getAttribute('class') || '';
    expect(cls).toContain('h-[var(--sizing-icon-sm)]');
    expect(cls).toContain('w-[var(--sizing-icon-sm)]');
  });

  it('wendet lg-Groesse korrekt an', () => {
    const { container } = render(<Icon icon={Info} size="lg" />);
    const svg = container.querySelector('svg');
    const cls = svg?.className.baseVal || svg?.getAttribute('class') || '';
    expect(cls).toContain('h-[var(--sizing-icon-lg)]');
    expect(cls).toContain('w-[var(--sizing-icon-lg)]');
  });

  it('wendet xl-Groesse korrekt an', () => {
    const { container } = render(<Icon icon={Info} size="xl" />);
    const svg = container.querySelector('svg');
    const cls = svg?.className.baseVal || svg?.getAttribute('class') || '';
    expect(cls).toContain('h-[var(--sizing-icon-xl)]');
    expect(cls).toContain('w-[var(--sizing-icon-xl)]');
  });

  // --- Numerische Groesse (Pixel) ---

  it('uebergibt numerische Groesse direkt an Lucide', () => {
    const { container } = render(<Icon icon={Info} size={18} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '18');
  });

  it('setzt keine Token-Klassen bei numerischer Groesse', () => {
    const { container } = render(<Icon icon={Info} size={20} />);
    const svg = container.querySelector('svg');
    const cls = svg?.className.baseVal || svg?.getAttribute('class') || '';
    expect(cls).not.toContain('--sizing-icon');
  });

  // --- Accessibility ---

  it('hat aria-hidden="true" per Default (dekorativ)', () => {
    const { container } = render(<Icon icon={Info} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('setzt aria-label und entfernt aria-hidden bei label-Prop', () => {
    const { container } = render(<Icon icon={Info} label="Information" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Information');
    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(svg).toHaveAttribute('role', 'img');
  });

  it('hat kein role-Attribut ohne label', () => {
    const { container } = render(<Icon icon={Info} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toHaveAttribute('role');
  });

  // --- CSS-Klassen ---

  it('hat shrink-0 Basis-Klasse', () => {
    const { container } = render(<Icon icon={Info} />);
    const svg = container.querySelector('svg');
    const cls = svg?.className.baseVal || svg?.getAttribute('class') || '';
    expect(cls).toContain('shrink-0');
  });

  it('uebergibt zusaetzliche className', () => {
    const { container } = render(
      <Icon icon={Info} className="text-red-500 mt-1" />
    );
    const svg = container.querySelector('svg');
    const cls = svg?.className.baseVal || svg?.getAttribute('class') || '';
    expect(cls).toContain('text-red-500');
    expect(cls).toContain('mt-1');
  });

  // --- Ref-Weiterleitung ---

  it('leitet ref korrekt weiter', () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Icon icon={Info} ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  // --- displayName ---

  it('hat den displayName "Icon"', () => {
    expect(Icon.displayName).toBe('Icon');
  });

  // --- SVG-Attribute durchreichen ---

  it('reicht zusaetzliche SVG-Attribute durch', () => {
    const { container } = render(
      <Icon icon={X} data-testid="close-icon" strokeWidth={3} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-testid', 'close-icon');
    expect(svg).toHaveAttribute('stroke-width', '3');
  });
});
