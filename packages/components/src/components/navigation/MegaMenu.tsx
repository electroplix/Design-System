'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useNavTheme } from '../../core/provider';

export type MenuLink = {
  label: string;
  href: string;
  description?: string;
};

export type MegaMenuSection = {
  title: string;
  links: MenuLink[];
};

export interface MegaMenuProps extends React.ComponentPropsWithoutRef<'nav'> {
  as?: React.ElementType;
  label: string;
  sections: MegaMenuSection[];
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function MegaMenu({
  as: Tag = 'div',
  label,
  sections,
  maxW = 800,
  px = 24,
  py = 24,
  radius = 16,
  bgColor: bgColorProp,
  textColor: textColorProp,
  accentColor: accentColorProp,
  borderColor: borderColorProp,
  fontFamily: fontFamilyProp,
  style = {},
  className = '',
  ...rest
}: MegaMenuProps) {
  const t = useNavTheme();

  const _bgColor = bgColorProp ?? t.bgColor ?? '#ffffff';
  const textColor = textColorProp ?? t.textColor ?? '#09090b';
  const accentColor = accentColorProp ?? t.accentColor ?? '#18181b';
  const borderColor = borderColorProp ?? t.borderColor ?? '#e4e4e7';
  const fontFamily = fontFamilyProp ?? t.fontFamily;

  const mutedColor = '#71717a';
  const surfaceColor = '#fafafa';

  const [open, setOpen] = useState(false);

  return (
    <Tag
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily,
        ...style,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...rest}
    >
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          borderRadius: 12,
          border: `1px solid ${open ? accentColor : borderColor}`,
          background: open ? surfaceColor : '#ffffff',
          color: open ? accentColor : textColor,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: 14,
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        {label}

        <Icon
          name="chevron-down"
          size={16}
          color={open ? accentColor : mutedColor}
          style={{
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            minWidth: maxW,
            background: '#ffffff',
            border: `1px solid ${borderColor}`,
            borderRadius: radius,
            padding: py,
            paddingInline: px,
            zIndex: 50,
            boxShadow: '0 24px 64px rgba(9, 9, 11, 0.12), 0 4px 12px rgba(9, 9, 11, 0.05)',
            display: 'grid',
            gridTemplateColumns: `repeat(${sections.length}, 1fr)`,
            gap: 32,
          }}
        >
          {sections.map((sec, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: mutedColor,
                  marginBottom: 16,
                }}
              >
                {sec.title}
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 6,
                }}
              >
                {sec.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '12px 14px',
                      borderRadius: 12,
                      color: textColor,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;

                      el.style.background = surfaceColor;
                      el.style.borderColor = borderColor;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;

                      el.style.background = 'transparent';
                      el.style.borderColor = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: textColor,
                        }}
                      >
                        {link.label}
                      </span>

                      <Icon
                        name="external-link"
                        size={12}
                        color={mutedColor}
                        style={{ opacity: 0.7 }}
                      />
                    </div>

                    {link.description && (
                      <div
                        style={{
                          fontSize: 12,
                          color: mutedColor,
                          marginTop: 5,
                          lineHeight: 1.5,
                        }}
                      >
                        {link.description}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Tag>
  );
}
