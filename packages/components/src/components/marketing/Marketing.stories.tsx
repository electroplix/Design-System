import type { Meta, StoryObj } from '@storybook/react';
import {
  ComparisonTable,
  FeatureGrid,
  FeatureHighlights,
  HowItWorks,
  PricingTable,
  StatsCounter,
  TestimonialsCarousel,
  TrustBadges,
} from './index';

const meta: Meta = {
  title: 'Components/Marketing',
  tags: ['autodocs'],
};
export default meta;

export const PricingTableStory: StoryObj = {
  render: () => (
    <PricingTable
      plans={[
        { id: '1', name: 'Basic', price: '$9/mo', features: ['Feature A'] },
        { id: '2', name: 'Pro', price: '$29/mo', features: ['Feature A', 'Feature B'] },
      ]}
    />
  ),
};

export const FeatureGridStory: StoryObj = {
  render: () => (
    <FeatureGrid
      features={[
        { id: '1', title: 'Fast', description: 'Lightning speed' },
        { id: '2', title: 'Secure', description: 'Enterprise security' },
      ]}
    />
  ),
};

export const TestimonialsCarouselStory: StoryObj = {
  render: () => (
    <TestimonialsCarousel
      testimonials={[
        { id: '1', author: 'Jane', quote: 'Amazing product!' },
        { id: '2', author: 'John', quote: 'Highly recommend.' },
      ]}
    />
  ),
};

export const ComparisonTableStory: StoryObj = {
  render: () => (
    <ComparisonTable
      items={[
        { feature: 'Speed', optionA: 'Fast', optionB: 'Faster' },
        { feature: 'Price', optionA: '$10', optionB: '$20' },
      ]}
    />
  ),
};

export const StatsCounterStory: StoryObj = {
  render: () => (
    <StatsCounter
      stats={[
        { label: 'Users', value: 10000 },
        { label: 'Downloads', value: 50000 },
      ]}
    />
  ),
};

export const HowItWorksStory: StoryObj = {
  render: () => (
    <HowItWorks
      steps={[
        { id: '1', title: 'Sign Up', description: 'Create an account' },
        { id: '2', title: 'Configure', description: 'Set your preferences' },
        { id: '3', title: 'Launch', description: 'Go live' },
      ]}
    />
  ),
};

export const TrustBadgesStory: StoryObj = {
  render: () => (
    <TrustBadges
      badges={[
        { id: '1', label: 'SSL Secured', icon: '🔒' },
        { id: '2', label: '99.9% Uptime', icon: '⚡' },
      ]}
    />
  ),
};

export const FeatureHighlightsStory: StoryObj = {
  render: () => (
    <FeatureHighlights
      highlights={[
        { id: '1', title: 'AI Powered', description: 'Smart automation' },
        { id: '2', title: 'Real-time', description: 'Instant updates' },
      ]}
    />
  ),
};
