'use client';
import {
  ComparisonTable,
  CountdownTimer,
  FeatureHighlights,
  HowItWorks,
  LeadMagnetGate,
  MarketingHeroBlock,
  PromoPopup,
  StatsCounter,
  TestimonialsCarousel,
  TrustBadges,
} from '@electroplix/components';

export default function MarketingTest() {
  return (
    <div>
      <h1>Marketing</h1>
      <ComparisonTable id="ct-1" data-testid="comparison" plans={[]} features={[]} />
      <CountdownTimer id="cdt-1" targetDate="2026-12-31" />
      <FeatureHighlights id="fh-1" items={[]} />
      <LeadMagnetGate id="lmg-1" title="Free Guide" onSubmit={() => {}} />
      <MarketingHeroBlock id="mhb-1" headline="Welcome" />
      <PromoPopup id="pp-1" title="Sale" isOpen={false} />
      <TestimonialsCarousel id="tc-1" testimonials={[]} />
      <TrustBadges id="tb-1" badges={[{ id: '1', label: 'Secure', icon: 'shield' }]} />
      <StatsCounter id="sc-1" stats={[]} />
      <HowItWorks id="hiw-1" steps={[]} />
    </div>
  );
}
