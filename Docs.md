<p align="center">
  <img src="repo-assets/icon-96x96.png" alt="Electroplix Design System" width="96" height="96" />
</p>

<h1 align="center">Electroplix Design System</h1>

<p align="center">
  <strong>159 production-grade React 19 components · 18 categories · AI-builder ready</strong>
</p>

<p align="center">
  <!-- <a href="https://github.com/electroplix/Design-System/actions"><img src="https://img.shields.io/github/actions/workflow/status/electroplix/Design-System/ci.yml?branch=main&style=flat-square&label=CI" alt="CI"></a> -->
  <a href="https://github.com/electroplix/Design-System/actions">
    <img src="https://img.shields.io/badge/CI-passing-brightgreen?style=flat-square" alt="CI">
  </a>
  <a href="https://www.npmjs.com/package/@electroplix/components"><img src="https://img.shields.io/npm/v/@electroplix/components?style=flat-square&color=blue" alt="npm"></a>
  <a href="https://github.com/electroplix/Design-System/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/react-19-blue?style=flat-square" alt="React 19">
  <img src="https://img.shields.io/badge/next.js-15%20%7C%2016-black?style=flat-square" alt="Next.js">
  <img src="https://img.shields.io/badge/node-%E2%89%A524-brightgreen?style=flat-square" alt="Node">
</p>

---

## Overview

Electroplix Design System is a modular, open-source collection of **parametric UI components**, design tokens, and tooling built for modern React applications. Every component is config-driven, tree-shakeable, and validated against **Next.js 15.3.8** and **Next.js 16.x** for full SSR/RSC compatibility.

```bash
pnpm add @electroplix/components
```

---

## Highlights

| Feature | Details |
|:--------|:--------|
| **159 Components** | Across 18 categories — navigation, hero, buttons, forms, content, data-display, ecommerce, lists-cards, marketing, media, miscellaneous, modals, onboarding, search, site-identity, social, user-accounts, blog |
| **React 19** | Built on the latest React with full concurrent features support |
| **Next.js 15 & 16** | SSR-validated with dedicated harness apps for both major versions |
| **AI-Builder Metadata** | 18 JSON files with placement hints, pairing suggestions, and page-type mappings — designed for LLM agents and vibe-coding tools |
| **Zero Runtime Dependencies** | All icons are inline SVG (~173 kB packed ESM, `sideEffects: false`, full tree-shaking) |
| **TypeScript** | Complete type definitions emitted with every build (strict mode) |
| **Biome** | Ultra-fast linting & formatting — no ESLint/Prettier overhead |
| **Nx Monorepo** | Cached builds, affected-only testing, dependency graph visualization |
| **CLI** | `electroplix-components` CLI — scaffold, add, and list components |
| **Storybook** | Stories for all 18 categories with `ElectroplixProvider` decorator |

---

## Quick Start

```bash
# Prerequisites: Node ≥24 (development) or ≥18 (consuming library), pnpm ≥9

# 1. Clone & install
git clone https://github.com/electroplix/Design-System.git
cd Design-System
pnpm install

# 2. Build everything
pnpm build

# 3. Launch the interactive showcase
pnpm nx dev vite-showcase
# → http://localhost:5173

# 4. Run tests
pnpm test
```

> **Note:** Developing the monorepo requires **Node ≥24** (for Nx and build tooling). Consuming `@electroplix/components` as a dependency only requires **Node ≥18**.

---

## Repository Structure

```
├── packages/components/            # @electroplix/components — the core library
│   ├── src/
│   │   ├── core/                   # Types, provider, config, icons, utils
│   │   │   ├── types.ts            # 18 category theme interfaces + BaseTheme
│   │   │   ├── config.ts           # defineConfig(), mergeTheme(), 18 defaults
│   │   │   ├── provider.tsx        # ElectroplixProvider + 18 per-category hooks
│   │   │   ├── icons.tsx           # 100+ inline SVG icons (zero-dependency)
│   │   │   └── utils.ts            # sx, cn, money, validate, hooks, etc.
│   │   ├── components/             # 159 components across 18 category folders
│   │   ├── __tests__/              # 18 spec files + test-utils.tsx
│   │   └── index.ts                # Public barrel export
│   ├── metadata/                   # 18 AI-ready JSON definitions (one per category)
│   ├── scripts/                    # postbuild.cjs, sync-metadata.mjs
│   ├── .storybook/                 # Storybook 8 config (main.ts, preview.tsx)
│   ├── cli.cjs                     # electropix-components CLI
│   ├── rollup.config.cjs           # Rollup bundler config
│   ├── project.json                # Nx project targets
│   ├── jest.config.ts              # Jest test config
│   └── tsconfig.lib.json           # Library build config
├── examples/
│   ├── vite-showcase/              # Full interactive gallery (all 159 components)
│   ├── nextjs15-e2e/               # Next.js 15.3.8 SSR validation app
│   └── nextjs16-e2e/               # Next.js 16.x SSR validation app
├── e2e/components-e2e/             # Playwright end-to-end tests (18 routes)
├── docs/                           # Architecture decision records (ADRs)
│   ├── showcase-architecture.md
│   └── nextjs-strategy.md
├── scripts/                        # Root-level utility scripts
│   ├── publish-safeguard.sh        # Pre-publish validation checks
│   └── local-registry.sh           # Verdaccio local npm registry
├── .github/workflows/
│   ├── ci.yml                      # CI pipeline (5 jobs)
│   └── release.yml                 # Automated release + npm publish
├── .verdaccio/                     # Local npm registry config
├── biome.json                      # Linter & formatter (Biome 1.9.4)
├── nx.json                         # Monorepo orchestration (Nx 22.7)
├── pnpm-workspace.yaml             # Workspace definition
├── tsconfig.base.json              # Shared TypeScript config
├── jest.config.ts                  # Root Jest multi-project config
├── jest.preset.js                  # Nx Jest preset
├── CHANGELOG.md                    # Release history
├── CODE_OF_CONDUCT.md              # Contributor Covenant v2.1
├── SECURITY.md                     # Security policy
└── LICENSE                         # MIT
```

---

## Showcases

| App | Stack | Command | Port |
|:----|:------|:--------|:-----|
| **Gallery** | Vite + React 19 | `pnpm nx dev vite-showcase` | 5173 |
| **Next.js 15** | Next.js 15.3.8 | `pnpm nx dev nextjs15-e2e` | 3098 |
| **Next.js 16** | Next.js 16.x | `pnpm nx dev nextjs16-e2e` | 3099 |
| **Storybook** | Storybook 8 | `pnpm nx storybook components` | 6006 |

---

## Commands

| Command | Description |
|:--------|:------------|
| `pnpm build` | Build all packages (Nx cached) |
| `pnpm test` | Unit tests (Jest, 172 specs) |
| `pnpm test:e2e` | Playwright E2E against showcase |
| `pnpm lint` | Biome lint check |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format codebase |
| `pnpm format:check` | Check formatting (no-write) |
| `pnpm ci:check` | Strict CI validation (lint + format) |
| `pnpm audit:deps` | Security audit (`--audit-level=high`) |
| `pnpm affected:test` | Affected-only test run |
| `pnpm affected:build` | Affected-only build run |
| `pnpm release` | Version + changelog + GitHub Release |
| `pnpm release:dry` | Preview next version & changelog |
| `pnpm publish:dry` | Full publish dry-run with safeguards |
| `pnpm local-registry` | Start local Verdaccio registry |
| `pnpm sync-metadata` | Sync metadata JSON to API |
| `pnpm graph` | Visualize dependency graph |

---

## CLI Tool

`@electroplix/components` ships with a CLI (`electroplix-components`) for scaffolding and discovery:

```bash
npx @electroplix/components init    # Scaffold config + provider setup
npx @electroplix/components add <name>  # Show install/import instructions
npx @electroplix/components list    # List all 159 available components
```

---

## Core Architecture

### Module Structure

The library has two entry points:

| Entry | Import Path | Purpose |
|:------|:------------|:--------|
| **Client** | `@electroplix/components` | All components + provider + hooks + icons (`"use client"`) |
| **Server-safe** | `@electroplix/components/config` | Theme utilities only (no React, safe for RSC/SSR) |

```ts
// Client-side (components, provider, hooks)
import { ElectroplixProvider, PrimaryButton, Icon } from "@electroplix/components";

// Server-safe config utilities
import { defineConfig, defaultConfig, mergeTheme } from "@electroplix/components/config";
```

The library also exposes a custom export condition `@electroplix-ds/source` for direct source-level imports within the monorepo.

### Core Module (`src/core/`)

| File | Exports | Description |
|:-----|:--------|:------------|
| `types.ts` | `BaseTheme`, 18 per-category themes, `ElectroplixConfig`, utilities | All TypeScript type definitions |
| `config.ts` | `defineConfig()`, `mergeTheme()`, 18 default theme objects | Default values and theme utilities |
| `provider.tsx` | `ElectroplixProvider`, `useElectroplixConfig()`, 18 per-category hooks | React context for theme injection |
| `icons.tsx` | `Icon` component, `ICON_NAMES` constant, 100+ inline SVGs | Zero-dependency icon library |
| `utils.ts` | `sx`, `cn`, `money`, `truncate`, `timeAgo`, `validate`, `useFocusTrap`, `useClickOutside`, `useMediaQuery`, `useDebounce` | Shared utilities |

### Export Map

```json
{
  "sideEffects": false,
  "main": "./dist/index.esm.js",
  "module": "./dist/index.esm.js",
  "exports": {
    ".": {
      "@electroplix-ds/source": "./src/index.ts",
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "default": "./dist/index.esm.js"
    },
    "./config": {
      "types": "./dist/config.d.ts",
      "import": "./dist/config.esm.js",
      "default": "./dist/config.esm.js"
    }
  }
}
```

### Build Pipeline

```
TypeScript source → Babel (@nx/react/babel) → Rollup (@nx/rollup) → ESM bundle
                                                                    ↓
                                                     postbuild.cjs adds "use client"
                                                     postbuild.cjs generates config.esm.js
                                                     postbuild.cjs generates config.d.ts
```

### Published Package Contents

The npm package includes: `dist/`, `cli.cjs`, `metadata/`, `README.md`, `CHANGELOG.md`, `LICENSE`, `SECURITY.md`.

---

## Theming

Components consume a `BaseTheme` via `ElectroplixProvider`. The theme system supports **global overrides** that cascade to all 18 categories, plus **per-category overrides** for fine-grained control.

### Basic Usage

```tsx
import { ElectroplixProvider } from "@electroplix/components";
import type { ElectroplixConfig } from "@electroplix/components";

const config: ElectroplixConfig = {
  // Global base overrides (applied to all categories)
  bgColor: "#0b0b0c",
  accentColor: "#8B5CF6",

  // Per-category overrides (merged on top of global base)
  buttons: { bgColor: "#2563eb", radius: 8 },
  navigation: { sticky: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ElectroplixProvider config={config}>{children}</ElectroplixProvider>;
}
```

### Type-Safe Config Authoring

```ts
// electroplix.config.ts
import { defineConfig } from "@electroplix/components/config";

export default defineConfig({
  navigation: { bgColor: "#22223B", sticky: true },
  buttons:    { bgColor: "#C9ADA7", radius: 12 },
});
```

### Theme Inheritance

```
defaultCategoryTheme → global BaseTheme overrides → per-category overrides
         ↓                        ↓                         ↓
    (default values)       (applied to all)       (category-specific)
```

### Per-Category Hooks

Each category exposes a dedicated hook for reading its merged theme:

```tsx
import { useButtonTheme } from "@electroplix/components";

function MyButton() {
  const theme = useButtonTheme();
  return <button style={{ background: theme.bgColor, color: theme.textColor }} />;
}
```

Available hooks: `useNavTheme`, `useHeroTheme`, `useButtonTheme`, `useFormsTheme`, `useContentTheme`, `useDataDisplayTheme`, `useEcommerceTheme`, `useListsCardsTheme`, `useMarketingTheme`, `useMediaTheme`, `useMiscTheme`, `useModalsTheme`, `useOnboardingTheme`, `useSearchTheme`, `useSiteIdentityTheme`, `useSocialTheme`, `useUserAccountsTheme`, `useBlogTheme`.

---

## Publishing & Releases

Automated via **Nx Release** + **GitHub Actions**. On every push to `main` that touches `packages/components/src/**` or `packages/components/package.json`:

1. **Validate** — lint, test, build
2. **Version** — conventional commits determine semver bump
3. **Changelog** — auto-generated from commit history
4. **Tag & Release** — GitHub Release with full notes
5. **Publish** — `npm publish --provenance --access public`


### Conventional Commits

| Prefix | Release |
|:-------|:--------|
| `fix:` | Patch (0.0.x) |
| `feat:` | Minor (0.x.0) |
| `feat!:` / `BREAKING CHANGE:` | Major (x.0.0) |

### Manual Verification

```bash
pnpm release:dry    # Preview version bump
pnpm publish:dry    # Full safeguard dry-run (lint → test → build → audit → pack)
```

---

## Component Categories

| # | Category | Count | Components |
|:--|:---------|:-----:|:-----------|
| 1 | Navigation | 11 | PrimaryNav, MegaMenu, SidebarMenu, Tabs, Breadcrumbs, Pagination, Stepper, AnchorLinks, SideDrawerNav, LanguageSelector, Footer |
| 2 | Hero | 7 | HeroShell, StaticHero, SplitHero, VideoHeaderHero, CarouselHero, CTAOverlayHero, PatternedHero |
| 3 | Buttons | 11 | PrimaryButton, SecondaryButton, TertiaryButton, IconButton, Button, FloatingActionButton, ButtonGroup, LoadingButton, ShareButton, DownloadButton, PrintButton |
| 4 | Forms | 14 | FormShell, InputField, TextAreaField, SelectDropdown, RadioGroup, ToggleSwitch, DateTimePicker, FileUploader, ContactForm, NewsletterSignup, MultiStepWizard, Captcha, AddressAutocomplete, ValidationWrapper |
| 5 | Content | 7 | BlockquoteTestimonial, CalloutBox, HeadingSection, InlineCodeText, ParagraphBlock, RichMarkdown, TeamGrid |
| 6 | Data Display | 11 | Badge, BadgeGroup, BarChart, CalendarGrid, DataTable, LineChart, PieChart, ProgressBar, RatingStars, Sparkline, Timeline |
| 7 | Ecommerce | 10 | CartDrawer, MiniCartPanel, OrderSummary, ProductCard, ProductGrid, ProductDetail, VariantSelector, QuickAddButton, WishlistButton, PaymentButtons |
| 8 | Lists & Cards | 8 | BlockShell, Accordion, GenericList, FeatureGrid, ItemCardGrid, PricingTable, SortableTable, LCTimeline |
| 9 | Marketing | 10 | ComparisonTable, CountdownTimer, FeatureHighlights, LeadMagnetGate, MarketingHeroBlock, PromoPopup, TestimonialsCarousel, TrustBadges, StatsCounter, HowItWorks |
| 10 | Media | 12 | MediaShell, ResponsiveVideo, AudioEmbed, AvatarProfile, IconGrid, ImageGallery, LightboxGallery, MasonryGrid, PolaroidImage, LottieOrSVG, ImageCropperUploader, MapEmbed |
| 11 | Miscellaneous | 8 | CookieConsent, ScrollProgressBar, ThemeToggle, EmptyState, AppInstallBanner, DownloadBlock, InlineCode, RSSFeed |
| 12 | Modals | 9 | OverlayBase, GenericModal, ConfirmDialog, FormDialog, LoadingOverlay, Tooltip, ToastBanners, CookieNotice, WelcomePopup |
| 13 | Onboarding | 6 | FAQAccordion, OnboardingWizard, ProductTour, TooltipHelp, SupportChat, ContactSupportBlock |
| 14 | Search | 6 | SiteSearchBar, AutoSuggest, FacetFilters, SearchResultCard, SearchResults, SearchEmptyState |
| 15 | Site Identity | 6 | LogoDisplay, AnimatedBrandMark, Taglines, BrandingShell, BrandIconGrid, FaviconUploader |
| 16 | Social | 7 | SocialShareBar, SocialLoginButtons, SocialEmbed, FollowLike, ReactionsBar, CommentsBox, ReviewsForm |
| 17 | User Accounts | 7 | AuthForm, PasswordReset, MultiFactorAuthInput, ProfileOverview, ProfileSettings, AccountSettings, RoleBadge |
| 18 | Blog | 9 | BlogCard, AuthorByline, TagList, BlogBadge, ReadingBar, ArticleRenderer, RelatedPosts, ArchiveList, CommentsSection |

---

## AI Builder Integration

Electroplix components ship with **18 metadata JSON files** (`packages/components/metadata/`) — one per category — specifically designed for **LLM agents and vibe-coding tools**. When developers use AI assistants (Cursor, Copilot, Kiro, v0, Bolt, etc.) to build UIs with `@electroplix/components`, the metadata gives the model full context about every component — props, placement logic, page-type affinity, and pairing suggestions — enabling accurate, context-aware code generation without hallucination.

```json
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

> **For AI agents:** Import all 18 metadata JSON files to get a structured overview of all 159 components, their props, and how they compose together. This is the recommended way to understand the library programmatically.

---

## Storybook

All 18 categories have Storybook stories (`.stories.tsx` files) configured with `@storybook/react-vite` and `@storybook/addon-essentials`. Stories are wrapped in `ElectroplixProvider` via the global decorator in `packages/components/.storybook/preview.tsx`.

```bash
pnpm nx storybook components        # → http://localhost:6006
pnpm nx build-storybook components   # → dist/storybook/
```

---

## Testing

### Unit Tests (Jest + React Testing Library)

- **172 specs** across 18 category test files + 1 core test file
- All components rendered inside `<TestWrapper>` (provides `ElectroplixProvider` context)
- Located in `packages/components/src/__tests__/`

```bash
pnpm test   # nx run-many -t test
```

### End-to-End Tests (Playwright)

- Firefox-only, runs against the Vite showcase dev server
- Covers all 18 category pages (heading rendering, demo selectors, routing)
- Console error detection across all routes
- 2 retries in CI, screenshots + video on failure

```bash
pnpm test:e2e   # nx run-many -t e2e
```

### SSR Validation

Node.js `--test` scripts verify server-side imports of `@electroplix/components` and `@electroplix/components/config` across both Next.js 15 and 16 target apps.

---

## Quality & Security

- **Linter:** Biome 1.9.4 (ultra-fast, replaces ESLint + Prettier)
- **Tests:** 172 unit specs (Jest 29 + React Testing Library 16)
- **E2E:** Playwright 1.60 with Firefox (CI-cached browsers)
- **SSR:** Continuously validated against Next.js 15.3.8 & 16.x
- **Deps:** `pnpm audit --audit-level=high` in CI
- **Provenance:** npm publish with `--provenance` (OIDC-based attestation)
- **Bundle:** ~173 kB packed ESM, `sideEffects: false`, fully tree-shakeable
- **Zero runtime deps:** All icons are inline SVG; peer deps only (`react`, `react-dom`)

---

## Roadmap

| Version | Focus |
|:--------|:------|
| **v0.5.0-alpha** (current) | Core components, Nx monorepo, CI/CD, SSR validation |
| **v1.0** | Stable API, design tokens, full Storybook docs, a11y polish |
| **v2.0** | Runtime theme switching, composition utilities, React Native |
| **v3.0** | Cross-framework adapters (Vue, Svelte), visual regression |

---

## Contributing

1. Fork → feature branch → PR with tests
2. All PRs require: unit tests, green CI, conventional commit message
3. See this document for architecture details

```bash
pnpm install
pnpm test
pnpm nx dev vite-showcase
```

---

## License

[MIT](./LICENSE) © [Adnan](https://github.com/adnan-the-coder)

---

<p align="center">
  <sub>Built with ❤️ by the Electroplix team</sub>
</p>
