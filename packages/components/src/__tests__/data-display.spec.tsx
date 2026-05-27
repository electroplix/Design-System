import { render } from '@testing-library/react';
/**
 * @electroplix/components – data-display tests
 */
import type React from 'react';
import {
  Badge,
  BadgeGroup,
  BarChart,
  CalendarGrid,
  DataTable,
  LineChart,
  PieChart,
  ProgressBar,
  RatingStars,
  Sparkline,
  Timeline,
} from '../components/data-display';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe('Data Display components', () => {
  it('Badge renders', () => {
    const { container } = wrap(<Badge label="New" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('BadgeGroup renders', () => {
    const { container } = wrap(<BadgeGroup badges={[{ label: 'A' }, { label: 'B' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('BarChart renders', () => {
    const { container } = wrap(<BarChart data={[100, 200, 300]} labels={['Q1', 'Q2', 'Q3']} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('LineChart renders', () => {
    const { container } = wrap(<LineChart data={[10, 20, 15]} labels={['Jan', 'Feb', 'Mar']} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PieChart renders', () => {
    const { container } = wrap(<PieChart data={[60, 40]} labels={['A', 'B']} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('Sparkline renders', () => {
    const { container } = wrap(<Sparkline data={[1, 3, 2, 5, 4]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ProgressBar renders', () => {
    const { container } = wrap(<ProgressBar value={50} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('RatingStars renders', () => {
    const { container } = wrap(<RatingStars value={3.5} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('CalendarGrid renders', () => {
    const { container } = wrap(<CalendarGrid year={2026} month={5} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('DataTable renders', () => {
    const { container } = wrap(
      <DataTable columns={[{ key: 'name', header: 'Name' }]} rows={[{ name: 'Alice', id: 1 }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Timeline renders', () => {
    const { container } = wrap(
      <Timeline items={[{ id: '1', title: 'Start', description: 'Begin' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
