/**
 * SSR Validation Script — Next.js 15.3.8 example.
 *
 * Validates that `@electroplix/components` and `@electroplix/components/config`
 * import cleanly in a pure Node.js (no DOM) context. This catches accidental
 * top-level access to `window`, `document`, or other browser globals.
 *
 * Run via:  pnpm --filter @electroplix-ds/nextjs15-e2e test:ssr
 */
import assert from 'node:assert';
import { test } from 'node:test';

test('main entry imports without error in Node', async () => {
  const mod = await import('@electroplix/components');
  assert.ok(mod.ElectroplixProvider, 'ElectroplixProvider should be exported');
  assert.ok(mod.Button, 'Button should be exported');
  assert.ok(mod.StaticHero, 'StaticHero should be exported');
  assert.ok(mod.PrimaryNav, 'PrimaryNav should be exported');
  assert.ok(mod.ContactForm, 'ContactForm should be exported');
  assert.ok(mod.Badge, 'Badge should be exported');
  assert.ok(mod.BlogCard, 'BlogCard should be exported');
  assert.ok(mod.PricingTable, 'PricingTable should be exported');
  assert.ok(mod.SiteSearchBar, 'SiteSearchBar should be exported');
});

test('config subpath imports without error (server-safe)', async () => {
  const config = await import('@electroplix/components/config');
  assert.ok(config.defineConfig, 'defineConfig should be exported');
  assert.ok(config.defaultConfig, 'defaultConfig should be exported');
  assert.ok(config.mergeTheme, 'mergeTheme should be exported');
  assert.strictEqual(typeof config.defaultConfig.buttons.bgColor, 'string');
});

test('defineConfig + mergeTheme produce a valid result', async () => {
  const { defineConfig, defaultConfig, mergeTheme } = await import(
    '@electroplix/components/config'
  );
  const cfg = defineConfig({ buttons: { bgColor: '#000' } });
  assert.strictEqual(cfg.buttons.bgColor, '#000');

  const merged = mergeTheme(defaultConfig.buttons, cfg.buttons);
  assert.strictEqual(merged.bgColor, '#000');
  assert.ok(typeof merged.radius === 'number');
});
