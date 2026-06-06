'use client';
import {
  AutoSuggest,
  FacetFilters,
  SearchEmptyState,
  SearchResultCard,
  SearchResults,
  SiteSearchBar,
} from '@electroplix/components';

export default function SearchTest() {
  return (
    <div>
      <h1>Search</h1>
      <SiteSearchBar id="ssb-1" data-testid="site-search" />
      <AutoSuggest id="as-1" suggestions={['React', 'Next.js']} />
      <FacetFilters id="ff-1" facets={[]} />
      <SearchResultCard id="src-1" item={{ id: '1', title: 'Result' }} />
      <SearchResults id="sr-1" items={[]} />
      <SearchEmptyState id="ses-1" />
    </div>
  );
}
