'use client';
import {
  ArchiveList,
  ArticleRenderer,
  AuthorByline,
  BlogBadge,
  BlogCard,
  CommentsSection,
  ReadingBar,
  RelatedPosts,
  TagList,
} from '@electroplix/components';

const post = { id: '1', title: 'Test Post', excerpt: 'A test post.' };

export default function BlogTest() {
  return (
    <div>
      <h1>Blog</h1>
      <BlogCard id="bc-1" data-testid="blog-card" post={post} />
      <AuthorByline id="ab-1" name="Test Author" />
      <TagList id="tl-1" tags={['React', 'Next.js']} />
      <BlogBadge id="bb-1" label="New" />
      <ReadingBar id="rb-1" />
      <ArticleRenderer id="ar-1" html="<p>Hello</p>" />
      <RelatedPosts id="rp-1" posts={[post]} />
      <ArchiveList id="al-1" groups={[{ label: '2026', posts: [post] }]} />
      <CommentsSection id="cs-1" comments={[]} />
    </div>
  );
}
