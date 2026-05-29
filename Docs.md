<p align="center">
  <img src="repo-assets/icon-96x96.png" alt="Electroplix Design System" width="64" height="64" />
</p>

<h1 align="center">Electroplix Design System — Architecture & Codebase Guide</h1>

<p align="center">
  <em>Complete technical reference for contributors, integrators, and AI agents.</em>
</p>

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Monorepo Architecture](#monorepo-architecture)
3. [Package: @electroplix/components](#package-electroplixcomponents)
4. [Component Categories (18)](#component-categories)
5. [AI Metadata Layer](#ai-metadata-layer)
6. [Theming System](#theming-system)
7. [Showcase Applications](#showcase-applications)
8. [Testing Strategy](#testing-strategy)
9. [CI/CD Pipeline](#cicd-pipeline)
10. [Release & Publishing](#release--publishing)
11. [Tooling & Configuration](#tooling--configuration)
12. [Developer Workflow](#developer-workflow)
13. [Security & Supply Chain](#security--supply-chain)

---

## System Overview

Electroplix Design System is a **production-grade component library** delivering 158 parametric, config-driven React 19 components. It is architected as an Nx monorepo with:

- **One publishable package** (`@electroplix/components`) — the core library
- **Three example apps** — Vite gallery, Next.js 15 SSR harness, Next.js 16 SSR harness
- **One E2E suite** — Playwright tests covering all 18 showcase routes
- **Automated CI/CD** — GitHub Actions for lint, test, build, E2E, SSR validation, and npm publish

### Design Principles

| Principle | Implementation |
|:----------|:--------------|
| Config-driven | All components accept a theme object; no hardcoded styles |
| Tree-shakeable | ESM-only output, named exports, no side effects |
| SSR-safe | `"use client"` directive on main entry; server-safe `/config` sub-path |
| AI-first metadata | Every component has JSON definitions with placement hints |
| Zero runtime deps | The built package has no `dependencies` — only `peerDependencies` on React |

### Tech Stack

| Layer | Technology | Version |
|:------|:-----------|:--------|
| Runtime | React | 19.2.5 |
| Build | Rollup (via @nx/rollup) | — |
| Monorepo | Nx | 22.7.2 |
| Linter/Formatter | Biome | 1.9.4 |
| Type System | TypeScript | 5.7.3 |
| Unit Tests | Jest + React Testing Library | — |
| E2E Tests | Playwright | 1.60.0 |
| SSR Validation | Next.js 15.3.8 & 16.x | — |
| Package Manager | pnpm | ≥9 |
| Node | — | ≥24 |

---

## Monorepo Architecture

```
@electroplix-ds/source (root workspace)
├── packages/
│   └── components/                # @electroplix/components (publishable)
│       ├── src/
│       │   ├── index.ts           # Main entry ("use client")
│       │   ├── config.ts          # Server-safe config entry
│       │   ├── components/        # 18 category folders
│       │   │   ├── navigation/    # 11 components
│       │   │   ├── hero/          # 7 components
│       │   │   ├── buttons/       # 11 components
│       │   │   ├── forms/         # 14 components
│       │   │   ├── content/       # 7 components
│       │   │   ├── data-display/  # 11 components
│       │   │   ├── ecommerce/     # 10 components
│       │   │   ├── lists-cards/   # 8 components
│       │   │   ├── marketing/     # 10 components
│       │   │   ├── media/         # 12 components
│       │   │   ├── miscellaneous/ # 8 components
│       │   │   ├── modals/        # 9 components
│       │   │   ├── onboarding/    # 6 components
│       │   │   ├── search/        # 6 components
│       │   │   ├── site-identity/ # 6 components
│       │   │   ├── social/        # 7 components
│       │   │   ├── user-accounts/ # 7 components
│       │   │   └── blog/          # 9 components
│       │   └── __tests__/         # Jest unit tests (172 specs, 19 suites)
│       ├── metadata/              # 18 JSON files (AI builder definitions)
│       ├── scripts/               # sync-metadata.mjs, postbuild.mjs
│       ├── dist/                  # Build output (ESM + .d.ts)
│       └── package.json           # v0.5.0-alpha.1
├── examples/
│   ├── vite-showcase/             # Interactive gallery (all 158 components)
│   │   ├── src/App.tsx            # 18 routes + custom nav header
│   │   ├── src/pages/            # 18 category pages + HomePage
│   │   ├── src/data/catalog.ts   # Component registry
│   │   └── src/data/samples.ts   # Realistic demo data
│   ├── nextjs15-e2e/              # Next.js 15.3.8 (pinned) SSR app
│   │   ├── src/app/page.tsx      # Renders all SSR-safe components
│   │   └── src/ssr-validation.mjs # Node script for CI validation
│   └── nextjs16-e2e/              # Next.js 16.x (^16.2.6) SSR app
│       └── (mirror structure)
├── e2e/
│   └── components-e2e/            # Playwright E2E tests
│       ├── src/components.spec.ts # Tests all 18 routes
│       └── playwright.config.ts   # Firefox, 127.0.0.1, 120s timeout
├── docs/
│   ├── nextjs-strategy.md         # Why both Next 15 & 16
│   └── showcase-architecture.md   # Gallery design decisions
├── .github/workflows/
│   ├── ci.yml                     # Lint → Test → Build → E2E → SSR
│   └── release.yml                # Version → Changelog → Publish
├── biome.json                     # Linter + formatter config
├── nx.json                        # Nx orchestration + release config
├── tsconfig.base.json             # Shared TS paths
└── pnpm-workspace.yaml            # Workspace packages
```

---

## Package: @electroplix/components

### Package Identity

```json
{
  "name": "@electroplix/components",
  "version": "0.5.0-alpha.1",
  "type": "module",
  "license": "MIT",
  "main": "./dist/index.esm.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts"
}
```

### Exports

| Entry Point | Directive | Use Case |
|:------------|:----------|:---------|
| `@electroplix/components` | `"use client"` | Client components in Next.js App Router |
| `@electroplix/components/config` | None (server-safe) | Theme definitions, defaults, utilities |

### Build Output

- **Format:** ESM only (no CJS)
- **Size:** ~173 kB packed tarball, ~1.3 MB unpacked
- **Files:** 179 (components + metadata + types)
- **Tree-shaking:** Fully supported via named exports

### Peer Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

---

## Component Categories

| # | Category | Count | Key Components |
|:--|:---------|:------|:---------------|
| 1 | `navigation` | 11 | PrimaryNav, SideDrawerNav, SidebarMenu, Breadcrumbs, TabNav, MegaMenu |
| 2 | `hero` | 7 | StaticHero, AnimatedHero, VideoHero, SplitHero, CarouselHero |
| 3 | `buttons` | 11 | PrimaryButton, SecondaryButton, GhostButton, IconButton, ButtonGroup |
| 4 | `forms` | 14 | TextInput, TextArea, SelectDropdown, Checkbox, RadioGroup, FormShell |
| 5 | `content` | 7 | HeadingSection, ParagraphBlock, FAQ, ArticleLayout, BlockquoteTestimonial |
| 6 | `data-display` | 11 | StatsCard, DataTable, ProgressBar, BadgeGroup, Timeline |
| 7 | `ecommerce` | 10 | ProductCard, CartDrawer, CheckoutForm, PricingTier, OrderSummary |
| 8 | `lists-cards` | 8 | CardGrid, FeatureList, ProfileCard, TestimonialCard |
| 9 | `marketing` | 10 | PricingTable, CTA, FeatureComparison, NewsletterSignup |
| 10 | `media` | 12 | ImageGallery, VideoPlayer, Carousel, AudioPlayer, LightBox |
| 11 | `miscellaneous` | 8 | Divider, Banner, Placeholder, LoadingSpinner, Tooltip |
| 12 | `modals` | 9 | GenericModal, SlideOver, ConfirmDialog, BottomSheet |
| 13 | `onboarding` | 6 | Stepper, ProductTour, WelcomeFlow, ProgressChecklist |
| 14 | `search` | 6 | CommandPalette, FilterBar, SearchInput, SearchResults |
| 15 | `site-identity` | 6 | Logo, Footer, CopyrightNotice, BrandBanner |
| 16 | `social` | 7 | ShareButtons, SocialFeed, ProfileWidget, CommentThread |
| 17 | `user-accounts` | 7 | AuthForm, ProfileSettings, RoleBadge, AvatarUpload |
| 18 | `blog` | 9 | PostPreview, AuthorCard, ReadingProgress, CategoryTag |

**Total: 158 components**

---

## AI Metadata Layer

Located in `packages/components/metadata/`, one JSON file per category. This is the **primary integration point for LLM agents and vibe-coding tools** (Cursor, Copilot, Kiro, v0, Bolt, etc.).

When a developer uses an AI assistant to build UIs with `@electroplix/components`, the agent can read these metadata files to understand:
- What components exist and what they do
- What props each component accepts (types, defaults, required)
- Where components should be placed on a page
- Which components pair well together
- Which page templates each component is designed for

This eliminates hallucination and enables accurate, context-aware code generation.

### Schema

```json
{
  "category": "buttons",
  "components": [
    {
      "name": "PrimaryButton",
      "description": "Main call-to-action button",
      "props": {
        "label": { "type": "string", "required": true },
        "onClick": { "type": "function" },
        "variant": { "type": "enum", "values": ["solid", "outline"] }
      },
      "aiHints": {
        "placement": "body",
        "priority": 9,
        "pageTypes": ["SaaS", "Ecommerce", "Landing"],
        "pairsWellWith": ["hero.StaticHero", "content.HeadingSection"]
      },
      "themeTokens": ["colors.primary", "spacing.md", "borderRadius.md"]
    }
  ]
}
```

### Sync Script

```bash
pnpm sync-metadata  # Regenerates metadata from component source
```

---

## Theming System

### Architecture

```
ElectroplixProvider (context)
  └── BaseTheme object
       ├── colors (primary, secondary, accent, neutral, semantic)
       ├── typography (fontFamily, sizes, weights, lineHeights)
       ├── spacing (scale: 4px base)
       ├── borderRadius
       ├── shadows
       └── breakpoints
```

### Usage

```tsx
import { ElectroplixProvider, PrimaryButton } from '@electroplix/components';
import { defaultTheme } from '@electroplix/components/config';

<ElectroplixProvider theme={{ ...defaultTheme, colors: { primary: '#6366f1' } }}>
  <PrimaryButton label="Get Started" />
</ElectroplixProvider>
```

---

## Showcase Applications

### Vite Gallery (`examples/vite-showcase`)

- **18 category routes** — one page per component category
- **Custom semantic nav** — avoids using library PrimaryNav (prevents test conflicts)
- **All 158 components rendered** with realistic sample data
- **Data-driven** — `catalog.ts` defines categories, `samples.ts` provides props

### Next.js SSR Harnesses

Two separate apps validate SSR/RSC compatibility:

| App | Next.js Version | Purpose |
|:----|:----------------|:--------|
| `nextjs15-e2e` | 15.3.8 (exact) | LTS track validation |
| `nextjs16-e2e` | ^16.2.6 | Latest track validation |

Each app:
- Imports and renders all SSR-safe components
- Runs `ssr-validation.mjs` in CI (builds + verifies HTTP 200)
- Excludes components requiring event handler props (e.g., GenericModal)

---

## Testing Strategy

### Unit Tests (Jest)

- **172 specs** across **19 test suites**
- Located in `packages/components/src/__tests__/`
- One test file per category
- Uses React Testing Library for DOM assertions
- Run: `pnpm test`

### E2E Tests (Playwright)

- Tests all 18 showcase routes
- Uses stable `data-category` and `data-component` selectors
- Firefox only (CI-cached browsers)
- Config: `skipInstall: true` (browsers cached in CI)
- Run: `pnpm test:e2e`

### SSR Validation

- Node scripts that build Next.js apps and verify responses
- Run: `npx nx run-many -t test:ssr`
- Validates both Next.js 15 and 16 in CI matrix

---

## CI/CD Pipeline

### `.github/workflows/ci.yml`

```
┌─────────┐
│  Lint   │  biome ci (197 files)
└────┬────┘
     │
┌────▼────┐
│  Test   │  Jest on Node 22 + 24 (matrix)
└────┬────┘
     │
┌────▼────┐
│  Build  │  Nx build (4 projects)
└────┬────┘
     │
┌────▼─────────┐
│  E2E         │  Playwright (Firefox, cached)
└────┬─────────┘
     │
┌────▼─────────┐
│  SSR Matrix  │  Next.js 15 + 16 validation
└──────────────┘
```

### `.github/workflows/release.yml`

Triggers on push to `main` when `packages/components` changes:

1. Checkout → Install → Build → Test → Lint
2. `npx nx release --skip-publish` (version + changelog + tag)
3. `npm publish --provenance --access public`

---

## Release & Publishing

### Version Strategy

- **Independent versioning** — only `@electroplix/components` is published
- **Conventional commits** drive version bumps automatically
- **Current published version:** `0.5.0-alpha.1` on [npmjs.com](https://www.npmjs.com/package/@electroplix/components)

### How a Release Happens (End-to-End)

```
Developer pushes to main (touching packages/components/src/** or package.json)
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  release.yml triggers (skips if commit msg has           │
│  "skip ci" or "chore(release)")                          │
└────┬────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  1. Checkout (full history, fetch-depth: 0)              │
│  2. pnpm install --frozen-lockfile                       │
│  3. pnpm build (all 4 projects)                          │
│  4. pnpm test (172 unit specs)                           │
│  5. pnpm lint (biome ci, 197 files)                      │
└────┬────────────────────────────────────────────────────┘
     │  All pass? ✅
     ▼
┌─────────────────────────────────────────────────────────┐
│  6. Auto-detect: first release or subsequent?            │
│     → Checks if any @electroplix/components@* tags exist │
│     → First release: uses --first-release flag           │
│     → Subsequent: uses standard nx release               │
└────┬────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  7. nx release --skip-publish                            │
│     → Reads conventional commits since last tag          │
│     → Determines bump: fix→patch, feat→minor, !→major   │
│     → Updates package.json version                       │
│     → Generates CHANGELOG.md entry                       │
│     → Commits: "chore(release): publish"                 │
│     → Creates git tag: @electroplix/components@x.y.z     │
│     → Pushes commit + tag to origin/main                 │
│     → Creates GitHub Release with changelog notes        │
└────┬────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  8. npm publish --provenance --access public             │
│     → Publishes from packages/components/                │
│     → Uses NPM_TOKEN (Automation type, 2FA bypass)       │
│     → Attaches SLSA provenance attestation               │
│     → Package live on npmjs.com                          │
└─────────────────────────────────────────────────────────┘
```

### Version Bump Rules (Conventional Commits)

| Commit Prefix | Example | Bump |
|:--------------|:--------|:-----|
| `fix(components):` | `fix(components): correct Button hover state` | Patch (0.0.x) |
| `feat(components):` | `feat(components): add DatePicker component` | Minor (0.x.0) |
| `feat(components)!:` | `feat(components)!: redesign theme API` | Major (x.0.0) |
| `BREAKING CHANGE:` in body | Any commit with this footer | Major (x.0.0) |

### What Gets Published

The npm tarball contains only:
```
dist/              # ESM bundle + TypeScript declarations
metadata/          # 18 AI-ready JSON files
cli.cjs            # CLI helper
README.md          # Package readme
CHANGELOG.md       # Auto-generated changelog
LICENSE            # MIT
SECURITY.md        # Security policy
```

Source code, tests, examples, and config files are **excluded**.

### Nx Release Configuration (`nx.json`)

```json
{
  "release": {
    "projects": ["packages/*"],
    "projectsRelationship": "independent",
    "version": {
      "preVersionCommand": "npx nx run-many -t build && npx nx run @electroplix/components:postbuild",
      "conventionalCommits": true,
      "fallbackCurrentVersionResolver": "disk"
    },
    "changelog": {
      "automaticFromRef": true,
      "projectChangelogs": {
        "createRelease": "github"
      }
    }
  }
}
```

### Pre-Push Checklist

```bash
pnpm ci:check          # ✅ 0 errors (6 pre-existing warnings)
pnpm build             # ✅ 4 projects succeed
pnpm test              # ✅ 172/172 specs pass
npx nx run-many -t test:ssr  # ✅ 2 projects pass
pnpm release:dry       # ✅ Shows 0.5.0-alpha.1
```

---

## Tooling & Configuration

### Biome (`biome.json`)

- Replaces ESLint + Prettier
- Checks 197 files in ~340ms
- Overrides for `*.config.mjs` and `examples/**/*.ts` (allows default exports)
- 6 pre-existing `useExhaustiveDependencies` warnings (in component source)

### TypeScript

- `tsconfig.base.json` at root with path aliases
- Each project has its own `tsconfig.json` extending base
- Strict mode enabled
- Declaration files emitted on build

### Nx Configuration (`nx.json`)

- **Cacheable targets:** build, test, lint, test:ssr
- **Implicit dependencies:** e2e depends on vite-showcase
- **Release config:** conventional commits, GitHub releases, independent versioning

---

## Developer Workflow

### Setup

```bash
git clone https://github.com/electroplix/Design-System.git
cd Design-System
pnpm install          # Installs all workspace deps
pnpm build            # Builds everything (cached)
```

### Daily Development

```bash
pnpm nx dev vite-showcase    # Live gallery at :5173
pnpm nx test components      # Run unit tests
pnpm lint:fix                # Auto-fix lint issues
```

### Adding a Component

1. Create component in `packages/components/src/components/<category>/`
2. Export from category `index.ts`
3. Add to main `src/index.ts` exports
4. Add test in `src/__tests__/<category>.spec.tsx`
5. Add metadata entry in `metadata/<category>.json`
6. Add demo in `examples/vite-showcase/src/pages/<Category>Page.tsx`

### Commit Convention

```
feat(components): add new DatePicker component
fix(showcase): correct CartDrawer prop usage
docs: update architecture notes
chore(biome): adjust lint rules
```

---

## Security & Supply Chain

| Measure | Implementation |
|:--------|:---------------|
| Dependency audit | `pnpm audit --audit-level=high` in CI |
| Provenance | `npm publish --provenance` for SLSA attestation |
| Lock file | `pnpm-lock.yaml` committed, `--frozen-lockfile` in CI |
| Node version | Pinned ≥24 in `engines` |
| Biome | Static analysis catches common security patterns |
| No runtime deps | Zero attack surface from transitive dependencies |

---

<p align="center">
  <sub>Last updated: 2026-05-29 · v0.5.0-alpha.1</sub>
</p>
