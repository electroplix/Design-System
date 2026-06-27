import type { Meta, StoryObj } from '@storybook/react';
import {
  AutoSuggest,
  FacetFilters,
  SearchEmptyState,
  SearchResultCard,
  SearchResults,
  SiteSearchBar,
} from './index';

const meta: Meta = {
  title: 'Components/Search',
  tags: ['autodocs'],
};
export default meta;

export const SiteSearchBarStory: StoryObj = {
  render: () => <SiteSearchBar onSearch={() => {}} placeholder="Search..." />,
};

export const AutoSuggestStory: StoryObj = {
  render: () => <AutoSuggest suggestions={['React', 'Redux', 'Router']} onSelect={() => {}} />,
};

export const SearchResultsStory: StoryObj = {
  render: () => (
    <SearchResults
      results={[
        { id: '1', title: 'Result One', snippet: 'Description of result one.' },
        { id: '2', title: 'Result Two', snippet: 'Description of result two.' },
      ]}
    />
  ),
};

export const SearchResultCardStory: StoryObj = {
  render: () => (
    <SearchResultCard title="Getting Started" snippet="Learn how to set up..." url="/docs/start" />
  ),
};

export const FacetFiltersStory: StoryObj = {
  render: () => (
    <FacetFilters
      facets={[
        { id: '1', label: 'Category', options: ['Docs', 'Blog', 'API'] },
        { id: '2', label: 'Type', options: ['Guide', 'Reference'] },
      ]}
      onFilterChange={() => {}}
    />
  ),
};

export const SearchEmptyStateStory: StoryObj = {
  render: () => <SearchEmptyState query="xyzabc" />,
};
