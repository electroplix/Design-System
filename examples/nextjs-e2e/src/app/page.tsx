/**
 * SSR Validation Page
 *
 * This page imports components from @electroplix/components and renders them
 * in a Next.js App Router Server Component context. If any component accesses
 * browser-only APIs (window, document) without guards, this page will crash
 * during `next build`.
 */
import {
  Badge,
  BlogCard,
  Button,
  ContactForm,
  ElectroplixProvider,
  GenericList,
  LogoDisplay,
  PricingTable,
  PrimaryNav,
  ProductCard,
  SiteSearchBar,
  SocialShareBar,
  StaticHero,
} from '@electroplix/components';

export default function SSRValidationPage() {
  return (
    <ElectroplixProvider>
      <main>
        <h1>SSR Validation — All Categories</h1>

        {/* Navigation */}
        <PrimaryNav logo="TEST" />

        {/* Hero */}
        <StaticHero title="SSR Test" subtitle="Validates server rendering" />

        {/* Buttons */}
        <Button variant="primary">SSR Button</Button>

        {/* Forms */}
        <ContactForm />

        {/* Data Display */}
        <Badge label="SSR" />

        {/* Ecommerce */}
        <ProductCard name="Test Product" price={9.99} image="" />

        {/* Lists */}
        <GenericList items={[{ id: '1', title: 'Item 1' }]} />

        {/* Marketing */}
        <PricingTable plans={[{ name: 'Free', price: '$0', features: ['Basic'] }]} />

        {/* Search */}
        <SiteSearchBar />

        {/* Site Identity */}
        <LogoDisplay name="Electroplix" />

        {/* Social */}
        <SocialShareBar url="https://example.com" title="Test" />

        {/* Blog */}
        <BlogCard title="Test Post" excerpt="SSR test" slug="/test" date="2026-01-01" />

        <p>✅ All components rendered successfully via SSR</p>
      </main>
    </ElectroplixProvider>
  );
}
