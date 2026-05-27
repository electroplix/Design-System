import assert from 'node:assert';
/**
 * SSR Validation Script
 *
 * Validates that @electroplix/components can be imported in a Node.js
 * environment without crashing (no browser globals accessed at import time).
 *
 * Run: node --test src/ssr-validation.mjs
 */
import { test } from 'node:test';

test('components package imports without error', async () => {
  const mod = await import('@electroplix/components');
  assert.ok(mod.ElectroplixProvider, 'ElectroplixProvider should be exported');
  assert.ok(mod.Button, 'Button should be exported');
  assert.ok(mod.StaticHero, 'StaticHero should be exported');
  assert.ok(mod.PrimaryNav, 'PrimaryNav should be exported');
  assert.ok(mod.ContactForm, 'ContactForm should be exported');
  assert.ok(mod.Badge, 'Badge should be exported');
});

test('config subpath imports without error (server-safe)', async () => {
  const config = await import('@electroplix/components/config');
  assert.ok(config.defineConfig, 'defineConfig should be exported');
  assert.ok(config.defaultConfig, 'defaultConfig should be exported');
  assert.ok(config.mergeTheme, 'mergeTheme should be exported');
  assert.strictEqual(typeof config.defaultConfig.buttons.bgColor, 'string');
});

test('defineConfig returns valid config', async () => {
  const { defineConfig } = await import('@electroplix/components/config');
  const cfg = defineConfig({ buttons: { bgColor: '#000' } });
  assert.strictEqual(cfg.buttons.bgColor, '#000');
});
