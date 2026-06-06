'use client';
import {
  AddressAutocomplete,
  Captcha,
  ContactForm,
  DateTimePicker,
  FileUploader,
  FormShell,
  InputField,
  MultiStepWizard,
  NewsletterSignup,
  RadioGroup,
  SelectDropdown,
  TextAreaField,
  ToggleSwitch,
  ValidationWrapper,
} from '@electroplix/components';

export default function FormsTest() {
  return (
    <div>
      <h1>Forms</h1>
      <FormShell id="fs-1" data-testid="form-shell" />
      <InputField id="if-1" label="Name" name="name" />
      <TextAreaField id="taf-1" label="Bio" name="bio" />
      <SelectDropdown id="sd-1" label="Country" name="country" options={[]} />
      <RadioGroup id="rg-1" label="Gender" name="gender" options={[]} />
      <ToggleSwitch id="ts-1" label="Notifications" />
      <DateTimePicker id="dtp-1" label="Date" name="date" />
      <FileUploader id="fu-1" />
      <ContactForm id="cf-1" />
      <NewsletterSignup id="ns-1" />
      <MultiStepWizard id="msw-1" steps={[]} />
      <Captcha id="cap-1" />
      <AddressAutocomplete id="aa-1" name="address" />
      <ValidationWrapper id="vw-1" />
    </div>
  );
}
