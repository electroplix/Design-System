'use client';
import {
  ContactSupportBlock,
  FAQAccordion,
  OnboardingWizard,
  ProductTour,
  SupportChat,
  TooltipHelp,
} from '@electroplix/components';

export default function OnboardingTest() {
  return (
    <div>
      <h1>Onboarding</h1>
      <FAQAccordion
        id="faq-1"
        data-testid="faq"
        items={[{ id: '1', question: 'Q?', answer: 'A.' }]}
      />
      <OnboardingWizard id="ow-1" steps={[{ id: '1', title: 'Welcome' }]} />
      <ProductTour
        id="pt-1"
        steps={[{ id: '1', title: 'Step', content: 'Hello' }]}
        isOpen={false}
      />
      <TooltipHelp id="th-1" text="Help text" />
      <SupportChat id="sc-1" />
      <ContactSupportBlock id="csb-1" />
    </div>
  );
}
