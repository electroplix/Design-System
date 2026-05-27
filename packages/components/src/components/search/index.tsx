'use client';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../../core/icons';
import { useSearchTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useSR() {
  const t = useSearchTheme();

  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#09090b',
    muted: '#71717a',
    bg: t.bgColor ?? '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    border: t.borderColor ?? '#e4e4e7',
    r: t.radius ?? 16,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
    hs: t.headingSize ?? 18,
  };
}

/* ── SiteSearchBar ──────────────────────────────────────── */

export interface SiteSearchBarProps {
  placeholder?: string;
  onSearch?: (q: string) => void;
  defaultValue?: string;
  autoFocus?: boolean;
}

export function SiteSearchBar({
  placeholder = 'Search...',
  onSearch,
  defaultValue = '',
  autoFocus = false,
}: SiteSearchBarProps) {
  const sr = useSR();
  const [q, setQ] = useState(defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <form onSubmit={handle} style={{ display: 'flex', gap: 8, fontFamily: sr.ff }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderRadius: sr.r,
          border: `1px solid ${sr.border}`,
          background: '#ffffff',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        <Icon name="search" size={18} color={sr.muted} />

        <input
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            color: sr.fg,
            fontSize: sr.bs,
            outline: 'none',
            fontFamily: sr.ff,
          }}
        />

        {q && (
          <button
            type="button"
            onClick={() => {
              setQ('');
              onSearch?.('');
            }}
            style={{
              background: sr.surface,
              border: `1px solid ${sr.border}`,
              borderRadius: 8,
              cursor: 'pointer',
              padding: 0,
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: sr.muted,
            }}
          >
            <Icon name="x" size={14} color={sr.muted} />
          </button>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: '12px 20px',
          borderRadius: sr.r,
          border: `1px solid ${sr.accent}`,
          background: sr.accent,
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
        }}
      >
        Search
      </button>
    </form>
  );
}

/* ── AutoSuggest ────────────────────────────────────────── */

export interface AutoSuggestProps {
  suggestions: string[];
  onSelect?: (val: string) => void;
  placeholder?: string;
  onQueryChange?: (q: string) => void;
}

export function AutoSuggest({
  suggestions = [],
  onSelect,
  placeholder = 'Type to search...',
  onQueryChange,
}: AutoSuggestProps) {
  const sr = useSR();
  const [q, setQ] = useState('');
  const [show, setShow] = useState(false);
  const [hi, setHi] = useState(-1);

  const filtered = useMemo(
    () =>
      q.trim()
        ? suggestions.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
        : [],
    [q, suggestions],
  );

  const change = (v: string) => {
    setQ(v);
    setShow(true);
    setHi(-1);
    onQueryChange?.(v);
  };

  const pick = (v: string) => {
    setQ(v);
    setShow(false);
    onSelect?.(v);
  };

  const keyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHi((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && hi >= 0) {
      e.preventDefault();
      pick(filtered[hi]);
    } else if (e.key === 'Escape') {
      setShow(false);
    }
  };

  return (
    <div style={{ position: 'relative', fontFamily: sr.ff }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderRadius: sr.r,
          border: `1px solid ${sr.border}`,
          background: '#ffffff',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        <Icon name="search" size={18} color={sr.muted} />

        <input
          value={q}
          onChange={(e) => change(e.target.value)}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
          onKeyDown={keyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            color: sr.fg,
            fontSize: sr.bs,
            outline: 'none',
            fontFamily: sr.ff,
          }}
        />
      </div>

      {show && filtered.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: sr.bg,
            border: `1px solid ${sr.border}`,
            borderRadius: sr.r,
            overflow: 'hidden',
            zIndex: 50,
            boxShadow: '0 12px 30px rgba(9, 9, 11, 0.10), 0 2px 8px rgba(9, 9, 11, 0.04)',
          }}
        >
          {filtered.map((s, i) => (
            <div
              key={s}
              onMouseDown={() => pick(s)}
              style={{
                padding: '10px 16px',
                fontSize: sr.bs,
                cursor: 'pointer',
                background: i === hi ? sr.surface : '#ffffff',
                color: sr.fg,
                transition: 'background 0.1s',
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── FacetFilters ───────────────────────────────────────── */

export interface FacetOption {
  id: string;
  label: string;
  count?: number;
}

export interface Facet {
  id: string;
  name: string;
  options: FacetOption[];
}

export interface FacetFiltersProps {
  facets: Facet[];
  selected?: Record<string, Set<string>>;
  onChange?: (facetId: string, optionId: string, checked: boolean) => void;
}

export function FacetFilters({ facets = [], selected = {}, onChange }: FacetFiltersProps) {
  const sr = useSR();

  return (
    <div style={{ display: 'grid', gap: 16, fontFamily: sr.ff, color: sr.fg }}>
      {facets.map((f) => (
        <div key={f.id}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: sr.muted,
            }}
          >
            {f.name}
          </div>

          <div style={{ display: 'grid', gap: 4 }}>
            {f.options.map((o) => {
              const isChecked = selected[f.id]?.has(o.id) ?? false;

              return (
                <label
                  key={o.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 10px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                    background: isChecked ? sr.surface : 'transparent',
                    border: `1px solid ${isChecked ? sr.border : 'transparent'}`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onChange?.(f.id, o.id, e.target.checked)}
                    style={{ accentColor: sr.accent }}
                  />

                  <span style={{ flex: 1, fontSize: sr.bs, color: sr.fg }}>{o.label}</span>

                  {o.count !== undefined && (
                    <span
                      style={{
                        fontSize: 12,
                        color: sr.muted,
                      }}
                    >
                      {o.count}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── SearchResultCard ───────────────────────────────────── */

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  image?: string;
  badge?: string;
  meta?: string;
}

export interface SearchResultCardProps {
  item: SearchItem;
  onClick?: (item: SearchItem) => void;
}

export function SearchResultCard({ item, onClick }: SearchResultCardProps) {
  const sr = useSR();

  return (
    <div
      onClick={() => onClick?.(item)}
      style={{
        display: 'flex',
        gap: 14,
        padding: sr.sp,
        border: `1px solid ${sr.border}`,
        borderRadius: sr.r,
        background: sr.bg,
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: sr.ff,
        color: sr.fg,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt=""
          style={{
            width: 80,
            height: 60,
            objectFit: 'cover',
            borderRadius: sr.r - 6,
            flexShrink: 0,
            border: `1px solid ${sr.border}`,
          }}
        />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '-0.02em',
              color: sr.fg,
            }}
          >
            {item.title}
          </div>

          {item.badge && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 999,
                background: sr.surface,
                border: `1px solid ${sr.border}`,
                color: sr.fg,
              }}
            >
              {item.badge}
            </span>
          )}
        </div>

        {item.description && (
          <div
            style={{
              fontSize: 14,
              color: sr.muted,
              marginTop: 4,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </div>
        )}

        {item.meta && (
          <div
            style={{
              fontSize: 12,
              color: sr.muted,
              marginTop: 4,
            }}
          >
            {item.meta}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SearchResults ──────────────────────────────────────── */

export interface SearchResultsProps {
  items: SearchItem[];
  query?: string;
  onItemClick?: (item: SearchItem) => void;
  loading?: boolean;
}

export function SearchResults({ items = [], query, onItemClick, loading }: SearchResultsProps) {
  const sr = useSR();

  if (loading)
    return (
      <div
        style={{
          textAlign: 'center',
          padding: 32,
          fontFamily: sr.ff,
          color: sr.fg,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: `2px solid ${sr.border}`,
            borderTopColor: sr.accent,
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'eplxSpin 0.8s linear infinite',
          }}
        />

        <style>{`@keyframes eplxSpin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );

  if (!items.length) return <SearchEmptyState query={query} />;

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {query && (
        <div
          style={{
            fontSize: 14,
            fontFamily: sr.ff,
            color: sr.muted,
            marginBottom: 4,
          }}
        >
          {items.length} result{items.length !== 1 ? 's' : ''} for "{query}"
        </div>
      )}

      {items.map((it) => (
        <SearchResultCard key={it.id} item={it} onClick={onItemClick} />
      ))}
    </div>
  );
}

/* ── SearchEmptyState ───────────────────────────────────── */

export interface SearchEmptyStateProps {
  query?: string;
  title?: string;
  description?: string;
}

export function SearchEmptyState({ query, title, description }: SearchEmptyStateProps) {
  const sr = useSR();

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 48,
        fontFamily: sr.ff,
        color: sr.fg,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: sr.surface,
          border: `1px solid ${sr.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        <Icon name="search" size={24} color={sr.muted} />
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: '-0.025em',
          color: sr.fg,
        }}
      >
        {title ?? (query ? 'No results found' : 'Start searching')}
      </div>

      <div
        style={{
          fontSize: 14,
          color: sr.muted,
          marginTop: 6,
          lineHeight: 1.6,
        }}
      >
        {description ??
          (query
            ? `We couldn't find anything for "${query}". Try a different search.`
            : 'Type a query to see results.')}
      </div>
    </div>
  );
}
