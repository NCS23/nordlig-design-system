import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface StepperStep {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  steps: StepperStep[];
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (step: number) => void;
}

// ─── Step Indicator ─────────────────────────────────────────────────────────

const StepIndicator: React.FC<{
  stepIndex: number;
  currentStep: number;
  step: StepperStep;
}> = ({ stepIndex, currentStep, step }) => {
  const isCompleted = stepIndex < currentStep;
  const isCurrent = stepIndex === currentStep;

  return (
    <div
      data-stepper-indicator
      className={cn(
        'w-[var(--sizing-stepper-indicator)] h-[var(--sizing-stepper-indicator)] rounded-[var(--radius-stepper-indicator)] flex items-center justify-center text-[length:var(--font-stepper-indicator-size)] [font-weight:var(--font-stepper-indicator-weight)]',
        'transition-colors duration-200',
        isCompleted && 'bg-[var(--color-stepper-completed-bg)] border-2 border-[var(--color-stepper-completed-border)] text-[var(--color-stepper-completed-text)]',
        isCurrent && 'bg-[var(--color-stepper-current-bg)] text-[var(--color-stepper-current-text)]',
        !isCompleted && !isCurrent &&
          'bg-[var(--color-stepper-pending-bg)] border border-[var(--color-stepper-pending-border)] text-[var(--color-stepper-pending-text)]'
      )}
    >
      {isCompleted ? (
        step.icon || <Icon icon={Check} size="sm" />
      ) : (
        step.icon || <span>{stepIndex + 1}</span>
      )}
    </div>
  );
};

// ─── Connecting Line ────────────────────────────────────────────────────────

const ConnectingLine: React.FC<{
  stepIndex: number;
  currentStep: number;
  orientation: 'horizontal' | 'vertical';
}> = ({ stepIndex, currentStep, orientation }) => {
  const isCompleted = stepIndex < currentStep;

  return (
    <div
      className={cn(
        'transition-colors duration-200',
        isCompleted
          ? 'bg-[var(--color-stepper-line-completed)]'
          : 'bg-[var(--color-stepper-line-pending)]',
        orientation === 'horizontal' && 'h-[var(--sizing-stepper-line-h)] flex-1',
        orientation === 'vertical' && 'w-[var(--sizing-stepper-line-v-w)] min-h-[var(--sizing-stepper-line-v-min)] ml-[var(--spacing-stepper-line-offset)]'
      )}
      aria-hidden="true"
      data-stepper-line=""
    />
  );
};

// ─── Stepper ────────────────────────────────────────────────────────────────

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      currentStep,
      steps,
      orientation = 'horizontal',
      onStepClick,
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-center' : 'flex-col',
          className
        )}
        role="list"
        aria-label="Fortschritt"
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && isCompleted;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Step */}
              <div
                className={cn(
                  'flex',
                  isHorizontal
                    ? 'flex-col items-center gap-[var(--spacing-stepper-content-gap)]'
                    : 'flex-row items-start gap-[var(--spacing-stepper-step-gap)]'
                )}
                role="listitem"
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Indicator */}
                {isClickable ? (
                  <button
                    type="button"
                    onClick={() => onStepClick(index)}
                    className={cn(
                      'cursor-pointer rounded-[var(--radius-stepper-indicator)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
                    )}
                    aria-label={`Gehe zu Schritt ${index + 1}: ${step.label}`}
                  >
                    <StepIndicator
                      stepIndex={index}
                      currentStep={currentStep}
                      step={step}
                    />
                  </button>
                ) : (
                  <StepIndicator
                    stepIndex={index}
                    currentStep={currentStep}
                    step={step}
                  />
                )}

                {/* Label & Description */}
                <div
                  className={cn(
                    'flex flex-col',
                    isHorizontal && 'items-center text-center'
                  )}
                >
                  <span
                    className={cn(
                      'text-[length:var(--font-stepper-label-size)] [font-weight:var(--font-stepper-label-weight)]',
                      isCurrent
                        ? 'text-[var(--color-stepper-label-current)]'
                        : 'text-[var(--color-stepper-label-default)]'
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-[length:var(--font-stepper-desc-size)] text-[var(--color-text-muted)]">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <ConnectingLine
                  stepIndex={index}
                  currentStep={currentStep}
                  orientation={orientation}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);
Stepper.displayName = 'Stepper';

export { Stepper };
