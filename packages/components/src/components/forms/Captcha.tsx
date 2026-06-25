'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export interface CaptchaProps extends React.ComponentPropsWithoutRef<'div'> {
  as?: React.ElementType;
  mode?: 'checkbox' | 'math';
  label?: string;
  onVerify?: (ok: boolean) => void;
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
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  success: '#16a34a',
  successSoft: '#f0fdf4',
  ring: 'rgba(9,9,11,0.08)',
};

export function Captcha(props: CaptchaProps) {
  const t = useFormsTheme();

  const {
    as: Tag = 'div',
    mode = 'checkbox',
    label = "I'm not a robot",
    onVerify,
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
    labelSize = 14,
    style = {},
    className = '',
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;
  const inputSurface = inputBg ?? t.inputBg ?? ui.white;

  const [ok, setOk] = useState(false);
  const [a, setA] = useState(() => Math.ceil(Math.random() * 9));
  const [b, setB] = useState(() => Math.ceil(Math.random() * 9));
  const [ans, setAns] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const verifyMath = () => {
    const good = Number(ans) === a + b;
    setOk(good);
    onVerify?.(good);
  };

  const refreshMath = () => {
    setA(Math.ceil(Math.random() * 9));
    setB(Math.ceil(Math.random() * 9));
    setAns('');
    setOk(false);
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
        {mode === 'checkbox' ? (
          <button
            type="button"
            onClick={() => {
              const n = !ok;
              setOk(n);
              onVerify?.(n);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 20px',
              borderRadius: radius,
              border: `1px solid ${ok ? ui.success : isHovered ? ui.black : border}`,
              background: ok ? ui.successSoft : isHovered ? ui.surface : inputSurface,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isHovered ? `0 0 0 4px ${ui.ring}` : '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                border: `1.5px solid ${ok ? ui.success : isHovered ? accent : border}`,
                background: ok ? ui.success : ui.white,
                display: 'grid',
                placeItems: 'center',
                transition: 'all 0.2s ease',
                boxShadow: 'inset 0 1px 1px rgba(9,9,11,0.04)',
              }}
            >
              {ok && (
                <Icon name="check" size={14} style={{ color: ui.white } as React.CSSProperties} />
              )}
            </div>

            <span
              style={{
                fontSize: labelSize,
                color: fg,
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </span>
          </button>
        ) : (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: radius,
              border: `1px solid ${ok ? ui.success : border}`,
              background: ok ? ui.successSoft : inputSurface,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  background: ui.surface,
                  border: `1px solid ${border}`,
                  fontWeight: 700,
                  fontSize: 16,
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  color: fg,
                  boxShadow: 'inset 0 -1px 0 rgba(9,9,11,0.04)',
                }}
              >
                {a} + {b} = ?
              </div>

              <button
                type="button"
                onClick={refreshMath}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  background: ui.white,
                  color: ui.muted,
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                }}
              >
                <Icon name="refresh-cw" size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                placeholder="Your answer"
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: `1px solid ${border}`,
                  background: ui.white,
                  color: fg,
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                }}
              />

              <button
                type="button"
                onClick={verifyMath}
                disabled={ok}
                style={{
                  padding: '12px 20px',
                  borderRadius: 10,
                  border: `1px solid ${ok ? ui.success : ui.black}`,
                  background: ok ? ui.success : ui.black,
                  color: ui.white,
                  cursor: ok ? 'default' : 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s ease',
                  boxShadow: ok ? '0 1px 2px rgba(22,163,74,0.14)' : '0 1px 2px rgba(9,9,11,0.12)',
                }}
              >
                {ok ? (
                  <>
                    <Icon name="check" size={16} />
                    Verified
                  </>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Tag>
  );
}
