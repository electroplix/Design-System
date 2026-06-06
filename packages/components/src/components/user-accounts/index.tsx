'use client';
import React, { useState } from 'react';
import { Icon } from '../../core/icons';
import { useUserAccountsTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useUA() {
  const t = useUserAccountsTheme();

  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#09090b',
    muted: '#71717a',
    bg: t.bgColor ?? '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    border: t.borderColor ?? '#e4e4e7',
    danger: '#dc2626',
    success: '#16a34a',
    warning: '#ca8a04',
    r: t.radius ?? 16,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
    hs: t.headingSize ?? 18,
  };
}

function fieldStyle(ua: ReturnType<typeof useUA>): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: `1px solid ${ua.border}`,
    background: '#ffffff',
    color: ua.fg,
    fontSize: 14,
    outline: 'none',
    fontFamily: ua.ff,
    boxSizing: 'border-box' as const,
    boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
  };
}

function btnPrimary(ua: ReturnType<typeof useUA>): React.CSSProperties {
  return {
    padding: '12px 20px',
    borderRadius: 12,
    border: `1px solid ${ua.accent}`,
    background: ua.accent,
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
  };
}

/* ── AuthForm ───────────────────────────────────────────── */

export interface AuthFormProps extends Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  mode: 'login' | 'register';
  onSubmit?: (data: { email: string; password: string; name?: string }) => void;
  onToggleMode?: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
  error?: string;
}

export function AuthForm({
  mode = 'login',
  onSubmit,
  onToggleMode,
  onForgotPassword,
  loading,
  error,
  style = {},
  className = '',
  ...rest
}: AuthFormProps) {
  const ua = useUA();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      email,
      password,
      name: mode === 'register' ? name : undefined,
    });
  };

  return (
    <form
      onSubmit={handle}
      style={{
        display: 'grid',
        gap: 14,
        fontFamily: ua.ff,
        color: ua.fg,
        maxWidth: 400,
        ...style,
      }}
      className={className}
      {...rest}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: '-0.035em',
          color: ua.fg,
        }}
      >
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </div>

      {mode === 'register' && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          style={fieldStyle(ua)}
        />
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        style={fieldStyle(ua)}
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
        minLength={8}
        style={fieldStyle(ua)}
      />

      {error && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 12,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: ua.danger,
            fontSize: 13,
            lineHeight: 1.45,
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          ...btnPrimary(ua),
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          color: ua.muted,
        }}
      >
        {onForgotPassword && mode === 'login' && (
          <button
            type="button"
            onClick={onForgotPassword}
            style={{
              background: 'none',
              border: 'none',
              color: ua.fg,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              padding: 0,
            }}
          >
            Forgot password?
          </button>
        )}

        {onToggleMode && (
          <button
            type="button"
            onClick={onToggleMode}
            style={{
              background: 'none',
              border: 'none',
              color: ua.fg,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              padding: 0,
            }}
          >
            {mode === 'login' ? 'Create an account' : 'Already have an account?'}
          </button>
        )}
      </div>
    </form>
  );
}

/* ── PasswordReset ──────────────────────────────────────── */

export interface PasswordResetProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'onSubmit'> {
  onSubmit?: (email: string) => void;
  loading?: boolean;
  success?: boolean;
}

export function PasswordReset({
  onSubmit,
  loading,
  success,
  style = {},
  className = '',
  ...rest
}: PasswordResetProps) {
  const ua = useUA();
  const [email, setEmail] = useState('');
  return (
    <section
      style={{
        fontFamily: ua.ff,
        color: ua.fg,
        ...style,
      }}
      className={className}
      {...rest}
    >
      {success ? (
        <div
          style={{
            textAlign: 'center',
            padding: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <Icon name="check-circle" size={28} color={ua.success} />
          </div>

          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '-0.025em',
              color: ua.fg,
            }}
          >
            Check your email
          </div>

          <div
            style={{
              fontSize: 14,
              color: ua.muted,
              marginTop: 6,
              lineHeight: 1.6,
            }}
          >
            We've sent password reset instructions to {email}.
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(email);
          }}
          style={{
            display: 'grid',
            gap: 14,
            maxWidth: 400,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.035em',
              color: ua.fg,
            }}
          >
            Reset Password
          </div>

          <div
            style={{
              fontSize: 14,
              color: ua.muted,
              lineHeight: 1.6,
            }}
          >
            Enter the email associated with your account.
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            style={fieldStyle(ua)}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...btnPrimary(ua),
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </section>
  );
}

/* ── MultiFactorAuthInput ───────────────────────────────── */

export interface MultiFactorAuthInputProps extends React.ComponentPropsWithoutRef<'div'> {
  length?: number;
  onComplete?: (code: string) => void;
  error?: string;
}

export function MultiFactorAuthInput({
  length = 6,
  onComplete,
  error,
  style = {},
  className = '',
  ...rest
}: MultiFactorAuthInputProps) {
  const ua = useUA();
  const [vals, setVals] = useState<string[]>(Array(length).fill(''));
  const refs = Array.from({ length }, () => React.createRef<HTMLInputElement>());

  const change = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;

    const next = [...vals];
    next[i] = v;
    setVals(next);

    if (v && i < length - 1) refs[i + 1].current?.focus();
    if (next.every(Boolean)) onComplete?.(next.join(''));
  };

  const keyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !vals[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  return (
    <div style={{ fontFamily: ua.ff, color: ua.fg, ...style }} className={className} {...rest}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 12,
          letterSpacing: '-0.025em',
          color: ua.fg,
        }}
      >
        Enter verification code
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {vals.map((v, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={v}
            onChange={(e) => change(i, e.target.value)}
            onKeyDown={(e) => keyDown(i, e)}
            maxLength={1}
            inputMode="numeric"
            style={{
              width: 48,
              height: 56,
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 12,
              border: `1px solid ${error ? '#fecaca' : v ? ua.accent : ua.border}`,
              background: '#ffffff',
              color: ua.fg,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: v ? '0 0 0 3px rgba(9, 9, 11, 0.06)' : '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          />
        ))}
      </div>

      {error && (
        <div
          style={{
            color: ua.danger,
            fontSize: 13,
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

/* ── ProfileOverview ────────────────────────────────────── */

export interface ProfileOverviewProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  joinDate?: string;
  stats?: { label: string; value: string | number }[];
}

export function ProfileOverview({
  name,
  email,
  avatar,
  role,
  joinDate,
  stats,
  style = {},
  className = '',
  ...rest
}: ProfileOverviewProps) {
  const ua = useUA();

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        fontFamily: ua.ff,
        color: ua.fg,
        padding: ua.sp,
        border: `1px solid ${ua.border}`,
        borderRadius: ua.r,
        background: ua.bg,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      className={className}
      {...rest}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `1px solid ${ua.border}`,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
          }}
        />
      ) : (
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: ua.surface,
            border: `1px solid ${ua.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 24,
            color: ua.fg,
            flexShrink: 0,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        >
          {initials}
        </div>
      )}

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: '-0.03em',
            color: ua.fg,
          }}
        >
          {name}
        </div>

        {role && <div style={{ fontSize: 14, color: ua.muted, marginTop: 2 }}>{role}</div>}

        {email && (
          <div
            style={{
              fontSize: 14,
              color: ua.muted,
              marginTop: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Icon name="mail" size={14} color={ua.muted} />
            {email}
          </div>
        )}

        {joinDate && (
          <div style={{ fontSize: 12, color: ua.muted, marginTop: 4 }}>Joined {joinDate}</div>
        )}

        {stats && stats.length > 0 && (
          <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: ua.fg,
                  }}
                >
                  {s.value}
                </div>

                <div style={{ fontSize: 12, color: ua.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ProfileSettings ────────────────────────────────────── */

export interface ProfileSettingsProps extends React.ComponentPropsWithoutRef<'form'> {
  name?: string;
  email?: string;
  avatar?: string;
  onSave?: (data: { name: string; email: string }) => void;
  onAvatarChange?: (file: File) => void;
}

export function ProfileSettings({
  name: initName = '',
  email: initEmail = '',
  avatar,
  onSave,
  onAvatarChange,
  style = {},
  className = '',
  ...rest
}: ProfileSettingsProps) {
  const ua = useUA();
  const [n, setN] = useState(initName);
  const [e, setE] = useState(initEmail);
  const ref = React.useRef<HTMLInputElement>(null);

  const save = (ev: React.FormEvent) => {
    ev.preventDefault();
    onSave?.({ name: n, email: e });
  };

  return (
    <form
      onSubmit={save}
      style={{
        display: 'grid',
        gap: 16,
        fontFamily: ua.ff,
        color: ua.fg,
        maxWidth: 480,
        ...style,
      }}
      className={className}
      {...rest}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: '-0.03em',
          color: ua.fg,
        }}
      >
        Profile Settings
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          onClick={() => ref.current?.click()}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: ua.surface,
            border: `1px solid ${ua.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Icon name="camera" size={24} color={ua.muted} />
          )}
        </div>

        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={(ev) => {
            const f = ev.target.files?.[0];
            if (f) onAvatarChange?.(f);
          }}
          style={{ display: 'none' }}
        />

        <div style={{ fontSize: 14, color: ua.muted }}>Click to change photo</div>
      </div>

      <div style={{ display: 'grid', gap: 6 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: ua.muted,
          }}
        >
          Name
        </label>

        <input value={n} onChange={(ev) => setN(ev.target.value)} style={fieldStyle(ua)} />
      </div>

      <div style={{ display: 'grid', gap: 6 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: ua.muted,
          }}
        >
          Email
        </label>

        <input
          value={e}
          onChange={(ev) => setE(ev.target.value)}
          type="email"
          style={fieldStyle(ua)}
        />
      </div>

      <button type="submit" style={{ ...btnPrimary(ua), justifySelf: 'start' }}>
        Save Changes
      </button>
    </form>
  );
}

/* ── AccountSettings ────────────────────────────────────── */

export interface SettingsSection {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
}

export interface AccountSettingsProps extends React.ComponentPropsWithoutRef<'div'> {
  sections: SettingsSection[];
  title?: string;
}

export function AccountSettings({
  sections = [],
  title = 'Account Settings',
  style = {},
  className = '',
  ...rest
}: AccountSettingsProps) {
  const ua = useUA();

  return (
    <div style={{ fontFamily: ua.ff, color: ua.fg, ...style }} className={className} {...rest}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 22,
          marginBottom: 16,
          letterSpacing: '-0.035em',
          color: ua.fg,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'grid', gap: 4 }}>
        {sections.map((s) => (
          <div
            key={s.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 18px',
              border: `1px solid ${ua.border}`,
              borderRadius: ua.r,
              background: ua.bg,
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            {s.icon && (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: ua.surface,
                  border: `1px solid ${ua.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name={s.icon} size={20} color={ua.fg} />
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: ua.fg,
                }}
              >
                {s.label}
              </div>

              {s.description && (
                <div style={{ fontSize: 13, color: ua.muted, marginTop: 2 }}>{s.description}</div>
              )}
            </div>

            {s.action ?? <Icon name="chevron-right" size={18} color={ua.muted} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── RoleBadge ──────────────────────────────────────────── */

export interface RoleBadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  role: string;
  variant?: 'admin' | 'moderator' | 'editor' | 'viewer' | 'custom';
  color?: string;
}

const ROLE_COLORS: Record<string, string> = {
  admin: '#dc2626',
  moderator: '#ca8a04',
  editor: '#2563eb',
  viewer: '#71717a',
};

export function RoleBadge({
  role,
  variant = 'custom',
  color,
  style = {},
  className = '',
  ...rest
}: RoleBadgeProps) {
  const ua = useUA();
  const c = color ?? ROLE_COLORS[variant] ?? ua.accent;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        borderRadius: 999,
        background: '#ffffff',
        border: `1px solid ${ua.border}`,
        color: c,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: ua.ff,
        textTransform: 'capitalize',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        ...style,
      }}
      className={className}
      {...rest}
    >
      <Icon name="shield" size={13} color={c} />
      {role}
    </span>
  );
}
