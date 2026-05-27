'use client';

import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export interface ContactFormProps {
  as?: React.ElementType;
  title?: string;
  onSubmit?: (data: {
    name: string;
    email: string;
    message: string;
  }) => void;
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
  titleSize?: number;
  labelSize?: number;
  inputSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  success: '#16a34a',
  successSoft: '#f0fdf4',
  ring: 'rgba(9,9,11,0.08)',
};

export function ContactForm(props: ContactFormProps) {
  const t = useFormsTheme();

  const {
    as: Tag = 'section',
    title = 'Contact us',
    onSubmit,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    inputBg,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 24,
    py = t.py ?? 24,
    radius = t.cardRadius ?? 16,
    gap = t.gap ?? 16,
    titleSize = 18,
    labelSize = 13,
    inputSize = 14,
    style = {},
    className = '',
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;
  const inputSurface = inputBg ?? t.inputBg ?? ui.white;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const iStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 14px 14px 44px',
    borderRadius: 12,
    border: `1px solid ${focused === field ? accent : border}`,
    background: inputSurface,
    color: fg,
    fontSize: inputSize,
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === field ? `0 0 0 4px ${ui.ring}` : '0 1px 2px rgba(9,9,11,0.04)',
    boxSizing: 'border-box',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit?.({
      name,
      email,
      message,
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMsg('');
    }, 3000);
  };

  return (
    <Tag
      className={className}
      style={{
        background: bg,
        color: fg,
        fontFamily,
        padding: `${py}px ${px}px`,
        borderRadius: radius,
        border: `1px solid ${border}`,
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        ...style,
      }}
    >
      <div
        style={{
          marginInline: 'auto',
          maxWidth: maxW,
          display: 'flex',
          flexDirection: 'column',
          gap,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: ui.black,
              border: `1px solid ${border}`,
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 1px 2px rgba(9,9,11,0.08)',
            }}
          >
            <Icon name="message-square" size={20} style={{ color: ui.white } as any} />
          </div>

          <div>
            <strong
              style={{
                fontSize: titleSize,
                fontWeight: 700,
                color: fg,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </strong>

            <div
              style={{
                fontSize: 12,
                color: ui.muted,
                marginTop: 2,
              }}
            >
              We'd love to hear from you
            </div>
          </div>
        </div>

        {/* Success State */}
        {submitted ? (
          <div
            style={{
              padding: 24,
              borderRadius: 14,
              background: ui.successSoft,
              border: '1px solid rgba(22,163,74,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              textAlign: 'center',
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '999px',
                background: ui.success,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Icon name="check" size={24} style={{ color: ui.white } as any} />
            </div>

            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: fg,
              }}
            >
              Message Sent!
            </div>

            <div
              style={{
                color: ui.muted,
                fontSize: 14,
              }}
            >
              We'll get back to you soon.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: labelSize,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: fg,
                }}
              >
                Name
              </label>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focused === 'name' ? accent : ui.muted,
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    zIndex: 2,
                  }}
                >
                  <Icon name="user" size={18} />
                </div>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="John Doe"
                  style={iStyle('name')}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: labelSize,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: fg,
                }}
              >
                Email
              </label>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focused === 'email' ? accent : ui.muted,
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    zIndex: 2,
                  }}
                >
                  <Icon name="mail" size={18} />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="john@example.com"
                  style={iStyle('email')}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: labelSize,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: fg,
                }}
              >
                Message
              </label>

              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMsg(e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                placeholder="How can we help you?"
                required
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 12,
                  border: `1px solid ${focused === 'message' ? accent : border}`,
                  background: inputSurface,
                  color: fg,
                  fontSize: inputSize,
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.2s ease',
                  boxShadow:
                    focused === 'message' ? `0 0 0 4px ${ui.ring}` : '0 1px 2px rgba(9,9,11,0.04)',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                padding: '14px 20px',
                borderRadius: 12,
                border: `1px solid ${ui.black}`,
                background: ui.black,
                color: ui.white,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 2px rgba(9,9,11,0.12)',
              }}
            >
              <Icon name="send" size={18} />
              Send Message
            </button>
          </form>
        )}
      </div>
    </Tag>
  );
}
