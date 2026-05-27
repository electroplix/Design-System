import { Footer, MegaMenu, PrimaryNav } from '@electroplix/components';

export default function NavigationPage() {
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Primary Navigation</h3>
        <PrimaryNav logo="ELECTROPLIX" />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Mega Menu Showcase</h3>
        <MegaMenu title="Solutions" />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h3>Footer Implementation</h3>
        <Footer />
      </div>
    </>
  );
}
