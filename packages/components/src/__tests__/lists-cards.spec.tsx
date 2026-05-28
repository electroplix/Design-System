import { render } from '@testing-library/react';
/**
 * @electroplix/components – lists-cards tests
 */
import type React from 'react';
import {
  Accordion,
  BlockShell,
  FeatureGrid,
  GenericList,
  ItemCardGrid,
  LCTimeline,
  PricingTable,
  SortableTable,
} from '../components/lists-cards';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe('Lists-Cards components', () => {
  it('BlockShell renders', () => {
    const { container } = wrap(
      <BlockShell>
        <span>hello</span>
      </BlockShell>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('Accordion renders', () => {
    const { container } = wrap(<Accordion items={[{ id: '1', title: 'T1', content: 'C1' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('GenericList renders', () => {
    const { container } = wrap(<GenericList items={[{ id: '1', label: 'Item 1' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('FeatureGrid renders', () => {
    const { container } = wrap(
      <FeatureGrid items={[{ id: '1', icon: 'star', title: 'F1', description: 'D1' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('ItemCardGrid renders', () => {
    const { container } = wrap(<ItemCardGrid items={[{ id: '1', title: 'Card 1' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PricingTable renders', () => {
    const { container } = wrap(
      <PricingTable
        plans={[
          {
            id: 'free',
            name: 'Free',
            price: '$0',
            features: [{ label: 'Basic', included: true }],
          },
        ]}
      />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('SortableTable renders', () => {
    const { container } = wrap(
      <SortableTable columns={[{ key: 'name', label: 'Name' }]} rows={[{ name: 'Alice' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('LCTimeline renders', () => {
    const { container } = wrap(
      <LCTimeline items={[{ id: '1', title: 'Event 1', description: 'Something' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
