/**
 * @electroplix/components – onboarding tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  FAQAccordion, OnboardingWizard, ProductTour,
  TooltipHelp, SupportChat, ContactSupportBlock,
} from "../components/onboarding";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

// jsdom doesn't implement scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

describe("Onboarding components", () => {
  it("FAQAccordion renders", () => {
    const { container } = wrap(
      <FAQAccordion items={[{ question: "Q1", answer: "A1" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("OnboardingWizard renders", () => {
    const { container } = wrap(
      <OnboardingWizard
        steps={[{ title: "Step 1", content: <span>Hi</span> }]}
        onComplete={noop}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("ProductTour renders", () => {
    const { container } = wrap(
      <ProductTour
        steps={[{ target: "#btn", content: "Click here" }]}
        isOpen
        onClose={noop}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("TooltipHelp renders", () => {
    const { container } = wrap(<TooltipHelp text="Info about this field" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("SupportChat renders", () => {
    const { container } = wrap(<SupportChat onSend={noop} isOpen onToggle={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ContactSupportBlock renders", () => {
    const { container } = wrap(
      <ContactSupportBlock email="help@example.com" phone="555-0100" />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
