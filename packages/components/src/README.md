# @electroplix/components

> Parametric, config-driven React UI components. **153 components** across **18 categories** — zero external CSS, zero icon dependencies, fully themeable via a single provider.

[![npm](https://img.shields.io/npm/v/@electroplix/components)](https://www.npmjs.com/package/@electroplix/components)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Component Categories](#component-categories)
- [Icon System](#icon-system)
- [CLI](#cli)
- [Utilities](#utilities)
- [API Reference](#api-reference)
- [Testing](#testing)

---

## Installation

```bash
npm install @electroplix/components
# or
pnpm add @electroplix/components
# or
yarn add @electroplix/components
```

**Peer dependencies:** `react >=18.0.0` and `react-dom >=18.0.0`

---

## Quick Start

### 1. Scaffold your project

```bash
npx @electroplix/components init
```

This creates two files:

- **`electroplix.config.ts`** — your global theme configuration
- **`components/providers.tsx`** — a `"use client"` wrapper for the provider

### 2. Update your layout

Your root layout stays as a **Server Component** — import the client-side `Providers` wrapper:

```tsx
// app/layout.tsx — Server Component (no "use client" needed here)
import { Providers } from "../components/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

> **Why a separate `providers.tsx`?**
> `ElectroplixProvider` uses React Context (`createContext`), which only works in Client Components.
> By isolating it in a `"use client"` file, your layout stays a Server Component so metadata,
> static content, and other server-only features continue to work.

### 3. Use components in client pages

```tsx
"use client";
import {
  PrimaryNav,
  StaticHero,
  PrimaryButton,
} from "@electroplix/components";

export default function HomePage() {
  return (
    <>
      <PrimaryNav logoText="MyApp" links={[{ label: "Home", href: "/" }]} />
      <StaticHero title="Welcome" subtitle="Build faster." ctaLabel="Get Started" />
      <PrimaryButton label="Click me" onClick={() => alert("Clicked!")} />
    </>
  );
}
```

---

## Configuration

The `electroplix.config.ts` file uses the server-safe `./config` entry point (no React, no `"use client"`):

```ts
// electroplix.config.ts
import { defineConfig } from "@electroplix/components/config";

const config = defineConfig({
  // ── Global overrides (applied to ALL categories) ──────────
  accentColor: "#7C3AED",
  textColor: "#E5E7EB",
  bgColor: "#0b0b0c",
  borderColor: "rgba(255,255,255,0.14)",
  radius: 14,
  fontFamily: "Inter, system-ui, sans-serif",

  // ── Per-category overrides ────────────────────────────────
  navigation: { sticky: true, height: 64 },
  hero:       { minH: 600 },
  buttons:    { bgColor: "#e94560", radius: 12 },
  forms:      { inputBg: "rgba(255,255,255,0.05)" },
  ecommerce:  { accentColor: "#10B981" },
});

export default config;
```

**How merging works:** Global `BaseTheme` props (like `accentColor`, `bgColor`) are spread into every category as a baseline. Per-category overrides take priority. Built-in defaults fill any gaps.

### Available config keys

| Key | Theme Type | Category |
|-----|-----------|----------|
| `blog` | `BlogTheme` | Blog components |
| `buttons` | `ButtonTheme` | Button components |
| `content` | `ContentTheme` | Content components |
| `dataDisplay` | `DataDisplayTheme` | Charts, tables, badges |
| `ecommerce` | `EcommerceTheme` | Product cards, cart, checkout |
| `forms` | `FormsTheme` | Form inputs and wizards |
| `hero` | `HeroTheme` | Hero sections |
| `listsCards` | `ListsCardsTheme` | Lists, cards, pricing |
| `marketing` | `MarketingTheme` | Marketing blocks |
| `media` | `MediaTheme` | Images, video, galleries |
| `miscellaneous` | `MiscTheme` | Misc UI utilities |
| `modals` | `ModalsTheme` | Modals, toasts, tooltips |
| `navigation` | `NavigationTheme` | Navbars, tabs, menus |
| `onboarding` | `OnboardingTheme` | Wizards, tours, FAQ |
| `search` | `SearchTheme` | Search bars and results |
| `siteIdentity` | `SiteIdentityTheme` | Logo, branding |
| `social` | `SocialTheme` | Social sharing, login |
| `userAccounts` | `UserAccountsTheme` | Auth forms, profile |

**Global BaseTheme props** (set at root level): `bgColor`, `textColor`, `accentColor`, `borderColor`, `fontFamily`, `radius`, `spacing`, `headingSize`, `bodySize`, `fontWeight`, `lineHeight`, `letterSpacing`, `shadow`.

---

## Component Categories

### Navigation (10)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `PrimaryNav` | `logoText`, `links`, `showSearch`, `showCTA`, `sticky` | Main navigation bar |
| `SidebarMenu` | `items`, `width` | Vertical sidebar navigation |
| `SideDrawerNav` | `links`, `width`, `position` | Slide-out drawer navigation |
| `MegaMenu` | `label`, `sections` | Dropdown mega menu |
| `Tabs` | `tabs`, `defaultTab`, `orientation` | Tab navigation |
| `Breadcrumbs` | `items`, `showHomeIcon` | Breadcrumb trail |
| `Pagination` | `currentPage`, `totalPages`, `onPageChange` | Page navigation |
| `Stepper` | `steps`, `currentStep`, `orientation` | Step indicator |
| `AnchorLinks` | `items`, `orientation`, `offset` | In-page anchor navigation |
| `LanguageSelector` | `languages`, `current`, `onChange` | Language picker dropdown |

```tsx
<PrimaryNav
  logoText="Acme"
  links={[
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ]}
  showSearch
  showCTA
  ctaText="Sign Up"
  ctaHref="/signup"
  sticky
/>
```

### Hero (7)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `HeroShell` | `as`, `bgColor`, `minH`, `maxW`, `children` | Base hero wrapper |
| `StaticHero` | `title`, `subtitle`, `ctaLabel`, `onCta` | Simple static hero |
| `CarouselHero` | `slides`, `autoplay`, `intervalMs` | Auto-rotating hero slides |
| `CTAOverlayHero` | `title`, `bgImage`, `overlay`, `form` | Hero with CTA overlay |
| `PatternedHero` | `title`, `pattern`, `stats`, `badge` | Hero with decorative pattern |
| `SplitHero` | `title`, `image`, `features`, `reverse` | Side-by-side hero |
| `VideoHeaderHero` | `videoSrc`, `poster`, `title` | Full-width video hero |

### Buttons (10)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `PrimaryButton` | `label`, `onClick`, `icon`, `isLoading` | Filled primary button |
| `SecondaryButton` | `label`, `onClick` | Outlined secondary button |
| `TertiaryButton` | `label`, `onClick` | Ghost/text button |
| `IconButton` | `icon`, `onClick`, `size` | Icon-only button |
| `FloatingActionButton` | `icon`, `onClick`, `position`, `fixed` | FAB button |
| `ButtonGroup` | `buttons`, `toggle`, `onChange` | Grouped/toggle buttons |
| `LoadingButton` | `label`, `onClick`, `isLoading` | Button with spinner |
| `ShareButton` | `url`, `label` | Native share / clipboard |
| `DownloadButton` | `fileUrl`, `label` | File download button |
| `PrintButton` | `label` | Print page button |

### Forms (14)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `FormShell` | `maxW`, `px`, `py`, `children` | Form layout wrapper |
| `InputField` | `label`, `name`, `type`, `value`, `onChange`, `error` | Text/email/password input |
| `TextAreaField` | `label`, `value`, `onChange`, `showPreview` | Multi-line text area with markdown preview |
| `SelectDropdown` | `options`, `value`, `onChange`, `label` | Dropdown select |
| `RadioGroup` | `options`, `value`, `onChange`, `label` | Radio button group |
| `ToggleSwitch` | `label`, `checked`, `onChange` | On/off toggle |
| `DateTimePicker` | `label`, `mode`, `value`, `onChange` | Date/time/datetime picker |
| `FileUploader` | `onFiles`, `accept`, `maxSize` | Drag-and-drop file upload |
| `ContactForm` | `title`, `onSubmit` | Pre-built contact form |
| `NewsletterSignup` | `title`, `subtitle`, `onSubmit` | Email signup form |
| `MultiStepWizard` | `steps`, `onFinish` | Multi-step form wizard |
| `Captcha` | `mode`, `onVerify` | Text/math captcha |
| `AddressAutocomplete` | `suggestions`, `onQuery`, `onSelect` | Address autocomplete |
| `ValidationWrapper` | `errors`, `children`, `success` | Error/success message wrapper |

### Content (6)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `BlockquoteTestimonial` | `quote`, `author`, `role`, `avatarUrl` | Styled blockquote |
| `CalloutBox` | `variant`, `title`, `message`, `dismissible` | Alert/callout box (info/warning/error/success) |
| `HeadingSection` | `eyebrow`, `title`, `subtitle`, `align` | Section heading block |
| `InlineCodeText` | `text`, `copyable` | Inline code with syntax highlighting |
| `ParagraphBlock` | `paragraphs`, `showDropCap` | Formatted paragraph(s) |
| `RichMarkdown` | `markdown`, `baseSize` | Mini markdown renderer |

### Data Display (11)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `Badge` | `children`, `tone`, `pill` | Status/label badge |
| `BadgeGroup` | `items`, `tone`, `title` | Grouped badges |
| `BarChart` | `data`, `labels`, `title`, `showGrid` | SVG bar chart |
| `LineChart` | `data`, `labels`, `title`, `showGrid` | SVG line chart |
| `PieChart` | `data`, `labels`, `title` | SVG pie chart |
| `Sparkline` | `data`, `width`, `height` | Compact trend line |
| `ProgressBar` | `value`, `showLabel`, `showTrend` | Progress indicator |
| `RatingStars` | `value`, `outOf`, `interactive`, `onChange` | Star rating |
| `DataTable` | `columns`, `rows`, `pageSize`, `searchable` | Sortable/paginated table |
| `CalendarGrid` | `year`, `month`, `marks`, `onDateClick` | Month calendar grid |
| `Timeline` | `items` | Vertical timeline |

### Ecommerce (10)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `ProductCard` | `product`, `currency`, `onAddToCart` | Product display card |
| `ProductGrid` | `products`, `columns`, `onAddToCart` | Product card grid |
| `ProductDetail` | `product`, `images`, `variants`, `onAddToCart` | Full product page |
| `VariantSelector` | `groups`, `selected`, `onChange` | Size/color variant picker |
| `CartDrawer` | `items`, `onQtyChange`, `onRemove`, `onCheckout` | Slide-out cart drawer |
| `MiniCartPanel` | `items`, `currency`, `onCheckout` | Compact cart summary |
| `OrderSummary` | `orderId`, `lines`, `total`, `currency` | Order receipt/summary |
| `QuickAddButton` | `productId`, `label`, `onAdd` | Quick add-to-cart button |
| `WishlistButton` | `productId`, `wishlisted`, `onToggle` | Heart wishlist toggle |
| `PaymentButtons` | `methods`, `onPay` | Payment method buttons |

### Lists & Cards (8)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `BlockShell` | `maxW`, `children` | Section wrapper |
| `Accordion` | `items`, `allowMultiple` | Expandable accordion |
| `GenericList` | `items`, `title` | Simple labeled list |
| `FeatureGrid` | `items`, `columns`, `title` | Feature card grid |
| `ItemCardGrid` | `items`, `columns`, `onItemClick` | Clickable card grid |
| `PricingTable` | `plans`, `onSelect` | Pricing tier comparison |
| `SortableTable` | `columns`, `rows`, `caption` | Sortable data table |
| `LCTimeline` | `items` | Lists & Cards timeline |

### Marketing (8)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `ComparisonTable` | `plans`, `features`, `onSelect` | Feature comparison table |
| `CountdownTimer` | `targetDate`, `label`, `onExpire` | Countdown to date |
| `FeatureHighlights` | `items`, `columns`, `title` | Feature showcase grid |
| `LeadMagnetGate` | `title`, `description`, `onSubmit`, `children` | Gated content form |
| `MarketingHeroBlock` | `headline`, `subheadline`, `ctaLabel` | Marketing hero section |
| `PromoPopup` | `title`, `message`, `ctaLabel`, `isOpen` | Promotional popup |
| `TestimonialsCarousel` | `testimonials`, `autoPlay` | Rotating testimonials |
| `TrustBadges` | `badges`, `title` | Trust/certification badges |

### Media (11)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `MediaShell` | `maxW`, `children` | Media section wrapper |
| `ResponsiveVideo` | `src`, `poster`, `aspectRatio` | Responsive video player |
| `AudioEmbed` | `src`, `title`, `showWaveform` | Audio player |
| `AvatarProfile` | `src`, `name`, `size`, `badge` | User avatar |
| `IconGrid` | `icons`, `columns` | Icon showcase grid |
| `ImageGallery` | `items`, `columns`, `onSelect` | Image gallery |
| `LightboxGallery` | `items`, `columns` | Gallery with lightbox |
| `MasonryGrid` | `items`, `columns` | Masonry layout |
| `PolaroidImage` | `src`, `caption`, `rotation` | Polaroid-style image |
| `LottieOrSVG` | `type`, `src`, `width`, `height` | Lottie/SVG renderer |
| `ImageCropperUploader` | `onUpload`, `accept`, `maxSizeMB` | Image upload with preview |

### Miscellaneous (8)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `CookieConsent` | `message`, `onAccept`, `onDecline`, `position` | Cookie consent bar |
| `ScrollProgressBar` | `color`, `height` | Scroll progress indicator |
| `ThemeToggle` | `isDark`, `onToggle` | Dark/light mode toggle |
| `EmptyState` | `icon`, `title`, `description`, `ctaLabel` | Empty state placeholder |
| `AppInstallBanner` | `title`, `iosUrl`, `androidUrl` | App install CTA |
| `DownloadBlock` | `fileName`, `fileSize`, `href` | File download block |
| `InlineCode` | `children`, `copyable` | Inline code snippet |
| `RSSFeed` | `items`, `title` | RSS feed display |

### Modals (9)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `OverlayBase` | `isOpen`, `onClose`, `children`, `position` | Base overlay wrapper |
| `GenericModal` | `isOpen`, `title`, `onClose`, `children` | Generic modal dialog |
| `ConfirmDialog` | `isOpen`, `title`, `message`, `onConfirm` | Confirmation dialog |
| `FormDialog` | `isOpen`, `title`, `onSubmit`, `children` | Modal with form |
| `LoadingOverlay` | `isOpen`, `message` | Full-screen loading |
| `Tooltip` | `text`, `position`, `children` | Hover tooltip |
| `ToastBanners` | `toasts`, `onDismiss`, `position` | Toast notifications |
| `CookieNotice` | `isOpen`, `onAccept`, `onDecline` | Cookie consent modal |
| `WelcomePopup` | `isOpen`, `title`, `message`, `onCta` | Welcome popup |

### Onboarding (6)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `FAQAccordion` | `items`, `title`, `allowMultiple` | FAQ expandable list |
| `OnboardingWizard` | `steps`, `onComplete` | Step-by-step onboarding |
| `ProductTour` | `steps`, `isOpen`, `onComplete` | Guided product tour |
| `TooltipHelp` | `text`, `position` | Help tooltip with icon |
| `SupportChat` | `messages`, `onSend`, `title` | Chat-like support widget |
| `ContactSupportBlock` | `email`, `phone`, `title` | Support contact block |

### Search (6)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `SiteSearchBar` | `placeholder`, `onSearch`, `autoFocus` | Search input bar |
| `AutoSuggest` | `suggestions`, `onSelect`, `onQueryChange` | Autocomplete search |
| `FacetFilters` | `facets`, `selected`, `onChange` | Faceted filter sidebar |
| `SearchResultCard` | `item`, `onClick` | Individual search result |
| `SearchResults` | `items`, `query`, `loading` | Search results list |
| `SearchEmptyState` | `query`, `title` | No results placeholder |

### Site Identity (6)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `LogoDisplay` | `src`, `alt`, `width`, `href` | Logo image display |
| `AnimatedBrandMark` | `text`, `fontSize`, `accentColor` | Animated brand text |
| `Taglines` | `lines`, `rotate`, `interval` | Rotating taglines |
| `BrandingShell` | `logoSrc`, `brandName`, `tagline` | Brand identity wrapper |
| `BrandIconGrid` | `icons`, `columns` | Brand icon showcase |
| `FaviconUploader` | `onUpload`, `currentSrc` | Favicon upload with preview |

### Social (7)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `SocialShareBar` | `url`, `title`, `networks` | Social sharing buttons |
| `SocialLoginButtons` | `providers`, `onLogin` | OAuth login buttons |
| `SocialEmbed` | `type`, `url`, `width` | Social media embed |
| `FollowLike` | `isFollowed`, `followerCount`, `onFollow` | Follow/like toggle |
| `ReactionsBar` | `reactions`, `onReact` | Emoji reactions bar |
| `CommentsBox` | `comments`, `onSubmit` | Comment section |
| `ReviewsForm` | `onSubmit` | Rating + review form |

### User Accounts (7)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `AuthForm` | `mode`, `onSubmit`, `loading`, `error` | Login/signup form |
| `PasswordReset` | `onSubmit`, `loading`, `success` | Password reset form |
| `MultiFactorAuthInput` | `length`, `onComplete`, `error` | MFA code input |
| `ProfileOverview` | `name`, `email`, `avatar`, `stats` | Profile display card |
| `ProfileSettings` | `name`, `email`, `onSave` | Profile edit form |
| `AccountSettings` | `sections`, `title` | Account settings sections |
| `RoleBadge` | `role`, `variant`, `color` | User role badge |

### Blog (9)

| Component | Key Props | Description |
|-----------|----------|-------------|
| `BlogCard` | `post`, `onClick`, `variant` | Blog post card (vertical/horizontal/minimal) |
| `AuthorByline` | `name`, `avatar`, `bio`, `date` | Author info block |
| `TagList` | `tags`, `onTagClick`, `activeTag` | Tag/category list |
| `BlogBadge` | `label`, `color` | Blog category badge |
| `ReadingBar` | `color`, `height`, `containerRef` | Reading progress bar |
| `ArticleRenderer` | `html`, `maxW` | HTML article renderer |
| `RelatedPosts` | `posts`, `title`, `onPostClick` | Related posts grid |
| `ArchiveList` | `groups`, `onPostClick` | Grouped archive list |
| `CommentsSection` | `comments`, `onSubmit` | Threaded comments |

---

## Icon System

The package includes **113+ inline SVG icons** — zero external dependencies:

```tsx
import { Icon, ICON_NAMES } from "@electroplix/components";

<Icon name="search" size={24} color="#8B5CF6" />
<Icon name="shopping-cart" size={20} />
<Icon name="heart" />
```

All available icon names: `activity`, `alert-circle`, `alert-triangle`, `align-left`, `arrow-left`, `arrow-right`, `arrow-up-right`, `award`, `bar-chart`, `bar-chart-3`, `bell`, `bot`, `building-2`, `calendar`, `camera`, `check`, `check-circle`, `check-circle-2`, `chevron-down`, `chevron-left`, `chevron-right`, `chevrons-left`, `chevrons-right`, `chevron-up`, `circle`, `circle-dot`, `clipboard`, `clock`, `code`, `command`, `cookie`, `copy`, `corner-down-left`, `credit-card`, `download`, `edit-2`, `external-link`, `eye`, `eye-off`, `file`, `file-code`, `file-down`, `file-text`, `filter`, `gift`, `github`, `globe`, `grid-3x3`, `headphones`, `heart`, `help-circle`, `home`, `image`, `inbox`, `info`, `layout-grid`, `link-2`, `list`, `list-checks`, `loader-2`, `lock`, `mail`, `map-pin`, `menu`, `message-circle`, `message-square`, `minus`, `moon`, `more-horizontal`, `more-vertical`, `music`, `package`, `palette`, `paperclip`, `phone`, `pie-chart`, `play`, `plus`, `printer`, `quote`, `receipt`, `refresh-cw`, `rocket`, `rss`, `scale`, `search`, `search-code`, `search-x`, `send`, `settings`, `share-2`, `shield`, `shield-check`, `shopping-bag`, `shopping-cart`, `smartphone`, `sparkles`, `star`, `sun`, `table`, `tag`, `toggle-left`, `toggle-right`, `trash`, `trash-2`, `trending-down`, `trending-up`, `truck`, `type`, `upload`, `user`, `user-plus`, `verified`, `volume-2`, `wallet`, `x`, `x-circle`, `zap`, `zoom-in`

---

## CLI

```bash
# Scaffold config + providers
npx @electroplix/components init

# Show all components in a category
npx @electroplix/components add navigation

# Show import instructions for a single component
npx @electroplix/components add PrimaryNav

# Browse all 153 components with tree view
npx @electroplix/components list
```

The `add` command accepts both **component names** (`PrimaryNav`, `BlogCard`) and **category names** (`navigation`, `data-display`, `social`).

---

## Utilities

Exported utility functions and hooks:

| Export | Type | Description |
|--------|------|-------------|
| `sx(...styles)` | Function | Merge style objects |
| `cn(...classes)` | Function | Merge class names |
| `money(amount, currency)` | Function | Format currency |
| `truncate(text, length)` | Function | Truncate text with ellipsis |
| `timeAgo(date)` | Function | Relative time string |
| `useFocusTrap(ref)` | Hook | Trap keyboard focus inside element |
| `useClickOutside(ref, cb)` | Hook | Detect clicks outside element |
| `useMediaQuery(query)` | Hook | Responsive media query |
| `useDebounce(value, ms)` | Hook | Debounce a value |
| `validate(value, rules)` | Function | Run validation rules |
| `emailRule`, `requiredRule` | Rule | Pre-built validation rules |
| `minLengthRule(n)`, `maxLengthRule(n)` | Rule factory | Length validators |
| `baseButtonStyle(opts)` | Function | Base button CSS |
| `inputStyle(opts)` | Function | Base input CSS |
| `labelStyle(opts)` | Function | Base label CSS |

---

## API Reference

### `ElectroplixProvider`

```tsx
<ElectroplixProvider config={myConfig}>
  {children}
</ElectroplixProvider>
```

- **`config`** — `Partial<ElectroplixConfig> | undefined` — optional theme overrides. Supports both root-level `BaseTheme` props (global) and per-category objects.

### Category hooks

```tsx
import { useButtonTheme, useNavTheme } from "@electroplix/components";

function MyCustomButton() {
  const t = useButtonTheme();
  return <button style={{ background: t.bgColor, color: t.textColor }}>Custom</button>;
}
```

### `defineConfig(config)`

Server-safe type-checked config helper. Import from `@electroplix/components/config`.

### `mergeTheme(target, ...sources)`

Shallow-merge theme objects. `undefined` values in sources are skipped.

---

## Testing

```bash
pnpm nx test @electroplix/components
```

19 test suites, 163 tests covering all 18 categories.
