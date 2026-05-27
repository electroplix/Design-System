'use client';
import type React from 'react';
import { useFormsTheme } from '../../core/provider';

export interface FormShellProps {
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
  children?: React.ReactNode;
}

export function FormShell(props: FormShellProps) {
  const t = useFormsTheme();
  const {
    as: Tag = 'section',
    bgColor = t.bgColor,
    textColor = t.textColor,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 24,
    py = t.py ?? 24,
    radius = t.cardRadius ?? 16,
    gap = t.gap ?? 16,
    style = {},
    className = '',
    children,
  } = props;
  return (
    <Tag
      className={className}
      style={{
        background: bgColor,
        color: textColor,
        fontFamily,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        ...style,
      }}
    >
      <div style={{ marginInline: 'auto', maxWidth: maxW, display: 'grid', gap }}>{children}</div>
    </Tag>
  );
}
