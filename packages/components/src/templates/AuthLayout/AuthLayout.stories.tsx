import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AuthLayout } from './AuthLayout';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { Link } from '../../atoms/Link';
import { InputField } from '../../molecules/InputField';
import { PasswordInput } from '../../molecules/PasswordInput';
import { CheckboxField } from '../../molecules/CheckboxField';
import { Label } from '../../atoms/Label';
import { Separator } from '../../atoms/Separator';

const meta: Meta<typeof AuthLayout> = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

/* ─── Reusable Logo (inside card) ──────────────────────────────────────────── */

const CardLogo = () => (
  <div className="mb-6 flex items-center gap-3">
    <img src="/bildmarke.svg" alt="" className="h-8 w-auto" />
    <Text variant="body" as="span" className="text-xl font-bold">
      Nordlig Design System
    </Text>
  </div>
);

/* ─── Footer Links ─────────────────────────────────────────────────────────── */

const FooterLinks = ({ links }: { links: { label: string; href: string }[] }) => (
  <div className="flex items-center justify-center gap-4">
    {links.map(({ label, href }) => (
      <Link key={label} href={href}>
        {label}
      </Link>
    ))}
  </div>
);

/* ─── Stories ──────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <AuthLayout
      footer={
        <FooterLinks
          links={[
            { label: 'Registrieren', href: '/register' },
            { label: 'Passwort vergessen?', href: '/forgot' },
          ]}
        />
      }
    >
      <CardLogo />
      <Heading level={2} className="mb-6">
        Anmelden
      </Heading>
      <div className="space-y-4">
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <div>
          <Label className="mb-1">Passwort</Label>
          <PasswordInput placeholder="Passwort eingeben" />
        </div>
        <CheckboxField label="Angemeldet bleiben" />
        <Button className="w-full">Anmelden</Button>
      </div>
    </AuthLayout>
  ),
};

export const Login: Story = {
  render: () => (
    <AuthLayout
      footer={
        <FooterLinks
          links={[
            { label: 'Registrieren', href: '/register' },
            { label: 'Passwort vergessen?', href: '/forgot' },
          ]}
        />
      }
    >
      <CardLogo />
      <Heading level={2} className="mb-6">
        Anmelden
      </Heading>
      <div className="space-y-4">
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <div>
          <Label className="mb-1">Passwort</Label>
          <PasswordInput placeholder="Passwort eingeben" />
        </div>
        <CheckboxField label="Angemeldet bleiben" />
        <Button className="w-full">Anmelden</Button>
      </div>
    </AuthLayout>
  ),
};

export const Register: Story = {
  render: () => (
    <AuthLayout
      footer={
        <FooterLinks links={[{ label: 'Bereits registriert? Anmelden', href: '/login' }]} />
      }
    >
      <CardLogo />
      <Heading level={2} className="mb-6">
        Konto erstellen
      </Heading>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Vorname" placeholder="Max" />
          <InputField label="Nachname" placeholder="Mustermann" />
        </div>
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <div>
          <Label className="mb-1">Passwort</Label>
          <PasswordInput placeholder="Min. 8 Zeichen" />
        </div>
        <div>
          <Label className="mb-1">Passwort bestaetigen</Label>
          <PasswordInput placeholder="Passwort wiederholen" />
        </div>
        <Button className="w-full">Registrieren</Button>
      </div>
    </AuthLayout>
  ),
};

export const ForgotPassword: Story = {
  render: () => (
    <AuthLayout
      footer={
        <FooterLinks links={[{ label: 'Zurueck zur Anmeldung', href: '/login' }]} />
      }
    >
      <CardLogo />
      <Heading level={2} className="mb-2">
        Passwort zuruecksetzen
      </Heading>
      <Text variant="muted" className="mb-6">
        Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zuruecksetzen.
      </Text>
      <div className="space-y-4">
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <Button className="w-full">Link senden</Button>
      </div>
    </AuthLayout>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <AuthLayout
      background={
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-base) 100%)',
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
      <CardLogo />
      <Heading level={2} className="mb-6">
        Anmelden
      </Heading>
      <div className="space-y-4">
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <div>
          <Label className="mb-1">Passwort</Label>
          <PasswordInput placeholder="Passwort eingeben" />
        </div>
        <Button className="w-full">Anmelden</Button>
      </div>
    </AuthLayout>
  ),
};

export const MobileView: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <AuthLayout
      footer={
        <FooterLinks
          links={[
            { label: 'Registrieren', href: '/register' },
            { label: 'Passwort vergessen?', href: '/forgot' },
          ]}
        />
      }
    >
      <CardLogo />
      <Heading level={2} className="mb-6">
        Anmelden
      </Heading>
      <div className="space-y-4">
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <div>
          <Label className="mb-1">Passwort</Label>
          <PasswordInput placeholder="Passwort eingeben" />
        </div>
        <Button className="w-full">Anmelden</Button>
      </div>
    </AuthLayout>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <AuthLayout
      logo={
        <div className="flex items-center gap-3">
          <img src="/bildmarke.svg" alt="" className="h-10 w-auto" />
          <Heading level={3}>Nordlig Design System</Heading>
        </div>
      }
    >
      <Heading level={2} className="mb-6">
        Willkommen zurueck
      </Heading>
      <div className="space-y-4">
        <InputField label="E-Mail" type="email" placeholder="name@example.com" />
        <div>
          <Label className="mb-1">Passwort</Label>
          <PasswordInput placeholder="Passwort eingeben" />
        </div>
        <Button className="w-full">Anmelden</Button>
      </div>
      <Separator className="my-4" />
      <Text variant="muted" className="text-center">
        Oder weiter mit
      </Text>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Button variant="secondary" className="w-full">Google</Button>
        <Button variant="secondary" className="w-full">Apple</Button>
      </div>
    </AuthLayout>
  ),
};
