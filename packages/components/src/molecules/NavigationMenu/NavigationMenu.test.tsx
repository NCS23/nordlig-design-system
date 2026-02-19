import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

const renderSimpleNav = () => {
  return render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/sessions">Sessions</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const renderNavWithDropdown = () => {
  return render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sessions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/sessions/all">Alle Sessions</NavigationMenuLink>
            <NavigationMenuLink href="/sessions/recent">Letzte Sessions</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

describe('NavigationMenu', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders navigation links', () => {
    renderSimpleNav();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sessions')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('renders navigation root element', () => {
    renderSimpleNav();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders links as list items', () => {
    renderSimpleNav();
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  // ─── Trigger ────────────────────────────────────────────────────────────

  it('renders trigger with dropdown indicator', () => {
    renderNavWithDropdown();
    const trigger = screen.getByText('Sessions');
    expect(trigger).toBeInTheDocument();
  });

  it('trigger has correct button role', () => {
    renderNavWithDropdown();
    const trigger = screen.getByRole('button', { name: /sessions/i });
    expect(trigger).toBeInTheDocument();
  });

  // ─── Interaction ────────────────────────────────────────────────────────

  it('opens dropdown content on trigger click', async () => {
    const user = userEvent.setup();
    renderNavWithDropdown();
    const trigger = screen.getByRole('button', { name: /sessions/i });
    await user.click(trigger);
    expect(screen.getByText('Alle Sessions')).toBeInTheDocument();
    expect(screen.getByText('Letzte Sessions')).toBeInTheDocument();
  });

  // ─── Active State ─────────────────────────────────────────────────────

  it('applies active styling to active link', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/dashboard" active>
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const link = screen.getByText('Dashboard');
    expect(link.className).toContain('bg-[var(--color-nav-active-bg)]');
    expect(link.className).toContain('font-medium');
  });

  // ─── Token Classes ──────────────────────────────────────────────────────

  it('applies token-based classes to trigger', () => {
    renderNavWithDropdown();
    const trigger = screen.getByRole('button', { name: /sessions/i });
    expect(trigger.className).toContain('text-[var(--color-nav-text)]');
    expect(trigger.className).toContain('rounded-[var(--radius-nav)]');
  });

  it('applies token-based classes to links', () => {
    renderSimpleNav();
    const link = screen.getByText('Dashboard');
    expect(link.className).toContain('text-[var(--color-nav-text)]');
    expect(link.className).toContain('rounded-[var(--radius-nav)]');
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('supports custom className on root', () => {
    render(
      <NavigationMenu className="custom-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('custom-nav');
  });
});
