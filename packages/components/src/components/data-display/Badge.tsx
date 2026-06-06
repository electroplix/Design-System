'use client';
import type React from 'react';
import { useState } from 'react';
import { useDataDisplayTheme } from '../../core/provider';

/* ── Badge ──────────────────────────────────────────────── */

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  children?: React.ReactNode;
  label?: string;
  tone?: BadgeTone;
  pill?: boolean;
}

const toneStyles: Record<BadgeTone, { bg: string; text: string; border: string; dot: string }> = {
  neutral: {
    bg: '#ffffff',
    text: '#18181b',
    border: '#e4e4e7',
    dot: '#71717a',
  },
  success: {
    bg: '#f0fdf4',
    text: '#166534',
    border: '#bbf7d0',
    dot: '#22c55e',
  },
  warning: {
    bg: '#fffbeb',
    text: '#92400e',
    border: '#fde68a',
    dot: '#f59e0b',
  },
  danger: {
    bg: '#fef2f2',
    text: '#991b1b',
    border: '#fecaca',
    dot: '#ef4444',
  },
  info: {
    bg: '#f0f9ff',
    text: '#075985',
    border: '#bae6fd',
    dot: '#0ea5e9',
  },
};

export function Badge({
  children,
  label,
  tone = 'neutral',
  pill = true,
  className,
  style,
  ...rest
}: BadgeProps) {
  const t = useDataDisplayTheme();
  const [hovered, setHovered] = useState(false);
  const s = toneStyles[tone];

  return (
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        borderRadius: pill ? 999 : (t.radius ?? 14) - 8,
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: t.fontFamily,
        letterSpacing: 0.2,
        textTransform: 'uppercase',
        transition: 'all 160ms ease',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: hovered ? '0 1px 3px rgba(9, 9, 11, 0.08)' : 'none',
        cursor: 'default',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: s.dot,
          opacity: 0.9,
        }}
      />
      {children ?? label}
    </span>
  );
}
