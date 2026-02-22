import { test } from '@playwright/test';
import { gotoStory, screenshotStory } from './helpers';

// ─── Einfache Atom-Stories (keine Interaktion noetig) ────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
}

const atomStories: StoryConfig[] = [
  { component: 'Button',      stories: ['primary', 'secondary', 'ghost', 'all-sizes'] },
  { component: 'Badge',       stories: ['all-variants', 'all-sizes'] },
  { component: 'Input',       stories: ['default', 'with-value', 'error', 'disabled', 'all-sizes', 'password'] },
  { component: 'Checkbox',    stories: ['all-states'] },
  { component: 'Switch',      stories: ['all-states'] },
  { component: 'Progress',    stories: ['default', 'all-sizes', 'all-colors'] },
  { component: 'Spinner',     stories: ['default', 'all-sizes'] },
  { component: 'Skeleton',    stories: ['basic', 'card-loading'] },
  { component: 'Alert',       stories: ['all-variants', 'with-close-button'] },
  { component: 'Separator',   stories: ['default', 'vertical'] },
  { component: 'Avatar',      stories: ['default', 'with-fallback', 'sizes'] },
  { component: 'Slider',      stories: ['default', 'with-value', 'range'] },
  { component: 'ThemeToggle', stories: ['default'] },
  { component: 'ToggleGroup', stories: ['default', 'multiple', 'sizes'] },
  { component: 'ScrollArea',  stories: ['default'] },
  { component: 'AspectRatio', stories: ['default-16-by-9', 'square'] },
  // Neue Komponenten (Completion Package)
  { component: 'Label',       stories: ['default', 'required', 'disabled', 'all-states'] },
  { component: 'Link',        stories: ['default', 'all-variants', 'external-link', 'disabled', 'destructive'] },
  { component: 'Code',        stories: ['inline-code', 'code-block-default', 'all-variants', 'code-block-with-line-numbers'] },
  { component: 'Kbd',         stories: ['default', 'key-combination', 'all-sizes', 'shortcuts'] },
  { component: 'Text',        stories: ['body', 'small', 'caption', 'muted', 'all-variants'] },
  { component: 'Heading',     stories: ['level-1', 'level-2', 'level-3', 'all-levels'] },
  { component: 'Tag',         stories: ['default', 'variants', 'sizes', 'removable', 'clickable', 'all-combinations'] },
  { component: 'NumberInput', stories: ['default', 'with-min-max', 'error', 'disabled', 'sizes', 'states'] },
  // Tier-2 Batch
  { component: 'Toggle',      stories: ['default', 'outline', 'ghost', 'all-sizes', 'pressed', 'disabled'] },
  { component: 'Banner',      stories: ['all-variants', 'dismissible', 'with-action', 'custom-icon'] },
  // P2 Batch
  { component: 'Rating',        stories: ['default', 'read-only', 'half-stars', 'all-sizes'] },
  { component: 'Highlight',     stories: ['default', 'multiple-matches', 'case-insensitive'] },
  // Visual Regression Baseline Expansion
  { component: 'Blockquote',    stories: ['default', 'with-citation', 'long-quote'] },
  { component: 'Icon',          stories: ['all-sizes', 'color-variants', 'gallery'] },
  { component: 'Image',         stories: ['default', 'with-aspect-ratio', 'rounded-variants', 'error-fallback'] },
  { component: 'InputOTP',      stories: ['default', 'four-digit', 'with-groups', 'with-error', 'disabled'] },
  { component: 'Radio',         stories: ['default', 'with-label', 'checked', 'disabled', 'group'] },
  { component: 'CopyButton',    stories: ['default', 'all-sizes', 'disabled'] },
  { component: 'Card',          stories: ['flat', 'raised', 'elevated', 'all-elevations', 'all-paddings'] },
  { component: 'Spoiler',       stories: ['default', 'mit-label', 'inline-text'] },
];

for (const { component, stories } of atomStories) {
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `atoms-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotStory(page, `atoms-${component.toLowerCase()}-${story}`);
      });
    }
  });
}

// ─── Interaktive Atoms (Hover/Click noetig) ──────────────────────────────────

test.describe('Tooltip', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'atoms-tooltip--default');
    await page.locator('#storybook-root button').first().hover();
    await page.waitForTimeout(500);
    await screenshotStory(page, 'atoms-tooltip-default');
  });

  test('all-sides', async ({ page }) => {
    await gotoStory(page, 'atoms-tooltip--all-sides');
    await screenshotStory(page, 'atoms-tooltip-all-sides');
  });
});

test.describe('Popover', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'atoms-popover--default');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotStory(page, 'atoms-popover-default');
  });

  test('with-arrow', async ({ page }) => {
    await gotoStory(page, 'atoms-popover--with-arrow');
    await page.locator('#storybook-root button').first().click();
    await page.waitForTimeout(500);
    await screenshotStory(page, 'atoms-popover-with-arrow');
  });
});

test.describe('HoverCard', () => {
  test('default', async ({ page }) => {
    await gotoStory(page, 'atoms-hovercard--default');
    await page.locator('#storybook-root a, #storybook-root button, #storybook-root [data-radix-hover-card-trigger]').first().hover();
    await page.waitForTimeout(500);
    await screenshotStory(page, 'atoms-hovercard-default');
  });
});
