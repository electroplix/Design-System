'use client';
import type React from 'react';
import { type ReactNode, useEffect, useState } from 'react';
import { Icon } from '../../core/icons';
import { useNavTheme } from '../../core/provider';

export type DrawerLink = {
  label: string;
  href: string;
  icon?: ReactNode;
};

export interface SideDrawerNavProps extends React.ComponentPropsWithoutRef<'div'> {
  links: DrawerLink[];
  width?: number;
  padding?: number;
  gap?: number;
  overlayColor?: string;
  position?: 'left' | 'right';
  logoText?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function SideDrawerNav({
  links,
  width = 300,
  padding = 24,
  gap = 8,
  overlayColor = 'rgba(9, 9, 11, 0.45)',
  position = 'left',
  logoText = 'Menu',
  bgColor: bgColorProp,
  textColor: textColorProp,
  accentColor: accentColorProp,
  borderColor: borderColorProp,
  fontFamily: fontFamilyProp,
  className,
  style,
  ...rest
}: SideDrawerNavProps) {
  const t = useNavTheme();

  const bgColor = bgColorProp ?? t.bgColor ?? '#ffffff';
  const textColor = textColorProp ?? t.textColor ?? '#09090b';
  const accentColor = accentColorProp ?? t.accentColor ?? '#18181b';
  const borderColor = borderColorProp ?? t.borderColor ?? '#e4e4e7';
  const fontFamily = fontFamilyProp ?? t.fontFamily;

  const mutedColor = '#71717a';
  const surfaceColor = '#fafafa';

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  return (
    <div className={className} style={style} {...rest}>
      <button
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="side-drawer-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          background: '#ffffff',
          color: textColor,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: 14,
          fontFamily,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          width: 'fit-content',
        }}
      >
        <Icon name="menu" size={18} color={textColor} />
        Open Menu
      </button>

      {open && (
        <div
          id="side-drawer-nav"
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
          }}
        >
          <div
            style={{
              flex: 1,
              background: overlayColor,
              backdropFilter: 'blur(6px)',
            }}
            onClick={() => setOpen(false)}
          />

          <aside
            style={{
              width,
              background: bgColor,
              color: textColor,
              padding,
              fontFamily,
              height: '100%',
              overflowY: 'auto',
              borderLeft: position === 'right' ? `1px solid ${borderColor}` : 'none',
              borderRight: position === 'left' ? `1px solid ${borderColor}` : 'none',
              boxShadow: '0 20px 45px rgba(9, 9, 11, 0.12), 0 4px 12px rgba(9, 9, 11, 0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  color: textColor,
                  letterSpacing: '-0.035em',
                  lineHeight: 1,
                }}
              >
                {logoText}
              </span>

              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  border: `1px solid ${borderColor}`,
                  background: surfaceColor,
                  color: textColor,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
                }}
              >
                <Icon name="x" size={18} color={mutedColor} />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gap,
              }}
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 12,
                    color: mutedColor,
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: 15,
                    transition: 'all 0.2s ease',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;

                    el.style.background = surfaceColor;
                    el.style.color = accentColor;
                    el.style.borderColor = borderColor;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;

                    el.style.background = 'transparent';
                    el.style.color = mutedColor;
                    el.style.borderColor = 'transparent';
                  }}
                >
                  {l.icon}
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
