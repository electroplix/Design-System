'use client';

import React, { useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export interface DateTimePickerProps {
  as?: React.ElementType;
  label?: string;
  name: string;
  mode?: 'date' | 'time' | 'datetime-local' | 'month' | 'week';
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
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
  style?: React.CSSProperties;
  className?: string;
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

export function DateTimePicker(props: DateTimePickerProps) {
  const t = useFormsTheme();

  const {
    as: Tag = 'div',
    label = 'Select Date',
    name = 'datetime',
    mode = 'date',
    value,
    defaultValue,
    onChange,
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
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;
  const inputSurface = inputBg ?? t.inputBg ?? ui.white;

  const [isFocused, setIsFocused] = useState(false);
  const [local, setLocal] = useState(defaultValue || '');

  const cur = value ?? local;
  const iconName = mode === 'time' ? 'clock' : 'calendar';

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
          <div
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: isFocused ? accent : ui.muted,
              transition: 'color 0.2s ease',
              pointerEvents: 'none',
              display: 'flex',
              zIndex: 2,
            }}
          >
            <Icon name={iconName as any} size={18} />
          </div>

          <input
            id={name}
            name={name}
            type={mode}
            value={cur}
            onChange={(e) => {
              setLocal(e.target.value);
              onChange?.(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
              boxShadow: isFocused ? `0 0 0 4px ${ui.ring}` : '0 1px 2px rgba(9,9,11,0.04)',
              colorScheme: 'light',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {mode === 'date' && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {['Today', 'Tomorrow', 'Next Week'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  const d = new Date();

                  if (l === 'Tomorrow') d.setDate(d.getDate() + 1);
                  if (l === 'Next Week') d.setDate(d.getDate() + 7);

                  const f = d.toISOString().split('T')[0];

                  setLocal(f);
                  onChange?.(f);
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  background: ui.white,
                  color: fg,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </Tag>
  );
}
