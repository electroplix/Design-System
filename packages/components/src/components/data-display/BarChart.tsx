'use client';
import type React from 'react';
import { useId, useState } from 'react';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';

/* ── BarChart ───────────────────────────────────────────── */

export interface BarChartProps extends React.ComponentPropsWithoutRef<'figure'> {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  padding?: number;
  barRadius?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#fafafa',
  grid: '#f4f4f5',
};

export function BarChart({
  data = [],
  labels = [],
  width = 520,
  height = 260,
  title,
  showGrid = true,
  padding = 32,
  barRadius = 6,
  className,
  style,
  ...rest
}: BarChartProps) {
  const t = useDataDisplayTheme();
  const uid = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const accent = t.accentColor ?? ui.black;
  const fg = t.textColor ?? ui.text;
  const bg = t.bgColor ?? ui.white;
  const grid = t.gridColor ?? ui.grid;
  const border = t.borderColor ?? ui.border;
  const r = t.radius ?? 14;

  const safeData = Array.isArray(data) ? data : [];
  const max = Math.max(1, ...safeData);
  const innerW = width - padding * 2;
  const innerH = height - padding * 2 - 30;
  const barGap = 12;
  const bw = safeData.length > 0 ? (innerW - barGap * (safeData.length - 1)) / safeData.length : 0;

  if (safeData.length === 0) {
    return (
      <figure
        className={className}
        style={{
          border: `1px solid ${border}`,
          borderRadius: r,
          padding: 28,
          color: fg,
          background: bg,
          fontFamily: t.fontFamily,
          textAlign: 'center',
          margin: 0,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="bar-chart" size={22} color={ui.black} />
        </div>
        <div style={{ color: ui.muted, marginTop: 10, fontSize: t.bodySize ?? 14 }}>
          No data available
        </div>
      </figure>
    );
  }

  return (
    <figure
      className={className}
      style={{
        border: `1px solid ${border}`,
        borderRadius: r,
        padding: t.spacing ?? 14,
        color: fg,
        background: bg,
        fontFamily: t.fontFamily,
        margin: 0,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      {...rest}
    >
      {title && (
        <figcaption
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            fontWeight: 700,
            fontSize: t.headingSize ?? 18,
            color: ui.black,
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: ui.surface,
              border: `1px solid ${ui.border}`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="bar-chart" size={16} color={accent} />
          </div>
          {title}
        </figcaption>
      )}

      <svg width={width} height={height} style={{ display: 'block' }}>
        {showGrid &&
          [0, 0.25, 0.5, 0.75, 1].map((g) => (
            <g key={g}>
              <line
                x1={padding}
                x2={width - padding}
                y1={padding + innerH * (1 - g)}
                y2={padding + innerH * (1 - g)}
                stroke={grid}
                strokeDasharray={g === 0 ? 'none' : '4,4'}
              />
              <text
                x={padding - 8}
                y={padding + innerH * (1 - g) + 4}
                fontSize={10}
                fill={ui.muted}
                textAnchor="end"
              >
                {Math.round(max * g)}
              </text>
            </g>
          ))}

        <defs>
          <linearGradient id={`epx-barG-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id={`epx-barGH-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>

        {safeData.map((v, i) => {
          const h = (v / max) * innerH;
          const x = padding + i * (bw + barGap);
          const y = height - padding - 30 - h;
          const isH = hoveredIndex === i;
          return (
            <g key={i}>
              {isH && (
                <rect
                  x={x - 2}
                  y={y - 2}
                  width={bw + 4}
                  height={h + 4}
                  rx={barRadius + 2}
                  fill={ui.surface}
                  stroke={ui.border}
                  opacity={1}
                />
              )}
              <rect
                x={x}
                y={y}
                width={bw}
                height={h}
                rx={barRadius}
                fill={isH ? `url(#epx-barGH-${uid})` : `url(#epx-barG-${uid})`}
                style={{ transition: 'all 200ms ease', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {isH && (
                <text
                  x={x + bw / 2}
                  y={y - 8}
                  fontSize={12}
                  fill={ui.black}
                  textAnchor="middle"
                  fontWeight={700}
                >
                  {v}
                </text>
              )}
            </g>
          );
        })}

        {labels.map((lb, i) => (
          <text
            key={i}
            x={padding + i * (bw + barGap) + bw / 2}
            y={height - padding - 8}
            fontSize={11}
            fill={hoveredIndex === i ? accent : ui.muted}
            textAnchor="middle"
            opacity={hoveredIndex === i ? 1 : 0.85}
            fontWeight={hoveredIndex === i ? 700 : 500}
            style={{ transition: 'all 200ms ease' }}
          >
            {lb}
          </text>
        ))}
      </svg>
    </figure>
  );
}
