import { test } from '@playwright/test';
import { gotoStory, screenshotStory, screenshotFullPage } from './helpers';

// ─── Pattern-Stories ──────────────────────────────────────────────────────────

interface StoryConfig {
  component: string;
  stories: string[];
}

const patternStories: StoryConfig[] = [
  { component: 'DataTablePattern', stories: ['default', 'with-search', 'with-filters', 'with-bulk-actions', 'empty-state-story', 'full-featured'] },
  { component: 'FormWizard',       stories: ['default', 'with-summary', 'validation-demo', 'vertical-layout'] },
];

for (const { component, stories } of patternStories) {
  test.describe(component, () => {
    for (const story of stories) {
      const storyId = `patterns-${component.toLowerCase()}--${story}`;
      test(story, async ({ page }) => {
        await gotoStory(page, storyId);
        await screenshotFullPage(page, `patterns-${component.toLowerCase()}-${story}`);
      });
    }
  });
}
