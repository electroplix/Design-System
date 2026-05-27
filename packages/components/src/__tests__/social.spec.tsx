/**
 * @electroplix/components – social tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  SocialShareBar, SocialLoginButtons, SocialEmbed,
  FollowLike, ReactionsBar, CommentsBox, ReviewsForm,
} from "../components/social";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe("Social components", () => {
  it("SocialShareBar renders", () => {
    const { container } = wrap(<SocialShareBar url="https://example.com" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("SocialLoginButtons renders", () => {
    const { container } = wrap(
      <SocialLoginButtons providers={["google", "github"]} onLogin={noop} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("SocialEmbed renders", () => {
    const { container } = wrap(
      <SocialEmbed type="twitter" url="https://twitter.com/status/123" />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("FollowLike renders", () => {
    const { container } = wrap(<FollowLike />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ReactionsBar renders", () => {
    const { container } = wrap(
      <ReactionsBar reactions={[{ emoji: "👍", count: 5 }]} onReact={noop} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("CommentsBox renders", () => {
    const { container } = wrap(<CommentsBox onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ReviewsForm renders", () => {
    const { container } = wrap(<ReviewsForm onSubmit={noop} />);
    expect(container.firstChild).toBeTruthy();
  });
});
