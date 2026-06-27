import type { Meta, StoryObj } from '@storybook/react';
import {
  CookieConsent,
  DownloadBlock,
  EmptyState,
  RSSFeed,
  ScrollProgressBar,
  ThemeToggle,
} from './index';

const meta: Meta = {
  title: 'Components/Miscellaneous',
  tags: ['autodocs'],
};
export default meta;

export const CookieConsentStory: StoryObj = {
  render: () => <CookieConsent onAccept={() => {}} onDecline={() => {}} />,
};

export const ScrollProgressBarStory: StoryObj = {
  render: () => <ScrollProgressBar />,
};

export const ThemeToggleStory: StoryObj = {
  render: () => <ThemeToggle />,
};

export const EmptyStateStory: StoryObj = {
  render: () => <EmptyState title="No results" description="Try adjusting your filters." />,
};

export const RSSFeedStory: StoryObj = {
  render: () => <RSSFeed url="https://example.com/feed.xml" />,
};

export const DownloadBlockStory: StoryObj = {
  render: () => <DownloadBlock fileName="report.pdf" fileSize="2.4 MB" url="/files/report.pdf" />,
};
