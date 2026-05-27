/**
 * @electroplix/components – user-accounts tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  AuthForm, PasswordReset, MultiFactorAuthInput,
  ProfileOverview, ProfileSettings, AccountSettings, RoleBadge,
} from "../components/user-accounts";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe("User-Accounts components", () => {
  it("AuthForm renders", () => {
    const { container } = wrap(<AuthForm onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("PasswordReset renders", () => {
    const { container } = wrap(<PasswordReset onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("MultiFactorAuthInput renders", () => {
    const { container } = wrap(<MultiFactorAuthInput onComplete={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ProfileOverview renders", () => {
    const { container } = wrap(
      <ProfileOverview name="Alice" email="alice@example.com" />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("ProfileSettings renders", () => {
    const { container } = wrap(<ProfileSettings onSave={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("AccountSettings renders", () => {
    const { container } = wrap(
      <AccountSettings sections={[{ title: "General", children: <span>cfg</span> }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("RoleBadge renders", () => {
    const { container } = wrap(<RoleBadge role="admin" />);
    expect(container.firstChild).toBeTruthy();
  });
});
