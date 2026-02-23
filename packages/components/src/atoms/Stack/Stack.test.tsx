import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stack, VStack, HStack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack data-testid="stack"><span>A</span><span>B</span></Stack>);
    expect(screen.getByTestId('stack')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('applies vertical direction by default', () => {
    render(<Stack data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('flex-col');
  });

  it('applies horizontal direction', () => {
    render(<Stack direction="horizontal" data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('flex-row');
  });

  it('applies gap variants', () => {
    render(<Stack gap="lg" data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('gap-');
  });

  it('applies align variant', () => {
    render(<Stack align="center" data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('items-center');
  });

  it('applies justify variant', () => {
    render(<Stack justify="between" data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('justify-between');
  });

  it('applies wrap', () => {
    render(<Stack wrap={true} data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('flex-wrap');
  });

  it('renders as custom element', () => {
    render(<Stack as="section" data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').tagName).toBe('SECTION');
  });

  it('merges custom className', () => {
    render(<Stack className="custom-class" data-testid="stack">content</Stack>);
    expect(screen.getByTestId('stack').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(<Stack ref={ref}>content</Stack>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe('VStack', () => {
  it('renders with vertical direction', () => {
    render(<VStack data-testid="vstack">content</VStack>);
    expect(screen.getByTestId('vstack').className).toContain('flex-col');
  });

  it('renders as div by default', () => {
    render(<VStack data-testid="vstack">content</VStack>);
    expect(screen.getByTestId('vstack').tagName).toBe('DIV');
  });
});

describe('HStack', () => {
  it('renders with horizontal direction', () => {
    render(<HStack data-testid="hstack">content</HStack>);
    expect(screen.getByTestId('hstack').className).toContain('flex-row');
  });

  it('applies gap to horizontal layout', () => {
    render(<HStack gap="sm" data-testid="hstack">content</HStack>);
    const cls = screen.getByTestId('hstack').className;
    expect(cls).toContain('flex-row');
    expect(cls).toContain('gap-');
  });
});
