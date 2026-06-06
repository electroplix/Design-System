# Contributing to Electroplix Design System

Thank you for your interest in contributing! This project follows a standard open source workflow. Please read this document carefully before submitting contributions.

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behavior to security@electroplix.com.

## Getting Started

### Prerequisites

- **Node.js** >= 24.0.0 (for development tooling)
- **pnpm** >= 9.0.0
- **Git** 2.30+

### Initial Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/Design-System.git
cd Design-System

# 3. Add the upstream remote
git remote add upstream https://github.com/electroplix/Design-System.git

# 4. Install dependencies
pnpm install

# 5. Verify the build works
pnpm build

# 6. Run the test suite
pnpm test
```

### Development Workflow

```bash
# Work on the Vite showcase (hot reload enabled)
pnpm nx dev vite-showcase

# Run tests in watch mode
pnpm test --watch

# Run linting with auto-fix
pnpm lint:fix

# Format code
pnpm format

# Verify CI checks pass locally
pnpm ci:check
```

## Branching Strategy

| Branch | Purpose |
|:-------|:--------|
| `main` | Stable, production-ready code |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation improvements |
| `refactor/*` | Code refactoring without behavior changes |
| `test/*` | Adding or improving tests |

### Creating a Feature Branch

```bash
# Sync with upstream main
git fetch upstream
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feat/your-feature-name
```

## Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). All commit messages must follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type Prefixes

| Type | When to Use |
|:-----|:------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, white-space (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `build` | Changes to build system or dependencies |
| `ci` | Changes to CI configuration |
| `chore` | Other changes that don't modify src or test files |

### Examples

```bash
feat(buttons): add loading state to PrimaryButton
fix(navigation): correct mega menu z-index layering
docs(changelog): update release notes for v0.5.0
test(forms): add validation tests for InputField
refactor(core): extract useMediaQuery into separate hook
```

### Breaking Changes

Breaking changes must include `!` after the type or a `BREAKING CHANGE:` footer:

```bash
feat!: change theme config API structure
fix(nav)!: remove deprecated sticky prop
```

## Pull Request Process

### PR Requirements

All pull requests must satisfy:

1. **Tests** — New features require unit tests (Jest + React Testing Library)
2. **Stories** — New components require Storybook stories (`.stories.tsx`)
3. **CI Passing** — All checks must pass: lint, test, build, e2e
4. **Conventional Commit** — Commit message follows the format above
5. **No Merge Conflicts** — Branch must be rebased on latest `main`

### PR Checklist

- [ ] Fork created from `main`
- [ ] Branch name follows `type/scope` convention
- [ ] Tests added/updated for changed code
- [ ] Stories added/updated for new components
- [ ] `pnpm ci:check` passes locally
- [ ] Commit message follows Conventional Commits
- [ ] Documentation updated (if applicable)

### PR Lifecycle

1. **Draft PR** — Open early to get feedback
2. **Ready for Review** — Mark as ready, request review
3. **Changes Requested** — Address feedback, push to same branch
4. **Approved** — Maintainer merges
5. **Merged** — Branch auto-deleted after merge

### PR Titles

PR titles must also follow Conventional Commits, as they are used to generate the changelog during release.

## Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific project
pnpm nx test components

# Run tests in watch mode
pnpm nx test components --watch

# Run affected tests only
pnpm affected:test
```

Tests live in `packages/components/src/__tests__/` and use Jest with React Testing Library.

### End-to-End Tests

```bash
# Start the showcase
pnpm nx dev vite-showcase

# In another terminal, run Playwright e2e
pnpm nx e2e components-e2e
```

E2E tests live in `e2e/components-e2e/` and use Playwright (Firefox).

## Component Development

### Creating a New Component

1. Create the component in `packages/components/src/components/<category>/`
2. Export from `packages/components/src/index.ts`
3. Add Storybook story in `packages/components/src/components/<category>/*.stories.tsx`
4. Add unit tests in `packages/components/src/__tests__/`
5. Update AI metadata in `packages/components/metadata/<category>.json`

### Storybook

```bash
# Start Storybook
pnpm nx storybook components

# Build static Storybook
pnpm nx build-storybook components
```

Stories are automatically wrapped with `ElectroplixProvider` via `.storybook/preview.tsx`.

## Build & Release

### Building

```bash
# Build all packages
pnpm build

# Build affected only
pnpm affected:build

# Build a specific project
pnpm nx build components
```

### Dry Run Before Release

```bash
# Preview version bump
pnpm release:dry

# Full publish dry run
pnpm publish:dry
```

### Release Process

Releases are automated via GitHub Actions on pushes to `main`. Conventional commits determine the version bump:

| Commit Type | Version Bump |
|:------------|:-------------|
| `fix:` | Patch (0.0.x) |
| `feat:` | Minor (0.x.0) |
| `feat!:` / BREAKING CHANGE | Major (x.0.0) |

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Format code
pnpm format
```

Key style rules:
- Double quotes for JSX props
- Single quotes for JavaScript strings
- Semicolons required
- 2-space indentation
- 100-character line width
- TypeScript strict mode enabled

## Reporting Issues

### Bug Reports

Include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Node version, pnpm version, package version
- Minimal reproduction (codesandbox or repo)

### Security Vulnerabilities

See [SECURITY.md](./SECURITY.md) for the disclosure process. **Do not** open public issues for security vulnerabilities.

## Questions & Support

- **Issues** — For bugs and feature requests: [GitHub Issues](https://github.com/electroplix/Design-System/issues)
- **Discussions** — For questions: [GitHub Discussions](https://github.com/electroplix/Design-System/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.