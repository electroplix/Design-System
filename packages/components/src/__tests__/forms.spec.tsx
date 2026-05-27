/**
 * @electroplix/components – forms tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  FormShell, InputField, TextAreaField, SelectDropdown,
  RadioGroup, ToggleSwitch, DateTimePicker, FileUploader,
  ContactForm, NewsletterSignup, MultiStepWizard, Captcha,
  AddressAutocomplete,
} from "../components/forms";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe("Form components", () => {
  it("FormShell renders", () => {
    const { container } = wrap(<FormShell onSubmit={noop}><span>form</span></FormShell>);
    expect(container.firstChild).toBeTruthy();
  });

  it("InputField renders", () => {
    const { container } = wrap(<InputField name="email" label="Email" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("TextAreaField renders", () => {
    const { container } = wrap(<TextAreaField name="msg" label="Message" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("SelectDropdown renders", () => {
    const { container } = wrap(
      <SelectDropdown name="color" label="Color" options={[{ label: "Red", value: "red" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("RadioGroup renders", () => {
    const { container } = wrap(
      <RadioGroup name="plan" options={[{ label: "Free", value: "free" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("ToggleSwitch renders", () => {
    const { container } = wrap(<ToggleSwitch name="on" label="Enable" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("DateTimePicker renders", () => {
    const { container } = wrap(<DateTimePicker name="dob" label="Date" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("FileUploader renders", () => {
    const { container } = wrap(<FileUploader name="file" label="Upload" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ContactForm renders", () => {
    const { container } = wrap(<ContactForm onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("NewsletterSignup renders", () => {
    const { container } = wrap(<NewsletterSignup onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("MultiStepWizard renders", () => {
    const { container } = wrap(
      <MultiStepWizard steps={[{ label: "Step 1", content: <span>1</span> }]} onComplete={noop} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("Captcha renders", () => {
    const { container } = wrap(<Captcha onVerify={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("AddressAutocomplete renders", () => {
    const { container } = wrap(<AddressAutocomplete name="addr" label="Address" />);
    expect(container.firstChild).toBeTruthy();
  });
});
