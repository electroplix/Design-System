'use client';

import type React from 'react';
import { Icon } from '../../core/icons';
import { useHeroTheme } from '../../core/provider';
import { useMediaQuery } from '../../core/utils';

export interface ImageHeroProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;

  // Content
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  titleSuffix?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;

  // Background image
  imageSrc?: string;
  imageAlt?: string;

  // Stats
  stats?: Array<{ value: string; label: string }>;

  // Layout
  layout?: 'split' | 'centered' | 'minimal';
  align?: 'left' | 'center' | 'right';

  // Typography
  titleSize?: number;
  subtitleSize?: number;

  // Theme overrides
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
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
};

export function ImageHero(props: ImageHeroProps) {
  const t = useHeroTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    as: Tag = 'section',
    eyebrow = 'Welcome',
    title = 'Build Something Amazing',
    titleAccent,
    titleSuffix,
    subtitle = 'Create beautiful, responsive interfaces with our modern component library.',
    ctaLabel = 'Get Started',
    ctaHref = '#',
    ctaSecondaryLabel,
    ctaSecondaryHref = '#',
    imageSrc,
    imageAlt = 'Hero image',
    stats,
    layout = 'split',
    align = 'left',
    titleSize = 48,
    subtitleSize = 18,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? '100vh',
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 48,
    radius = t.cardRadius ?? 0,
    gap = t.gap ?? 24,
    style = {},
    className = '',
    children,
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.black;
  const fg = textColor ?? t.textColor ?? ui.white;
  const accent = accentColor ?? t.accentColor ?? '#8B5CF6';

  // Responsive values
  const responsiveSubtitleSize = isMobile
    ? Math.max(14, Math.floor(subtitleSize * 0.85))
    : subtitleSize;

  const responsiveMinH = isMobile ? 'auto' : minH;
  const responsivePx = isMobile ? 16 : px;
  const responsivePy = isMobile ? 80 : py;

  // Overlay gradient for background image
  const overlayGradient = `linear-gradient(135deg, ${bg}f2 0%, ${bg}99 60%, ${accent}14 100%)`;

  // ── Minimal layout ──
  if (layout === 'minimal') {
    return (
      <Tag
        className={className}
        style={{
          position: 'relative',
          minHeight: responsiveMinH,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: bg,
          ...style,
        }}
        {...rest}
      >
        {/* Decorative geometric elements (hidden on mobile) */}
        {!isMobile && (
          <>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 80,
                right: 80,
                width: 160,
                height: 160,
                border: `2px solid ${accent}30`,
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: 128,
                left: 64,
                width: 96,
                height: 256,
                background: `${accent}10`,
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: '50%',
                right: '33%',
                width: 1,
                height: 160,
                background: accent,
              }}
            />
          </>
        )}

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: maxW,
            margin: '0 auto',
            padding: `${responsivePy}px ${responsivePx}px`,
          }}
        >
          <div style={{ maxWidth: 768 }}>
            {/* Eyebrow */}
            <span
              style={{
                color: accent,
                fontFamily,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 6,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>

            {/* Headline */}
            <h1
              style={{
                fontFamily,
                color: fg,
                fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: -1,
                textTransform: 'uppercase',
                marginTop: 16,
                overflowWrap: 'break-word',
              }}
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span style={{ color: accent }}>{titleAccent}</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  color: ui.muted,
                  fontFamily,
                  fontSize: responsiveSubtitleSize,
                  lineHeight: 1.8,
                  maxWidth: 400,
                  marginTop: isMobile ? 24 : 32,
                  marginBottom: isMobile ? 32 : 40,
                }}
              >
                {subtitle}
              </p>
            )}

            {/* CTA */}
            {ctaLabel && (
              <a
                href={ctaHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: `${isMobile ? 12 : 16}px ${isMobile ? 24 : 32}px`,
                  background: accent,
                  color: ui.white,
                  fontFamily,
                  fontWeight: 700,
                  fontSize: isMobile ? 14 : 16,
                  letterSpacing: 1,
                  borderRadius: radius,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {ctaLabel}
                <Icon name="arrow-right" size={18} />
              </a>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: isMobile ? 24 : 48,
                  marginTop: isMobile ? 40 : 64,
                }}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p
                      style={{
                        fontFamily,
                        color: accent,
                        fontSize: 'clamp(22px, 5vw, 28px)',
                        fontWeight: 400,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        color: ui.muted,
                        fontFamily,
                        fontSize: 10,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Tag>
    );
  }

  // ── Centered layout ──
  if (layout === 'centered') {
    return (
      <Tag
        className={className}
        style={{
          position: 'relative',
          minHeight: responsiveMinH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: bg,
          ...style,
        }}
        {...rest}
      >
        {/* Background image */}
        {imageSrc && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src={imageSrc}
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: overlayGradient,
              }}
            />
          </div>
        )}

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: isMobile ? '100%' : 800,
            margin: '0 auto',
            padding: `${responsivePy}px ${responsivePx}px`,
            textAlign: 'center',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div style={{ width: 48, height: 1, background: accent }} />
            <span
              style={{
                color: accent,
                fontFamily,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 4,
              }}
            >
              {eyebrow}
            </span>
            <div style={{ width: 48, height: 1, background: accent }} />
          </div>

          {/* Headline */}
          {title && (
            <h1
              style={{
                fontFamily,
                color: fg,
                fontSize: `clamp(${isMobile ? '2rem' : '2.5rem'}, 6vw, 5.5rem)`,
                lineHeight: 1.05,
                letterSpacing: -1,
                margin: 0,
              }}
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <em style={{ color: accent, fontStyle: 'italic' }}>{titleAccent}</em>
                </>
              )}
              {titleSuffix && ` ${titleSuffix}`}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              style={{
                fontFamily,
                color: 'rgba(255,255,255,0.7)',
                fontSize: responsiveSubtitleSize,
                lineHeight: 1.7,
                maxWidth: 520,
                margin: '20px auto 32px',
              }}
            >
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
            }}
          >
            {ctaLabel && (
              <a
                href={ctaHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: `${isMobile ? 12 : 16}px ${isMobile ? 24 : 32}px`,
                  background: accent,
                  color: ui.white,
                  fontFamily,
                  fontWeight: 700,
                  fontSize: isMobile ? 14 : 16,
                  letterSpacing: 1,
                  borderRadius: radius,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {ctaLabel}
                <Icon name="arrow-right" size={18} />
              </a>
            )}
            {ctaSecondaryLabel && (
              <a
                href={ctaSecondaryHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: `${isMobile ? 12 : 16}px ${isMobile ? 24 : 32}px`,
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: fg,
                  fontFamily,
                  fontWeight: 600,
                  fontSize: isMobile ? 14 : 16,
                  letterSpacing: 1,
                  borderRadius: radius,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {ctaSecondaryLabel}
              </a>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? 24 : 32,
                justifyContent: 'center',
                marginTop: isMobile ? 40 : 48,
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily,
                      color: accent,
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      marginTop: 4,
                    }}
                  >
                    {stat.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Tag>
    );
  }

  // ── Split layout (default) ──
  return (
    <Tag
      className={className}
      style={{
        position: 'relative',
        minHeight: responsiveMinH,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: bg,
        ...style,
      }}
      {...rest}
    >
      {/* Background image */}
      {imageSrc && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: overlayGradient,
            }}
          />
        </div>
      )}

      {/* Decorative vertical lines (hidden on mobile) */}
      {!isMobile && (
        <>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: 1,
              background: `linear-gradient(to bottom, transparent, ${accent}40, transparent)`,
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 1,
              background: `linear-gradient(to bottom, transparent, ${accent}40, transparent)`,
            }}
          />
        </>
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: maxW,
          margin: '0 auto',
          padding: `${responsivePy}px ${responsivePx}px`,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : gap,
          alignItems: 'center',
        }}
      >
        {/* Content */}
        <div style={{ direction: 'ltr' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: isMobile ? 24 : 32,
            }}
          >
            <div style={{ width: 48, height: 1, background: accent }} />
            <span
              style={{
                color: accent,
                fontFamily,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 4,
              }}
            >
              {eyebrow}
            </span>
            <div style={{ width: 48, height: 1, background: accent }} />
          </div>

          {/* Headline */}
          {title && (
            <h1
              style={{
                fontFamily,
                color: fg,
                fontSize: `clamp(${isMobile ? '2rem' : '3rem'}, 6vw, 5.5rem)`,
                lineHeight: 1.05,
                letterSpacing: -1,
                margin: 0,
              }}
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <em style={{ color: accent, fontStyle: 'italic' }}>{titleAccent}</em>
                </>
              )}
              {titleSuffix && ` ${titleSuffix}`}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              style={{
                fontFamily,
                color: 'rgba(255,255,255,0.7)',
                fontSize: responsiveSubtitleSize,
                lineHeight: 1.7,
                maxWidth: 480,
                marginTop: isMobile ? 20 : 24,
                marginBottom: isMobile ? 32 : 40,
              }}
            >
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            {ctaLabel && (
              <a
                href={ctaHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: `${isMobile ? 12 : 16}px ${isMobile ? 24 : 32}px`,
                  background: accent,
                  color: ui.white,
                  fontFamily,
                  fontWeight: 700,
                  fontSize: isMobile ? 14 : 16,
                  letterSpacing: 1,
                  borderRadius: radius,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {ctaLabel}
                <Icon name="arrow-right" size={18} />
              </a>
            )}
            {ctaSecondaryLabel && (
              <a
                href={ctaSecondaryHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: `${isMobile ? 12 : 16}px ${isMobile ? 24 : 32}px`,
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: fg,
                  fontFamily,
                  fontWeight: 600,
                  fontSize: isMobile ? 14 : 16,
                  letterSpacing: 1,
                  borderRadius: radius,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {ctaSecondaryLabel}
              </a>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? 24 : 32,
                marginTop: isMobile ? 40 : 48,
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily,
                      color: accent,
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily,
                      fontSize: 10,
                      letterSpacing: 1.5,
                      marginTop: 4,
                    }}
                  >
                    {stat.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image column (hidden on mobile) */}
        {!isMobile && imageSrc && (
          <div
            style={{
              position: 'relative',
              height: 580,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 288,
                height: 384,
                overflow: 'hidden',
                borderRadius: radius || 12,
                boxShadow: `0 0 60px ${accent}20`,
              }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        )}

        {children}
      </div>
    </Tag>
  );
}
