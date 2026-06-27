'use client';

import type React from 'react';
import { useHeroTheme } from '../../core/provider';
import { useMediaQuery } from '../../core/utils';

export interface VideoHeaderHeroProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;
  videoSrc?: string;
  poster?: string;
  overlay?: number;
  title?: string;
  subtitle?: string;
  titleSize?: number;
  subtitleSize?: number;
  controls?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  minH?: string | number;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  muted: '#d4d4d8',
  border: '#27272a',
};

export function VideoHeaderHero(props: VideoHeaderHeroProps) {
  const t = useHeroTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    as: Tag = 'section',
    videoSrc,
    poster,
    overlay = 0.5,
    title = 'See It in Action',
    subtitle = 'Watch how our platform transforms your workflow.',
    titleSize = 48,
    subtitleSize = 20,
    controls = false,
    loop = true,
    autoPlay = true,
    muted = true,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? '70vh',
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 64,
    radius = t.cardRadius ?? 20,
    style = {},
    className = '',
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.black;
  const fg = textColor ?? t.textColor ?? ui.white;
  const border = borderColor ?? t.cardBorder ?? t.borderColor ?? ui.border;
  const accent = accentColor ?? t.accentColor ?? ui.white;
  const rPx = isMobile ? 16 : px;
  const pyPx = isMobile ? 32 : py;
  const titlePx = isMobile ? Math.max(28, Math.floor(titleSize * 0.65)) : titleSize;
  const subPx = isMobile ? Math.max(14, Math.floor(subtitleSize * 0.85)) : subtitleSize;

  return (
    <Tag
      className={className}
      aria-label={title}
      style={{
        display: 'grid',
        placeItems: 'center',
        background: bg,
        color: fg,
        fontFamily,
        minHeight: typeof minH === 'number' ? `${minH}px` : minH,
        padding: `${pyPx}px ${rPx}px`,
        borderRadius: radius,
        border: `1px solid ${border}`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0,0,0,0.24)',
        ...style,
      }}
      {...rest}
    >
      {videoSrc && (
        <video
          playsInline
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          poster={poster}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={videoSrc} />
        </video>
      )}

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(9,9,11,${overlay * 0.7}), rgba(9,9,11,${overlay}))`,
          backdropFilter: 'blur(1px)',
          zIndex: 1,
        }}
      />

      {!isMobile && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 520,
            height: 520,
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.05)',
            filter: 'blur(90px)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: maxW,
          width: '100%',
        }}
      >
        {title && (
          <h2
            style={{
              fontSize: titlePx,
              margin: 0,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.05em',
              color: fg,
            }}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p
            style={{
              fontSize: subPx,
              color: ui.muted,
              marginTop: isMobile ? 12 : 20,
              marginBottom: 0,
              maxWidth: 640,
              marginInline: 'auto',
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}

        <div
          style={{
            width: 72,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            margin: `${isMobile ? 24 : 36}px auto 0`,
            opacity: 0.6,
          }}
        />
      </div>
    </Tag>
  );
}
