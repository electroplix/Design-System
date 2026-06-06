'use client';

import type React from 'react';
import { useHeroTheme } from '../../core/provider';

export interface HeroShellProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  minH?: string | number;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
};

export function HeroShell(props: HeroShellProps) {
  const t = useHeroTheme();

  const {
    as: Tag = 'section',
    bgColor,
    textColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? '60vh',
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 48,
    radius = t.cardRadius ?? 20,
    gap = t.gap ?? 16,
    style = {},
    className = '',
    children,
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;

  return (
    <Tag
      className={className}
      {...rest}
      style={{
        display: 'grid',
        placeItems: 'center',
        background: bg,
        color: fg,
        fontFamily,
        minHeight: typeof minH === 'number' ? `${minH}px` : minH,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        border: `1px solid ${ui.border}`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
    >
      {/* subtle background gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(250,250,250,0.7), rgba(255,255,255,0))',
          pointerEvents: 'none',
        }}
      />

      {/* soft blur orbs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          width: 240,
          height: 240,
          borderRadius: '999px',
          background: 'rgba(9,9,11,0.035)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: 220,
          height: 220,
          borderRadius: '999px',
          background: 'rgba(9,9,11,0.03)',
          filter: 'blur(70px)',
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
        {children}
      </div>
    </Tag>
  );
}
