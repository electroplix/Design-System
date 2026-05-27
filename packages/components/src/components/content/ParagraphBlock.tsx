'use client';
import type React from 'react';
import { Icon } from '../../core/icons';
import { useContentTheme } from '../../core/provider';

/* ── ParagraphBlock ─────────────────────────────────────── */

export interface ParagraphBlockProps {
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
  paragraphs: string[];
  size?: number;
  leading?: number;
  align?: 'left' | 'center' | 'right' | 'justify';
  accentColor?: string;
  showDropCap?: boolean;
  title?: string;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  border: '#e4e4e7',
  surface: '#fafafa',
};

export function ParagraphBlock({
  as: Tag = 'section',
  bgColor,
  textColor,
  fontFamily,
  maxW = 900,
  px = 24,
  py = 24,
  radius = 16,
  gap = 16,
  style = {},
  className = '',
  paragraphs = [
    'This is the first paragraph of content.',
    'This is the second paragraph with more details.',
  ],
  size = 16,
  leading = 1.75,
  align = 'left',
  accentColor,
  showDropCap = false,
  title,
}: ParagraphBlockProps) {
  const t = useContentTheme();

  const bg = bgColor ?? t.cardBg ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const ff = fontFamily ?? t.fontFamily;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = t.borderColor ?? ui.border;

  const safeParagraphs = Array.isArray(paragraphs) ? paragraphs : [];

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
        {/* Optional title */}
        {title && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              paddingBottom: gap - 4,
              borderBottom: `1px solid ${ui.border}`,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: ui.surface,
                border: `1px solid ${ui.border}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name="file-text" size={18} color={accent} />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: size + 2,
                color: ui.black,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </span>
          </div>
        )}

        {/* Paragraphs */}
        {safeParagraphs.length === 0 ? (
          <p style={{ color: ui.mutedSoft, fontSize: size, margin: 0 }}>No content</p>
        ) : (
          <div style={{ display: 'grid', gap: 18 }}>
            {safeParagraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: size,
                  lineHeight: leading,
                  textAlign: align,
                  margin: 0,
                  color: fg,
                  opacity: 0.92,
                }}
              >
                {showDropCap && i === 0 && p.length > 0 ? (
                  <>
                    <span
                      style={{
                        float: 'left',
                        fontSize: size * 3.5,
                        fontWeight: 800,
                        lineHeight: 0.8,
                        marginRight: 10,
                        marginTop: 6,
                        color: accent,
                        letterSpacing: '-0.06em',
                      }}
                    >
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        )}

        {/* Word count */}
        {safeParagraphs.length > 0 && (
          <div
            style={{
              fontSize: 12,
              color: ui.muted,
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>{safeParagraphs.reduce((acc, p) => acc + p.split(/\s+/).length, 0)} words</span>
            <span>&bull;</span>
            <span>
              {Math.ceil(safeParagraphs.reduce((acc, p) => acc + p.split(/\s+/).length, 0) / 200)}{' '}
              min read
            </span>
          </div>
        )}
      </div>
    </Tag>
  );
}
