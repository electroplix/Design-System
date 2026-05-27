import { render } from '@testing-library/react';
/**
 * @electroplix/components – user-accounts tests
 */
import type React from 'react';
import {
  AccountSettings,
  AuthForm,
  MultiFactorAuthInput,
  PasswordReset,
  ProfileOverview,
  ProfileSettings,
  RoleBadge,
} from '../components/user-accounts';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('User-Accounts components', () => {
  it('AuthForm renders', () => {
    const { container } = wrap(<AuthForm onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PasswordReset renders', () => {
    const { container } = wrap(<PasswordReset onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('MultiFactorAuthInput renders', () => {
    const { container } = wrap(<MultiFactorAuthInput onComplete={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ProfileOverview renders', () => {
    const { container } = wrap(<ProfileOverview name="Alice" email="alice@example.com" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ProfileSettings renders', () => {
    const { container } = wrap(<ProfileSettings onSave={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AccountSettings renders', () => {
    const { container } = wrap(
      <AccountSettings sections={[{ id: '1', label: 'General', icon: 'settings' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('RoleBadge renders', () => {
    const { container } = wrap(<RoleBadge />);
    expect(container.firstChild).toBeTruthy();
  });
});
