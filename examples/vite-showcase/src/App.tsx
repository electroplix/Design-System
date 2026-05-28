import { ElectroplixProvider } from '@electroplix/components';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { CATEGORIES } from './data/catalog';
import BlogPage from './pages/BlogPage';
import ButtonsPage from './pages/ButtonsPage';
import ContentPage from './pages/ContentPage';
import DataDisplayPage from './pages/DataDisplayPage';
import EcommercePage from './pages/EcommercePage';
import FormsPage from './pages/FormsPage';
import HeroPage from './pages/HeroPage';
import HomePage from './pages/HomePage';
import ListsCardsPage from './pages/ListsCardsPage';
import MarketingPage from './pages/MarketingPage';
import MediaPage from './pages/MediaPage';
import MiscellaneousPage from './pages/MiscellaneousPage';
import ModalsPage from './pages/ModalsPage';
import NavigationPage from './pages/NavigationPage';
import OnboardingPage from './pages/OnboardingPage';
import SearchPage from './pages/SearchPage';
import SiteIdentityPage from './pages/SiteIdentityPage';
import SocialPage from './pages/SocialPage';
import UserAccountsPage from './pages/UserAccountsPage';

/**
 * Showcase navigation header.
 *
 * Uses a plain semantic <nav> rather than the PrimaryNav component so the
 * showcase chrome does not interfere with PrimaryNav being demonstrated as
 * a component on the Navigation page.
 */
function ShowcaseHeader() {
  return (
    <nav
      data-test="showcase-header"
      aria-label="Showcase navigation"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e4e4e7',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: 800,
          color: '#09090b',
          textDecoration: 'none',
          letterSpacing: '-0.04em',
          fontSize: 18,
        }}
      >
        ELECTROPLIX
      </Link>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          maxWidth: '70%',
          justifyContent: 'flex-end',
        }}
      >
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/${c.slug}`}
            style={{
              padding: '0.25rem 0.6rem',
              fontSize: 12,
              fontWeight: 500,
              color: '#52525b',
              textDecoration: 'none',
              borderRadius: 6,
              border: '1px solid #f4f4f5',
              background: '#fafafa',
            }}
          >
            {c.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <ElectroplixProvider>
      <BrowserRouter>
        <ShowcaseHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/hero" element={<HeroPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/data-display" element={<DataDisplayPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/lists-cards" element={<ListsCardsPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/miscellaneous" element={<MiscellaneousPage />} />
          <Route path="/modals" element={<ModalsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/site-identity" element={<SiteIdentityPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/user-accounts" element={<UserAccountsPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </ElectroplixProvider>
  );
}

export default App;
