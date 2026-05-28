import {
  Accordion,
  BlockShell,
  FeatureGrid,
  GenericList,
  ItemCardGrid,
  LCTimeline,
  PricingTable,
  SortableTable,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleFeatures, samplePlans, sampleTableRows, sampleTimeline } from '../data/samples';

export default function ListsCardsPage() {
  return (
    <CategoryPage
      slug="lists-cards"
      title="Lists & Cards"
      description="Accordions, lists, feature grids, timelines, pricing tables."
      componentCount={8}
    >
      <ComponentDemo name="BlockShell">
        <BlockShell>
          <h3>Custom block</h3>
          <p>Content lives inside the shell.</p>
        </BlockShell>
      </ComponentDemo>
      <ComponentDemo name="Accordion">
        <Accordion
          items={[
            { id: '1', title: 'How does pricing work?', content: 'Prepaid monthly billing.' },
            { id: '2', title: 'Can I cancel anytime?', content: 'Yes, no questions asked.' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="GenericList">
        <GenericList
          title="Latest changes"
          items={[
            { id: '1', label: 'Added new icon set' },
            { id: '2', label: 'Improved theming docs' },
            { id: '3', label: 'Fixed stepper a11y' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="FeatureGrid">
        <FeatureGrid items={sampleFeatures} title="Why teams choose us" columns={3} />
      </ComponentDemo>
      <ComponentDemo name="ItemCardGrid">
        <ItemCardGrid
          items={[
            { id: '1', title: 'Card A', subtitle: 'First card' },
            { id: '2', title: 'Card B', subtitle: 'Second card' },
            { id: '3', title: 'Card C', subtitle: 'Third card' },
          ]}
          columns={3}
        />
      </ComponentDemo>
      <ComponentDemo name="PricingTable">
        <PricingTable plans={samplePlans} />
      </ComponentDemo>
      <ComponentDemo name="SortableTable">
        <SortableTable
          columns={[
            { key: 'name', label: 'Name', sortable: true },
            { key: 'role', label: 'Role' },
            { key: 'joined', label: 'Joined', sortable: true },
          ]}
          rows={sampleTableRows}
        />
      </ComponentDemo>
      <ComponentDemo name="LCTimeline">
        <LCTimeline items={sampleTimeline} />
      </ComponentDemo>
    </CategoryPage>
  );
}
