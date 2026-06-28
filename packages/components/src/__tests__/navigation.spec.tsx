import { fireEvent, render, screen } from '@testing-library/react';
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
      <MegaMenu
        label="Solutions"
        sections={[{ title: 'Group', links: [{ label: 'Item', href: '#' }] }]}
      />,
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

  it('SideDrawerNav renders', () => {
    const { container } = wrap(<SideDrawerNav links={[{ label: 'Nav', href: '#' }]} />);
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

  describe('Tabs behavioral', () => {
    it('shows first tab content by default', () => {
      wrap(
        <Tabs
          tabs={[
            { label: 'Tab 1', content: <span>First</span> },
            { label: 'Tab 2', content: <span>Second</span> },
          ]}
        />,
      );
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.queryByText('Second')).toBeNull();
    });

    it('switches content when tab clicked', () => {
      wrap(
        <Tabs
          tabs={[
            { label: 'Tab 1', content: <span>First</span> },
            { label: 'Tab 2', content: <span>Second</span> },
          ]}
        />,
      );
      fireEvent.click(screen.getByText('Tab 2'));
      expect(screen.getByText('Second')).toBeTruthy();
      expect(screen.queryByText('First')).toBeNull();
    });

    it('switches back on re-click', () => {
      wrap(
        <Tabs
          tabs={[
            { label: 'Tab 1', content: <span>First</span> },
            { label: 'Tab 2', content: <span>Second</span> },
          ]}
        />,
      );
      fireEvent.click(screen.getByText('Tab 2'));
      fireEvent.click(screen.getByText('Tab 1'));
      expect(screen.getByText('First')).toBeTruthy();
    });

    it('respects defaultTab', () => {
      wrap(
        <Tabs
          defaultTab={1}
          tabs={[
            { label: 'Tab 1', content: <span>First</span> },
            { label: 'Tab 2', content: <span>Second</span> },
          ]}
        />,
      );
      expect(screen.getByText('Second')).toBeTruthy();
    });

    it('has correct ARIA attributes', () => {
      wrap(<Tabs tabs={[{ label: 'Tab 1', content: <span>Content</span> }]} />);
      expect(screen.getByRole('tablist')).toBeTruthy();
      expect(screen.getByRole('tab')).toBeTruthy();
      expect(screen.getByRole('tabpanel')).toBeTruthy();
    });

    it('navigates with keyboard arrows', () => {
      wrap(
        <Tabs
          tabs={[
            { label: 'Tab 1', content: <span>First</span> },
            { label: 'Tab 2', content: <span>Second</span> },
          ]}
        />,
      );
      const tablist = screen.getByRole('tablist');
      fireEvent.keyDown(tablist, { key: 'ArrowRight' });
      expect(screen.getByText('Second')).toBeTruthy();
    });
  });

  describe('Pagination behavioral', () => {
    it('calls onPageChange when page clicked', () => {
      const onChange = jest.fn();
      wrap(<Pagination currentPage={1} totalPages={5} onPageChange={onChange} />);
      const btn = screen.getByText('2');
      fireEvent.click(btn);
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with page number', () => {
      const onChange = jest.fn();
      wrap(<Pagination currentPage={1} totalPages={5} onPageChange={onChange} />);
      fireEvent.click(screen.getByText('3'));
      expect(onChange).toHaveBeenCalledWith(3);
    });
  });

  describe('SideDrawerNav behavioral', () => {
    it('renders with open button', () => {
      wrap(<SideDrawerNav links={[{ label: 'Nav', href: '#' }]} />);
      expect(screen.getByRole('button', { name: /menu/i })).toBeTruthy();
    });
  });

  describe('SidebarMenu behavioral', () => {
    it('renders all items', () => {
      wrap(
        <SidebarMenu
          items={[
            { id: '1', label: 'Dashboard', href: '#' },
            { id: '2', label: 'Settings', href: '#' },
          ]}
        />,
      );
      expect(screen.getByText('Dashboard')).toBeTruthy();
      expect(screen.getByText('Settings')).toBeTruthy();
    });
  });

  describe('Breadcrumbs behavioral', () => {
    it('renders all breadcrumb items', () => {
      wrap(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Current' },
          ]}
        />,
      );
      expect(screen.getByText('Home')).toBeTruthy();
      expect(screen.getByText('Products')).toBeTruthy();
      expect(screen.getByText('Current')).toBeTruthy();
    });
  });
});
