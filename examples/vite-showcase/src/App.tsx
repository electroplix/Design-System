import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ElectroplixProvider, StaticHero, PrimaryNav } from '@electroplix/components';
import ButtonsPage from './pages/ButtonsPage';
import FormsPage from './pages/FormsPage';
import NavigationPage from './pages/NavigationPage';

function HomePage() {
  return (
    <>
      <StaticHero
        title="Modern Component Library"
        subtitle="Robust, Enterprise-Ready Design System"
        ctaText="Explore Showcase"
      />
      <div style={{ padding: '2rem' }}>
        <h1>Electroplix Design System Showcase</h1>
        <p>This is the official gallery for validating and testing components in development.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/buttons">Buttons</Link>
          <Link to="/forms">Forms</Link>
          <Link to="/navigation">Navigation</Link>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ElectroplixProvider>
      <BrowserRouter>
        <PrimaryNav logo="ELECTROPLIX" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
        </Routes>
      </BrowserRouter>
    </ElectroplixProvider>
  );
}

export default App;
