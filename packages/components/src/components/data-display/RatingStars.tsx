'use client';
import React, { useState, useId } from 'react';
import { useDataDisplayTheme } from '../../core/provider';

/* ── Star (internal) ────────────────────────────────────── */

interface StarProps {
  fill: 'full' | 'half' | 'empty';
  index: number;
  size: number;
  interactive: boolean;
  gridColor: string;
  onHover: (index: number) => void;
  onLeave: () => void;
  onClick: (index: number) => void;
  uid: string;
}

const STAR_PATH =
  'M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.167L12 18.896l-7.336 3.867 1.402-8.167L.132 9.21l8.2-1.192z';

const ui = {
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  star: '#f59e0b',
};

function Star({
  fill,
  index,
  size,
  interactive,
  gridColor,
  onHover,
  onLeave,
  onClick,
  uid,
}: StarProps) {
  const [starH, setStarH] = useState(false);
  const fillColor = fill === 'empty' ? gridColor : ui.star;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        display: 'inline-block',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'transform 150ms ease, opacity 150ms ease',
        transform: starH ? 'scale(1.08)' : 'scale(1)',
        opacity: fill === 'empty' ? 0.75 : 1,
      }}
      onMouseEnter={() => {
        if (interactive) {
          setStarH(true);
          onHover(index + 1);
        }
      }}
      onMouseLeave={() => {
        if (interactive) setStarH(false);
        onLeave();
      }}
      onClick={() => {
        if (interactive) onClick(index + 1);
      }}
    >
      {fill === 'half' ? (
        <>
          <path d={STAR_PATH} fill={gridColor} />
          <clipPath id={`epx-half-${uid}-${index}`}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
          <path d={STAR_PATH} fill={fillColor} clipPath={`url(#epx-half-${uid}-${index})`} />
        </>
      ) : (
        <path d={STAR_PATH} fill={fillColor} />
      )}
    </svg>
  );
}

/* ── RatingStars ────────────────────────────────────────── */

export interface RatingStarsProps {
  value: number;
  outOf?: number;
  size?: number;
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

export function RatingStars({
  value = 0,
  outOf = 5,
  size = 20,
  showValue = true,
  interactive = false,
  onChange,
}: RatingStarsProps) {
  const t = useDataDisplayTheme();
  const fg = t.textColor ?? ui.text;
  const grid = t.gridColor ?? ui.border;
  const uid = useId();
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const displayValue = hoverValue !== null ? hoverValue : safeValue;
  const full = Math.floor(displayValue);
  const half = displayValue - full >= 0.5;
  const empty = Math.max(0, outOf - full - (half ? 1 : 0));

  const handleHover = (v: number) => setHoverValue(v);
  const handleLeave = () => {};
  const handleClick = (v: number) => onChange?.(v);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: t.fontFamily,
      }}
      onMouseLeave={() => setHoverValue(null)}
    >
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: full }).map((_, i) => (
          <Star
            key={`f-${i}`}
            fill="full"
            index={i}
            size={size}
            interactive={interactive}
            gridColor={grid}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
            uid={uid}
          />
        ))}
        {half && (
          <Star
            fill="half"
            index={full}
            size={size}
            interactive={interactive}
            gridColor={grid}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
            uid={uid}
          />
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star
            key={`e-${i}`}
            fill="empty"
            index={full + (half ? 1 : 0) + i}
            size={size}
            interactive={interactive}
            gridColor={grid}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
            uid={uid}
          />
        ))}
      </div>

      {showValue && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: size * 0.8, fontWeight: 700, color: fg }}>
            {safeValue.toFixed(1)}
          </span>
          <span style={{ fontSize: size * 0.6, color: ui.muted }}>/ {outOf}</span>
        </div>
      )}
    </div>
  );
}
