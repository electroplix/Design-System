/**
 * Config Subpath Validation
 *
 * This page imports from @electroplix/components/config which should be
 * server-safe (no 'use client', no React). If this fails, the config
 * entry point is broken.
 */
import { defaultConfig, defineConfig } from '@electroplix/components/config';

const customConfig = defineConfig({
  buttons: { bgColor: '#000', textColor: '#fff' },
});

export default function ConfigPage() {
  return (
    <main>
      <h1>Config Subpath Validation</h1>
      <pre>
        {JSON.stringify({ hasButtons: !!defaultConfig.buttons, custom: !!customConfig }, null, 2)}
      </pre>
      <p>✅ Config imported successfully in Server Component</p>
    </main>
  );
}
