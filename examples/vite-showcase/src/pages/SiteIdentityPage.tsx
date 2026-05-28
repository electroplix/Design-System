import {
  AnimatedBrandMark,
  BrandIconGrid,
  BrandingShell,
  FaviconUploader,
  LogoDisplay,
  Taglines,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';

const noop = () => {};

export default function SiteIdentityPage() {
  return (
    <CategoryPage
      slug="site-identity"
      title="Site Identity"
      description="Logos, brand marks, taglines, favicon and brand grids."
      componentCount={6}
    >
      <ComponentDemo name="LogoDisplay">
        <LogoDisplay
          src="https://placehold.co/140x40/0b0b0c/ffffff?text=ELECTROPLIX"
          alt="Electroplix logo"
          href="/"
        />
      </ComponentDemo>
      <ComponentDemo name="AnimatedBrandMark">
        <AnimatedBrandMark text="ELECTROPLIX" />
      </ComponentDemo>
      <ComponentDemo name="Taglines">
        <Taglines lines={['Build fast.', 'Ship faster.', 'Stay consistent.']} rotate />
      </ComponentDemo>
      <ComponentDemo name="BrandingShell">
        <BrandingShell brandName="Electroplix" tagline="Modern design system">
          <span>Branded content goes here.</span>
        </BrandingShell>
      </ComponentDemo>
      <ComponentDemo name="BrandIconGrid">
        <BrandIconGrid
          icons={[
            { id: '1', src: 'https://placehold.co/64x64/0b0b0c/ffffff?text=A', name: 'Acme' },
            { id: '2', src: 'https://placehold.co/64x64/0b0b0c/ffffff?text=B', name: 'Beta' },
            { id: '3', src: 'https://placehold.co/64x64/0b0b0c/ffffff?text=C', name: 'Cosmo' },
            { id: '4', src: 'https://placehold.co/64x64/0b0b0c/ffffff?text=D', name: 'Delta' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="FaviconUploader">
        <FaviconUploader onUpload={noop} />
      </ComponentDemo>
    </CategoryPage>
  );
}
