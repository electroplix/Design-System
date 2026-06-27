import type { Meta, StoryObj } from '@storybook/react';
import {
  AccountSettings,
  AuthForm,
  MultiFactorAuthInput,
  PasswordReset,
  ProfileOverview,
  ProfileSettings,
  RoleBadge,
} from './index';

const meta: Meta = {
  title: 'Components/UserAccounts',
  tags: ['autodocs'],
};
export default meta;

export const AuthFormStory: StoryObj = {
  render: () => <AuthForm mode="login" onSubmit={() => {}} />,
};

export const ProfileOverviewStory: StoryObj = {
  render: () => (
    <ProfileOverview
      name="Jane Doe"
      email="jane@example.com"
      avatar="https://via.placeholder.com/80"
    />
  ),
};

export const AccountSettingsStory: StoryObj = {
  render: () => <AccountSettings onSave={() => {}} />,
};

export const PasswordResetStory: StoryObj = {
  render: () => <PasswordReset onSubmit={() => {}} />,
};

export const MultiFactorAuthInputStory: StoryObj = {
  render: () => <MultiFactorAuthInput length={6} onComplete={() => {}} />,
};

export const RoleBadgeStory: StoryObj = {
  // biome-ignore lint/a11y/useValidAriaRole: role is a component prop, not ARIA
  render: () => <RoleBadge role="admin" />,
};

export const ProfileSettingsStory: StoryObj = {
  render: () => <ProfileSettings onSave={() => {}} />,
};
