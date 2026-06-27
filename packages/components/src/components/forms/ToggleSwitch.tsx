'use client';
import type React from 'react';
import { useState } from 'react';
import { useFormsTheme } from '../../core/provider';

export interface ToggleSwitchProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  as?: React.ElementType;
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  size?: number;
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
}

export function ToggleSwitch(props: ToggleSwitchProps) {
  const t = useFormsTheme();
  const {
    as: Tag = 'div',
    label = 'Enable Feature',
    description,
    checked,
    defaultChecked,
    onChange,
    size = 24,
    bgColor = t.bgColor,
    textColor = t.textColor,
    accentColor: _accentColor = t.accentColor,
    borderColor = t.borderColor,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 0,
    py = t.py ?? 0,
    radius = t.cardRadius ?? 12,
    gap = t.gap ?? 12,
    labelSize = 14,
    style = {},
    className = '',
    ...rest
  } = props;
  const [state, setState] = useState(!!defaultChecked);
  const isOn = checked ?? state;
  const toggle = () => {
    const n = !isOn;
    setState(n);
    onChange?.(n);
  };

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
      {...rest}
    >
      <div style={{ maxWidth: maxW, display: 'flex', flexDirection: 'column' as const, gap }}>
        <div
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 18px',
            borderRadius: radius,
            border: `1px solid ${isOn ? '#22C55E40' : borderColor}`,
            background: isOn ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ flex: 1 }}>
            {label && <span style={{ fontSize: labelSize, fontWeight: 500 }}>{label}</span>}
            {description && (
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{description}</div>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            aria-pressed={isOn}
            style={{
              width: size * 2.2,
              height: size + 4,
              borderRadius: size,
              background: isOn
                ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                : 'rgba(255,255,255,0.15)',
              border: `1px solid ${isOn ? '#22C55E' : 'rgba(255,255,255,0.2)'}`,
              position: 'relative' as const,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isOn ? '0 0 12px rgba(34,197,94,0.4)' : 'none',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute' as const,
                top: 3,
                left: isOn ? size * 1.2 + 1 : 3,
                width: size - 2,
                height: size - 2,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </button>
        </div>
      </div>
    </Tag>
  );
}
