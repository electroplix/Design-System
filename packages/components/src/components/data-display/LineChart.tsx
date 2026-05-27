'use client';
import { useId, useState } from 'react';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';

/* ── LineChart ──────────────────────────────────────────── */

export interface LineChartProps {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  padding?: number;
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
  grid: '#f4f4f5',
};

export function LineChart({
  data = [],
  labels = [],
  width = 520,
  height = 260,
  title,
  showGrid = true,
  padding = 32,
}: LineChartProps) {
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
  const min = Math.min(0, ...safeData);
  const range = max - min || 1;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2 - 30;

  if (safeData.length === 0) {
    return (
      <figure
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
          <Icon name="trending-up" size={22} color={ui.black} />
        </div>
        <div style={{ color: ui.muted, marginTop: 10, fontSize: t.bodySize ?? 14 }}>
          No data available
        </div>
      </figure>
    );
  }

  const points = safeData.map((v, i) => ({
    x: padding + (i / (safeData.length - 1 || 1)) * innerW,
    y: padding + (1 - (v - min) / range) * innerH,
    value: v,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding + innerH} L ${points[0].x} ${padding + innerH} Z`;

  return (
    <figure
      style={{
        border: `1px solid ${border}`,
        borderRadius: r,
        padding: t.spacing ?? 14,
        color: fg,
        background: bg,
        fontFamily: t.fontFamily,
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
            <Icon name="trending-up" size={16} color={accent} />
          </div>
          {title}
        </figcaption>
      )}

      <svg width={width} height={height} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`epx-lineG-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
          <linearGradient id={`epx-areaG-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity={0.16} />
            <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
        </defs>

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
                {Math.round(min + range * g)}
              </text>
            </g>
          ))}

        <path d={areaD} fill={`url(#epx-areaG-${uid})`} />
        <path
          d={pathD}
          fill="none"
          stroke={`url(#epx-lineG-${uid})`}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => {
          const isH = hoveredIndex === i;
          return (
            <g key={i}>
              {isH && (
                <>
                  <line
                    x1={p.x}
                    y1={padding}
                    x2={p.x}
                    y2={padding + innerH}
                    stroke={ui.border}
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                  <circle cx={p.x} cy={p.y} r={12} fill={ui.surface} stroke={ui.border} />
                </>
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={isH ? 6 : 4}
                fill={bg}
                stroke={accent}
                strokeWidth={2}
                style={{ cursor: 'pointer', transition: 'r 150ms ease' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {isH && (
                <g>
                  <rect x={p.x - 24} y={p.y - 32} width={48} height={22} rx={6} fill={ui.black} />
                  <text
                    x={p.x}
                    y={p.y - 17}
                    fontSize={12}
                    fill={ui.white}
                    textAnchor="middle"
                    fontWeight={600}
                  >
                    {p.value}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {labels.length === safeData.length &&
          labels.map((lb, i) => (
            <text
              key={i}
              x={padding + (i / (safeData.length - 1 || 1)) * innerW}
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
