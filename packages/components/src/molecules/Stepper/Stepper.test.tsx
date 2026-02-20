import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Stepper, type StepperStep } from './Stepper';

const defaultSteps: StepperStep[] = [
  { label: 'Schritt 1' },
  { label: 'Schritt 2' },
  { label: 'Schritt 3' },
];

const stepsWithDescriptions: StepperStep[] = [
  { label: 'Profil', description: 'Persoenliche Daten eingeben' },
  { label: 'Training', description: 'Trainingsplan waehlen' },
  { label: 'Fertig', description: 'Zusammenfassung pruefen' },
];

describe('Stepper', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders all step labels', () => {
    render(<Stepper steps={defaultSteps} currentStep={0} />);
    expect(screen.getByText('Schritt 1')).toBeInTheDocument();
    expect(screen.getByText('Schritt 2')).toBeInTheDocument();
    expect(screen.getByText('Schritt 3')).toBeInTheDocument();
  });

  it('renders step numbers for non-completed steps', () => {
    render(<Stepper steps={defaultSteps} currentStep={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<Stepper steps={stepsWithDescriptions} currentStep={0} />);
    expect(screen.getByText('Persoenliche Daten eingeben')).toBeInTheDocument();
    expect(screen.getByText('Trainingsplan waehlen')).toBeInTheDocument();
    expect(screen.getByText('Zusammenfassung pruefen')).toBeInTheDocument();
  });

  it('renders with role="list" for accessibility', () => {
    render(<Stepper steps={defaultSteps} currentStep={0} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders list items for each step', () => {
    render(<Stepper steps={defaultSteps} currentStep={0} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  // ─── Current Step Highlighting ────────────────────────────────────────

  it('marks current step with aria-current="step"', () => {
    render(<Stepper steps={defaultSteps} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  it('applies primary bg to current step indicator', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={1} />
    );
    const indicators = container.querySelectorAll(
      '[data-stepper-indicator]'
    );
    expect(indicators[1].className).toContain(
      'bg-[var(--color-stepper-current-bg)]'
    );
  });

  // ─── Completed State ──────────────────────────────────────────────────

  it('shows check icon for completed steps', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={2} />
    );
    // Completed steps (0, 1) should have SVG check icons
    const indicators = container.querySelectorAll(
      '[data-stepper-indicator]'
    );
    expect(indicators[0].querySelector('svg')).toBeInTheDocument();
    expect(indicators[1].querySelector('svg')).toBeInTheDocument();
    // Current step (2) should show number
    expect(indicators[2].querySelector('svg')).not.toBeInTheDocument();
  });

  it('applies completed bg to completed step indicators', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={2} />
    );
    const indicators = container.querySelectorAll(
      '[data-stepper-indicator]'
    );
    expect(indicators[0].className).toContain(
      'bg-[var(--color-stepper-completed-bg)]'
    );
    expect(indicators[0].className).toContain('border-2');
    expect(indicators[1].className).toContain(
      'bg-[var(--color-stepper-completed-bg)]'
    );
    expect(indicators[1].className).toContain('border-2');
  });

  it('applies pending bg to upcoming step indicators', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={0} />
    );
    const indicators = container.querySelectorAll(
      '[data-stepper-indicator]'
    );
    expect(indicators[1].className).toContain(
      'bg-[var(--color-stepper-pending-bg)]'
    );
    expect(indicators[2].className).toContain(
      'bg-[var(--color-stepper-pending-bg)]'
    );
  });

  // ─── Connecting Lines ─────────────────────────────────────────────────

  it('renders connecting lines between steps', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={1} />
    );
    // 3 steps = 2 connecting lines
    const lines = container.querySelectorAll('[data-stepper-line]');
    expect(lines.length).toBe(2);
  });

  it('colors completed connecting lines with completed token', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={2} />
    );
    const lines = container.querySelectorAll('[data-stepper-line]');
    expect(lines[0].className).toContain('bg-[var(--color-stepper-line-completed)]');
    expect(lines[1].className).toContain('bg-[var(--color-stepper-line-completed)]');
  });

  it('colors upcoming connecting lines with pending token', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={0} />
    );
    const lines = container.querySelectorAll('[data-stepper-line]');
    expect(lines[0].className).toContain(
      'bg-[var(--color-stepper-line-pending)]'
    );
  });

  // ─── Click Handler ────────────────────────────────────────────────────

  it('calls onStepClick when clicking completed step', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Stepper
        steps={defaultSteps}
        currentStep={2}
        onStepClick={handleClick}
      />
    );
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(handleClick).toHaveBeenCalledWith(0);
  });

  it('does not render buttons for non-completed steps when onStepClick is set', () => {
    render(
      <Stepper
        steps={defaultSteps}
        currentStep={1}
        onStepClick={vi.fn()}
      />
    );
    // Only step 0 is completed, so only 1 button
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('does not render buttons when onStepClick is not set', () => {
    render(<Stepper steps={defaultSteps} currentStep={2} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('applies focus ring to clickable completed steps', () => {
    render(
      <Stepper
        steps={defaultSteps}
        currentStep={2}
        onStepClick={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).toContain(
      'focus-visible:ring-[var(--color-border-focus)]'
    );
  });

  // ─── Orientation ──────────────────────────────────────────────────────

  it('defaults to horizontal orientation', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={0} />
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('flex-row');
    expect(wrapper?.className).toContain('items-center');
  });

  it('renders in vertical orientation', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={0} orientation="vertical" />
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('flex-col');
  });

  it('applies horizontal line classes in horizontal mode', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} currentStep={0} />
    );
    const lines = container.querySelectorAll('[data-stepper-line]');
    expect(lines[0].className).toContain('h-[var(--sizing-stepper-line-h)]');
    expect(lines[0].className).toContain('flex-1');
  });

  it('applies vertical line classes in vertical mode', () => {
    const { container } = render(
      <Stepper
        steps={defaultSteps}
        currentStep={0}
        orientation="vertical"
      />
    );
    const lines = container.querySelectorAll('[data-stepper-line]');
    expect(lines[0].className).toContain('w-[var(--sizing-stepper-line-v-w)]');
    expect(lines[0].className).toContain('min-h-[var(--sizing-stepper-line-v-min)]');
    expect(lines[0].className).toContain('ml-[var(--spacing-stepper-line-offset)]');
  });

  // ─── Custom Props ─────────────────────────────────────────────────────

  it('forwards className to wrapper', () => {
    const { container } = render(
      <Stepper
        steps={defaultSteps}
        currentStep={0}
        className="custom-class"
      />
    );
    expect(container.firstElementChild?.className).toContain('custom-class');
  });

  it('forwards ref to wrapper', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stepper ref={ref} steps={defaultSteps} currentStep={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards additional HTML attributes', () => {
    render(
      <Stepper
        steps={defaultSteps}
        currentStep={0}
        data-testid="stepper"
      />
    );
    expect(screen.getByTestId('stepper')).toBeInTheDocument();
  });
});
