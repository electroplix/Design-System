'use client';
import type React from 'react';
import { useId } from 'react';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';

/* ── Sparkline ──────────────────────────────────────────── */

export interface SparklineProps extends React.ComponentPropsWithoutRef<'div'> {
  data: number[];
  width?: number;
  height?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  success: '#16a34a',
  danger: '#dc2626',
};

export function Sparkline({
  data = [],
  width = 160,
  height = 48,
  style = {},
  className = '',
  ...rest
}: SparklineProps) {
  const t = useDataDisplayTheme();
  const uid = useId();
  const fg = t.textColor ?? ui.text;
  const bg = t.bgColor ?? ui.white;
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ui.muted,
          background: ui.surface,
          border: `1px solid ${ui.border}`,
          borderRadius: 10,
          ...style,
        }}
        className={className}
        {...rest}
      >
        <Icon name="activity" size={18} color={ui.muted} />
      </div>
    );
  }

  const max = Math.max(1, ...safeData);
  const min = Math.min(0, ...safeData);
  const range = max - min || 1;
  const pad = 4;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const points = safeData.map((v, i) => ({
    x: pad + (i / (safeData.length - 1 || 1)) * innerW,
    y: pad + (1 - (v - min) / range) * innerH,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - pad} L ${points[0].x} ${height - pad} Z`;

  const firstVal = safeData[0] ?? 0;
  const lastVal = safeData[safeData.length - 1] ?? 0;
  const trendUp = lastVal >= firstVal;
  const trendColor = trendUp ? ui.success : ui.danger;

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', ...style }}
      className={className}
      {...rest}
    >
      <svg width={width} height={height} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`epx-sparkG-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={trendColor} stopOpacity={0.14} />
            <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#epx-sparkG-${uid})`} />
        <path
          d={pathD}
          fill="none"
          stroke={trendColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={3}
          fill={bg}
          stroke={trendColor}
          strokeWidth={2}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 2,
          right: 2,
          fontSize: 10,
          fontWeight: 700,
          color: fg,
          fontFamily: t.fontFamily,
          background: bg,
          border: `1px solid ${ui.border}`,
          borderRadius: 999,
          padding: '1px 5px',
          lineHeight: 1.4,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        {trendUp ? '↑' : '↓'} {lastVal}
      </div>
    </div>
  );
}
