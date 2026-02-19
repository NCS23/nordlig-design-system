import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['flat', 'raised', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['compact', 'normal', 'spacious'],
    },
    hoverable: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Card component with compound pattern (Card, CardHeader, CardBody, CardFooter). Use `role="article"` or `role="region"` with `aria-labelledby` for accessible landmark navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Flat: Story = {
  args: {
    elevation: 'flat',
    padding: 'normal',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Flat Card</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '14px' }}>No border, no shadow – clean surface</p>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>Minimal card without border or shadow. Blends into the background for subtle grouping.</p>
      </CardBody>
    </Card>
  ),
};

export const Raised: Story = {
  args: {
    elevation: 'raised',
    padding: 'normal',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Raised Card</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '14px' }}>Low elevation shadow</p>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>Slight shadow to lift the card above the surface. Good for interactive elements.</p>
      </CardBody>
    </Card>
  ),
};

export const Elevated: Story = {
  args: {
    elevation: 'elevated',
    padding: 'normal',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Elevated Card</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '14px' }}>Medium elevation shadow</p>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>Pronounced shadow for prominent content. Use sparingly for key UI sections.</p>
      </CardBody>
    </Card>
  ),
};

export const AllElevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {(['flat', 'raised', 'elevated'] as const).map((elev) => (
        <Card key={elev} elevation={elev} style={{ width: '280px' }}>
          <CardHeader>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, textTransform: 'capitalize' }}>{elev}</h3>
          </CardHeader>
          <CardBody>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)' }}>elevation=&quot;{elev}&quot;</p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

export const AllPaddings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'start' }}>
      {(['compact', 'normal', 'spacious'] as const).map((pad) => (
        <Card key={pad} padding={pad} elevation="raised" style={{ width: '280px' }}>
          <CardHeader>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, textTransform: 'capitalize' }}>{pad}</h3>
          </CardHeader>
          <CardBody>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)' }}>padding=&quot;{pad}&quot;</p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card elevation="raised" padding="normal" style={{ maxWidth: '400px' }}>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Card with Actions</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '14px' }}>
          Compound component pattern with header, body, and footer.
        </p>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>
          The CardFooter provides a dedicated area for action buttons and secondary interactions.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">Save</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};

export const WorkoutSessionCard: Story = {
  name: 'Use Case: Workout Session',
  render: () => (
    <Card elevation="raised" padding="normal" role="article" aria-labelledby="workout-title" style={{ maxWidth: '400px' }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 id="workout-title" style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Krafttraining</h3>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>12. Feb 2026</span>
        </div>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '14px' }}>Oberkörper - Push</p>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>6</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Übungen</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>24</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Sätze</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>52min</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Dauer</div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">Details</Button>
        <Button size="sm" variant="ghost">Bearbeiten</Button>
      </CardFooter>
    </Card>
  ),
};

export const WeeklySummaryCard: Story = {
  name: 'Use Case: Weekly Summary',
  render: () => (
    <Card elevation="elevated" padding="spacious" role="region" aria-labelledby="weekly-title" style={{ maxWidth: '400px' }}>
      <CardHeader>
        <h3 id="weekly-title" style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Wochenübersicht</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '14px' }}>KW 7 · 10. - 16. Feb 2026</p>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-success-subtle)', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-success)' }}>4</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-success)' }}>Einheiten</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-info-subtle)', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-info)' }}>3:24h</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-info)' }}>Trainingszeit</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-warning-subtle)', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-warning)' }}>12.4t</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-warning)' }}>Volumen</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-surface)', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>96</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Gesamtsätze</div>
          </div>
        </div>
      </CardBody>
    </Card>
  ),
};

export const MetricDisplayCard: Story = {
  name: 'Use Case: Metric Display',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '600px' }}>
      <Card elevation="flat" padding="compact">
        <CardBody>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>1RM Bankdrücken</div>
          <div style={{ fontSize: '28px', fontWeight: 700 }}>95kg</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-success)' }}>+2.5kg</div>
        </CardBody>
      </Card>
      <Card elevation="flat" padding="compact">
        <CardBody>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>1RM Kniebeuge</div>
          <div style={{ fontSize: '28px', fontWeight: 700 }}>120kg</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-success)' }}>+5kg</div>
        </CardBody>
      </Card>
      <Card elevation="flat" padding="compact">
        <CardBody>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>1RM Kreuzheben</div>
          <div style={{ fontSize: '28px', fontWeight: 700 }}>140kg</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>±0kg</div>
        </CardBody>
      </Card>
    </div>
  ),
};

export const InteractiveCard: Story = {
  name: 'Interactive (Hoverable)',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Card elevation="raised" hoverable style={{ width: '280px' }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Hoverable Raised</h3>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Hover over this card to see the shadow transition.
          </p>
        </CardBody>
      </Card>
      <Card elevation="elevated" hoverable style={{ width: '280px' }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Hoverable Elevated</h3>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Elevated card with hover effect for clickable areas.
          </p>
        </CardBody>
      </Card>
      <Card elevation="flat" hoverable style={{ width: '280px' }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Hoverable Flat</h3>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Flat card that gains shadow on hover.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

export const CombinedVariants: Story = {
  name: 'Combined Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '900px' }}>
      {(['flat', 'raised', 'elevated'] as const).map((elev) =>
        (['compact', 'normal', 'spacious'] as const).map((pad) => (
          <Card key={`${elev}-${pad}`} elevation={elev} padding={pad}>
            <CardHeader>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{elev} / {pad}</h3>
            </CardHeader>
            <CardBody>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-muted)' }}>
                elevation=&quot;{elev}&quot; padding=&quot;{pad}&quot;
              </p>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  ),
};
