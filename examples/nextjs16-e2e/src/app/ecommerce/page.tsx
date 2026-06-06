'use client';
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

const product = { id: '1', title: 'Widget', image: '/placeholder.jpg', price: 29.99 };

export default function EcommerceTest() {
  return (
    <div>
      <h1>Ecommerce</h1>
      <CartDrawer id="cart-1" data-testid="cart" items={[]} open={false} />
      <MiniCartPanel id="mini-1" items={[]} />
      <OrderSummary id="os-1" lines={[]} subtotal={0} total={0} />
      <ProductCard id="pc-1" product={product} />
      <ProductGrid id="pg-1" products={[]} />
      <ProductDetail id="pd-1" product={product} />
      <VariantSelector id="vs-1" groups={[]} />
      <QuickAddButton id="qa-1" productId="1" />
      <WishlistButton id="wl-1" productId="1" />
      <PaymentButtons id="pay-1" methods={['card']} />
    </div>
  );
}
