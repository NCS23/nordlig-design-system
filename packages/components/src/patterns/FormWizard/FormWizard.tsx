import React from 'react';
import { cn } from '../../utils/cn';
import { Stepper } from '../../molecules/Stepper/Stepper';
import { Form, useZodForm } from '../../molecules/Form/Form';
import { Button } from '../../atoms/Button';
import { z } from 'zod';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

// Component token CSS
import '@nordlig/styles/tokens/formwizard';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FormWizardStep {
  /** Label shown in the Stepper indicator */
  label: string;
  /** Optional description shown below the label */
  description?: string;
  /** Zod schema for this step's fields */
  schema: z.ZodSchema;
  /** Field names that belong to this step (used for partial validation) */
  fields: string[];
  /** Render function for the step content — receives the form instance */
  content: (form: UseFormReturn<FieldValues>) => React.ReactNode;
}

export interface FormWizardProps {
  /** Array of wizard steps */
  steps: FormWizardStep[];
  /** Called when the final step is submitted with all accumulated data */
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  /** Optional summary step renderer — shown as the last step before submit */
  summaryStep?: (data: Record<string, unknown>) => React.ReactNode;
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional CSS class for the root element */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Merge all step schemas into a single combined Zod object schema.
 * Each step.schema is expected to be a ZodObject — we extract its shape
 * and merge them all.
 */
function mergeSchemas(steps: FormWizardStep[]): z.ZodObject<Record<string, z.ZodTypeAny>> {
  let merged: Record<string, z.ZodTypeAny> = {};
  for (const step of steps) {
    const schema = step.schema;
    if (schema instanceof z.ZodObject) {
      merged = { ...merged, ...schema.shape };
    }
  }
  return z.object(merged);
}

// ---------------------------------------------------------------------------
// FormWizard
// ---------------------------------------------------------------------------

const FormWizard = React.forwardRef<HTMLDivElement, FormWizardProps>(
  ({ steps, onSubmit, summaryStep, orientation = 'horizontal', className }, ref) => {
    const [currentStep, setCurrentStep] = React.useState(0);

    // Build combined schema + form
    const combinedSchema = React.useMemo(() => mergeSchemas(steps), [steps]);

    // Build default values from all step schemas
    const defaultValues = React.useMemo(() => {
      const defaults: Record<string, string> = {};
      for (const step of steps) {
        for (const field of step.fields) {
          defaults[field] = '';
        }
      }
      return defaults;
    }, [steps]);

    const form = useZodForm(combinedSchema, { defaultValues });

    // Total steps including optional summary
    const totalSteps = summaryStep ? steps.length + 1 : steps.length;
    const isSummaryStep = summaryStep ? currentStep === steps.length : false;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    // Stepper labels (include summary if provided)
    const stepperSteps = React.useMemo(() => {
      const items = steps.map((s) => ({
        label: s.label,
        description: s.description,
      }));
      if (summaryStep) {
        items.push({ label: 'Zusammenfassung', description: undefined });
      }
      return items;
    }, [steps, summaryStep]);

    // Handle "Weiter" — validate only current step fields, then advance
    const handleNext = React.useCallback(async () => {
      if (currentStep < steps.length) {
        const currentFields = steps[currentStep].fields;
        const isValid = await form.trigger(currentFields as (keyof typeof form.formState.defaultValues)[]);
        if (!isValid) return;
      }
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }, [currentStep, steps, form, totalSteps]);

    // Handle "Zurueck" — no validation, just go back
    const handleBack = React.useCallback(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, []);

    // Handle clicking a completed step in the Stepper
    const handleStepClick = React.useCallback((stepIndex: number) => {
      if (stepIndex < currentStep) {
        setCurrentStep(stepIndex);
      }
    }, [currentStep]);

    // Handle final submit
    const handleSubmit = React.useCallback(async () => {
      // On summary step, just submit the data
      if (isSummaryStep) {
        const data = form.getValues();
        await onSubmit(data as Record<string, unknown>);
        return;
      }
      // On last content step (no summary), validate and submit
      const currentFields = steps[currentStep].fields;
      const isValid = await form.trigger(currentFields as (keyof typeof form.formState.defaultValues)[]);
      if (!isValid) return;
      const data = form.getValues();
      await onSubmit(data as Record<string, unknown>);
    }, [isSummaryStep, form, onSubmit, steps, currentStep]);

    // No-op submit handler for the Form wrapper (we handle submit via buttons)
    const noop = React.useCallback(() => {}, []);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col', className)}
        data-testid="form-wizard"
      >
        {/* Stepper Navigation */}
        <div className="mb-[var(--spacing-fwizard-stepper-mb)]">
          <Stepper
            steps={stepperSteps}
            currentStep={currentStep}
            orientation={orientation}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Form wrapper provides FormContext for FormField children */}
        <Form form={form} onSubmit={noop}>
          {/* Step Content — all steps stay mounted, only current is visible */}
          <div
            className="py-[var(--spacing-fwizard-content-py)] flex flex-col gap-[var(--spacing-fwizard-content-gap)]"
            data-testid="form-wizard-content"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                style={{ display: index === currentStep ? undefined : 'none' }}
                data-testid={`form-wizard-step-${index}`}
              >
                {step.content(form as UseFormReturn<FieldValues>)}
              </div>
            ))}
            {isSummaryStep && summaryStep && (
              <div
                className="bg-[var(--color-fwizard-summary-bg)] border border-[var(--color-fwizard-summary-border)] rounded-[var(--radius-fwizard-summary)] p-[var(--spacing-fwizard-summary-padding)] flex flex-col gap-[var(--spacing-fwizard-summary-gap)]"
                data-testid="form-wizard-summary"
              >
                {summaryStep(form.getValues() as Record<string, unknown>)}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div
            className="flex justify-between pt-[var(--spacing-fwizard-nav-pt)] gap-[var(--spacing-fwizard-nav-gap)]"
            data-testid="form-wizard-nav"
          >
            <div>
              {!isFirstStep && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  data-testid="form-wizard-back"
                >
                  Zurueck
                </Button>
              )}
            </div>
            <div className="flex gap-[var(--spacing-fwizard-nav-gap)]">
              {isLastStep ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSubmit}
                  data-testid="form-wizard-submit"
                >
                  Absenden
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  data-testid="form-wizard-next"
                >
                  Weiter
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    );
  }
);

FormWizard.displayName = 'FormWizard';

export { FormWizard };
