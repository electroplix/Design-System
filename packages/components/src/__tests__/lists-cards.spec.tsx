/**
 * @electroplix/components – lists-cards tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  BlockShell, Accordion, GenericList, FeatureGrid,
  ItemCardGrid, PricingTable, SortableTable, LCTimeline,
} from "../components/lists-cards";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe("Lists-Cards components", () => {
  it("BlockShell renders", () => {
    const { container } = wrap(<BlockShell><span>hello</span></BlockShell>);
    expect(container.firstChild).toBeTruthy();
  });

  it("Accordion renders", () => {
    const { container } = wrap(
      <Accordion items={[{ title: "Q1", content: "A1" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("GenericList renders", () => {
    const { container } = wrap(<GenericList items={[{ id: "1", label: "Item 1" }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("FeatureGrid renders", () => {
    const { container } = wrap(
      <FeatureGrid items={[{ icon: "star", title: "Fast", description: "Very fast" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("ItemCardGrid renders", () => {
    const { container } = wrap(
      <ItemCardGrid items={[{ id: "1", title: "Card 1" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("PricingTable renders", () => {
    const { container } = wrap(
      <PricingTable plans={[{ name: "Free", price: "$0", features: ["Basic"] }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("SortableTable renders", () => {
    const { container } = wrap(
      <SortableTable
        columns={[{ key: "name", header: "Name" }]}
        rows={[{ name: "Alice" }]}
      />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("LCTimeline renders", () => {
    const { container } = wrap(
      <LCTimeline items={[{ title: "Event 1", description: "Something" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
