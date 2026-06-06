'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Icon } from '../../core/icons';
import { useMiscTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useMS() {
  const t = useMiscTheme();

  return {
    accent: t.accentColor ?? '#09090b',
    fg: t.textColor ?? '#18181b',
    bg: t.bgColor ?? '#ffffff',
    border: t.borderColor ?? '#e4e4e7',
    r: t.radius ?? 14,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
  };
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
};

/* ── CookieConsent ──────────────────────────────────────── */

export interface CookieConsentProps extends React.ComponentPropsWithoutRef<'div'> {
  message?: string;
  ctaLabel?: string;
  declineLabel?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  position?: 'top' | 'bottom';
}

export function CookieConsent({
  message = 'We use cookies to improve your experience.',
  ctaLabel = 'Accept',
  declineLabel = 'Decline',
  onAccept,
  onDecline,
  position = 'bottom',
  style = {},
  ...rest
}: CookieConsentProps) {
  const ms = useMS();
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        ...(position === 'top' ? { top: 16 } : { bottom: 16 }),
        zIndex: 9998,
        padding: 16,
        background: ui.white,
        border: `1px solid ${ms.border}`,
        borderRadius: ms.r,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        flexWrap: 'wrap',
        fontFamily: ms.ff,
        color: ms.fg,
        boxShadow: '0 12px 40px rgba(9,9,11,0.12)',
        ...style,
      }}
      {...rest}
    >
      <Icon name="shield" size={20} color={ms.accent} />

      <span style={{ fontSize: ms.bs, color: ms.fg }}>{message}</span>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => {
            setShow(false);
            onAccept?.();
          }}
          style={{
            padding: '8px 18px',
            borderRadius: ms.r - 4,
            border: `1px solid ${ms.accent}`,
            background: ms.accent,
            color: ui.white,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {ctaLabel}
        </button>

        <button
          onClick={() => {
            setShow(false);
            onDecline?.();
          }}
          style={{
            padding: '8px 18px',
            borderRadius: ms.r - 4,
            border: `1px solid ${ms.border}`,
            background: ui.white,
            color: ms.fg,
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {declineLabel}
        </button>
      </div>
    </div>
  );
}

/* ── ScrollProgressBar ──────────────────────────────────── */

export interface ScrollProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
  color?: string;
  height?: number;
  zIndex?: number;
}

export function ScrollProgressBar({
  color,
  height = 3,
  zIndex = 9997,
  style = {},
  ...rest
}: ScrollProgressBarProps) {
  const ms = useMS();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const h = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      setPct(scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100);
    };

    window.addEventListener('scroll', h, { passive: true });
    h();

    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height,
        width: `${pct}%`,
        background: color ?? ms.accent,
        zIndex,
        transition: 'width 0.1s',
        ...style,
      }}
      {...rest}
    />
  );
}

/* ── ThemeToggle ────────────────────────────────────────── */

export interface ThemeToggleProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onToggle'> {
  isDark?: boolean;
  onToggle?: (dark: boolean) => void;
  size?: number;
}

export function ThemeToggle({
  isDark = true,
  onToggle,
  size = 40,
  style = {},
  ...rest
}: ThemeToggleProps) {
  const ms = useMS();
  const [dark, setDark] = useState(isDark);

  const toggle = () => {
    const next = !dark;

    setDark(next);
    onToggle?.(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: size,
        height: size,
        borderRadius: '999px',
        border: `1px solid ${ms.border}`,
        background: ui.white,
        color: ms.fg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={dark ? 'sun' : 'moon'} size={size * 0.5} color={ms.accent} />
    </button>
  );
}

/* ── EmptyState ─────────────────────────────────────────── */

export interface MiscEmptyStateProps extends React.ComponentPropsWithoutRef<'div'> {
  icon?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({
  icon = 'inbox',
  title = 'Nothing here yet',
  description,
  ctaLabel,
  onCta,
  style = {},
  ...rest
}: MiscEmptyStateProps) {
  const ms = useMS();

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 48,
        fontFamily: ms.ff,
        color: ms.fg,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '999px',
          background: ui.surface,
          border: `1px solid ${ms.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        }}
      >
        <Icon name={icon} size={28} color={ms.accent} />
      </div>

      <div style={{ fontWeight: 800, fontSize: 18 }}>{title}</div>

      {description && (
        <div
          style={{
            fontSize: 14,
            color: ui.muted,
            marginTop: 8,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      )}

      {ctaLabel && (
        <button
          onClick={onCta}
          style={{
            marginTop: 16,
            padding: '10px 20px',
            borderRadius: ms.r - 4,
            border: `1px solid ${ms.accent}`,
            background: ms.accent,
            color: ui.white,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

/* ── AppInstallBanner ───────────────────────────────────── */

export interface AppInstallBannerProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  description?: string;
  iosUrl?: string;
  androidUrl?: string;
  icon?: string;
  onDismiss?: () => void;
}

export function AppInstallBanner({
  title = 'Get Our App',
  description = 'Download the app for a better experience.',
  iosUrl,
  androidUrl,
  icon = 'smartphone',
  onDismiss,
  style = {},
  ...rest
}: AppInstallBannerProps) {
  const ms = useMS();
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 16px',
        border: `1px solid ${ms.border}`,
        borderRadius: ms.r,
        background: ui.white,
        fontFamily: ms.ff,
        color: ms.fg,
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: ui.surface,
          border: `1px solid ${ms.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={22} color={ms.accent} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>

        <div style={{ fontSize: 13, color: ui.muted }}>{description}</div>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {iosUrl && (
          <a
            href={iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '6px 12px',
              borderRadius: ms.r - 6,
              background: ms.accent,
              color: ui.white,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            iOS
          </a>
        )}

        {androidUrl && (
          <a
            href={androidUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '6px 12px',
              borderRadius: ms.r - 6,
              background: ms.accent,
              color: ui.white,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Android
          </a>
        )}
      </div>

      <button
        onClick={() => {
          setShow(false);
          onDismiss?.();
        }}
        style={{
          background: ui.surface,
          border: `1px solid ${ms.border}`,
          borderRadius: 8,
          cursor: 'pointer',
          color: ms.fg,
          width: 32,
          height: 32,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
}

/* ── DownloadBlock ───────────────────────────────────────── */

export interface DownloadBlockProps extends React.ComponentPropsWithoutRef<'a'> {
  fileName: string;
  fileSize?: string;
  href: string;
  icon?: string;
}

export function DownloadBlock({
  fileName,
  fileSize,
  href,
  icon = 'download',
  style = {},
  className = '',
  ...rest
}: DownloadBlockProps) {
  const ms = useMS();

  return (
    <a
      href={href}
      download
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        border: `1px solid ${ms.border}`,
        borderRadius: ms.r,
        background: ui.white,
        textDecoration: 'none',
        color: ms.fg,
        fontFamily: ms.ff,
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      className={className}
      {...rest}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: ui.surface,
          border: `1px solid ${ms.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={20} color={ms.accent} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{fileName}</div>

        {fileSize && <div style={{ fontSize: 13, color: ui.muted }}>{fileSize}</div>}
      </div>

      <Icon name="download" size={18} color={ms.accent} />
    </a>
  );
}

/* ── InlineCode ─────────────────────────────────────────── */

export interface MiscInlineCodeProps extends React.ComponentPropsWithoutRef<'span'> {
  children: string;
  copyable?: boolean;
}

export function InlineCode({
  children,
  copyable = true,
  style = {},
  className = '',
  ...rest
}: MiscInlineCodeProps) {
  const ms = useMS();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 8px',
        borderRadius: 6,
        background: ui.surface,
        border: `1px solid ${ms.border}`,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 13,
        color: ms.fg,
        ...style,
      }}
      className={className}
      {...rest}
    >
      <code>{children}</code>

      {copyable && (
        <button
          onClick={copy}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            color: ms.fg,
          }}
        >
          <Icon name={copied ? 'check' : 'copy'} size={14} color={ms.accent} />
        </button>
      )}
    </span>
  );
}

/* ── RSSFeed ─────────────────────────────────────────────── */

export interface RSSItem {
  id: string;
  title: string;
  link: string;
  date?: string;
  summary?: string;
}

export interface RSSFeedProps extends React.ComponentPropsWithoutRef<'div'> {
  items: RSSItem[];
  title?: string;
}

export function RSSFeed({
  items = [],
  title = 'Latest Updates',
  style = {},
  className = '',
  ...rest
}: RSSFeedProps) {
  const ms = useMS();

  return (
    <div
      style={{
        border: `1px solid ${ms.border}`,
        borderRadius: ms.r,
        padding: ms.sp,
        fontFamily: ms.ff,
        color: ms.fg,
        background: ui.white,
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
      className={className}
      {...rest}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon name="globe" size={18} color={ms.accent} />
        {title}
      </div>

      <div style={{ display: 'grid', gap: 6 }}>
        {items.map((it) => (
          <a
            key={it.id}
            href={it.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '12px 14px',
              borderRadius: ms.r - 6,
              color: ms.fg,
              textDecoration: 'none',
              transition: 'background 0.15s',
              background: ui.surface,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15 }}>{it.title}</div>

            <div
              style={{
                display: 'flex',
                gap: 8,
                fontSize: 12,
                color: ui.muted,
                marginTop: 4,
              }}
            >
              {it.date && <span>{it.date}</span>}
              {it.summary && <span>— {it.summary}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
