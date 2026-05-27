'use client';
import React, { useState } from 'react';
import { useEcommerceTheme } from '../../core/provider';
import { Icon } from '../../core/icons';
import { money } from '../../core/utils';
import type { Currency } from '../../core/types';

/* ── Shared types ───────────────────────────────────────── */

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
  variant?: string;
}

export interface CartCommonProps {
  items: CartItem[];
  currency?: Currency;
  onQtyChange?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

export interface OrderLine {
  id: string;
  title: string;
  qty: number;
  price: number;
  image?: string;
}

export interface VariantOption {
  label: string;
  value: string;
}

export interface VariantGroup {
  name: string;
  options: VariantOption[];
}

/* ── helpers ────────────────────────────────────────────── */

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  success: '#16a34a',
  danger: '#dc2626',
  warning: '#d97706',
  info: '#2563eb',
};

function useEcom() {
  const t = useEcommerceTheme();
  return {
    accent: t.accentColor ?? ui.black,
    fg: t.textColor ?? ui.text,
    bg: t.bgColor ?? ui.white,
    border: t.borderColor ?? ui.border,
    r: t.radius ?? 14,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    hs: t.headingSize ?? 18,
    bs: t.bodySize ?? 14,
    cardBg: t.cardBg ?? ui.white,
    cardBorder: t.cardBorder ?? ui.border,
    cardRadius: t.cardRadius ?? 12,
  };
}

/* ── CartDrawer ─────────────────────────────────────────── */

export interface CartDrawerProps extends CartCommonProps {
  open?: boolean;
  width?: number;
}

export function CartDrawer({
  items = [],
  currency = 'USD',
  onQtyChange,
  onRemove,
  onCheckout,
  open = true,
  width = 380,
}: CartDrawerProps) {
  const e = useEcom();
  const safeItems = Array.isArray(items) ? items : [];
  const total = safeItems.reduce((s, it) => s + it.price * it.qty, 0);
  const count = safeItems.reduce((s, it) => s + it.qty, 0);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        right: open ? 0 : -width,
        height: '100dvh',
        width,
        transition: 'right 0.3s cubic-bezier(0.4,0,0.2,1)',
        background: e.bg,
        color: e.fg,
        borderLeft: `1px solid ${e.border}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        boxShadow: open ? '-8px 0 24px rgba(9, 9, 11, 0.08)' : 'none',
        fontFamily: e.ff,
      }}
    >
      <div
        style={{
          padding: e.sp,
          borderBottom: `1px solid ${e.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: ui.white,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: ui.surface,
              border: `1px solid ${ui.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="shopping-cart" size={18} color={e.accent} />
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: e.hs,
                fontWeight: 700,
                color: ui.black,
                letterSpacing: '-0.02em',
              }}
            >
              Your Cart
            </h3>
            <div style={{ fontSize: 12, color: ui.muted }}>
              {count} {count === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: e.sp,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {safeItems.length === 0 && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: ui.muted,
              gap: 12,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: ui.surface,
                border: `1px solid ${ui.border}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="shopping-cart" size={26} color={ui.black} />
            </div>
            <div>Your cart is empty</div>
          </div>
        )}

        {safeItems.map((it) => (
          <div
            key={it.id}
            onMouseEnter={() => setHovered(it.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: 12,
              padding: 12,
              borderRadius: e.cardRadius,
              background: hovered === it.id ? ui.surface : e.cardBg,
              border: `1px solid ${hovered === it.id ? ui.mutedSoft : e.cardBorder}`,
              transition: 'all 0.18s ease',
              boxShadow:
                hovered === it.id
                  ? '0 2px 8px rgba(9, 9, 11, 0.06)'
                  : '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <img
              src={it.image}
              alt={it.title}
              style={{
                width: 72,
                height: 72,
                objectFit: 'cover',
                borderRadius: 8,
                border: `1px solid ${ui.border}`,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: ui.black }}>{it.title}</div>
                  {it.variant && (
                    <div style={{ fontSize: 12, color: ui.muted, marginTop: 2 }}>{it.variant}</div>
                  )}
                </div>
                <button
                  onClick={() => onRemove?.(it.id)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    border: `1px solid ${ui.border}`,
                    background: ui.white,
                    color: ui.danger,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: hovered === it.id ? 1 : 0,
                    transition: 'opacity 0.18s ease',
                  }}
                >
                  <Icon name="trash" size={12} color={ui.danger} />
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${e.border}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: ui.white,
                  }}
                >
                  <button
                    onClick={() => onQtyChange?.(it.id, Math.max(1, it.qty - 1))}
                    style={{
                      width: 28,
                      height: 28,
                      border: 'none',
                      background: 'transparent',
                      color: ui.text,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="minus" size={12} />
                  </button>
                  <span
                    style={{
                      width: 28,
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      color: ui.black,
                    }}
                  >
                    {it.qty}
                  </span>
                  <button
                    onClick={() => onQtyChange?.(it.id, it.qty + 1)}
                    style={{
                      width: 28,
                      height: 28,
                      border: 'none',
                      background: 'transparent',
                      color: ui.text,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="plus" size={12} />
                  </button>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: ui.black }}>
                  {money(it.price * it.qty, currency)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: e.sp, borderTop: `1px solid ${e.border}`, background: ui.white }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: ui.muted }}>Subtotal</span>
          <span style={{ fontSize: e.hs, fontWeight: 800, color: ui.black }}>
            {money(total, currency)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: e.r,
            border: `1px solid ${e.accent}`,
            background: e.accent,
            color: ui.white,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Icon name="credit-card" size={18} color={ui.white} /> Checkout
        </button>
      </div>
    </aside>
  );
}

/* ── MiniCartPanel ──────────────────────────────────────── */

export function MiniCartPanel({ items = [], currency = 'USD', onCheckout }: CartCommonProps) {
  const e = useEcom();
  const safeItems = Array.isArray(items) ? items : [];
  const total = safeItems.reduce((s, it) => s + it.price * it.qty, 0);
  const count = safeItems.reduce((s, it) => s + it.qty, 0);

  return (
    <div
      style={{
        padding: e.sp,
        border: `1px solid ${e.border}`,
        borderRadius: e.r,
        background: e.cardBg,
        color: e.fg,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: e.ff,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Icon name="shopping-bag" size={20} color={e.accent} />
          {count > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                minWidth: 18,
                height: 18,
                padding: '0 5px',
                borderRadius: 999,
                background: ui.black,
                color: ui.white,
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${ui.white}`,
              }}
            >
              {count}
            </span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{ fontWeight: 700, fontSize: e.hs, color: ui.black, letterSpacing: '-0.02em' }}
          >
            Cart
          </div>
          <div style={{ fontSize: 12, color: ui.muted }}>{count} items</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: ui.muted }}>Total</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: ui.black }}>
            {money(total, currency)}
          </div>
        </div>
      </div>
      <button
        onClick={onCheckout}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: e.r - 4,
          border: `1px solid ${safeItems.length > 0 ? e.accent : ui.border}`,
          background: safeItems.length > 0 ? e.accent : ui.surface,
          color: safeItems.length > 0 ? ui.white : ui.muted,
          fontWeight: 700,
          fontSize: 13,
          cursor: safeItems.length > 0 ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        Go to checkout{' '}
        <Icon name="arrow-right" size={16} color={safeItems.length > 0 ? ui.white : ui.muted} />
      </button>
    </div>
  );
}

/* ── OrderSummary ───────────────────────────────────────── */

export interface OrderSummaryProps {
  orderId?: string;
  status?: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  lines: OrderLine[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  currency?: Currency;
  shippingAddress?: string;
  estimatedDelivery?: string;
}

export function OrderSummary({
  orderId,
  status = 'processing',
  lines = [],
  subtotal,
  shipping = 0,
  tax = 0,
  total,
  currency = 'USD',
  shippingAddress,
  estimatedDelivery,
}: OrderSummaryProps) {
  const e = useEcom();
  const statusColor: Record<string, string> = {
    processing: ui.warning,
    shipped: ui.info,
    delivered: ui.success,
    cancelled: ui.danger,
  };
  const sc = statusColor[status] ?? e.accent;

  return (
    <section
      style={{
        border: `1px solid ${e.border}`,
        borderRadius: e.r,
        padding: e.sp,
        background: e.bg,
        color: e.fg,
        fontFamily: e.ff,
        display: 'grid',
        gap: 16,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: ui.surface,
              border: `1px solid ${ui.border}`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="package" size={18} color={e.accent} />
          </div>
          <span
            style={{ fontWeight: 700, fontSize: e.hs, color: ui.black, letterSpacing: '-0.02em' }}
          >
            {orderId ? `Order #${orderId}` : 'Order Summary'}
          </span>
        </div>
        <span
          style={{
            fontSize: 12,
            padding: '4px 10px',
            borderRadius: 999,
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            color: sc,
            fontWeight: 700,
            textTransform: 'capitalize',
          }}
        >
          {status}
        </span>
      </div>

      {lines.map((l) => (
        <div
          key={l.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: `1px solid ${e.border}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {l.image && (
              <img
                src={l.image}
                alt={l.title}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  objectFit: 'cover',
                  border: `1px solid ${ui.border}`,
                }}
              />
            )}
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: ui.black }}>{l.title}</div>
              <div style={{ fontSize: 12, color: ui.muted }}>Qty: {l.qty}</div>
            </div>
          </div>
          <div style={{ fontWeight: 700, color: ui.black }}>{money(l.price * l.qty, currency)}</div>
        </div>
      ))}

      <div style={{ display: 'grid', gap: 6, fontSize: e.bs }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: ui.muted }}>Subtotal</span>
          <span style={{ color: ui.text }}>{money(subtotal, currency)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: ui.muted }}>Shipping</span>
          <span style={{ color: ui.text }}>
            {shipping === 0 ? 'Free' : money(shipping, currency)}
          </span>
        </div>
        {tax > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: ui.muted }}>Tax</span>
            <span style={{ color: ui.text }}>{money(tax, currency)}</span>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 800,
            fontSize: e.hs,
            paddingTop: 8,
            borderTop: `1px solid ${e.border}`,
            color: ui.black,
          }}
        >
          <span>Total</span>
          <span>{money(total, currency)}</span>
        </div>
      </div>

      {shippingAddress && (
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: ui.muted }}
        >
          <Icon name="map-pin" size={14} color={ui.muted} />
          {shippingAddress}
        </div>
      )}
      {estimatedDelivery && (
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: ui.muted }}
        >
          <Icon name="clock" size={14} color={ui.muted} />
          {estimatedDelivery}
        </div>
      )}
    </section>
  );
}

/* ── ProductCard ─────────────────────────────────────────── */

export interface ProductCardProps {
  product: Product;
  currency?: Currency;
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export function ProductCard({
  product,
  currency = 'USD',
  onAddToCart,
  onWishlist,
}: ProductCardProps) {
  const e = useEcom();
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? ui.mutedSoft : e.border}`,
        borderRadius: e.r,
        overflow: 'hidden',
        background: e.cardBg,
        color: e.fg,
        fontFamily: e.ff,
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 4px 12px rgba(9, 9, 11, 0.08)' : '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      <div
        style={{ position: 'relative', height: 200, overflow: 'hidden', background: ui.surface }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
        {product.badge && (
          <span
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 999,
              background: ui.white,
              border: `1px solid ${ui.border}`,
              color: ui.black,
            }}
          >
            {product.badge}
          </span>
        )}
        {onWishlist && (
          <button
            onClick={() => onWishlist(product.id)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: `1px solid ${ui.border}`,
              background: ui.white,
              color: ui.black,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.06)',
            }}
          >
            <Icon name="heart" size={16} color={ui.black} />
          </button>
        )}
      </div>
      <div style={{ padding: 14, display: 'grid', gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: ui.black }}>{product.title}</div>
        {product.rating !== undefined && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: ui.muted }}
          >
            <Icon name="star" size={14} color="#f59e0b" /> {product.rating.toFixed(1)}
            {product.reviewCount !== undefined && (
              <span style={{ color: ui.mutedSoft }}>({product.reviewCount})</span>
            )}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: ui.black }}>
            {money(product.price, currency)}
          </span>
          {product.originalPrice && (
            <span style={{ textDecoration: 'line-through', color: ui.muted, fontSize: 14 }}>
              {money(product.originalPrice, currency)}
            </span>
          )}
          {discount > 0 && (
            <span style={{ fontSize: 12, color: ui.success, fontWeight: 700 }}>-{discount}%</span>
          )}
        </div>
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product.id)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: e.r - 4,
              border: `1px solid ${product.inStock === false ? ui.border : e.accent}`,
              background: product.inStock === false ? ui.surface : e.accent,
              color: product.inStock === false ? ui.muted : ui.white,
              fontWeight: 700,
              fontSize: 13,
              cursor: product.inStock === false ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Icon
              name="shopping-cart"
              size={16}
              color={product.inStock === false ? ui.muted : ui.white}
            />{' '}
            {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
      </div>
    </article>
  );
}

/* ── ProductGrid ────────────────────────────────────────── */

export interface ProductGridProps {
  products: Product[];
  currency?: Currency;
  columns?: number | string;
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export function ProductGrid({
  products = [],
  currency = 'USD',
  columns = 3,
  onAddToCart,
  onWishlist,
}: ProductGridProps) {
  const e = useEcom();
  const safe = Array.isArray(products) ? products : [];
  if (safe.length === 0)
    return (
      <div style={{ padding: e.sp * 2, textAlign: 'center', color: ui.muted, fontFamily: e.ff }}>
        No products found
      </div>
    );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 16 }}>
      {safe.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          currency={currency}
          onAddToCart={onAddToCart}
          onWishlist={onWishlist}
        />
      ))}
    </div>
  );
}

/* ── ProductDetail ──────────────────────────────────────── */

export interface ProductDetailProps {
  product: Product;
  description?: string;
  images?: string[];
  variants?: VariantGroup[];
  currency?: Currency;
  onAddToCart?: () => void;
}

export function ProductDetail({
  product,
  description,
  images,
  variants,
  currency = 'USD',
  onAddToCart,
}: ProductDetailProps) {
  const e = useEcom();
  const [mainImg, setMainImg] = useState(0);
  const allImages = images?.length ? images : [product.image];

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        fontFamily: e.ff,
        color: e.fg,
      }}
    >
      <div style={{ display: 'grid', gap: 12 }}>
        <div
          style={{
            borderRadius: e.r,
            overflow: 'hidden',
            border: `1px solid ${e.border}`,
            background: ui.surface,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
          }}
        >
          <img
            src={allImages[mainImg]}
            alt={product.title}
            style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
          />
        </div>
        {allImages.length > 1 && (
          <div style={{ display: 'flex', gap: 8 }}>
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImg(i)}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: i === mainImg ? `2px solid ${e.accent}` : `1px solid ${e.border}`,
                  cursor: 'pointer',
                  padding: 0,
                  background: ui.white,
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
        {product.badge && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 999,
              background: ui.surface,
              border: `1px solid ${ui.border}`,
              color: ui.black,
              justifySelf: 'start',
            }}
          >
            {product.badge}
          </span>
        )}
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 800,
            color: ui.black,
            letterSpacing: '-0.04em',
            lineHeight: 1.12,
          }}
        >
          {product.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: ui.black }}>
            {money(product.price, currency)}
          </span>
          {product.originalPrice && (
            <span style={{ textDecoration: 'line-through', color: ui.muted, fontSize: 18 }}>
              {money(product.originalPrice, currency)}
            </span>
          )}
        </div>
        {product.rating !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: ui.muted }}>
            <Icon name="star" size={18} color="#f59e0b" />{' '}
            <span style={{ fontWeight: 700, color: ui.black }}>{product.rating.toFixed(1)}</span>
            {product.reviewCount !== undefined && (
              <span style={{ color: ui.muted }}>({product.reviewCount} reviews)</span>
            )}
          </div>
        )}
        {description && (
          <p style={{ margin: 0, lineHeight: 1.7, color: ui.muted }}>{description}</p>
        )}
        {variants && <VariantSelector groups={variants} />}
        {onAddToCart && (
          <button
            onClick={onAddToCart}
            style={{
              padding: '16px 24px',
              borderRadius: e.r,
              border: `1px solid ${e.accent}`,
              background: e.accent,
              color: ui.white,
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Icon name="shopping-cart" size={20} color={ui.white} /> Add to Cart
          </button>
        )}
      </div>
    </section>
  );
}

/* ── VariantSelector ────────────────────────────────────── */

export interface VariantSelectorProps {
  groups: VariantGroup[];
  selected?: Record<string, string>;
  onChange?: (groupName: string, value: string) => void;
}

export function VariantSelector({ groups = [], selected = {}, onChange }: VariantSelectorProps) {
  const e = useEcom();
  return (
    <div style={{ display: 'grid', gap: 12, fontFamily: e.ff }}>
      {groups.map((g) => (
        <div key={g.name}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: ui.black }}>
            {g.name}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {g.options.map((o) => {
              const isSelected = selected[g.name] === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => onChange?.(g.name, o.value)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: e.r - 6,
                    border: `1px solid ${isSelected ? e.accent : e.border}`,
                    background: isSelected ? e.accent : ui.white,
                    color: isSelected ? ui.white : ui.text,
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: 13,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── QuickAddButton ─────────────────────────────────────── */

export interface QuickAddButtonProps {
  productId: string;
  label?: string;
  onAdd?: (id: string) => void;
  disabled?: boolean;
}

export function QuickAddButton({
  productId,
  label = 'Quick Add',
  onAdd,
  disabled = false,
}: QuickAddButtonProps) {
  const e = useEcom();
  const [added, setAdded] = useState(false);
  const handleClick = () => {
    if (disabled || added) return;
    onAdd?.(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        borderRadius: e.r - 4,
        border: `1px solid ${added ? '#bbf7d0' : e.border}`,
        background: added ? '#f0fdf4' : ui.white,
        color: added ? ui.success : ui.text,
        fontWeight: 700,
        fontSize: 13,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'all 0.2s',
        opacity: disabled ? 0.5 : 1,
        fontFamily: e.ff,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
      }}
    >
      <Icon name={added ? 'check' : 'plus'} size={16} color={added ? ui.success : ui.text} />
      {added ? 'Added!' : label}
    </button>
  );
}

/* ── WishlistButton ─────────────────────────────────────── */

export interface WishlistButtonProps {
  productId: string;
  wishlisted?: boolean;
  onToggle?: (id: string) => void;
}

export function WishlistButton({ productId, wishlisted = false, onToggle }: WishlistButtonProps) {
  const e = useEcom();
  const [active, setActive] = useState(wishlisted);
  const toggle = () => {
    setActive(!active);
    onToggle?.(productId);
  };
  return (
    <button
      onClick={toggle}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: `1px solid ${active ? '#fecaca' : e.border}`,
        background: active ? '#fef2f2' : ui.white,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
      }}
    >
      <Icon name="heart" size={20} color={active ? ui.danger : ui.text} />
    </button>
  );
}

/* ── PaymentButtons ─────────────────────────────────────── */

export interface PaymentButtonsProps {
  onPay?: (method: string) => void;
  methods?: string[];
}

export function PaymentButtons({
  onPay,
  methods = ['card', 'paypal', 'apple-pay'],
}: PaymentButtonsProps) {
  const e = useEcom();
  return (
    <div style={{ display: 'grid', gap: 8, fontFamily: e.ff }}>
      {methods.map((m) => {
        const primary = m === 'card';
        return (
          <button
            key={m}
            onClick={() => onPay?.(m)}
            style={{
              padding: '14px 16px',
              borderRadius: e.r,
              border: `1px solid ${primary ? e.accent : e.border}`,
              background: primary ? e.accent : e.cardBg,
              color: primary ? ui.white : ui.text,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
            }}
          >
            <Icon
              name={m === 'card' ? 'credit-card' : m === 'paypal' ? 'globe' : 'smartphone'}
              size={18}
              color={primary ? ui.white : ui.text}
            />
            {m === 'card' ? 'Pay with Card' : m === 'paypal' ? 'PayPal' : 'Apple Pay'}
          </button>
        );
      })}
    </div>
  );
}
