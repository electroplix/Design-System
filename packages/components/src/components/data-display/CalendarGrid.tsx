'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';
import { Badge, type BadgeTone } from './Badge';

/* ── CalendarGrid ───────────────────────────────────────── */

export interface CalendarMark {
  date: number;
  label?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

export interface CalendarGridProps extends React.ComponentPropsWithoutRef<'section'> {
  year: number;
  month: number;
  startOn?: 0 | 1;
  marks?: CalendarMark[];
  title?: string;
  onDateClick?: (date: number) => void;
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
};

export function CalendarGrid({
  year,
  month,
  startOn = 0,
  marks = [],
  title,
  onDateClick,
  className,
  style,
  ...rest
}: CalendarGridProps) {
  const t = useDataDisplayTheme();

  const accent = t.accentColor ?? ui.black;
  const fg = t.textColor ?? ui.text;
  const bg = t.bgColor ?? ui.white;
  const border = t.borderColor ?? ui.border;
  const r = t.radius ?? 14;
  const sp = t.spacing ?? 14;
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const safeYear = year || new Date().getFullYear();
  const safeMonth = typeof month === 'number' ? month : new Date().getMonth();
  const safeMarks = Array.isArray(marks) ? marks : [];

  const first = new Date(safeYear, safeMonth, 1);
  const daysInMonth = new Date(safeYear, safeMonth + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === safeYear && today.getMonth() === safeMonth;

  const lead = (first.getDay() - startOn + 7) % 7;
  const cells: Array<{ day?: number; mark?: { label?: string; tone?: string } }> = [];
  for (let i = 0; i < lead; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++) {
    const m = safeMarks.find((x) => x.date === d);
    cells.push({ day: d, mark: m ? { label: m.label, tone: m.tone } : undefined });
  }
  while (cells.length % 7 !== 0) cells.push({});

  const wdays =
    startOn === 1
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthName = new Date(safeYear, safeMonth).toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section
      className={className}
      style={{
        border: `1px solid ${border}`,
        borderRadius: r,
        padding: sp,
        background: bg,
        color: fg,
        fontFamily: t.fontFamily,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: sp,
          paddingBottom: sp - 4,
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: ui.surface,
              border: `1px solid ${ui.border}`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="calendar" size={18} color={accent} />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: t.headingSize ?? 18,
              color: ui.black,
              letterSpacing: '-0.02em',
            }}
          >
            {title ?? monthName}
          </span>
        </div>
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}
      >
        {wdays.map((w, i) => (
          <div
            key={w}
            style={{
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 700,
              padding: '8px 0',
              color: i === 0 || i === 6 ? ui.black : ui.muted,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
            }}
          >
            {w}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((c, i) => {
          const isToday = isCurrentMonth && c.day === today.getDate();
          const isH = c.day != null && hoveredDay === c.day;
          const isWeekend = i % 7 === 0 || i % 7 === 6;

          return (
            <div
              key={i}
              onMouseEnter={() => c.day != null && setHoveredDay(c.day)}
              onMouseLeave={() => setHoveredDay(null)}
              onClick={() => c.day != null && onDateClick?.(c.day)}
              style={{
                minHeight: 64,
                border: `1px solid ${isToday ? accent : isH ? ui.border : 'transparent'}`,
                borderRadius: r - 6,
                padding: 6,
                background: isToday ? ui.surface : isH ? ui.surfaceHover : 'transparent',
                cursor: c.day ? 'pointer' : 'default',
                transition: 'all 150ms ease',
                opacity: c.day ? 1 : 0.35,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: isToday ? 700 : 500,
                  color: isToday ? accent : isWeekend ? ui.muted : fg,
                  marginBottom: 4,
                }}
              >
                {c.day ?? ''}
              </div>
              {c.mark?.label && (
                <Badge tone={(c.mark.tone ?? 'info') as BadgeTone} pill={false}>
                  {c.mark.label}
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      {safeMarks.length > 0 && (
        <div
          style={{
            marginTop: sp,
            paddingTop: sp - 4,
            borderTop: `1px solid ${border}`,
            fontSize: 12,
            color: ui.muted,
            fontWeight: 500,
          }}
        >
          {safeMarks.length} event{safeMarks.length !== 1 ? 's' : ''} this month
        </div>
      )}
    </section>
  );
}
