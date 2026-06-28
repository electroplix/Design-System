import { fireEvent, render, screen } from '@testing-library/react';
/**
 * @electroplix/components – forms tests
 */
import type React from 'react';
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
} from '../components/forms';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('Form components', () => {
  it('FormShell renders', () => {
    const { container } = wrap(
      <FormShell onSubmit={noop}>
        <span>form</span>
      </FormShell>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('InputField renders', () => {
    const { container } = wrap(<InputField name="email" label="Email" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('TextAreaField renders', () => {
    const { container } = wrap(<TextAreaField name="msg" label="Message" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('SelectDropdown renders', () => {
    const { container } = wrap(
      <SelectDropdown name="color" label="Color" options={[{ label: 'Red', value: 'red' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('RadioGroup renders', () => {
    const { container } = wrap(
      <RadioGroup name="plan" options={[{ label: 'Free', value: 'free' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('ToggleSwitch renders', () => {
    const { container } = wrap(<ToggleSwitch name="on" label="Enable" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('DateTimePicker renders', () => {
    const { container } = wrap(<DateTimePicker name="dob" label="Date" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('FileUploader renders', () => {
    const { container } = wrap(<FileUploader name="file" label="Upload" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ContactForm renders', () => {
    const { container } = wrap(<ContactForm onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('NewsletterSignup renders', () => {
    const { container } = wrap(<NewsletterSignup onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('MultiStepWizard renders', () => {
    const { container } = wrap(
      <MultiStepWizard steps={[{ title: 'Step 1', content: <span>1</span> }]} onFinish={noop} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Captcha renders', () => {
    const { container } = wrap(<Captcha onVerify={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AddressAutocomplete renders', () => {
    const { container } = wrap(<AddressAutocomplete name="addr" label="Address" />);
    expect(container.firstChild).toBeTruthy();
  });

  describe('ToggleSwitch behavioral', () => {
    it('renders with label', () => {
      wrap(<ToggleSwitch name="on" label="Enable Feature" />);
      expect(screen.getByText('Enable Feature')).toBeTruthy();
    });

    it('calls onChange with true on click', () => {
      const onChange = jest.fn();
      wrap(<ToggleSwitch name="on" label="Enable" onChange={onChange} />);
      fireEvent.click(screen.getAllByRole('button')[0]);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false on second click', () => {
      const onChange = jest.fn();
      wrap(<ToggleSwitch name="on" label="Enable" defaultChecked onChange={onChange} />);
      fireEvent.click(screen.getAllByRole('button')[0]);
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('toggles on Enter key', () => {
      const onChange = jest.fn();
      wrap(<ToggleSwitch name="on" label="Enable" onChange={onChange} />);
      fireEvent.keyDown(screen.getAllByRole('button')[0], { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('InputField behavioral', () => {
    it('shows label text', () => {
      wrap(<InputField name="email" label="Email Address" />);
      expect(screen.getByText('Email Address')).toBeTruthy();
    });

    it('renders input element', () => {
      wrap(<InputField name="email" label="Email" />);
      expect(screen.getByRole('textbox')).toBeTruthy();
    });
  });

  describe('MultiStepWizard behavioral', () => {
    it('shows first step content', () => {
      wrap(
        <MultiStepWizard
          steps={[
            { title: 'Step 1', content: <span>Step One</span> },
            { title: 'Step 2', content: <span>Step Two</span> },
          ]}
          onFinish={noop}
        />,
      );
      expect(screen.getByText('Step One')).toBeTruthy();
    });

    it('navigates to next step', () => {
      wrap(
        <MultiStepWizard
          steps={[
            { title: 'Step 1', content: <span>Step One</span> },
            { title: 'Step 2', content: <span>Step Two</span> },
          ]}
          onFinish={noop}
        />,
      );
      const nextBtn = screen.getByText('Next');
      fireEvent.click(nextBtn);
      expect(screen.getByText('Step Two')).toBeTruthy();
    });
  });

  describe('RadioGroup behavioral', () => {
    it('renders all options', () => {
      wrap(
        <RadioGroup
          name="plan"
          options={[
            { label: 'Free', value: 'free' },
            { label: 'Pro', value: 'pro' },
          ]}
        />,
      );
      expect(screen.getByText('Free')).toBeTruthy();
      expect(screen.getByText('Pro')).toBeTruthy();
    });
  });
});
