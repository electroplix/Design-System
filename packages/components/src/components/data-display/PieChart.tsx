'use client';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';

/* ── PieChart (donut) ───────────────────────────────────── */

export interface PieChartProps {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
  title?: string;
}

const PIE_COLORS = [
  '#09090b',
  '#3f3f46',
  '#71717a',
  '#a1a1aa',
  '#d4d4d8',
  '#52525b',
  '#27272a',
  '#18181b',
];

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

export function PieChart({
  data = [],
  labels = [],
  width = 280,
  height = 280,
  title,
}: PieChartProps) {
  const t = useDataDisplayTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fg = t.textColor ?? ui.text;
  const bg = t.bgColor ?? ui.white;
  const border = t.borderColor ?? ui.border;
  const radius = t.radius ?? 14;

  const safeData = Array.isArray(data) ? data : [];
  const total = safeData.reduce((s, n) => s + n, 0) || 1;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.35;
  const innerR = r * 0.6;

  if (safeData.length === 0) {
    return (
      <figure
        style={{
          border: `1px solid ${border}`,
          borderRadius: radius,
          padding: 28,
          color: fg,
          background: bg,
          fontFamily: t.fontFamily,
          width,
          textAlign: 'center',
          margin: 0,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
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
          <Icon name="pie-chart" size={22} color={ui.black} />
        </div>
        <div style={{ color: ui.muted, marginTop: 10, fontSize: t.bodySize ?? 14 }}>
          No data available
        </div>
      </figure>
    );
  }

  let a0 = -Math.PI / 2;
  const wedges = safeData.map((v, i) => {
    const a1 = a0 + (v / total) * Math.PI * 2;
    const midAngle = (a0 + a1) / 2;
    const x0 = cx + r * Math.cos(a0),
      y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1),
      y1 = cy + r * Math.sin(a1);
    const ix0 = cx + innerR * Math.cos(a0),
      iy0 = cy + innerR * Math.sin(a0);
    const ix1 = cx + innerR * Math.cos(a1),
      iy1 = cy + innerR * Math.sin(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const d = `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix0} ${iy0} Z`;
    const w = {
      d,
      fill: PIE_COLORS[i % PIE_COLORS.length],
      percentage: ((v / total) * 100).toFixed(1),
      value: v,
      midAngle,
    };
    a0 = a1;
    return w;
  });

  return (
    <figure
      style={{
        border: `1px solid ${border}`,
        borderRadius: radius,
        padding: t.spacing ?? 14,
        color: fg,
        background: bg,
        fontFamily: t.fontFamily,
        width: 'fit-content',
        margin: 0,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
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
            <Icon name="pie-chart" size={16} color={ui.black} />
          </div>
          {title}
        </figcaption>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width={width} height={height} style={{ display: 'block' }}>
          {wedges.map((w, i) => {
            const isH = hoveredIndex === i;
            const tx = (isH ? 6 : 0) * Math.cos(w.midAngle);
            const ty = (isH ? 6 : 0) * Math.sin(w.midAngle);
            return (
              <path
                key={i}
                d={w.d}
                fill={w.fill}
                stroke={bg}
                strokeWidth={2}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 200ms ease, filter 200ms ease, opacity 200ms ease',
                  transform: `translate(${tx}px, ${ty}px)`,
                  filter: isH ? 'drop-shadow(0 4px 10px rgba(9, 9, 11, 0.16))' : 'none',
                  opacity: hoveredIndex === null || isH ? 1 : 0.72,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
          <text
            x={cx}
            y={cy - 8}
            fontSize={24}
            fill={ui.black}
            textAnchor="middle"
            fontWeight={800}
          >
            {hoveredIndex !== null ? wedges[hoveredIndex].value : total}
          </text>
          <text
            x={cx}
            y={cy + 14}
            fontSize={12}
            fill={ui.muted}
            textAnchor="middle"
            fontWeight={500}
          >
            {hoveredIndex !== null ? `${wedges[hoveredIndex].percentage}%` : 'Total'}
          </text>
        </svg>

        {labels.length === safeData.length && (
          <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
            {labels.map((lb, i) => {
              const isH = hoveredIndex === i;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: isH ? ui.surfaceHover : 'transparent',
                    border: `1px solid ${isH ? ui.border : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    color: ui.text,
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      background: PIE_COLORS[i % PIE_COLORS.length],
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: isH ? ui.black : ui.muted }}>{lb}</span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontWeight: 700,
                      color: isH ? ui.black : ui.muted,
                    }}
                  >
                    {wedges[i]?.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </figure>
  );
}
