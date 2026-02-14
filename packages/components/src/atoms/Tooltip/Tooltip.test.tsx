import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders trigger element', () => {
    render(
      <Tooltip content="Hilfetext">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('does not show tooltip content initially', () => {
    render(
      <Tooltip content="Hilfetext">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // ─── Mouse Interaction ──────────────────────────────────────────────────

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hilfetext" delayDuration={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  // ─── Keyboard Interaction ───────────────────────────────────────────────

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Hilfetext" delayDuration={0}>
        <button>Focus me</button>
      </Tooltip>
    );
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  // ─── Content ────────────────────────────────────────────────────────────

  it('renders rich content in tooltip', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip
        content={<span data-testid="rich">Rich text</span>}
        delayDuration={0}
      >
        <button>Hover</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Rich text');
  });

  // ─── Token Classes ──────────────────────────────────────────────────────

  it('applies token-based classes to tooltip content', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tokens" delayDuration={0}>
        <button>Hover</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    // The Radix tooltip content div has the data-side attribute and our classes
    const tooltipEl = screen.getByRole('tooltip');
    const styledContent = tooltipEl.querySelector('[data-side]') ?? tooltipEl.closest('[data-side]') ?? tooltipEl;
    const classes = styledContent.getAttribute('class') || styledContent.className || '';
    expect(classes).toContain('bg-[var(--color-tooltip-bg)]');
  });

  // ─── Side Prop ──────────────────────────────────────────────────────────

  it('passes side prop to Radix content', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Bottom" side="bottom" delayDuration={0}>
        <button>Hover</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    const tooltip = screen.getByRole('tooltip');
    // data-side may be on the tooltip element or a descendant/ancestor
    const sided = tooltip.querySelector('[data-side]') ?? tooltip.closest('[data-side]') ?? tooltip;
    expect(sided.getAttribute('data-side')).toBe('bottom');
  });

  // ─── Trigger Props ────────────────────────────────────────────────────

  it('preserves trigger button functionality', () => {
    render(
      <Tooltip content="Hilfe">
        <button type="submit">Submit</button>
      </Tooltip>
    );
    const btn = screen.getByRole('button', { name: 'Submit' });
    expect(btn).toHaveAttribute('type', 'submit');
  });
});
