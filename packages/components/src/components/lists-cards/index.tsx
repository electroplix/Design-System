'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import { Icon } from '../../core/icons';
import { useListsCardsTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useLC() {
  const t = useListsCardsTheme();

  return {
    accent: t.accentColor ?? '#09090b',
    fg: t.textColor ?? '#18181b',
    bg: t.bgColor ?? '#ffffff',
    border: t.borderColor ?? '#e4e4e7',
    r: t.radius ?? 14,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    hs: t.headingSize ?? 18,
    bs: t.bodySize ?? 14,
    cardBg: t.cardBg ?? '#ffffff',
    cardBorder: t.cardBorder ?? '#e4e4e7',
    cardRadius: t.cardRadius ?? 12,
  };
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
};

/* ── BlockShell ─────────────────────────────────────────── */

export interface BlockShellProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
}

export function BlockShell({
  as: Tag = 'section',
  bgColor,
  textColor,
  fontFamily,
  maxW = 900,
  px = 24,
  py = 24,
  radius,
  gap = 16,
  style = {},
  className = '',
  children,
  ...rest
}: BlockShellProps) {
  const lc = useLC();

  return (
    <Tag
      className={className}
      {...rest}
      style={{
        background: bgColor ?? lc.bg,
        color: textColor ?? lc.fg,
        fontFamily: fontFamily ?? lc.ff,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius ?? lc.r,
        border: `1px solid ${lc.border}`,
        display: 'grid',
        justifyItems: 'start',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: maxW,
          display: 'grid',
          gap,
        }}
      >
        {children}
      </div>
    </Tag>
  );
}

/* ── Accordion ──────────────────────────────────────────── */

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends React.ComponentPropsWithoutRef<'div'> {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({
  items = [],
  allowMultiple = false,
  className,
  style,
  ...rest
}: AccordionProps) {
  const lc = useLC();

  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);

      next.has(id) ? next.delete(id) : next.add(id);

      return next;
    });
  };

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gap: 10,
        fontFamily: lc.ff,
        ...style,
      }}
      {...rest}
    >
      {items.map((it) => {
        const isOpen = open.has(it.id);

        return (
          <div
            key={it.id}
            style={{
              border: `1px solid ${isOpen ? lc.accent : lc.border}`,
              borderRadius: lc.r,
              overflow: 'hidden',
              background: ui.white,
              transition: 'all 0.2s ease',
              boxShadow: isOpen ? '0 1px 2px rgba(9,9,11,0.08)' : '0 1px 2px rgba(9,9,11,0.03)',
            }}
          >
            <button
              type="button"
              onClick={() => toggle(it.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                padding: '16px 18px',
                background: isOpen ? ui.surface : ui.white,
                border: 'none',
                color: lc.fg,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: lc.bs,
                fontWeight: 600,
                fontFamily: lc.ff,
              }}
            >
              {it.title}

              <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={lc.fg} />
            </button>

            {isOpen && (
              <section
                style={{
                  padding: '0 18px 18px',
                  fontSize: lc.bs,
                  lineHeight: 1.7,
                  color: ui.muted,
                }}
              >
                {it.content}
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── GenericList ─────────────────────────────────────────── */

export interface GenericListProps extends React.ComponentPropsWithoutRef<'div'> {
  items: {
    id: string;
    label: string;
    description?: string;
    icon?: string;
  }[];
  title?: string;
}

export function GenericList({ items = [], title, className, style, ...rest }: GenericListProps) {
  const lc = useLC();

  return (
    <div
      className={className}
      style={{
        border: `1px solid ${lc.border}`,
        borderRadius: lc.r,
        padding: lc.sp,
        background: ui.white,
        color: lc.fg,
        fontFamily: lc.ff,
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: lc.hs,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon name="list" size={18} color={lc.accent} />

          {title}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gap: 6,
        }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 14px',
              borderRadius: lc.r - 6,
              background: ui.surface,
              transition: 'background 0.15s',
            }}
          >
            {it.icon ? (
              <Icon name={it.icon} size={18} color={lc.accent} />
            ) : (
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: lc.accent,
                }}
              />
            )}

            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: lc.fg,
                }}
              >
                {it.label}
              </div>

              {it.description && (
                <div
                  style={{
                    fontSize: 13,
                    color: ui.muted,
                    marginTop: 2,
                  }}
                >
                  {it.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FeatureGrid ────────────────────────────────────────── */

export interface FeatureItem {
  id: string;
  icon?: string;
  title: string;
  description?: string;
}

export interface FeatureGridProps extends React.ComponentPropsWithoutRef<'div'> {
  items: FeatureItem[];
  columns?: number | string;
  title?: string;
}

export function FeatureGrid({
  items = [],
  columns = 3,
  title,
  className,
  style,
  ...rest
}: FeatureGridProps) {
  const lc = useLC();

  return (
    <div
      className={className}
      style={{
        fontFamily: lc.ff,
        color: lc.fg,
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: lc.hs,
            marginBottom: 18,
          }}
        >
          {title}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 16,
        }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              border: `1px solid ${lc.border}`,
              borderRadius: lc.r,
              padding: lc.sp,
              background: ui.white,
              display: 'grid',
              gap: 12,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            {it.icon && (
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: ui.surface,
                  border: `1px solid ${lc.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name={it.icon} size={20} color={lc.accent} />
              </div>
            )}

            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {it.title}
            </div>

            {it.description && (
              <div
                style={{
                  fontSize: 13,
                  color: ui.muted,
                  lineHeight: 1.6,
                }}
              >
                {it.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ItemCardGrid ───────────────────────────────────────── */

export interface ItemCardData {
  id: string;
  title: string;
  image?: string;
  subtitle?: string;
  badge?: string;
}

export interface ItemCardGridProps extends React.ComponentPropsWithoutRef<'div'> {
  items: ItemCardData[];
  columns?: number | string;
  onItemClick?: (id: string) => void;
}

export function ItemCardGrid({
  items = [],
  columns = 3,
  onItemClick,
  className,
  style,
  ...rest
}: ItemCardGridProps) {
  const lc = useLC();

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
        ...style,
      }}
      {...rest}
    >
      {items.map((it) => (
        <div
          key={it.id}
          role="button"
          tabIndex={0}
          onClick={() => onItemClick?.(it.id)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onItemClick) {
              e.preventDefault();
              onItemClick(it.id);
            }
          }}
          style={{
            border: `1px solid ${lc.border}`,
            borderRadius: lc.r,
            overflow: 'hidden',
            background: ui.white,
            cursor: onItemClick ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            fontFamily: lc.ff,
            color: lc.fg,
            boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
          }}
        >
          {it.image && (
            <img
              src={it.image}
              alt={it.title}
              style={{
                width: '100%',
                height: 160,
                objectFit: 'cover',
              }}
            />
          )}

          <div style={{ padding: 16 }}>
            {it.badge && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 9px',
                  borderRadius: 999,
                  background: ui.surface,
                  border: `1px solid ${lc.border}`,
                  color: lc.fg,
                  marginBottom: 8,
                  display: 'inline-block',
                }}
              >
                {it.badge}
              </span>
            )}

            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {it.title}
            </div>

            {it.subtitle && (
              <div
                style={{
                  fontSize: 13,
                  color: ui.muted,
                  marginTop: 4,
                }}
              >
                {it.subtitle}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── PricingTable ───────────────────────────────────────── */

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  highlighted?: boolean;
  cta?: string;
}

export interface PricingTableProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  plans: Plan[];
  onSelect?: (planId: string) => void;
}

export function PricingTable({
  plans = [],
  onSelect,
  className,
  style,
  ...rest
}: PricingTableProps) {
  const lc = useLC();

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(plans.length, 4)}, 1fr)`,
        gap: 16,
        fontFamily: lc.ff,
        color: lc.fg,
        ...style,
      }}
      {...rest}
    >
      {plans.map((p) => (
        <div
          key={p.id}
          style={{
            border: `1px solid ${p.highlighted ? lc.accent : lc.border}`,
            borderRadius: lc.r,
            padding: lc.sp + 10,
            background: ui.white,
            display: 'grid',
            gap: 18,
            position: 'relative',
            boxShadow: p.highlighted
              ? '0 4px 20px rgba(9,9,11,0.06)'
              : '0 1px 2px rgba(9,9,11,0.04)',
          }}
        >
          {p.highlighted && (
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                padding: '5px 10px',
                borderRadius: 999,
                background: lc.accent,
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Popular
            </div>
          )}

          <div
            style={{
              fontWeight: 700,
              fontSize: lc.hs,
            }}
          >
            {p.name}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: lc.fg,
              }}
            >
              {p.price}
            </span>

            {p.period && (
              <span
                style={{
                  color: ui.muted,
                  fontSize: 14,
                }}
              >
                / {p.period}
              </span>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gap: 10,
            }}
          >
            {p.features.map((f) => (
              <div
                key={f.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                }}
              >
                <Icon
                  name={f.included ? 'check' : 'x'}
                  size={16}
                  color={f.included ? '#16a34a' : '#ef4444'}
                />

                <span
                  style={{
                    color: f.included ? lc.fg : ui.muted,
                  }}
                >
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelect?.(p.id)}
            style={{
              padding: '13px 16px',
              borderRadius: lc.r - 4,
              border: p.highlighted ? `1px solid ${lc.accent}` : `1px solid ${lc.border}`,
              background: p.highlighted ? lc.accent : ui.white,
              color: p.highlighted ? '#fff' : lc.fg,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              marginTop: 'auto',
              transition: 'all 0.2s ease',
            }}
          >
            {p.cta ?? 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ── SortableTable ──────────────────────────────────────── */

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string | number;
  render?: (row: T) => React.ReactNode;
}

export interface SortableTableProps<T> extends React.ComponentPropsWithoutRef<'section'> {
  columns: TableColumn<T>[];
  rows: T[];
  caption?: string;
}

export function SortableTable<T extends Record<string, unknown>>({
  columns = [],
  rows = [],
  caption,
  className,
  style,
  ...rest
}: SortableTableProps<T>) {
  const lc = useLC();

  const [sort, setSort] = useState<
    | {
        key: keyof T;
        dir: 'asc' | 'desc';
      }
    | undefined
  >();

  const sorted = useMemo(() => {
    if (!sort) return rows;

    return [...rows].sort((a, b) => {
      const av = a[sort.key] as string | number | boolean;
      const bv = b[sort.key] as string | number | boolean;

      if (av === bv) return 0;

      return (av > bv ? 1 : -1) * (sort.dir === 'asc' ? 1 : -1);
    });
  }, [rows, sort]);

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;

    setSort((prev) => ({
      key: col.key,
      dir: prev?.key === col.key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <section
      className={className}
      style={{
        border: `1px solid ${lc.border}`,
        borderRadius: lc.r,
        overflow: 'hidden',
        background: ui.white,
        color: lc.fg,
        fontFamily: lc.ff,
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      {...rest}
    >
      {caption && (
        <div
          style={{
            padding: lc.sp,
            borderBottom: `1px solid ${lc.border}`,
            fontWeight: 700,
            fontSize: lc.hs,
          }}
        >
          {caption}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr
              style={{
                background: ui.surface,
              }}
            >
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  onClick={() => handleSort(c)}
                  style={{
                    padding: '14px 16px',
                    fontWeight: 700,
                    fontSize: lc.bs,
                    textAlign: 'left',
                    cursor: c.sortable ? 'pointer' : 'default',
                    borderBottom: `1px solid ${lc.border}`,
                    width: c.width,
                    color: ui.muted,
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {c.label}

                    {c.sortable && (
                      <Icon
                        name={
                          sort?.key === c.key && sort.dir === 'desc' ? 'chevron-down' : 'chevron-up'
                        }
                        size={14}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: `1px solid ${lc.border}`,
                }}
              >
                {columns.map((c) => (
                  <td
                    key={String(c.key)}
                    style={{
                      padding: '14px 16px',
                      fontSize: lc.bs,
                      color: lc.fg,
                    }}
                  >
                    {c.render ? c.render(row) : String(row[c.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── Timeline ───────────────────────────────────────────── */

export interface LCTimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: string;
}

export interface LCTimelineProps extends React.ComponentPropsWithoutRef<'div'> {
  items: LCTimelineItem[];
}

export function LCTimeline({ items = [], className, style, ...rest }: LCTimelineProps) {
  const lc = useLC();

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        paddingLeft: 36,
        fontFamily: lc.ff,
        color: lc.fg,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'absolute',
          left: 11,
          top: 12,
          bottom: 12,
          width: 2,
          background: lc.border,
        }}
      />

      {items.map((it, i) => (
        <div
          key={it.id}
          style={{
            position: 'relative',
            paddingBottom: i < items.length - 1 ? 22 : 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -36,
              top: 14,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: ui.white,
              border: `2px solid ${lc.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              boxShadow: '0 1px 2px rgba(9,9,11,0.05)',
            }}
          >
            <Icon name={it.icon ?? 'circle'} size={12} color={lc.accent} />
          </div>

          <div
            style={{
              border: `1px solid ${lc.border}`,
              borderRadius: lc.r,
              padding: lc.sp,
              background: ui.white,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {it.title}
            </div>

            {it.date && (
              <div
                style={{
                  fontSize: 12,
                  color: ui.muted,
                  marginTop: 4,
                }}
              >
                {it.date}
              </div>
            )}

            {it.description && (
              <div
                style={{
                  fontSize: lc.bs,
                  color: ui.muted,
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {it.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
