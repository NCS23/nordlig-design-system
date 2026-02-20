import React from 'react';
import {
  useForm,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// FormContext
// ---------------------------------------------------------------------------

interface FormContextValue<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
}

const FormContext = React.createContext<FormContextValue | null>(null);

/**
 * Hook to access the form instance from any child of `<Form>`.
 */
function useFormContext<T extends FieldValues = FieldValues>() {
  const ctx = React.useContext(FormContext) as FormContextValue<T> | null;
  if (!ctx) {
    throw new Error('useFormContext must be used within a <Form> provider');
  }
  return ctx.form;
}

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

export interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

function FormInner<T extends FieldValues>(
  { form, onSubmit, children, className, ...rest }: FormProps<T>,
  ref: React.ForwardedRef<HTMLFormElement>,
) {
  return (
    <FormContext.Provider value={{ form: form as UseFormReturn<FieldValues> }}>
      <form
        ref={ref}
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

const Form = React.forwardRef(FormInner) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;

// ---------------------------------------------------------------------------
// FormField
// ---------------------------------------------------------------------------

export interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  children: React.ReactElement;
  className?: string;
}

function FormField({ name, label, description, children, className }: FormFieldProps) {
  const form = useFormContext();
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;
  const error = form.formState.errors[name];
  const errorMessage = error?.message as string | undefined;
  const hasError = !!error;

  const { ref: registerRef, ...registerRest } = form.register(name);

  const describedBy = [
    hasError && errorMessage ? errorId : null,
    description ? descriptionId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  // Clone the child element to inject form registration props
  const child = React.cloneElement(children, {
    ...registerRest,
    ref: registerRef,
    id: fieldId,
    'aria-invalid': hasError || undefined,
    'aria-describedby': describedBy,
    error: hasError || undefined,
  });

  return (
    <div className={cn('flex flex-col gap-[var(--spacing-form-field-gap)]', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[length:var(--font-form-label-size)] text-[var(--color-input-text)] [font-weight:var(--font-form-label-weight)]"
        >
          {label}
        </label>
      )}
      {child}
      {hasError && errorMessage && (
        <p
          id={errorId}
          role="alert"
          className="text-[length:var(--font-form-message-size)] text-[var(--color-text-error)]"
        >
          {errorMessage}
        </p>
      )}
      {description && !hasError && (
        <p
          id={descriptionId}
          className="text-[length:var(--font-form-message-size)] text-[var(--color-text-muted)]"
        >
          {description}
        </p>
      )}
    </div>
  );
}

FormField.displayName = 'FormField';

// ---------------------------------------------------------------------------
// FormMessage
// ---------------------------------------------------------------------------

export interface FormMessageProps {
  message?: string;
  className?: string;
}

function FormMessage({ message, className }: FormMessageProps) {
  if (!message) return null;

  return (
    <p role="alert" className={cn('text-[length:var(--font-form-message-size)] text-[var(--color-text-error)]', className)}>
      {message}
    </p>
  );
}

FormMessage.displayName = 'FormMessage';

// ---------------------------------------------------------------------------
// useZodForm
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useZodForm<T extends z.ZodType<any>>(
  schema: T,
  options?: Omit<Parameters<typeof useForm<z.infer<T>>>[0], 'resolver'>,
) {
  return useForm<z.infer<T>>({
    // Zod v4 + @hookform/resolvers v5 generics don't align cleanly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    ...options,
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { Form, FormField, FormMessage, useZodForm, useFormContext };
export { z } from 'zod';
export type { UseFormReturn, SubmitHandler } from 'react-hook-form';
