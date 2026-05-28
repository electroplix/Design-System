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
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';

const noop = () => {};

export default function FormsPage() {
  return (
    <CategoryPage
      slug="forms"
      title="Forms"
      description="Inputs, selects, wizards, validation — full form toolkit."
      componentCount={14}
    >
      <ComponentDemo name="FormShell">
        <FormShell onSubmit={(e) => e.preventDefault()}>
          <span>Wrap your form fields here.</span>
        </FormShell>
      </ComponentDemo>
      <ComponentDemo name="InputField">
        <InputField name="email" label="Email" placeholder="you@example.com" />
      </ComponentDemo>
      <ComponentDemo name="TextAreaField">
        <TextAreaField name="msg" label="Message" placeholder="Tell us more…" rows={4} />
      </ComponentDemo>
      <ComponentDemo name="SelectDropdown">
        <SelectDropdown
          name="color"
          label="Color"
          options={[
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="RadioGroup">
        <RadioGroup
          name="plan"
          label="Plan"
          options={[
            { label: 'Free', value: 'free' },
            { label: 'Pro', value: 'pro' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="ToggleSwitch">
        <ToggleSwitch name="notify" label="Email notifications" />
      </ComponentDemo>
      <ComponentDemo name="DateTimePicker">
        <DateTimePicker name="dob" label="Date of birth" />
      </ComponentDemo>
      <ComponentDemo name="FileUploader">
        <FileUploader name="file" label="Upload a file" />
      </ComponentDemo>
      <ComponentDemo name="ContactForm">
        <ContactForm onSubmit={noop} />
      </ComponentDemo>
      <ComponentDemo name="NewsletterSignup">
        <NewsletterSignup onSubmit={noop} />
      </ComponentDemo>
      <ComponentDemo name="MultiStepWizard">
        <MultiStepWizard
          steps={[
            { title: 'Step 1', content: <span>Welcome</span> },
            { title: 'Step 2', content: <span>Details</span> },
            { title: 'Step 3', content: <span>Confirm</span> },
          ]}
          onFinish={noop}
        />
      </ComponentDemo>
      <ComponentDemo name="Captcha">
        <Captcha onVerify={noop} />
      </ComponentDemo>
      <ComponentDemo name="AddressAutocomplete">
        <AddressAutocomplete name="addr" label="Address" />
      </ComponentDemo>
      <ComponentDemo name="ValidationWrapper">
        <ValidationWrapper>
          <InputField name="username" label="Username" />
        </ValidationWrapper>
      </ComponentDemo>
    </CategoryPage>
  );
}
