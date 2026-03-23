import React from 'react';
import { cn } from '../../utils/cn';

// Component token CSS
import '@nordlig/styles/tokens/form';
import '@nordlig/styles/tokens/formpage';

// ─── FormPage (Root) ────────────────────────────────────────────────────────

export interface FormPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximale Breite des Formularbereichs */
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthMap = {
  sm: 'max-w-[var(--sizing-formpage-max-width-sm)]',
  md: 'max-w-[var(--sizing-formpage-max-width-md)]',
  lg: 'max-w-[var(--sizing-formpage-max-width-lg)]',
} as const;

const FormPageRoot = React.forwardRef<HTMLDivElement, FormPageProps>(
  ({ maxWidth = 'md', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mx-auto w-full',
        'flex flex-col gap-[var(--spacing-formpage-header-gap)]',
        maxWidthMap[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

FormPageRoot.displayName = 'FormPage';

// ─── FormPage.Header ────────────────────────────────────────────────────────

export interface FormPageHeaderProps
  extends React.HTMLAttributes<HTMLElement> {}

const FormPageHeader = React.forwardRef<HTMLElement, FormPageHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('flex flex-col gap-[var(--spacing-formpage-body-gap)]', className)}
      {...props}
    >
      {children}
    </header>
  )
);

FormPageHeader.displayName = 'FormPage.Header';

// ─── FormPage.Body ──────────────────────────────────────────────────────────

export interface FormPageBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormPageBody = React.forwardRef<HTMLDivElement, FormPageBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-formpage-body-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

FormPageBody.displayName = 'FormPage.Body';

// ─── FormPage.Actions ───────────────────────────────────────────────────────

export interface FormPageActionsProps
  extends React.HTMLAttributes<HTMLElement> {}

const FormPageActions = React.forwardRef<HTMLElement, FormPageActionsProps>(
  ({ className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-[var(--spacing-formpage-actions-gap)]',
        'pt-[var(--spacing-formpage-header-gap)]',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
);

FormPageActions.displayName = 'FormPage.Actions';

// ─── Compound Export ────────────────────────────────────────────────────────

const FormPage = Object.assign(FormPageRoot, {
  Header: FormPageHeader,
  Body: FormPageBody,
  Actions: FormPageActions,
});

export { FormPage };
