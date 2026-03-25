import { test, expect } from '@playwright/test';
import { gotoStory, screenshotStory, screenshotFullPage } from './helpers';

// ─── Einfache Organism-Stories ───────────────────────────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
  prefix?: string; // Override fuer Story-ID Prefix (default: 'organisms')
}

const organismStories: StoryConfig[] = [
  { component: 'Table',    stories: ['basic', 'striped', 'all-densities'] },
  { component: 'Command',  stories: ['default', 'with-groups'] },
  // Neue Komponenten (Completion Package)
  { component: 'StatCard', stories: ['default', 'with-trend-up', 'with-trend-down', 'with-icon', 'all-variants'] },
  { component: 'Timeline', stories: ['default', 'with-icons', 'all-variants'] },
  { component: 'Tree',     stories: ['default', 'with-icons', 'with-selection', 'deep-nesting'] },
  { component: 'Sidebar',  stories: ['default', 'collapsed', 'with-badges'] },
  { component: 'Carousel',     stories: ['default', 'with-arrows', 'with-dots', 'all-features'] },
  // Visual Regression Baseline Expansion
  { component: 'SessionCard',  stories: ['default', 'compact', 'loading', 'error', 'all-states'], prefix: 'examples' },
  { component: 'DataTable',    stories: ['basic', 'with-sorting', 'with-pagination', 'full-featured', 'empty'] },
  { component: 'AppHeader',    stories: ['default', 'with-navigation', 'no-border', 'flat'] },
  { component: 'AppFooter',    stories: ['default', 'with-links', 'no-border'] },
  // Patterns (eigenes Storybook-Prefix)
  { component: 'SearchFilter', stories: ['default'], prefix: 'patterns' },
];

for (const { component, stories, prefix } of organismStories) {
  const storyPrefix = prefix || 'organisms';
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `${storyPrefix}-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotStory(page, `${storyPrefix}-${component.toLowerCase()}-${story}`);
      });
    }
  });
}

// ─── Modal (Portal-Komponente) ───────────────────────────────────────────────

test.describe('Modal', () => {
  const modalStories = ['basic', 'with-description', 'size-small', 'size-large'];

  for (const story of modalStories) {
    test(story, async ({ page }) => {
      await gotoStory(page, `organisms-modal--${story}`);
      await page.locator('#storybook-root button').first().click();
      await page.waitForTimeout(500);
      await screenshotFullPage(page, `organisms-modal-${story}`);
    });
  }
});

// ─── Chart (SVG-basiert, hoehere Toleranz) ───────────────────────────────────

test.describe('Chart', () => {
  const chartStories = [
    { story: 'liniendiagramm', name: 'line' },
    { story: 'balkendiagramm', name: 'bar' },
    { story: 'flaechendiagramm', name: 'area' },
    { story: 'kreisdiagramm', name: 'pie' },
  ];

  for (const { story, name } of chartStories) {
    test(name, async ({ page }) => {
      await gotoStory(page, `organisms-chart--${story}`);
      // Charts brauchen extra Renderzeit fuer SVG
      await page.waitForTimeout(1000);
      const root = page.locator('#storybook-root');
      await expect(root).toHaveScreenshot(`organisms-chart-${name}.png`, {
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
