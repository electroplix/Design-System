# Electroplix Design System

Electroplix Design System is a modular, production-grade collection of UI components, design tokens, utilities, and tooling to accelerate consistent frontend development across Electroplix applications. Built for reliability, accessibility, theming, and performance, this repository packages reusable components and libraries for consumption in NX monorepos and downstream applications.

<!-- Badges: replace placeholders with your CI/status badges -->

[![Build Status](https://img.shields.io/badge/build-pending-lightgray)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Latest Release](https://img.shields.io/badge/release-0.0.0-lightgray)]()
[![Vulnerabilities](https://img.shields.io/badge/vulnerabilities-none-brightgreen)]()

## Overview

- Purpose: Provide a single, audited source of truth for UI components, design tokens, and frontend utilities used across Electroplix products.

### Goals
- Consistency: Shared visual language and API patterns.
- Accessibility: WCAG-compliant components and accessible patterns.
- Performance: Lightweight builds and tree-shaking-friendly packages.
- Security: Dependency hygiene and security-first development.
- Reusability: Multi-package NX-friendly structure for apps and micro-frontends.

## Contents
- `/packages/components` — UI components (React by default; adapters optional)
- `/packages/tokens` — Design tokens (colors, spacing, typography, shadows)
- `/packages/styles` — Theme utilities, CSS-in-JS or Tailwind integrations
- `/packages/utils` — Well-tested utilities (forms, formatters, i18n helpers)
- `/docs` — Usage guides, accessibility checklist, contribution docs
- `/examples` — Tiny example apps and integration demos (Next.js, Vite)
- `/scripts` — Build, release, and audit helpers

## Quick Start

1. Install

- npm:

```bash
npm install @electroplix/components @electroplix/tokens
```

- pnpm:

```bash
pnpm add @electroplix/components @electroplix/tokens
```

2. Import (example — React)

```js
import { Button } from '@electroplix/components';
import { ThemeProvider } from '@electroplix/styles';
```

3. Run local examples (monorepo root)

```bash
pnpm install
pnpm --filter examples dev
```

## Core Principles
- API Stability: Semantic versioning and clear deprecation policy.
- Accessibility: Keyboard interactions, focus management, and ARIA where required.
- Theming & Tokens: All visual values come from tokens; runtime theme overrides supported.
- Small Surface Area: Components are composable and unopinionated where appropriate.
- Test Coverage: Unit tests, visual regression tests, and accessibility audits.

## Usage & Conventions
- Folder layout: each package follows `src`, `tests`, `stories`/`examples`, `package.json`.
- Export policy: small default bundle + named exports for tree-shaking.
- Linting & Formatting: ESLint + Prettier at workspace root.
- Types: Fully typed with TypeScript; builds emit declaration files.

## Security & Auditing
- Regular dependency scans via Dependabot and automated security checks in CI.
- All incoming dependencies require an approval step; critical deps are pinned and audited.
- Contribution checklist includes a security review and dependency impact note.
- Releases are signed; changelogs are required (maintain `CHANGELOG.md`).

## Accessibility
- Each component documents keyboard behaviors, focus management, and limitations.
- Automated a11y checks in CI (axe-core + Storybook integration).
- Accessibility testing matrix for screen readers and major browsers.

## Contributing
- Code of Conduct: include `CODE_OF_CONDUCT.md`.

PR process
- Fork → feature branch → PR with tests and Storybook demo.
- All PRs require: unit tests, Storybook story, accessibility checks, CI green.

Developer setup

```bash
pnpm install
pnpm nx run-many --target=test --all
pnpm nx run examples:dev
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
