'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../core/icons';
import { useOnboardingTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useOB() {
  const t = useOnboardingTheme();

  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#09090b',
    muted: '#71717a',
    bg: t.bgColor ?? '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    border: t.borderColor ?? '#e4e4e7',
    success: '#16a34a',
    danger: '#dc2626',
    r: t.radius ?? 16,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
    hs: t.headingSize ?? 18,
  };
}

/* ── FAQAccordion ───────────────────────────────────────── */

export interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQAccordionProps extends React.ComponentPropsWithoutRef<'div'> {
  items: FAQItem[];
  title?: string;
  allowMultiple?: boolean;
}

export function FAQAccordion({
  items = [],
  title = 'Frequently Asked Questions',
  allowMultiple = false,
  style = {},
  className = '',
  ...rest
}: FAQAccordionProps) {
  const ob = useOB();
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const n = new Set(allowMultiple ? prev : []);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div
      style={{
        fontFamily: ob.ff,
        color: ob.fg,
        maxWidth: 700,
        ...style,
      }}
      className={className}
      {...rest}
    >
      {title && (
        <h2
          style={{
            fontWeight: 700,
            fontSize: 24,
            marginBottom: 20,
            letterSpacing: '-0.035em',
            color: ob.fg,
          }}
        >
          {title}
        </h2>
      )}

      <div style={{ display: 'grid', gap: 8 }}>
        {items.map((it) => {
          const isO = open.has(it.id);

          return (
            <div
              key={it.id}
              style={{
                border: `1px solid ${isO ? '#d4d4d8' : ob.border}`,
                borderRadius: ob.r,
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                background: '#ffffff',
                boxShadow: isO
                  ? '0 8px 24px rgba(9, 9, 11, 0.06)'
                  : '0 1px 2px rgba(9, 9, 11, 0.03)',
              }}
            >
              <button
                onClick={() => toggle(it.id)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: isO ? ob.surface : '#ffffff',
                  border: 'none',
                  color: ob.fg,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: ob.ff,
                  textAlign: 'left',
                }}
              >
                {it.question}
                <Icon name={isO ? 'chevron-up' : 'chevron-down'} size={18} color={ob.muted} />
              </button>

              {isO && (
                <div
                  style={{
                    padding: '0 16px 14px',
                    fontSize: ob.bs,
                    lineHeight: 1.6,
                    color: ob.muted,
                  }}
                >
                  {it.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── OnboardingWizard ───────────────────────────────────── */

export interface OnboardingWizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  content?: React.ReactNode;
}

export interface OnboardingWizardProps extends React.ComponentPropsWithoutRef<'div'> {
  steps: OnboardingWizardStep[];
  onComplete?: () => void;
  completeLabel?: string;
}

export function OnboardingWizard({
  steps = [],
  onComplete,
  completeLabel = 'Finish',
  style = {},
  className = '',
  ...rest
}: OnboardingWizardProps) {
  const ob = useOB();
  const [idx, setIdx] = useState(0);
  const step = steps[idx];

  if (!step) return null;

  const isLast = idx === steps.length - 1;

  return (
    <div
      style={{
        fontFamily: ob.ff,
        color: ob.fg,
        maxWidth: 560,
        margin: '0 auto',
        ...style,
      }}
      className={className}
      {...rest}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 24,
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                background: i <= idx ? ob.accent : ob.surface,
                color: i <= idx ? '#ffffff' : ob.muted,
                border: `1px solid ${i <= idx ? ob.accent : ob.border}`,
                transition: 'all 0.2s',
                boxShadow: i <= idx ? '0 1px 2px rgba(9, 9, 11, 0.08)' : 'none',
              }}
            >
              {i < idx ? <Icon name="check" size={16} color="#ffffff" /> : i + 1}
            </div>

            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: i < idx ? ob.accent : ob.border,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          border: `1px solid ${ob.border}`,
          borderRadius: ob.r,
          padding: 24,
          background: '#ffffff',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
          }}
        >
          {step.icon && <Icon name={step.icon} size={22} color={ob.accent} />}

          <div
            style={{
              fontWeight: 700,
              fontSize: ob.hs,
              letterSpacing: '-0.025em',
              color: ob.fg,
            }}
          >
            {step.title}
          </div>
        </div>

        {step.description && (
          <p
            style={{
              fontSize: ob.bs,
              color: ob.muted,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {step.description}
          </p>
        )}

        {step.content && <div style={{ marginTop: 16 }}>{step.content}</div>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      >
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: `1px solid ${ob.border}`,
            background: '#ffffff',
            color: ob.fg,
            fontWeight: 600,
            cursor: idx === 0 ? 'not-allowed' : 'pointer',
            opacity: idx === 0 ? 0.45 : 1,
            fontSize: 14,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        >
          Back
        </button>

        <button
          onClick={() => (isLast ? onComplete?.() : setIdx(idx + 1))}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: `1px solid ${ob.accent}`,
            background: ob.accent,
            color: '#ffffff',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 14,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
          }}
        >
          {isLast ? completeLabel : 'Next'}
        </button>
      </div>
    </div>
  );
}

/* ── ProductTour ────────────────────────────────────────── */

export interface TourStep {
  id: string;
  title: string;
  content: string;
  targetSelector?: string;
}

export interface ProductTourProps extends React.ComponentPropsWithoutRef<'div'> {
  steps: TourStep[];
  isOpen: boolean;
  onClose?: () => void;
  onComplete?: () => void;
}

export function ProductTour({
  steps = [],
  isOpen,
  onClose,
  onComplete,
  style = {},
  className = '',
  ...rest
}: ProductTourProps) {
  const ob = useOB();
  const [idx, setIdx] = useState(0);

  if (!isOpen || !steps.length) return null;

  const step = steps[idx];
  const isLast = idx === steps.length - 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        ...style,
      }}
      className={className}
      {...rest}
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
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: ob.bg,
          border: `1px solid ${ob.border}`,
          borderRadius: ob.r,
          padding: 24,
          maxWidth: 380,
          width: '90%',
          fontFamily: ob.ff,
          color: ob.fg,
          boxShadow: '0 20px 45px rgba(9, 9, 11, 0.12), 0 4px 12px rgba(9, 9, 11, 0.06)',
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: ob.muted,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Step {idx + 1} of {steps.length}
        </div>

        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '-0.025em',
            color: ob.fg,
          }}
        >
          {step.title}
        </div>

        <p
          style={{
            fontSize: ob.bs,
            color: ob.muted,
            lineHeight: 1.6,
            marginTop: 8,
          }}
        >
          {step.content}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 16,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: 12,
              border: `1px solid ${ob.border}`,
              background: '#ffffff',
              color: ob.fg,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            Skip
          </button>

          <button
            onClick={() => {
              if (isLast) {
                onComplete?.();
                onClose?.();
              } else {
                setIdx(idx + 1);
              }
            }}
            style={{
              padding: '8px 14px',
              borderRadius: 12,
              border: `1px solid ${ob.accent}`,
              background: ob.accent,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
            }}
          >
            {isLast ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── TooltipHelp ────────────────────────────────────────── */

export interface TooltipHelpProps extends React.ComponentPropsWithoutRef<'span'> {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  iconSize?: number;
}

export function TooltipHelp({
  text,
  position = 'top',
  iconSize = 16,
  style = {},
  className = '',
  ...rest
}: TooltipHelpProps) {
  const ob = useOB();
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
      style={{
        position: 'relative',
        display: 'inline-flex',
        cursor: 'help',
        ...style,
      }}
      className={className}
      onMouseEnter={(e) => {
        setShow(true);
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setShow(false);
        rest.onMouseLeave?.(e);
      }}
      {...rest}
    >
      <Icon name="help-circle" size={iconSize} color={ob.muted} />

      {show && (
        <span
          style={{
            position: 'absolute',
            ...pos,
            whiteSpace: 'nowrap',
            padding: '6px 12px',
            borderRadius: 10,
            background: '#ffffff',
            border: `1px solid ${ob.border}`,
            color: ob.fg,
            fontSize: 13,
            fontFamily: ob.ff,
            pointerEvents: 'none',
            zIndex: 50,
            maxWidth: 240,
            boxShadow: '0 8px 20px rgba(9, 9, 11, 0.08)',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

/* ── SupportChat ────────────────────────────────────────── */

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  time?: string;
}

export interface SupportChatProps {
  messages?: Message[];
  onSend?: (text: string) => void;
  title?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function SupportChat({
  messages = [],
  onSend,
  title = 'Support Chat',
  isOpen = false,
  onToggle,
}: SupportChatProps) {
  const ob = useOB();
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      onSend?.(text.trim());
      setText('');
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `1px solid ${ob.accent}`,
          background: ob.accent,
          color: '#ffffff',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(9, 9, 11, 0.18), 0 2px 8px rgba(9, 9, 11, 0.08)',
        }}
      >
        <Icon name={isOpen ? 'x' : 'message-circle'} size={24} color="#ffffff" />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            width: 360,
            maxHeight: 480,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: ob.r,
            border: `1px solid ${ob.border}`,
            background: ob.bg,
            zIndex: 9999,
            fontFamily: ob.ff,
            color: ob.fg,
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(9, 9, 11, 0.12), 0 4px 12px rgba(9, 9, 11, 0.06)',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              borderBottom: `1px solid ${ob.border}`,
              background: ob.surface,
              fontWeight: 700,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              letterSpacing: '-0.02em',
            }}
          >
            <Icon name="message-circle" size={18} color={ob.accent} />
            {title}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 12,
              display: 'grid',
              gap: 8,
              background: '#ffffff',
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: 14,
                  background: m.sender === 'user' ? ob.accent : ob.surface,
                  border: m.sender === 'user' ? `1px solid ${ob.accent}` : `1px solid ${ob.border}`,
                  color: m.sender === 'user' ? '#ffffff' : ob.fg,
                  fontSize: 14,
                  lineHeight: 1.45,
                  boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
                }}
              >
                {m.text}

                {m.time && (
                  <div
                    style={{
                      fontSize: 10,
                      opacity: 0.65,
                      marginTop: 4,
                      textAlign: 'right',
                    }}
                  >
                    {m.time}
                  </div>
                )}
              </div>
            ))}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={send}
            style={{
              display: 'flex',
              gap: 8,
              padding: '10px 12px',
              borderTop: `1px solid ${ob.border}`,
              background: ob.surface,
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 12,
                border: `1px solid ${ob.border}`,
                background: '#ffffff',
                color: ob.fg,
                fontSize: 14,
                outline: 'none',
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
              }}
            />

            <button
              type="submit"
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: `1px solid ${ob.accent}`,
                background: ob.accent,
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
              }}
            >
              <Icon name="send" size={18} color="#ffffff" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* ── ContactSupportBlock ────────────────────────────────── */

export interface ContactSupportBlockProps {
  email?: string;
  phone?: string;
  title?: string;
  description?: string;
}

export function ContactSupportBlock({
  email,
  phone,
  title = 'Need Help?',
  description = 'Our team is here to help.',
}: ContactSupportBlockProps) {
  const ob = useOB();

  return (
    <div
      style={{
        border: `1px solid ${ob.border}`,
        borderRadius: ob.r,
        padding: 24,
        fontFamily: ob.ff,
        color: ob.fg,
        textAlign: 'center',
        background: ob.bg,
        maxWidth: 420,
        margin: '0 auto',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: ob.surface,
          border: `1px solid ${ob.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        <Icon name="headphones" size={24} color={ob.accent} />
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: '-0.03em',
          color: ob.fg,
        }}
      >
        {title}
      </div>

      <p
        style={{
          fontSize: 14,
          color: ob.muted,
          marginTop: 6,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginTop: 16,
        }}
      >
        {email && (
          <a
            href={`mailto:${email}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 12,
              border: `1px solid ${ob.border}`,
              color: ob.fg,
              background: '#ffffff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <Icon name="mail" size={18} color={ob.muted} />
            {email}
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 12,
              border: `1px solid ${ob.border}`,
              color: ob.fg,
              background: '#ffffff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <Icon name="phone" size={18} color={ob.muted} />
            {phone}
          </a>
        )}
      </div>
    </div>
  );
}
