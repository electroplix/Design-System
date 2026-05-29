# Electroplix Design System Documentation

Welcome to the comprehensive documentation for the **Electroplix Design System**. This project is a modular, production-grade collection of UI components, design tokens, and utilities built to accelerate frontend development while ensuring consistency, accessibility, and modern framework compatibility.

---

## 🚀 Overview

Electroplix Design System provides **158+ parametric, config-driven UI components** across 18 categories. It is architected as an **Nx Monorepo** optimized for high-performance development and seamless integration with modern React frameworks.

### Key Value Propositions
- **React 19 & Next.js 15/16 Ready:** Fully compatible with the latest React features and Next.js App Router (RSC).
- **Parametric Configuration:** Components are driven by a centralized theme system, allowing for deep customization without code changes.
- **AI-Builder Ready:** Every component includes rich metadata (JSON) specifically designed to help AI agents understand and assemble UI layouts.
- **Zero-Dependency Core:** The library is designed to be lightweight and tree-shaking friendly.
- **Comprehensive Coverage:** From simple buttons to complex ecommerce and marketing components.

---

## 🖼 Viewing the Showcases

This codebase features multiple ways to interact with and validate the component library across different environments.

| Showcase | Technology | Command | Port | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Gallery** | Vite + React 19 | `pnpm nx dev vite-showcase` | 5173 | Interactive interactive gallery with all 18 categories and category pages. |
| **Next.js 15** | Next.js 15.3.8 (LTS) | `pnpm nx dev nextjs15-e2e` | 3098 | SSR validation harness for Next.js 15 track. |
| **Next.js 16** | Next.js 16.x (Latest) | `pnpm nx dev nextjs16-e2e` | 3099 | SSR validation harness for Next.js 16 track. |
| **Storybook** | Storybook 8 | `pnpm nx storybook components` | 6006 | Atomic component documentation and playground. |

---

## 🛠 Implemented Commands

The workspace uses **pnpm** and **Nx** for task orchestration. Commands can be run from the root.

### Core Development Commands
| Command | Description |
| :--- | :--- |
| `pnpm install` | Installs all workspace dependencies. |
| `pnpm build` | Builds all packages and examples (Nx cached). |
| `pnpm test` | Runs unit tests (Jest) for all projects. |
| `pnpm test:e2e` | Runs end-to-end tests (Playwright) against the Vite showcase. |
| `pnpm lint` | Runs Biome linter to check for issues. |
| `pnpm lint:fix` | Runs Biome and automatically fixes linting issues. |
| `pnpm format` | Formats the entire codebase using Biome. |
| `pnpm format:check` | Verifies that the codebase is correctly formatted. |
| `pnpm ci:check` | Strict Biome check (lint + format) for CI environments. |
| `pnpm graph` | Visualizes the project dependency graph. |
| `pnpm affected:test` | Runs tests only for projects affected by recent changes. |
| `pnpm affected:build` | Builds only projects affected by recent changes. |

### Release & DevOps
| Command | Description |
| :--- | :--- |
| `pnpm release` | Triggers the Nx Release workflow (versioning & changelogs). |
| `pnpm release:dry` | Preview versioning changes without applying them. |
| `pnpm local-registry` | Starts a local Verdaccio registry for testing npm packages. |
| `pnpm publish:dry` | Safe dry-run for package publishing. |
| `pnpm audit:deps` | Audit dependencies for high-risk security vulnerabilities. |

### Component Management
| Command | Description |
| :--- | :--- |
| `pnpm sync-metadata` | Synchronizes component definitions with metadata JSON files. |
| `pnpm postbuild` | Internal script for post-bundling optimizations (CJS/ESM). |

---

## 📂 Project Structure

```text
.
├── packages/
│   └── components/          # Core Library (@electroplix/components)
│       ├── src/             # Component source code (React 19)
│       ├── metadata/        # AI-ready JSON definitions (18 categories)
│       ├── __tests__/       # 100% Jest test coverage
│       └── scripts/         # Metadata sync and build helpers
├── examples/
│   ├── vite-showcase/       # Main interactive gallery (Vite)
│   ├── nextjs15-e2e/        # Next.js 15 SSR validation app
│   └── nextjs16-e2e/        # Next.js 16 SSR validation app
├── e2e/
│   └── components-e2e/      # Playwright cross-browser testing
├── .github/                 # CI/CD Workflows (Release & Validation)
├── biome.json               # Ultra-fast Linter & Formatter configuration
└── nx.json                  # Monorepo task configuration
```

---

## 🍱 Component Categories

The system is organized into 18 distinct categories, each with its own dedicated metadata and test suite:

1.  **Navigation:** Navbars, sidebars, breadcrumbs.
2.  **Hero:** Landing page headers, split-screens, and video heroes.
3.  **Buttons:** Primary, secondary, ghost, and icon buttons.
4.  **Forms:** Inputs, checkboxes, selects, and full form shells.
5.  **Content:** Article layouts, typography sections, and FAQs.
6.  **Data Display:** Tables, charts, stats, and badges.
7.  **Ecommerce:** Product cards, carts, and checkout flows.
8.  **Lists & Cards:** Flexible card layouts and grid systems.
9.  **Marketing:** Feature lists, CTAs, and pricing tables.
10. **Media:** Image galleries, video players, and carousels.
11. **Miscellaneous:** Dividers, banners, and placeholders.
12. **Modals:** Overlays, dialogs, and slide-overs.
13. **Onboarding:** Steppers, tooltips, and welcome flows.
14. **Search:** Command palettes and filter bars.
15. **Site Identity:** Logos, footers, and copyright notices.
16. **Social:** Share buttons, social feeds, and profiles.
17. **User Accounts:** Login/Signup forms and profile settings.
18. **Blog:** Post previews, author cards, and reading progress.

---

## 🤖 AI Builder Integration

A unique feature of this design system is the **Metadata Layer** found in `packages/components/metadata/`.

### Metadata Anatomy
Each component is defined in JSON with:
- **Properties:** Types, defaults, and descriptions for every prop.
- **Theme Tokens:** Maps component properties back to the global theme system.
- **AI Hints:**
  - `pageTypes`: Which templates this component belongs on (e.g., "SaaS", "Ecommerce").
  - `priority`: Recommended hierarchy on a page.
  - `pairsWellWith`: Suggestions for neighboring components.

Example snippet from `buttons.json`:
```json
{
  "name": "PrimaryButton",
  "aiHints": {
    "placement": "body",
    "priority": 9,
    "pairsWellWith": ["hero.StaticHero", "content.HeadingSection"]
  }
}
```

---

## 🎨 Theming System

Components consume a `BaseTheme` which can be overridden at the provider level or per component instance. Overrides are handled via the `ElectroplixProvider`.

### Entry Points
- `@electroplix/components`: The main library ("use client").
- `@electroplix/components/config`: Server-safe utilities for theme definitions and defaults.

---

## 🛡 Security & Quality
- **Linter:** [Biome](https://biomejs.dev/) for ultra-fast linting and formatting (replaces ESLint/Prettier).
- **Tests:** 100% component coverage via Jest + React Testing Library.
- **E2E:** Playwright for cross-browser visual validation.
- **Release:** Automated changelogs and semantic versioning via Nx Release.
- **SSR Safety:** Continuously validated against Next.js 15 and 16.
