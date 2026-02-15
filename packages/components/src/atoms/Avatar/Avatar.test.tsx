import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

describe('Avatar', () => {
  // --- Rendering ---

  it('renders the avatar root element', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>NB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders AvatarImage component (falls back in jsdom)', () => {
    // Radix Avatar does not render the <img> element in jsdom because image
    // loading never succeeds. Instead it immediately shows the Fallback.
    // We verify the component renders without error and fallback appears.
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="https://example.com/photo.jpg" alt="Profilbild" />
        <AvatarFallback>NB</AvatarFallback>
      </Avatar>
    );
    // Fallback should be visible since image cannot load in jsdom
    expect(screen.getByText('NB')).toBeInTheDocument();
    // The root avatar should still render correctly
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('shows fallback when no image is provided', () => {
    render(
      <Avatar>
        <AvatarFallback>NB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('NB')).toBeInTheDocument();
  });

  it('shows fallback initials', () => {
    render(
      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('MK')).toBeInTheDocument();
  });

  // --- Size variants ---

  it('applies size=sm classes', () => {
    render(
      <Avatar data-testid="avatar" size="sm">
        <AvatarFallback size="sm">S</AvatarFallback>
      </Avatar>
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar.className).toContain('h-[var(--sizing-avatar-sm)]');
    expect(avatar.className).toContain('w-[var(--sizing-avatar-sm)]');
  });

  it('applies size=md classes (default)', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar.className).toContain('h-[var(--sizing-avatar-md)]');
    expect(avatar.className).toContain('w-[var(--sizing-avatar-md)]');
  });

  it('applies size=lg classes', () => {
    render(
      <Avatar data-testid="avatar" size="lg">
        <AvatarFallback size="lg">L</AvatarFallback>
      </Avatar>
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar.className).toContain('h-[var(--sizing-avatar-lg)]');
    expect(avatar.className).toContain('w-[var(--sizing-avatar-lg)]');
  });

  it('applies size=xl classes', () => {
    render(
      <Avatar data-testid="avatar" size="xl">
        <AvatarFallback size="xl">XL</AvatarFallback>
      </Avatar>
    );
    const avatar = screen.getByTestId('avatar');
    expect(avatar.className).toContain('h-[var(--sizing-avatar-xl)]');
    expect(avatar.className).toContain('w-[var(--sizing-avatar-xl)]');
  });

  // --- Custom className ---

  it('applies custom className', () => {
    render(
      <Avatar data-testid="avatar" className="my-custom-class">
        <AvatarFallback>NB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('avatar').className).toContain('my-custom-class');
  });

  // --- Token classes ---

  it('uses token classes for bg, border, and radius', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>NB</AvatarFallback>
      </Avatar>
    );
    const classes = screen.getByTestId('avatar').className;
    expect(classes).toContain('bg-[var(--color-avatar-bg)]');
    expect(classes).toContain('border-[var(--color-avatar-border)]');
    expect(classes).toContain('rounded-[var(--radius-avatar)]');
  });

  it('has round overflow-hidden shape', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>NB</AvatarFallback>
      </Avatar>
    );
    const classes = screen.getByTestId('avatar').className;
    expect(classes).toContain('overflow-hidden');
    expect(classes).toContain('rounded-[var(--radius-avatar)]');
  });
});
