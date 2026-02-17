import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory } from './helpers';

// ─── Accessibility Tests (WCAG 2.1 AA) ─────────────────────────────────────
//
// Testet alle Komponenten-Stories mit axe-core gegen WCAG 2.1 AA.
// Violations mit Impact "critical" oder "serious" lassen den Test fehlschlagen.

interface A11yStoryConfig {
  component: string;
  level: 'atoms' | 'molecules' | 'organisms';
  stories: string[];
}

const a11yStories: A11yStoryConfig[] = [
  // ─── Atoms ────────────────────────────────────────────────────────────────
  { level: 'atoms', component: 'Alert', stories: ['info', 'success', 'warning', 'error'] },
  { level: 'atoms', component: 'Badge', stories: ['default', 'secondary', 'destructive', 'outline'] },
  { level: 'atoms', component: 'Button', stories: ['primary', 'secondary', 'destructive', 'outline', 'ghost'] },
  { level: 'atoms', component: 'Checkbox', stories: ['default', 'with-label', 'disabled'] },
  { level: 'atoms', component: 'Input', stories: ['default', 'with-label', 'disabled', 'with-error'] },
  { level: 'atoms', component: 'Label', stories: ['default'] },
  { level: 'atoms', component: 'Link', stories: ['default'] },
  { level: 'atoms', component: 'Progress', stories: ['default', 'with-label'] },
  { level: 'atoms', component: 'Slider', stories: ['default'] },
  { level: 'atoms', component: 'Spinner', stories: ['default'] },
  { level: 'atoms', component: 'Switch', stories: ['default', 'with-label'] },
  { level: 'atoms', component: 'Tag', stories: ['default'] },
  { level: 'atoms', component: 'Toggle', stories: ['default', 'outline', 'ghost'] },
  { level: 'atoms', component: 'Tooltip', stories: ['default'] },
  { level: 'atoms', component: 'Avatar', stories: ['default', 'fallback'] },
  { level: 'atoms', component: 'Heading', stories: ['default'] },
  { level: 'atoms', component: 'Text', stories: ['default'] },
  { level: 'atoms', component: 'Separator', stories: ['default'] },
  { level: 'atoms', component: 'Skeleton', stories: ['default'] },
  { level: 'atoms', component: 'Kbd', stories: ['default'] },
  { level: 'atoms', component: 'Code', stories: ['default'] },
  { level: 'atoms', component: 'CopyButton', stories: ['default'] },
  { level: 'atoms', component: 'SearchInput', stories: ['default'] },
  { level: 'atoms', component: 'NumberInput', stories: ['default'] },
  { level: 'atoms', component: 'PasswordInput', stories: ['default'] },
  { level: 'atoms', component: 'Rating', stories: ['default', 'read-only'] },
  { level: 'atoms', component: 'Highlight', stories: ['default'] },
  { level: 'atoms', component: 'LoadingOverlay', stories: ['default'] },
  { level: 'atoms', component: 'Banner', stories: ['info', 'success', 'warning', 'error'] },

  // ─── Molecules ────────────────────────────────────────────────────────────
  { level: 'molecules', component: 'Accordion', stories: ['default'] },
  { level: 'molecules', component: 'Breadcrumbs', stories: ['default'] },
  { level: 'molecules', component: 'Combobox', stories: ['default'] },
  { level: 'molecules', component: 'Dialog', stories: ['default'] },
  { level: 'molecules', component: 'EmptyState', stories: ['default'] },
  { level: 'molecules', component: 'Form', stories: ['default'] },
  { level: 'molecules', component: 'InputField', stories: ['default'] },
  { level: 'molecules', component: 'Pagination', stories: ['default'] },
  { level: 'molecules', component: 'RadioGroup', stories: ['default'] },
  { level: 'molecules', component: 'Select', stories: ['default'] },
  { level: 'molecules', component: 'Stepper', stories: ['default'] },
  { level: 'molecules', component: 'Tabs', stories: ['default'] },
  { level: 'molecules', component: 'Textarea', stories: ['default'] },

  // ─── Organisms ────────────────────────────────────────────────────────────
  { level: 'organisms', component: 'Card', stories: ['flat'] },
  { level: 'organisms', component: 'Table', stories: ['basic'] },
  { level: 'organisms', component: 'Sidebar', stories: ['default'] },
];

for (const { level, component, stories } of a11yStories) {
  test.describe(`[a11y] ${component}`, () => {
    for (const story of stories) {
      const storyId = `${level}-${component.toLowerCase()}--${story}`;

      test(`${story} has no critical a11y violations`, async ({ page }) => {
        await gotoStory(page, storyId);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();

        // Filter: nur critical und serious Violations
        const criticalViolations = results.violations.filter(
          (v) => v.impact === 'critical' || v.impact === 'serious'
        );

        if (criticalViolations.length > 0) {
          const report = criticalViolations.map((v) => {
            const nodes = v.nodes.map((n) => `  - ${n.html}`).join('\n');
            return `[${v.impact}] ${v.id}: ${v.help}\n${nodes}`;
          }).join('\n\n');

          expect(criticalViolations, `a11y violations in ${component}/${story}:\n${report}`).toHaveLength(0);
        }
      });
    }
  });
}
