/**
 * @electroplix/components – site-identity tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  LogoDisplay, AnimatedBrandMark, Taglines,
  BrandingShell, BrandIconGrid, FaviconUploader,
} from "../components/site-identity";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe("Site-Identity components", () => {
  it("LogoDisplay renders", () => {
    const { container } = wrap(<LogoDisplay src="/logo.png" alt="Brand" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("AnimatedBrandMark renders", () => {
    const { container } = wrap(<AnimatedBrandMark text="Electroplix" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("Taglines renders", () => {
    const { container } = wrap(<Taglines lines={["Build fast", "Ship faster"]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("BrandingShell renders", () => {
    const { container } = wrap(
      <BrandingShell brandName="Electroplix"><span>content</span></BrandingShell>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("BrandIconGrid renders", () => {
    const { container } = wrap(
      <BrandIconGrid icons={[{ name: "star", label: "Star" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("FaviconUploader renders", () => {
    const { container } = wrap(<FaviconUploader onUpload={noop} />);
    expect(container.firstChild).toBeTruthy();
  });
});
