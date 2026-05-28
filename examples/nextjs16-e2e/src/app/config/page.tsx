/**
 * Config Subpath Validation (Next.js 16)
 *
 * Validates that `@electroplix/components/config` is server-safe on Next.js 16.
 */
import { defaultConfig, defineConfig, mergeTheme } from '@electroplix/components/config';

const customConfig = defineConfig({
  buttons: { bgColor: '#000', textColor: '#fff' },
});

const merged = mergeTheme(
  (defaultConfig.buttons ?? {}) as Record<string, unknown>,
  customConfig.buttons as Record<string, unknown> | undefined,
);

export default function ConfigPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <h1>Config Subpath Validation — Next.js 16</h1>
      <pre
        style={{
          background: '#0b0b0c',
          color: '#f3f4f6',
          padding: '1rem',
          borderRadius: 8,
          overflow: 'auto',
        }}
      >
        {JSON.stringify(
          {
            hasButtons: !!defaultConfig.buttons,
            customButtonsBg: customConfig.buttons?.bgColor,
            mergedRadius: merged.radius,
          },
          null,
          2,
        )}
      </pre>
      <p>✅ Config imported successfully in a Server Component</p>
    </main>
  );
}
