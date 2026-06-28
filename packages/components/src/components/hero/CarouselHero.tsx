'use client';

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../../core/icons';
import { useHeroTheme } from '../../core/provider';
import { useMediaQuery } from '../../core/utils';

export type Slide = {
  image: string;
  title?: string;
  subtitle?: string;
};

export interface CarouselHeroProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;
  slides?: Slide[];
  autoplay?: boolean;
  intervalMs?: number;
  titleSize?: number;
  subtitleSize?: number;
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
  gap?: number;
}

const ui = {
  white: '#ffffff',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  overlay: 'rgba(9,9,11,0.72)',
};

export function CarouselHero(props: CarouselHeroProps) {
  const t = useHeroTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const {
    as: Tag = 'section',
    slides: rawSlides,
    autoplay = true,
    intervalMs = 4000,
    titleSize = 42,
    subtitleSize = 18,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? '70vh',
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 48,
    radius = t.cardRadius ?? 20,
    gap = t.gap ?? 24,
    style = {},
    className = '',
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? '#ffffff';
  const fg = textColor ?? t.textColor ?? '#18181b';
  const accent = accentColor ?? t.accentColor ?? '#09090b';
  const border = borderColor ?? t.cardBorder ?? t.borderColor ?? '#e4e4e7';
  const rPx = isMobile ? 16 : px;
  const pyPx = isMobile ? 32 : py;
  const titlePx = isMobile ? Math.max(24, Math.floor(titleSize * 0.65)) : titleSize;
  const subPx = isMobile ? Math.max(14, Math.floor(subtitleSize * 0.85)) : subtitleSize;

  const slides =
    Array.isArray(rawSlides) && rawSlides.length > 0
      ? rawSlides
      : [
          { image: '', title: 'Welcome to Our Platform', subtitle: 'Discover amazing features' },
          { image: '', title: 'Built for Speed', subtitle: 'Lightning fast performance' },
          { image: '', title: 'Modern Design', subtitle: 'Beautiful and responsive' },
        ];

  const [idx, setIdx] = useState(0);
  const touchStart = useRef<number | null>(null);

  // Autoplay — paused on reduced motion
  useEffect(() => {
    if (!autoplay || slides.length <= 1 || prefersReducedMotion) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [autoplay, slides.length, intervalMs, prefersReducedMotion]);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  );
  const next = useCallback(() => setIdx((i) => (i + 1) % slides.length), [slides.length]);

  // Touch swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
      touchStart.current = null;
    },
    [next, prev],
  );

  const current = slides[idx] || { image: '', title: '', subtitle: '' };

  return (
    <Tag
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
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
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(250,250,250,0.7), rgba(255,255,255,0))',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: maxW,
          display: 'grid',
          gap,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Carousel viewport */}
        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${idx + 1} of ${slides.length}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            height: isMobile ? 240 : 400,
            borderRadius: 16,
            overflow: 'hidden',
            background: ui.surface,
            border: `1px solid ${border}`,
            boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
          }}
        >
          {current.image ? (
            <img
              src={current.image}
              alt={current.title || `slide ${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: ui.surface,
                color: ui.muted,
              }}
            >
              <Icon
                name="image"
                size={isMobile ? 40 : 64}
                color={ui.muted}
                style={{ opacity: 0.55 }}
              />
              <span style={{ marginTop: 12, color: ui.muted, fontSize: 14, fontWeight: 500 }}>
                Slide {idx + 1}
              </span>
            </div>
          )}

          {/* Nav arrows — hidden on mobile */}
          {slides.length > 1 && !isMobile && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: ui.overlay,
                  color: ui.white,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(9,9,11,0.16)',
                  transition: prefersReducedMotion ? 'none' : 'all 0.2s ease',
                }}
              >
                <Icon name="chevron-left" size={24} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                style={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: ui.overlay,
                  color: ui.white,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(9,9,11,0.16)',
                  transition: prefersReducedMotion ? 'none' : 'all 0.2s ease',
                }}
              >
                <Icon name="chevron-right" size={24} />
              </button>
            </>
          )}
        </div>

        {/* Slide text */}
        <div style={{ textAlign: 'center' }}>
          {current.title && (
            <h2
              style={{
                fontSize: titlePx,
                margin: 0,
                fontWeight: 700,
                color: fg,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              {current.title}
            </h2>
          )}

          {current.subtitle && (
            <p
              style={{
                fontSize: subPx,
                color: ui.muted,
                marginTop: isMobile ? 8 : 12,
                marginBottom: 0,
                lineHeight: 1.6,
              }}
            >
              {current.subtitle}
            </p>
          )}
        </div>

        {/* Dots */}
        {slides.length > 1 && (
          <div
            role="tablist"
            aria-label="Slide navigation"
            style={{
              display: 'flex',
              gap: isMobile ? 6 : 10,
              justifyContent: 'center',
            }}
          >
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? (isMobile ? 24 : 32) : isMobile ? 8 : 10,
                  height: 10,
                  borderRadius: 999,
                  border: `1px solid ${i === idx ? accent : border}`,
                  background: i === idx ? accent : ui.white,
                  cursor: 'pointer',
                  transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
                  boxShadow:
                    i === idx ? '0 1px 2px rgba(9,9,11,0.12)' : '0 1px 2px rgba(9,9,11,0.04)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Tag>
  );
}
