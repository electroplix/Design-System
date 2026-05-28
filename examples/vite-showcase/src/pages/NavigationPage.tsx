import {
  AnchorLinks,
  Breadcrumbs,
  Footer,
  LanguageSelector,
  MegaMenu,
  Pagination,
  PrimaryNav,
  SideDrawerNav,
  SidebarMenu,
  Stepper,
  Tabs,
} from '@electroplix/components';
import { useState } from 'react';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleNavLinks } from '../data/samples';

export default function NavigationPage() {
  const [page, setPage] = useState(1);

  return (
    <CategoryPage
      slug="navigation"
      title="Navigation"
      description="Headers, footers, menus, breadcrumbs, tabs, paginators."
      componentCount={11}
    >
      <ComponentDemo name="AnchorLinks">
        <AnchorLinks
          items={[
            { label: 'Top', targetId: 'top' },
            { label: 'Features', targetId: 'features' },
            { label: 'Pricing', targetId: 'pricing' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="Breadcrumbs">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Docs', href: '/docs' },
            { label: 'Navigation', href: '/docs/navigation' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="LanguageSelector">
        <LanguageSelector
          languages={[
            { code: 'en', label: 'English' },
            { code: 'es', label: 'Español' },
            { code: 'fr', label: 'Français' },
          ]}
          current="en"
        />
      </ComponentDemo>
      <ComponentDemo name="MegaMenu">
        <MegaMenu
          label="Solutions"
          sections={[
            {
              title: 'Product',
              links: [
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'Changelog', href: '#' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '#' },
                { label: 'Careers', href: '#' },
              ],
            },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="Pagination">
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </ComponentDemo>
      <ComponentDemo name="PrimaryNav">
        <PrimaryNav logoText="ELECTROPLIX" links={sampleNavLinks} showCTA ctaText="Sign up" />
      </ComponentDemo>
      <ComponentDemo name="SidebarMenu">
        <SidebarMenu
          items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Settings', href: '#' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="SideDrawerNav">
        <SideDrawerNav
          logoText="Menu"
          links={[
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Settings', href: '#' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="Stepper">
        <Stepper
          steps={[
            { id: '1', label: 'Account' },
            { id: '2', label: 'Profile' },
            { id: '3', label: 'Confirm' },
          ]}
          currentStep="2"
        />
      </ComponentDemo>
      <ComponentDemo name="Tabs">
        <Tabs
          tabs={[
            { id: '1', label: 'Overview', content: <span>Overview content</span> },
            { id: '2', label: 'Activity', content: <span>Activity feed</span> },
            { id: '3', label: 'Settings', content: <span>Settings panel</span> },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="Footer">
        <Footer
          columns={[
            { title: 'Product', links: [{ label: 'Features', href: '#' }] },
            { title: 'Company', links: [{ label: 'About', href: '#' }] },
          ]}
          socialLinks={[{ icon: 'github', href: 'https://github.com' }]}
          copyright="© 2026 Electroplix"
        />
      </ComponentDemo>
    </CategoryPage>
  );
}
