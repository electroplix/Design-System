/**
 * @electroplix/components – search tests
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from './test-utils';
import {
  SiteSearchBar,
  AutoSuggest,
  FacetFilters,
  SearchResultCard,
  SearchResults,
  SearchEmptyState,
} from '../components/search';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('Search components', () => {
  it('SiteSearchBar renders', () => {
    const { container } = wrap(<SiteSearchBar onSearch={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AutoSuggest renders', () => {
    const { container } = wrap(<AutoSuggest suggestions={['react', 'vue']} onSelect={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('FacetFilters renders', () => {
    const { container } = wrap(
      <FacetFilters
        facets={[{ id: 'color', name: 'Color', options: [{ id: 'red', label: 'Red' }] }]}
        onChange={noop}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('SearchResultCard renders', () => {
    const { container } = wrap(
      <SearchResultCard item={{ id: '1', title: 'Result', snippet: 'Lorem' }} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('SearchResults renders', () => {
    const { container } = wrap(
      <SearchResults items={[{ id: '1', title: 'Result', snippet: 'Lorem' }]} query="test" />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('SearchEmptyState renders', () => {
    const { container } = wrap(<SearchEmptyState query="xyzzy" />);
    expect(container.firstChild).toBeTruthy();
  });
});
