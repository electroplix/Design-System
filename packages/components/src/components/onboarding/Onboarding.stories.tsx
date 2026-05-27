import type { Meta, StoryObj } from '@storybook/react';
import {
  AppInstallBanner,
  FAQAccordion,
  OnboardingWizard,
  ProductTour,
  Stepper,
  SupportChat,
  WelcomePopup,
} from './index';

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

export const WelcomePopupStory: StoryObj = {
  render: () => (
    <WelcomePopup open title="Welcome!" message="Thanks for joining." onClose={() => {}} />
  ),
};

export const AppInstallBannerStory: StoryObj = {
  render: () => <AppInstallBanner appName="MyApp" onInstall={() => {}} onDismiss={() => {}} />,
};

export const StepperStory: StoryObj = {
  render: () => (
    <Stepper
      steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
      activeStep={1}
    />
  ),
};

export const SupportChatStory: StoryObj = {
  render: () => <SupportChat />,
};
