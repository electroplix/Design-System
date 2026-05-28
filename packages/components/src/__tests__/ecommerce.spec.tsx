import { render } from '@testing-library/react';
/**
 * @electroplix/components – ecommerce tests
 */
import type React from 'react';
import {
  CartDrawer,
  MiniCartPanel,
  OrderSummary,
  PaymentButtons,
  ProductCard,
  ProductDetail,
  ProductGrid,
  QuickAddButton,
  VariantSelector,
  WishlistButton,
} from '../components/ecommerce';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

const sampleProduct = {
  id: '1',
  title: 'Widget',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
};

describe('Ecommerce components', () => {
  it('CartDrawer renders', () => {
    const { container } = wrap(
      <CartDrawer items={[{ id: 'item-1', title: 'Item 1', price: 10, qty: 1, image: '' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('MiniCartPanel renders', () => {
    const { container } = wrap(
      <MiniCartPanel items={[{ id: 'item-1', title: 'Item 1', price: 10, qty: 1, image: '' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('OrderSummary renders', () => {
    const { container } = wrap(
      <OrderSummary
        orderId="ORD-1"
        total={99.99}
        lines={[{ id: 'line-1', title: 'Product 1', price: 89.99, qty: 1 }]}
        subtotal={89.99}
      />,
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
