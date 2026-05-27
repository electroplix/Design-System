'use client';
/* ------------------------------------------------------------------ */
/*  Icon — zero-dependency inline SVG icon registry                   */
/*  Replaces lucide-react for bundle-safe, RSC-compatible icons       */
/* ------------------------------------------------------------------ */

import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon name from the registry */
  name: IconName;
  /** Size in pixels (default 20) */
  size?: number;
  /** Stroke / fill color (default "currentColor") */
  color?: string;
}

/**
 * Render an inline SVG icon by name.
 *
 * @example
 * ```tsx
 * <Icon name="search" size={18} />
 * ```
 */
export function Icon({ name, size = 20, color = 'currentColor', style, ...rest }: IconProps) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Path registry — grouped alphabetically                            */
/* ------------------------------------------------------------------ */

const p = React.createElement;
type E = React.ReactNode;

const ICON_PATHS: Record<string, E> = {
  activity: p('polyline', { key: 'a', points: '22 12 18 12 15 21 9 3 6 12 2 12' }),
  'alert-circle': p(
    React.Fragment,
    { key: 'ac' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('line', { key: 'l1', x1: 12, y1: 8, x2: 12, y2: 12 }),
    p('line', { key: 'l2', x1: 12, y1: 16, x2: 12.01, y2: 16 }),
  ),
  'alert-triangle': p(
    React.Fragment,
    { key: 'at' },
    p('path', {
      key: 'p',
      d: 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    }),
    p('line', { key: 'l1', x1: 12, y1: 9, x2: 12, y2: 13 }),
    p('line', { key: 'l2', x1: 12, y1: 17, x2: 12.01, y2: 17 }),
  ),
  'align-left': p(
    React.Fragment,
    { key: 'al' },
    p('line', { key: 'l1', x1: 17, y1: 10, x2: 3, y2: 10 }),
    p('line', { key: 'l2', x1: 21, y1: 6, x2: 3, y2: 6 }),
    p('line', { key: 'l3', x1: 21, y1: 14, x2: 3, y2: 14 }),
    p('line', { key: 'l4', x1: 17, y1: 18, x2: 3, y2: 18 }),
  ),
  'arrow-left': p(
    React.Fragment,
    { key: 'arl' },
    p('line', { key: 'l', x1: 19, y1: 12, x2: 5, y2: 12 }),
    p('polyline', { key: 'pl', points: '12 19 5 12 12 5' }),
  ),
  'arrow-right': p(
    React.Fragment,
    { key: 'arr' },
    p('line', { key: 'l', x1: 5, y1: 12, x2: 19, y2: 12 }),
    p('polyline', { key: 'pl', points: '12 5 19 12 12 19' }),
  ),
  'arrow-up-right': p(
    React.Fragment,
    { key: 'aur' },
    p('line', { key: 'l', x1: 7, y1: 17, x2: 17, y2: 7 }),
    p('polyline', { key: 'pl', points: '7 7 17 7 17 17' }),
  ),
  award: p(
    React.Fragment,
    { key: 'aw' },
    p('circle', { key: 'c', cx: 12, cy: 8, r: 7 }),
    p('polyline', { key: 'p1', points: '8.21 13.89 7 23 12 20 17 23 15.79 13.88' }),
  ),
  'bar-chart': p(
    React.Fragment,
    { key: 'bch' },
    p('line', { key: 'l1', x1: 12, y1: 20, x2: 12, y2: 10 }),
    p('line', { key: 'l2', x1: 18, y1: 20, x2: 18, y2: 4 }),
    p('line', { key: 'l3', x1: 6, y1: 20, x2: 6, y2: 16 }),
  ),
  'bar-chart-3': p(
    React.Fragment,
    { key: 'bc' },
    p('line', { key: 'l1', x1: 18, y1: 20, x2: 18, y2: 10 }),
    p('line', { key: 'l2', x1: 12, y1: 20, x2: 12, y2: 4 }),
    p('line', { key: 'l3', x1: 6, y1: 20, x2: 6, y2: 14 }),
  ),
  bell: p(
    React.Fragment,
    { key: 'be' },
    p('path', { key: 'p', d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
    p('path', { key: 'p2', d: 'M13.73 21a2 2 0 0 1-3.46 0' }),
  ),
  bot: p(
    React.Fragment,
    { key: 'bo' },
    p('rect', { key: 'r', x: 3, y: 11, width: 18, height: 10, rx: 2 }),
    p('circle', { key: 'c1', cx: 9, cy: 16, r: 1 }),
    p('circle', { key: 'c2', cx: 15, cy: 16, r: 1 }),
    p('path', { key: 'p', d: 'M12 2v5' }),
    p('path', { key: 'p2', d: 'M2 16h2' }),
    p('path', { key: 'p3', d: 'M20 16h2' }),
  ),
  'building-2': p(
    React.Fragment,
    { key: 'b2' },
    p('path', { key: 'p', d: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z' }),
    p('path', { key: 'p2', d: 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2' }),
    p('path', { key: 'p3', d: 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2' }),
    p('path', { key: 'p4', d: 'M10 6h4' }),
    p('path', { key: 'p5', d: 'M10 10h4' }),
    p('path', { key: 'p6', d: 'M10 14h4' }),
    p('path', { key: 'p7', d: 'M10 18h4' }),
  ),
  calendar: p(
    React.Fragment,
    { key: 'ca' },
    p('rect', { key: 'r', x: 3, y: 4, width: 18, height: 18, rx: 2, ry: 2 }),
    p('line', { key: 'l1', x1: 16, y1: 2, x2: 16, y2: 6 }),
    p('line', { key: 'l2', x1: 8, y1: 2, x2: 8, y2: 6 }),
    p('line', { key: 'l3', x1: 3, y1: 10, x2: 21, y2: 10 }),
  ),
  camera: p(
    React.Fragment,
    { key: 'cam' },
    p('path', {
      key: 'p',
      d: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z',
    }),
    p('circle', { key: 'c', cx: 12, cy: 13, r: 4 }),
  ),
  check: p('polyline', { key: 'ck', points: '20 6 9 17 4 12' }),
  'check-circle': p(
    React.Fragment,
    { key: 'cc' },
    p('path', { key: 'p', d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
    p('polyline', { key: 'pl', points: '22 4 12 14.01 9 11.01' }),
  ),
  'check-circle-2': p(
    React.Fragment,
    { key: 'cc2' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('path', { key: 'p', d: 'm9 12 2 2 4-4' }),
  ),
  'chevron-down': p('polyline', { key: 'cd', points: '6 9 12 15 18 9' }),
  'chevron-left': p('polyline', { key: 'cl', points: '15 18 9 12 15 6' }),
  'chevron-right': p('polyline', { key: 'cr', points: '9 18 15 12 9 6' }),
  'chevron-up': p('polyline', { key: 'cu', points: '18 15 12 9 6 15' }),
  'chevrons-left': p(
    React.Fragment,
    { key: 'csl' },
    p('polyline', { key: 'p1', points: '11 17 6 12 11 7' }),
    p('polyline', { key: 'p2', points: '18 17 13 12 18 7' }),
  ),
  'chevrons-right': p(
    React.Fragment,
    { key: 'csr' },
    p('polyline', { key: 'p1', points: '13 17 18 12 13 7' }),
    p('polyline', { key: 'p2', points: '6 17 11 12 6 7' }),
  ),
  circle: p('circle', { key: 'ci', cx: 12, cy: 12, r: 10 }),
  'circle-dot': p(
    React.Fragment,
    { key: 'cdo' },
    p('circle', { key: 'c1', cx: 12, cy: 12, r: 10 }),
    p('circle', { key: 'c2', cx: 12, cy: 12, r: 1 }),
  ),
  clipboard: p(
    React.Fragment,
    { key: 'clb' },
    p('path', {
      key: 'p',
      d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
    }),
    p('rect', { key: 'r', x: 8, y: 2, width: 8, height: 4, rx: 1, ry: 1 }),
  ),
  clock: p(
    React.Fragment,
    { key: 'clk' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('polyline', { key: 'pl', points: '12 6 12 12 16 14' }),
  ),
  code: p(
    React.Fragment,
    { key: 'cd' },
    p('polyline', { key: 'pl1', points: '16 18 22 12 16 6' }),
    p('polyline', { key: 'pl2', points: '8 6 2 12 8 18' }),
  ),
  command: p('path', {
    key: 'cmd',
    d: 'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
  }),
  cookie: p(
    React.Fragment,
    { key: 'co' },
    p('path', { key: 'p', d: 'M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5' }),
    p('path', { key: 'p2', d: 'M8.5 8.5v.01' }),
    p('path', { key: 'p3', d: 'M16 15.5v.01' }),
    p('path', { key: 'p4', d: 'M12 12v.01' }),
    p('path', { key: 'p5', d: 'M11 17v.01' }),
    p('path', { key: 'p6', d: 'M7 14v.01' }),
  ),
  copy: p(
    React.Fragment,
    { key: 'cp' },
    p('rect', { key: 'r1', x: 9, y: 9, width: 13, height: 13, rx: 2, ry: 2 }),
    p('path', { key: 'p', d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
  ),
  'corner-down-left': p(
    React.Fragment,
    { key: 'cdl' },
    p('polyline', { key: 'pl', points: '9 10 4 15 9 20' }),
    p('path', { key: 'p', d: 'M20 4v7a4 4 0 0 1-4 4H4' }),
  ),
  'credit-card': p(
    React.Fragment,
    { key: 'crc' },
    p('rect', { key: 'r', x: 1, y: 4, width: 22, height: 16, rx: 2, ry: 2 }),
    p('line', { key: 'l', x1: 1, y1: 10, x2: 23, y2: 10 }),
  ),
  download: p(
    React.Fragment,
    { key: 'dl' },
    p('path', { key: 'p', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    p('polyline', { key: 'pl', points: '7 10 12 15 17 10' }),
    p('line', { key: 'l', x1: 12, y1: 15, x2: 12, y2: 3 }),
  ),
  'edit-2': p(
    React.Fragment,
    { key: 'e2' },
    p('path', { key: 'p', d: 'M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' }),
  ),
  'external-link': p(
    React.Fragment,
    { key: 'el' },
    p('path', { key: 'p', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
    p('polyline', { key: 'pl', points: '15 3 21 3 21 9' }),
    p('line', { key: 'l', x1: 10, y1: 14, x2: 21, y2: 3 }),
  ),
  eye: p(
    React.Fragment,
    { key: 'ey' },
    p('path', { key: 'p', d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
    p('circle', { key: 'c', cx: 12, cy: 12, r: 3 }),
  ),
  'eye-off': p(
    React.Fragment,
    { key: 'eo' },
    p('path', {
      key: 'p',
      d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24',
    }),
    p('line', { key: 'l', x1: 1, y1: 1, x2: 23, y2: 23 }),
  ),
  file: p(
    React.Fragment,
    { key: 'fi' },
    p('path', { key: 'p', d: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' }),
    p('polyline', { key: 'pl', points: '13 2 13 9 20 9' }),
  ),
  'file-code': p(
    React.Fragment,
    { key: 'fc' },
    p('path', { key: 'p', d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    p('polyline', { key: 'pl', points: '14 2 14 8 20 8' }),
    p('path', { key: 'p2', d: 'm10 13-2 2 2 2' }),
    p('path', { key: 'p3', d: 'm14 17 2-2-2-2' }),
  ),
  'file-down': p(
    React.Fragment,
    { key: 'fd' },
    p('path', { key: 'p', d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    p('polyline', { key: 'pl', points: '14 2 14 8 20 8' }),
    p('path', { key: 'p2', d: 'M12 18v-6' }),
    p('path', { key: 'p3', d: 'm9 15 3 3 3-3' }),
  ),
  'file-text': p(
    React.Fragment,
    { key: 'ft' },
    p('path', { key: 'p', d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    p('polyline', { key: 'pl', points: '14 2 14 8 20 8' }),
    p('line', { key: 'l1', x1: 16, y1: 13, x2: 8, y2: 13 }),
    p('line', { key: 'l2', x1: 16, y1: 17, x2: 8, y2: 17 }),
    p('polyline', { key: 'pl2', points: '10 9 9 9 8 9' }),
  ),
  filter: p('polygon', { key: 'fl', points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' }),
  gift: p(
    React.Fragment,
    { key: 'gi' },
    p('polyline', { key: 'p1', points: '20 12 20 22 4 22 4 12' }),
    p('rect', { key: 'r', x: 2, y: 7, width: 20, height: 5 }),
    p('line', { key: 'l', x1: 12, y1: 22, x2: 12, y2: 7 }),
    p('path', { key: 'p', d: 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' }),
    p('path', { key: 'p2', d: 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' }),
  ),
  github: p('path', {
    key: 'gh',
    d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  }),
  globe: p(
    React.Fragment,
    { key: 'gl' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('line', { key: 'l', x1: 2, y1: 12, x2: 22, y2: 12 }),
    p('path', {
      key: 'p',
      d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
    }),
  ),
  'grid-3x3': p(
    React.Fragment,
    { key: 'g3' },
    p('rect', { key: 'r', x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 }),
    p('line', { key: 'l1', x1: 3, y1: 9, x2: 21, y2: 9 }),
    p('line', { key: 'l2', x1: 3, y1: 15, x2: 21, y2: 15 }),
    p('line', { key: 'l3', x1: 9, y1: 3, x2: 9, y2: 21 }),
    p('line', { key: 'l4', x1: 15, y1: 3, x2: 15, y2: 21 }),
  ),
  heart: p('path', {
    key: 'h',
    d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  }),
  'help-circle': p(
    React.Fragment,
    { key: 'hc' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('path', { key: 'p', d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
    p('line', { key: 'l', x1: 12, y1: 17, x2: 12.01, y2: 17 }),
  ),
  headphones: p(
    React.Fragment,
    { key: 'hp' },
    p('path', { key: 'p', d: 'M3 18v-6a9 9 0 0 1 18 0v6' }),
    p('path', {
      key: 'p2',
      d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
    }),
  ),
  home: p(
    React.Fragment,
    { key: 'ho' },
    p('path', { key: 'p', d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    p('polyline', { key: 'pl', points: '9 22 9 12 15 12 15 22' }),
  ),
  image: p(
    React.Fragment,
    { key: 'im' },
    p('rect', { key: 'r', x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 }),
    p('circle', { key: 'c', cx: 8.5, cy: 8.5, r: 1.5 }),
    p('polyline', { key: 'pl', points: '21 15 16 10 5 21' }),
  ),
  inbox: p(
    React.Fragment,
    { key: 'ib' },
    p('polyline', { key: 'pl', points: '22 12 16 12 14 15 10 15 8 12 2 12' }),
    p('path', {
      key: 'p',
      d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    }),
  ),
  info: p(
    React.Fragment,
    { key: 'in' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('line', { key: 'l1', x1: 12, y1: 16, x2: 12, y2: 12 }),
    p('line', { key: 'l2', x1: 12, y1: 8, x2: 12.01, y2: 8 }),
  ),
  'layout-grid': p(
    React.Fragment,
    { key: 'lg' },
    p('rect', { key: 'r1', x: 3, y: 3, width: 7, height: 7 }),
    p('rect', { key: 'r2', x: 14, y: 3, width: 7, height: 7 }),
    p('rect', { key: 'r3', x: 14, y: 14, width: 7, height: 7 }),
    p('rect', { key: 'r4', x: 3, y: 14, width: 7, height: 7 }),
  ),
  'link-2': p(
    React.Fragment,
    { key: 'l2' },
    p('path', {
      key: 'p1',
      d: 'M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3',
    }),
    p('line', { key: 'l', x1: 8, y1: 12, x2: 16, y2: 12 }),
  ),
  list: p(
    React.Fragment,
    { key: 'li' },
    p('line', { key: 'l1', x1: 8, y1: 6, x2: 21, y2: 6 }),
    p('line', { key: 'l2', x1: 8, y1: 12, x2: 21, y2: 12 }),
    p('line', { key: 'l3', x1: 8, y1: 18, x2: 21, y2: 18 }),
    p('line', { key: 'l4', x1: 3, y1: 6, x2: 3.01, y2: 6 }),
    p('line', { key: 'l5', x1: 3, y1: 12, x2: 3.01, y2: 12 }),
    p('line', { key: 'l6', x1: 3, y1: 18, x2: 3.01, y2: 18 }),
  ),
  'list-checks': p(
    React.Fragment,
    { key: 'lc' },
    p('path', { key: 'p1', d: 'm3 17 2 2 4-4' }),
    p('path', { key: 'p2', d: 'm3 7 2 2 4-4' }),
    p('path', { key: 'p3', d: 'M13 6h8' }),
    p('path', { key: 'p4', d: 'M13 12h8' }),
    p('path', { key: 'p5', d: 'M13 18h8' }),
  ),
  'loader-2': p('path', { key: 'lo', d: 'M21 12a9 9 0 1 1-6.219-8.56' }),
  lock: p(
    React.Fragment,
    { key: 'lk' },
    p('rect', { key: 'r', x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 }),
    p('path', { key: 'p', d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
  ),
  mail: p(
    React.Fragment,
    { key: 'ma' },
    p('path', {
      key: 'p',
      d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
    }),
    p('polyline', { key: 'pl', points: '22 6 12 13 2 6' }),
  ),
  'map-pin': p(
    React.Fragment,
    { key: 'mp' },
    p('path', { key: 'p', d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
    p('circle', { key: 'c', cx: 12, cy: 10, r: 3 }),
  ),
  menu: p(
    React.Fragment,
    { key: 'me' },
    p('line', { key: 'l1', x1: 3, y1: 12, x2: 21, y2: 12 }),
    p('line', { key: 'l2', x1: 3, y1: 6, x2: 21, y2: 6 }),
    p('line', { key: 'l3', x1: 3, y1: 18, x2: 21, y2: 18 }),
  ),
  'message-circle': p('path', {
    key: 'mc',
    d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  }),
  'message-square': p('path', {
    key: 'ms',
    d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  }),
  minus: p('line', { key: 'mi', x1: 5, y1: 12, x2: 19, y2: 12 }),
  moon: p('path', { key: 'mo', d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' }),
  'more-horizontal': p(
    React.Fragment,
    { key: 'mh' },
    p('circle', { key: 'c1', cx: 12, cy: 12, r: 1 }),
    p('circle', { key: 'c2', cx: 19, cy: 12, r: 1 }),
    p('circle', { key: 'c3', cx: 5, cy: 12, r: 1 }),
  ),
  'more-vertical': p(
    React.Fragment,
    { key: 'mv' },
    p('circle', { key: 'c1', cx: 12, cy: 12, r: 1 }),
    p('circle', { key: 'c2', cx: 12, cy: 5, r: 1 }),
    p('circle', { key: 'c3', cx: 12, cy: 19, r: 1 }),
  ),
  music: p(
    React.Fragment,
    { key: 'mu' },
    p('path', { key: 'p', d: 'M9 18V5l12-2v13' }),
    p('circle', { key: 'c1', cx: 6, cy: 18, r: 3 }),
    p('circle', { key: 'c2', cx: 18, cy: 16, r: 3 }),
  ),
  package: p(
    React.Fragment,
    { key: 'pk' },
    p('line', { key: 'l', x1: 16.5, y1: 9.4, x2: 7.5, y2: 4.21 }),
    p('path', {
      key: 'p',
      d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    }),
    p('polyline', { key: 'pl1', points: '3.27 6.96 12 12.01 20.73 6.96' }),
    p('line', { key: 'l2', x1: 12, y1: 22.08, x2: 12, y2: 12 }),
  ),
  palette: p(
    React.Fragment,
    { key: 'pa' },
    p('circle', { key: 'c', cx: 13.5, cy: 6.5, r: 0.5, fill: 'currentColor' }),
    p('circle', { key: 'c2', cx: 17.5, cy: 10.5, r: 0.5, fill: 'currentColor' }),
    p('circle', { key: 'c3', cx: 8.5, cy: 7.5, r: 0.5, fill: 'currentColor' }),
    p('circle', { key: 'c4', cx: 6.5, cy: 12, r: 0.5, fill: 'currentColor' }),
    p('path', {
      key: 'p',
      d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z',
    }),
  ),
  paperclip: p('path', {
    key: 'pc',
    d: 'm21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
  }),
  phone: p(
    React.Fragment,
    { key: 'ph' },
    p('path', {
      key: 'p',
      d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    }),
  ),
  'pie-chart': p(
    React.Fragment,
    { key: 'pie' },
    p('path', { key: 'p1', d: 'M21.21 15.89A10 10 0 1 1 8 2.83' }),
    p('path', { key: 'p2', d: 'M22 12A10 10 0 0 0 12 2v10z' }),
  ),
  play: p('polygon', { key: 'pl', points: '5 3 19 12 5 21 5 3' }),
  plus: p(
    React.Fragment,
    { key: 'pls' },
    p('line', { key: 'l1', x1: 12, y1: 5, x2: 12, y2: 19 }),
    p('line', { key: 'l2', x1: 5, y1: 12, x2: 19, y2: 12 }),
  ),
  printer: p(
    React.Fragment,
    { key: 'pr' },
    p('polyline', { key: 'pl1', points: '6 9 6 2 18 2 18 9' }),
    p('path', {
      key: 'p',
      d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
    }),
    p('rect', { key: 'r', x: 6, y: 14, width: 12, height: 8 }),
  ),
  quote: p(
    React.Fragment,
    { key: 'qu' },
    p('path', {
      key: 'p1',
      d: 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z',
    }),
    p('path', {
      key: 'p2',
      d: 'M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z',
    }),
  ),
  receipt: p(
    React.Fragment,
    { key: 'rc' },
    p('path', {
      key: 'p',
      d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
    }),
    p('path', { key: 'l1', d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' }),
    p('path', { key: 'l2', d: 'M12 17.5v-11' }),
  ),
  'refresh-cw': p(
    React.Fragment,
    { key: 'rw' },
    p('polyline', { key: 'pl1', points: '23 4 23 10 17 10' }),
    p('polyline', { key: 'pl2', points: '1 20 1 14 7 14' }),
    p('path', {
      key: 'p',
      d: 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    }),
  ),
  rocket: p(
    React.Fragment,
    { key: 'ro' },
    p('path', {
      key: 'p1',
      d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
    }),
    p('path', {
      key: 'p2',
      d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
    }),
    p('path', { key: 'p3', d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0' }),
    p('path', { key: 'p4', d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3' }),
  ),
  rss: p(
    React.Fragment,
    { key: 'rs' },
    p('path', { key: 'p1', d: 'M4 11a9 9 0 0 1 9 9' }),
    p('path', { key: 'p2', d: 'M4 4a16 16 0 0 1 16 16' }),
    p('circle', { key: 'c', cx: 5, cy: 19, r: 1 }),
  ),
  scale: p(
    React.Fragment,
    { key: 'sc' },
    p('path', { key: 'p', d: 'm16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z' }),
    p('path', { key: 'p2', d: 'm2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z' }),
    p('path', { key: 'p3', d: 'M7 21h10' }),
    p('path', { key: 'p4', d: 'M12 3v18' }),
    p('path', { key: 'p5', d: 'M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2' }),
  ),
  search: p(
    React.Fragment,
    { key: 'se' },
    p('circle', { key: 'c', cx: 11, cy: 11, r: 8 }),
    p('line', { key: 'l', x1: 21, y1: 21, x2: 16.65, y2: 16.65 }),
  ),
  'search-code': p(
    React.Fragment,
    { key: 'scd' },
    p('path', { key: 'p1', d: 'm9 9-2 2 2 2' }),
    p('path', { key: 'p2', d: 'm13 13 2-2-2-2' }),
    p('circle', { key: 'c', cx: 11, cy: 11, r: 8 }),
    p('path', { key: 'p3', d: 'm21 21-4.3-4.3' }),
  ),
  'search-x': p(
    React.Fragment,
    { key: 'sx' },
    p('path', { key: 'p', d: 'm13.5 8.5-5 5' }),
    p('path', { key: 'p2', d: 'm8.5 8.5 5 5' }),
    p('circle', { key: 'c', cx: 11, cy: 11, r: 8 }),
    p('path', { key: 'p3', d: 'm21 21-4.3-4.3' }),
  ),
  send: p(
    React.Fragment,
    { key: 'sn' },
    p('line', { key: 'l', x1: 22, y1: 2, x2: 11, y2: 13 }),
    p('polygon', { key: 'pg', points: '22 2 15 22 11 13 2 9 22 2' }),
  ),
  settings: p(
    React.Fragment,
    { key: 'set' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 3 }),
    p('path', {
      key: 'p',
      d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
    }),
  ),
  'share-2': p(
    React.Fragment,
    { key: 'sh' },
    p('circle', { key: 'c1', cx: 18, cy: 5, r: 3 }),
    p('circle', { key: 'c2', cx: 6, cy: 12, r: 3 }),
    p('circle', { key: 'c3', cx: 18, cy: 19, r: 3 }),
    p('line', { key: 'l1', x1: 8.59, y1: 13.51, x2: 15.42, y2: 17.49 }),
    p('line', { key: 'l2', x1: 15.41, y1: 6.51, x2: 8.59, y2: 10.49 }),
  ),
  shield: p('path', { key: 'shd', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
  'shield-check': p(
    React.Fragment,
    { key: 'shc' },
    p('path', { key: 'p', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
    p('path', { key: 'p2', d: 'm9 12 2 2 4-4' }),
  ),
  'shopping-bag': p(
    React.Fragment,
    { key: 'sb' },
    p('path', { key: 'p', d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' }),
    p('path', { key: 'p2', d: 'M3 6h18' }),
    p('path', { key: 'p3', d: 'M16 10a4 4 0 0 1-8 0' }),
  ),
  'shopping-cart': p(
    React.Fragment,
    { key: 'sct' },
    p('circle', { key: 'c1', cx: 9, cy: 21, r: 1 }),
    p('circle', { key: 'c2', cx: 20, cy: 21, r: 1 }),
    p('path', { key: 'p', d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' }),
  ),
  smartphone: p(
    React.Fragment,
    { key: 'sp' },
    p('rect', { key: 'r', x: 5, y: 2, width: 14, height: 20, rx: 2, ry: 2 }),
    p('line', { key: 'l', x1: 12, y1: 18, x2: 12.01, y2: 18 }),
  ),
  sparkles: p(
    React.Fragment,
    { key: 'spk' },
    p('path', {
      key: 'p1',
      d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z',
    }),
    p('path', { key: 'p2', d: 'M5 3v4' }),
    p('path', { key: 'p3', d: 'M19 17v4' }),
    p('path', { key: 'p4', d: 'M3 5h4' }),
    p('path', { key: 'p5', d: 'M17 19h4' }),
  ),
  star: p('polygon', {
    key: 'st',
    points:
      '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
  }),
  sun: p(
    React.Fragment,
    { key: 'su' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 5 }),
    p('line', { key: 'l1', x1: 12, y1: 1, x2: 12, y2: 3 }),
    p('line', { key: 'l2', x1: 12, y1: 21, x2: 12, y2: 23 }),
    p('line', { key: 'l3', x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
    p('line', { key: 'l4', x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }),
    p('line', { key: 'l5', x1: 1, y1: 12, x2: 3, y2: 12 }),
    p('line', { key: 'l6', x1: 21, y1: 12, x2: 23, y2: 12 }),
    p('line', { key: 'l7', x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }),
    p('line', { key: 'l8', x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }),
  ),
  table: p(
    React.Fragment,
    { key: 'ta' },
    p('rect', { key: 'r', x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 }),
    p('line', { key: 'l1', x1: 3, y1: 9, x2: 21, y2: 9 }),
    p('line', { key: 'l2', x1: 3, y1: 15, x2: 21, y2: 15 }),
    p('line', { key: 'l3', x1: 9, y1: 3, x2: 9, y2: 21 }),
  ),
  tag: p(
    React.Fragment,
    { key: 'tg' },
    p('path', {
      key: 'p',
      d: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
    }),
    p('line', { key: 'l', x1: 7, y1: 7, x2: 7.01, y2: 7 }),
  ),
  'toggle-left': p(
    React.Fragment,
    { key: 'tl' },
    p('rect', { key: 'r', x: 1, y: 5, width: 22, height: 14, rx: 7, ry: 7 }),
    p('circle', { key: 'c', cx: 8, cy: 12, r: 3 }),
  ),
  'toggle-right': p(
    React.Fragment,
    { key: 'tr' },
    p('rect', { key: 'r', x: 1, y: 5, width: 22, height: 14, rx: 7, ry: 7 }),
    p('circle', { key: 'c', cx: 16, cy: 12, r: 3 }),
  ),
  trash: p(
    React.Fragment,
    { key: 'tsh' },
    p('polyline', { key: 'pl', points: '3 6 5 6 21 6' }),
    p('path', {
      key: 'p',
      d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    }),
  ),
  'trash-2': p(
    React.Fragment,
    { key: 't2' },
    p('polyline', { key: 'pl', points: '3 6 5 6 21 6' }),
    p('path', {
      key: 'p',
      d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    }),
    p('line', { key: 'l1', x1: 10, y1: 11, x2: 10, y2: 17 }),
    p('line', { key: 'l2', x1: 14, y1: 11, x2: 14, y2: 17 }),
  ),
  'trending-down': p(
    React.Fragment,
    { key: 'td' },
    p('polyline', { key: 'pl', points: '23 18 13.5 8.5 8.5 13.5 1 6' }),
    p('polyline', { key: 'pl2', points: '17 18 23 18 23 12' }),
  ),
  'trending-up': p(
    React.Fragment,
    { key: 'tu' },
    p('polyline', { key: 'pl', points: '23 6 13.5 15.5 8.5 10.5 1 18' }),
    p('polyline', { key: 'pl2', points: '17 6 23 6 23 12' }),
  ),
  truck: p(
    React.Fragment,
    { key: 'trk' },
    p('rect', { key: 'r', x: 1, y: 3, width: 15, height: 13 }),
    p('polygon', { key: 'pg', points: '16 8 20 8 23 11 23 16 16 16 16 8' }),
    p('circle', { key: 'c1', cx: 5.5, cy: 18.5, r: 2.5 }),
    p('circle', { key: 'c2', cx: 18.5, cy: 18.5, r: 2.5 }),
  ),
  type: p(
    React.Fragment,
    { key: 'ty' },
    p('polyline', { key: 'pl', points: '4 7 4 4 20 4 20 7' }),
    p('line', { key: 'l1', x1: 9, y1: 20, x2: 15, y2: 20 }),
    p('line', { key: 'l2', x1: 12, y1: 4, x2: 12, y2: 20 }),
  ),
  upload: p(
    React.Fragment,
    { key: 'ul' },
    p('path', { key: 'p', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    p('polyline', { key: 'pl', points: '17 8 12 3 7 8' }),
    p('line', { key: 'l', x1: 12, y1: 3, x2: 12, y2: 15 }),
  ),
  user: p(
    React.Fragment,
    { key: 'us' },
    p('path', { key: 'p', d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    p('circle', { key: 'c', cx: 12, cy: 7, r: 4 }),
  ),
  'user-plus': p(
    React.Fragment,
    { key: 'up' },
    p('path', { key: 'p', d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
    p('circle', { key: 'c', cx: 8.5, cy: 7, r: 4 }),
    p('line', { key: 'l1', x1: 20, y1: 8, x2: 20, y2: 14 }),
    p('line', { key: 'l2', x1: 23, y1: 11, x2: 17, y2: 11 }),
  ),
  verified: p(
    React.Fragment,
    { key: 'vr' },
    p('path', {
      key: 'p',
      d: 'M12 2 L14.4 4.8 L18 4.2 L17.8 7.8 L20.8 9.6 L18.8 12 L20.8 14.4 L17.8 16.2 L18 19.8 L14.4 19.2 L12 22 L9.6 19.2 L6 19.8 L6.2 16.2 L3.2 14.4 L5.2 12 L3.2 9.6 L6.2 7.8 L6 4.2 L9.6 4.8Z',
    }),
    p('polyline', { key: 'pl', points: '9 12 11 14 15 10' }),
  ),
  'volume-2': p(
    React.Fragment,
    { key: 'v2' },
    p('polygon', { key: 'pg', points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
    p('path', { key: 'p1', d: 'M19.07 4.93a10 10 0 0 1 0 14.14' }),
    p('path', { key: 'p2', d: 'M15.54 8.46a5 5 0 0 1 0 7.07' }),
  ),
  wallet: p(
    React.Fragment,
    { key: 'wa' },
    p('path', { key: 'p1', d: 'M21 12V7H5a2 2 0 0 1 0-4h14v4' }),
    p('path', { key: 'p2', d: 'M3 5v14a2 2 0 0 0 2 2h16v-5' }),
    p('path', { key: 'p3', d: 'M18 12a2 2 0 0 0 0 4h4v-4Z' }),
  ),
  x: p(
    React.Fragment,
    { key: 'x' },
    p('line', { key: 'l1', x1: 18, y1: 6, x2: 6, y2: 18 }),
    p('line', { key: 'l2', x1: 6, y1: 6, x2: 18, y2: 18 }),
  ),
  'x-circle': p(
    React.Fragment,
    { key: 'xc' },
    p('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
    p('line', { key: 'l1', x1: 15, y1: 9, x2: 9, y2: 15 }),
    p('line', { key: 'l2', x1: 9, y1: 9, x2: 15, y2: 15 }),
  ),
  zap: p('polygon', { key: 'za', points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' }),
  'zoom-in': p(
    React.Fragment,
    { key: 'zi' },
    p('circle', { key: 'c', cx: 11, cy: 11, r: 8 }),
    p('line', { key: 'l1', x1: 21, y1: 21, x2: 16.65, y2: 16.65 }),
    p('line', { key: 'l2', x1: 11, y1: 8, x2: 11, y2: 14 }),
    p('line', { key: 'l3', x1: 8, y1: 11, x2: 14, y2: 11 }),
  ),
};

/* ------------------------------------------------------------------ */
/*  Exported icon name union type (auto-complete friendly)            */
/* ------------------------------------------------------------------ */

export type IconName = keyof typeof ICON_PATHS;

/** All registered icon names — useful for CLI / docs tooling. */
export const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];
