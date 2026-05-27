'use client';
import React, { useState } from 'react';
import { useContentTheme } from '../../core/provider';
import { Icon } from '../../core/icons';

/* ── CalloutBox ─────────────────────────────────────────── */

export type CalloutVariant = 'info' | 'success' | 'warning' | 'danger';

export interface CalloutBoxProps {
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
  variant?: CalloutVariant;
  title?: string;
  message?: string;
  icon?: string;
  titleSize?: number;
  messageSize?: number;
  border?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
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

const variantConfig: Record<
  CalloutVariant,
  { bg: string; color: string; border: string; iconBg: string; icon: string }
> = {
  info: {
    bg: '#ffffff',
    color: '#18181b',
    border: '#dbeafe',
    iconBg: '#f4f4f5',
    icon: 'info',
  },
  success: {
    bg: '#ffffff',
    color: '#18181b',
    border: '#dcfce7',
    iconBg: '#f4f4f5',
    icon: 'check-circle',
  },
  warning: {
    bg: '#ffffff',
    color: '#18181b',
    border: '#fef3c7',
    iconBg: '#f4f4f5',
    icon: 'alert-triangle',
  },
  danger: {
    bg: '#ffffff',
    color: '#18181b',
    border: '#fee2e2',
    iconBg: '#f4f4f5',
    icon: 'alert-circle',
  },
};

export function CalloutBox({
  as: Tag = 'section',
  bgColor,
  textColor,
  fontFamily,
  maxW = 900,
  px = 0,
  py = 0,
  radius = 0,
  gap = 16,
  style = {},
  className = '',
  variant = 'info',
  title = 'Note',
  message = 'This is an important message.',
  icon,
  titleSize = 16,
  messageSize = 14,
  border = true,
  dismissible = false,
  onDismiss,
}: CalloutBoxProps) {
  const t = useContentTheme();
  const ff = fontFamily ?? t.fontFamily;
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const config = variantConfig[variant];
  const localBg = bgColor ?? config.bg;
  const localColor = textColor ?? config.color;

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <Tag
      className={className}
      style={{
        background: 'transparent',
        color: 'inherit',
        fontFamily: ff,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        display: 'grid',
        justifyItems: 'start',
        placeItems: 'start',
        ...style,
      }}
    >
      <div style={{ width: '100%', maxWidth: maxW, display: 'grid', gap }}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: '100%',
            background: localBg,
            border: border ? `1px solid ${ui.border}` : 'none',
            borderRadius: 14,
            padding: '16px 18px',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
            transition: 'all 180ms ease',
            transform: isHovered ? 'translateY(-1px)' : 'none',
            boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.06)' : '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: config.iconBg,
              border: `1px solid ${ui.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon ? (
              <span style={{ fontSize: 18 }}>{icon}</span>
            ) : (
              <Icon name={config.icon} size={18} color={ui.black} />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <div
                style={{
                  fontSize: titleSize,
                  fontWeight: 700,
                  color: localColor,
                  marginBottom: message ? 6 : 0,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </div>
            )}
            {message && (
              <p
                style={{
                  fontSize: messageSize,
                  margin: 0,
                  lineHeight: 1.6,
                  color: ui.muted,
                }}
              >
                {message}
              </p>
            )}
          </div>

          {/* Dismiss */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 4,
                cursor: 'pointer',
                opacity: 0.6,
                color: ui.muted,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = ui.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon name="x" size={18} color={ui.muted} />
            </button>
          )}
        </div>
      </div>
    </Tag>
  );
}
