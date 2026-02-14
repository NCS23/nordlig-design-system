import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScrollArea, ScrollBar } from './ScrollArea';

describe('ScrollArea', () => {
  // --- Rendering ---

  it('renders children content', () => {
    render(
      <ScrollArea style={{ height: 200 }}>
        <p>Scrollbarer Inhalt</p>
      </ScrollArea>
    );
    expect(screen.getByText('Scrollbarer Inhalt')).toBeInTheDocument();
  });

  it('renders with scrollable content', () => {
    render(
      <ScrollArea data-testid="scroll-area" style={{ height: 100 }}>
        <div style={{ height: 500 }}>
          <p>Langer Inhalt</p>
        </div>
      </ScrollArea>
    );
    expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    expect(screen.getByText('Langer Inhalt')).toBeInTheDocument();
  });

  it('renders root with overflow-hidden for vertical orientation', () => {
    render(
      <ScrollArea data-testid="scroll-area" style={{ height: 200 }}>
        <div style={{ height: 500 }}>Inhalt</div>
      </ScrollArea>
    );
    const root = screen.getByTestId('scroll-area');
    expect(root.className).toContain('overflow-hidden');
  });

  it('renders root with overflow-hidden for horizontal orientation', () => {
    render(
      <ScrollArea data-testid="scroll-area" orientation="horizontal" style={{ width: 200 }}>
        <div style={{ width: 500 }}>Breiter Inhalt</div>
      </ScrollArea>
    );
    const root = screen.getByTestId('scroll-area');
    expect(root.className).toContain('overflow-hidden');
  });

  it('renders root with overflow-hidden for both orientation', () => {
    render(
      <ScrollArea data-testid="scroll-area" orientation="both" style={{ height: 200, width: 200 }}>
        <div style={{ height: 500, width: 500 }}>Grosser Inhalt</div>
      </ScrollArea>
    );
    const root = screen.getByTestId('scroll-area');
    expect(root.className).toContain('overflow-hidden');
  });

  it('applies custom className', () => {
    render(
      <ScrollArea data-testid="scroll-area" className="my-scroll" style={{ height: 200 }}>
        <p>Inhalt</p>
      </ScrollArea>
    );
    expect(screen.getByTestId('scroll-area').className).toContain('my-scroll');
  });

  it('applies relative positioning on root', () => {
    render(
      <ScrollArea data-testid="scroll-area" style={{ height: 200 }}>
        <div style={{ height: 500 }}>Inhalt</div>
      </ScrollArea>
    );
    const root = screen.getByTestId('scroll-area');
    expect(root.className).toContain('relative');
  });

  it('renders children within viewport', () => {
    render(
      <ScrollArea data-testid="scroll-area" style={{ height: 200 }}>
        <p data-testid="child">Kind-Element</p>
      </ScrollArea>
    );
    const child = screen.getByTestId('child');
    // Child should be inside a viewport element
    const viewport = child.closest('[data-radix-scroll-area-viewport]');
    expect(viewport).toBeInTheDocument();
  });
});
