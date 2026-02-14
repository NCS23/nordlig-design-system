import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
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

// Interactive Z-Index Demo
const ZIndexDemo = () => {
  const layers = [
    { name: 'Base Content', zIndex: 0, color: '#f1f5f9', textColor: '#334155' },
    { name: 'Dropdown (10)', zIndex: 10, color: '#dbeafe', textColor: '#1e40af' },
    { name: 'Sticky Header (20)', zIndex: 20, color: '#bae6fd', textColor: '#075985' },
    { name: 'Modal Overlay (50)', zIndex: 50, color: '#7dd3fc', textColor: '#0c4a6e' },
    { name: 'Modal Content (51)', zIndex: 51, color: '#38bdf8', textColor: '#ffffff' },
    { name: 'Toast (100)', zIndex: 100, color: '#0ea5e9', textColor: '#ffffff' },
  ];

  return (
    <div style={{ position: 'relative', height: '300px', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', overflow: 'hidden' }}>
      {layers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${i * 40 + 20}px`,
            top: `${i * 30 + 20}px`,
            width: '180px',
            height: '60px',
            backgroundColor: layer.color,
            color: layer.textColor,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '13px',
            zIndex: layer.zIndex,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          {layer.name}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 1: BASE Z-INDEX VALUES
   ═══════════════════════════════════════════════════════════════════════════ */

const baseZIndex = [
  { Token: 'base', 'CSS Variable': '--z-base-base', Value: '0', Description: 'Default layer (document flow)' },
  { Token: 'dropdown', 'CSS Variable': '--z-base-dropdown', Value: '10', Description: 'Dropdowns, popovers' },
  { Token: 'sticky', 'CSS Variable': '--z-base-sticky', Value: '20', Description: 'Sticky headers, footers' },
  { Token: 'overlay', 'CSS Variable': '--z-base-overlay', Value: '50', Description: 'Modal overlays, backdrops' },
  { Token: 'modal', 'CSS Variable': '--z-base-modal', Value: '51', Description: 'Modal content (above overlay)' },
  { Token: 'toast', 'CSS Variable': '--z-base-toast', Value: '100', Description: 'Notifications, toasts' },
  { Token: 'tooltip', 'CSS Variable': '--z-base-tooltip', Value: '150', Description: 'Tooltips (highest priority)' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 2: GLOBAL Z-INDEX
   ═══════════════════════════════════════════════════════════════════════════ */

const globalZIndex = [
  { Token: 'dropdown', 'CSS Variable': '--z-dropdown', References: 'var(--z-base-dropdown)', Value: '10' },
  { Token: 'sticky', 'CSS Variable': '--z-sticky', References: 'var(--z-base-sticky)', Value: '20' },
  { Token: 'overlay', 'CSS Variable': '--z-overlay', References: 'var(--z-base-overlay)', Value: '50' },
  { Token: 'modal', 'CSS Variable': '--z-modal', References: 'var(--z-base-modal)', Value: '51' },
  { Token: 'toast', 'CSS Variable': '--z-toast', References: 'var(--z-base-toast)', Value: '100' },
  { Token: 'tooltip', 'CSS Variable': '--z-tooltip', References: 'var(--z-base-tooltip)', Value: '150' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 3: ROLE Z-INDEX
   ═══════════════════════════════════════════════════════════════════════════ */

const roleZIndex = [
  { Token: 'layer-base', 'CSS Variable': '--z-layer-base', References: 'var(--z-base-base)', Value: '0', Use: 'Normal document flow' },
  { Token: 'layer-elevated', 'CSS Variable': '--z-layer-elevated', References: 'var(--z-dropdown)', Value: '10', Use: 'Elevated UI elements' },
  { Token: 'layer-sticky', 'CSS Variable': '--z-layer-sticky', References: 'var(--z-sticky)', Value: '20', Use: 'Sticky positioning' },
  { Token: 'layer-overlay', 'CSS Variable': '--z-layer-overlay', References: 'var(--z-overlay)', Value: '50', Use: 'Backdrops, overlays' },
  { Token: 'layer-dialog', 'CSS Variable': '--z-layer-dialog', References: 'var(--z-modal)', Value: '51', Use: 'Dialogs, modals' },
  { Token: 'layer-notification', 'CSS Variable': '--z-layer-notification', References: 'var(--z-toast)', Value: '100', Use: 'Toasts, alerts' },
  { Token: 'layer-tooltip', 'CSS Variable': '--z-layer-tooltip', References: 'var(--z-tooltip)', Value: '150', Use: 'Tooltips (always on top)' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 4: COMPONENT Z-INDEX
   ═══════════════════════════════════════════════════════════════════════════ */

const componentZIndex = [
  // Dropdown
  { Component: 'Dropdown', Token: 'dropdown-menu', 'CSS Variable': '--z-dropdown-menu', References: 'var(--z-layer-elevated)', Chain: '\u2190 layer-elevated \u2190 dropdown \u2190 base.dropdown (10)' },

  // Select
  { Component: 'Select', Token: 'select-popover', 'CSS Variable': '--z-select-popover', References: 'var(--z-layer-elevated)', Chain: '\u2190 layer-elevated \u2190 dropdown \u2190 base.dropdown (10)' },

  // DatePicker
  { Component: 'DatePicker', Token: 'datepicker-popover', 'CSS Variable': '--z-datepicker-popover', References: 'var(--z-layer-elevated)', Chain: '\u2190 layer-elevated \u2190 dropdown \u2190 base.dropdown (10)' },

  // Modal
  { Component: 'Modal', Token: 'modal-overlay', 'CSS Variable': '--z-modal-overlay', References: 'var(--z-layer-overlay)', Chain: '\u2190 layer-overlay \u2190 overlay \u2190 base.overlay (50)' },
  { Component: 'Modal', Token: 'modal-content', 'CSS Variable': '--z-modal-content', References: 'var(--z-layer-dialog)', Chain: '\u2190 layer-dialog \u2190 modal \u2190 base.modal (51)' },

  // Toast
  { Component: 'Toast', Token: 'toast-viewport', 'CSS Variable': '--z-toast-viewport', References: 'var(--z-layer-notification)', Chain: '\u2190 layer-notification \u2190 toast \u2190 base.toast (100)' },

  // Tooltip
  { Component: 'Tooltip', Token: 'tooltip-content', 'CSS Variable': '--z-tooltip-content', References: 'var(--z-layer-tooltip)', Chain: '\u2190 layer-tooltip \u2190 tooltip \u2190 base.tooltip (150)' },

  // Table (sticky header)
  { Component: 'Table', Token: 'table-header-sticky', 'CSS Variable': '--z-table-header-sticky', References: 'var(--z-layer-sticky)', Chain: '\u2190 layer-sticky \u2190 sticky \u2190 base.sticky (20)' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function ZIndexPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1100px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Z-Index Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: L1 Base &rarr; L2 Global &rarr; L3 Roles &rarr; L4 Components
      </p>

      {/* Interactive Demo */}
      <Section title="Interactive Stacking Demo">
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
          Hover and drag the visualization below to see how z-index layers stack.
        </p>
        <ZIndexDemo />
      </Section>

      {/* ── L1 ───────────────────────────────────────────── */}
      <Section title="Level 1 \u2014 Base Z-Index Values">
        <TokenTable
          headers={['Token', 'CSS Variable', 'Value', 'Description']}
          rows={baseZIndex}
          color="#0ea5e9"
        />
      </Section>

      {/* ── L2 ───────────────────────────────────────────── */}
      <Section title="Level 2 \u2014 Global Z-Index">
        <TokenTable
          headers={['Token', 'CSS Variable', 'References', 'Value']}
          rows={globalZIndex}
          color="#0ea5e9"
        />
      </Section>

      {/* ── L3 ───────────────────────────────────────────── */}
      <Section title="Level 3 \u2014 Role Z-Index">
        <TokenTable
          headers={['Token', 'CSS Variable', 'References', 'Value', 'Use']}
          rows={roleZIndex}
          color="#0ea5e9"
        />
      </Section>

      {/* ── L4 ───────────────────────────────────────────── */}
      <Section title="Level 4 \u2014 Component Z-Index">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Component</th>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token</th>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSS Variable</th>
              <th style={{ padding: '6px 12px', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: '300px' }}>Chain</th>
            </tr>
          </thead>
          <tbody>
            {componentZIndex.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{row.Component}</td>
                <td style={{ padding: '8px 12px', color: '#334155' }}>{row.Token}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#0ea5e9', fontSize: '12px' }}>{row['CSS Variable']}</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#94a3b8', fontSize: '10px' }}>{row.Chain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '4px', marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#0369a1' }}>Z-Index Guidelines</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>
            <li><strong>Use semantic layers:</strong> Always reference Layer 3 role tokens, not raw numbers</li>
            <li><strong>Avoid arbitrary values:</strong> Don't use z-index: 999 or z-index: 9999</li>
            <li><strong>Maintain hierarchy:</strong> Tooltips &gt; Toasts &gt; Modals &gt; Dropdowns &gt; Base</li>
            <li><strong>Keep gaps between layers:</strong> 10-unit increments allow for insertion if needed</li>
          </ul>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#92400e' }}>Stacking Order (Low to High)</h4>
          <ol style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 1.8 }}>
            <li><strong>0:</strong> Base content (normal document flow)</li>
            <li><strong>10:</strong> Dropdowns, Select popovers, DatePicker calendars</li>
            <li><strong>20:</strong> Sticky headers, fixed navigation</li>
            <li><strong>50:</strong> Modal overlays, backdrops</li>
            <li><strong>51:</strong> Modal content (always above overlay)</li>
            <li><strong>100:</strong> Toast notifications</li>
            <li><strong>150:</strong> Tooltips (highest, always visible)</li>
          </ol>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#fee2e2', borderLeft: '4px solid #ef4444', borderRadius: '4px', marginTop: '16px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#991b1b' }}>Common Pitfalls</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>
            <li><strong>DO NOT</strong> use hardcoded numbers in components (e.g., <code style={{ backgroundColor: '#fecaca', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>z-index: 100</code>)</li>
            <li><strong>DO NOT</strong> skip Layer 3 role tokens (always use semantic references)</li>
            <li><strong>DO NOT</strong> create new z-index values without updating token files</li>
            <li><strong>DO NOT</strong> use negative z-index values (creates unpredictable stacking)</li>
          </ul>
        </div>
      </Section>

      {/* Usage Examples */}
      <Section title="Usage in Components">
        <div style={{ padding: '16px', backgroundColor: '#ecfdf5', borderLeft: '4px solid #10b981', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#065f46' }}>Correct Usage</h4>
          <pre style={{ margin: '8px 0 0', padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: '#0f172a', overflow: 'auto' }}>
{`// CORRECT - Using semantic token
className="z-[var(--z-modal-overlay)]"

// CORRECT - Using Tailwind utility with token
<div className="fixed inset-0" style={{ zIndex: 'var(--z-modal-overlay)' }}>

// CORRECT - In CSS file
.modal-overlay {
  z-index: var(--z-modal-overlay);
}`}
          </pre>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '4px', marginTop: '12px' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#991b1b' }}>Incorrect Usage</h4>
          <pre style={{ margin: '8px 0 0', padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: '#0f172a', overflow: 'auto' }}>
{`// WRONG - Hardcoded z-index
className="z-50"

// WRONG - Magic number
<div style={{ zIndex: 999 }}>

// WRONG - Direct base token (skip Layer 3)
z-index: var(--z-base-overlay);`}
          </pre>
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Z-Index',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <ZIndexPage />,
};
