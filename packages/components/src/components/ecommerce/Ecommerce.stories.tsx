import type { Meta, StoryObj } from '@storybook/react';
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
} from './index';

const meta: Meta = {
  title: 'Components/Ecommerce',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

const sampleProduct = {
  id: '1',
  title: 'Widget Pro',
  price: 29.99,
  image: 'https://placehold.co/300x300',
};

export const ProductCardStory: Story = {
  render: () => <ProductCard product={sampleProduct} />,
};

export const ProductGridStory: Story = {
  render: () => (
    <ProductGrid
      products={[
        sampleProduct,
        { id: '2', title: 'Gadget X', price: 49.99, image: 'https://placehold.co/300x300' },
      ]}
    />
  ),
};

export const ProductDetailStory: Story = {
  render: () => (
    <ProductDetail
      product={{ ...sampleProduct, description: 'A premium widget for professionals.' }}
    />
  ),
};

export const CartDrawerStory: Story = {
  render: () => (
    <CartDrawer
      open={true}
      onClose={() => {}}
      items={[
        { id: '1', title: 'Widget Pro', image: 'https://placehold.co/100', price: 29.99, qty: 2 },
      ]}
    />
  ),
};

export const OrderSummaryStory: Story = {
  render: () => (
    <OrderSummary
      items={[{ title: 'Widget Pro', image: 'https://placehold.co/100', price: 29.99, qty: 2 }]}
      total={59.98}
    />
  ),
};

export const MiniCartPanelStory: Story = {
  render: () => <MiniCartPanel itemCount={3} total={89.97} />,
};

export const PaymentButtonsStory: Story = {
  render: () => <PaymentButtons onPayment={() => {}} />,
};

export const QuickAddButtonStory: Story = {
  render: () => <QuickAddButton productId="1" onAdd={() => {}} />,
};

export const WishlistButtonStory: Story = {
  render: () => <WishlistButton productId="1" wishlisted={false} onToggle={() => {}} />,
};

export const VariantSelectorStory: Story = {
  render: () => (
    <VariantSelector
      variants={[
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ]}
      onSelect={() => {}}
    />
  ),
};
