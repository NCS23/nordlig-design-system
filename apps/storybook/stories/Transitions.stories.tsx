import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
    {children}
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '28px' }}>
    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>{title}</h4>
    {children}
  </div>
);

const TokenTable = ({ headers, rows, color }: { headers: string[]; rows: Record<string, string>[]; color: string }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '8px' }}>
    <thead>
      <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
        {headers.map((h) => (
          <th key={h} style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
          {headers.map((h) => (
            <td key={h} style={{ padding: '8px 12px', fontFamily: h === 'Token' ? 'inherit' : 'monospace', fontWeight: h === 'Token' ? 600 : 400, color: h === 'CSS Variable' ? color : h === 'Token' ? '#0f172a' : h === 'References' ? '#94a3b8' : '#334155', fontSize: h === 'CSS Variable' || h === 'References' ? '12px' : '13px' }}>{row[h]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

// Interactive Demo Component
const TransitionDemo = ({ name, duration, easing }: { name: string; duration: string; easing: string }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <div style={{ width: '120px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>{name}</div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: '200px',
            height: '40px',
            backgroundColor: isHovered ? '#0ea5e9' : '#f1f5f9',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isHovered ? '#ffffff' : '#0f172a',
            fontWeight: 600,
            fontSize: '13px',
            transition: `all ${duration} ${easing}`,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          Hover me
        </div>
        <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#94a3b8' }}>
          {duration} {easing}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 1: BASE DURATIONS & EASINGS
   ═══════════════════════════════════════════════════════════════════════════ */

const baseDurations = [
  { Token: 'instant', 'CSS Variable': '--duration-base-instant', Value: '0ms', Description: 'No animation (instant change)' },
  { Token: 'fast', 'CSS Variable': '--duration-base-fast', Value: '100ms', Description: 'Very quick interactions' },
  { Token: 'normal', 'CSS Variable': '--duration-base-normal', Value: '200ms', Description: 'Standard UI transitions' },
  { Token: 'slow', 'CSS Variable': '--duration-base-slow', Value: '300ms', Description: 'Emphasized movements' },
  { Token: 'slower', 'CSS Variable': '--duration-base-slower', Value: '500ms', Description: 'Complex animations' },
];

const baseEasings = [
  { Token: 'linear', 'CSS Variable': '--easing-base-linear', Value: 'linear', Description: 'Constant speed' },
  { Token: 'ease', 'CSS Variable': '--easing-base-ease', Value: 'ease', Description: 'Default easing (slow start/end)' },
  { Token: 'ease-in', 'CSS Variable': '--easing-base-ease-in', Value: 'ease-in', Description: 'Accelerates (slow start)' },
  { Token: 'ease-out', 'CSS Variable': '--easing-base-ease-out', Value: 'ease-out', Description: 'Decelerates (slow end)' },
  { Token: 'ease-in-out', 'CSS Variable': '--easing-base-ease-in-out', Value: 'ease-in-out', Description: 'Smooth start and end' },
  { Token: 'spring', 'CSS Variable': '--easing-base-spring', Value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', Description: 'Spring-like bounce' },
  { Token: 'smooth', 'CSS Variable': '--easing-base-smooth', Value: 'cubic-bezier(0.4, 0, 0.2, 1)', Description: 'Smooth acceleration curve' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 2: GLOBAL TRANSITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const globalDurations = [
  { Token: 'fast', 'CSS Variable': '--duration-fast', References: 'var(--duration-base-fast)', Value: '100ms' },
  { Token: 'normal', 'CSS Variable': '--duration-normal', References: 'var(--duration-base-normal)', Value: '200ms' },
  { Token: 'slow', 'CSS Variable': '--duration-slow', References: 'var(--duration-base-slow)', Value: '300ms' },
];

const globalEasings = [
  { Token: 'default', 'CSS Variable': '--easing-default', References: 'var(--easing-base-smooth)', Value: 'cubic-bezier(...)' },
  { Token: 'spring', 'CSS Variable': '--easing-spring', References: 'var(--easing-base-spring)', Value: 'cubic-bezier(...)' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 3: ROLE TRANSITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const roleTransitions = [
  { Token: 'ui-fast', 'CSS Variable': '--transition-ui-fast', References: 'var(--duration-fast) var(--easing-default)', Value: '100ms cubic-bezier(...)' },
  { Token: 'ui-normal', 'CSS Variable': '--transition-ui-normal', References: 'var(--duration-normal) var(--easing-default)', Value: '200ms cubic-bezier(...)' },
  { Token: 'ui-slow', 'CSS Variable': '--transition-ui-slow', References: 'var(--duration-slow) var(--easing-default)', Value: '300ms cubic-bezier(...)' },
  { Token: 'ui-spring', 'CSS Variable': '--transition-ui-spring', References: 'var(--duration-normal) var(--easing-spring)', Value: '200ms cubic-bezier(...)' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 4: COMPONENT TRANSITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const componentTransitions = [
  // Button
  { Component: 'Button', Token: 'button-transition', 'CSS Variable': '--transition-button', References: 'var(--transition-ui-fast)', Chain: '\u2190 ui-fast \u2190 duration.fast + easing.default' },

  // Modal
  { Component: 'Modal', Token: 'modal-overlay', 'CSS Variable': '--transition-modal-overlay', References: 'var(--transition-ui-normal)', Chain: '\u2190 ui-normal \u2190 duration.normal + easing.default' },
  { Component: 'Modal', Token: 'modal-content', 'CSS Variable': '--transition-modal-content', References: 'var(--transition-ui-spring)', Chain: '\u2190 ui-spring \u2190 duration.normal + easing.spring' },

  // Accordion
  { Component: 'Accordion', Token: 'accordion-expand', 'CSS Variable': '--transition-accordion-expand', References: 'var(--transition-ui-normal)', Chain: '\u2190 ui-normal \u2190 duration.normal + easing.default' },

  // Dropdown
  { Component: 'Dropdown', Token: 'dropdown-open', 'CSS Variable': '--transition-dropdown-open', References: 'var(--transition-ui-fast)', Chain: '\u2190 ui-fast \u2190 duration.fast + easing.default' },

  // Tooltip
  { Component: 'Tooltip', Token: 'tooltip-fade', 'CSS Variable': '--transition-tooltip-fade', References: 'var(--transition-ui-fast)', Chain: '\u2190 ui-fast \u2190 duration.fast + easing.default' },

  // Toast
  { Component: 'Toast', Token: 'toast-slide', 'CSS Variable': '--transition-toast-slide', References: 'var(--transition-ui-normal)', Chain: '\u2190 ui-normal \u2190 duration.normal + easing.default' },

  // Tabs
  { Component: 'Tabs', Token: 'tabs-underline', 'CSS Variable': '--transition-tabs-underline', References: 'var(--transition-ui-normal)', Chain: '\u2190 ui-normal \u2190 duration.normal + easing.default' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function TransitionsPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1100px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Transition Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: L1 Base Durations & Easings &rarr; L2 Global &rarr; L3 Roles &rarr; L4 Components
      </p>

      {/* -- L1 ------------------------------------------------- */}
      <Section title="Level 1 — Base Durations">
        <TokenTable
          headers={['Token', 'CSS Variable', 'Value', 'Description']}
          rows={baseDurations}
          color="#0ea5e9"
        />
      </Section>

      <Section title="Level 1 — Base Easings">
        <TokenTable
          headers={['Token', 'CSS Variable', 'Value', 'Description']}
          rows={baseEasings}
          color="#0ea5e9"
        />
      </Section>

      {/* -- L2 ------------------------------------------------- */}
      <Section title="Level 2 — Global Durations">
        <TokenTable
          headers={['Token', 'CSS Variable', 'References', 'Value']}
          rows={globalDurations}
          color="#0ea5e9"
        />
      </Section>

      <Section title="Level 2 — Global Easings">
        <TokenTable
          headers={['Token', 'CSS Variable', 'References', 'Value']}
          rows={globalEasings}
          color="#0ea5e9"
        />
      </Section>

      {/* -- L3 ------------------------------------------------- */}
      <Section title="Level 3 — Role Transitions">
        <TokenTable
          headers={['Token', 'CSS Variable', 'References', 'Value']}
          rows={roleTransitions}
          color="#0ea5e9"
        />

        <SubSection title="Interactive Demos">
          <TransitionDemo name="Fast (100ms)" duration="100ms" easing="cubic-bezier(0.4, 0, 0.2, 1)" />
          <TransitionDemo name="Normal (200ms)" duration="200ms" easing="cubic-bezier(0.4, 0, 0.2, 1)" />
          <TransitionDemo name="Slow (300ms)" duration="300ms" easing="cubic-bezier(0.4, 0, 0.2, 1)" />
          <TransitionDemo name="Spring (200ms)" duration="200ms" easing="cubic-bezier(0.34, 1.56, 0.64, 1)" />
        </SubSection>
      </Section>

      {/* -- L4 ------------------------------------------------- */}
      <Section title="Level 4 — Component Transitions">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Component</th>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token</th>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSS Variable</th>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Chain</th>
            </tr>
          </thead>
          <tbody>
            {componentTransitions.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{row.Component}</td>
                <td style={{ padding: '8px 12px', color: '#334155' }}>{row.Token}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#0ea5e9', fontSize: '12px' }}>{row['CSS Variable']}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '11px' }}>{row.Chain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '4px', marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#0369a1' }}>Performance</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>
            <li>Use <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>transform</code> and <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>opacity</code> for GPU acceleration</li>
            <li>Avoid animating <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>width</code>, <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>height</code>, or layout properties (CPU intensive)</li>
            <li>Use <code style={{ backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>will-change</code> sparingly (only during animation)</li>
            <li>Prefer CSS animations over JavaScript when possible</li>
          </ul>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#92400e' }}>Duration Guidelines</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>
            <li><strong>Fast (100ms):</strong> Hover states, tooltips, dropdowns (immediate feedback)</li>
            <li><strong>Normal (200ms):</strong> Most UI transitions, modals, accordions (standard)</li>
            <li><strong>Slow (300ms):</strong> Complex animations, page transitions (emphasized)</li>
            <li><strong>Spring:</strong> Playful interactions, celebration moments (delightful)</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Transitions',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <TransitionsPage />,
};
