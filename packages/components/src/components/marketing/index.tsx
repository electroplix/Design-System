'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '../../core/icons';
import { useMarketingTheme } from '../../core/provider';

function useMK() {
  const t = useMarketingTheme();

  return {
    accent: t.accentColor ?? '#09090b',
    fg: t.textColor ?? '#18181b',
    bg: t.bgColor ?? '#ffffff',
    border: t.borderColor ?? '#e4e4e7',
    r: t.radius ?? 14,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    hs: t.headingSize ?? 18,
    bs: t.bodySize ?? 14,
    cardBg: t.cardBg ?? '#ffffff',
    cardBorder: t.cardBorder ?? '#e4e4e7',
    cardRadius: t.cardRadius ?? 12,
  };
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
  danger: '#ef4444',
};

/* ── ComparisonTable ────────────────────────────────────── */

export interface ComparisonPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  cta?: string;
  highlighted?: boolean;
}

export interface ComparisonFeature {
  label: string;
  values: Record<string, boolean | string>;
}

export interface ComparisonTableProps {
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  title?: string;
  onSelect?: (planId: string) => void;
}

export function ComparisonTable({
  plans = [],
  features = [],
  title,
  onSelect,
}: ComparisonTableProps) {
  const mk = useMK();

  return (
    <section
      style={{
        border: `1px solid ${mk.border}`,
        borderRadius: mk.r,
        overflow: 'hidden',
        background: ui.white,
        color: mk.fg,
        fontFamily: mk.ff,
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
      }}
    >
      {title && (
        <div
          style={{
            padding: '16px 20px',
            fontWeight: 700,
            fontSize: mk.hs,
            borderBottom: `1px solid ${mk.border}`,
          }}
        >
          {title}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: ui.surface }}>
              <th
                style={{
                  padding: '14px 20px',
                  textAlign: 'left',
                  borderBottom: `1px solid ${mk.border}`,
                  color: ui.muted,
                  fontSize: mk.bs,
                }}
              >
                Feature
              </th>

              {plans.map((p) => (
                <th
                  key={p.id}
                  style={{
                    padding: '16px 20px',
                    textAlign: 'center',
                    borderBottom: `1px solid ${p.highlighted ? mk.accent : mk.border}`,
                    background: p.highlighted ? ui.white : ui.surface,
                    minWidth: 140,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>

                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: mk.fg,
                      margin: '4px 0',
                    }}
                  >
                    {p.price}
                  </div>

                  {p.period && <div style={{ fontSize: 12, color: ui.muted }}>/ {p.period}</div>}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {features.map((f) => (
              <tr key={f.label} style={{ borderBottom: `1px solid ${mk.border}` }}>
                <td style={{ padding: '13px 20px', fontSize: mk.bs }}>{f.label}</td>

                {plans.map((p) => {
                  const v = f.values[p.id];

                  return (
                    <td
                      key={p.id}
                      style={{
                        padding: '13px 20px',
                        textAlign: 'center',
                        background: p.highlighted ? ui.surface : ui.white,
                      }}
                    >
                      {typeof v === 'boolean' ? (
                        <Icon
                          name={v ? 'check' : 'x'}
                          size={18}
                          color={v ? ui.success : ui.danger}
                        />
                      ) : (
                        <span style={{ fontSize: 14 }}>{v ?? '—'}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td />

              {plans.map((p) => (
                <td key={p.id} style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => onSelect?.(p.id)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: mk.r - 4,
                      border: p.highlighted ? `1px solid ${mk.accent}` : `1px solid ${mk.border}`,
                      background: p.highlighted ? mk.accent : ui.white,
                      color: p.highlighted ? ui.white : mk.fg,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 14,
                      boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                    }}
                  >
                    {p.cta ?? 'Choose'}
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

/* ── CountdownTimer ─────────────────────────────────────── */

export interface CountdownTimerProps {
  targetDate: string | Date;
  label?: string;
  onExpire?: () => void;
  accentColor?: string;
}

export function CountdownTimer({ targetDate, label, onExpire, accentColor }: CountdownTimerProps) {
  const mk = useMK();
  const acc = accentColor ?? mk.accent;

  const calc = () => {
    const d = new Date(targetDate).getTime() - Date.now();

    if (d <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };

    return {
      d: Math.floor(d / 86400000),
      h: Math.floor((d % 86400000) / 3600000),
      m: Math.floor((d % 3600000) / 60000),
      s: Math.floor((d % 60000) / 1000),
      done: false,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => {
      const t = calc();

      setTime(t);

      if (t.done) {
        clearInterval(id);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  const Seg = ({ val, lbl }: { val: number; lbl: string }) => (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          background: ui.white,
          border: `1px solid ${mk.border}`,
          borderRadius: mk.r,
          width: 72,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontWeight: 800,
          color: acc,
          fontVariantNumeric: 'tabular-nums',
          boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        }}
      >
        {String(val).padStart(2, '0')}
      </div>

      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          marginTop: 6,
          color: ui.muted,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {lbl}
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: 'center', fontFamily: mk.ff, color: mk.fg }}>
      {label && <div style={{ fontWeight: 700, fontSize: mk.hs, marginBottom: 16 }}>{label}</div>}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Seg val={time.d} lbl="Days" />
        <Seg val={time.h} lbl="Hours" />
        <Seg val={time.m} lbl="Min" />
        <Seg val={time.s} lbl="Sec" />
      </div>
    </div>
  );
}

/* ── FeatureHighlights ──────────────────────────────────── */

export interface USP {
  id: string;
  icon?: string;
  title: string;
  description?: string;
}

export interface FeatureHighlightsProps {
  items: USP[];
  columns?: number | string;
  title?: string;
}

export function FeatureHighlights({ items = [], columns = 3, title }: FeatureHighlightsProps) {
  const mk = useMK();

  return (
    <div style={{ fontFamily: mk.ff, color: mk.fg }}>
      {title && (
        <div
          style={{
            fontWeight: 800,
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 24,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 20,
        }}
      >
        {items.map((u) => (
          <div
            key={u.id}
            style={{
              textAlign: 'center',
              padding: 24,
              border: `1px solid ${mk.border}`,
              borderRadius: mk.r,
              background: ui.white,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '999px',
                background: ui.surface,
                border: `1px solid ${mk.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Icon name={u.icon ?? 'star'} size={24} color={mk.accent} />
            </div>

            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{u.title}</div>

            {u.description && (
              <div style={{ fontSize: 14, color: ui.muted, lineHeight: 1.6 }}>{u.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── LeadMagnetGate ─────────────────────────────────────── */

export interface LeadMagnetGateProps {
  title: string;
  description?: string;
  inputPlaceholder?: string;
  ctaLabel?: string;
  onSubmit?: (email: string) => void;
  children?: React.ReactNode;
}

export function LeadMagnetGate({
  title,
  description,
  inputPlaceholder = 'Enter your email',
  ctaLabel = 'Get Access',
  onSubmit,
  children,
}: LeadMagnetGateProps) {
  const mk = useMK();
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.includes('@')) {
      onSubmit?.(email);
      setUnlocked(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div
      style={{
        border: `1px solid ${mk.border}`,
        borderRadius: mk.r,
        padding: 32,
        textAlign: 'center',
        background: ui.white,
        fontFamily: mk.ff,
        color: mk.fg,
        maxWidth: 480,
        margin: '0 auto',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '999px',
          background: ui.surface,
          border: `1px solid ${mk.border}`,
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto',
        }}
      >
        <Icon name="lock" size={28} color={mk.accent} />
      </div>

      <div style={{ fontWeight: 800, fontSize: 22, marginTop: 16 }}>{title}</div>

      {description && (
        <div
          style={{
            fontSize: 14,
            color: ui.muted,
            marginTop: 8,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      )}

      <form onSubmit={handle} style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={inputPlaceholder}
          type="email"
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: mk.r - 4,
            border: `1px solid ${mk.border}`,
            background: ui.white,
            color: mk.fg,
            fontSize: 14,
            outline: 'none',
            boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
          }}
        />

        <button
          type="submit"
          style={{
            padding: '12px 20px',
            borderRadius: mk.r - 4,
            border: `1px solid ${mk.accent}`,
            background: mk.accent,
            color: ui.white,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {ctaLabel}
        </button>
      </form>
    </div>
  );
}

/* ── MarketingHeroBlock ─────────────────────────────────── */

export interface MarketingHeroBlockProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  bgImage?: string;
}

export function MarketingHeroBlock({
  eyebrow,
  headline,
  subheadline,
  ctaLabel = 'Get Started',
  onCtaClick,
  secondaryLabel,
  onSecondaryClick,
  bgImage,
}: MarketingHeroBlockProps) {
  const mk = useMK();

  return (
    <section
      style={{
        padding: '80px 32px',
        textAlign: 'center',
        fontFamily: mk.ff,
        color: bgImage ? ui.white : mk.fg,
        background: bgImage ? undefined : ui.white,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: mk.r,
        border: `1px solid ${mk.border}`,
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
      }}
    >
      {bgImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(9,9,11,0.68)',
          }}
        />
      )}

      <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
        {eyebrow && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: bgImage ? ui.white : ui.muted,
              marginBottom: 12,
            }}
          >
            {eyebrow}
          </div>
        )}

        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.05em',
            margin: 0,
          }}
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            style={{
              fontSize: 18,
              color: bgImage ? 'rgba(255,255,255,0.75)' : ui.muted,
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            {subheadline}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginTop: 32,
          }}
        >
          <button
            onClick={onCtaClick}
            style={{
              padding: '14px 28px',
              borderRadius: mk.r,
              border: `1px solid ${mk.accent}`,
              background: mk.accent,
              color: ui.white,
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            {ctaLabel}
          </button>

          {secondaryLabel && (
            <button
              onClick={onSecondaryClick}
              style={{
                padding: '14px 28px',
                borderRadius: mk.r,
                border: `1px solid ${bgImage ? 'rgba(255,255,255,0.22)' : mk.border}`,
                background: bgImage ? 'rgba(255,255,255,0.1)' : ui.white,
                color: bgImage ? ui.white : mk.fg,
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── PromoPopup ─────────────────────────────────────────── */

export interface PromoPopupProps {
  title: string;
  message?: string;
  ctaLabel?: string;
  onCta?: () => void;
  onDismiss?: () => void;
  isOpen?: boolean;
  image?: string;
}

export function PromoPopup({
  title,
  message,
  ctaLabel = 'Claim Offer',
  onCta,
  onDismiss,
  isOpen = true,
  image,
}: PromoPopupProps) {
  const mk = useMK();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={onDismiss}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9,9,11,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          background: ui.white,
          border: `1px solid ${mk.border}`,
          borderRadius: mk.r,
          padding: 32,
          maxWidth: 440,
          width: '90%',
          textAlign: 'center',
          fontFamily: mk.ff,
          color: mk.fg,
          boxShadow: '0 24px 80px rgba(9,9,11,0.18)',
        }}
      >
        <button
          onClick={onDismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: ui.surface,
            border: `1px solid ${mk.border}`,
            borderRadius: 8,
            color: mk.fg,
            cursor: 'pointer',
            width: 34,
            height: 34,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon name="x" size={18} />
        </button>

        {image && (
          <img
            src={image}
            alt=""
            style={{
              width: '100%',
              borderRadius: mk.r - 4,
              marginBottom: 16,
              border: `1px solid ${mk.border}`,
            }}
          />
        )}

        <div style={{ fontWeight: 800, fontSize: 22 }}>{title}</div>

        {message && (
          <div
            style={{
              fontSize: 15,
              color: ui.muted,
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            {message}
          </div>
        )}

        <button
          onClick={onCta}
          style={{
            marginTop: 20,
            padding: '12px 24px',
            borderRadius: mk.r - 4,
            border: `1px solid ${mk.accent}`,
            background: mk.accent,
            color: ui.white,
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

/* ── TestimonialsCarousel ──────────────────────────────── */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialsCarousel({
  testimonials = [],
  autoPlay = true,
  interval = 5000,
}: TestimonialsCarouselProps) {
  const mk = useMK();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), interval);

    return () => clearInterval(id);
  }, [autoPlay, interval, testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[idx];

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: mk.ff,
        color: mk.fg,
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          border: `1px solid ${mk.border}`,
          borderRadius: mk.r,
          padding: 32,
          background: ui.white,
          boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
        }}
      >
        <div style={{ fontSize: 42, color: ui.muted, lineHeight: 1 }}>"</div>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            marginTop: 8,
            fontStyle: 'italic',
            color: mk.fg,
          }}
        >
          {t.quote}
        </p>

        {t.rating !== undefined && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              margin: '12px 0',
            }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={18} color={i < t.rating! ? '#f59e0b' : ui.border} />
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginTop: 16,
          }}
        >
          {t.avatar && (
            <img
              src={t.avatar}
              alt={t.author}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          )}

          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{t.author}</div>

            {t.role && <div style={{ fontSize: 13, color: ui.muted }}>{t.role}</div>}
          </div>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            marginTop: 16,
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 20 : 8,
                height: 8,
                borderRadius: 999,
                border: 'none',
                background: i === idx ? mk.accent : mk.border,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── TrustBadges ────────────────────────────────────────── */

export interface TrustBadge {
  id: string;
  label: string;
  icon?: string;
  image?: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  title?: string;
}

export function TrustBadges({ badges = [], title }: TrustBadgesProps) {
  const mk = useMK();

  return (
    <div style={{ textAlign: 'center', fontFamily: mk.ff, color: mk.fg }}>
      {title && <div style={{ fontWeight: 700, fontSize: mk.hs, marginBottom: 16 }}>{title}</div>}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        {badges.map((b) => (
          <div
            key={b.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              border: `1px solid ${mk.border}`,
              borderRadius: mk.r,
              background: ui.white,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            {b.image ? (
              <img src={b.image} alt={b.label} style={{ height: 28, objectFit: 'contain' }} />
            ) : (
              <Icon name={b.icon ?? 'shield'} size={22} color={mk.accent} />
            )}

            <span style={{ fontWeight: 600, fontSize: 14 }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── StatsCounter ───────────────────────────────────────── */

export interface StatItem {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  icon?: string;
}

export interface StatsCounterProps {
  stats: StatItem[];
  title?: string;
  columns?: number | string;
}

export function StatsCounter({ stats = [], title, columns = 4 }: StatsCounterProps) {
  const mk = useMK();

  return (
    <div style={{ textAlign: 'center', fontFamily: mk.ff, color: mk.fg }}>
      {title && (
        <div
          style={{
            fontWeight: 800,
            fontSize: 24,
            marginBottom: 24,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 20,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.id}
            style={{
              padding: 24,
              border: `1px solid ${mk.border}`,
              borderRadius: mk.r,
              background: ui.white,
              boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
            }}
          >
            {s.icon && (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '999px',
                  background: ui.surface,
                  border: `1px solid ${mk.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
              >
                <Icon name={s.icon} size={22} color={mk.accent} />
              </div>
            )}

            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: mk.fg,
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {s.value}
              {s.suffix && <span style={{ fontSize: 20, fontWeight: 600 }}>{s.suffix}</span>}
            </div>

            <div
              style={{
                fontSize: 14,
                color: ui.muted,
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── HowItWorks ─────────────────────────────────────────── */

export interface HowItWorksStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface HowItWorksProps {
  steps: HowItWorksStep[];
  title?: string;
  subtitle?: string;
  layout?: 'horizontal' | 'vertical';
}

export function HowItWorks({
  steps = [],
  title,
  subtitle,
  layout = 'horizontal',
}: HowItWorksProps) {
  const mk = useMK();
  const isHoriz = layout === 'horizontal';

  return (
    <div style={{ textAlign: 'center', fontFamily: mk.ff, color: mk.fg }}>
      {title && (
        <div
          style={{
            fontWeight: 800,
            fontSize: 28,
            marginBottom: 8,
            letterSpacing: '-0.04em',
          }}
        >
          {title}
        </div>
      )}

      {subtitle && (
        <div
          style={{
            fontSize: 16,
            color: ui.muted,
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </div>
      )}

      <div
        style={{
          display: isHoriz ? 'flex' : 'grid',
          gap: 24,
          justifyContent: 'center',
          alignItems: isHoriz ? 'flex-start' : undefined,
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div
              style={{
                flex: isHoriz ? 1 : undefined,
                maxWidth: isHoriz ? 220 : undefined,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '999px',
                  background: ui.white,
                  border: `1px solid ${mk.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px',
                  position: 'relative',
                  boxShadow: '0 1px 2px rgba(9,9,11,0.04)',
                }}
              >
                {s.icon ? (
                  <Icon name={s.icon} size={24} color={mk.accent} />
                ) : (
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: mk.accent,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>

              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>

              {s.description && (
                <div style={{ fontSize: 14, color: ui.muted, lineHeight: 1.6 }}>
                  {s.description}
                </div>
              )}
            </div>

            {isHoriz && i < steps.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: 24 }}>
                <Icon name="arrow-right" size={20} color={mk.border} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
