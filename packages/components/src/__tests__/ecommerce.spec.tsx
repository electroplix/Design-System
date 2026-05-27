/**
 * @electroplix/components – ecommerce tests
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from './test-utils';
import {
  CartDrawer,
  MiniCartPanel,
  OrderSummary,
  ProductCard,
  ProductGrid,
  ProductDetail,
  VariantSelector,
  QuickAddButton,
  WishlistButton,
  PaymentButtons,
} from '../components/ecommerce';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

const sampleProduct = { id: '1', name: 'Widget', price: 29.99 };

describe('Ecommerce components', () => {
  it('CartDrawer renders', () => {
    const { container } = wrap(<CartDrawer items={[]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('MiniCartPanel renders', () => {
    const { container } = wrap(<MiniCartPanel items={[]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('OrderSummary renders', () => {
    const { container } = wrap(
      <OrderSummary orderId="ORD-1" total={99.99} lines={[]} subtotal={89.99} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('ProductCard renders', () => {
    const { container } = wrap(<ProductCard product={sampleProduct} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ProductGrid renders', () => {
    const { container } = wrap(<ProductGrid products={[sampleProduct]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ProductDetail renders', () => {
    const { container } = wrap(<ProductDetail product={sampleProduct} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('VariantSelector renders', () => {
    const { container } = wrap(<VariantSelector groups={[]} onChange={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('QuickAddButton renders', () => {
    const { container } = wrap(<QuickAddButton productId="1" onAdd={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('WishlistButton renders', () => {
    const { container } = wrap(<WishlistButton productId="1" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PaymentButtons renders', () => {
    const { container } = wrap(<PaymentButtons onPay={noop} />);
    expect(container.firstChild).toBeTruthy();
  });
});
