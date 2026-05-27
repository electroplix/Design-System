import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { MegaMenu } from './MegaMenu';
import { Pagination } from './Pagination';
import { PrimaryNav } from './PrimaryNav';
import { SideDrawerNav } from './SideDrawerNav';
import { SidebarMenu } from './SidebarMenu';
import { Tabs } from './Tabs';

const meta: Meta = {
  title: 'Components/Navigation',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export const PrimaryNavStory: Story = {
  render: () => <PrimaryNav items={navItems} />,
};

export const MegaMenuStory: Story = {
  render: () => (
    <MegaMenu
      items={[
        {
          label: 'Products',
          children: [
            { label: 'Widget A', href: '/a' },
            { label: 'Widget B', href: '/b' },
          ],
        },
        { label: 'Services', children: [{ label: 'Consulting', href: '/consulting' }] },
      ]}
    />
  ),
};

export const SidebarMenuStory: Story = {
  render: () => <SidebarMenu items={navItems} />,
};

export const SideDrawerNavStory: Story = {
  render: () => <SideDrawerNav items={navItems} isOpen={true} onClose={() => {}} />,
};

export const FooterStory: Story = {
  render: () => (
    <Footer
      links={[
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ]}
      copyright="© 2026 Electroplix"
    />
  ),
};

export const BreadcrumbsStory: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Current' },
      ]}
    />
  ),
};

export const PaginationStory: Story = {
  render: () => <Pagination totalPages={10} currentPage={3} onPageChange={() => {}} />,
};

export const TabsStory: Story = {
  render: () => (
    <Tabs
      items={[
        { label: 'Tab 1', content: <p>Content 1</p> },
        { label: 'Tab 2', content: <p>Content 2</p> },
        { label: 'Tab 3', content: <p>Content 3</p> },
      ]}
    />
  ),
};
