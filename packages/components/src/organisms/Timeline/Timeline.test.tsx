import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline, TimelineItem } from './Timeline';

describe('Timeline', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders timeline with items', () => {
    render(
      <Timeline>
        <TimelineItem title="Ereignis 1" />
        <TimelineItem title="Ereignis 2" />
        <TimelineItem title="Ereignis 3" />
      </Timeline>
    );
    expect(screen.getByText('Ereignis 1')).toBeInTheDocument();
    expect(screen.getByText('Ereignis 2')).toBeInTheDocument();
    expect(screen.getByText('Ereignis 3')).toBeInTheDocument();
  });

  it('renders with role="list" for accessibility', () => {
    render(
      <Timeline>
        <TimelineItem title="Test" />
      </Timeline>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders items with role="listitem"', () => {
    render(
      <Timeline>
        <TimelineItem title="Eins" />
        <TimelineItem title="Zwei" />
      </Timeline>
    );
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

  it('renders as a flex column', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Test" />
      </Timeline>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('flex');
    expect(wrapper?.className).toContain('flex-col');
  });

  // ─── TimelineItem Content ─────────────────────────────────────────────

  it('renders title', () => {
    render(
      <Timeline>
        <TimelineItem title="Lauf absolviert" />
      </Timeline>
    );
    expect(screen.getByText('Lauf absolviert')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <Timeline>
        <TimelineItem
          title="Lauf"
          description="10 km in 50 Minuten"
        />
      </Timeline>
    );
    expect(screen.getByText('10 km in 50 Minuten')).toBeInTheDocument();
  });

  it('renders timestamp when provided', () => {
    render(
      <Timeline>
        <TimelineItem title="Test" timestamp="14. Feb 2026, 08:30" />
      </Timeline>
    );
    expect(screen.getByText('14. Feb 2026, 08:30')).toBeInTheDocument();
  });

  it('renders children as custom content', () => {
    render(
      <Timeline>
        <TimelineItem title="Test">
          <span data-testid="custom">Custom Content</span>
        </TimelineItem>
      </Timeline>
    );
    expect(screen.getByTestId('custom')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Nur Titel" />
      </Timeline>
    );
    // Only h4 in content, no p tag
    const contentArea = container.querySelector('[class*="spacing-timeline-content-ml"]');
    expect(contentArea?.querySelector('p')).not.toBeInTheDocument();
  });

  it('does not render timestamp when not provided', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Nur Titel" />
      </Timeline>
    );
    const contentArea = container.querySelector('[class*="spacing-timeline-content-ml"]');
    const spans = contentArea?.querySelectorAll('span');
    // No timestamp span
    expect(spans?.length ?? 0).toBe(0);
  });

  // ─── Variant Colors ──────────────────────────────────────────────────

  it('applies default variant styles', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Default" />
      </Timeline>
    );
    const dot = container.querySelector('[class*="rounded-full"][class*="sizing-timeline-dot"]');
    expect(dot?.className).toContain('bg-[var(--color-timeline-dot-default-bg)]');
    expect(dot?.className).toContain('text-[var(--color-timeline-dot-default-text)]');
  });

  it('applies success variant styles', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Erfolg" variant="success" />
      </Timeline>
    );
    const dot = container.querySelector('[class*="rounded-full"][class*="sizing-timeline-dot"]');
    expect(dot?.className).toContain('bg-[var(--color-timeline-dot-success-bg)]');
    expect(dot?.className).toContain('text-[var(--color-timeline-dot-success-text)]');
  });

  it('applies warning variant styles', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Warnung" variant="warning" />
      </Timeline>
    );
    const dot = container.querySelector('[class*="rounded-full"][class*="sizing-timeline-dot"]');
    expect(dot?.className).toContain('bg-[var(--color-timeline-dot-warning-bg)]');
    expect(dot?.className).toContain('text-[var(--color-timeline-dot-warning-text)]');
  });

  it('applies error variant styles', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Fehler" variant="error" />
      </Timeline>
    );
    const dot = container.querySelector('[class*="rounded-full"][class*="sizing-timeline-dot"]');
    expect(dot?.className).toContain('bg-[var(--color-timeline-dot-error-bg)]');
    expect(dot?.className).toContain('text-[var(--color-timeline-dot-error-text)]');
  });

  // ─── Icon ─────────────────────────────────────────────────────────────

  it('renders custom icon when provided', () => {
    render(
      <Timeline>
        <TimelineItem
          title="Mit Icon"
          icon={<svg data-testid="custom-icon" />}
        />
      </Timeline>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders default dot when no icon provided', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Ohne Icon" />
      </Timeline>
    );
    const dot = container.querySelector('[class*="rounded-full"][class*="sizing-timeline-dot"]');
    const innerDot = dot?.querySelector('[class*="sizing-timeline-inner-dot"]');
    expect(innerDot).toBeInTheDocument();
  });

  // ─── Connecting Line ──────────────────────────────────────────────────

  it('renders vertical connecting line', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Eins" />
        <TimelineItem title="Zwei" />
      </Timeline>
    );
    const lines = container.querySelectorAll('[data-timeline-line]');
    expect(lines.length).toBe(2);
    expect(lines[0].className).toContain(
      'bg-[var(--color-timeline-line)]'
    );
  });

  // ─── Custom Props ─────────────────────────────────────────────────────

  it('forwards className to Timeline', () => {
    const { container } = render(
      <Timeline className="custom-timeline">
        <TimelineItem title="Test" />
      </Timeline>
    );
    expect(container.firstElementChild?.className).toContain(
      'custom-timeline'
    );
  });

  it('forwards className to TimelineItem', () => {
    render(
      <Timeline>
        <TimelineItem title="Test" className="custom-item" data-testid="item" />
      </Timeline>
    );
    expect(screen.getByTestId('item').className).toContain('custom-item');
  });

  it('forwards ref to Timeline', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Timeline ref={ref}>
        <TimelineItem title="Test" />
      </Timeline>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to TimelineItem', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Timeline>
        <TimelineItem ref={ref} title="Test" />
      </Timeline>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards additional HTML attributes', () => {
    render(
      <Timeline data-testid="timeline">
        <TimelineItem title="Test" />
      </Timeline>
    );
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('applies text-base token to title', () => {
    render(
      <Timeline>
        <TimelineItem title="Token Test" />
      </Timeline>
    );
    const title = screen.getByText('Token Test');
    expect(title.className).toContain('text-[var(--color-timeline-title)]');
  });

  it('applies text-muted token to description', () => {
    render(
      <Timeline>
        <TimelineItem title="Test" description="Beschreibung" />
      </Timeline>
    );
    const desc = screen.getByText('Beschreibung');
    expect(desc.className).toContain('text-[var(--color-timeline-description)]');
  });

  it('applies text-muted token to timestamp', () => {
    render(
      <Timeline>
        <TimelineItem title="Test" timestamp="Heute" />
      </Timeline>
    );
    const ts = screen.getByText('Heute');
    expect(ts.className).toContain('text-[var(--color-timeline-timestamp)]');
  });
});
