import { render } from '@testing-library/react';
/**
 * @electroplix/components – marketing tests
 */
import type React from 'react';
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
} from '../components/marketing';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('Marketing components', () => {
  it('ComparisonTable renders', () => {
    const { container } = wrap(<ComparisonTable plans={[]} features={[]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('CountdownTimer renders', () => {
    const future = new Date(Date.now() + 86_400_000).toISOString();
    const { container } = wrap(<CountdownTimer targetDate={future} label="Sale ends" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('FeatureHighlights renders', () => {
    const { container } = wrap(
      <FeatureHighlights
        items={[{ id: '1', icon: 'star', title: 'Fast', description: 'Blazing' }]}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('LeadMagnetGate renders', () => {
    const { container } = wrap(
      <LeadMagnetGate title="Free eBook" description="Download now" onSubmit={noop}>
        <span>gated content</span>
      </LeadMagnetGate>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('MarketingHeroBlock renders', () => {
    const { container } = wrap(<MarketingHeroBlock headline="Big Savings" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PromoPopup renders', () => {
    const { container } = wrap(
      <PromoPopup title="Promo" message="50% off!" onCta={noop} onDismiss={noop} isOpen />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('TestimonialsCarousel renders', () => {
    const { container } = wrap(
      <TestimonialsCarousel testimonials={[{ quote: 'Great!', author: 'Jane' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('TrustBadges renders', () => {
    const { container } = wrap(
      <TrustBadges badges={[{ id: '1', label: 'Secure', icon: 'shield' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('StatsCounter renders', () => {
    const { container } = wrap(
      <StatsCounter
        stats={[
          { id: '1', value: '500', label: 'Clients', suffix: '+' },
          { id: '2', value: '99', label: 'Satisfaction', suffix: '%' },
        ]}
        title="Our Impact"
        columns={2}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('HowItWorks renders horizontal', () => {
    const { container } = wrap(
      <HowItWorks
        steps={[
          { id: '1', title: 'Sign Up', description: 'Create your account' },
          { id: '2', title: 'Configure', description: 'Set preferences' },
          { id: '3', title: 'Launch', description: 'Go live' },
        ]}
        title="How It Works"
        layout="horizontal"
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('HowItWorks renders vertical', () => {
    const { container } = wrap(
      <HowItWorks steps={[{ id: '1', title: 'Step 1' }]} layout="vertical" />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
