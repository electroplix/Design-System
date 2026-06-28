'use client';
import type React from 'react';
import { Icon } from '../../core/icons';
import { useContentTheme } from '../../core/provider';
import { useMediaQuery } from '../../core/utils';

/* ── TeamGrid ───────────────────────────────────────────── */

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  image?: string;
  bio?: string;
  socials?: { icon: string; href: string }[];
}

export interface TeamGridProps extends React.ComponentPropsWithoutRef<'section'> {
  members: TeamMember[];
  columns?: number | string;
  title?: string;
  subtitle?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
};

export function TeamGrid({
  members = [],
  columns = 3,
  title,
  subtitle,
  bgColor,
  textColor,
  accentColor,
  borderColor,
  fontFamily,
  className,
  style,
  ...rest
}: TeamGridProps) {
  const t = useContentTheme();
  const isMobile = useMediaQuery('(max-width: 768px');

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;
  const ff = fontFamily ?? t.fontFamily;
  const r = t.radius ?? 14;

  return (
    <section className={className} style={{ fontFamily: ff, color: fg, ...style }} {...rest}>
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {title && (
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                margin: 0,
                lineHeight: 1.15,
                color: ui.black,
                letterSpacing: '-0.04em',
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                fontSize: 16,
                color: ui.muted,
                marginTop: 10,
                lineHeight: 1.6,
                margin: '10px 0 0',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : `repeat(${columns}, 1fr)`,
          gap: 20,
        }}
      >
        {members.map((m) => {
          const initials = m.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={m.id}
              style={{
                border: `1px solid ${border}`,
                borderRadius: r,
                overflow: 'hidden',
                background: bg,
                textAlign: 'center',
                transition: 'all 180ms ease',
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  padding: '28px 20px 0',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `1px solid ${ui.border}`,
                      boxShadow: '0 1px 2px rgba(9, 9, 11, 0.05)',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: '50%',
                      background: ui.surface,
                      border: `1px solid ${ui.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      fontWeight: 800,
                      color: accent,
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '18px 20px 22px' }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: ui.black,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {m.name}
                </div>

                {m.role && (
                  <div
                    style={{
                      fontSize: 13,
                      color: ui.muted,
                      fontWeight: 600,
                      marginTop: 6,
                    }}
                  >
                    {m.role}
                  </div>
                )}

                {m.bio && (
                  <div
                    style={{
                      fontSize: 14,
                      color: ui.muted,
                      lineHeight: 1.6,
                      marginTop: 12,
                    }}
                  >
                    {m.bio}
                  </div>
                )}

                {/* Social links */}
                {m.socials && m.socials.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 8,
                      marginTop: 16,
                    }}
                  >
                    {m.socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          border: `1px solid ${ui.border}`,
                          background: ui.white,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: ui.text,
                          textDecoration: 'none',
                          transition: 'all 150ms ease',
                          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
                        }}
                      >
                        <Icon name={s.icon} size={14} color={ui.text} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
