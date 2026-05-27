/**
 * @electroplix/components – blog tests
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from './test-utils';
import {
  BlogCard,
  AuthorByline,
  TagList,
  BlogBadge,
  ReadingBar,
  ArticleRenderer,
  RelatedPosts,
  ArchiveList,
  CommentsSection,
} from '../components/blog';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

const samplePost = { id: '1', title: 'Hello World', slug: 'hello-world', excerpt: 'Intro' };

describe('Blog components', () => {
  it('BlogCard renders', () => {
    const { container } = wrap(<BlogCard post={samplePost} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AuthorByline renders', () => {
    const { container } = wrap(<AuthorByline name="Jane Doe" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('TagList renders', () => {
    const { container } = wrap(<TagList tags={['react', 'typescript']} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('BlogBadge renders', () => {
    const { container } = wrap(<BlogBadge label="Featured" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ReadingBar renders', () => {
    const { container } = wrap(<ReadingBar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ArticleRenderer renders', () => {
    const { container } = wrap(<ArticleRenderer html="<p>Content</p>" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('RelatedPosts renders', () => {
    const { container } = wrap(<RelatedPosts posts={[samplePost]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ArchiveList renders', () => {
    const { container } = wrap(<ArchiveList groups={[{ label: '2024', posts: [samplePost] }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('CommentsSection renders', () => {
    const { container } = wrap(<CommentsSection onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });
});
