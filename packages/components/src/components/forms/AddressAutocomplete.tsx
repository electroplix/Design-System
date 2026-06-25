'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export interface AddressAutocompleteProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  as?: React.ElementType;
  label?: string;
  name: string;
  suggestions?: string[];
  onQuery?: (q: string) => Promise<string[]> | string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  inputBg?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  labelSize?: number;
  inputSize?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  ring: 'rgba(9,9,11,0.08)',
};

export function AddressAutocomplete(props: AddressAutocompleteProps) {
  const t = useFormsTheme();

  const {
    as: Tag = 'div',
    label = 'Address',
    name = 'address',
    suggestions = ['123 Main St, New York', '456 Oak Ave, Los Angeles', '789 Pine Rd, Chicago'],
    onQuery,
    placeholder = 'Start typing your address...',
    onSelect,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    inputBg,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 0,
    py = t.py ?? 0,
    radius = t.cardRadius ?? 12,
    gap = t.gap ?? 12,
    labelSize = 13,
    inputSize = 14,
    style = {},
    className = '',
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;
  const inputSurface = inputBg ?? t.inputBg ?? ui.white;

  const [q, setQ] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selIdx, setSelIdx] = useState(-1);

  const safe = Array.isArray(suggestions) ? suggestions : [];

  const query = async (v: string) => {
    setQ(v);
    setSelIdx(-1);

    if (onQuery) {
      const res = await onQuery(v);
      setItems(res);
    } else {
      setItems(safe.filter((s) => s.toLowerCase().includes(v.toLowerCase())));
    }
  };

  const selectItem = (item: string) => {
    setQ(item);
    setItems([]);
    onSelect?.(item);
  };

  return (
    <Tag
      className={className}
      style={{
        background: bg,
        color: fg,
        fontFamily,
        padding: `${py}px ${px}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          maxWidth: maxW,
          display: 'flex',
          flexDirection: 'column',
          gap,
        }}
      >
        {label && (
          <label
            htmlFor={name}
            style={{
              fontSize: labelSize,
              fontWeight: 600,
              color: fg,
              letterSpacing: '-0.01em',
            }}
          >
            {label}
          </label>
        )}

        <div style={{ position: 'relative' }}>
          {/* Search Icon */}
          <div
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: isFocused ? accent : ui.muted,
              transition: 'all 0.2s ease',
              display: 'flex',
              zIndex: 2,
            }}
          >
            <Icon name="search" size={18} />
          </div>

          {/* Input */}
          <input
            id={name}
            name={name}
            value={q}
            onChange={(e) => void query(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            autoComplete="off"
            style={{
              width: '100%',
              padding: '14px 14px 14px 44px',
              borderRadius: radius,
              border: `1px solid ${isFocused ? accent : border}`,
              background: inputSurface,
              color: fg,
              fontSize: inputSize,
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              boxShadow: isFocused ? `0 0 0 4px ${ui.ring}` : '0 1px 2px rgba(9,9,11,0.04)',
            }}
          />

          {/* Suggestions */}
          {q && items.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: 8,
                background: ui.white,
                border: `1px solid ${border}`,
                borderRadius: radius,
                overflow: 'hidden',
                zIndex: 50,
                boxShadow: '0 10px 30px rgba(9, 9, 11, 0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {items.map((s, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => selectItem(s)}
                  onMouseEnter={() => setSelIdx(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    background: selIdx === i ? ui.surfaceHover : 'transparent',
                    borderBottom: i < items.length - 1 ? `1px solid ${border}` : 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    color: fg,
                    fontSize: 14,
                    textAlign: 'left',
                    boxSizing: 'border-box',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon
                    name="map-pin"
                    size={16}
                    style={{ color: ui.muted } as React.CSSProperties}
                  />

                  <span
                    style={{
                      fontWeight: 500,
                      color: fg,
                    }}
                  >
                    {s}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected State */}
        {q && items.length === 0 && q.length > 3 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 14px',
              borderRadius: 10,
              background: ui.surface,
              border: `1px solid ${border}`,
              color: fg,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <Icon name="check" size={16} style={{ color: accent } as React.CSSProperties} />

            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: fg,
              }}
            >
              Address selected
            </span>
          </div>
        )}
      </div>
    </Tag>
  );
}
