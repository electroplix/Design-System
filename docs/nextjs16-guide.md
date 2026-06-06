# Using @electroplix/components with Next.js 16

Complete implementation guide for integrating `@electroplix/components` into a fresh Next.js 16 application. All patterns here are drawn directly from the `examples/nextjs16-e2e` validation harness.

---

## Prerequisites

| Requirement | Version |
|:------------|:--------|
| Node.js | ≥ 18.0.0 |
| Next.js | ^16.2.6 |
| React | 19.2.5 |
| react-dom | 19.2.5 |

---

## 1. Create a New Next.js 16 App

```bash
npx create-next-app@latest my-app \
  --typescript \
  --app \
  --no-tailwind \
  --no-src-dir
cd my-app
```

> The `--app` flag enables the App Router, which is required for the recommended provider pattern below.

---

## 2. Install the Library

```bash
npm install @electroplix/components react@19.2.5 react-dom@19.2.5
```

Or with pnpm:

```bash
pnpm add @electroplix/components react@19.2.5 react-dom@19.2.5
```

The library has no runtime dependencies. Its only peer dependencies are `react` and `react-dom`.

---

## 3. Configure next.config.mjs

Add `transpilePackages` so Next.js correctly processes the ESM bundle and React 19 components:

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@electroplix/components'],
  reactStrictMode: true,
};

export default nextConfig;
```

This is the **only required Next.js configuration change**. Without `transpilePackages`, the bundler may fail to handle the ESM-only package.

---

## 4. Configure TypeScript

Use `moduleResolution: "bundler"` and `target: "es2022"` for full compatibility:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

---

## 5. Create the Provider Wrapper

All components require the `ElectroplixProvider` context. Because it is a client component (`"use client"`), wrap it in a dedicated client boundary file:

```tsx
// src/app/ClientLayout.tsx
'use client';
import { ElectroplixProvider } from '@electroplix/components';
import type { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ElectroplixProvider config={{ accentColor: '#8B5CF6' }}>
      {children}
    </ElectroplixProvider>
  );
}
```

This separation keeps `layout.tsx` as a Server Component while the provider itself lives in a client boundary.

---

## 6. Wire the Provider into the Root Layout

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with @electroplix/components',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
        }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

---

## 7. Using Components

### In a Server Component (RSC)

Components that do not require interactivity can be used directly in Server Components. The library's `"use client"` directive at the top of its bundle is automatically handled by the bundler:

```tsx
// src/app/page.tsx (Server Component)
import {
  StaticHero,
  Badge,
  CalloutBox,
  ProductCard,
  BlogCard,
  LogoDisplay,
  ElectroplixProvider,
} from '@electroplix/components';

const sampleProduct = {
  id: 'p1',
  title: 'Aurora Headphones',
  price: 249.99,
  image: 'https://placehold.co/400x400/0b0b0c/ffffff?text=Aurora',
};

const samplePost = {
  id: 'b1',
  title: 'Getting Started with Electroplix',
  excerpt: 'A complete integration guide.',
  slug: '/blog/getting-started',
  date: '2026-06-06',
  readTime: '5 min',
};

export default function HomePage() {
  return (
    <ElectroplixProvider>
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
        <StaticHero
          title="Build Faster"
          subtitle="159 production-grade components for Next.js 16"
        />

        <section style={{ marginTop: '2rem' }}>
          <Badge label="New" />
          <CalloutBox variant="info" title="Quick Tip">
            Wrap your layout with ElectroplixProvider once and all 159 components
            will inherit the theme automatically.
          </CalloutBox>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <ProductCard product={sampleProduct} />
        </section>

        <section style={{ marginTop: '2rem' }}>
          <BlogCard post={samplePost} />
        </section>

        <section style={{ marginTop: '2rem' }}>
          <LogoDisplay
            src="https://placehold.co/140x40/0b0b0c/ffffff?text=MY+APP"
            alt="My App Logo"
          />
        </section>
      </main>
    </ElectroplixProvider>
  );
}
```

### In a Client Component

Add `'use client'` at the top of any page or component that uses React state, effects, or interactive components:

```tsx
// src/app/navigation/page.tsx
'use client';
import {
  PrimaryNav,
  Breadcrumbs,
  Tabs,
  Pagination,
  SidebarMenu,
  Footer,
} from '@electroplix/components';
import { useState } from 'react';

export default function NavigationPage() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <PrimaryNav
        logoText="My App"
        links={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Blog', href: '/blog' },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Navigation', href: '/navigation' },
        ]}
      />

      <Tabs
        tabs={[
          { label: 'Overview', content: <p>Overview content</p> },
          { label: 'Details', content: <p>Details content</p> },
        ]}
      />

      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />

      <SidebarMenu
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings', href: '/settings' },
        ]}
      />

      <Footer columns={[]} />
    </div>
  );
}
```

---

## 8. All 18 Categories — Route Examples

Each category requires `'use client'` on its page because components use React state internally. Here are minimal working examples for every category:

### Navigation (11 components)

```tsx
'use client';
import {
  PrimaryNav, MegaMenu, SidebarMenu, Tabs, Breadcrumbs,
  Pagination, Stepper, AnchorLinks, SideDrawerNav,
  LanguageSelector, Footer,
} from '@electroplix/components';
import { useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  return (
    <>
      <PrimaryNav logoText="Acme" links={[{ label: 'Home', href: '/' }]} />
      <MegaMenu label="Products" sections={[{ title: 'Tools', links: [{ label: 'CLI', href: '/cli' }] }]} />
      <SidebarMenu items={[{ label: 'Dashboard', href: '/dashboard' }]} />
      <Tabs tabs={[{ label: 'Tab 1', content: <p>Content</p> }]} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />
      <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      <Stepper steps={[{ label: 'Step 1' }, { label: 'Step 2' }]} currentStep={0} />
      <AnchorLinks items={[{ label: 'Section 1', targetId: 's1' }]} />
      <SideDrawerNav links={[{ label: 'Home', href: '/' }]} />
      <LanguageSelector languages={[{ code: 'en', label: 'English' }]} current="en" />
      <Footer columns={[]} />
    </>
  );
}
```

### Hero (7 components)

```tsx
'use client';
import {
  HeroShell, StaticHero, SplitHero, VideoHeaderHero,
  CarouselHero, CTAOverlayHero, PatternedHero,
} from '@electroplix/components';

export default function Page() {
  return (
    <>
      <HeroShell />
      <StaticHero title="Welcome" subtitle="Build fast" />
      <SplitHero title="Split Layout" subtitle="Left and right content" />
      <CTAOverlayHero title="Call to Action" buttonText="Get Started" />
      <PatternedHero pattern="grid" title="Patterned Background" />
      <CarouselHero slides={[{ image: 'https://placehold.co/800x400', title: 'Slide 1' }]} />
      <VideoHeaderHero videoSrc="https://example.com/video.mp4" title="Video Hero" />
    </>
  );
}
```

### Buttons (11 components)

```tsx
'use client';
import {
  PrimaryButton, SecondaryButton, TertiaryButton, IconButton,
  Button, FloatingActionButton, ButtonGroup, LoadingButton,
  ShareButton, DownloadButton, PrintButton,
} from '@electroplix/components';

export default function Page() {
  return (
    <>
      <PrimaryButton label="Primary" />
      <SecondaryButton label="Secondary" />
      <TertiaryButton label="Tertiary" />
      <IconButton icon="star" />
      <Button label="Generic" variant="primary" />
      <FloatingActionButton icon="plus" fixed={false} />
      <ButtonGroup buttons={[{ label: 'A' }, { label: 'B' }, { label: 'C' }]} />
      <LoadingButton label="Saving..." />
      <ShareButton />
      <DownloadButton />
      <PrintButton />
    </>
  );
}
```

### Forms (14 components)

```tsx
'use client';
import {
  FormShell, InputField, TextAreaField, SelectDropdown,
  RadioGroup, ToggleSwitch, DateTimePicker, FileUploader,
  ContactForm, NewsletterSignup, MultiStepWizard,
  Captcha, AddressAutocomplete, ValidationWrapper,
} from '@electroplix/components';

export default function Page() {
  return (
    <>
      <FormShell />
      <InputField label="Full Name" name="name" />
      <TextAreaField label="Message" name="message" />
      <SelectDropdown label="Country" name="country" options={[{ value: 'us', label: 'United States' }]} />
      <RadioGroup label="Plan" name="plan" options={[{ value: 'free', label: 'Free' }]} />
      <ToggleSwitch label="Dark Mode" />
      <DateTimePicker label="Appointment" name="date" />
      <FileUploader />
      <ContactForm />
      <NewsletterSignup />
      <MultiStepWizard steps={[]} />
      <Captcha />
      <AddressAutocomplete name="address" />
      <ValidationWrapper />
    </>
  );
}
```

### Modals (9 components)

```tsx
'use client';
import {
  GenericModal, ConfirmDialog, FormDialog, LoadingOverlay,
  Tooltip, ToastBanners, CookieNotice, WelcomePopup,
} from '@electroplix/components';

export default function Page() {
  return (
    <>
      <GenericModal isOpen={false} onClose={() => {}}>
        <p>Modal content</p>
      </GenericModal>
      <ConfirmDialog isOpen={false} onClose={() => {}} onConfirm={() => {}} message="Are you sure?" />
      <FormDialog isOpen={false} onClose={() => {}} onSubmit={() => {}} title="Edit Profile" />
      <LoadingOverlay isOpen={false} />
      <Tooltip text="Helpful hint">
        <button>Hover me</button>
      </Tooltip>
      <ToastBanners toasts={[]} />
      <CookieNotice isOpen={false} onAccept={() => {}} />
      <WelcomePopup isOpen={false} onClose={() => {}} title="Welcome!" />
    </>
  );
}
```

---

## 9. Server-Safe Config Subpath

Use `@electroplix/components/config` in Server Components (RSC) to access default theme values without importing the React client bundle:

```tsx
// src/app/config/page.tsx  — pure Server Component, no "use client"
import { defaultConfig, defineConfig, mergeTheme } from '@electroplix/components/config';

const customConfig = defineConfig({
  buttons: { bgColor: '#1d4ed8', textColor: '#ffffff' },
  navigation: { sticky: true },
});

const mergedButtons = mergeTheme(
  defaultConfig.buttons as Record<string, unknown>,
  customConfig.buttons as Record<string, unknown> | undefined,
);

export default function ConfigPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <h1>Theme Config</h1>
      <pre style={{ background: '#0b0b0c', color: '#f3f4f6', padding: '1rem', borderRadius: 8 }}>
        {JSON.stringify(
          {
            customButtonBg: customConfig.buttons?.bgColor,
            mergedRadius: mergedButtons.radius,
            defaultAccent: defaultConfig.buttons?.accentColor,
          },
          null,
          2,
        )}
      </pre>
      <p>✅ Config subpath is server-safe — no client bundle imported</p>
    </main>
  );
}
```

---

## 10. Theme Configuration

### Inline Config (Simplest)

Pass a config object directly to `ElectroplixProvider`:

```tsx
'use client';
import { ElectroplixProvider } from '@electroplix/components';
import type { ElectroplixConfig } from '@electroplix/components';
import type { ReactNode } from 'react';

const config: ElectroplixConfig = {
  // Global overrides — applied to all 18 categories
  bgColor: '#0b0b0c',
  accentColor: '#8B5CF6',
  fontFamily: 'Inter, sans-serif',
  radius: 8,

  // Per-category overrides
  buttons: { bgColor: '#7c3aed', radius: 6 },
  navigation: { sticky: true },
  blog: { tagBg: '#1e1b4b', tagColor: '#a5b4fc' },
};

export default function Providers({ children }: { children: ReactNode }) {
  return <ElectroplixProvider config={config}>{children}</ElectroplixProvider>;
}
```

### File-Based Config (Type-Safe)

Use `defineConfig` from the server-safe subpath to get TypeScript autocomplete:

```ts
// electroplix.config.ts
import { defineConfig } from '@electroplix/components/config';

export default defineConfig({
  bgColor: '#0b0b0c',
  accentColor: '#8B5CF6',
  navigation: { bgColor: '#111827', sticky: true },
  buttons: { bgColor: '#7c3aed', radius: 6, fontWeight: '600' },
  forms: { inputBg: '#1f2937', inputText: '#f9fafb' },
  hero: { bgColor: '#030712' },
});
```

Then import it in your `ClientLayout`:

```tsx
'use client';
import { ElectroplixProvider } from '@electroplix/components';
import config from '../../electroplix.config';
import type { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ElectroplixProvider config={config}>{children}</ElectroplixProvider>;
}
```

### Theme Inheritance Chain

```
defaultCategoryTheme
        ↓
global BaseTheme overrides (bgColor, accentColor, radius, etc.)
        ↓
per-category overrides (buttons.bgColor, navigation.sticky, etc.)
        ↓
individual component prop overrides (passed directly at usage site)
```

---

## 11. Per-Category Hooks

Each of the 18 categories exposes a typed hook for reading the merged theme inside a Client Component:

```tsx
'use client';
import { useButtonTheme, useNavTheme } from '@electroplix/components';

export function ThemedButton({ label }: { label: string }) {
  const theme = useButtonTheme();
  return (
    <button
      style={{
        background: theme.bgColor,
        color: theme.textColor,
        borderRadius: theme.radius,
        padding: `${theme.paddingY}px ${theme.paddingX}px`,
        fontFamily: theme.fontFamily,
      }}
    >
      {label}
    </button>
  );
}
```

Available hooks:

| Hook | Category |
|:-----|:---------|
| `useNavTheme` | Navigation |
| `useHeroTheme` | Hero |
| `useButtonTheme` | Buttons |
| `useFormsTheme` | Forms |
| `useContentTheme` | Content |
| `useDataDisplayTheme` | Data Display |
| `useEcommerceTheme` | Ecommerce |
| `useListsCardsTheme` | Lists & Cards |
| `useMarketingTheme` | Marketing |
| `useMediaTheme` | Media |
| `useMiscTheme` | Miscellaneous |
| `useModalsTheme` | Modals |
| `useOnboardingTheme` | Onboarding |
| `useSearchTheme` | Search |
| `useSiteIdentityTheme` | Site Identity |
| `useSocialTheme` | Social |
| `useUserAccountsTheme` | User Accounts |
| `useBlogTheme` | Blog |

---

## 12. Icons

100+ inline SVG icons are bundled with zero additional dependencies:

```tsx
import { Icon, ICON_NAMES } from '@electroplix/components';

// Use a specific icon
<Icon name="shield" size={24} color="#8B5CF6" />

// List all available icon names (for discovery)
console.log(ICON_NAMES);
```

---

## 13. SSR Validation Script

The `examples/nextjs16-e2e` harness includes a Node.js test script you can adapt to verify your integration:

```js
// ssr-validation.mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('main entry imports without error', async () => {
  const mod = await import('@electroplix/components');
  assert.ok(mod.ElectroplixProvider, 'ElectroplixProvider exported');
  assert.ok(mod.Button, 'Button exported');
  assert.ok(mod.StaticHero, 'StaticHero exported');
  assert.ok(mod.PrimaryNav, 'PrimaryNav exported');
});

test('config subpath is server-safe', async () => {
  const config = await import('@electroplix/components/config');
  assert.ok(config.defineConfig, 'defineConfig exported');
  assert.ok(config.defaultConfig, 'defaultConfig exported');
  assert.ok(config.mergeTheme, 'mergeTheme exported');
  assert.strictEqual(typeof config.defaultConfig.buttons.bgColor, 'string');
});
```

Run with:

```bash
node --test ssr-validation.mjs
```

---

## 14. CLI Tool

The package ships with `electroplix-components` CLI for scaffolding:

```bash
# Scaffold config + provider setup files
npx @electroplix/components init

# Get import instructions for a specific component
npx @electroplix/components add PrimaryButton

# List all 159 available components
npx @electroplix/components list
```

---

## 15. AI Builder Metadata

When using AI coding tools (Cursor, Copilot, Kiro, v0, Bolt), you can feed the metadata JSON files to give the AI full context about every component's props, placement hints, and pairing suggestions:

```json
// packages/components/metadata/buttons.json (excerpt)
{
  "name": "PrimaryButton",
  "description": "Main call-to-action button with theme-aware styling",
  "props": {
    "label": { "type": "string", "required": true },
    "variant": { "type": "enum", "values": ["solid", "outline", "ghost"] }
  },
  "aiHints": {
    "placement": "body",
    "priority": 9,
    "pageTypes": ["SaaS", "Ecommerce", "Landing"],
    "pairsWellWith": ["hero.StaticHero", "content.HeadingSection"]
  }
}
```

There are 18 metadata files, one per category, in `packages/components/metadata/` (or `node_modules/@electroplix/components/metadata/` in your app).

---

## 16. Common Pitfalls

**Missing `transpilePackages`**
Without this in `next.config.mjs`, Next.js cannot process the ESM bundle and will throw a module resolution error.

**Using `ElectroplixProvider` in a Server Component**
The provider must be in a `'use client'` file. Wrap it in a `ClientLayout` or `Providers` component as shown in step 5.

**Importing hooks in Server Components**
All 18 `use*Theme` hooks require a client context. Only `@electroplix/components/config` exports (`defineConfig`, `defaultConfig`, `mergeTheme`) are safe to use in Server Components.

**Modal components in Server Components**
Modal components like `GenericModal`, `ConfirmDialog`, etc. require `onClose` and `isOpen` props that must come from React state — they must always be rendered in Client Components.

**React version mismatch**
The library requires `react@^19.0.0`. Running it alongside React 18 will cause context errors. Pin to `react@19.2.5`.

---

## Complete Project Structure (Reference)

This mirrors `examples/nextjs16-e2e`:

```
my-app/
├── src/
│   └── app/
│       ├── layout.tsx              # Server Component — root layout
│       ├── ClientLayout.tsx        # "use client" — ElectroplixProvider wrapper
│       ├── page.tsx                # Server or Client Component
│       ├── config/
│       │   └── page.tsx            # Server Component — config subpath demo
│       ├── navigation/
│       │   └── page.tsx            # "use client" — all 11 nav components
│       ├── hero/
│       │   └── page.tsx            # "use client" — all 7 hero components
│       ├── buttons/
│       │   └── page.tsx            # "use client" — all 11 button components
│       └── ... (one folder per category)
├── electroplix.config.ts           # Optional: file-based theme config
├── next.config.mjs                 # transpilePackages required
├── tsconfig.json                   # moduleResolution: "bundler"
└── package.json
```

```json
// package.json
{
  "dependencies": {
    "@electroplix/components": "^0.5.0-alpha.6",
    "next": "^16.2.6",
    "react": "19.2.5",
    "react-dom": "19.2.5"
  },
  "devDependencies": {
    "@types/node": "22.13.1",
    "@types/react": "19.0.8",
    "@types/react-dom": "19.0.3",
    "typescript": "~5.7.3"
  }
}
```

---

## Related

- [Docs.md](../Docs.md) — Full architecture reference
- [docs/nextjs-strategy.md](./nextjs-strategy.md) — Next.js SSR/RSC compatibility strategy
- [examples/nextjs16-e2e](../examples/nextjs16-e2e) — Full working reference app
- [examples/nextjs15-e2e](../examples/nextjs15-e2e) — Next.js 15 reference app
