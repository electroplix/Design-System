'use client';
import {
  AnimatedBrandMark,
  BrandIconGrid,
  BrandingShell,
  FaviconUploader,
  LogoDisplay,
  Taglines,
} from '@electroplix/components';

export default function SiteIdentityTest() {
  return (
    <div>
      <h1>Site Identity</h1>
      <LogoDisplay id="ld-1" data-testid="logo" src="https://placehold.co/140x40" />
      <AnimatedBrandMark id="abm-1" text="Brand" />
      <Taglines id="tg-1" lines={['Build better.']} />
      <BrandingShell id="bs-1" brandName="Electroplix" />
      <BrandIconGrid id="big-1" icons={[]} />
      <FaviconUploader id="fu-1" />
    </div>
  );
}
