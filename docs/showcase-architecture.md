# Vite Showcase — Architecture

The Vite showcase at `examples/vite-showcase` is the canonical visual
gallery for `@electroplix/components`. Every component in the library
gets at least one realistic demo here.

## Goals

1. **Coverage** — All 158 components across 18 categories are reachable
   via the showcase navigation.
2. **Realism** — Each demo uses sample data (`src/data/samples.ts`)
   that resembles what a real product would pass.
3. **Stability** — Every component demo is wrapped in a
   `<ComponentDemo>` element with a `data-component` attribute, and
   every category page has a `data-category` attribute. Playwright
   tests rely on these stable selectors instead of brittle text or
   count assertions.

## Directory layout

```
examples/vite-showcase/
├── index.html
├── vite.config.ts                   # alias @electroplix/components → src
├── src/
│   ├── main.tsx                     # React 19 root
│   ├── App.tsx                      # 18 routes + sticky nav
│   ├── components/
│   │   └── ShowcaseLayout.tsx       # CategoryPage + ComponentDemo wrappers
│   ├── data/
│   │   ├── catalog.ts               # All 18 categories + component lists
│   │   └── samples.ts               # Reusable realistic sample data
│   └── pages/
│       ├── HomePage.tsx             # Category grid + StaticHero
│       ├── BlogPage.tsx
│       ├── ButtonsPage.tsx
│       ├── ContentPage.tsx
│       ├── DataDisplayPage.tsx
│       ├── EcommercePage.tsx
│       ├── FormsPage.tsx
│       ├── HeroPage.tsx
│       ├── ListsCardsPage.tsx
│       ├── MarketingPage.tsx
│       ├── MediaPage.tsx
│       ├── MiscellaneousPage.tsx
│       ├── ModalsPage.tsx
│       ├── NavigationPage.tsx
│       ├── OnboardingPage.tsx
│       ├── SearchPage.tsx
│       ├── SiteIdentityPage.tsx
│       ├── SocialPage.tsx
│       └── UserAccountsPage.tsx
```

## Stable test selectors

Playwright tests in `e2e/components-e2e/src/components.spec.ts` rely on:

- `[data-test="showcase-header"]` — the sticky navigation chrome
- `[data-test="category-grid"]` — the category grid on the home page
- `[data-category-link="<slug>"]` — a category link on the home page
- `[data-category="<slug>"]` — the root of a category page
- `[data-component="<Name>"]` — an individual component demo wrapper

These attributes are added by `<CategoryPage>` and `<ComponentDemo>` in
`src/components/ShowcaseLayout.tsx`. As long as you compose new pages
with those wrappers, your demos will be discoverable by tests
automatically.

## Running locally

```bash
pnpm install
pnpm nx dev vite-showcase     # http://localhost:5173
pnpm nx build vite-showcase   # production build to dist/
```

## Running the e2e suite locally

Playwright browsers must be installed for your platform:

```bash
npx playwright install --with-deps firefox
pnpm nx e2e components-e2e --project=firefox
```

In CI, browsers are cached at `~/.cache/ms-playwright` keyed on the
Playwright version pin (`PLAYWRIGHT_VERSION` in `ci.yml`).

## Why a custom showcase header instead of `<PrimaryNav>`?

Earlier iterations used `<PrimaryNav>` as the showcase chrome on every
page. That created two problems:

1. The Buttons demo page had a button-count assertion that conflicted
   with the hidden hamburger button rendered by `<PrimaryNav>`.
2. `<PrimaryNav>` itself is one of the components we want to demo on
   the Navigation page — having it in the chrome muddied that demo.

The showcase now uses a plain semantic `<nav>` element for global
navigation, so each component category remains demoable in isolation
without leaking buttons or links into other pages' assertions.
