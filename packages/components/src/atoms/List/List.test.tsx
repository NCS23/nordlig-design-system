import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { List, ListItem, DescriptionList, DescriptionTerm, DescriptionDetails } from './List';

describe('List', () => {
  it('renders as ul by default', () => {
    render(<List data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').tagName).toBe('UL');
  });

  it('renders as ol when variant is ordered', () => {
    render(<List variant="ordered" data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').tagName).toBe('OL');
  });

  it('renders as ol when as prop is ol', () => {
    render(<List as="ol" data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').tagName).toBe('OL');
  });

  it('applies unordered variant', () => {
    render(<List variant="unordered" data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').className).toContain('list-disc');
  });

  it('applies gap variant', () => {
    render(<List gap="lg" data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').className).toContain('space-y-');
  });

  it('applies indent', () => {
    render(<List indent={true} data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').className).toContain('pl-');
  });

  it('merges custom className', () => {
    render(<List className="custom" data-testid="list"><li>Item</li></List>);
    expect(screen.getByTestId('list').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLUListElement>;
    render(<List ref={ref}><li>Item</li></List>);
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });
});

describe('ListItem', () => {
  it('renders children', () => {
    render(<ListItem>Hello</ListItem>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<ListItem icon={<span data-testid="icon">*</span>}>Text</ListItem>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders action slot', () => {
    render(<ListItem action={<button data-testid="action">X</button>}>Text</ListItem>);
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ListItem description="Sub text">Main text</ListItem>);
    expect(screen.getByText('Sub text')).toBeInTheDocument();
  });

  it('applies interactive variant', () => {
    render(<ListItem interactive={true} data-testid="item">Text</ListItem>);
    expect(screen.getByTestId('item').className).toContain('cursor-pointer');
  });

  it('is not interactive by default', () => {
    render(<ListItem data-testid="item">Text</ListItem>);
    expect(screen.getByTestId('item').className).not.toContain('cursor-pointer');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLLIElement>;
    render(<ListItem ref={ref}>Text</ListItem>);
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

describe('DescriptionList', () => {
  it('renders as dl element', () => {
    render(<DescriptionList data-testid="dl"><dt>Term</dt></DescriptionList>);
    expect(screen.getByTestId('dl').tagName).toBe('DL');
  });

  it('applies gap', () => {
    render(<DescriptionList gap="lg" data-testid="dl"><dt>Term</dt></DescriptionList>);
    expect(screen.getByTestId('dl').className).toContain('space-y-');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDListElement>;
    render(<DescriptionList ref={ref}><dt>Term</dt></DescriptionList>);
    expect(ref.current).toBeInstanceOf(HTMLDListElement);
  });
});

describe('DescriptionTerm', () => {
  it('renders as dt element', () => {
    render(<DescriptionTerm>Term</DescriptionTerm>);
    expect(screen.getByText('Term').tagName).toBe('DT');
  });

  it('applies font-medium', () => {
    render(<DescriptionTerm data-testid="dt">Term</DescriptionTerm>);
    expect(screen.getByTestId('dt').className).toContain('font-medium');
  });
});

describe('DescriptionDetails', () => {
  it('renders as dd element', () => {
    render(<DescriptionDetails>Detail</DescriptionDetails>);
    expect(screen.getByText('Detail').tagName).toBe('DD');
  });

  it('applies muted text color', () => {
    render(<DescriptionDetails data-testid="dd">Detail</DescriptionDetails>);
    expect(screen.getByTestId('dd').className).toContain('text-');
  });
});
