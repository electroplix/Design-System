'use client';
import React, { useMemo } from 'react';
import { useContentTheme } from '../../core/provider';
import { Icon } from '../../core/icons';

/* ── miniMarkdownToHtml ─────────────────────────────────── */

function miniMarkdownToHtml(md: string, accent: string): string {
  let html = md;
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  html = html.replace(
    /^###### (.*)$/gm,
    `<h6 style="font-size:14px;font-weight:700;margin:16px 0 8px;color:${accent};letter-spacing:-0.01em">$1</h6>`,
  );
  html = html.replace(
    /^##### (.*)$/gm,
    `<h5 style="font-size:15px;font-weight:700;margin:16px 0 8px;color:${accent};letter-spacing:-0.01em">$1</h5>`,
  );
  html = html.replace(
    /^#### (.*)$/gm,
    `<h4 style="font-size:16px;font-weight:700;margin:18px 0 10px;color:${accent};letter-spacing:-0.015em">$1</h4>`,
  );
  html = html.replace(
    /^### (.*)$/gm,
    `<h3 style="font-size:18px;font-weight:700;margin:20px 0 10px;color:${accent};letter-spacing:-0.02em">$1</h3>`,
  );
  html = html.replace(
    /^## (.*)$/gm,
    `<h2 style="font-size:22px;font-weight:800;margin:24px 0 12px;color:#09090b;letter-spacing:-0.03em;line-height:1.2">$1</h2>`,
  );
  html = html.replace(
    /^# (.*)$/gm,
    `<h1 style="font-size:28px;font-weight:800;margin:28px 0 14px;color:#09090b;letter-spacing:-0.04em;line-height:1.15">$1</h1>`,
  );

  html = html.replace(
    /\*\*(.+?)\*\*/g,
    "<strong style='font-weight:700;color:#09090b'>$1</strong>",
  );
  html = html.replace(/\*(.+?)\*/g, "<em style='font-style:italic;color:#52525b'>$1</em>");
  html = html.replace(
    /`([^`]+?)`/g,
    `<code style="background:#f4f4f5;color:${accent};padding:2px 6px;border-radius:6px;border:1px solid #e4e4e7;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:0.9em;font-weight:600">$1</code>`,
  );
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    `<a href="$2" target="_blank" rel="noreferrer noopener" style="color:${accent};text-decoration:underline;text-underline-offset:4px;font-weight:600">$1</a>`,
  );
  html = html.replace(
    /^&gt;\s(.*)$/gm,
    `<blockquote style="border-left:3px solid ${accent};padding:10px 0 10px 16px;margin:16px 0;color:#52525b;background:#fafafa;border-radius:0 8px 8px 0;font-style:italic">$1</blockquote>`,
  );
  html = html.replace(
    /^---$/gm,
    `<hr style="border:none;height:1px;background:#e4e4e7;margin:24px 0" />`,
  );

  html = html.replace(/^(?:\s*[-*]\s.+\n?)+/gm, (block) => {
    const items = block
      .trim()
      .split(/\n/)
      .map((l) => l.replace(/^\s*[-*]\s/, ''))
      .map((li) => `<li style="margin:6px 0;padding-left:6px;color:#3f3f46">${li}</li>`)
      .join('');
    return `<ul style="margin:12px 0;padding-left:22px;list-style:disc">${items}</ul>`;
  });
  html = html.replace(/^(?:\s*\d+\.\s.+\n?)+/gm, (block) => {
    const items = block
      .trim()
      .split(/\n/)
      .map((l) => l.replace(/^\s*\d+\.\s/, ''))
      .map((li) => `<li style="margin:6px 0;padding-left:6px;color:#3f3f46">${li}</li>`)
      .join('');
    return `<ol style="margin:12px 0;padding-left:22px;list-style:decimal">${items}</ol>`;
  });

  html = html
    .split(/\n{2,}/)
    .map((chunk) =>
      /^<h\d|^<ul>|^<ol>|^<p>|^<blockquote>|^<pre>|^<code>|^<hr/.test(chunk)
        ? chunk
        : `<p style="margin:12px 0;line-height:1.7;color:#3f3f46">${chunk.trim()}</p>`,
    )
    .join('\n');

  return html;
}

/* ── RichMarkdown ───────────────────────────────────────── */

export interface RichMarkdownProps {
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
  markdown: string;
  baseSize?: number;
  accentColor?: string;
  title?: string;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
};

export function RichMarkdown({
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
  markdown = '# Welcome\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- Item one\n- Item two\n- Item three\n\n> A blockquote example\n\nVisit [our website](https://example.com) for more.',
  baseSize = 16,
  accentColor,
  title,
}: RichMarkdownProps) {
  const t = useContentTheme();

  const bg = bgColor ?? t.cardBg ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const ff = fontFamily ?? t.fontFamily;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = t.borderColor ?? ui.border;

  const html = useMemo(() => miniMarkdownToHtml(markdown, accent), [markdown, accent]);

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
              <Icon name="code" size={18} color={accent} />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: baseSize + 2,
                color: ui.black,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </span>
          </div>
        )}

        <article
          style={{ fontSize: baseSize, lineHeight: 1.7, width: '100%', color: fg }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Tag>
  );
}
