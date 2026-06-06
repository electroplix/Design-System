'use client';
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

export default function ListsCardsTest() {
  return (
    <div>
      <h1>Lists & Cards</h1>
      <BlockShell id="bs-1" data-testid="block-shell" />
      <Accordion id="acc-1" items={[{ id: '1', title: 'Item', content: <p>Content</p> }]} />
      <GenericList id="gl-1" items={[{ id: '1', label: 'Item 1' }]} />
      <FeatureGrid id="fg-1" items={[{ id: '1', title: 'Feature', description: 'Desc' }]} />
      <ItemCardGrid id="icg-1" items={[{ id: '1', title: 'Card', subtitle: 'Card subtitle' }]} />
      <PricingTable
        id="pt-1"
        plans={[
          { id: 'free', name: 'Free', price: '$0', features: [{ label: 'Basic', included: true }] },
        ]}
      />
      <SortableTable id="st-1" columns={[]} rows={[]} />
      <LCTimeline id="lct-1" items={[]} />
    </div>
  );
}
