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
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleBlogComments, sampleBlogPost, sampleBlogPosts } from '../data/samples';

const noop = () => {};

export default function BlogPage() {
  return (
    <CategoryPage
      slug="blog"
      title="Blog"
      description="Cards, bylines, tags, archives, comments, related posts."
      componentCount={9}
    >
      <ComponentDemo name="BlogCard">
        <BlogCard post={sampleBlogPost} />
      </ComponentDemo>
      <ComponentDemo name="AuthorByline">
        <AuthorByline name="Adnan Mukati" date="Apr 12, 2026" readTime="7 min read" />
      </ComponentDemo>
      <ComponentDemo name="TagList">
        <TagList tags={['react', 'typescript', 'design-systems', 'a11y']} />
      </ComponentDemo>
      <ComponentDemo name="BlogBadge">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <BlogBadge label="Featured" />
          <BlogBadge label="Updated" color="#16a34a" />
        </div>
      </ComponentDemo>
      <ComponentDemo name="ReadingBar">
        <ReadingBar />
      </ComponentDemo>
      <ComponentDemo name="ArticleRenderer">
        <ArticleRenderer html="<p>This is rendered <strong>HTML</strong> content.</p>" />
      </ComponentDemo>
      <ComponentDemo name="RelatedPosts">
        <RelatedPosts posts={sampleBlogPosts} title="You might also like" />
      </ComponentDemo>
      <ComponentDemo name="ArchiveList">
        <ArchiveList groups={[{ label: '2026', posts: sampleBlogPosts }]} />
      </ComponentDemo>
      <ComponentDemo name="CommentsSection">
        <CommentsSection comments={sampleBlogComments} onSubmit={noop} />
      </ComponentDemo>
    </CategoryPage>
  );
}
