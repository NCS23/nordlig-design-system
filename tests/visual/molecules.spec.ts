import { test } from '@playwright/test';
import { gotoStory, screenshotStory, screenshotFullPage } from './helpers';

// ─── Einfache Molecule-Stories ───────────────────────────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
}

const moleculeStories: StoryConfig[] = [
  { component: 'InputField',      stories: ['default', 'with-helper', 'with-error', 'all-sizes'] },
  { component: 'DatePicker',      stories: ['default', 'with-value', 'error'] },
  { component: 'Select',          stories: ['default', 'with-value', 'grouped'] },
  { component: 'Textarea',        stories: ['default', 'with-label', 'with-counter', 'error-state'] },
  { component: 'FileUpload',      stories: ['default', 'multiple'] },
  { component: 'RadioGroup',      stories: ['basic', 'vertical-layout', 'horizontal-layout'] },
  { component: 'Tabs',            stories: ['underline-default', 'pills-default', 'all-variants'] },
  { component: 'Accordion',       stories: ['single-default', 'multiple-open'] },
  { component: 'Pagination',      stories: ['default', 'many-pages', 'compact-variant'] },
  { component: 'EmptyState',      stories: ['default', 'with-action', 'error-state'] },
  { component: 'Breadcrumbs',     stories: ['default', 'custom-separator', 'many-levels'] },
  { component: 'Collapsible',     stories: ['default'] },
  { component: 'Form',            stories: ['default'] },
  // Neue Komponenten (Completion Package)
  { component: 'Stepper',         stories: ['horizontal-default', 'vertical-default', 'with-descriptions', 'clickable-steps'] },
  { component: 'NavigationMenu',  stories: ['default', 'with-active-state', 'with-dropdown'] },
  // Tier-2 Batch
  { component: 'Combobox',        stories: ['default', 'with-groups', 'all-sizes', 'disabled'] },
  // Moved from atoms (composite components)
  { component: 'SearchInput',     stories: ['default', 'with-value', 'all-sizes', 'error', 'disabled'] },
  { component: 'PasswordInput',   stories: ['default', 'with-strength', 'all-sizes', 'disabled'] },
  { component: 'LoadingOverlay',  stories: ['default', 'with-text', 'with-blur'] },
  // Visual Regression Baseline Expansion
  { component: 'CheckboxField',   stories: ['with-label', 'with-description', 'checked-field', 'disabled-field'] },
  { component: 'ColorPicker',     stories: ['default', 'with-alpha', 'with-swatches', 'disabled'] },
  { component: 'Menubar',         stories: ['default', 'with-shortcuts'] },
  { component: 'ProgressField',   stories: ['with-label', 'training-goal-progress'] },
  { component: 'SwitchField',     stories: ['with-label', 'with-description', 'all-states'] },
  { component: 'TimePicker',      stories: ['default', 'with-value', 'with-seconds', 'twelve-hour', 'all-sizes', 'error', 'disabled'] },
  { component: 'Toolbar',         stories: ['default', 'with-toggle-group', 'with-separators', 'vertical'] },
  { component: 'Resizable',       stories: ['default', 'vertical', 'with-handle', 'three-panels'] },
  { component: 'SearchFilter',    stories: ['default'] },
];

for (const { component, stories } of moleculeStories) {
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `molecules-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotStory(page, `molecules-${component.toLowerCase()}-${story}`);
      });
    }
  });
}

// ─── Portal-/Overlay-Komponenten (benoetigen Click + Fullpage-Screenshot) ────

test.describe('Dialog', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-dialog--default');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-dialog-default');
  });

  test('confirmation', async ({ page }) => {
    await gotoStory(page, 'molecules-dialog--confirmation');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-dialog-confirmation');
  });
});

test.describe('Sheet', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-sheet--default');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-sheet-default');
  });

  test('left', async ({ page }) => {
    await gotoStory(page, 'molecules-sheet--left');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-sheet-left');
  });
});

test.describe('DropdownMenu', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-dropdownmenu--default');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-dropdownmenu-default');
  });
});

test.describe('ContextMenu', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-contextmenu--default');
    await page.locator('#storybook-root').first().click({ button: 'right' });
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-contextmenu-default');
  });

  test('with-icons', async ({ page }) => {
    await gotoStory(page, 'molecules-contextmenu--with-icons');
    await page.locator('#storybook-root').first().click({ button: 'right' });
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-contextmenu-with-icons');
  });

  test('with-separator-and-label', async ({ page }) => {
    await gotoStory(page, 'molecules-contextmenu--with-separator-and-label');
    await page.locator('#storybook-root').first().click({ button: 'right' });
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-contextmenu-with-separator-and-label');
  });
});

test.describe('AlertDialog', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-alertdialog--default');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-alertdialog-default');
  });

  test('non-destructive', async ({ page }) => {
    await gotoStory(page, 'molecules-alertdialog--non-destructive');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-alertdialog-non-destructive');
  });
});

test.describe('Drawer', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-drawer--default');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-drawer-default');
  });

  test('with-form', async ({ page }) => {
    await gotoStory(page, 'molecules-drawer--with-form');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-drawer-with-form');
  });
});

test.describe('MultiSelect', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'molecules-select--multi-select-default');
    await screenshotStory(page, 'molecules-multiselect-default');
  });

  test('with-values', async ({ page }) => {
    await gotoStory(page, 'molecules-select--multi-select-with-values');
    await screenshotStory(page, 'molecules-multiselect-with-values');
  });

  test('error', async ({ page }) => {
    await gotoStory(page, 'molecules-select--multi-select-error');
    await screenshotStory(page, 'molecules-multiselect-error');
  });

  test('disabled', async ({ page }) => {
    await gotoStory(page, 'molecules-select--multi-select-disabled');
    await screenshotStory(page, 'molecules-multiselect-disabled');
  });
});

test.describe('Toast', () => {
  test('success', async ({ page }) => {
    await gotoStory(page, 'molecules-toast--success');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotFullPage(page, 'molecules-toast-success');
  });

  test('all-variants', async ({ page }) => {
    await gotoStory(page, 'molecules-toast--all-variants');
    await screenshotStory(page, 'molecules-toast-all-variants');
  });
});
