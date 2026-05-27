'use client';
import React from 'react';
import { useNavTheme } from '../../core/provider';
import { Icon } from '../../core/icons';

/* ── Footer ─────────────────────────────────────────────── */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  href: string;
  label?: string;
}

export interface FooterProps {
  columns?: FooterColumn[];
  copyright?: string;
  socialLinks?: FooterSocialLink[];
  logo?: string;
  logoAlt?: string;
  tagline?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  children?: React.ReactNode;
}

export function Footer({
  columns = [],
  copyright,
  socialLinks = [],
  logo,
  logoAlt = 'Logo',
  tagline,
  bgColor,
  textColor,
  accentColor,
  borderColor,
  fontFamily,
  children,
}: FooterProps) {
  const t = useNavTheme();

  const bg = bgColor ?? t.bgColor ?? '#ffffff';
  const fg = textColor ?? t.textColor ?? '#09090b';
  const muted = '#71717a';
  const accent = accentColor ?? t.accentColor ?? '#18181b';
  const border = borderColor ?? t.borderColor ?? '#e4e4e7';
  const surface = '#fafafa';

  const ff = fontFamily ?? t.fontFamily;
  const r = t.radius ?? 16;

  return (
    <footer
      style={{
        background: bg,
        color: fg,
        fontFamily: ff,
        borderTop: `1px solid ${border}`,
        padding: '56px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              columns.length > 0 ? `1fr repeat(${Math.min(columns.length, 4)}, auto)` : '1fr',
            gap: 48,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            {logo && (
              <img
                src={logo}
                alt={logoAlt}
                style={{
                  height: 32,
                  marginBottom: 14,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            )}

            {tagline && (
              <p
                style={{
                  fontSize: 14,
                  color: muted,
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 320,
                }}
              >
                {tagline}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: 24,
                }}
              >
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label ?? s.icon}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      border: `1px solid ${border}`,
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: fg,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = surface;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#ffffff';
                    }}
                  >
                    <Icon name={s.icon} size={16} color={fg} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Columns */}
          {columns.map((col, ci) => (
            <div key={ci}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: muted,
                }}
              >
                {col.title}
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 12,
                }}
              >
                {col.links.map((link, li) => (
                  <a
                    key={li}
                    href={link.href}
                    style={{
                      color: muted,
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 500,
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = fg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = muted;
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra children */}
        {children}

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: `1px solid ${border}`,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: muted,
            }}
          >
            {copyright ?? `© ${new Date().getFullYear()} All rights reserved.`}
          </div>

          <div
            style={{
              fontSize: 13,
              color: muted,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Built with
            <Icon name="heart" size={12} color={accent} />
            Electroplix
          </div>
        </div>
      </div>
    </footer>
  );
}
