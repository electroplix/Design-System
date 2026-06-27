import type { Meta, StoryObj } from '@storybook/react';
import { FAQAccordion, OnboardingWizard, ProductTour, SupportChat } from './index';

const meta: Meta = {
  title: 'Components/Onboarding',
  tags: ['autodocs'],
};
export default meta;

export const OnboardingWizardStory: StoryObj = {
  render: () => (
    <OnboardingWizard
      steps={[
        { id: '1', title: 'Welcome', content: 'Get started here.' },
        { id: '2', title: 'Setup', content: 'Configure your account.' },
      ]}
    />
  ),
};

export const FAQAccordionStory: StoryObj = {
  render: () => (
    <FAQAccordion
      items={[
        { id: '1', question: 'What is this?', answer: 'A design system.' },
        { id: '2', question: 'How do I start?', answer: 'Install the package.' },
      ]}
    />
  ),
};

export const ProductTourStory: StoryObj = {
  render: () => (
    <ProductTour
      steps={[
        { target: '#btn1', content: 'Click here to begin' },
        { target: '#btn2', content: 'Then click here' },
      ]}
    />
  ),
};

export const SupportChatStory: StoryObj = {
  render: () => <SupportChat />,
};
