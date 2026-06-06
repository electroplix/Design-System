'use client';
import type React from 'react';
import { useMemo, useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export interface TextAreaFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  as?: React.ElementType;
  label?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  onChange?: (v: string) => void;
  showPreview?: boolean;
  maxLength?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  inputBg?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  labelSize?: number;
  inputSize?: number;
}

export function TextAreaField(props: TextAreaFieldProps) {
  const t = useFormsTheme();
  const {
    as: Tag = 'div',
    label = 'Message',
    name = 'textarea',
    value,
    defaultValue,
    placeholder = 'Write your message here...',
    rows = 5,
    onChange,
    showPreview = false,
    maxLength,
    bgColor = t.bgColor,
    textColor = t.textColor,
    accentColor = t.accentColor,
    borderColor = t.borderColor,
    inputBg = t.inputBg ?? 'rgba(255,255,255,0.05)',
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 0,
    py = t.py ?? 0,
    radius = t.cardRadius ?? 12,
    gap = t.gap ?? 12,
    labelSize = 13,
    inputSize = 14,
    style = {},
    className = '',
    ...rest
  } = props;
  const [local, setLocal] = useState(defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(showPreview);
  const text = value ?? local;
  const isOver = maxLength ? text.length > maxLength : false;

  const preview = useMemo(() => {
    if (!previewVisible) return '';
    let html = (text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(
      /`([^`]+?)`/g,
      "<code style='background:rgba(139,92,246,0.2);padding:2px 6px;border-radius:4px;font-size:13px'>$1</code>",
    );
    html = html.replace(/\n/g, '<br/>');
    return html;
  }, [text, previewVisible]);

  return (
    <Tag
      className={className}
      style={{
        background: bgColor,
        color: textColor,
        fontFamily,
        padding: `${py}px ${px}px`,
        ...style,
      }}
      {...rest}
    >
      <div style={{ maxWidth: maxW, display: 'flex', flexDirection: 'column' as const, gap }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {label && (
            <label htmlFor={name} style={{ fontSize: labelSize, fontWeight: 600 }}>
              {label}
            </label>
          )}
          <button
            type="button"
            onClick={() => setPreviewVisible(!previewVisible)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 8,
              border: `1px solid ${borderColor}`,
              background: previewVisible ? `${accentColor}15` : 'transparent',
              color: previewVisible ? accentColor : textColor,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            <Icon name={previewVisible ? 'eye-off' : 'eye'} size={14} />
            {previewVisible ? 'Hide' : 'Preview'}
          </button>
        </div>
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={text}
          placeholder={placeholder}
          onChange={(e) => {
            setLocal(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: radius,
            border: `1px solid ${isOver ? '#EF4444' : isFocused ? accentColor : borderColor}`,
            background: inputBg,
            color: textColor,
            fontSize: inputSize,
            outline: 'none',
            resize: 'vertical' as const,
            transition: 'all 0.2s ease',
            boxShadow: isFocused
              ? `0 0 0 3px ${isOver ? 'rgba(239,68,68,0.2)' : `${accentColor}20`}`
              : 'none',
            lineHeight: 1.6,
            boxSizing: 'border-box' as const,
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: 12,
            color: isOver ? '#EF4444' : 'rgba(255,255,255,0.5)',
          }}
        >
          {text.length}
          {maxLength && ` / ${maxLength}`} characters
        </div>
        {previewVisible && text && (
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              border: `1px dashed ${borderColor}`,
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                opacity: 0.5,
                marginBottom: 10,
                textTransform: 'uppercase' as const,
                letterSpacing: 1,
              }}
            >
              Preview
            </div>
            <div
              style={{ fontSize: inputSize, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        )}
      </div>
    </Tag>
  );
}
