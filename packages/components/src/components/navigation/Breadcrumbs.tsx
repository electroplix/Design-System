'use client';
import type React from 'react';
import { Icon } from '../../core/icons';
import { useNavTheme } from '../../core/provider';

export type BreadcrumbItem = { label: string; href?: string };

export interface BreadcrumbsProps {
  as?: React.ElementType;
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  separatorColor?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const t = useNavTheme();

  const {
    as: Tag = 'nav',
    items,
    showHomeIcon = true,
    maxW = 1100,
    px = 20,
    py = 12,
    radius = 12,
    gap = 8,
    bgColor = t.bgColor ?? '#ffffff',
    textColor = t.textColor ?? '#09090b',
    accentColor = t.accentColor ?? '#18181b',
    borderColor = t.borderColor ?? '#e4e4e7',
    fontFamily = t.fontFamily,
    style = {},
    className = '',
  } = props;

  const sepColor = props.separatorColor ?? '#a1a1aa';
  const mutedColor = '#71717a';

  return (
    <Tag
      className={className}
      aria-label="Breadcrumb"
      style={{
        background: bgColor,
        color: textColor,
        fontFamily,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        border: `1px solid ${borderColor}`,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
    >
      <div style={{ marginInline: 'auto', maxWidth: maxW }}>
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            fontSize: 14,
          }}
        >
          {items.map((it, i) => {
            const isLast = i === items.length - 1;

            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap,
                }}
              >
                {i > 0 && (
                  <Icon name="chevron-right" size={14} color={sepColor} style={{ opacity: 0.8 }} />
                )}

                {it.href && !isLast ? (
                  <a
                    href={it.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: mutedColor,
                      textDecoration: 'none',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = accentColor;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = mutedColor;
                    }}
                  >
                    {i === 0 && showHomeIcon && <Icon name="home" size={14} color="currentColor" />}
                    {it.label}
                  </a>
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontWeight: 600,
                      color: isLast ? accentColor : textColor,
                    }}
                  >
                    {i === 0 && showHomeIcon && <Icon name="home" size={14} color="currentColor" />}
                    {it.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Tag>
  );
}
