# Fix All Component HTML Attribute Type Errors — Zero Build Errors Guarantee

**Goal:** Ensure `@electroplix/components` never causes TypeScript build errors for consumers when they pass standard HTML attributes (`id`, `data-*`, `aria-*`, `role`, `className`, `style`, etc.) to **any** of the 159 components. After this fix, `npm run build` in any Next.js 15/16 app consuming the library will succeed regardless of which components the user uses.

---

## Background

The bugs.md analysis is **validated and accurate**. After auditing every component file:

### ✅ P0 Fixes Already Applied (8 components) — Confirmed Working
These components correctly `extend React.ComponentPropsWithoutRef<'..'>` and spread `...rest`:
- `BlockShell` (lists-cards) — extends `<'section'>`
- `HeroShell` (hero) — extends `<'section'>`
- `FormShell` (forms) — extends `<'section'>`
- `MediaShell` (media) — extends `<'section'>`
- `BrandingShell` (site-identity) — extends `<'section'>`
- `OverlayBase` (modals) — extends `<'div'>`
- `GenericModal` (modals) — extends `OverlayBaseProps`
- `Tooltip` (modals) — extends `<'span'>`

Additional modals also already extended:
- `ConfirmDialog` — extends `Omit<OverlayBaseProps, 'children'>`
- `FormDialog` — extends `Omit<OverlayBaseProps, 'onSubmit'>`
- `CookieNotice` — extends `<'div'>`
- `WelcomePopup` — extends `OverlayBaseProps`

### ❌ P1 Issues Still Present (~120 components) — Build Errors for Users
Every remaining component uses a **plain interface** (no `extends`), so passing `id`, `data-testid`, `aria-label`, etc. triggers:
```
Property 'id' does not exist on type 'IntrinsicAttributes & SomeComponentProps'
```

---

## Proposed Changes

The fix is **uniform and mechanical** across all affected components. For each:

1. **Extend** the Props interface from `React.ComponentPropsWithoutRef<'element'>` where `'element'` matches the component's root HTML element
2. **Destructure** `...rest` from props
3. **Spread** `{...rest}` on the root element
4. Remove now-redundant manual declarations of `className`, `style`, `children` (they're inherited)

> [!IMPORTANT]
> This is a **non-breaking, additive change**. Existing consumer code continues to work unchanged. No migration required.

### Pattern Applied

```tsx
// BEFORE (causes build error when user passes id/data-*/aria-*)
export interface FooProps {
  title: string;
  // no HTML attrs
}
export function Foo({ title }: FooProps) {
  return <div>{title}</div>;
}

// AFTER (user can pass any HTML attr to root element)
export interface FooProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
}
export function Foo({ title, ...rest }: FooProps) {
  return <div {...rest}>{title}</div>;
}
```

---

### Navigation Category (11 components)

#### [x] [PrimaryNav.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/PrimaryNav.tsx)
- `PrimaryNavProps` → extend `React.ComponentPropsWithoutRef<'header'>`
- Spread `...rest` on `<header>`

#### [x] [Footer.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/Footer.tsx)
- `FooterProps` → extend `React.ComponentPropsWithoutRef<'footer'>`
- Spread `...rest` on `<footer>`

#### [x] [Tabs.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/Tabs.tsx)
- Extend `React.ComponentPropsWithoutRef<'div'>`

#### [x] [Breadcrumbs.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/Breadcrumbs.tsx)
- Extend `React.ComponentPropsWithoutRef<'nav'>`

#### [x] [Pagination.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/Pagination.tsx)
- Extend `React.ComponentPropsWithoutRef<'nav'>`

#### [x] [SidebarMenu.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/SidebarMenu.tsx)
- Extend `React.ComponentPropsWithoutRef<'nav'>`

#### [x] [MegaMenu.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/MegaMenu.tsx)
- Extend `React.ComponentPropsWithoutRef<'nav'>`

#### [x] [Stepper.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/Stepper.tsx)
- Extend `React.ComponentPropsWithoutRef<'div'>`

#### [x] [AnchorLinks.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/AnchorLinks.tsx)
- Extend `React.ComponentPropsWithoutRef<'nav'>`

#### [x] [SideDrawerNav.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/SideDrawerNav.tsx)
- Extend `React.ComponentPropsWithoutRef<'div'>`

#### [x] [LanguageSelector.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/navigation/LanguageSelector.tsx)
- Extend `React.ComponentPropsWithoutRef<'div'>`

---

### Ecommerce Category (10 components — single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/ecommerce/index.tsx)
All 10 component Props interfaces need extending:

| Component | Root Element | Extends |
|:----------|:------------|:--------|
| `CartDrawerProps` | `<aside>` | `React.ComponentPropsWithoutRef<'aside'>` |
| `MiniCartPanel` (uses `CartCommonProps`) | `<div>` | Add new `MiniCartPanelProps extends ... & ComponentPropsWithoutRef<'div'>` |
| `OrderSummaryProps` | `<section>` | `React.ComponentPropsWithoutRef<'section'>` |
| `ProductCardProps` | `<article>` | `React.ComponentPropsWithoutRef<'article'>` |
| `ProductGridProps` | `<div>` | `React.ComponentPropsWithoutRef<'div'>` |
| `ProductDetailProps` | `<article>` | `React.ComponentPropsWithoutRef<'article'>` |
| `VariantSelectorProps` | `<div>` | `React.ComponentPropsWithoutRef<'div'>` |
| `QuickAddButtonProps` | `<button>` | `React.ComponentPropsWithoutRef<'button'>` |
| `WishlistButtonProps` | `<button>` | `React.ComponentPropsWithoutRef<'button'>` |
| `PaymentButtonsProps` | `<div>` | `React.ComponentPropsWithoutRef<'div'>` |

---

### Content Category (7 components — modular)

#### [x] [CalloutBox.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/content/CalloutBox.tsx)
- `CalloutBoxProps` → extend `React.ComponentPropsWithoutRef<'section'>`
- Already has `as` prop, `style`, `className` — but they're manual. Extending adds `id`, `data-*`, `aria-*`
- Spread `...rest` on root `<Tag>` element

#### [x] Remaining 6 content components
- `HeadingSection`, `ParagraphBlock`, `BlockquoteTestimonial`, `TeamGrid`, `RichMarkdown`, `InlineCodeText`
- Each extends appropriate element type

---

### Data Display Category (11 components — modular)

#### [x] [DataTable.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/data-display/DataTable.tsx)
- `DataTableProps<T>` → extend `React.ComponentPropsWithoutRef<'section'>`
- Spread `...rest` on root `<section>`

#### [x] Remaining 10 data-display components
- `Badge`, `BadgeGroup`, `BarChart`, `CalendarGrid`, `LineChart`, `PieChart`, `ProgressBar`, `RatingStars`, `Sparkline`, `Timeline`

---

### Marketing Category (10 components — single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/marketing/index.tsx)
All 10: `ComparisonTable`, `CountdownTimer`, `FeatureHighlights`, `LeadMagnetGate`, `MarketingHeroBlock`, `PromoPopup`, `TestimonialsCarousel`, `TrustBadges`, `StatsCounter`, `HowItWorks`

---

### Blog Category (9 components — single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/blog/index.tsx)
All 9: `BlogCard`, `AuthorByline`, `TagList`, `BlogBadge`, `ReadingBar`, `ArticleRenderer`, `RelatedPosts`, `ArchiveList`, `CommentsSection`

---

### Buttons Category (11 components — single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/buttons/index.tsx)
- `ButtonBaseProps` → extend `React.ComponentPropsWithoutRef<'button'>`
- Remove manual `className`, `style` declarations (inherited)
- All derived components (PrimaryButton, SecondaryButton, etc.) inherit via `ButtonBaseProps`
- Spread `...rest` on each `<button>`

> [!WARNING]
> `ButtonBaseProps` has a custom `onClick?: () => void` which conflicts with the native `onClick` (which passes an event). This needs careful handling — either keep the custom signature and use `Omit<..., 'onClick'>` or change to the native `React.MouseEventHandler<HTMLButtonElement>`. The safest approach to avoid breaking changes is `Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'>` and keep the custom `onClick`.

---

### Lists & Cards Category (remaining 7 in single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/lists-cards/index.tsx)
- `AccordionProps`, `GenericListProps`, `FeatureGridProps`, `ItemCardGridProps`, `PricingTableProps`, `SortableTableProps`, `LCTimelineProps`
- Each extends `React.ComponentPropsWithoutRef<'div'>` or appropriate element

---

### Forms Category (14 components — modular)

#### [x] Each form component file
- `InputField`, `TextAreaField`, `SelectDropdown`, `RadioGroup`, `ToggleSwitch`, `DateTimePicker`, `FileUploader`, `ContactForm`, `NewsletterSignup`, `MultiStepWizard`, `Captcha`, `AddressAutocomplete`, `ValidationWrapper`
- Each extends appropriate element type for its wrapper div

---

### Media Category (remaining 11 components in single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/media/index.tsx)
- `ResponsiveVideoProps`, `AudioEmbedProps`, `AvatarProfileProps`, `IconGridProps`, `ImageGalleryProps`, `LightboxGalleryProps`, `MasonryGridProps`, `PolaroidImageProps`, `LottieOrSVGProps`, `ImageCropperUploaderProps`, `MapEmbedProps`

---

### Miscellaneous Category (8 components)

#### [x] Component files in miscellaneous/
- `CookieConsent`, `ScrollProgressBar`, `ThemeToggle`, `EmptyState`, `AppInstallBanner`, `DownloadBlock`, `InlineCode`, `RSSFeed`

---

### Modals Category (remaining 3)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/modals/index.tsx)
- `LoadingOverlayProps` — currently doesn't extend. Add `React.ComponentPropsWithoutRef<'div'>`
- `ToastBannersProps` — extend `React.ComponentPropsWithoutRef<'div'>`
- `Toast` interface is a data type, not a component — leave as-is

---

### Onboarding Category (6 components)

#### [x] Component files in onboarding/
- `FAQAccordion`, `OnboardingWizard`, `ProductTour`, `TooltipHelp`, `SupportChat`, `ContactSupportBlock`

---

### Search Category (6 components)

#### [x] Component files in search/
- `SiteSearchBar`, `AutoSuggest`, `FacetFilters`, `SearchResultCard`, `SearchResults`, `SearchEmptyState`

---

### Social Category (7 components — single file)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/social/index.tsx)
- `SocialShareBarProps`, `SocialLoginButtonsProps`, `SocialEmbedProps`, `FollowLikeProps`, `ReactionsBarProps`, `CommentsBoxProps`, `ReviewsFormProps`

---

### User Accounts Category (7 components)

#### [x] Component files in user-accounts/
- `AuthForm`, `PasswordReset`, `MultiFactorAuthInput`, `ProfileOverview`, `ProfileSettings`, `AccountSettings`, `RoleBadge`

---

### Site Identity Category (remaining 5 components)

#### [x] [index.tsx](file:///home/adnan/Documents/code-lab/electroplix/@electroplix/Design-System/packages/components/src/components/site-identity/index.tsx)
- `LogoDisplayProps`, `AnimatedBrandMarkProps`, `TaglinesProps`, `BrandIconGridProps`, `FaviconUploaderProps`

---

## Open Questions

> [!IMPORTANT]
> **Buttons `onClick` signature:** The current `ButtonBaseProps.onClick` is `() => void` (no event object). Native button `onClick` is `React.MouseEventHandler<HTMLButtonElement>`. Should we:
> - **Option A (safe):** Use `Omit<ComponentPropsWithoutRef<'button'>, 'onClick'>` to keep existing signature — no breaking change
> - **Option B (proper):** Change to native signature `(e: React.MouseEvent<HTMLButtonElement>) => void` — technically breaking but better DX
> 
> **Recommendation:** Option A for this release (no breaking changes in alpha), Option B for v1.0.

> [!NOTE]
> **`LCTimeline` component:** The bugs.md references an `LCTimeline` in lists-cards but I need to verify if it exists in the current source (it may have been renamed or removed in recent changes). Will handle during execution.

---

## Verification Plan

### Automated Tests

1. **Library Build** — `pnpm nx build @electroplix/components` must succeed
2. **Unit Tests** — `pnpm test` (172 specs) must pass
3. **TypeScript Check** — Run `npx tsc --noEmit` within a fresh Next.js 16 test app that imports and uses components with HTML attributes:
   ```tsx
   <ProductCard product={item} data-product-id="123" id="card-1" />
   <PricingTable plans={plans} id="pricing" aria-label="Plans" />
   <DataTable columns={cols} rows={rows} aria-label="Users" />
   <PrimaryButton label="Click" data-testid="btn" />
   <Footer columns={[]} id="site-footer" />
   ```

### Manual Verification

1. Build the library: `pnpm build`
2. Verify the `dist/index.d.ts` contains the extended types
3. Confirm `npm run build` in `examples/nextjs15-e2e` and `examples/nextjs16-e2e` passes
4. Spot-check a representative component from each category in a consumer app

---

## Execution Order

1. **Buttons** — highest usage, complex `onClick` handling
2. **Navigation** — 11 modular files, high visibility
3. **Ecommerce** — single file, 10 components, critical for analytics
4. **Marketing** — single file, 10 components, critical for conversion tracking
5. **Content** — 7 modular files
6. **Data Display** — 11 modular files
7. **Blog** — single file, 9 components
8. **Lists & Cards** — single file, remaining 7 components
9. **Forms** — 14 modular files (wrappers only)
10. **Media** — single file, 11 components
11. **Social** — single file, 7 components
12. **Site Identity** — single file, 5 remaining
13. **Modals** — 3 remaining
14. **Miscellaneous** — 8 components
15. **Onboarding** — 6 components
16. **Search** — 6 components
17. **User Accounts** — 7 components
18. **Build & verify**

**Estimated time:** ~3–4 hours of mechanical edits + verification
- [x] examples/nextjs15-e2e/src/app/page.tsx
- [x] packages/components/src/components/blog/index.tsx
- [x] packages/components/src/components/buttons/index.tsx
- [x] packages/components/src/components/content/BlockquoteTestimonial.tsx
- [x] packages/components/src/components/content/CalloutBox.tsx
- [x] packages/components/src/components/content/HeadingSection.tsx
- [x] packages/components/src/components/content/ParagraphBlock.tsx
- [x] packages/components/src/components/content/RichMarkdown.tsx
- [x] packages/components/src/components/content/TeamGrid.tsx
- [x] packages/components/src/components/data-display/Badge.tsx
- [x] packages/components/src/components/data-display/BadgeGroup.tsx
- [x] packages/components/src/components/data-display/BarChart.tsx
- [x] packages/components/src/components/data-display/CalendarGrid.tsx
- [x] packages/components/src/components/data-display/DataTable.tsx
- [x] packages/components/src/components/data-display/LineChart.tsx
- [x] packages/components/src/components/data-display/PieChart.tsx
- [x] packages/components/src/components/data-display/ProgressBar.tsx
- [x] packages/components/src/components/ecommerce/index.tsx
- [x] packages/components/src/components/forms/AddressAutocomplete.tsx
- [x] packages/components/src/components/forms/Captcha.tsx
- [x] packages/components/src/components/forms/ContactForm.tsx
- [x] packages/components/src/components/forms/DateTimePicker.tsx
- [x] packages/components/src/components/forms/FileUploader.tsx
- [x] packages/components/src/components/forms/FormShell.tsx
- [x] packages/components/src/components/forms/InputField.tsx
- [x] packages/components/src/components/forms/MultiStepWizard.tsx
- [x] packages/components/src/components/forms/NewsletterSignup.tsx
- [x] packages/components/src/components/forms/RadioGroup.tsx
- [x] packages/components/src/components/forms/SelectDropdown.tsx
- [x] packages/components/src/components/forms/TextAreaField.tsx
- [x] packages/components/src/components/forms/ToggleSwitch.tsx
- [x] packages/components/src/components/forms/ValidationWrapper.tsx
- [x] packages/components/src/components/hero/CTAOverlayHero.tsx
- [x] packages/components/src/components/hero/CarouselHero.tsx
- [x] packages/components/src/components/hero/HeroShell.tsx
- [x] packages/components/src/components/hero/PatternedHero.tsx
- [x] packages/components/src/components/hero/SplitHero.tsx
- [x] packages/components/src/components/hero/StaticHero.tsx
- [x] packages/components/src/components/hero/VideoHeaderHero.tsx
- [x] packages/components/src/components/lists-cards/index.tsx
- [x] packages/components/src/components/marketing/index.tsx
- [x] packages/components/src/components/media/index.tsx
- [x] packages/components/src/components/miscellaneous/index.tsx
- [x] packages/components/src/components/modals/index.tsx
- [x] packages/components/src/components/navigation/AnchorLinks.tsx
- [x] packages/components/src/components/navigation/Breadcrumbs.tsx
- [x] packages/components/src/components/navigation/Footer.tsx
- [x] packages/components/src/components/navigation/LanguageSelector.tsx
- [x] packages/components/src/components/navigation/MegaMenu.tsx
- [x] packages/components/src/components/navigation/Pagination.tsx
- [x] packages/components/src/components/navigation/PrimaryNav.tsx
- [x] packages/components/src/components/navigation/SideDrawerNav.tsx
- [x] packages/components/src/components/navigation/SidebarMenu.tsx
- [x] packages/components/src/components/navigation/Stepper.tsx
- [x] packages/components/src/components/navigation/Tabs.tsx
- [x] packages/components/src/components/onboarding/index.tsx
- [x] packages/components/src/components/search/index.tsx
- [x] packages/components/src/components/site-identity/index.tsx
- [x] packages/components/src/components/social/index.tsx
- [x] packages/components/src/components/user-accounts/index.tsx
