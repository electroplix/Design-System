'use client';

import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useFormsTheme } from '../../core/provider';

export type WizardStep = {
  title: string;
  description?: string;
  content: React.ReactNode;
  validate?: () => string[];
};

export interface MultiStepWizardProps extends React.ComponentPropsWithoutRef<'section'> {
  as?: React.ElementType;
  steps: WizardStep[];
  onFinish?: () => void;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  titleSize?: number;
  descSize?: number;
  navBtnSize?: number;
}

const ui = {
  white: '#ffffff',
  black: '#09090b',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  danger: '#ef4444',
  dangerSoft: '#fef2f2',
  ring: 'rgba(9,9,11,0.08)',
};

export function MultiStepWizard(props: MultiStepWizardProps) {
  const t = useFormsTheme();

  const {
    as: Tag = 'section',
    steps = [],
    onFinish,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 24,
    py = t.py ?? 24,
    radius = t.cardRadius ?? 16,
    gap = t.gap ?? 16,
    titleSize = 18,
    descSize = 14,
    navBtnSize = 14,
    style = {},
    className = '',
    ...rest
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;

  const [idx, setIdx] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const safeSteps = Array.isArray(steps) ? steps : [];
  const step = safeSteps[idx] || { title: 'Step', content: null };

  const next = () => {
    const errs = step.validate?.() ?? [];
    setErrors(errs);

    if (errs.length) return;

    if (idx < safeSteps.length - 1) {
      setIdx((i) => i + 1);
    } else {
      onFinish?.();
    }
  };

  const back = () => {
    setErrors([]);
    setIdx((i) => Math.max(0, i - 1));
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
      {...rest}
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
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
          }}
        >
          {safeSteps.map((_, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: '999px',
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
                fontWeight: 600,
                background: i < idx ? ui.black : i === idx ? ui.surface : ui.white,
                color: i < idx ? ui.white : i === idx ? fg : ui.muted,
                border: `1px solid ${i <= idx ? ui.black : border}`,
                transition: 'all 0.2s ease',
                boxShadow: i === idx ? `0 0 0 4px ${ui.ring}` : '0 1px 2px rgba(9,9,11,0.04)',
              }}
            >
              {i < idx ? <Icon name="check" size={14} /> : i + 1}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 12, color: ui.muted }}>
            Step {idx + 1} of {safeSteps.length || 1}
          </span>

          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: fg,
            }}
          >
            {safeSteps.length > 0 ? Math.round(((idx + 1) / safeSteps.length) * 100) : 0}%
          </span>
        </div>

        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: ui.surface,
            border: `1px solid ${border}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: safeSteps.length > 0 ? `${((idx + 1) / safeSteps.length) * 100}%` : '0%',
              background: accent,
              borderRadius: 999,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <div
          style={{
            padding: 20,
            borderRadius: 12,
            background: ui.surface,
            border: `1px solid ${border}`,
            boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
          }}
        >
          <strong
            style={{
              fontSize: titleSize,
              display: 'block',
              marginBottom: 8,
              color: fg,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {step.title}
          </strong>

          {step.description && (
            <div
              style={{
                fontSize: descSize,
                color: ui.muted,
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              {step.description}
            </div>
          )}

          <div>{step.content}</div>
        </div>

        {errors.length > 0 && (
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              background: ui.dangerSoft,
              border: '1px solid rgba(239,68,68,0.18)',
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Icon name="alert-circle" size={16} style={{ color: ui.danger } as any} />

              <strong
                style={{
                  fontSize: 14,
                  color: ui.danger,
                  fontWeight: 700,
                }}
              >
                Please fix the following:
              </strong>
            </div>

            <ul
              style={{
                margin: 0,
                paddingInlineStart: 24,
                color: ui.danger,
                fontSize: 13,
              }}
            >
              {errors.map((e, i) => (
                <li key={i} style={{ lineHeight: 1.6 }}>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={back}
            disabled={idx === 0}
            style={{
              padding: '12px 20px',
              borderRadius: 10,
              border: `1px solid ${border}`,
              background: ui.white,
              color: idx === 0 ? ui.muted : fg,
              cursor: idx === 0 ? 'not-allowed' : 'pointer',
              opacity: idx === 0 ? 0.55 : 1,
              fontSize: navBtnSize,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <Icon name="chevron-left" size={18} />
            Back
          </button>

          <button
            type="button"
            onClick={next}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: `1px solid ${ui.black}`,
              background: ui.black,
              color: ui.white,
              cursor: 'pointer',
              fontSize: navBtnSize,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(9,9,11,0.12)',
            }}
          >
            {idx < safeSteps.length - 1 ? (
              <>
                Next
                <Icon name="chevron-right" size={18} />
              </>
            ) : (
              <>
                <Icon name="check" size={18} />
                Finish
              </>
            )}
          </button>
        </div>
      </div>
    </Tag>
  );
}
