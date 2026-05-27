import type { Meta, StoryObj } from '@storybook/react';
import {
  CommentsSection,
  FollowLike,
  ReactionsBar,
  SocialEmbed,
  SocialLoginButtons,
  SocialShareBar,
} from './index';

const meta: Meta = {
  title: 'Components/Social',
  tags: ['autodocs'],
};
export default meta;

export const SocialShareBarStory: StoryObj = {
  render: () => <SocialShareBar url="https://example.com" title="Check this out" />,
};

export const SocialEmbedStory: StoryObj = {
  render: () => <SocialEmbed platform="twitter" postUrl="https://twitter.com/example/status/123" />,
};

export const FollowLikeStory: StoryObj = {
  render: () => (
    <FollowLike onFollow={() => {}} onLike={() => {}} liked={false} following={false} />
  ),
};

export const ReactionsBarStory: StoryObj = {
  render: () => (
    <ReactionsBar
      reactions={[
        { emoji: '👍', count: 12 },
        { emoji: '❤️', count: 5 },
        { emoji: '🎉', count: 3 },
      ]}
      onReact={() => {}}
    />
  ),
};

export const CommentsSectionStory: StoryObj = {
  render: () => (
    <CommentsSection
      comments={[
        { id: '1', author: 'Alice', text: 'Great post!' },
        { id: '2', author: 'Bob', text: 'Thanks for sharing.' },
      ]}
      onSubmit={() => {}}
    />
  ),
};

export const SocialLoginButtonsStory: StoryObj = {
  render: () => (
    <SocialLoginButtons providers={['google', 'github', 'twitter']} onLogin={() => {}} />
  ),
};
