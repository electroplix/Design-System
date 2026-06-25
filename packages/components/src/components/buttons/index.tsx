// Shadcn-styled version of your button components
// Logic, props, handlers, animations, and APIs preserved.
// Only visual design/theme styling updated.

'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import type { IconName } from '../../core/icons';
import { useButtonTheme } from '../../core/provider';

export type ButtonBaseProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> & {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  letterSpacing?: number;
  lineHeight?: number;
  radius?: number;
  paddingX?: number;
  paddingY?: number;
  gap?: number;
  icon?: IconName;
  iconNode?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  opacity?: number;
  shadow?: string;
  transitionDuration?: number;
};

const ui = {
  black: '#09090b',
  white: '#ffffff',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  text: '#18181b',
};

export const baseBtn = (p: ButtonBaseProps): React.CSSProperties => ({
  background: p.bgColor ?? ui.black,
  color: p.textColor ?? ui.white,
  border: `1px solid ${p.borderColor ?? ui.border}`,
  borderRadius: p.radius ?? 10,
  padding: `${p.paddingY ?? 10}px ${p.paddingX ?? 18}px`,
  fontSize: p.fontSize ?? 14,
  fontFamily: p.fontFamily ?? 'Inter, sans-serif',
  fontWeight: (p.fontWeight ?? '500') as React.CSSProperties['fontWeight'],
  letterSpacing: p.letterSpacing != null ? `${p.letterSpacing}px` : undefined,
  lineHeight: p.lineHeight ?? undefined,
  cursor: p.disabled ? 'not-allowed' : 'pointer',
  opacity: p.disabled
    ? 0.55
    : p.opacity != null
      ? p.opacity > 1
        ? p.opacity / 100
        : p.opacity
      : 1,
  width: p.width ?? 'fit-content',
  height: p.height ?? undefined,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: p.gap ?? 8,
  boxShadow: p.shadow ?? '0 1px 2px rgba(0,0,0,0.04)',
  transition: `all ${p.transitionDuration ?? 180}ms ease`,
  boxSizing: 'border-box',
  outline: 'none',
  position: 'relative',
});

export function PrimaryButton({ className, style, children, ...p }: ButtonBaseProps) {
  const t = useButtonTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const bgColor = p.bgColor ?? t.accentColor ?? ui.black;

  return (
    <button
      onClick={p.onClick}
      disabled={p.disabled || p.isLoading}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...baseBtn({
          ...p,
          bgColor,
          textColor: p.textColor ?? ui.white,
          fontFamily: p.fontFamily ?? t.fontFamily,
          radius: p.radius ?? t.radius,
        }),
        background: bgColor,
        border: `1px solid ${bgColor}`,
        transform: pressed ? 'scale(0.97)' : hovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.05)',
        ...style,
      }}
      {...p}
    >
      {p.isLoading ? (
        <Icon
          name="loader-2"
          size={18}
          style={{ animation: 'eplx-spin 1s linear infinite' } as React.CSSProperties}
        />
      ) : p.icon ? (
        <Icon name={p.icon} size={18} />
      ) : (
        (p.iconNode ?? null)
      )}
      <span data-testid="primary-btn">{children ?? p.label ?? 'Primary'}</span>
    </button>
  );
}

export function SecondaryButton({ className, style, children, ...p }: ButtonBaseProps) {
  const t = useButtonTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const borderColor = p.borderColor ?? ui.border;

  return (
    <button
      onClick={p.onClick}
      disabled={p.disabled || p.isLoading}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...baseBtn({
          ...p,
          bgColor: hovered ? ui.surfaceHover : ui.white,
          borderColor,
          textColor: p.textColor ?? ui.text,
          fontFamily: p.fontFamily ?? t.fontFamily,
          radius: p.radius ?? t.radius,
        }),
        border: `1px solid ${borderColor}`,
        transform: pressed ? 'scale(0.97)' : hovered ? 'translateY(-1px)' : 'translateY(0)',
        ...style,
      }}
      {...p}
    >
      {p.isLoading ? (
        <Icon
          name="loader-2"
          size={18}
          style={{ animation: 'eplx-spin 1s linear infinite' } as React.CSSProperties}
        />
      ) : p.icon ? (
        <Icon name={p.icon} size={18} />
      ) : (
        (p.iconNode ?? null)
      )}
      <span data-testid="secondary-btn">{children ?? p.label ?? 'Secondary'}</span>
    </button>
  );
}

export function TertiaryButton({ className, style, children, ...p }: ButtonBaseProps) {
  const t = useButtonTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={p.onClick}
      disabled={p.disabled || p.isLoading}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...baseBtn({
          ...p,
          bgColor: hovered ? ui.surface : 'transparent',
          textColor: p.textColor ?? ui.text,
          borderColor: 'transparent',
          fontFamily: p.fontFamily ?? t.fontFamily,
          radius: p.radius ?? t.radius,
        }),
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        ...style,
      }}
      {...p}
    >
      {p.isLoading ? (
        <Icon
          name="loader-2"
          size={18}
          style={{ animation: 'eplx-spin 1s linear infinite' } as React.CSSProperties}
        />
      ) : p.icon ? (
        <Icon name={p.icon} size={18} />
      ) : (
        (p.iconNode ?? null)
      )}
      <span>{children ?? p.label ?? 'Button'}</span>
    </button>
  );
}

export type IconButtonProps = ButtonBaseProps & { size?: number };

export function IconButton({ className, style, ...p }: IconButtonProps) {
  const t = useButtonTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const size = p.size ?? 44;

  return (
    <button
      onClick={p.onClick}
      disabled={p.disabled || p.isLoading}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...baseBtn({
          ...p,
          bgColor: hovered ? ui.surfaceHover : ui.white,
          textColor: p.textColor ?? ui.text,
          borderColor: ui.border,
          fontFamily: p.fontFamily ?? t.fontFamily,
        }),
        width: size,
        height: size,
        borderRadius: '50%',
        padding: 0,
        transform: pressed ? 'scale(0.94)' : hovered ? 'scale(1.03)' : 'scale(1)',
        ...style,
      }}
      {...p}
    >
      {p.isLoading ? (
        <Icon
          name="loader-2"
          size={18}
          style={{ animation: 'eplx-spin 1s linear infinite' } as React.CSSProperties}
        />
      ) : p.icon ? (
        <Icon name={p.icon} size={18} />
      ) : (
        p.iconNode
      )}
    </button>
  );
}

export type ButtonProps = ButtonBaseProps & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
};

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...props} />;
    case 'tertiary':
      return <TertiaryButton {...props} />;
    case 'icon':
      return <IconButton {...(props as IconButtonProps)} />;
    default:
      return <PrimaryButton {...props} />;
  }
}

export { PrimaryButton as ButtonAlias }; // Keeping alias if needed, but the main one is Button

// Remaining buttons follow same styling philosophy
// Logic untouched
// Only visuals simplified into shadcn-like minimal theme

export function FloatingActionButton({
  className,
  style,
  ...p
}: ButtonBaseProps & {
  position?: 'bottom-right' | 'bottom-left';
  offset?: number;
  fixed?: boolean;
}) {
  const t = useButtonTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const shadow = p.shadow ?? '0 8px 24px rgba(0,0,0,0.15)';
  const radius = p.radius ?? 999;
  const size = 56;
  const offset = p.offset ?? 24;

  const positionStyles: React.CSSProperties =
    p.fixed !== false
      ? {
          position: 'fixed',
          bottom: offset,
          right: p.position === 'bottom-left' ? undefined : offset,
          left: p.position === 'bottom-left' ? offset : undefined,
          zIndex: 50,
        }
      : {};

  return (
    <button
      onClick={p.onClick}
      disabled={p.disabled || p.isLoading}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...baseBtn({
          ...p,
          bgColor: p.bgColor ?? ui.black,
          textColor: p.textColor ?? ui.white,
          fontFamily: p.fontFamily ?? t.fontFamily,
          radius,
        }),
        ...positionStyles,
        width: size,
        height: size,
        padding: 0,
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.2)' : shadow,
        transform: pressed ? 'scale(0.94)' : hovered ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
        ...style,
      }}
      {...p}
    >
      {p.isLoading ? (
        <Icon
          name="loader-2"
          size={24}
          style={{ animation: 'eplx-spin 1s linear infinite' } as React.CSSProperties}
        />
      ) : p.icon ? (
        <Icon name={p.icon} size={24} />
      ) : (
        p.iconNode
      )}
    </button>
  );
}

export type GroupButtonItem = ButtonBaseProps & { active?: boolean; id?: string | number };

export interface ButtonGroupProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  buttons: GroupButtonItem[];
  toggle?: boolean;
  onChange?: (index: number) => void;
  bgColor?: string;
  radius?: number;
  accentColor?: string;
  borderColor?: string;
  gap?: number;
}

export function ButtonGroup({
  buttons,
  toggle,
  onChange,
  bgColor,
  radius,
  accentColor,
  borderColor,
  gap,
  className,
  style,
  ...rest
}: ButtonGroupProps) {
  const t = useButtonTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleButtonClick = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>,
    originalOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  ) => {
    if (toggle) {
      setActiveIndex(index);
    }
    if (onChange) onChange(index);
    if (originalOnClick) originalOnClick(e);
  };

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        background: bgColor ?? ui.surface,
        borderRadius: radius ?? t.radius ?? 8,
        border: `1px solid ${borderColor ?? ui.border}`,
        padding: 4,
        gap: gap ?? 4,
        ...style,
      }}
      {...rest}
    >
      {buttons.map((btn, i) => {
        const isActive = toggle ? activeIndex === i : btn.active;
        return (
          <button
            key={btn.id ?? i}
            onClick={(e) => handleButtonClick(i, e, btn.onClick)}
            disabled={btn.disabled}
            style={{
              ...baseBtn({
                ...btn,
                bgColor: isActive ? (accentColor ?? ui.white) : 'transparent',
                textColor: isActive ? ui.text : ui.muted,
                radius: (radius ?? t.radius ?? 8) - 2,
                shadow: isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                paddingX: 12,
                paddingY: 6,
              }),
              border: isActive ? `1px solid ${ui.border}` : '1px solid transparent',
              flex: 1,
            }}
            {...btn}
          >
            {btn.icon && <Icon name={btn.icon} size={16} />}
            <span>{btn.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function LoadingButton(p: ButtonBaseProps) {
  return <PrimaryButton {...p} isLoading={p.isLoading ?? true} label={p.label ?? 'Loading...'} />;
}

export function ShareButton(p: ButtonBaseProps & { url?: string }) {
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (p.onClick) {
      p.onClick(e);
      return;
    }
    const url = p.url ?? (typeof window !== 'undefined' ? window.location.href : '');
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ url }).catch(() => {
        if (typeof navigator !== 'undefined') navigator.clipboard.writeText(url);
      });
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <SecondaryButton
      {...p}
      label={p.label ?? 'Share'}
      icon={p.icon ?? 'share-2'}
      onClick={handleShare}
    />
  );
}

export function DownloadButton(p: ButtonBaseProps & { fileUrl?: string }) {
  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (p.onClick) {
      p.onClick(e);
    }
    if (p.fileUrl) {
      const link = document.createElement('a');
      link.href = p.fileUrl;
      link.download = '';
      link.click();
    }
  };
  return (
    <SecondaryButton
      {...p}
      label={p.label ?? 'Download'}
      icon={p.icon ?? 'download'}
      onClick={handleDownload}
    />
  );
}

export function PrintButton(p: ButtonBaseProps) {
  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (p.onClick) {
      p.onClick(e);
    } else if (typeof window !== 'undefined') {
      window.print();
    }
  };
  return (
    <SecondaryButton
      {...p}
      label={p.label ?? 'Print'}
      icon={p.icon ?? 'printer'}
      onClick={handlePrint}
    />
  );
}
