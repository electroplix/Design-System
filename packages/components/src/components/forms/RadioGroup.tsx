'use client';
import React, { useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export type RadioOption = { label: string; value: string; helpText?: string };
export interface RadioGroupProps {
  as?: React.ElementType;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  label?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  labelSize?: number;
  itemSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function RadioGroup(props: RadioGroupProps) {
  const t = useFormsTheme();
  const {
    as: Tag = 'div',
    name = 'radio',
    options = [],
    value,
    defaultValue,
    onChange,
    label = 'Choose an option',
    bgColor = t.bgColor,
    textColor = t.textColor,
    accentColor = t.accentColor,
    borderColor = t.borderColor,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 0,
    py = t.py ?? 0,
    radius = t.cardRadius ?? 12,
    gap = t.gap ?? 12,
    labelSize = 13,
    itemSize = 14,
    style = {},
    className = '',
  } = props;
  const [local, setLocal] = useState(defaultValue ?? '');
  const current = value ?? local;
  const safeOpts = Array.isArray(options) ? options : [];

  return (
    <Tag
      className={className}
      style={{
        background: bgColor,
        color: textColor,
        fontFamily,
        padding: `${py}px ${px}px`,
        ...style,
      }}
    >
      <div style={{ maxWidth: maxW, display: 'flex', flexDirection: 'column' as const, gap }}>
        {label && <div style={{ fontSize: labelSize, fontWeight: 600 }}>{label}</div>}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {safeOpts.map((opt) => {
            const sel = current === opt.value;
            return (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: radius,
                  border: `1px solid ${sel ? accentColor : borderColor}`,
                  background: sel ? `${accentColor}10` : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={sel}
                  onChange={(e) => {
                    setLocal(e.target.value);
                    onChange?.(e.target.value);
                  }}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${sel ? accentColor : 'rgba(255,255,255,0.3)'}`,
                    background: sel ? accentColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {sel && <Icon name="check" size={12} style={{ color: '#fff' } as any} />}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: itemSize, fontWeight: 500 }}>{opt.label}</span>
                  {opt.helpText && (
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{opt.helpText}</div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </Tag>
  );
}
