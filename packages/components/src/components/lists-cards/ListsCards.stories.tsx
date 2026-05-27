import type { Meta, StoryObj } from '@storybook/react';
import { GenericList, ItemCardGrid, LCTimeline, SortableTable } from './index';

const meta: Meta = {
  title: 'Components/ListsCards',
  tags: ['autodocs'],
};
export default meta;

export const GenericListStory: StoryObj = {
  render: () => (
    <GenericList
      items={[
        { id: '1', label: 'Item One' },
        { id: '2', label: 'Item Two' },
        { id: '3', label: 'Item Three' },
      ]}
    />
  ),
};

export const ItemCardGridStory: StoryObj = {
  render: () => (
    <ItemCardGrid
      items={[
        { id: '1', title: 'Card One', description: 'Description one' },
        { id: '2', title: 'Card Two', description: 'Description two' },
      ]}
    />
  ),
};

export const LCTimelineStory: StoryObj = {
  render: () => (
    <LCTimeline
      events={[
        { id: '1', title: 'Event One', date: '2024-01-01' },
        { id: '2', title: 'Event Two', date: '2024-02-01' },
      ]}
    />
  ),
};

export const SortableTableStory: StoryObj = {
  render: () => (
    <SortableTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' },
      ]}
      rows={[
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ]}
    />
  ),
};
