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
} from '@electroplix/components';
import { useState } from 'react';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleCartItems, sampleProduct, sampleProducts } from '../data/samples';

const noop = () => {};

export default function EcommercePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CategoryPage
      slug="ecommerce"
      title="Ecommerce"
      description="Product cards, carts, variant pickers, checkout payments."
      componentCount={10}
    >
      <ComponentDemo name="CartDrawer">
        <button
          type="button"
          onClick={() => setDrawerOpen((o) => !o)}
          style={{ padding: '0.5rem 1rem', borderRadius: 8 }}
        >
          Toggle cart drawer
        </button>
        <CartDrawer
          items={sampleCartItems}
          open={drawerOpen}
          onCheckout={() => setDrawerOpen(false)}
        />
      </ComponentDemo>
      <ComponentDemo name="MiniCartPanel">
        <MiniCartPanel items={sampleCartItems} />
      </ComponentDemo>
      <ComponentDemo name="OrderSummary">
        <OrderSummary
          orderId="ORD-12045"
          subtotal={378.99}
          total={399.99}
          lines={[
            { id: 'l1', title: 'Aurora Headphones', price: 249.99, qty: 1 },
            { id: 'l2', title: 'Nimbus Speaker', price: 129.0, qty: 1 },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="ProductCard">
        <ProductCard product={sampleProduct} />
      </ComponentDemo>
      <ComponentDemo name="ProductGrid">
        <ProductGrid products={sampleProducts} />
      </ComponentDemo>
      <ComponentDemo name="ProductDetail">
        <ProductDetail product={sampleProduct} />
      </ComponentDemo>
      <ComponentDemo name="VariantSelector">
        <VariantSelector
          groups={[
            {
              id: 'size',
              name: 'Size',
              options: [
                { id: 's', label: 'S' },
                { id: 'm', label: 'M' },
                { id: 'l', label: 'L' },
              ],
            },
            {
              id: 'color',
              name: 'Color',
              options: [
                { id: 'black', label: 'Black' },
                { id: 'white', label: 'White' },
              ],
            },
          ]}
          onChange={noop}
        />
      </ComponentDemo>
      <ComponentDemo name="QuickAddButton">
        <QuickAddButton productId={sampleProduct.id} onAdd={noop} />
      </ComponentDemo>
      <ComponentDemo name="WishlistButton">
        <WishlistButton productId={sampleProduct.id} />
      </ComponentDemo>
      <ComponentDemo name="PaymentButtons">
        <PaymentButtons onPay={noop} />
      </ComponentDemo>
    </CategoryPage>
  );
}
