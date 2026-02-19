#!/usr/bin/env node

/**
 * Nordlig Design System — Component Generator CLI
 *
 * Generiert alle Dateien fuer eine neue Komponente:
 * - L4-Token-JSON
 * - Component.tsx (forwardRef, displayName, cn/cva, var(--*))
 * - Component.test.tsx (vitest + @testing-library/react)
 * - Component.stories.tsx (Storybook)
 * - index.ts (Barrel-Export)
 *
 * Usage: pnpm generate:component
 */

import { createInterface } from 'node:readline';
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Helpers ─────────────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question, defaultValue) {
  const suffix = defaultValue ? ` (${defaultValue})` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function toCamelCase(name) {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function toKebabCase(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validatePascalCase(name) {
  if (!/^[A-Z][a-zA-Z0-9]+$/.test(name)) {
    return 'Name muss PascalCase sein (z.B. "Stepper", "DataGrid")';
  }
  return null;
}

function validateKebabCase(prefix) {
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(prefix)) {
    return 'Prefix muss kebab-case sein (z.B. "stepper", "data-grid")';
  }
  return null;
}

function validateLevel(level) {
  if (!['atom', 'molecule', 'organism'].includes(level)) {
    return 'Level muss "atom", "molecule" oder "organism" sein';
  }
  return null;
}

// ─── Element Type Mapping ────────────────────────────────────────────────────

const ELEMENT_MAP = {
  div:     { attrs: 'HTMLDivElement',     ref: 'HTMLDivElement',     tag: 'DIV',     instance: 'HTMLDivElement' },
  span:    { attrs: 'HTMLSpanElement',    ref: 'HTMLSpanElement',    tag: 'SPAN',    instance: 'HTMLSpanElement' },
  button:  { attrs: 'HTMLButtonElement',  ref: 'HTMLButtonElement',  tag: 'BUTTON',  instance: 'HTMLButtonElement' },
  section: { attrs: 'HTMLElement',        ref: 'HTMLElement',        tag: 'SECTION', instance: 'HTMLElement' },
  nav:     { attrs: 'HTMLElement',        ref: 'HTMLElement',        tag: 'NAV',     instance: 'HTMLElement' },
  aside:   { attrs: 'HTMLElement',        ref: 'HTMLElement',        tag: 'ASIDE',   instance: 'HTMLElement' },
  article: { attrs: 'HTMLElement',        ref: 'HTMLElement',        tag: 'ARTICLE', instance: 'HTMLElement' },
  ul:      { attrs: 'HTMLUListElement',   ref: 'HTMLUListElement',   tag: 'UL',      instance: 'HTMLUListElement' },
  ol:      { attrs: 'HTMLOListElement',   ref: 'HTMLOListElement',   tag: 'OL',      instance: 'HTMLOListElement' },
};

// ─── Templates ───────────────────────────────────────────────────────────────

function tokenTemplate(name, prefix) {
  return JSON.stringify({
    color: {
      $description: `Level 4: ${name} component tokens`,
      [prefix]: {
        bg:     { $type: 'color', $value: '{color.bg.surface}' },
        text:   { $type: 'color', $value: '{color.text.base}' },
        border: { $type: 'color', $value: '{color.border.default}' },
      },
    },
    radius: {
      [prefix]: { $type: 'dimension', $value: '{radius.component.md}' },
    },
  }, null, 2) + '\n';
}

function componentTemplate(name, prefix, element, levelDir) {
  const el = ELEMENT_MAP[element];
  const varName = toCamelCase(name) + 'Variants';
  // Berechne relative Pfadtiefe fuer utils Import
  const utilsImport = levelDir === 'atoms' ? '../../utils/cn' : '../../utils/cn';

  return `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '${utilsImport}';

const ${varName} = cva(
  'rounded-[var(--radius-${prefix})] bg-[var(--color-${prefix}-bg)] text-[var(--color-${prefix}-text)]',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ${name}Props
  extends React.HTMLAttributes<${el.attrs}>,
    VariantProps<typeof ${varName}> {}

const ${name} = React.forwardRef<${el.ref}, ${name}Props>(
  ({ className, variant, ...props }, ref) => (
    <${element}
      ref={ref}
      className={cn(${varName}({ variant, className }))}
      {...props}
    />
  )
);
${name}.displayName = '${name}';

export { ${name}, ${varName} };
`;
}

function testTemplate(name, prefix, element) {
  const el = ELEMENT_MAP[element];

  return `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders children', () => {
    render(<${name}>Content</${name}>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as a ${element} element', () => {
    render(<${name} data-testid="el">Content</${name}>);
    expect(screen.getByTestId('el').tagName).toBe('${el.tag}');
  });

  it('applies token-based styles', () => {
    render(<${name} data-testid="el">Content</${name}>);
    const el = screen.getByTestId('el');
    expect(el.className).toContain('bg-[var(--color-${prefix}-bg)]');
    expect(el.className).toContain('text-[var(--color-${prefix}-text)]');
    expect(el.className).toContain('rounded-[var(--radius-${prefix})]');
  });

  it('applies custom className', () => {
    render(<${name} data-testid="el" className="custom">Content</${name}>);
    expect(screen.getByTestId('el').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<${el.ref}>;
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref.current).toBeInstanceOf(${el.instance});
  });

  it('passes through HTML attributes', () => {
    render(
      <${name} data-testid="el" aria-label="Test" role="region">
        Content
      </${name}>
    );
    const el = screen.getByTestId('el');
    expect(el).toHaveAttribute('aria-label', 'Test');
    expect(el).toHaveAttribute('role', 'region');
  });
});
`;
}

function storiesTemplate(name, levelLabel) {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${levelLabel}/${name}',
  component: ${name},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: { children: '${name} Content' },
};
`;
}

function indexTemplate(name) {
  const varName = toCamelCase(name) + 'Variants';
  return `export { ${name}, ${varName}, type ${name}Props } from './${name}';
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) return null;

  const parsed = {};
  for (const arg of args) {
    const [key, ...rest] = arg.replace(/^--/, '').split('=');
    parsed[key] = rest.join('=');
  }
  return parsed;
}

async function main() {
  const cliArgs = parseArgs();

  let name, level, prefix, element;

  if (cliArgs && cliArgs.name) {
    // Non-interactive mode (CLI-Argumente)
    name = cliArgs.name;
    level = cliArgs.level || 'atom';
    prefix = cliArgs.prefix || toKebabCase(name);
    element = cliArgs.element || 'div';
  } else {
    // Interactive mode (readline)
    console.log('\n  Nordlig Design System — Component Generator\n');

    name = await ask('  Component Name (PascalCase)');
    level = await ask('  Level (atom/molecule/organism)', 'atom');
    const defaultPrefix = toKebabCase(name);
    prefix = await ask('  Token Prefix (kebab-case)', defaultPrefix);
    element = await ask('  HTML Element', 'div');

    rl.close();
  }

  // Validation
  const nameErr = validatePascalCase(name);
  if (nameErr) { console.error(`\n  ✗ ${nameErr}\n`); process.exit(1); }

  const levelErr = validateLevel(level);
  if (levelErr) { console.error(`\n  ✗ ${levelErr}\n`); process.exit(1); }

  const prefixErr = validateKebabCase(prefix);
  if (prefixErr) { console.error(`\n  ✗ ${prefixErr}\n`); process.exit(1); }

  if (!ELEMENT_MAP[element]) {
    console.error(`\n  ✗ Unbekanntes Element "${element}". Erlaubt: ${Object.keys(ELEMENT_MAP).join(', ')}\n`);
    process.exit(1);
  }

  // 2. Pfade berechnen
  const levelDir = level === 'atom' ? 'atoms' : level === 'molecule' ? 'molecules' : 'organisms';
  const levelLabel = levelDir.charAt(0).toUpperCase() + levelDir.slice(1);
  const componentDir = join(ROOT, 'packages/components/src', levelDir, name);
  const tokenFile = join(ROOT, 'packages/tokens/src/semantic', `${prefix}.json`);

  // 3. Existenz pruefen
  if (await exists(componentDir)) {
    console.error(`\n  ✗ Verzeichnis existiert bereits: ${componentDir}\n`);
    process.exit(1);
  }
  if (await exists(tokenFile)) {
    console.error(`\n  ✗ Token-Datei existiert bereits: ${tokenFile}\n`);
    process.exit(1);
  }

  // 4. Dateien generieren
  await mkdir(componentDir, { recursive: true });

  const files = [
    { path: tokenFile,                                    content: tokenTemplate(name, prefix),                    label: 'Token-JSON' },
    { path: join(componentDir, `${name}.tsx`),             content: componentTemplate(name, prefix, element, levelDir), label: 'Component' },
    { path: join(componentDir, `${name}.test.tsx`),        content: testTemplate(name, prefix, element),             label: 'Tests' },
    { path: join(componentDir, `${name}.stories.tsx`),     content: storiesTemplate(name, levelLabel),              label: 'Stories' },
    { path: join(componentDir, 'index.ts'),                content: indexTemplate(name),                            label: 'Index' },
  ];

  console.log('');
  for (const file of files) {
    await writeFile(file.path, file.content, 'utf-8');
    const relPath = file.path.replace(ROOT + '/', '');
    console.log(`  ✓ ${file.label.padEnd(12)} ${relPath}`);
  }

  // 5. Checkliste
  console.log(`
  Naechste Schritte:
    1. cd packages/tokens && pnpm build
    2. Export in packages/components/src/index.ts ergaenzen:
       export { ${name}, ${toCamelCase(name)}Variants, type ${name}Props } from './${levelDir}/${name}';
    3. Tokens und Varianten in ${prefix}.json + ${name}.tsx nach Bedarf anpassen
    4. pnpm --filter @nordlig/components test
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
