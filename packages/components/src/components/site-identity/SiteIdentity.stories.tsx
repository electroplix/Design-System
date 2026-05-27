import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedBrandMark, BrandIconGrid, FaviconUploader, LogoDisplay, Taglines } from './index';

const meta: Meta = {
  title: 'Components/SiteIdentity',
  tags: ['autodocs'],
};
export default meta;

export const LogoDisplayStory: StoryObj = {
  render: () => <LogoDisplay src="/logo.svg" alt="Brand Logo" />,
};

export const AnimatedBrandMarkStory: StoryObj = {
  render: () => <AnimatedBrandMark src="/brand-mark.svg" alt="Brand Mark" />,
};

export const BrandIconGridStory: StoryObj = {
  render: () => (
    <BrandIconGrid
      icons={[
        { id: '1', name: 'Primary', src: '/icon-primary.svg' },
        { id: '2', name: 'Secondary', src: '/icon-secondary.svg' },
      ]}
    />
  ),
};

export const FaviconUploaderStory: StoryObj = {
  render: () => <FaviconUploader onUpload={() => {}} />,
};

export const TaglinesStory: StoryObj = {
  render: () => <Taglines lines={['Build faster.', 'Ship with confidence.']} />,
};
