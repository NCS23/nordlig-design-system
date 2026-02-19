import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Icon } from '../../atoms/Icon';

const meta: Meta = {
  title: 'Molecules/Breadcrumbs',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard',
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/produkte">Produkte</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Laufschuhe</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

// ─── Custom Separator ───────────────────────────────────────────────────────

export const CustomSeparator: Story = {
  name: 'Benutzerdefinierter Trenner',
  render: () => (
    <Breadcrumbs separator={<Icon icon={ChevronRight} size={14} />}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/einstellungen">Einstellungen</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Profil</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

// ─── Many Levels ────────────────────────────────────────────────────────────

export const ManyLevels: Story = {
  name: 'Viele Ebenen',
  render: () => (
    <Breadcrumbs separator={<Icon icon={ChevronRight} size={14} />}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/training">Training</BreadcrumbItem>
      <BreadcrumbItem href="/training/2026">2026</BreadcrumbItem>
      <BreadcrumbItem href="/training/2026/februar">Februar</BreadcrumbItem>
      <BreadcrumbItem href="/training/2026/februar/kw07">KW 07</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Longrun 13.02.2026</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

// ─── Training: Navigation Path ──────────────────────────────────────────────

export const TrainingNavigationPath: Story = {
  name: 'Use Case: Trainingspfad',
  render: () => (
    <Breadcrumbs separator={<Icon icon={ChevronRight} size={14} />}>
      <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
      <BreadcrumbItem href="/historie">Trainingshistorie</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Lauf 12.01.2025</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

// ─── With Icons ─────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Mit Icons',
  render: () => (
    <Breadcrumbs separator={<Icon icon={ChevronRight} size={14} />}>
      <BreadcrumbItem href="/">
        <span className="flex items-center gap-1.5">
          <Icon icon={Home} size={14} />
          Home
        </span>
      </BreadcrumbItem>
      <BreadcrumbItem href="/training">Training</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Intervalle 10.02.2026</BreadcrumbItem>
    </Breadcrumbs>
  ),
};
