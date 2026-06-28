'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Icon } from '../../core/icons';
import { useNavTheme } from '../../core/provider';
import { useMediaQuery } from '../../core/utils';

export type NavLink = {
  label: string;
  href: string;
};

export interface PrimaryNavProps extends React.ComponentPropsWithoutRef<'header'> {
  logoText?: string;
  links?: NavLink[];
  showSearch?: boolean;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  sticky?: boolean;
  height?: number;
  padding?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function PrimaryNav({
  logoText = 'MyBrand',
  links = [],
  showSearch: showSearchProp,
  showCTA: showCTAProp,
  ctaText = 'Get Started',
  ctaHref = '#',
  sticky: stickyProp,
  height: heightProp,
  padding: paddingProp,
  bgColor: bgColorProp,
  textColor: textColorProp,
  accentColor: accentColorProp,
  borderColor: borderColorProp,
  fontFamily: fontFamilyProp,
  className,
  style,
  ...rest
}: PrimaryNavProps) {
  const t = useNavTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const showSearch = showSearchProp ?? t.showSearch ?? false;
  const showCTA = showCTAProp ?? t.showCTA ?? false;
  const sticky = stickyProp ?? t.sticky ?? false;
  const height = heightProp ?? t.height ?? 72;
  const padding = paddingProp ?? t.padding ?? 24;
  const bgColor = bgColorProp ?? t.bgColor ?? '#ffffff';
  const textColor = textColorProp ?? t.textColor ?? '#09090b';
  const accentColor = accentColorProp ?? t.accentColor ?? '#18181b';
  const borderColor = borderColorProp ?? t.borderColor ?? '#e4e4e7';
  const fontFamily = fontFamilyProp ?? t.fontFamily;

  const mutedColor = '#71717a';
  const surfaceColor = '#fafafa';
  const rPx = isMobile ? 16 : padding;

  return (
    <>
      <header
        className={className}
        style={{
          background: bgColor,
          backdropFilter: 'blur(12px)',
          color: textColor,
          fontFamily,
          height,
          paddingInline: rPx,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: sticky ? 'sticky' : 'relative',
          top: sticky ? 0 : 'auto',
          zIndex: sticky ? 40 : 'auto',
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          ...style,
        }}
        {...rest}
      >
        <a
          href="#"
          style={{
            fontWeight: 800,
            fontSize: isMobile ? 18 : 20,
            textDecoration: 'none',
            color: textColor,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {logoText}
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  color: mutedColor,
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = mutedColor;
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Desktop search */}
          {!isMobile && showSearch && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: surfaceColor,
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
              }}
            >
              <Icon name="search" size={16} color={mutedColor} />
              <input
                placeholder="Search…"
                aria-label="Search"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: textColor,
                  fontSize: 14,
                  width: 140,
                  fontFamily,
                }}
              />
            </div>
          )}

          {/* Desktop CTA */}
          {!isMobile && showCTA && (
            <a
              href={ctaHref}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 12,
                border: `1px solid ${accentColor}`,
                background: accentColor,
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
              }}
            >
              {ctaText}
              <Icon name="arrow-right" size={14} color="#ffffff" />
            </a>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: '#ffffff',
                color: textColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
              }}
            >
              <Icon name="menu" size={20} color={textColor} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobile && mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            background: bgColor,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <a
              href="#"
              style={{
                fontWeight: 800,
                fontSize: 18,
                textDecoration: 'none',
                color: textColor,
                letterSpacing: '-0.04em',
              }}
            >
              {logoText}
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: surfaceColor,
                color: textColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="x" size={20} color={textColor} />
            </button>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  color: textColor,
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 16,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA + Search */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: `1px solid ${borderColor}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {showSearch && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: `1px solid ${borderColor}`,
                  background: surfaceColor,
                }}
              >
                <Icon name="search" size={16} color={mutedColor} />
                <input
                  placeholder="Search…"
                  aria-label="Search"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: textColor,
                    fontSize: 14,
                    flex: 1,
                    fontFamily,
                  }}
                />
              </div>
            )}
            {showCTA && (
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: `1px solid ${accentColor}`,
                  background: accentColor,
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {ctaText}
                <Icon name="arrow-right" size={14} color="#ffffff" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
