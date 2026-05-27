'use client';
import type React from 'react';
import { Icon } from '../../core/icons';
import { useContentTheme } from '../../core/provider';

/* ── BlockquoteTestimonial ─────────────────────────────── */

export interface BlockquoteTestimonialProps {
  as?: React.ElementType;
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
  quote?: string;
  author?: string;
  role?: string;
  avatarUrl?: string;
  borderColor?: string;
  quoteSize?: number;
  authorSize?: number;
  accentColor?: string;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
};

export function BlockquoteTestimonial({
  as: Tag = 'section',
  bgColor,
  textColor,
  fontFamily,
  maxW = 900,
  px = 24,
  py = 32,
  radius = 16,
  gap = 16,
  style = {},
  className = '',
  quote = 'This product changed the way we work. Truly amazing experience.',
  author = 'Jane Cooper',
  role = 'CEO at Acme Corp',
  avatarUrl,
  borderColor,
  quoteSize = 18,
  authorSize = 14,
  accentColor,
}: BlockquoteTestimonialProps) {
  const t = useContentTheme();

  const bg = bgColor ?? t.cardBg ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const ff = fontFamily ?? t.fontFamily;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;

  return (
    <Tag
      className={className}
      style={{
        background: bg,
        color: fg,
        fontFamily: ff,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        border: `1px solid ${border}`,
        display: 'grid',
        justifyItems: 'start',
        placeItems: 'start',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
    >
      <div style={{ width: '100%', maxWidth: maxW, display: 'grid', gap }}>
        {/* Quote icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        >
          <Icon name="quote" size={22} color={accent} />
        </div>

        {/* Blockquote */}
        <blockquote
          style={{
            margin: 0,
            padding: 0,
            paddingLeft: 20,
            borderLeft: `3px solid ${accent}`,
            fontSize: quoteSize,
            lineHeight: 1.7,
            fontStyle: 'italic',
            color: fg,
            opacity: 0.92,
            letterSpacing: '-0.01em',
          }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author */}
        {(author || role) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={author || 'Author'}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `1px solid ${ui.border}`,
                  boxShadow: '0 1px 2px rgba(9, 9, 11, 0.05)',
                }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: ui.surface,
                  border: `1px solid ${ui.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color: accent,
                  boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
                }}
              >
                {(author || 'A').charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ fontSize: authorSize }}>
              {author && (
                <div style={{ fontWeight: 700, marginBottom: 2, color: ui.black }}>{author}</div>
              )}
              {role && <div style={{ color: ui.muted, fontSize: authorSize - 1 }}>{role}</div>}
            </div>
          </div>
        )}
      </div>
    </Tag>
  );
}
