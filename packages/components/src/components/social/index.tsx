'use client';
import type React from 'react';
import { useState } from 'react';
import { Icon } from '../../core/icons';
import { useSocialTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useSC() {
  const t = useSocialTheme();

  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#09090b',
    muted: '#71717a',
    bg: t.bgColor ?? '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    border: t.borderColor ?? '#e4e4e7',
    danger: '#dc2626',
    star: '#f59e0b',
    r: t.radius ?? 16,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
    hs: t.headingSize ?? 18,
  };
}

/* ── SocialShareBar ─────────────────────────────────────── */

export type ShareNetwork = 'twitter' | 'facebook' | 'linkedin' | 'reddit' | 'email' | 'copy';

const SHARE_ICONS: Record<ShareNetwork, string> = {
  twitter: 'twitter',
  facebook: 'facebook',
  linkedin: 'linkedin',
  reddit: 'globe',
  email: 'mail',
  copy: 'copy',
};

const SHARE_COLORS: Record<ShareNetwork, string> = {
  twitter: '#18181b',
  facebook: '#18181b',
  linkedin: '#18181b',
  reddit: '#18181b',
  email: '#18181b',
  copy: '#18181b',
};

export interface SocialShareBarProps extends React.ComponentPropsWithoutRef<'div'> {
  url: string;
  title?: string;
  networks?: ShareNetwork[];
  compact?: boolean;
}

export function SocialShareBar({
  url,
  title = '',
  networks = ['twitter', 'facebook', 'linkedin', 'email', 'copy'],
  compact = false,
  style = {},
  className = '',
  ...rest
}: SocialShareBarProps) {
  const sc = useSC();
  const [copied, setCopied] = useState(false);

  const share = (n: ShareNetwork) => {
    const enc = encodeURIComponent;

    if (n === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      return;
    }

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      reddit: `https://reddit.com/submit?url=${enc(url)}&title=${enc(title)}`,
      email: `mailto:?subject=${enc(title)}&body=${enc(url)}`,
    };

    window.open(urls[n], '_blank', 'noopener,width=600,height=400');
  };

  return (
    <div
      style={{ display: 'flex', gap: 8, fontFamily: sc.ff, ...style }}
      className={className}
      {...rest}
    >
      {networks.map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => share(n)}
          aria-label={`Share on ${n}`}
          style={{
            width: compact ? 36 : 44,
            height: compact ? 36 : 44,
            borderRadius: '50%',
            border: `1px solid ${sc.border}`,
            background: '#ffffff',
            color: SHARE_COLORS[n],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
          }}
        >
          <Icon
            name={n === 'copy' && copied ? 'check' : SHARE_ICONS[n]}
            size={compact ? 16 : 20}
            color={SHARE_COLORS[n]}
          />
        </button>
      ))}
    </div>
  );
}

/* ── SocialLoginButtons ─────────────────────────────────── */

export type SocialProvider = 'google' | 'github' | 'twitter' | 'facebook' | 'discord';

const PROVIDER_META: Record<SocialProvider, { label: string; icon: string; color: string }> = {
  google: { label: 'Google', icon: 'globe', color: '#18181b' },
  github: { label: 'GitHub', icon: 'github', color: '#18181b' },
  twitter: { label: 'Twitter', icon: 'twitter', color: '#18181b' },
  facebook: { label: 'Facebook', icon: 'facebook', color: '#18181b' },
  discord: { label: 'Discord', icon: 'message-circle', color: '#18181b' },
};

export interface SocialLoginButtonsProps extends React.ComponentPropsWithoutRef<'div'> {
  providers: SocialProvider[];
  onLogin?: (provider: SocialProvider) => void;
  layout?: 'horizontal' | 'vertical';
}

export function SocialLoginButtons({
  providers = [],
  onLogin,
  layout = 'vertical',
  style = {},
  className = '',
  ...rest
}: SocialLoginButtonsProps) {
  const sc = useSC();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        gap: 10,
        fontFamily: sc.ff,
        ...style,
      }}
      className={className}
      {...rest}
    >
      {providers.map((p) => {
        const m = PROVIDER_META[p];

        return (
          <button
            type="button"
            key={p}
            onClick={() => onLogin?.(p)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '12px 20px',
              borderRadius: sc.r,
              border: `1px solid ${sc.border}`,
              background: '#ffffff',
              color: sc.fg,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
            }}
          >
            <Icon name={m.icon} size={20} color={m.color} />
            Continue with {m.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── SocialEmbed ────────────────────────────────────────── */

export type EmbedType = 'youtube' | 'twitter' | 'instagram' | 'spotify' | 'custom';

export interface SocialEmbedProps extends React.ComponentPropsWithoutRef<'div'> {
  type: EmbedType;
  url: string;
  width?: string;
  height?: number;
  title?: string;
}

export function SocialEmbed({
  type,
  url,
  width = '100%',
  height = 400,
  title,
  style = {},
  className = '',
  ...rest
}: SocialEmbedProps) {
  const sc = useSC();
  let embedUrl = url;

  if (type === 'youtube') {
    const m = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    if (m) embedUrl = `https://www.youtube.com/embed/${m[1]}`;
  }

  return (
    <div
      style={{
        borderRadius: sc.r,
        overflow: 'hidden',
        border: `1px solid ${sc.border}`,
        background: '#000000',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      className={className}
      {...rest}
    >
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        title={title ?? `${type} embed`}
        style={{ border: 'none', display: 'block' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/* ── FollowLike ─────────────────────────────────────────── */

export interface FollowLikeProps extends React.ComponentPropsWithoutRef<'div'> {
  isFollowed?: boolean;
  followerCount?: number;
  onFollow?: () => void;
  onUnfollow?: () => void;
  isLiked?: boolean;
  likeCount?: number;
  onLike?: () => void;
}

export function FollowLike({
  isFollowed = false,
  followerCount,
  onFollow,
  onUnfollow,
  isLiked = false,
  likeCount,
  onLike,
  style = {},
  className = '',
  ...rest
}: FollowLikeProps) {
  const sc = useSC();

  return (
    <div
      style={{ display: 'flex', gap: 10, fontFamily: sc.ff, ...style }}
      className={className}
      {...rest}
    >
      <button
        type="button"
        onClick={isFollowed ? onUnfollow : onFollow}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 12,
          border: isFollowed ? `1px solid ${sc.accent}` : `1px solid ${sc.border}`,
          background: isFollowed ? sc.accent : '#ffffff',
          color: isFollowed ? '#ffffff' : sc.fg,
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        <Icon
          name={isFollowed ? 'check' : 'user-plus'}
          size={16}
          color={isFollowed ? '#ffffff' : sc.fg}
        />
        {isFollowed ? 'Following' : 'Follow'}
        {followerCount !== undefined && (
          <span style={{ opacity: 0.7, marginLeft: 4 }}>{followerCount}</span>
        )}
      </button>

      <button
        type="button"
        onClick={onLike}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          borderRadius: 12,
          border: `1px solid ${isLiked ? '#fecaca' : sc.border}`,
          background: isLiked ? '#fef2f2' : '#ffffff',
          color: isLiked ? sc.danger : sc.fg,
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        <Icon name="heart" size={16} color={isLiked ? sc.danger : sc.fg} />
        {likeCount !== undefined && likeCount}
      </button>
    </div>
  );
}

/* ── ReactionsBar ───────────────────────────────────────── */

export interface Reaction {
  emoji: string;
  label: string;
  count: number;
  active?: boolean;
}

export interface ReactionsBarProps extends React.ComponentPropsWithoutRef<'div'> {
  reactions: Reaction[];
  onReact?: (label: string) => void;
}

export function ReactionsBar({
  reactions = [],
  onReact,
  style = {},
  className = '',
  ...rest
}: ReactionsBarProps) {
  const sc = useSC();

  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        fontFamily: sc.ff,
        ...style,
      }}
      className={className}
      {...rest}
    >
      {reactions.map((r) => (
        <button
          type="button"
          key={r.label}
          onClick={() => onReact?.(r.label)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 999,
            border: `1px solid ${r.active ? sc.accent : sc.border}`,
            background: r.active ? sc.surface : '#ffffff',
            color: sc.fg,
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.15s',
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        >
          <span>{r.emoji}</span>
          <span style={{ fontWeight: 600 }}>{r.count}</span>
        </button>
      ))}
    </div>
  );
}

/* ── CommentsBox ─────────────────────────────────────────── */

export interface SocialComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  time?: string;
  likes?: number;
}

export interface CommentsBoxProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
  comments: SocialComment[];
  onSubmit?: (text: string) => void;
  title?: string;
}

export function CommentsBox({
  comments = [],
  onSubmit,
  title = 'Comments',
  style = {},
  className = '',
  ...rest
}: CommentsBoxProps) {
  const sc = useSC();
  const [text, setText] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      onSubmit?.(text.trim());
      setText('');
    }
  };

  return (
    <div style={{ fontFamily: sc.ff, color: sc.fg, ...style }} className={className} {...rest}>
      <div
        style={{
          fontWeight: 700,
          fontSize: sc.hs,
          marginBottom: 14,
          letterSpacing: '-0.025em',
          color: sc.fg,
        }}
      >
        {title} ({comments.length})
      </div>

      <form
        onSubmit={send}
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 12,
            border: `1px solid ${sc.border}`,
            background: '#ffffff',
            color: sc.fg,
            fontSize: 14,
            outline: 'none',
            fontFamily: sc.ff,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        />

        <button
          type="button"
          type="submit"
          disabled={!text.trim()}
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            border: `1px solid ${sc.accent}`,
            background: sc.accent,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 13,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            opacity: text.trim() ? 1 : 0.45,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
          }}
        >
          Post
        </button>
      </form>

      <div style={{ display: 'grid', gap: 4 }}>
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              display: 'flex',
              gap: 12,
              padding: '12px 0',
              borderBottom: `1px solid ${sc.border}`,
            }}
          >
            {c.avatar ? (
              <img
                src={c.avatar}
                alt={c.author}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: `1px solid ${sc.border}`,
                }}
              />
            ) : (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: sc.surface,
                  border: `1px solid ${sc.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  color: sc.fg,
                  flexShrink: 0,
                }}
              >
                {c.author[0]}
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: sc.fg,
                  }}
                >
                  {c.author}
                </span>

                {c.time && <span style={{ fontSize: 12, color: sc.muted }}>{c.time}</span>}
              </div>

              <div
                style={{
                  fontSize: 14,
                  marginTop: 4,
                  lineHeight: 1.5,
                  color: sc.muted,
                }}
              >
                {c.text}
              </div>

              {c.likes !== undefined && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 6,
                    fontSize: 13,
                    color: sc.muted,
                  }}
                >
                  <Icon name="heart" size={14} color={sc.muted} />
                  {c.likes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ReviewsForm ────────────────────────────────────────── */

export interface ReviewsFormProps extends Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  onSubmit?: (data: { rating: number; name: string; review: string }) => void;
}

export function ReviewsForm({ onSubmit, style = {}, className = '', ...rest }: ReviewsFormProps) {
  const sc = useSC();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating && name.trim() && review.trim()) {
      onSubmit?.({
        rating,
        name: name.trim(),
        review: review.trim(),
      });
    }
  };

  return (
    <form
      onSubmit={handle}
      style={{
        display: 'grid',
        gap: 14,
        fontFamily: sc.ff,
        color: sc.fg,
        maxWidth: 480,
        ...style,
      }}
      className={className}
      {...rest}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: sc.hs,
          letterSpacing: '-0.025em',
          color: sc.fg,
        }}
      >
        Leave a Review
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            type="button"
            key={s}
            type="button"
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(s)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
            }}
          >
            <Icon name="star" size={28} color={(hover || rating) >= s ? sc.star : '#d4d4d8'} />
          </button>
        ))}
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        style={{
          padding: '10px 14px',
          borderRadius: 12,
          border: `1px solid ${sc.border}`,
          background: '#ffffff',
          color: sc.fg,
          fontSize: 14,
          outline: 'none',
          fontFamily: sc.ff,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      />

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        rows={4}
        style={{
          padding: '10px 14px',
          borderRadius: 12,
          border: `1px solid ${sc.border}`,
          background: '#ffffff',
          color: sc.fg,
          fontSize: 14,
          outline: 'none',
          resize: 'vertical',
          fontFamily: sc.ff,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      />

      <button
        type="button"
        type="submit"
        style={{
          padding: '12px 20px',
          borderRadius: 12,
          border: `1px solid ${sc.accent}`,
          background: sc.accent,
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          justifySelf: 'start',
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.08)',
        }}
      >
        Submit Review
      </button>
    </form>
  );
}
