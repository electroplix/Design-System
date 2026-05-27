'use client';
import React, { useState, useEffect } from 'react';
import { useDataDisplayTheme } from '../../core/provider';
import { Icon } from '../../core/icons';

/* ── ProgressBar ────────────────────────────────────────── */

export interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  height?: number;
  rounded?: boolean;
  label?: string;
  showTrend?: boolean;
  previousValue?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#f4f4f5',
  success: '#16a34a',
  danger: '#dc2626',
};

export function ProgressBar({
  value = 0,
  showLabel = true,
  height = 12,
  rounded = true,
  label,
  showTrend = false,
  previousValue,
}: ProgressBarProps) {
  const t = useDataDisplayTheme();

  const accent = t.accentColor ?? ui.black;
  const fg = t.textColor ?? ui.text;
  const grid = t.gridColor ?? ui.surface;
  const r = t.radius ?? 14;
  const [animatedValue, setAnimatedValue] = useState(0);
  const safeValue =
    typeof value === 'number' && !isNaN(value) ? Math.max(0, Math.min(100, value)) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(safeValue), 100);
    return () => clearTimeout(timer);
  }, [safeValue]);

  const trend = previousValue !== undefined ? safeValue - previousValue : 0;
  const trendColor = trend > 0 ? ui.success : trend < 0 ? ui.danger : ui.muted;

  return (
    <div style={{ width: '100%', fontFamily: t.fontFamily }}>
      {(showLabel || label) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
            fontSize: t.bodySize ?? 14,
            color: fg,
          }}
        >
          <span style={{ fontWeight: 600, color: ui.text }}>{label || 'Progress'}</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {showTrend && previousValue !== undefined && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  color: trendColor,
                  fontWeight: 600,
                }}
              >
                <Icon
                  name={trend > 0 ? 'trending-up' : trend < 0 ? 'trending-down' : 'minus'}
                  size={14}
                  color={trendColor}
                />
                {Math.abs(trend).toFixed(1)}%
              </span>
            )}
            <span style={{ fontWeight: 700, color: accent }}>{safeValue.toFixed(0)}%</span>
          </div>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          background: grid,
          border: `1px solid ${ui.border}`,
          borderRadius: rounded ? 999 : r - 8,
          overflow: 'hidden',
          height,
          position: 'relative',
          boxShadow: 'inset 0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        <div
          style={{
            width: `${animatedValue}%`,
            background: accent,
            height: '100%',
            borderRadius: rounded ? 999 : r - 8,
            transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
              animation: 'epx-shimmer 2s infinite',
            }}
          />
        </div>

        {[25, 50, 75].map((mark) => (
          <div
            key={mark}
            style={{
              position: 'absolute',
              left: `${mark}%`,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(255,255,255,0.55)',
            }}
          />
        ))}
      </div>
      <style>{`@keyframes epx-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
    </div>
  );
}
