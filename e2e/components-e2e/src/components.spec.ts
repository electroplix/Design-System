import { expect, test } from '@playwright/test';

/**
 * E2E tests for the Electroplix Design System Vite showcase.
 *
 * Tests are resilient: they avoid brittle exact-count assertions and
 * rely on stable `data-*` selectors set by the showcase wrappers.
 *
 * NOTE: Console-error filter intentionally ignores known dev-only
 * React 19 warnings, image src warnings (placeholder fallbacks), and
 * favicon 404s. Real runtime errors will still fail the test.
 */

const CATEGORIES: { slug: string; title: string }[] = [
  { slug: 'navigation', title: 'Navigation' },
  { slug: 'hero', title: 'Hero' },
  { slug: 'buttons', title: 'Buttons' },
  { slug: 'forms', title: 'Forms' },
  { slug: 'content', title: 'Content' },
  { slug: 'data-display', title: 'Data Display' },
  { slug: 'ecommerce', title: 'Ecommerce' },
  { slug: 'lists-cards', title: 'Lists & Cards' },
  { slug: 'marketing', title: 'Marketing' },
  { slug: 'media', title: 'Media' },
  { slug: 'miscellaneous', title: 'Miscellaneous' },
  { slug: 'modals', title: 'Modals & Overlays' },
  { slug: 'onboarding', title: 'Onboarding' },
  { slug: 'search', title: 'Search' },
  { slug: 'site-identity', title: 'Site Identity' },
  { slug: 'social', title: 'Social' },
  { slug: 'user-accounts', title: 'User Accounts' },
  { slug: 'blog', title: 'Blog' },
];

/** Patterns of console messages we deliberately ignore. */
const CONSOLE_IGNORE_PATTERNS = [
  /React does not recognize/i,
  /Warning:/i,
  /Failed to load resource/i, // placeholder/favicon 404s
  /An empty string \(""\) was passed to the src attribute/i,
  /was passed to the src attribute/i,
  /Hydration/i,
  /devtools/i,
  /cannot contain/i, // React DOM nesting warnings (<p> inside <p>)
  /unique "key" prop/i, // React key warnings in demo components
  /Cookie.*rejected/i, // Third-party cookie warnings (embedded tweets)
  /X-Frame-Options/i, // Embedded iframe denials
  /SameSite/i, // Cross-site cookie warnings
];

test.describe('Showcase home page', () => {
  test('renders showcase hero with title and CTA', async ({ page }) => {
    await page.goto('/');

    // The StaticHero h1 with our title — match by role+name to be stable.
    await expect(
      page.getByRole('heading', { name: 'Electroplix Design System Showcase', level: 1 }),
    ).toBeVisible();

    // The category grid container is a stable test anchor.
    await expect(page.locator('[data-test="category-grid"]')).toBeVisible();
  });

  test('renders a link for every category', async ({ page }) => {
    await page.goto('/');

    for (const c of CATEGORIES) {
      await expect(
        page.locator(`[data-category-link="${c.slug}"]`),
        `expected link for category "${c.slug}"`,
      ).toBeVisible();
    }
  });
});

test.describe('Showcase category pages', () => {
  for (const c of CATEGORIES) {
    test(`/${c.slug} renders the ${c.title} category page`, async ({ page }) => {
      await page.goto(`/${c.slug}`);

      // Stable category root selector populated by CategoryPage.
      await expect(page.locator(`[data-category="${c.slug}"]`)).toBeVisible();

      // The category page heading should contain the human-readable title.
      await expect(page.getByRole('heading', { name: c.title, level: 2 }).first()).toBeVisible();

      // At least one component demo should be rendered.
      await expect(
        page.locator(`[data-category="${c.slug}"] [data-component]`).first(),
      ).toBeVisible();
    });
  }
});

test.describe('Showcase routing', () => {
  test('header navigation links route to category pages', async ({ page }) => {
    await page.goto('/');

    // Click the buttons link in the sticky header.
    const headerButtons = page
      .locator('[data-test="showcase-header"] a')
      .filter({ hasText: /^Buttons$/ });
    await headerButtons.click();

    await expect(page).toHaveURL(/\/buttons$/);
    await expect(page.locator('[data-category="buttons"]')).toBeVisible();
  });

  test('home category card links route to the corresponding page', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-category-link="forms"]').click();

    await expect(page).toHaveURL(/\/forms$/);
    await expect(page.getByRole('heading', { name: 'Forms', level: 2 })).toBeVisible();
  });
});

test.describe('Showcase has no real console errors across categories', () => {
  test('home + every category page is free of unexpected console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => {
      errors.push(err.message);
    });

    const routes = ['/', ...CATEGORIES.map((c) => `/${c.slug}`)];
    for (const route of routes) {
      await page.goto(route);
      // Wait for content to settle a moment.
      await page.waitForLoadState('domcontentloaded');
    }

    const realErrors = errors.filter((e) => !CONSOLE_IGNORE_PATTERNS.some((rx) => rx.test(e)));

    if (realErrors.length > 0) {
      // biome-ignore lint/suspicious/noConsoleLog: intentional test diagnostics
      console.log('Unexpected console errors:\n', realErrors.join('\n - '));
    }
    expect(realErrors).toHaveLength(0);
  });
});
