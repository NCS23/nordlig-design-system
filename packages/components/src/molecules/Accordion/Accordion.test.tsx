import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const renderAccordion = (type: 'single' | 'multiple' = 'single') => {
  if (type === 'single') {
    return render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Abschnitt 1</AccordionTrigger>
          <AccordionContent>Inhalt 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Abschnitt 2</AccordionTrigger>
          <AccordionContent>Inhalt 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger disabled>Abschnitt 3</AccordionTrigger>
          <AccordionContent>Inhalt 3</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  return render(
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Abschnitt 1</AccordionTrigger>
        <AccordionContent>Inhalt 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Abschnitt 2</AccordionTrigger>
        <AccordionContent>Inhalt 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

describe('Accordion', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders accordion items with triggers', () => {
    renderAccordion();
    expect(screen.getByText('Abschnitt 1')).toBeInTheDocument();
    expect(screen.getByText('Abschnitt 2')).toBeInTheDocument();
  });

  it('does not show content initially (collapsed)', () => {
    renderAccordion();
    // Radix hides content via data-state="closed" and hidden attribute
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  // ─── Single Mode ────────────────────────────────────────────────────────

  it('opens content on click', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    await user.click(screen.getByText('Abschnitt 1'));
    expect(screen.getByText('Inhalt 1')).toBeVisible();
  });

  it('closes content on second click (collapsible)', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    await user.click(screen.getByText('Abschnitt 1'));
    expect(screen.getByText('Inhalt 1')).toBeVisible();
    await user.click(screen.getByText('Abschnitt 1'));
    // After closing, trigger should be aria-expanded=false
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes previous item when opening another (single mode)', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    await user.click(screen.getByText('Abschnitt 1'));
    expect(screen.getByText('Inhalt 1')).toBeVisible();
    await user.click(screen.getByText('Abschnitt 2'));
    expect(screen.getByText('Inhalt 2')).toBeVisible();
    // First trigger should now be collapsed
    const trigger1 = screen.getByText('Abschnitt 1').closest('button')!;
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
  });

  // ─── Multiple Mode ──────────────────────────────────────────────────────

  it('allows multiple items open simultaneously', async () => {
    const user = userEvent.setup();
    renderAccordion('multiple');
    await user.click(screen.getByText('Abschnitt 1'));
    await user.click(screen.getByText('Abschnitt 2'));
    expect(screen.getByText('Inhalt 1')).toBeVisible();
    expect(screen.getByText('Inhalt 2')).toBeVisible();
  });

  // ─── Keyboard Navigation ───────────────────────────────────────────────

  it('toggles with Enter key', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    screen.getByText('Abschnitt 1').closest('button')!.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Inhalt 1')).toBeVisible();
  });

  it('toggles with Space key', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    screen.getByText('Abschnitt 1').closest('button')!.focus();
    await user.keyboard(' ');
    expect(screen.getByText('Inhalt 1')).toBeVisible();
  });

  // ─── Disabled ───────────────────────────────────────────────────────────

  it('does not open disabled item', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    await user.click(screen.getByText('Abschnitt 3'));
    // Disabled item stays collapsed
    const trigger3 = screen.getByText('Abschnitt 3').closest('button')!;
    expect(trigger3).toHaveAttribute('aria-expanded', 'false');
    expect(trigger3).toHaveAttribute('disabled');
  });

  // ─── ARIA Attributes ───────────────────────────────────────────────────

  it('has aria-expanded on trigger', async () => {
    const user = userEvent.setup();
    renderAccordion('single');
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('has aria-controls linking trigger to content', () => {
    renderAccordion('single');
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    expect(trigger).toHaveAttribute('aria-controls');
  });

  // ─── Token Classes ──────────────────────────────────────────────────────

  it('applies token-based border to items', () => {
    const { container } = renderAccordion('single');
    const items = container.querySelectorAll('[data-state]');
    const firstItem = items[0];
    if (firstItem) {
      expect(firstItem.className).toContain('border-[var(--color-accordion-border)]');
    }
  });

  it('applies token-based padding to trigger', () => {
    renderAccordion('single');
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    expect(trigger.className).toContain('px-[var(--spacing-accordion-trigger-padding-x)]');
    expect(trigger.className).toContain('py-[var(--spacing-accordion-trigger-padding-y)]');
  });

  // ─── Chevron Icon ─────────────────────────────────────────────────────

  it('renders chevron icon in trigger', () => {
    renderAccordion('single');
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    const svg = trigger.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('chevron has icon token color class', () => {
    renderAccordion('single');
    const trigger = screen.getByText('Abschnitt 1').closest('button')!;
    const svg = trigger.querySelector('svg');
    // SVG className is an SVGAnimatedString, use getAttribute
    expect(svg!.getAttribute('class')).toContain('text-[var(--color-accordion-icon)]');
  });
});
