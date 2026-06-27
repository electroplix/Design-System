/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type React from 'react';
import { useMemo, useState } from 'react';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';

/* ── DataTable ──────────────────────────────────────────── */

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> extends React.ComponentPropsWithoutRef<'section'> {
  columns: DataTableColumn<T>[];
  rows: T[];
  pageSize?: number;
  zebra?: boolean;
  compact?: boolean;
  caption?: string;
  initialSort?: { key: keyof T; dir: 'asc' | 'desc' };
  searchable?: boolean;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
};

export function DataTable<T extends Record<string, any>>({
  columns = [],
  rows = [],
  pageSize = 5,
  zebra = true,
  compact = false,
  caption,
  initialSort,
  searchable = false,
  className,
  style,
  ...rest
}: DataTableProps<T>) {
  const t = useDataDisplayTheme();

  const accent = t.accentColor ?? ui.black;
  const fg = t.textColor ?? ui.text;
  const bg = t.bgColor ?? ui.white;
  const border = t.borderColor ?? ui.border;
  const r = t.radius ?? 14;
  const sp = t.spacing ?? 14;

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(initialSort);
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeRows = Array.isArray(rows) ? rows : [];

  const filtered = useMemo(() => {
    if (!search.trim()) return safeRows;
    const q = search.toLowerCase();
    return safeRows.filter((row) =>
      safeColumns.some((col) => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      }),
    );
  }, [safeRows, safeColumns, search]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const { key, dir } = sort;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv != null) return dir === 'asc' ? -1 : 1;
      if (av != null && bv == null) return dir === 'asc' ? 1 : -1;
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (dir === 'asc' ? 1 : -1);
    });
    return copy;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    setPage(1);
    setSort((prev) => {
      const dir = prev?.key === col.key && prev.dir === 'asc' ? 'desc' : 'asc';
      return { key: col.key, dir };
    });
  };

  if (safeColumns.length === 0) {
    return (
      <div
        className={className}
        style={{
          padding: sp * 2,
          background: bg,
          borderRadius: r,
          border: `1px solid ${border}`,
          color: fg,
          fontFamily: t.fontFamily,
          textAlign: 'center',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="table" size={22} color={ui.black} />
        </div>
        <div style={{ color: ui.muted, marginTop: 10, fontSize: t.bodySize ?? 14 }}>
          No columns defined
        </div>
      </div>
    );
  }

  const pad = compact ? '10px 12px' : '14px 16px';

  return (
    <section
      className={className}
      style={{
        border: `1px solid ${border}`,
        borderRadius: r,
        overflow: 'hidden',
        background: bg,
        color: fg,
        fontFamily: t.fontFamily,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      {...rest}
    >
      {(caption || searchable) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: sp,
            borderBottom: `1px solid ${border}`,
            gap: 12,
            background: ui.white,
          }}
        >
          {caption && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: ui.surface,
                  border: `1px solid ${ui.border}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name="table" size={16} color={accent} />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: t.headingSize ?? 18,
                  color: ui.black,
                  letterSpacing: '-0.02em',
                }}
              >
                {caption}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: ui.muted,
                  background: ui.surface,
                  border: `1px solid ${ui.border}`,
                  padding: '2px 8px',
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                {sorted.length} rows
              </span>
            </div>
          )}

          {searchable && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: ui.white,
                borderRadius: r - 6,
                padding: '6px 12px',
                border: `1px solid ${border}`,
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
              }}
            >
              <Icon name="search" size={14} color={ui.muted} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: fg,
                  fontSize: 13,
                  width: 150,
                  fontFamily: t.fontFamily,
                }}
              />
            </div>
          )}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: ui.surface }}>
              {safeColumns.map((c) => (
                <th
                  key={String(c.key)}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSort(c)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort(c);
                    }
                  }}
                  style={{
                    padding: pad,
                    fontWeight: 700,
                    fontSize: t.bodySize ?? 14,
                    textAlign: c.align ?? 'left',
                    width: c.width,
                    cursor: c.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    borderBottom: `1px solid ${border}`,
                    transition: 'background 150ms ease',
                    background: sort?.key === c.key ? ui.surfaceHover : 'transparent',
                    color: ui.black,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      justifyContent:
                        c.align === 'right'
                          ? 'flex-end'
                          : c.align === 'center'
                            ? 'center'
                            : 'flex-start',
                    }}
                  >
                    {c.label}
                    {c.sortable && (
                      <span
                        style={{ opacity: sort?.key === c.key ? 1 : 0.35, display: 'inline-flex' }}
                      >
                        <Icon
                          name={
                            sort?.key === c.key && sort.dir === 'desc'
                              ? 'chevron-down'
                              : 'chevron-up'
                          }
                          size={14}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={safeColumns.length}
                  style={{ padding: sp * 2, textAlign: 'center', color: ui.muted }}
                >
                  No data to display
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <tr
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    background:
                      hoveredRow === i
                        ? ui.surfaceHover
                        : zebra && i % 2 === 1
                          ? ui.surface
                          : 'transparent',
                    transition: 'background 150ms ease',
                  }}
                >
                  {safeColumns.map((c) => (
                    <td
                      key={String(c.key)}
                      style={{
                        padding: pad,
                        fontSize: t.bodySize ?? 14,
                        textAlign: c.align ?? 'left',
                        borderBottom: `1px solid ${border}`,
                        color: ui.text,
                      }}
                    >
                      {c.render ? c.render(row) : String(row[c.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: sp,
          borderTop: `1px solid ${border}`,
          fontSize: t.bodySize ?? 14,
          background: ui.white,
        }}
      >
        <span style={{ color: ui.muted }}>
          Showing {start + 1}–{Math.min(start + pageSize, sorted.length)} of {sorted.length}
        </span>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '8px 12px',
              border: `1px solid ${border}`,
              borderRadius: r - 6,
              background: page === 1 ? ui.surface : ui.white,
              color: page === 1 ? ui.mutedSoft : ui.text,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 150ms ease',
              fontFamily: t.fontFamily,
              boxShadow: page === 1 ? 'none' : '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <Icon name="chevron-left" size={16} /> Prev
          </button>

          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pn: number;
              if (totalPages <= 5) pn = i + 1;
              else if (page <= 3) pn = i + 1;
              else if (page >= totalPages - 2) pn = totalPages - 4 + i;
              else pn = page - 2 + i;
              return (
                <button
                  type="button"
                  key={pn}
                  onClick={() => setPage(pn)}
                  style={{
                    width: 36,
                    height: 36,
                    border: page === pn ? `1px solid ${accent}` : `1px solid ${border}`,
                    borderRadius: r - 6,
                    background: page === pn ? accent : ui.white,
                    color: page === pn ? ui.white : ui.text,
                    cursor: 'pointer',
                    fontWeight: page === pn ? 700 : 500,
                    transition: 'all 150ms ease',
                    fontFamily: t.fontFamily,
                    boxShadow: page === pn ? '0 1px 2px rgba(9, 9, 11, 0.08)' : 'none',
                  }}
                >
                  {pn}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '8px 12px',
              border: `1px solid ${border}`,
              borderRadius: r - 6,
              background: page === totalPages ? ui.surface : ui.white,
              color: page === totalPages ? ui.mutedSoft : ui.text,
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              opacity: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 150ms ease',
              fontFamily: t.fontFamily,
              boxShadow: page === totalPages ? 'none' : '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            Next <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
