# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Migrated @electroplix/components package to Nx 22 monorepo.
- Created Vite showcase application.
- Established initial governance and security policies.

### Documentation

- Added `CONTRIBUTING.md` with comprehensive contribution guidelines
- Added `.npmignore` to exclude development files from npm package
- Added `.editorconfig` for consistent editor settings across the project
- Added `AUTHORS.md` to document project contributors
- Added `MAINTAINERS.md` to document maintainership and governance
- Added `.github/FUNDING.yml` for GitHub Sponsors integration
- Added `.github/dependabot.yml` for automated dependency updates
- Added `bugs` field to `package.json`
- Enabled Biome a11y and security rulesets for improved code quality
- Expanded `CHANGELOG.md` with documented changes

## [0.5.0-alpha.6] - 2025

### Added

- 158 production-grade React 19 components across 18 categories
- AI-builder metadata layer with component definitions for LLM agents
- CLI tool (`electroplix-components`) for component scaffolding and discovery
- Full TypeScript support with strict mode
- Storybook 8 configuration with stories for all 18 categories
- Comprehensive test suite with 172 unit specs (Jest + React Testing Library)
- Playwright E2E tests for all 18 category pages

### Components

| Category | Components |
|:---------|:----------|
| Navigation | 11 components |
| Hero | 7 components |
| Buttons | 11 components |
| Forms | 14 components |
| Content | 7 components |
| Data Display | 11 components |
| Ecommerce | 10 components |
| Lists & Cards | 8 components |
| Marketing | 10 components |
| Media | 12 components |
| Miscellaneous | 8 components |
| Modals | 9 components |
| Onboarding | 6 components |
| Search | 6 components |
| Site Identity | 6 components |
| Social | 7 components |
| User Accounts | 7 components |
| Blog | 9 components |

### Infrastructure

- Automated CI/CD pipeline with GitHub Actions
- Conventional commits with automated versioning via Nx Release
- npm publish with provenance for supply chain integrity
- SSR validation against Next.js 15.3.8 and Next.js 16.x
- Biome ultra-fast linting and formatting
