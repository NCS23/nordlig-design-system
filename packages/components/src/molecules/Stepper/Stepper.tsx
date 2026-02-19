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
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
        'transition-colors duration-200',
        isCompleted && 'bg-[var(--color-bg-success)] text-white',
        isCurrent && 'bg-[var(--color-bg-primary)] text-white',
        !isCompleted && !isCurrent &&
          'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]'
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
          ? 'bg-[var(--color-bg-success)]'
          : 'bg-[var(--color-border-default)]',
        orientation === 'horizontal' && 'h-0.5 flex-1',
        orientation === 'vertical' && 'w-0.5 min-h-[24px] ml-4'
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
                    ? 'flex-col items-center gap-2'
                    : 'flex-row items-start gap-3'
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
                      'cursor-pointer rounded-full',
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
                      'text-sm font-medium',
                      isCurrent
                        ? 'text-[var(--color-text-base)]'
                        : 'text-[var(--color-text-muted)]'
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-[var(--color-text-muted)]">
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
