import type { ReactNode } from 'react';

interface ComponentDemoProps {
  name: string;
  description?: string;
  children: ReactNode;
}

/**
 * Wrapper for a single component demo on a category page.
 * Provides consistent header + body layout and a stable test selector.
 */
export function ComponentDemo({ name, description, children }: ComponentDemoProps) {
  return (
    <article
      data-component={name}
      style={{
        border: '1px solid #e4e4e7',
        borderRadius: 12,
        padding: '1.25rem',
        background: '#ffffff',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
      }}
    >
      <header
        style={{
          marginBottom: '1rem',
          borderBottom: '1px solid #f4f4f5',
          paddingBottom: '0.75rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#09090b' }}>{name}</h3>
        {description && (
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>{description}</p>
        )}
      </header>
      <div>{children}</div>
    </article>
  );
}

interface CategoryPageProps {
  slug: string;
  title: string;
  description: string;
  componentCount: number;
  children: ReactNode;
}

/**
 * Wrapper for a category showcase page. Renders a heading with stable
 * test selectors and a vertical stack of component demos.
 */
export function CategoryPage({
  slug,
  title,
  description,
  componentCount,
  children,
}: CategoryPageProps) {
  return (
    <main data-category={slug} style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p
          style={{
            margin: 0,
            color: '#71717a',
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {componentCount} components
        </p>
        <h2 style={{ margin: '4px 0 8px', fontSize: 32, color: '#09090b' }}>{title}</h2>
        <p style={{ margin: 0, color: '#52525b', fontSize: 16, maxWidth: 720 }}>{description}</p>
      </header>
      <div style={{ display: 'grid', gap: '1.25rem' }}>{children}</div>
    </main>
  );
}
