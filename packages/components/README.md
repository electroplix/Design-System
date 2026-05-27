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
- `/packages/components` — UI components (React 19)
- `/examples/vite-showcase` — Gallery app for component validation
- `/e2e/components-e2e` — Playwright end-to-end tests
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

## Versioning & Release
- Semantic Versioning (MAJOR.MINOR.PATCH).
- Automated changelog generation with `changesets` or `standard-version`.
- Releases signed and published to npm under `@electroplix/*`.

## Governance & Licensing
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
