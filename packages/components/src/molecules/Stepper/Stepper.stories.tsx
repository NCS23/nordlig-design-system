import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, Settings, Dumbbell, ClipboardCheck } from 'lucide-react';
import { Stepper } from './Stepper';
import { Icon } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Stepper-Komponente zur Visualisierung von mehrstufigen Prozessen. Unterstuetzt horizontale und vertikale Ausrichtung, klickbare abgeschlossene Schritte und optionale Beschreibungen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  { label: 'Schritt 1' },
  { label: 'Schritt 2' },
  { label: 'Schritt 3' },
  { label: 'Schritt 4' },
];

export const HorizontalDefault: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export const VerticalDefault: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const WithDescriptions: Story = {
  args: {
    steps: [
      { label: 'Konto erstellen', description: 'E-Mail und Passwort' },
      { label: 'Profil einrichten', description: 'Name und Profilbild' },
      { label: 'Einstellungen', description: 'Benachrichtigungen und Sprache' },
      { label: 'Fertig', description: 'Zusammenfassung pruefen' },
    ],
    currentStep: 1,
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

const ClickableStepsRender = () => {
  const [current, setCurrent] = React.useState(2);

  return (
    <div className="max-w-xl">
      <Stepper
        steps={defaultSteps}
        currentStep={current}
        onStepClick={(step) => setCurrent(step)}
      />
      <p className="mt-4 text-sm text-[var(--color-text-muted)]">
        Aktueller Schritt: {current + 1}. Klicke auf einen abgeschlossenen
        Schritt, um dorthin zurueckzukehren.
      </p>
    </div>
  );
};

export const ClickableSteps: Story = {
  render: () => <ClickableStepsRender />,
};

export const TrainingOnboardingWizard: Story = {
  name: 'Training Analyzer: Onboarding Wizard',
  render: () => {
    const steps = [
      {
        label: 'Profil',
        description: 'Alter, Gewicht, Geschlecht',
        icon: <Icon icon={User} size="sm" />,
      },
      {
        label: 'Trainingsziel',
        description: '5K, 10K, Halbmarathon, Marathon',
        icon: <Icon icon={Dumbbell} size="sm" />,
      },
      {
        label: 'Einstellungen',
        description: 'HR-Zonen, Pace-Zonen',
        icon: <Icon icon={Settings} size="sm" />,
      },
      {
        label: 'Bestaetigung',
        description: 'Plan pruefen und starten',
        icon: <Icon icon={ClipboardCheck} size="sm" />,
      },
    ];

    return (
      <div className="max-w-2xl">
        <Heading level={3} className="text-lg font-semibold text-[var(--color-text-base)] mb-6">
          Training Analyzer Setup
        </Heading>
        <Stepper steps={steps} currentStep={1} />
        <div className="mt-8 rounded-lg border border-[var(--color-border-default)] p-6">
          <Heading level={4} className="font-medium text-[var(--color-text-base)] mb-2">
            Trainingsziel waehlen
          </Heading>
          <p className="text-sm text-[var(--color-text-muted)]">
            Waehle dein naechstes Wettkampfziel. Dein Trainingsplan wird basierend
            auf deinem Ziel, deiner aktuellen Fitness und deinem Zeitrahmen erstellt.
          </p>
        </div>
      </div>
    );
  },
};

