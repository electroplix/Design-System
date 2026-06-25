'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon, type IconName } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export interface InputFieldProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  as?: React.ElementType;
  label?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  helpText?: string;
  required?: boolean;
  error?: string;
  icon?: string;
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

export function InputField(props: InputFieldProps) {
  const t = useFormsTheme();
  const {
    as: Tag = 'div',
    label = 'Input Field',
    name = 'input',
    type = 'text',
    value,
    defaultValue,
    placeholder = 'Enter text...',
    onChange,
    helpText,
    required,
    error,
    icon,
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
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(defaultValue || '');
  const cur = value ?? localValue;
  const hasError = !!error;
  const bord = hasError ? '#EF4444' : isFocused ? accentColor : borderColor;

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
        {label && (
          <label
            htmlFor={name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: labelSize,
              fontWeight: 600,
            }}
          >
            {label}
            {required && <span style={{ color: '#EF4444' }}>*</span>}
          </label>
        )}
        <div style={{ position: 'relative' as const }}>
          {icon && (
            <div
              style={{
                position: 'absolute' as const,
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: isFocused ? accentColor : 'rgba(255,255,255,0.4)',
                transition: 'color 0.2s ease',
              }}
            >
              <Icon name={icon as IconName} size={18} />
            </div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            value={cur}
            placeholder={placeholder}
            required={required}
            onChange={(e) => {
              setLocalValue(e.target.value);
              onChange?.(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: '100%',
              padding: icon ? '14px 14px 14px 44px' : '14px',
              borderRadius: radius,
              border: `1px solid ${bord}`,
              background: hasError ? 'rgba(239,68,68,0.05)' : inputBg,
              color: textColor,
              fontSize: inputSize,
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow:
                isFocused && !hasError
                  ? `0 0 0 3px ${accentColor}20`
                  : hasError
                    ? '0 0 0 3px rgba(239,68,68,0.2)'
                    : 'none',
              boxSizing: 'border-box' as const,
            }}
          />
        </div>
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              color: '#EF4444',
            }}
          >
            <Icon name="alert-circle" size={14} />
            {error}
          </div>
        )}
        {helpText && !error && <div style={{ fontSize: 12, opacity: 0.6 }}>{helpText}</div>}
      </div>
    </Tag>
  );
}
