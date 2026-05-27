import type { Meta, StoryObj } from '@storybook/react';
import {
  CookieConsent,
  CountdownTimer,
  DownloadBlock,
  EmptyState,
  LoadingOverlay,
  RSSFeed,
  ScrollProgressBar,
  ThemeToggle,
  ToastBanners,
  Tooltip,
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

export const ToastBannersStory: StoryObj = {
  render: () => <ToastBanners messages={[{ id: '1', type: 'success', text: 'Saved!' }]} />,
};

export const TooltipStory: StoryObj = {
  render: () => (
    <Tooltip content="Helpful tip">
      <button>Hover me</button>
    </Tooltip>
  ),
};

export const LoadingOverlayStory: StoryObj = {
  render: () => <LoadingOverlay visible />,
};

export const EmptyStateStory: StoryObj = {
  render: () => <EmptyState title="No results" description="Try adjusting your filters." />,
};

export const CountdownTimerStory: StoryObj = {
  render: () => <CountdownTimer targetDate="2026-12-31T00:00:00Z" />,
};

export const RSSFeedStory: StoryObj = {
  render: () => <RSSFeed url="https://example.com/feed.xml" />,
};

export const DownloadBlockStory: StoryObj = {
  render: () => <DownloadBlock fileName="report.pdf" fileSize="2.4 MB" url="/files/report.pdf" />,
};
