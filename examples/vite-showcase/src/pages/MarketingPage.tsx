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
import { useState } from 'react';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import {
  sampleFeatures,
  sampleHowItWorksSteps,
  sampleStats,
  sampleTestimonials,
  sampleTrustBadges,
} from '../data/samples';

const noop = () => {};

export default function MarketingPage() {
  const [promoOpen, setPromoOpen] = useState(false);

  return (
    <CategoryPage
      slug="marketing"
      title="Marketing"
      description="Landing-page primitives: comparison, countdown, CTAs, stats."
      componentCount={10}
    >
      <ComponentDemo name="ComparisonTable">
        <ComparisonTable
          plans={[
            { id: 'free', name: 'Free', price: '$0' },
            { id: 'pro', name: 'Pro', price: '$29', highlighted: true },
            { id: 'ent', name: 'Enterprise', price: 'Contact' },
          ]}
          features={[
            { label: 'Projects', values: { free: '3', pro: 'Unlimited', ent: 'Unlimited' } },
            { label: 'Custom domains', values: { free: false, pro: true, ent: true } },
            { label: 'SLA', values: { free: false, pro: false, ent: true } },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="CountdownTimer">
        <CountdownTimer
          targetDate={new Date(Date.now() + 86_400_000 * 7).toISOString()}
          label="Sale ends in"
        />
      </ComponentDemo>
      <ComponentDemo name="FeatureHighlights">
        <FeatureHighlights items={sampleFeatures} columns={3} title="Why Electroplix" />
      </ComponentDemo>
      <ComponentDemo name="LeadMagnetGate">
        <LeadMagnetGate title="Free eBook" description="Drop your email below" onSubmit={noop}>
          <span>Gated content goes here.</span>
        </LeadMagnetGate>
      </ComponentDemo>
      <ComponentDemo name="MarketingHeroBlock">
        <MarketingHeroBlock
          eyebrow="LIMITED TIME"
          headline="Big savings on every plan"
          subheadline="Upgrade today and save 40%."
          ctaLabel="Upgrade now"
        />
      </ComponentDemo>
      <ComponentDemo name="PromoPopup">
        <button
          type="button"
          onClick={() => setPromoOpen(true)}
          style={{ padding: '0.5rem 1rem', borderRadius: 8 }}
        >
          Open promo
        </button>
        <PromoPopup
          title="Special offer"
          message="Get 30% off this week!"
          isOpen={promoOpen}
          onCta={() => setPromoOpen(false)}
          onDismiss={() => setPromoOpen(false)}
        />
      </ComponentDemo>
      <ComponentDemo name="TestimonialsCarousel">
        <TestimonialsCarousel testimonials={sampleTestimonials} />
      </ComponentDemo>
      <ComponentDemo name="TrustBadges">
        <TrustBadges badges={sampleTrustBadges} title="Trusted by teams worldwide" />
      </ComponentDemo>
      <ComponentDemo name="StatsCounter">
        <StatsCounter stats={sampleStats} title="Our impact" columns={4} />
      </ComponentDemo>
      <ComponentDemo name="HowItWorks">
        <HowItWorks steps={sampleHowItWorksSteps} title="How it works" />
      </ComponentDemo>
    </CategoryPage>
  );
}
