import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert', () => {
  // ─── Container ──────────────────────────────────────────────────────────────

  it('renders container with role="alert"', () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Title</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // ─── Title ──────────────────────────────────────────────────────────────────

  it('renders title text', () => {
    render(
      <Alert>
        <AlertTitle>Wichtiger Hinweis</AlertTitle>
      </Alert>
    );
    expect(screen.getByText('Wichtiger Hinweis')).toBeInTheDocument();
  });

  // ─── Description ────────────────────────────────────────────────────────────

  it('renders description text', () => {
    render(
      <Alert>
        <AlertDescription>Das ist eine Beschreibung.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Das ist eine Beschreibung.')).toBeInTheDocument();
  });

  // ─── Variant border-l classes ───────────────────────────────────────────────

  it('applies info variant border-l class', () => {
    render(
      <Alert data-testid="alert" variant="info">
        <AlertTitle>Info</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'border-l-[var(--color-alert-info-border)]'
    );
  });

  it('applies success variant border-l class', () => {
    render(
      <Alert data-testid="alert" variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'border-l-[var(--color-alert-success-border)]'
    );
  });

  it('applies warning variant border-l class', () => {
    render(
      <Alert data-testid="alert" variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'border-l-[var(--color-alert-warning-border)]'
    );
  });

  it('applies error variant border-l class', () => {
    render(
      <Alert data-testid="alert" variant="error">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'border-l-[var(--color-alert-error-border)]'
    );
  });

  // ─── Variant bg classes ─────────────────────────────────────────────────────

  it('applies info variant bg class', () => {
    render(
      <Alert data-testid="alert" variant="info">
        <AlertTitle>Info</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'bg-[var(--color-alert-info-bg)]'
    );
  });

  it('applies success variant bg class', () => {
    render(
      <Alert data-testid="alert" variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'bg-[var(--color-alert-success-bg)]'
    );
  });

  it('applies warning variant bg class', () => {
    render(
      <Alert data-testid="alert" variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'bg-[var(--color-alert-warning-bg)]'
    );
  });

  it('applies error variant bg class', () => {
    render(
      <Alert data-testid="alert" variant="error">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass(
      'bg-[var(--color-alert-error-bg)]'
    );
  });

  // ─── Icon rendering per variant ─────────────────────────────────────────────

  it('renders info icon with correct color class', () => {
    render(
      <Alert data-testid="alert" variant="info">
        <AlertTitle>Info</AlertTitle>
      </Alert>
    );
    const svg = screen.getByTestId('alert').querySelector('svg');
    expect(svg).toHaveClass('text-[var(--color-alert-info-icon)]');
  });

  it('renders success icon with correct color class', () => {
    render(
      <Alert data-testid="alert" variant="success">
        <AlertTitle>Success</AlertTitle>
      </Alert>
    );
    const svg = screen.getByTestId('alert').querySelector('svg');
    expect(svg).toHaveClass('text-[var(--color-alert-success-icon)]');
  });

  it('renders warning icon with correct color class', () => {
    render(
      <Alert data-testid="alert" variant="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    );
    const svg = screen.getByTestId('alert').querySelector('svg');
    expect(svg).toHaveClass('text-[var(--color-alert-warning-icon)]');
  });

  it('renders error icon with correct color class', () => {
    render(
      <Alert data-testid="alert" variant="error">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
    const svg = screen.getByTestId('alert').querySelector('svg');
    expect(svg).toHaveClass('text-[var(--color-alert-error-icon)]');
  });

  // ─── Close button ───────────────────────────────────────────────────────────

  it('shows close button when closeable', () => {
    render(
      <Alert closeable>
        <AlertTitle>Closeable</AlertTitle>
      </Alert>
    );
    expect(screen.getByLabelText('Schließen')).toBeInTheDocument();
  });

  it('does not show close button by default', () => {
    render(
      <Alert>
        <AlertTitle>Not Closeable</AlertTitle>
      </Alert>
    );
    expect(screen.queryByLabelText('Schließen')).not.toBeInTheDocument();
  });

  it('fires onClose callback on close click', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Alert closeable onClose={handleClose}>
        <AlertTitle>Closeable</AlertTitle>
      </Alert>
    );

    await user.click(screen.getByLabelText('Schließen'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // ─── Custom className ──────────────────────────────────────────────────────

  it('applies custom className', () => {
    render(
      <Alert data-testid="alert" className="custom-class">
        <AlertTitle>Custom</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('alert')).toHaveClass('custom-class');
  });

  // ─── Sub-component styling ─────────────────────────────────────────────────

  it('AlertTitle has correct text class', () => {
    render(
      <Alert>
        <AlertTitle data-testid="title">Title</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId('title')).toHaveClass(
      'text-[var(--color-alert-title)]'
    );
  });

  it('AlertDescription has correct text class', () => {
    render(
      <Alert>
        <AlertDescription data-testid="desc">Description</AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId('desc')).toHaveClass(
      'text-[var(--color-alert-description)]'
    );
  });
});
