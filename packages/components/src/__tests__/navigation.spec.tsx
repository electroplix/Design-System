import { render } from '@testing-library/react';
/**
 * @electroplix/components – navigation tests
 */
import type React from 'react';
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
} from '../components/navigation';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe('Navigation components', () => {
  it('AnchorLinks renders', () => {
    const { container } = wrap(<AnchorLinks items={[{ label: 'Top', targetId: 'top' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('Breadcrumbs renders', () => {
    const { container } = wrap(<Breadcrumbs items={[{ label: 'Home', href: '/' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('LanguageSelector renders', () => {
    const { container } = wrap(
      <LanguageSelector languages={[{ code: 'en', label: 'English' }]} current="en" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('MegaMenu renders', () => {
    const { container } = wrap(
      <MegaMenu groups={[{ label: 'Group', items: [{ label: 'Item', href: '#' }] }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Pagination renders', () => {
    const { container } = wrap(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('PrimaryNav renders', () => {
    const { container } = wrap(<PrimaryNav links={[{ label: 'Home', href: '/' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('SidebarMenu renders', () => {
    const { container } = wrap(
      <SidebarMenu items={[{ id: '1', label: 'Dashboard', href: '#' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('SideDrawerNav renders when open', () => {
    const { container } = wrap(
      <SideDrawerNav
        isOpen={true}
        onClose={() => {}}
        items={[{ id: '1', label: 'Nav', href: '#' }]}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Stepper renders', () => {
    const { container } = wrap(<Stepper steps={[{ id: '1', label: 'Step 1' }]} currentStep="1" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('Tabs renders', () => {
    const { container } = wrap(
      <Tabs tabs={[{ id: '1', label: 'Tab 1', content: <span>Content</span> }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Footer renders', () => {
    const { container } = wrap(
      <Footer
        columns={[{ title: 'Company', links: [{ label: 'About', href: '/about' }] }]}
        socialLinks={[{ icon: 'star', href: 'https://x.com' }]}
        copyright="© 2025 Test"
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Footer renders without props', () => {
    const { container } = wrap(<Footer />);
    expect(container.firstChild).toBeTruthy();
  });
});
