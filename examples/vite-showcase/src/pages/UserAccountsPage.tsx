import {
  AccountSettings,
  AuthForm,
  MultiFactorAuthInput,
  PasswordReset,
  ProfileOverview,
  ProfileSettings,
  RoleBadge,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleSettingsSections } from '../data/samples';

const noop = () => {};

export default function UserAccountsPage() {
  return (
    <CategoryPage
      slug="user-accounts"
      title="User Accounts"
      description="Auth, password reset, MFA, profiles, account settings."
      componentCount={7}
    >
      <ComponentDemo name="AuthForm">
        <AuthForm onSubmit={noop} mode="login" />
      </ComponentDemo>
      <ComponentDemo name="PasswordReset">
        <PasswordReset onSubmit={noop} />
      </ComponentDemo>
      <ComponentDemo name="MultiFactorAuthInput">
        <MultiFactorAuthInput length={6} onComplete={noop} />
      </ComponentDemo>
      <ComponentDemo name="ProfileOverview">
        {/* biome-ignore lint/a11y/useValidAriaRole: role is a component prop */}
        <ProfileOverview
          name="Alice Chen"
          email="alice@electroplix.com"
          role="Engineer"
          avatar="https://placehold.co/96x96/0b0b0c/ffffff?text=A"
        />
      </ComponentDemo>
      <ComponentDemo name="ProfileSettings">
        <ProfileSettings onSave={noop} />
      </ComponentDemo>
      <ComponentDemo name="AccountSettings">
        <AccountSettings sections={sampleSettingsSections} />
      </ComponentDemo>
      <ComponentDemo name="RoleBadge">
        {/* biome-ignore lint/a11y/useValidAriaRole: role is a component prop */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <RoleBadge role="Admin" variant="admin" />
          <RoleBadge role="Editor" variant="editor" />
          <RoleBadge role="Viewer" variant="viewer" />
        </div>
      </ComponentDemo>
    </CategoryPage>
  );
}
