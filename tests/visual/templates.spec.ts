import { test } from '@playwright/test';
import { gotoStory, screenshotStory, screenshotFullPage } from './helpers';

// ─── Template-Stories ──────────────────────────────────────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
}

const templateStories: StoryConfig[] = [
  { component: 'PageShell',       stories: ['default', 'with-footer', 'no-sidebar', 'sidebar-right', 'content-max-width'] },
  { component: 'DashboardLayout', stories: ['default', 'collapsed-sidebar', 'with-breadcrumbs', 'no-footer', 'full-dashboard'] },
  { component: 'AuthLayout',      stories: ['login', 'register', 'forgot-password', 'with-background', 'with-logo'] },
];

for (const { component, stories } of templateStories) {
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `templates-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotFullPage(page, `templates-${component.toLowerCase()}-${story}`);
      });
    }
  });
}
