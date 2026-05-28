import { StaticHero } from '@electroplix/components';
import { Link } from 'react-router-dom';
import { CATEGORIES, TOTAL_COMPONENTS } from '../data/catalog';

export default function HomePage() {
  return (
    <main data-page="home">
      <StaticHero
        title="Electroplix Design System Showcase"
        subtitle={`${TOTAL_COMPONENTS} components across ${CATEGORIES.length} categories — every primitive in one gallery.`}
        ctaLabel="Browse components"
      />

      <section
        id="categories"
        style={{ padding: '3rem 2rem', maxWidth: 1200, margin: '0 auto' }}
        data-test="category-grid"
      >
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 28, color: '#09090b' }}>Component Categories</h2>
          <p style={{ margin: '8px auto 0', maxWidth: 640, color: '#52525b' }}>
            Each category page renders every component in that category with realistic sample data,
            so you can validate behavior visually and via Playwright.
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              data-category-link={c.slug}
              style={{
                display: 'block',
                padding: '1.25rem',
                border: '1px solid #e4e4e7',
                borderRadius: 12,
                background: '#ffffff',
                textDecoration: 'none',
                color: '#09090b',
                boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(9,9,11,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(9,9,11,0.04)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 6,
                }}
              >
                <strong style={{ fontSize: 16 }}>{c.title}</strong>
                <span style={{ fontSize: 12, color: '#71717a' }}>{c.components.length}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#52525b', lineHeight: 1.5 }}>
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
