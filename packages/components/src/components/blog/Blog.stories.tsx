import type { Meta, StoryObj } from '@storybook/react';
import {
  ArchiveList,
  ArticleRenderer,
  AuthorByline,
  BlogCard,
  CommentsBox,
  ReadingBar,
  RelatedPosts,
  TagList,
} from './index';

const meta: Meta = {
  title: 'Components/Blog',
  tags: ['autodocs'],
};
export default meta;

export const BlogCardStory: StoryObj = {
  render: () => (
    <BlogCard
      title="Getting Started with Electroplix"
      excerpt="Learn how to set up your first project."
      date="2024-03-15"
      slug="/blog/getting-started"
    />
  ),
};

export const ArticleRendererStory: StoryObj = {
  render: () => <ArticleRenderer content="<h1>Hello World</h1><p>This is a sample article.</p>" />,
};

export const CommentsBoxStory: StoryObj = {
  render: () => (
    <CommentsBox
      comments={[
        { id: '1', author: 'Alice', text: 'Great article!' },
        { id: '2', author: 'Bob', text: 'Very helpful.' },
      ]}
      onSubmit={() => {}}
    />
  ),
};

export const RelatedPostsStory: StoryObj = {
  render: () => (
    <RelatedPosts
      posts={[
        { id: '1', title: 'Advanced Patterns', slug: '/blog/advanced' },
        { id: '2', title: 'Performance Tips', slug: '/blog/performance' },
      ]}
    />
  ),
};

export const ReadingBarStory: StoryObj = {
  render: () => <ReadingBar />,
};

export const ArchiveListStory: StoryObj = {
  render: () => (
    <ArchiveList
      items={[
        { id: '1', title: 'January 2024', count: 5, url: '/archive/2024-01' },
        { id: '2', title: 'February 2024', count: 3, url: '/archive/2024-02' },
      ]}
    />
  ),
};

export const AuthorBylineStory: StoryObj = {
  render: () => (
    <AuthorByline name="Jane Doe" avatar="https://via.placeholder.com/40" date="2024-03-15" />
  ),
};

export const TagListStory: StoryObj = {
  render: () => <TagList tags={['react', 'design-system', 'typescript', 'storybook']} />,
};
