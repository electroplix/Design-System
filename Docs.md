# Electroplix Design System Documentation

Welcome to the comprehensive documentation for the **Electroplix Design System**. This project is a modular, production-grade collection of UI components, design tokens, and utilities built to accelerate frontend development while ensuring consistency and accessibility.

---

## 🚀 Overview

Electroplix Design System provides 158+ parametric, config-driven UI components across 18 categories. It is built as an **Nx Monorepo** using **React 19**, **TypeScript**, and **Tailwind CSS**.

### Key Value Propositions
- **Parametric Configuration:** Components are driven by a centralized theme system, allowing for deep customization without code changes.
- **AI-Builder Ready:** Every component includes rich metadata (JSON) specifically designed to help AI agents understand and assemble UI layouts.
- **Zero-Dependency Core:** The library is designed to be lightweight and tree-shaking friendly.
- **Comprehensive Coverage:** From simple buttons to complex ecommerce and marketing components.

---

## 🛠 Implemented Commands

The workspace uses **pnpm** and **Nx** for task orchestration.

### General Workspace Commands
| Command | Description |
| :--- | :--- |
| `pnpm install` | Installs all workspace dependencies. |
| `pnpm build` | Builds all packages and examples (Nx cached). |
| `pnpm test` | Runs unit tests (Jest) for all projects. |
| `pnpm test:e2e` | Runs end-to-end tests (Playwright). |
| `pnpm lint` | Runs Biome linter across the codebase. |
| `pnpm format` | Formats the codebase using Biome. |
| `pnpm graph` | Visualizes the project dependency graph. |
| `pnpm release` | Triggers the Nx Release workflow (versioning & changelogs). |

### Component Development Commands
Run these from the root or navigate to `packages/components`.

| Command | Description |
| :--- | :--- |
| `pnpm nx storybook components` | Starts the Storybook development environment. |
| `pnpm nx dev vite-showcase` | Starts the Vite-based component showcase app. |
| `pnpm sync-metadata` | Synchronizes component definitions with the metadata JSON files. |
| `pnpm postbuild` | Internal script for post-bundling optimizations. |

---

## 📂 Project Structure

```text
.
├── packages/
│   └── components/          # Core Library (@electroplix/components)
│       ├── src/             # Component source code (React)
│       ├── metadata/        # AI-ready JSON definitions (18 categories)
│       ├── __tests__/       # Comprehensive test suites
│       └── scripts/         # Metadata sync and build helpers
├── examples/
│   └── vite-showcase/       # Interactive demo application
├── e2e/
│   └── components-e2e/      # Playwright end-to-end testing
├── scripts/                 # Root-level maintenance scripts
├── biome.json               # Linter & Formatter configuration
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
- **Linter:** [Biome](https://biomejs.dev/) for ultra-fast linting and formatting.
- **Tests:** 100% component coverage via Jest + React Testing Library.
- **E2E:** Playwright for cross-browser visual validation.
- **Release:** Automated changelogs and semantic versioning via Nx Release.
