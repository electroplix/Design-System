'use client';
import type React from 'react';
import { useMemo, useState } from 'react';
import { Icon } from '../../core/icons';
import { useContentTheme } from '../../core/provider';

/* ── InlineCodeText ─────────────────────────────────────── */

export interface InlineCodeProps {
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
  text: string;
  codeBg?: string;
  codeColor?: string;
  codePx?: string;
  codeRadius?: number;
  size?: number;
  accentColor?: string;
  copyable?: boolean;
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

export function InlineCodeText({
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
  text = 'Use the `npm install` command to install packages. Then run `npm start` to begin.',
  codeBg,
  codeColor,
  codePx = '4px 8px',
  codeRadius = 6,
  size = 16,
  accentColor,
  copyable = true,
}: InlineCodeProps) {
  const t = useContentTheme();

  const bg = bgColor ?? t.cardBg ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const ff = fontFamily ?? t.fontFamily;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = t.borderColor ?? ui.border;

  const [copied, setCopied] = useState(false);

  const effectiveCodeBg = codeBg || ui.surface;
  const effectiveCodeColor = codeColor || accent;

  const codeSnippets = useMemo(() => {
    const matches = text.match(/`([^`]+?)`/g);
    return matches ? matches.map((m) => m.replace(/`/g, '')) : [];
  }, [text]);

  const rendered = useMemo(() => {
    const safe = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return safe.replace(/`([^`]+?)`/g, (_, m) => `<code class="__inline_code">${m}</code>`);
  }, [text]);

  const handleCopy = async () => {
    if (codeSnippets.length > 0) {
      await navigator.clipboard.writeText(codeSnippets.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        <style>{`
          .__inline_code {
            background: ${effectiveCodeBg};
            color: ${effectiveCodeColor};
            padding: ${codePx};
            border-radius: ${codeRadius}px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 0.9em;
            font-weight: 600;
            border: 1px solid ${ui.border};
            box-shadow: inset 0 -1px 0 rgba(9, 9, 11, 0.04);
            transition: all 150ms ease;
          }
          .__inline_code:hover {
            background: ${ui.surfaceHover};
            border-color: ${ui.border};
          }
        `}</style>

        <div style={{ position: 'relative', width: '100%' }}>
          <p
            style={{
              fontSize: size,
              lineHeight: 1.8,
              margin: 0,
              color: fg,
              paddingRight: copyable && codeSnippets.length > 0 ? 44 : 0,
            }}
            dangerouslySetInnerHTML={{ __html: rendered }}
          />

          {/* Copy button */}
          {copyable && codeSnippets.length > 0 && (
            <button
              onClick={handleCopy}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: copied ? ui.black : ui.white,
                border: `1px solid ${copied ? ui.black : ui.border}`,
                borderRadius: 8,
                padding: 8,
                cursor: 'pointer',
                color: copied ? ui.white : ui.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 150ms ease',
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.05)',
              }}
              title={copied ? 'Copied!' : 'Copy code snippets'}
            >
              <Icon name={copied ? 'check' : 'copy'} size={16} />
            </button>
          )}
        </div>
      </div>
    </Tag>
  );
}
