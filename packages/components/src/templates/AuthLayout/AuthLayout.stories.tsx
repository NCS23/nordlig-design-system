import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AuthLayout } from './AuthLayout';

const meta: Meta<typeof AuthLayout> = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-10 w-10 rounded-lg bg-[var(--color-bg-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] font-bold text-lg">
      N
    </div>
    <span className="text-xl font-bold text-[var(--color-text-base)]">Nordlig</span>
  </div>
);

const FormField = ({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-[var(--color-text-base)] mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-md border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] text-[var(--color-text-base)] text-sm"
    />
  </div>
);

const SubmitButton = ({ children }: { children: React.ReactNode }) => (
  <button className="w-full py-2 px-4 rounded-md bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)] font-medium text-sm hover:opacity-90">
    {children}
  </button>
);

const FooterLinks = ({ links }: { links: { label: string; href: string }[] }) => (
  <div className="flex items-center justify-center gap-4 text-sm">
    {links.map(({ label, href }) => (
      <a key={label} href={href} className="text-[var(--color-auth-footer-link)] hover:underline">
        {label}
      </a>
    ))}
  </div>
);

/* ─── Stories ──────────────────────────────────────────────────────────────── */

export const Login: Story = {
  render: () => (
    <AuthLayout
      logo={<Logo />}
      footer={
        <FooterLinks
          links={[
            { label: 'Registrieren', href: '/register' },
            { label: 'Passwort vergessen?', href: '/forgot' },
          ]}
        />
      }
    >
      <h2 className="text-xl font-bold text-[var(--color-text-base)] mb-6">Anmelden</h2>
      <FormField label="E-Mail" type="email" placeholder="name@example.com" />
      <FormField label="Passwort" type="password" placeholder="Passwort eingeben" />
      <SubmitButton>Anmelden</SubmitButton>
    </AuthLayout>
  ),
};

export const Register: Story = {
  render: () => (
    <AuthLayout
      logo={<Logo />}
      footer={
        <FooterLinks links={[{ label: 'Bereits registriert? Anmelden', href: '/login' }]} />
      }
    >
      <h2 className="text-xl font-bold text-[var(--color-text-base)] mb-6">Konto erstellen</h2>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Vorname" placeholder="Max" />
        <FormField label="Nachname" placeholder="Mustermann" />
      </div>
      <FormField label="E-Mail" type="email" placeholder="name@example.com" />
      <FormField label="Passwort" type="password" placeholder="Min. 8 Zeichen" />
      <FormField label="Passwort bestaetigen" type="password" placeholder="Passwort wiederholen" />
      <SubmitButton>Registrieren</SubmitButton>
    </AuthLayout>
  ),
};

export const ForgotPassword: Story = {
  render: () => (
    <AuthLayout
      logo={<Logo />}
      footer={
        <FooterLinks links={[{ label: 'Zurueck zur Anmeldung', href: '/login' }]} />
      }
    >
      <h2 className="text-xl font-bold text-[var(--color-text-base)] mb-2">Passwort zuruecksetzen</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zuruecksetzen.
      </p>
      <FormField label="E-Mail" type="email" placeholder="name@example.com" />
      <SubmitButton>Link senden</SubmitButton>
    </AuthLayout>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <AuthLayout
      logo={<Logo />}
      background={
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-base) 100%)',
            opacity: 0.05,
          }}
        />
      }
      footer={
        <FooterLinks
          links={[
            { label: 'Registrieren', href: '/register' },
            { label: 'Passwort vergessen?', href: '/forgot' },
          ]}
        />
      }
    >
      <h2 className="text-xl font-bold text-[var(--color-text-base)] mb-6">Anmelden</h2>
      <FormField label="E-Mail" type="email" placeholder="name@example.com" />
      <FormField label="Passwort" type="password" placeholder="Passwort eingeben" />
      <SubmitButton>Anmelden</SubmitButton>
    </AuthLayout>
  ),
};

export const MobileView: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <AuthLayout
      logo={<Logo />}
      footer={
        <FooterLinks
          links={[
            { label: 'Registrieren', href: '/register' },
            { label: 'Passwort vergessen?', href: '/forgot' },
          ]}
        />
      }
    >
      <h2 className="text-xl font-bold text-[var(--color-text-base)] mb-6">Anmelden</h2>
      <FormField label="E-Mail" type="email" placeholder="name@example.com" />
      <FormField label="Passwort" type="password" placeholder="Passwort eingeben" />
      <SubmitButton>Anmelden</SubmitButton>
    </AuthLayout>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <AuthLayout
      logo={
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-2xl bg-[var(--color-bg-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] font-bold text-2xl">
            N
          </div>
          <span className="text-2xl font-bold text-[var(--color-text-base)]">Nordlig</span>
          <span className="text-sm text-[var(--color-text-muted)]">Training Analyzer</span>
        </div>
      }
    >
      <h2 className="text-xl font-bold text-[var(--color-text-base)] mb-6">Willkommen zurueck</h2>
      <FormField label="E-Mail" type="email" placeholder="name@example.com" />
      <FormField label="Passwort" type="password" placeholder="Passwort eingeben" />
      <SubmitButton>Anmelden</SubmitButton>
    </AuthLayout>
  ),
};
