'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../core/icons';
import { useModalsTheme } from '../../core/provider';
import { useMediaQuery } from '../../core/utils';

/* ── helpers ────────────────────────────────────────────── */

function useML() {
  const t = useModalsTheme();

  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#09090b',
    muted: '#71717a',
    bg: t.bgColor ?? '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    border: t.borderColor ?? '#e4e4e7',
    danger: '#dc2626',
    warning: '#ca8a04',
    success: '#16a34a',
    r: t.radius ?? 16,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
  };
}

/* ── OverlayBase ────────────────────────────────────────── */

export interface OverlayBaseProps extends React.ComponentPropsWithoutRef<'div'> {
  isOpen: boolean;
  onClose?: () => void;
  maxW?: number;
  showClose?: boolean;
  position?: 'center' | 'top' | 'bottom';
}

export function OverlayBase({
  isOpen,
  onClose,
  children,
  maxW = 480,
  showClose = true,
  position = 'center',
  style = {},
  className = '',
  ...rest
}: OverlayBaseProps) {
  const ml = useML();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isOpen) return;

    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const align = position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: align,
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9, 9, 11, 0.45)',
          backdropFilter: 'blur(6px)',
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={className}
        {...rest}
        style={{
          position: 'relative',
          background: ml.bg,
          border: `1px solid ${ml.border}`,
          borderRadius: ml.r,
          maxWidth: isMobile ? 'calc(100vw - 32px)' : maxW,
          width: '100%',
          fontFamily: ml.ff,
          color: ml.fg,
          overflow: 'hidden',
          boxShadow: '0 20px 45px rgba(9, 9, 11, 0.12), 0 4px 12px rgba(9, 9, 11, 0.06)',
          ...style,
        }}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              background: ml.surface,
              border: `1px solid ${ml.border}`,
              borderRadius: 10,
              cursor: 'pointer',
              color: ml.muted,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
            }}
          >
            <Icon name="x" size={18} />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}

/* ── GenericModal ────────────────────────────────────────── */

export interface GenericModalProps extends OverlayBaseProps {
  title?: string;
  footer?: React.ReactNode;
}

export function GenericModal({
  isOpen,
  title,
  onClose,
  maxW,
  children,
  footer,
  ...rest
}: GenericModalProps) {
  const ml = useML();

  return (
    <OverlayBase isOpen={isOpen} onClose={onClose} maxW={maxW} {...rest}>
      {title && (
        <div
          style={{
            padding: '18px 20px',
            borderBottom: `1px solid ${ml.border}`,
            background: ml.surface,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '-0.025em',
            color: ml.fg,
          }}
        >
          {title}
        </div>
      )}

      <div style={{ padding: 20 }}>{children}</div>

      {footer && (
        <div
          style={{
            padding: '12px 20px',
            borderTop: `1px solid ${ml.border}`,
            background: ml.surface,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          {footer}
        </div>
      )}
    </OverlayBase>
  );
}

/* ── ConfirmDialog ──────────────────────────────────────── */

export interface ConfirmDialogProps extends Omit<OverlayBaseProps, 'children'> {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
  ...rest
}: ConfirmDialogProps) {
  const ml = useML();
  const col = danger ? ml.danger : ml.accent;

  return (
    <OverlayBase isOpen={isOpen} onClose={onCancel} maxW={400} {...rest}>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: danger ? '#fef2f2' : ml.surface,
            border: `1px solid ${danger ? '#fecaca' : ml.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
          }}
        >
          <Icon name={danger ? 'alert-triangle' : 'help-circle'} size={24} color={col} />
        </div>

        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '-0.025em',
            color: ml.fg,
          }}
        >
          {title}
        </div>

        {message && (
          <p
            style={{
              fontSize: ml.bs,
              color: ml.muted,
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 20,
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              border: `1px solid ${ml.border}`,
              background: '#ffffff',
              color: ml.fg,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              border: `1px solid ${col}`,
              background: col,
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </OverlayBase>
  );
}

/* ── FormDialog ─────────────────────────────────────────── */
export interface FormDialogProps extends Omit<OverlayBaseProps, 'onSubmit'> {
  title?: string;
  onSubmit?: (data: FormData) => void;
  submitLabel?: string;
}

export function FormDialog({
  isOpen,
  title = 'Submit',
  onClose,
  onSubmit,
  submitLabel = 'Submit',
  children,
  ...rest
}: FormDialogProps) {
  const ml = useML();
  const ref = useRef<HTMLFormElement>(null);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.current) onSubmit?.(new FormData(ref.current));
  };

  return (
    <OverlayBase isOpen={isOpen} onClose={onClose} maxW={480} {...rest}>
      <div
        style={{
          padding: '18px 20px',
          borderBottom: `1px solid ${ml.border}`,
          background: ml.surface,
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: '-0.025em',
          color: ml.fg,
        }}
      >
        {title}
      </div>

      <form ref={ref} onSubmit={handle}>
        <div style={{ padding: 20 }}>{children}</div>

        <div
          style={{
            padding: '12px 20px',
            borderTop: `1px solid ${ml.border}`,
            background: ml.surface,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              border: `1px solid ${ml.border}`,
              background: '#ffffff',
              color: ml.fg,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: '10px 18px',
              borderRadius: 12,
              border: `1px solid ${ml.accent}`,
              background: ml.accent,
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
            }}
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </OverlayBase>
  );
}

/* ── LoadingOverlay ─────────────────────────────────────── */

export interface LoadingOverlayProps extends React.ComponentPropsWithoutRef<'div'> {
  isOpen: boolean;
  message?: string;
}

export function LoadingOverlay({
  isOpen,
  message = 'Loading...',
  style = {},
  className = '',
  ...rest
}: LoadingOverlayProps) {
  const ml = useML();

  if (!isOpen) return null;

  return (
    <div
      className={className}
      {...rest}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(6px)',
        fontFamily: ml.ff,
        color: ml.fg,
        ...style,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: `2px solid ${ml.border}`,
          borderTopColor: ml.accent,
          borderRadius: '50%',
          animation: 'eplx-spin 0.8s linear infinite',
        }}
      />

      <div
        style={{
          marginTop: 16,
          fontWeight: 600,
          fontSize: 15,
          color: ml.fg,
        }}
      >
        {message}
      </div>
    </div>
  );
}

/* ── Tooltip ────────────────────────────────────────────── */

export interface TooltipProps extends React.ComponentPropsWithoutRef<'span'> {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export function Tooltip({
  text,
  position = 'top',
  children,
  style = {},
  className = '',
  ...rest
}: TooltipProps) {
  const ml = useML();
  const [show, setShow] = useState(false);

  const pos: React.CSSProperties =
    position === 'top'
      ? { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
      : position === 'bottom'
        ? { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
        : position === 'left'
          ? { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }
          : { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' };

  return (
    <span
      className={className}
      {...rest}
      style={{
        position: 'relative',
        display: 'inline-flex',
        ...style,
      }}
      onMouseEnter={(e) => {
        setShow(true);
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setShow(false);
        rest.onMouseLeave?.(e);
      }}
    >
      {children}

      {show && (
        <span
          style={{
            position: 'absolute',
            ...pos,
            whiteSpace: 'nowrap',
            padding: '6px 12px',
            borderRadius: 10,
            background: '#ffffff',
            border: `1px solid ${ml.border}`,
            color: ml.fg,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: ml.ff,
            pointerEvents: 'none',
            zIndex: 50,
            boxShadow: '0 8px 20px rgba(9, 9, 11, 0.08)',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

/* ── ToastBanners ───────────────────────────────────────── */

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastBannersProps extends React.ComponentPropsWithoutRef<'div'> {
  toasts: Toast[];
  onDismiss?: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const TOAST_COLORS: Record<ToastVariant, { bg: string; border: string; icon: string }> = {
  info: {
    bg: '#ffffff',
    border: '#e4e4e7',
    icon: '#18181b',
  },
  success: {
    bg: '#ffffff',
    border: '#d4d4d8',
    icon: '#16a34a',
  },
  warning: {
    bg: '#ffffff',
    border: '#d4d4d8',
    icon: '#ca8a04',
  },
  error: {
    bg: '#ffffff',
    border: '#fecaca',
    icon: '#dc2626',
  },
};

export function ToastBanners({
  toasts = [],
  onDismiss,
  position = 'top-right',
  style = {},
  className = '',
  ...rest
}: ToastBannersProps) {
  const ml = useML();

  const posStyle: React.CSSProperties = position.includes('top') ? { top: 16 } : { bottom: 16 };

  Object.assign(posStyle, position.includes('right') ? { right: 16 } : { left: 16 });

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        zIndex: 9990,
        display: 'grid',
        gap: 8,
        width: 340,
        ...posStyle,
        ...style,
      }}
      {...rest}
    >
      {toasts.map((t) => {
        const v = TOAST_COLORS[t.variant ?? 'info'];

        return (
          <div
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              borderRadius: ml.r,
              background: v.bg,
              border: `1px solid ${v.border}`,
              fontFamily: ml.ff,
              color: ml.fg,
              animation: 'eplx-slide-in 0.25s ease-out',
              boxShadow: '0 10px 25px rgba(9, 9, 11, 0.06)',
            }}
          >
            <Icon name={v.icon} size={20} color={v.icon} />

            <span
              style={{
                flex: 1,
                fontSize: 14,
                color: ml.fg,
                lineHeight: 1.45,
              }}
            >
              {t.message}
            </span>

            <button
              type="button"
              onClick={() => onDismiss?.(t.id)}
              style={{
                background: ml.surface,
                border: `1px solid ${ml.border}`,
                borderRadius: 8,
                cursor: 'pointer',
                color: ml.muted,
                padding: 0,
                width: 26,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ── CookieNotice ───────────────────────────────────────── */

export interface CookieNoticeProps extends React.ComponentPropsWithoutRef<'div'> {
  isOpen: boolean;
  title?: string;
  message?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onSettings?: () => void;
}

export function CookieNotice({
  isOpen,
  title = 'Cookie Notice',
  message = 'This site uses cookies.',
  onAccept,
  onDecline,
  onSettings,
  style = {},
  className = '',
  ...rest
}: CookieNoticeProps) {
  const ml = useML();

  if (!isOpen) return null;

  return (
    <div
      className={className}
      {...rest}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9990,
        width: 360,
        background: ml.bg,
        border: `1px solid ${ml.border}`,
        borderRadius: ml.r,
        padding: 20,
        fontFamily: ml.ff,
        color: ml.fg,
        boxShadow: '0 20px 45px rgba(9, 9, 11, 0.12), 0 4px 12px rgba(9, 9, 11, 0.06)',
        ...style,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 8,
          letterSpacing: '-0.02em',
          color: ml.fg,
        }}
      >
        {title}
      </div>

      <p
        style={{
          fontSize: 14,
          color: ml.muted,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {message}
      </p>

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 14,
        }}
      >
        <button
          type="button"
          onClick={onAccept}
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: 12,
            border: `1px solid ${ml.accent}`,
            background: ml.accent,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
          }}
        >
          Accept
        </button>

        <button
          type="button"
          onClick={onDecline}
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: 12,
            border: `1px solid ${ml.border}`,
            background: '#ffffff',
            color: ml.fg,
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        >
          Decline
        </button>

        {onSettings && (
          <button
            type="button"
            onClick={onSettings}
            style={{
              padding: '8px 14px',
              borderRadius: 12,
              border: `1px solid ${ml.border}`,
              background: '#ffffff',
              color: ml.fg,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <Icon name="settings" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── WelcomePopup ───────────────────────────────────────── */

export interface WelcomePopupProps extends OverlayBaseProps {
  title?: string;
  message?: string;
  ctaLabel?: string;
  onCta?: () => void;
  image?: string;
}

export function WelcomePopup({
  isOpen,
  title = 'Welcome!',
  message,
  ctaLabel = 'Get Started',
  onCta,
  onClose,
  image,
  ...rest
}: WelcomePopupProps) {
  const ml = useML();

  return (
    <OverlayBase isOpen={isOpen} onClose={onClose} maxW={420} {...rest}>
      <div
        style={{
          textAlign: 'center',
          padding: 32,
        }}
      >
        {image && (
          <img
            src={image}
            alt=""
            style={{
              width: '100%',
              borderRadius: ml.r - 4,
              marginBottom: 16,
              border: `1px solid ${ml.border}`,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
            }}
          />
        )}

        <div
          style={{
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: '-0.035em',
            color: ml.fg,
          }}
        >
          {title}
        </div>

        {message && (
          <p
            style={{
              fontSize: 15,
              color: ml.muted,
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={onCta}
          style={{
            marginTop: 20,
            padding: '12px 28px',
            borderRadius: 14,
            border: `1px solid ${ml.accent}`,
            background: ml.accent,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </OverlayBase>
  );
}
