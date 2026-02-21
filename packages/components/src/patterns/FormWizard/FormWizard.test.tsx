import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { FormWizard, type FormWizardStep } from './FormWizard';
import { FormField } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input';

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------

const step1Schema = z.object({
  vorname: z.string().min(1, 'Vorname ist erforderlich'),
  nachname: z.string().min(1, 'Nachname ist erforderlich'),
});

const step2Schema = z.object({
  strasse: z.string().min(1, 'Strasse ist erforderlich'),
  stadt: z.string().min(1, 'Stadt ist erforderlich'),
});

const step3Schema = z.object({
  email: z.string().email('Ungueltige E-Mail'),
});

function createTestSteps(): FormWizardStep[] {
  return [
    {
      label: 'Persoenlich',
      description: 'Name eingeben',
      schema: step1Schema,
      fields: ['vorname', 'nachname'],
      content: (form) => (
        <div data-testid="step-1-content">
          <FormField name="vorname" label="Vorname">
            <Input />
          </FormField>
          <FormField name="nachname" label="Nachname">
            <Input />
          </FormField>
        </div>
      ),
    },
    {
      label: 'Adresse',
      description: 'Adresse eingeben',
      schema: step2Schema,
      fields: ['strasse', 'stadt'],
      content: (form) => (
        <div data-testid="step-2-content">
          <FormField name="strasse" label="Strasse">
            <Input />
          </FormField>
          <FormField name="stadt" label="Stadt">
            <Input />
          </FormField>
        </div>
      ),
    },
    {
      label: 'Account',
      schema: step3Schema,
      fields: ['email'],
      content: (form) => (
        <div data-testid="step-3-content">
          <FormField name="email" label="E-Mail">
            <Input />
          </FormField>
        </div>
      ),
    },
  ];
}

/** Helper: checks if a step wrapper is visible (not display:none) */
function isStepVisible(stepIndex: number): boolean {
  const wrapper = screen.getByTestId(`form-wizard-step-${stepIndex}`);
  return wrapper.style.display !== 'none';
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('FormWizard', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders stepper with correct step labels', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    expect(screen.getByText('Persoenlich')).toBeInTheDocument();
    expect(screen.getByText('Adresse')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders stepper with descriptions', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    expect(screen.getByText('Name eingeben')).toBeInTheDocument();
    expect(screen.getByText('Adresse eingeben')).toBeInTheDocument();
  });

  it('shows first step content initially', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    expect(isStepVisible(0)).toBe(true);
    expect(isStepVisible(1)).toBe(false);
    expect(isStepVisible(2)).toBe(false);
  });

  it('shows "Weiter" button on first step', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    expect(screen.getByTestId('form-wizard-next')).toHaveTextContent('Weiter');
  });

  // ─── Navigation Forward ────────────────────────────────────────────────

  it('"Weiter" navigates to next step on valid input', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );

    // Fill in step 1 fields
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');

    // Click Weiter
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });
    expect(isStepVisible(0)).toBe(false);
  });

  it('"Weiter" shows errors on invalid input and does not advance', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );

    // Click Weiter without filling fields
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(screen.getByText('Vorname ist erforderlich')).toBeInTheDocument();
    });
    // Should still be on step 1
    expect(isStepVisible(0)).toBe(true);
  });

  // ─── Navigation Back ──────────────────────────────────────────────────

  it('"Zurueck" button is hidden on first step', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    expect(screen.queryByTestId('form-wizard-back')).not.toBeInTheDocument();
  });

  it('"Zurueck" navigates to previous step', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );

    // Fill step 1 and advance
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    // Click Zurueck
    await user.click(screen.getByTestId('form-wizard-back'));

    await waitFor(() => {
      expect(isStepVisible(0)).toBe(true);
    });
  });

  // ─── Data Persistence ─────────────────────────────────────────────────

  it('data persists when navigating back and forth', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );

    // Fill step 1
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    // Go back
    await user.click(screen.getByTestId('form-wizard-back'));

    await waitFor(() => {
      expect(isStepVisible(0)).toBe(true);
    });

    // Values should be preserved (steps stay mounted, just hidden)
    expect(screen.getByLabelText('Vorname')).toHaveValue('Max');
    expect(screen.getByLabelText('Nachname')).toHaveValue('Mustermann');
  });

  // ─── Last Step Submit ─────────────────────────────────────────────────

  it('"Absenden" button appears on last step', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );

    // Navigate to step 2
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    // Navigate to step 3
    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(2)).toBe(true);
    });

    // "Absenden" should be visible, "Weiter" should not
    expect(screen.getByTestId('form-wizard-submit')).toHaveTextContent('Absenden');
    expect(screen.queryByTestId('form-wizard-next')).not.toBeInTheDocument();
  });

  it('onSubmit called with all step data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={handleSubmit}
      />
    );

    // Step 1
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    // Step 2
    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(2)).toBe(true);
    });

    // Step 3
    await user.type(screen.getByLabelText('E-Mail'), 'max@example.com');
    await user.click(screen.getByTestId('form-wizard-submit'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          vorname: 'Max',
          nachname: 'Mustermann',
          strasse: 'Hauptstr. 1',
          stadt: 'Berlin',
          email: 'max@example.com',
        })
      );
    });
  });

  // ─── Summary Step ─────────────────────────────────────────────────────

  it('summary step renders when summaryStep provided', async () => {
    const user = userEvent.setup();
    const summaryRenderer = vi.fn((data) => (
      <div data-testid="summary-content">
        Zusammenfassung: {String(data.vorname)}
      </div>
    ));

    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        summaryStep={summaryRenderer}
      />
    );

    // Navigate through all 3 content steps
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(2)).toBe(true);
    });

    await user.type(screen.getByLabelText('E-Mail'), 'max@example.com');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(screen.getByTestId('form-wizard-summary')).toBeInTheDocument();
    });
    expect(screen.getByTestId('summary-content')).toHaveTextContent('Zusammenfassung: Max');
  });

  it('summary step includes "Zusammenfassung" in stepper', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        summaryStep={() => <div>Summary</div>}
      />
    );
    expect(screen.getByText('Zusammenfassung')).toBeInTheDocument();
  });

  it('summary step shows "Zurueck" and "Absenden"', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        summaryStep={() => <div data-testid="summary-content">Summary</div>}
      />
    );

    // Navigate through all 3 content steps
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(2)).toBe(true);
    });

    await user.type(screen.getByLabelText('E-Mail'), 'max@example.com');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(screen.getByTestId('form-wizard-summary')).toBeInTheDocument();
    });

    expect(screen.getByTestId('form-wizard-back')).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-submit')).toBeInTheDocument();
    expect(screen.queryByTestId('form-wizard-next')).not.toBeInTheDocument();
  });

  // ─── Stepper Click ────────────────────────────────────────────────────

  it('clicking completed step in stepper navigates back', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );

    // Navigate to step 2
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    // Click on step 1 in stepper (the completed step button)
    const stepperButton = screen.getByRole('button', {
      name: /Gehe zu Schritt 1/,
    });
    await user.click(stepperButton);

    await waitFor(() => {
      expect(isStepVisible(0)).toBe(true);
    });
  });

  // ─── Forward ref ──────────────────────────────────────────────────────

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <FormWizard
        ref={ref}
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId('form-wizard'));
  });

  // ─── className ────────────────────────────────────────────────────────

  it('applies className to root element', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        className="custom-wizard"
      />
    );
    expect(screen.getByTestId('form-wizard')).toHaveClass('custom-wizard');
  });

  // ─── Orientation ──────────────────────────────────────────────────────

  it('passes orientation prop to Stepper', () => {
    const { container } = render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        orientation="vertical"
      />
    );
    // Stepper should have flex-col for vertical orientation
    const stepper = container.querySelector('[role="list"]');
    expect(stepper?.className).toContain('flex-col');
  });

  it('defaults to horizontal orientation', () => {
    const { container } = render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    const stepper = container.querySelector('[role="list"]');
    expect(stepper?.className).toContain('flex-row');
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('uses fwizard spacing token for stepper margin', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    const stepperWrapper = screen.getByTestId('form-wizard').firstElementChild;
    expect(stepperWrapper?.className).toContain('mb-[var(--spacing-fwizard-stepper-mb)]');
  });

  it('uses fwizard spacing tokens for content area', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    const content = screen.getByTestId('form-wizard-content');
    expect(content.className).toContain('py-[var(--spacing-fwizard-content-py)]');
    expect(content.className).toContain('gap-[var(--spacing-fwizard-content-gap)]');
  });

  it('uses fwizard spacing tokens for navigation area', () => {
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
      />
    );
    const nav = screen.getByTestId('form-wizard-nav');
    expect(nav.className).toContain('pt-[var(--spacing-fwizard-nav-pt)]');
    expect(nav.className).toContain('gap-[var(--spacing-fwizard-nav-gap)]');
  });

  it('uses fwizard summary tokens on summary step', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        summaryStep={() => <div>Summary</div>}
      />
    );

    // Navigate through all steps
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(2)).toBe(true);
    });

    await user.type(screen.getByLabelText('E-Mail'), 'max@example.com');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(screen.getByTestId('form-wizard-summary')).toBeInTheDocument();
    });

    const summary = screen.getByTestId('form-wizard-summary');
    expect(summary.className).toContain('bg-[var(--color-fwizard-summary-bg)]');
    expect(summary.className).toContain('border-[var(--color-fwizard-summary-border)]');
    expect(summary.className).toContain('rounded-[var(--radius-fwizard-summary)]');
    expect(summary.className).toContain('p-[var(--spacing-fwizard-summary-padding)]');
    expect(summary.className).toContain('gap-[var(--spacing-fwizard-summary-gap)]');
  });

  // ─── Last content step without summary validates before submit ────────

  it('validates last content step before submit when no summary', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={handleSubmit}
      />
    );

    // Navigate to step 2
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(1)).toBe(true);
    });

    // Navigate to step 3
    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(isStepVisible(2)).toBe(true);
    });

    // Try to submit without filling email — should fail
    await user.click(screen.getByTestId('form-wizard-submit'));

    await waitFor(() => {
      expect(screen.getByText('Ungueltige E-Mail')).toBeInTheDocument();
    });
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  // ─── All steps hidden on summary ─────────────────────────────────────

  it('hides all content steps when on summary step', async () => {
    const user = userEvent.setup();
    render(
      <FormWizard
        steps={createTestSteps()}
        onSubmit={vi.fn()}
        summaryStep={(data) => <div data-testid="summary-content">OK</div>}
      />
    );

    // Navigate through all steps
    await user.type(screen.getByLabelText('Vorname'), 'Max');
    await user.type(screen.getByLabelText('Nachname'), 'Mustermann');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => { expect(isStepVisible(1)).toBe(true); });

    await user.type(screen.getByLabelText('Strasse'), 'Hauptstr. 1');
    await user.type(screen.getByLabelText('Stadt'), 'Berlin');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => { expect(isStepVisible(2)).toBe(true); });

    await user.type(screen.getByLabelText('E-Mail'), 'max@example.com');
    await user.click(screen.getByTestId('form-wizard-next'));

    await waitFor(() => {
      expect(screen.getByTestId('form-wizard-summary')).toBeInTheDocument();
    });

    // All content steps should be hidden
    expect(isStepVisible(0)).toBe(false);
    expect(isStepVisible(1)).toBe(false);
    expect(isStepVisible(2)).toBe(false);
  });
});
