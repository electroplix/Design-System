'use client';
import {
  AccountSettings,
  AuthForm,
  MultiFactorAuthInput,
  PasswordReset,
  ProfileOverview,
  ProfileSettings,
  RoleBadge,
} from '@electroplix/components';

export default function UserAccountsTest() {
  return (
    <div>
      <h1>User Accounts</h1>
      <AuthForm id="af-1" data-testid="auth-form" mode="login" />
      <PasswordReset id="pr-1" />
      <MultiFactorAuthInput id="mfa-1" />
      <ProfileOverview id="po-1" name="Alice" email="alice@example.com" />
      <ProfileSettings id="ps-1" />
      <AccountSettings id="as-1" sections={[]} />
      {/* biome-ignore lint/a11y/useValidAriaRole: role is a component prop */}
      <RoleBadge id="rb-1" role="Admin" />
    </div>
  );
}
