# Electroplix Design System

Electroplix Design System is a modular, production-grade collection of UI components, design tokens, utilities, and tooling to accelerate consistent frontend development across Electroplix applications. Built for reliability, accessibility, theming, and performance, this repository packages reusable components and libraries for consumption in NX monorepos and downstream applications.

<!-- Badges: replace placeholders with your CI/status badges -->

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Latest Release](https://img.shields.io/badge/release-0.5.0--alpha.0-blue)]()
[![Vulnerabilities](https://img.shields.io/badge/vulnerabilities-none-brightgreen)]()

## Overview

- Purpose: Provide a single, audited source of truth for UI components, design tokens, and frontend utilities used across Electroplix products.

### Goals
- Consistency: Shared visual language and API patterns.
- Accessibility: WCAG-compliant components and accessible patterns.
- Performance: Lightweight builds and tree-shaking-friendly packages.
- Security: Dependency hygiene and security-first development.
- Reusability: Multi-package Nx-friendly structure for apps and micro-frontends.

## Contents
- `/packages/components` — UI components (React 19, 158 components across 18 categories)
- `/examples/vite-showcase` — Component gallery covering every component
- `/examples/nextjs15-e2e` — Next.js 15.3.8 SSR validation harness
- `/examples/nextjs16-e2e` — Next.js 16.x SSR validation harness
- `/e2e/components-e2e` — Playwright end-to-end tests for the showcase
- `/docs` — Architecture notes (showcase, Next.js strategy)
- `/scripts` — Build, release, and audit helpers

## Quick Start

1. Install

```bash
pnpm install
```

2. Build All

```bash
pnpm run build
```

3. Run Showcase

```bash
pnpm nx dev vite-showcase
```

4. Run Storybook

```bash
pnpm nx storybook components
```

## Core Principles
- API Stability: Semantic versioning and clear deprecation policy.
- Accessibility: Keyboard interactions, focus management, and ARIA where required.
- Theming & Tokens: All visual values come from tokens; runtime theme overrides supported.
- Small Surface Area: Components are composable and unopinionated where appropriate.
- Test Coverage: Unit tests, visual regression tests, and accessibility audits.

## Usage & Conventions
- Folder layout: each package follows `src`, `__tests__`, `stories`/`examples`, `package.json`.
- Export policy: small default bundle + named exports for tree-shaking.
- Linting & Formatting: **Biome** at workspace root.
- Types: Fully typed with TypeScript; builds emit declaration files.

## Security & Auditing
- Regular dependency scans via Dependabot and automated security checks in CI.
- Releases follow the **Nx Release** workflow with conventional commits.
- Maintain `CHANGELOG.md` for historical traceability.

## Accessibility
- Each component documents keyboard behaviors, focus management, and limitations.
- Automated a11y checks in CI.

## Contributing
- PR process: Fork → feature branch → PR with tests and Storybook demo.
- All PRs require: unit tests, Storybook story, Green CI.

Developer setup

```bash
pnpm install
pnpm nx run-many -t test
pnpm nx dev vite-showcase
```

Test & release

- Tests: `pnpm nx test`
- Lint: `pnpm nx lint`
- Build: `pnpm nx build`
- Release: `pnpm run release` (recommended tools: `changesets` or `standard-version`)
## 🚀 Publishing & Releases

The release process is automated via **Nx Release** and **GitHub Actions**, ensuring consistent versioning and high-quality artifacts.

### 1. Automated Workflow (CI/CD)
The `@electroplix/components` package is published automatically when changes are pushed to the `main` branch, provided the CI checks pass.

- **Trigger:** A push to `main` involving files in `packages/components`.
- **Process:**
  1. **Validation:** Runs `lint`, `test`, and `build`.
  2. **Versioning:** `nx release` calculates the next version based on **Conventional Commits** (e.g., `feat:`, `fix:`, `perf:`).
  3. **Artifacts:** Generates `CHANGELOG.md`, updates `package.json`, and creates a Git Tag/GitHub Release.
  4. **Publish:** Uploads the build to the **npmjs.com** registry.

### 2. Authentication (Tokens)
To enable automated publishing, the following secrets must be configured in the GitHub Repository (`Settings -> Secrets and variables -> Actions`):

- **`NPM_TOKEN`**: A **Classic "Automation"** or **"Publish"** token from [npmjs.com](https://www.npmjs.com/). This is used to authenticate the `npm publish` command.
- **`GITHUB_TOKEN`**: Automatically provided by GitHub Actions to manage releases and tags.

### 3. NPM vs. GitHub Packages
| Registry | Use Case | Installation |
| :--- | :--- | :--- |
| **NPM (Public)** | Default. Best for public libraries. | `pnpm add @electroplix/components` |
| **GitHub (Private)** | Best for internal/private team tools. | Requires `.npmrc` configuration. |

### 4. Manual Verification
Before pushing to `main`, you can preview the release impact:
- `pnpm release:dry`: Preview the version bump and changelog without making changes.
- `pnpm publish:dry`: Runs all safeguards (lint, test, build, audit) and simulates an npm publish.

### 5. Conventional Commits
We strictly follow [Conventional Commits](https://www.conventionalcommits.org/). This allows Nx to automate our versioning:
- `fix: ...` -> Triggers a **patch** release (0.0.x).
- `feat: ...` -> Triggers a **minor** release (0.x.0).
- `feat/fix!:` or `BREAKING CHANGE:` -> Triggers a **major** release (x.0.0).

---

## 🍱 Component Categories
... (rest of the file)

- License: MIT (adjust if necessary).
- Maintainers: list core team and escalation path in `MAINTAINERS.md`.
- Security policy: include `SECURITY.md` with responsible disclosure process.

## Roadmap
- **v1**: Core components, tokens, CI security pipeline.
- **v2**: Runtime design tokens, multi-theme support, component composition utilities.
- **v3**: Cross-framework adapters (Vue, Svelte) and enhanced visual regression testing.

## Examples & Recipes
Point to `/examples` for concrete pages showcasing:
- Theming and token overrides
- Form patterns and validation
- Modal & focus-trap best practices
- Performance tips and bundle analysis

## FAQ
- How to upgrade: See migration guides and deprecation timeline in `docs/`.
- How to report vulnerabilities: See `SECURITY.md` for disclosure steps.
- Support: open an issue or discussion, or contact maintainers listed in `MAINTAINERS.md`.

## Contact & Support
- Maintainers: github.com/adnan-the-coder
- Contribution welcome — link to Issues, Discussions, and PR templates.

## License
- SPDX: MIT.

---
