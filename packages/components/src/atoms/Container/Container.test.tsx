import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container data-testid="container"><p>Hello</p></Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('centers by default', () => {
    render(<Container data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('mx-auto');
  });

  it('applies maxWidth variant', () => {
    render(<Container maxWidth="lg" data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('max-w-screen-lg');
  });

  it('applies full maxWidth', () => {
    render(<Container maxWidth="full" data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('max-w-full');
  });

  it('applies padding variant', () => {
    render(<Container padding="lg" data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('px-');
  });

  it('applies no padding', () => {
    render(<Container padding="none" data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('px-0');
  });

  it('disables centering', () => {
    render(<Container center={false} data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('mx-0');
  });

  it('merges custom className', () => {
    render(<Container className="bg-red" data-testid="container">content</Container>);
    expect(screen.getByTestId('container').className).toContain('bg-red');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Container ref={ref}>content</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders as div element', () => {
    render(<Container data-testid="container">content</Container>);
    expect(screen.getByTestId('container').tagName).toBe('DIV');
  });
});
