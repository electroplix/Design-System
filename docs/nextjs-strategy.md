# Next.js Compatibility Strategy

`@electroplix/components` ships as a React 19 ESM library and is intended to
work seamlessly across the two Next.js major versions teams currently
deploy: **15.x** and **16.x**.

To prove this contract, the repo carries two parallel SSR validation
applications under `examples/`:

| App                          | Next.js version | Port | Purpose                              |
| ---------------------------- | --------------- | ---- | ------------------------------------ |
| `examples/nextjs15-e2e`      | `15.3.8` (exact pin) | 3098 | LTS-track validation                 |
| `examples/nextjs16-e2e`      | `^16.2.6`       | 3099 | Latest stable validation             |

## Why both?

A design system that publishes to npm is consumed by teams on different
upgrade cadences. A regression that ships fine on Next.js 16 may still
break a downstream production app pinned to a 15.x release — and vice
versa, since Next.js 16 introduced changes around App Router caching,
async APIs, and React Server Component error handling.

We chose **two minimal apps over one** for these reasons:

- **Cost is low.** Each app is roughly 200 LOC of TypeScript and adds
  maybe 30 seconds to CI.
- **Bisecting is trivial.** A failure is automatically scoped to a single
  major version of Next.js, so we don't have to guess which side broke.
- **Pinned LTS is documented.** `15.3.8` is exact-pinned to match the
  reference deployment used by downstream consumers, while `^16.2.6` lets
  patch and minor upgrades flow through normally.
- **Future-proofing.** When Next.js 17 ships we can add a
  `nextjs17-e2e` app the same way.

## What each app exercises

Every app has the same coverage matrix:

- `src/app/page.tsx` — A Server Component page that renders one
  representative component from each of the 18 library categories.
  If any component touches `window`/`document` at import or render time,
  `next build` will fail with a clear error.

- `src/app/config/page.tsx` — Imports from `@electroplix/components/config`
  in a Server Component. Validates the server-safe entry point that
  consumers use for token configuration in `app/layout.tsx`,
  middleware, route handlers, etc.

- `src/ssr-validation.mjs` — A `node --test` script that imports the
  package in a pure Node.js context. Catches accidental top-level
  browser-global access that ESM module evaluation would otherwise
  surface.

## CI matrix

`.github/workflows/ci.yml` runs `nextjs-ssr` as a build matrix:

```yaml
strategy:
  matrix:
    app: [nextjs15-e2e, nextjs16-e2e]
```

Each matrix leg runs:

1. `pnpm install --frozen-lockfile`
2. `pnpm build` (publishes the library to the workspace)
3. `npx nx build <app>` (Next.js production build)
4. `npx nx test:ssr <app>` (node --test SSR import checks)

A failure in either leg blocks the merge.

## When to bump versions

- **`nextjs15-e2e`**: bump only when a downstream consumer reports a
  regression on a specific 15.x patch. We treat 15.3.8 as the LTS
  reference.
- **`nextjs16-e2e`**: bump alongside Next.js 16.x patch releases via
  Dependabot or Renovate. The `^16.2.6` range floats automatically.

When Next.js 17 ships, copy `nextjs16-e2e` to `nextjs17-e2e`, update the
`next` dependency, and add the app name to the matrix in `ci.yml`.

## Local development

```bash
# Build the library once
pnpm build

# Run either example app
pnpm nx dev nextjs15-e2e   # http://localhost:3098
pnpm nx dev nextjs16-e2e   # http://localhost:3099

# Run SSR validation tests for either
pnpm nx test:ssr nextjs15-e2e
pnpm nx test:ssr nextjs16-e2e
```
