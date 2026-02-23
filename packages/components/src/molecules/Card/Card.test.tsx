import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variants (flat, normal)', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('p-[var(--spacing-card-padding-normal)]');
    expect(card.className).toContain('bg-[var(--color-card-bg)]');
    expect(card.className).toContain('border');
    expect(card.className).toContain('border-[var(--color-card-border)]');
    expect(card.className).not.toContain('[box-shadow:var(--shadow-card-raised)]');
    expect(card.className).not.toContain('[box-shadow:var(--shadow-card-elevated)]');
  });

  it('applies elevation=raised variant', () => {
    render(<Card data-testid="card" elevation="raised">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('[box-shadow:var(--shadow-card-raised)]');
    expect(card.className).toContain('border');
    expect(card.className).toContain('border-[var(--color-card-border)]');
  });

  it('applies elevation=elevated variant', () => {
    render(<Card data-testid="card" elevation="elevated">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('[box-shadow:var(--shadow-card-elevated)]');
    expect(card.className).toContain('border');
    expect(card.className).toContain('border-[var(--color-card-border)]');
  });

  it('applies padding=compact variant', () => {
    render(<Card data-testid="card" padding="compact">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('p-[var(--spacing-card-padding-compact)]');
  });

  it('applies padding=spacious variant', () => {
    render(<Card data-testid="card" padding="spacious">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('p-[var(--spacing-card-padding-spacious)]');
  });

  it('applies hoverable variant', () => {
    render(<Card data-testid="card" hoverable>Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('cursor-pointer');
    expect(card.className).toContain('hover:[box-shadow:var(--shadow-card-hover)]');
  });

  it('does not apply hoverable by default', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).not.toContain('cursor-pointer');
    expect(card.className).not.toContain('hover:[box-shadow:var(--shadow-card-hover)]');
  });

  it('applies custom className', () => {
    render(<Card data-testid="card" className="custom-class">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through HTML attributes', () => {
    render(<Card data-testid="card" aria-label="Test card" role="region">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('aria-label', 'Test card');
    expect(card).toHaveAttribute('role', 'region');
  });

  it('uses CSS custom properties for styling', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('bg-[var(--color-card-bg)]');
    expect(card.className).toContain('rounded-[var(--radius-card)]');
    expect(card.className).toContain('gap-[var(--spacing-card-gap)]');
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardHeader data-testid="header" className="custom">Content</CardHeader>);
    expect(screen.getByTestId('header').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardHeader ref={ref}>Content</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardBody', () => {
  it('renders children', () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('has flex-1 for flexible height', () => {
    render(<CardBody data-testid="body">Content</CardBody>);
    expect(screen.getByTestId('body').className).toContain('flex-1');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardBody ref={ref}>Content</CardBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('has flex layout for actions', () => {
    render(<CardFooter data-testid="footer">Content</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('flex');
    expect(footer.className).toContain('items-center');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CardFooter ref={ref}>Content</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card Compound', () => {
  it('renders full compound component', () => {
    render(
      <Card data-testid="card" elevation="raised" padding="spacious">
        <CardHeader data-testid="header">
          <h3>Title</h3>
          <p>Description</p>
        </CardHeader>
        <CardBody data-testid="body">
          <p>Main content</p>
        </CardBody>
        <CardFooter data-testid="footer">
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('supports hoverable with elevation', () => {
    render(
      <Card data-testid="card" elevation="raised" hoverable>
        <CardBody>Clickable card</CardBody>
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card.className).toContain('[box-shadow:var(--shadow-card-raised)]');
    expect(card.className).toContain('cursor-pointer');
    expect(card.className).toContain('hover:[box-shadow:var(--shadow-card-hover)]');
  });

  it('supports accessibility attributes', () => {
    render(
      <Card role="article" aria-labelledby="card-title">
        <CardHeader>
          <h3 id="card-title">Accessible Card</h3>
        </CardHeader>
        <CardBody>Content</CardBody>
      </Card>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-labelledby', 'card-title');
  });
});
