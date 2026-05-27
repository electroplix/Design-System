import type { Meta, StoryObj } from '@storybook/react';
import {
  ContactForm,
  DateTimePicker,
  FileUploader,
  InputField,
  MultiStepWizard,
  NewsletterSignup,
  RadioGroup,
  SelectDropdown,
  TextAreaField,
  ToggleSwitch,
  ValidationWrapper,
} from './index';

const meta: Meta = {
  title: 'Components/Forms',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const ContactFormStory: Story = {
  render: () => <ContactForm onSubmit={() => {}} />,
};

export const NewsletterSignupStory: Story = {
  render: () => <NewsletterSignup onSubscribe={() => {}} />,
};

export const InputFieldStory: Story = {
  render: () => <InputField label="Email" name="email" placeholder="you@example.com" />,
};

export const SelectDropdownStory: Story = {
  render: () => (
    <SelectDropdown
      label="Country"
      name="country"
      options={[
        { label: 'USA', value: 'us' },
        { label: 'UK', value: 'uk' },
        { label: 'India', value: 'in' },
      ]}
    />
  ),
};

export const TextAreaFieldStory: Story = {
  render: () => <TextAreaField label="Message" name="message" placeholder="Type here..." />,
};

export const RadioGroupStory: Story = {
  render: () => (
    <RadioGroup
      label="Plan"
      name="plan"
      options={[
        { label: 'Free', value: 'free' },
        { label: 'Pro', value: 'pro' },
      ]}
    />
  ),
};

export const DateTimePickerStory: Story = {
  render: () => <DateTimePicker label="Appointment" name="appointment" />,
};

export const FileUploaderStory: Story = {
  render: () => <FileUploader label="Upload Resume" name="resume" accept=".pdf,.docx" />,
};

export const ToggleSwitchStory: Story = {
  render: () => <ToggleSwitch label="Dark Mode" name="darkMode" />,
};

export const ValidationWrapperStory: Story = {
  render: () => (
    <ValidationWrapper error="This field is required">
      <InputField label="Name" name="name" />
    </ValidationWrapper>
  ),
};

export const MultiStepWizardStory: Story = {
  render: () => (
    <MultiStepWizard
      steps={[
        { label: 'Account', content: <p>Step 1</p> },
        { label: 'Profile', content: <p>Step 2</p> },
        { label: 'Confirm', content: <p>Step 3</p> },
      ]}
    />
  ),
};
