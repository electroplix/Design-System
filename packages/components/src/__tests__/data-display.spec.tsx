/**
 * @electroplix/components – data-display tests
 */
import React from "react";
import { render } from "@testing-library/react";
import { TestWrapper } from "./test-utils";
import {
  Badge, BadgeGroup, BarChart, LineChart, PieChart,
  Sparkline, ProgressBar, RatingStars, CalendarGrid,
  DataTable, Timeline,
} from "../components/data-display";

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe("Data Display components", () => {
  it("Badge renders", () => {
    const { container } = wrap(<Badge label="New" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("BadgeGroup renders", () => {
    const { container } = wrap(<BadgeGroup badges={[{ label: "A" }, { label: "B" }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("BarChart renders", () => {
    const { container } = wrap(<BarChart data={[{ label: "Q1", value: 100 }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("LineChart renders", () => {
    const { container } = wrap(<LineChart data={[{ label: "Jan", value: 10 }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("PieChart renders", () => {
    const { container } = wrap(<PieChart data={[{ label: "A", value: 60 }, { label: "B", value: 40 }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("Sparkline renders", () => {
    const { container } = wrap(<Sparkline data={[1, 3, 2, 5, 4]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("ProgressBar renders", () => {
    const { container } = wrap(<ProgressBar value={50} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("RatingStars renders", () => {
    const { container } = wrap(<RatingStars value={3.5} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("CalendarGrid renders", () => {
    const { container } = wrap(<CalendarGrid />);
    expect(container.firstChild).toBeTruthy();
  });

  it("DataTable renders", () => {
    const { container } = wrap(
      <DataTable columns={[{ key: "name", header: "Name" }]} rows={[{ name: "Alice" }]} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("Timeline renders", () => {
    const { container } = wrap(<Timeline items={[{ title: "Start", description: "Begin" }]} />);
    expect(container.firstChild).toBeTruthy();
  });
});
