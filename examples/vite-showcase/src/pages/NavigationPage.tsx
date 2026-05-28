import { Footer, MegaMenu, PrimaryNav } from '@electroplix/components';

export default function NavigationPage() {
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Primary Navigation</h3>
        <PrimaryNav logoText="ELECTROPLIX" />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Mega Menu Showcase</h3>
        <MegaMenu
          label="Solutions"
          sections={[
            {
              title: 'Product',
              links: [
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
              ],
            },
          ]}
        />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h3>Footer Implementation</h3>
        <Footer />
      </div>
    </>
  );
}
