import {
  AutoSuggest,
  FacetFilters,
  SearchEmptyState,
  SearchResultCard,
  SearchResults,
  SiteSearchBar,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleFacets, sampleSearchItems } from '../data/samples';

const noop = () => {};

export default function SearchPage() {
  return (
    <CategoryPage
      slug="search"
      title="Search"
      description="Search bars, suggestions, facets, results, empty states."
      componentCount={6}
    >
      <ComponentDemo name="SiteSearchBar">
        <SiteSearchBar onSearch={noop} placeholder="Search the docs…" />
      </ComponentDemo>
      <ComponentDemo name="AutoSuggest">
        <AutoSuggest suggestions={['react', 'vue', 'svelte', 'solid']} onSelect={noop} />
      </ComponentDemo>
      <ComponentDemo name="FacetFilters">
        <FacetFilters facets={sampleFacets} onChange={noop} />
      </ComponentDemo>
      <ComponentDemo name="SearchResultCard">
        <SearchResultCard item={sampleSearchItems[0]} />
      </ComponentDemo>
      <ComponentDemo name="SearchResults">
        <SearchResults items={sampleSearchItems} query="design" />
      </ComponentDemo>
      <ComponentDemo name="SearchEmptyState">
        <SearchEmptyState query="zxqlkj" title="No results" description="Try a different query." />
      </ComponentDemo>
    </CategoryPage>
  );
}
