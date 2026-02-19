import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Code, CodeBlock } from './Code';

describe('Code (inline)', () => {
  it('renders children', () => {
    render(<Code>console.log</Code>);
    expect(screen.getByText('console.log')).toBeInTheDocument();
  });

  it('renders as a code element', () => {
    render(<Code data-testid="code">text</Code>);
    expect(screen.getByTestId('code').tagName).toBe('CODE');
  });

  it('applies base styling classes', () => {
    render(<Code data-testid="code">text</Code>);
    const code = screen.getByTestId('code');
    expect(code.className).toContain('font-mono');
    expect(code.className).toContain('text-[length:var(--font-code-size)]');
    expect(code.className).toContain('bg-[var(--color-code-bg)]');
    expect(code.className).toContain('text-[var(--color-code-text)]');
    expect(code.className).toContain('px-1.5');
    expect(code.className).toContain('py-0.5');
    expect(code.className).toContain('rounded-[var(--radius-code)]');
  });

  it('applies custom className', () => {
    render(<Code data-testid="code" className="custom">text</Code>);
    expect(screen.getByTestId('code').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Code ref={ref}>text</Code>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('CODE');
  });

  it('passes through HTML attributes', () => {
    render(<Code data-testid="code" aria-label="code snippet">text</Code>);
    expect(screen.getByTestId('code')).toHaveAttribute('aria-label', 'code snippet');
  });
});

describe('CodeBlock', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders children in pre > code structure', () => {
    render(<CodeBlock data-testid="block">const x = 1;</CodeBlock>);
    const pre = screen.getByTestId('block');
    expect(pre.tagName).toBe('PRE');
    const code = pre.querySelector('code');
    expect(code).toBeInTheDocument();
    expect(code?.textContent).toContain('const x = 1;');
  });

  it('applies base styling classes', () => {
    render(<CodeBlock data-testid="block">code</CodeBlock>);
    const pre = screen.getByTestId('block');
    expect(pre.className).toContain('bg-[var(--color-code-block-bg)]');
    expect(pre.className).toContain('text-[var(--color-code-block-text)]');
    expect(pre.className).toContain('p-4');
    expect(pre.className).toContain('rounded-[var(--radius-code-block)]');
    expect(pre.className).toContain('overflow-x-auto');
    expect(pre.className).toContain('font-mono');
    expect(pre.className).toContain('text-[length:var(--font-code-size)]');
  });

  it('shows copy button when copyable', () => {
    render(<CodeBlock copyable>const x = 1;</CodeBlock>);
    const copyButton = screen.getByRole('button', { name: 'Code kopieren' });
    expect(copyButton).toBeInTheDocument();
  });

  it('does not show copy button by default', () => {
    render(<CodeBlock>const x = 1;</CodeBlock>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('copies text to clipboard when copy button is clicked', async () => {
    render(<CodeBlock copyable>const x = 1;</CodeBlock>);
    const copyButton = screen.getByRole('button', { name: 'Code kopieren' });
    await act(async () => {
      fireEvent.click(copyButton);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1;');
  });

  it('shows check icon after copying', async () => {
    render(<CodeBlock copyable>const x = 1;</CodeBlock>);
    const copyButton = screen.getByRole('button', { name: 'Code kopieren' });
    await act(async () => {
      fireEvent.click(copyButton);
    });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Kopiert' })).toBeInTheDocument();
    });
  });

  it('renders line numbers when showLineNumbers is true', () => {
    render(
      <CodeBlock showLineNumbers data-testid="block">
        {'line one\nline two\nline three'}
      </CodeBlock>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('line numbers have correct styling', () => {
    render(
      <CodeBlock showLineNumbers data-testid="block">
        {'line one\nline two'}
      </CodeBlock>
    );
    const lineNumber = screen.getByText('1');
    expect(lineNumber.className).toContain('select-none');
    expect(lineNumber.className).toContain('text-[var(--color-code-line-number)]');
    expect(lineNumber.className).toContain('text-right');
  });

  it('applies custom className', () => {
    render(<CodeBlock data-testid="block" className="custom">code</CodeBlock>);
    expect(screen.getByTestId('block').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLPreElement>;
    render(<CodeBlock ref={ref}>code</CodeBlock>);
    expect(ref.current).toBeInstanceOf(HTMLPreElement);
  });

  it('passes through HTML attributes', () => {
    render(<CodeBlock data-testid="block" aria-label="code block">code</CodeBlock>);
    expect(screen.getByTestId('block')).toHaveAttribute('aria-label', 'code block');
  });
});
