import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard';

describe('HoverCard', () => {
  // --- Rendering ---

  it('renders trigger element', () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent>Inhalt</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByRole('button', { name: 'Hover mich' })).toBeInTheDocument();
  });

  it('does not show content initially', () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent>Geheimer Inhalt</HoverCardContent>
      </HoverCard>
    );
    expect(screen.queryByText('Geheimer Inhalt')).not.toBeInTheDocument();
  });

  // --- Content rendering when forced open ---

  it('shows content when open prop is true', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent>Sichtbarer Inhalt</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Sichtbarer Inhalt')).toBeInTheDocument();
  });

  it('applies token-based classes to content', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent>Token Test</HoverCardContent>
      </HoverCard>
    );
    const content = screen.getByText('Token Test').closest('[data-side]');
    const classes = content?.getAttribute('class') || '';
    expect(classes).toContain('bg-[var(--color-hovercard-bg)]');
    expect(classes).toContain('border-[var(--color-hovercard-border)]');
    expect(classes).toContain('rounded-[var(--radius-hovercard)]');
    expect(classes).toContain('[box-shadow:var(--shadow-hovercard)]');
    expect(classes).toContain('p-[var(--spacing-hovercard-padding)]');
  });

  it('forwards custom className to content', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent className="my-custom-class">Inhalt</HoverCardContent>
      </HoverCard>
    );
    const content = screen.getByText('Inhalt').closest('[data-side]');
    expect(content?.getAttribute('class')).toContain('my-custom-class');
  });

  it('renders arrow when showArrow is true', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent showArrow>Mit Pfeil</HoverCardContent>
      </HoverCard>
    );
    const content = screen.getByText('Mit Pfeil').closest('[data-side]');
    const arrow = content?.querySelector('svg');
    expect(arrow).toBeInTheDocument();
  });

  it('does not render arrow by default', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent>Ohne Pfeil</HoverCardContent>
      </HoverCard>
    );
    const content = screen.getByText('Ohne Pfeil').closest('[data-side]');
    const arrow = content?.querySelector('svg');
    expect(arrow).not.toBeInTheDocument();
  });

  it('passes side prop via data-side attribute', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <button>Hover mich</button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom">Unten</HoverCardContent>
      </HoverCard>
    );
    const content = screen.getByText('Unten').closest('[data-side]');
    expect(content?.getAttribute('data-side')).toBe('bottom');
  });
});
