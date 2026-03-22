import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

/* ═══════════════════════════════════════════════════════════════════════════
   HELPER COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
    {children}
  </div>
);

const LetterLogo = ({ letter, color }: { letter: string; color: string }) => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 700,
      fontSize: 16,
      flexShrink: 0,
    }}
  >
    {letter}
  </div>
);

const TechCard = ({ name, version, description, color, logo }: {
  name: string;
  version: string;
  description: string;
  color: string;
  logo: React.ReactNode;
}) => (
  <div
    style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#ffffff',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    }}
  >
    {logo}
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{name}</span>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: `${color}18`,
            color: color,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          v{version}
        </span>
      </div>
      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{description}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE SVG LOGOS
   ═══════════════════════════════════════════════════════════════════════════ */

const ReactLogo = () => (
  <svg width="40" height="40" viewBox="-11.5 -10.232 23 20.463" style={{ flexShrink: 0 }}>
    <circle r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TypeScriptLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#3178C6" />
    <path d="M22.5 33V27.2L25.8 27.2V24H15.5V27.2H18.8V33H22.5Z" fill="white" />
    <path d="M26 33V30.5C26 29.1 27 28.2 28.5 28.2C29.3 28.2 29.9 28.4 30.3 28.8L31.5 26.5C30.8 26 29.7 25.6 28.5 25.6C25.8 25.6 24 27.3 24 30V33H26Z" fill="white" />
  </svg>
);

const TailwindLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#0F172A" />
    <path d="M13.3 16.7C14.7 12.2 17.8 10 22.7 10C30 10 30.8 15.5 34.4 16.5C36.9 17.2 39 16.2 40.7 13.5C39.3 18 36.2 20.2 31.3 20.2C24 20.2 23.2 14.7 19.6 13.7C17.1 13 15 14 13.3 16.7ZM5.3 26.7C6.7 22.2 9.8 20 14.7 20C22 20 22.8 25.5 26.4 26.5C28.9 27.2 31 26.2 32.7 23.5C31.3 28 28.2 30.2 23.3 30.2C16 30.2 15.2 24.7 11.6 23.7C9.1 23 7 24 5.3 26.7Z" fill="#38BDF8" transform="scale(0.65) translate(6, 8)" />
  </svg>
);

const ViteLogo = () => (
  <svg width="40" height="40" viewBox="0 0 410 404" style={{ flexShrink: 0 }}>
    <path d="M399.641 59.525L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.552 59.525C6.32 52.098 13.169 43.349 21.373 45.558L204.686 93.849C206.192 94.253 207.776 94.238 209.274 93.807L388.545 45.572C396.696 43.283 403.63 51.919 399.641 59.525Z" fill="#41D1FF" />
    <path d="M292.965 1.474L156.801 28.717C153.602 29.346 151.262 32.09 151.083 35.348L142.148 196.49C141.889 201.252 146.398 204.882 150.982 203.694L190.075 193.632C195.213 192.308 199.932 196.848 198.483 201.96L186.108 247.525C184.596 253.024 189.967 257.711 195.176 255.773L224.58 245.254C229.811 243.308 235.2 248.035 233.622 253.56L211.992 330.78C209.816 338.553 220.35 343.145 224.72 336.389L227.405 332.189L335.821 117.189C338.489 111.82 333.447 105.905 327.722 107.573L287.408 119.378C282.083 121.02 277.34 116.103 279.326 110.896L306.403 40.452C308.397 35.225 303.604 30.292 298.266 31.988L292.965 1.474Z" fill="#FFDD35" />
  </svg>
);

const StorybookLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#FF4785" />
    <path d="M27 8.5L26.5 13.5L28.5 13.3L29 8L27 8.5ZM20 12C22.8 12 25.5 13.5 25.5 17C25.5 20 23.5 21.5 21 22.5L25 28H22L18.5 23H17V28H14V12H20ZM19.5 14.5H17V20.5H19.5C21.5 20.5 22.5 19.5 22.5 17.5C22.5 15.5 21.5 14.5 19.5 14.5Z" fill="white" />
  </svg>
);

const RadixLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#111111" />
    <path d="M20 10V20H14C14 16.5 16.5 14 20 14V10C14.5 10 10 14.5 10 20C10 25.5 14.5 30 20 30V26C16.5 26 14 23.5 14 20H20V30H24V10H20Z" fill="white" />
    <circle cx="27" cy="13" r="3" fill="white" />
  </svg>
);

const VitestLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#1B1B1F" />
    <path d="M28.5 11L20 28L11.5 11H15L20 21L25 11H28.5Z" fill="#FCC72B" />
    <path d="M11 11L20 28L29 11H25.5L20 21.5L14.5 11H11Z" fill="#6E9F18" opacity="0.8" />
  </svg>
);

const PnpmLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#F9AD00" />
    <rect x="6" y="6" width="8" height="8" rx="1" fill="#4E4E4E" />
    <rect x="16" y="6" width="8" height="8" rx="1" fill="#4E4E4E" />
    <rect x="26" y="6" width="8" height="8" rx="1" fill="#F9AD00" stroke="#4E4E4E" strokeWidth="1.5" />
    <rect x="6" y="16" width="8" height="8" rx="1" fill="#4E4E4E" />
    <rect x="16" y="16" width="8" height="8" rx="1" fill="#4E4E4E" />
    <rect x="26" y="16" width="8" height="8" rx="1" fill="#4E4E4E" />
    <rect x="16" y="26" width="8" height="8" rx="1" fill="#4E4E4E" />
    <rect x="26" y="26" width="8" height="8" rx="1" fill="#4E4E4E" />
  </svg>
);

const TurboLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
    <rect width="40" height="40" rx="4" fill="#0F0F0F" />
    <circle cx="20" cy="20" r="10" fill="none" stroke="#FF1E56" strokeWidth="2.5" />
    <circle cx="20" cy="20" r="5" fill="none" stroke="#0096FF" strokeWidth="2.5" />
    <circle cx="20" cy="20" r="1.5" fill="#FF1E56" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   TECH STACK DATA
   ═══════════════════════════════════════════════════════════════════════════ */

type TechItem = {
  name: string;
  version: string;
  description: string;
  color: string;
  logo: React.ReactNode;
};

type Category = {
  title: string;
  items: TechItem[];
};

const categories: Category[] = [
  {
    title: 'Core',
    items: [
      { name: 'React', version: '18.3', description: 'Deklarative UI-Bibliothek f\u00FCr komponentenbasierte Entwicklung', color: '#61DAFB', logo: <ReactLogo /> },
      { name: 'TypeScript', version: '5.9', description: 'Statisch typisierte Obermenge von JavaScript', color: '#3178C6', logo: <TypeScriptLogo /> },
    ],
  },
  {
    title: 'Styling',
    items: [
      { name: 'Tailwind CSS', version: '3.4', description: 'Utility-first CSS Framework f\u00FCr schnelle UI-Entwicklung', color: '#06B6D4', logo: <TailwindLogo /> },
      { name: 'PostCSS', version: '8.5', description: 'CSS-Transformations-Pipeline mit Plugin-System', color: '#DD3A0A', logo: <LetterLogo letter="P" color="#DD3A0A" /> },
      { name: 'Autoprefixer', version: '10.4', description: 'Automatische Vendor-Pr\u00E4fixe f\u00FCr Browser-Kompatibilit\u00E4t', color: '#DD3735', logo: <LetterLogo letter="A" color="#DD3735" /> },
    ],
  },
  {
    title: 'UI Primitives',
    items: [
      {
        name: 'Radix UI',
        version: '1.x\u20132.x',
        description: '11 Packages: Accordion, Checkbox, Dialog, Dropdown Menu, Popover, Progress, Radio Group, Switch, Tabs, Toast, Tooltip',
        color: '#111111',
        logo: <RadixLogo />,
      },
    ],
  },
  {
    title: 'Variant Management',
    items: [
      { name: 'CVA', version: '0.7', description: 'Class Variance Authority \u2014 typsichere Varianten-Definition', color: '#7C3AED', logo: <LetterLogo letter="C" color="#7C3AED" /> },
      { name: 'tailwind-merge', version: '2.6', description: 'Intelligentes Merging von Tailwind-Klassen ohne Konflikte', color: '#0EA5E9', logo: <LetterLogo letter="tw" color="#0EA5E9" /> },
      { name: 'clsx', version: '2.1', description: 'Leichtgewichtiger Utility f\u00FCr bedingte className-Strings', color: '#4B5563', logo: <LetterLogo letter="cx" color="#4B5563" /> },
    ],
  },
  {
    title: 'Build & Bundling',
    items: [
      { name: 'Vite', version: '5.4', description: 'Blitzschneller Dev-Server und Build-Tool mit HMR', color: '#646CFF', logo: <ViteLogo /> },
      { name: 'tsup', version: '8.5', description: 'Zero-Config TypeScript Bundler powered by esbuild', color: '#FBBF24', logo: <LetterLogo letter="ts" color="#B45309" /> },
      { name: 'Turborepo', version: '2.8', description: 'Monorepo-Build-System mit intelligentem Caching', color: '#FF1E56', logo: <TurboLogo /> },
    ],
  },
  {
    title: 'Token System',
    items: [
      { name: 'Style Dictionary', version: '4.4', description: 'Design-Token-Pipeline \u2014 generiert CSS, Tailwind Config, TypeScript & JSON', color: '#66D36E', logo: <LetterLogo letter="SD" color="#66D36E" /> },
    ],
  },
  {
    title: 'Testing',
    items: [
      { name: 'Vitest', version: '1.6', description: 'Schnelles Unit-Testing-Framework mit Vite-Integration', color: '#6E9F18', logo: <VitestLogo /> },
      { name: 'Playwright', version: '1.58', description: 'Visual Regression Testing gegen Storybook-Stories', color: '#2EAD33', logo: <LetterLogo letter="Pw" color="#2EAD33" /> },
      { name: 'Testing Library', version: '16.3', description: 'User-zentriertes Testen von React-Komponenten', color: '#E33332', logo: <LetterLogo letter="TL" color="#E33332" /> },
      { name: 'jsdom', version: '28.0', description: 'Browser-Umgebungs-Simulation f\u00FCr Node.js-Tests', color: '#1E88E5', logo: <LetterLogo letter="JS" color="#1E88E5" /> },
    ],
  },
  {
    title: 'Dokumentation',
    items: [
      { name: 'Storybook', version: '8.6', description: 'Interaktive Komponenten-Dokumentation und Playground', color: '#FF4785', logo: <StorybookLogo /> },
    ],
  },
  {
    title: 'Package Management & Utilities',
    items: [
      { name: 'pnpm', version: '9.15', description: 'Performanter Package Manager mit Workspace-Support', color: '#F69220', logo: <PnpmLogo /> },
      { name: 'Lucide React', version: '0.563', description: 'Moderne Icon-Bibliothek mit Tree-Shaking-Support', color: '#F56565', logo: <LetterLogo letter="L" color="#F56565" /> },
      { name: 'date-fns', version: '4.1', description: 'Modulare Datums-Utility-Bibliothek', color: '#770C56', logo: <LetterLogo letter="df" color="#770C56" /> },
    ],
  },
];

const totalTech = categories.reduce((sum, cat) => sum + cat.items.length, 0);

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function TechStackPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1100px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Tech Stack</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        Alle Frameworks, Libraries und Tools im Nordlig Design System
      </p>

      {/* Summary Banner */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '4px',
          marginBottom: '32px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369a1' }}>{totalTech}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Technologien</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369a1' }}>{categories.length}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Kategorien</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369a1' }}>11</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Radix UI Packages</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0369a1' }}>4</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Token-Ebenen</div>
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((cat) => (
        <Section key={cat.title} title={cat.title}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}
          >
            {cat.items.map((item) => (
              <TechCard key={item.name} {...item} />
            ))}
          </div>
        </Section>
      ))}

      {/* Monorepo Structure */}
      <Section title="Monorepo-Struktur">
        <div style={{ padding: '16px', backgroundColor: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '4px' }}>
          <pre
            style={{
              margin: 0,
              fontSize: '13px',
              fontFamily: 'monospace',
              color: '#0f172a',
              lineHeight: 1.8,
              whiteSpace: 'pre',
            }}
          >
{`nordlig-design-system/
\u251C\u2500\u2500 packages/
\u2502   \u251C\u2500\u2500 tokens/       Design Token Definitionen (Style Dictionary)
\u2502   \u251C\u2500\u2500 styles/       Generierte CSS-Ausgabe & Tailwind Config
\u2502   \u2514\u2500\u2500 components/   React-Komponentenbibliothek
\u2514\u2500\u2500 apps/
    \u251C\u2500\u2500 storybook/    Dokumentation & Playground
    \u2514\u2500\u2500 docs/         Dokumentationsseite`}
          </pre>
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STORYBOOK EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

const meta: Meta = {
  title: 'Overview/Tech Stack',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <TechStackPage />,
};
