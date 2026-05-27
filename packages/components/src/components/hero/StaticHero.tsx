'use client';

import React from 'react';
import { Icon } from '../../core/icons';
import { useHeroTheme } from '../../core/provider';

export interface StaticHeroProps {
  as?: React.ElementType;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
  titleSize?: number;
  subtitleSize?: number;
  align?: 'left' | 'center' | 'right';
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  minH?: string | number;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
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
};

export function StaticHero(props: StaticHeroProps) {
  const t = useHeroTheme();

  const {
    as: Tag = 'section',
    title = 'Build Something Amazing',
    subtitle = 'Create beautiful, responsive interfaces with our modern component library.',
    ctaLabel = 'Get Started',
    onCta,
    titleSize = 56,
    subtitleSize = 20,
    align = 'center',
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? '70vh',
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 64,
    radius = t.cardRadius ?? 20,
    gap = t.gap ?? 24,
    style = {},
    className = '',
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.cardBorder ?? t.borderColor ?? ui.border;

  return (
    <Tag
      className={className}
      style={{
        display: 'grid',
        placeItems: 'center',
        background: bg,
        color: fg,
        fontFamily,
        minHeight: typeof minH === 'number' ? `${minH}px` : minH,
        padding: `${py}px ${px}px`,
        borderRadius: radius,
        border: `1px solid ${border}`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(250,250,250,0.75), rgba(255,255,255,0))',
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 560,
          height: 560,
          borderRadius: '999px',
          background: 'rgba(9,9,11,0.035)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: maxW,
          display: 'grid',
          gap,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: align }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 999,
              background: ui.white,
              border: `1px solid ${border}`,
              marginBottom: 24,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <Icon name="sparkles" size={16} color={accent} />

            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: fg,
              }}
            >
              New Release Available
            </span>
          </div>

          {title && (
            <h1
              style={{
                fontSize: titleSize,
                lineHeight: 1.05,
                margin: 0,
                fontWeight: 800,
                letterSpacing: '-0.055em',
                color: fg,
              }}
            >
              {title}
            </h1>
          )}

          {subtitle && (
            <p
              style={{
                fontSize: subtitleSize,
                color: ui.muted,
                marginTop: 20,
                marginBottom: 32,
                maxWidth: 600,
                marginInline: align === 'center' ? 'auto' : undefined,
                marginLeft: align === 'right' ? 'auto' : undefined,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent:
                align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {ctaLabel && (
              <button
                onClick={onCta}
                style={{
                  padding: '16px 28px',
                  borderRadius: 12,
                  border: `1px solid ${accent}`,
                  background: accent,
                  color: ui.white,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 1px 2px rgba(9,9,11,0.12)',
                  transition: 'all 0.2s ease',
                }}
              >
                {ctaLabel}
                <Icon name="arrow-right" size={18} />
              </button>
            )}

            <button
              style={{
                padding: '16px 28px',
                borderRadius: 12,
                border: `1px solid ${border}`,
                background: ui.white,
                color: fg,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 16,
                boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Tag>
  );
}
