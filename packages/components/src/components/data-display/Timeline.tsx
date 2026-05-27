'use client';
import React, { useState } from 'react';
import { useDataDisplayTheme } from '../../core/provider';
import { Icon } from '../../core/icons';

/* ── Timeline ───────────────────────────────────────────── */

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  status?: 'done' | 'in_progress' | 'blocked' | 'todo';
}

export interface TimelineProps {
  items: TimelineItem[];
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  success: '#16a34a',
  danger: '#dc2626',
  warning: '#d97706',
};

const STATUS_CFG: Record<
  NonNullable<TimelineItem['status']>,
  { color: string; bg: string; border: string; icon: string; label: string }
> = {
  done: {
    color: ui.success,
    bg: '#f0fdf4',
    border: '#bbf7d0',
    icon: 'check-circle',
    label: 'Completed',
  },
  in_progress: {
    color: ui.black,
    bg: ui.surface,
    border: ui.border,
    icon: 'loader',
    label: 'In Progress',
  },
  blocked: {
    color: ui.danger,
    bg: '#fef2f2',
    border: '#fecaca',
    icon: 'alert-circle',
    label: 'Blocked',
  },
  todo: {
    color: ui.muted,
    bg: ui.surface,
    border: ui.border,
    icon: 'circle',
    label: 'To Do',
  },
};

function TimelineEntry({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  const t = useDataDisplayTheme();
  const fg = t.textColor ?? ui.text;
  const border = t.borderColor ?? ui.border;
  const bg = t.bgColor ?? ui.white;
  const r = t.radius ?? 14;
  const sp = t.spacing ?? 14;
  const [hovered, setHovered] = useState(false);
  const config = STATUS_CFG[item.status ?? 'todo'];

  return (
    <div
      style={{ position: 'relative', paddingBottom: isLast ? 0 : sp + 8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'absolute',
          left: -32,
          top: sp,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: ui.white,
          border: `1px solid ${config.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 180ms ease, box-shadow 180ms ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          boxShadow: hovered ? '0 1px 4px rgba(9, 9, 11, 0.10)' : '0 1px 2px rgba(9, 9, 11, 0.04)',
          zIndex: 1,
        }}
      >
        <Icon name={config.icon} size={15} color={config.color} />
      </div>

      <div
        style={{
          border: `1px solid ${hovered ? ui.mutedSoft : border}`,
          borderRadius: r,
          padding: sp,
          background: hovered ? ui.surface : bg,
          transition: 'all 180ms ease',
          transform: hovered ? 'translateX(2px)' : 'translateX(0)',
          boxShadow: hovered ? '0 2px 8px rgba(9, 9, 11, 0.06)' : '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: t.headingSize ?? 18,
              color: ui.black,
              letterSpacing: '-0.02em',
            }}
          >
            {item.title}
          </span>
          <span
            style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 999,
              background: config.bg,
              border: `1px solid ${config.border}`,
              color: config.color,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.3,
            }}
          >
            {config.label}
          </span>
        </div>

        {item.time && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              color: ui.muted,
              marginBottom: item.description ? 8 : 0,
              fontWeight: 500,
            }}
          >
            <Icon name="clock" size={12} color={ui.muted} />
            {item.time}
          </div>
        )}

        {item.description && (
          <div
            style={{
              fontSize: t.bodySize ?? 14,
              color: ui.muted,
              lineHeight: 1.5,
            }}
          >
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
}

export function Timeline({ items = [] }: TimelineProps) {
  const t = useDataDisplayTheme();
  const accent = t.accentColor ?? ui.black;
  const fg = t.textColor ?? ui.text;
  const grid = t.gridColor ?? ui.border;
  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return (
      <div
        style={{
          padding: 28,
          background: t.cardBg ?? ui.white,
          borderRadius: t.cardRadius ?? 12,
          border: `1px solid ${t.cardBorder ?? ui.border}`,
          color: fg,
          fontFamily: t.fontFamily,
          textAlign: 'center',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="clock" size={20} color={ui.black} />
        </div>
        <div style={{ marginTop: 10, color: ui.muted, fontSize: t.bodySize ?? 14 }}>
          No timeline items
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', paddingLeft: 32, color: fg, fontFamily: t.fontFamily }}>
      <div
        style={{
          position: 'absolute',
          left: 11,
          top: 24,
          bottom: 24,
          width: 2,
          background: `linear-gradient(180deg, ${accent} 0%, ${grid} 100%)`,
          borderRadius: 1,
          opacity: 0.65,
        }}
      />
      {safeItems.map((it, i) => (
        <TimelineEntry key={it.id} item={it} isLast={i === safeItems.length - 1} />
      ))}
    </div>
  );
}
