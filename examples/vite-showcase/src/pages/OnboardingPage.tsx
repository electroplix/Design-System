import {
  ContactSupportBlock,
  FAQAccordion,
  OnboardingWizard,
  ProductTour,
  SupportChat,
  TooltipHelp,
} from '@electroplix/components';
import { useState } from 'react';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleFAQ } from '../data/samples';

const noop = () => {};

export default function OnboardingPage() {
  const [tourOpen, setTourOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <CategoryPage
      slug="onboarding"
      title="Onboarding"
      description="Wizards, tours, FAQs, tooltips, in-app support."
      componentCount={6}
    >
      <ComponentDemo name="FAQAccordion">
        <FAQAccordion items={sampleFAQ} title="Frequently asked" />
      </ComponentDemo>
      <ComponentDemo name="OnboardingWizard">
        <OnboardingWizard
          steps={[
            { id: '1', title: 'Welcome', description: 'Quick intro.', content: <p>Welcome!</p> },
            {
              id: '2',
              title: 'Profile',
              description: 'Tell us about you.',
              content: <p>Form here.</p>,
            },
            { id: '3', title: 'Done', description: 'You are all set.', content: <p>Finished.</p> },
          ]}
          onComplete={noop}
        />
      </ComponentDemo>
      <ComponentDemo name="ProductTour">
        <button
          type="button"
          id="tour-target"
          onClick={() => setTourOpen(true)}
          style={{ padding: '0.5rem 1rem' }}
        >
          Start tour
        </button>
        <ProductTour
          steps={[
            {
              id: '1',
              title: 'Step 1',
              content: 'This is the trigger.',
              targetSelector: '#tour-target',
            },
          ]}
          isOpen={tourOpen}
          onClose={() => setTourOpen(false)}
        />
      </ComponentDemo>
      <ComponentDemo name="TooltipHelp">
        <TooltipHelp text="Helpful info about this field" position="top" />
      </ComponentDemo>
      <ComponentDemo name="SupportChat">
        <SupportChat onSend={noop} isOpen={chatOpen} onToggle={() => setChatOpen((o) => !o)} />
      </ComponentDemo>
      <ComponentDemo name="ContactSupportBlock">
        <ContactSupportBlock
          email="help@electroplix.com"
          phone="+1 (555) 010-2000"
          title="Need help?"
          description="Our team replies within 24h."
        />
      </ComponentDemo>
    </CategoryPage>
  );
}
