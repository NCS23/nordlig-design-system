import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { Form, FormField, FormMessage, useZodForm, useFormContext } from './Form';
import { Input } from '../../atoms/Input';

// ---------------------------------------------------------------------------
// Shared test schema
// ---------------------------------------------------------------------------

const testSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  email: z.string().email('Ungueltige E-Mail'),
});

type TestFormValues = z.infer<typeof testSchema>;

// ---------------------------------------------------------------------------
// Helper wrapper that creates a form + renders children
// ---------------------------------------------------------------------------

function TestForm({
  onSubmit = vi.fn(),
  defaultValues,
  children,
}: {
  onSubmit?: (data: TestFormValues) => void;
  defaultValues?: Partial<TestFormValues>;
  children: React.ReactNode;
}) {
  const form = useZodForm(testSchema, {
    defaultValues: { name: '', email: '', ...defaultValues },
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      {children}
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

describe('Form', () => {
  it('renders children', () => {
    render(
      <TestForm>
        <span data-testid="child">Hello</span>
      </TestForm>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('calls onSubmit with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <TestForm onSubmit={handleSubmit} defaultValues={{ name: 'Alice', email: 'alice@example.com' }}>
        <FormField name="name">
          <Input />
        </FormField>
        <FormField name="email">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { name: 'Alice', email: 'alice@example.com' },
        expect.anything(),
      );
    });
  });

  it('does NOT call onSubmit with invalid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <TestForm onSubmit={handleSubmit}>
        <FormField name="name">
          <Input />
        </FormField>
        <FormField name="email">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestForm>
        <span>content</span>
      </TestForm>,
    );
    // Default form has no extra class
    const form = container.querySelector('form')!;
    expect(form).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Form className
// ---------------------------------------------------------------------------

describe('Form className', () => {
  it('applies custom className to Form element', () => {
    function FormWithClass() {
      const form = useZodForm(testSchema, { defaultValues: { name: '', email: '' } });
      return (
        <Form form={form} onSubmit={vi.fn()} className="custom-form">
          <span>content</span>
        </Form>
      );
    }

    const { container } = render(<FormWithClass />);
    expect(container.querySelector('form')).toHaveClass('custom-form');
  });
});

// ---------------------------------------------------------------------------
// FormField
// ---------------------------------------------------------------------------

describe('FormField', () => {
  it('renders label', () => {
    render(
      <TestForm>
        <FormField name="name" label="Vorname">
          <Input />
        </FormField>
      </TestForm>,
    );
    expect(screen.getByText('Vorname')).toBeInTheDocument();
    expect(screen.getByText('Vorname').tagName).toBe('LABEL');
  });

  it('shows error message for invalid field', async () => {
    const user = userEvent.setup();

    render(
      <TestForm>
        <FormField name="name" label="Name">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(screen.getByText('Name ist erforderlich')).toBeInTheDocument();
    });
  });

  it('shows description', () => {
    render(
      <TestForm>
        <FormField name="name" description="Bitte geben Sie Ihren Namen ein">
          <Input />
        </FormField>
      </TestForm>,
    );
    expect(screen.getByText('Bitte geben Sie Ihren Namen ein')).toBeInTheDocument();
  });

  it('connects to form register', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <TestForm onSubmit={handleSubmit} defaultValues={{ name: '', email: 'test@test.com' }}>
        <FormField name="name" label="Name">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    const input = screen.getByLabelText('Name');
    await user.type(input, 'Max');
    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Max' }),
        expect.anything(),
      );
    });
  });

  it('applies custom className to FormField wrapper', () => {
    render(
      <TestForm>
        <FormField name="name" className="custom-field">
          <Input />
        </FormField>
      </TestForm>,
    );
    // The wrapper div should have the custom class
    const fieldWrapper = screen.getByRole('textbox').closest('.custom-field');
    expect(fieldWrapper).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// FormMessage
// ---------------------------------------------------------------------------

describe('FormMessage', () => {
  it('renders error text', () => {
    render(<FormMessage message="Ein Fehler ist aufgetreten" />);
    expect(screen.getByText('Ein Fehler ist aufgetreten')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Ein Fehler ist aufgetreten');
  });

  it('renders nothing when no message', () => {
    const { container } = render(<FormMessage />);
    expect(container.firstChild).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// useZodForm
// ---------------------------------------------------------------------------

describe('useZodForm', () => {
  it('returns form with zod resolver', () => {
    let formInstance: ReturnType<typeof useZodForm> | null = null;

    function Capture() {
      const form = useZodForm(testSchema, { defaultValues: { name: '', email: '' } });
      formInstance = form;
      return null;
    }

    render(<Capture />);
    expect(formInstance).not.toBeNull();
    expect(formInstance!.register).toBeDefined();
    expect(formInstance!.handleSubmit).toBeDefined();
    expect(formInstance!.formState).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Validation scenarios
// ---------------------------------------------------------------------------

describe('Validation', () => {
  it('required field shows error', async () => {
    const user = userEvent.setup();

    render(
      <TestForm>
        <FormField name="name" label="Name">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(screen.getByText('Name ist erforderlich')).toBeInTheDocument();
    });
  });

  it('email format error', async () => {
    const user = userEvent.setup();

    render(
      <TestForm defaultValues={{ name: 'Max', email: '' }}>
        <FormField name="email" label="E-Mail">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    const input = screen.getByLabelText('E-Mail');
    await user.type(input, 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(screen.getByText('Ungueltige E-Mail')).toBeInTheDocument();
    });
  });

  it('aria-invalid on errored field', async () => {
    const user = userEvent.setup();

    render(
      <TestForm>
        <FormField name="name" label="Name">
          <Input />
        </FormField>
        <button type="submit">Absenden</button>
      </TestForm>,
    );

    await user.click(screen.getByRole('button', { name: 'Absenden' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
