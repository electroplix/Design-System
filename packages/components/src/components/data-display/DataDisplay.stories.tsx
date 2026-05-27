import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { BadgeGroup } from './BadgeGroup';
import { BarChart } from './BarChart';
import { CalendarGrid } from './CalendarGrid';
import { DataTable } from './DataTable';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { ProgressBar } from './ProgressBar';
import { RatingStars } from './RatingStars';
import { Sparkline } from './Sparkline';
import { Timeline } from './Timeline';

const meta: Meta = {
  title: 'Components/DataDisplay',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const BadgeStory: Story = {
  render: () => <Badge label="New" variant="primary" />,
};

export const BadgeGroupStory: Story = {
  render: () => (
    <BadgeGroup
      badges={[
        { label: 'React', variant: 'primary' },
        { label: 'TypeScript', variant: 'secondary' },
      ]}
    />
  ),
};

export const BarChartStory: Story = {
  render: () => (
    <BarChart
      data={[
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 50 },
        { label: 'Mar', value: 40 },
      ]}
    />
  ),
};

export const LineChartStory: Story = {
  render: () => (
    <LineChart
      data={[
        { x: 0, y: 10 },
        { x: 1, y: 25 },
        { x: 2, y: 18 },
      ]}
    />
  ),
};

export const PieChartStory: Story = {
  render: () => (
    <PieChart
      data={[
        { label: 'Desktop', value: 60 },
        { label: 'Mobile', value: 30 },
        { label: 'Tablet', value: 10 },
      ]}
    />
  ),
};

export const SparklineStory: Story = {
  render: () => <Sparkline data={[5, 10, 8, 15, 12, 20]} />,
};

export const ProgressBarStory: Story = {
  render: () => <ProgressBar value={65} max={100} />,
};

export const RatingStarsStory: Story = {
  render: () => <RatingStars value={4} max={5} />,
};

export const CalendarGridStory: Story = {
  render: () => <CalendarGrid month={5} year={2026} />,
};

export const DataTableStory: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'role', header: 'Role' },
      ]}
      rows={[
        { name: 'Alice', role: 'Engineer' },
        { name: 'Bob', role: 'Designer' },
      ]}
    />
  ),
};

export const TimelineStory: Story = {
  render: () => (
    <Timeline
      events={[
        { date: '2026-01-01', title: 'Project Started' },
        { date: '2026-03-15', title: 'Beta Launch' },
        { date: '2026-05-01', title: 'GA Release' },
      ]}
    />
  ),
};
