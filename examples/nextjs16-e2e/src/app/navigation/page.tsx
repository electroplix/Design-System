'use client';
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

export default function NavigationTest() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <h1>Navigation Components</h1>
      <section>
        <h2>PrimaryNav</h2>
        <PrimaryNav
          id="nav-1"
          data-testid="primary-nav"
          logoText="Electroplix"
          links={[{ label: 'Home', href: '/' }]}
        />
      </section>
      <section>
        <h2>Footer</h2>
        <Footer id="footer-1" data-testid="footer" columns={[]} />
      </section>
      <section>
        <h2>Tabs</h2>
        <Tabs id="tabs-1" tabs={[{ label: 'Tab 1', content: <div>Content</div> }]} />
      </section>
      <section>
        <h2>Breadcrumbs</h2>
        <Breadcrumbs id="bc-1" items={[{ label: 'Home', href: '/' }]} />
      </section>
      <section>
        <h2>Pagination</h2>
        <Pagination id="pg-1" currentPage={page} totalPages={5} onPageChange={setPage} />
      </section>
      <section>
        <h2>SidebarMenu</h2>
        <SidebarMenu id="sb-1" items={[{ label: 'Dashboard', href: '/' }]} />
      </section>
      <section>
        <h2>MegaMenu</h2>
        <MegaMenu
          id="mm-1"
          label="Products"
          sections={[{ title: 'Category', links: [{ label: 'Widget', href: '/widget' }] }]}
        />
      </section>
      <section>
        <h2>Stepper</h2>
        <Stepper id="st-1" steps={[{ label: 'Step 1' }]} currentStep={0} />
      </section>
      <section>
        <h2>AnchorLinks</h2>
        <AnchorLinks id="al-1" items={[{ label: 'Section 1', targetId: 's1' }]} />
      </section>
      <section>
        <h2>SideDrawerNav</h2>
        <SideDrawerNav id="sd-1" links={[{ label: 'Home', href: '/' }]} />
      </section>
      <section>
        <h2>LanguageSelector</h2>
        <LanguageSelector
          id="ls-1"
          languages={[
            { code: 'en', label: 'English' },
            { code: 'fr', label: 'French' },
          ]}
          current="en"
        />
      </section>
    </div>
  );
}
