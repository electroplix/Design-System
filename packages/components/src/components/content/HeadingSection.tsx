'use client';
import type React from 'react';
import { Icon } from '../../core/icons';
import { useContentTheme } from '../../core/provider';

/* ── HeadingSection ─────────────────────────────────────── */

export interface HeadingSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  eyebrowSize?: number;
  titleSize?: number;
  subtitleSize?: number;
  spacing?: number;
  accentColor?: string;
  showDecoration?: boolean;
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

export function HeadingSection({
  as: Tag = 'section',
  bgColor,
  textColor,
  fontFamily,
  maxW = 900,
  px = 24,
  py = 32,
  radius = 16,
  gap = 16,
  style = {},
  className = '',
  eyebrow = 'Featured',
  title = 'Section Title',
  subtitle = 'A brief description of this section and its contents.',
  align = 'left',
  eyebrowSize = 13,
  titleSize = 36,
  subtitleSize = 16,
  spacing = 12,
  accentColor,
  showDecoration = true,
  ...rest
}: HeadingSectionProps) {
  const t = useContentTheme();

  const bg = bgColor ?? t.cardBg ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const ff = fontFamily ?? t.fontFamily;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = t.borderColor ?? ui.border;

  const alignItems = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <Tag
      className={className}
      style={{
        background: bg,
        color: fg,
        fontFamily: ff,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        border: `1px solid ${border}`,
        display: 'grid',
        justifyItems: 'start',
        placeItems: 'start',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ width: '100%', maxWidth: maxW, display: 'grid', gap }}>
        <div
          style={{
            textAlign: align,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems,
          }}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: ui.surface,
                color: accent,
                padding: '6px 14px',
                borderRadius: 999,
                border: `1px solid ${ui.border}`,
                fontSize: eyebrowSize,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: spacing,
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
              }}
            >
              {showDecoration && <Icon name="sparkles" size={14} color={accent} />}
              {eyebrow}
            </div>
          )}

          {/* Title */}
          {title && (
            <h1
              style={{
                fontSize: titleSize,
                fontWeight: 800,
                lineHeight: 1.12,
                margin: 0,
                marginTop: eyebrow ? 0 : spacing,
                color: fg,
                letterSpacing: '-0.04em',
              }}
            >
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              style={{
                fontSize: subtitleSize,
                lineHeight: 1.6,
                color: ui.muted,
                margin: 0,
                marginTop: spacing,
                maxWidth: align === 'center' ? '80%' : '100%',
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Decorative line */}
          {showDecoration && (
            <div
              style={{
                marginTop: spacing + 8,
                width: 60,
                height: 3,
                borderRadius: 999,
                background: accent,
                opacity: 0.9,
              }}
            />
          )}
        </div>
      </div>
    </Tag>
  );
}
