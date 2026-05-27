/**
 * @electroplix/components – content tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  BlockquoteTestimonial, CalloutBox, HeadingSection,
  InlineCodeText, ParagraphBlock, RichMarkdown, TeamGrid,
} from "../components/content";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe("Content components", () => {
  it("BlockquoteTestimonial renders", () => {
    const { container } = wrap(<BlockquoteTestimonial quote="Great!" author="Jane" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("CalloutBox renders", () => {
    const { container } = wrap(<CalloutBox variant="info" title="Note">Info text</CalloutBox>);
    expect(container.firstChild).toBeTruthy();
  });

  it("HeadingSection renders", () => {
    const { container } = wrap(<HeadingSection title="Section" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("InlineCodeText renders", () => {
    const { container } = wrap(<InlineCodeText>console.log</InlineCodeText>);
    expect(container.firstChild).toBeTruthy();
  });

  it("ParagraphBlock renders", () => {
    const { container } = wrap(<ParagraphBlock>Lorem ipsum</ParagraphBlock>);
    expect(container.firstChild).toBeTruthy();
  });

  it("RichMarkdown renders", () => {
    const { container } = wrap(<RichMarkdown content="# Hello" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("TeamGrid renders", () => {
    const { container } = wrap(
      <TeamGrid
        members={[
          { id: "1", name: "Alice", role: "CEO", bio: "Founder" },
          { id: "2", name: "Bob", role: "CTO" },
        ]}
        title="Our Team"
        columns={2}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("TeamGrid renders with social links", () => {
    const { container } = wrap(
      <TeamGrid
        members={[{ id: "1", name: "Jane", socials: [{ icon: "star", href: "#" }] }]}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
