#!/usr/bin/env node

/**
 * sync-metadata.mjs
 *
 * Post-build script to sync component metadata JSON files
 * to the Electroplix API database.
 *
 * Usage:
 *   node scripts/sync-metadata.mjs [--api-url <url>] [--dry-run]
 *
 * Environment:
 *   SYNC_API_URL  — Base API URL (default: http://localhost:8787/api)
 *   SYNC_API_KEY  — Optional API key for authentication
 */

import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ——— Configuration ———

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const apiUrlFlag = args.indexOf('--api-url');
const API_BASE =
  apiUrlFlag !== -1
    ? args[apiUrlFlag + 1]
    : process.env.SYNC_API_URL || 'http://localhost:8787/api';
const API_KEY = process.env.SYNC_API_KEY || '';

const METADATA_DIR = join(__dirname, '..', 'metadata');

// ——— Helpers ———

function log(_msg) {}

function error(msg) {
  console.error(`[sync-metadata] ERROR: ${msg}`);
}

async function postJSON(endpoint, body) {
  const url = `${API_BASE}${endpoint}`;
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(data)}`);
  }

  return data;
}

// ——— Main ———

async function main() {
  log(`Metadata dir : ${METADATA_DIR}`);
  log(`API base     : ${API_BASE}`);
  log(`Dry run      : ${dryRun}`);
  log('');

  // 1. Read all metadata JSON files
  const files = (await readdir(METADATA_DIR)).filter((f) => f.endsWith('.json'));
  log(`Found ${files.length} metadata files`);

  const categories = [];
  const allComponents = [];

  for (const file of files) {
    const raw = await readFile(join(METADATA_DIR, file), 'utf-8');
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      error(`Failed to parse ${file}: ${e.message}`);
      continue;
    }

    // Build category record
    categories.push({
      id: parsed.category,
      label: parsed.label,
      description: parsed.description,
      theme_key: parsed.themeKey,
      icon: parsed.icon || null,
      sort_order: parsed.sortOrder ?? 0,
      component_count: parsed.components?.length ?? 0,
    });

    // Build component records
    if (Array.isArray(parsed.components)) {
      for (const comp of parsed.components) {
        allComponents.push({
          id: comp.id,
          name: comp.name,
          category: parsed.category,
          description: comp.description,
          when_to_use: comp.whenToUse,
          import_path: '@electroplix/components',
          is_shell: comp.isShell ?? false,
          props: comp.props,
          theme_tokens: comp.themeTokens,
          ai_hints: comp.aiHints,
          examples: comp.examples || null,
          version: '1.0.0',
        });
      }
    }
  }

  log(`Parsed ${categories.length} categories, ${allComponents.length} components`);
  log('');

  if (dryRun) {
    log('=== DRY RUN — Categories ===');
    for (const cat of categories) {
      log(`  ${cat.id} (${cat.component_count} components) — ${cat.label}`);
    }
    log('');
    log('=== DRY RUN — Components ===');
    for (const comp of allComponents) {
      const reqProps = comp.props.filter((p) => p.required).length;
      const optProps = comp.props.filter((p) => !p.required).length;
      log(`  ${comp.id} — ${reqProps} required, ${optProps} optional props`);
    }
    log('');
    log(`Total: ${categories.length} categories, ${allComponents.length} components`);
    log('Dry run complete — no data sent to API.');
    return;
  }

  // 2. Sync categories
  log('Syncing categories...');
  try {
    const catResult = await postJSON('/components/sync/categories', { categories });
    log(`Categories synced: ${catResult.data.synced} processed`);
    for (const r of catResult.data.results) {
      log(`  ${r.id}: ${r.status}${r.reason ? ` (${r.reason})` : ''}`);
    }
  } catch (e) {
    error(`Failed to sync categories: ${e.message}`);
    process.exit(1);
  }

  log('');

  // 3. Sync components in batches of 20
  const BATCH_SIZE = 20;
  const batches = [];
  for (let i = 0; i < allComponents.length; i += BATCH_SIZE) {
    batches.push(allComponents.slice(i, i + BATCH_SIZE));
  }

  log(`Syncing ${allComponents.length} components in ${batches.length} batches...`);

  let synced = 0;
  let failed = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    log(`  Batch ${i + 1}/${batches.length} (${batch.length} components)...`);

    try {
      const result = await postJSON('/components/sync/metadata', { components: batch });

      for (const r of result.data.results) {
        if (r.status === 'skipped') {
          error(`    ${r.id}: skipped — ${r.reason}`);
          failed++;
        } else {
          synced++;
        }
      }
    } catch (e) {
      error(`  Batch ${i + 1} failed: ${e.message}`);
      failed += batch.length;
    }
  }

  log('');
  log('=== Sync Summary ===');
  log(`  Categories : ${categories.length}`);
  log(`  Components : ${synced} synced, ${failed} failed`);
  log(`  Total      : ${allComponents.length}`);

  if (failed > 0) {
    error(`${failed} components failed to sync.`);
    process.exit(1);
  }

  log('Sync complete!');
}

main().catch((e) => {
  error(e.message);
  process.exit(1);
});
