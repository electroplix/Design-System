'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Icon } from '../../core/icons';
import { useBlogTheme } from '../../core/provider';

/* ── helpers ────────────────────────────────────────────── */

function useBG() {
  const t = useBlogTheme();
  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#18181b',
    bg: t.bgColor ?? '#ffffff',
    border: t.borderColor ?? '#e4e4e7',
    r: t.radius ?? 14,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
    hs: t.headingSize ?? 18,
  };
}

const ui = {
  card: '#ffffff',
  muted: '#71717a',
  mutedSoft: '#a1a1aa',
  surface: '#fafafa',
  surfaceHover: '#f4f4f5',
  border: '#e4e4e7',
  text: '#18181b',
  textSoft: '#52525b',
  black: '#09090b',
  ring: 'rgba(24, 24, 27, 0.08)',
};

/* ── BlogPost type ──────────────────────────────────────── */

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  author?: { name: string; avatar?: string };
  date?: string;
  readTime?: string;
  tags?: string[];
  category?: string;
}

/* ── BlogCard ───────────────────────────────────────────── */

export interface BlogCardProps {
  post: BlogPost;
  onClick?: (post: BlogPost) => void;
  variant?: 'vertical' | 'horizontal';
}

export function BlogCard({ post, onClick, variant = 'vertical' }: BlogCardProps) {
  const bg = useBG();
  const isH = variant === 'horizontal';

  return (
    <article
      onClick={() => onClick?.(post)}
      style={{
        display: 'flex',
        flexDirection: isH ? 'row' : 'column',
        border: `1px solid ${ui.border}`,
        borderRadius: bg.r,
        overflow: 'hidden',
        background: ui.card,
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: bg.ff,
        color: ui.text,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{
            width: isH ? 200 : '100%',
            height: isH ? 'auto' : 180,
            objectFit: 'cover',
            flexShrink: 0,
            background: ui.surface,
          }}
        />
      )}
      <div style={{ padding: 16, display: 'grid', gap: 8, flex: 1 }}>
        {post.category && (
          <span
            style={{
              width: 'fit-content',
              padding: '3px 8px',
              borderRadius: 999,
              border: `1px solid ${ui.border}`,
              background: ui.surface,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              color: ui.textSoft,
            }}
          >
            {post.category}
          </span>
        )}
        <div
          style={{
            fontWeight: 700,
            fontSize: 17,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: ui.black,
          }}
        >
          {post.title}
        </div>
        {post.excerpt && (
          <div
            style={{
              fontSize: 14,
              color: ui.muted,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 'auto',
            fontSize: 12,
            color: ui.muted,
          }}
        >
          {post.author && <span>{post.author.name}</span>}
          {post.date && <span>· {post.date}</span>}
          {post.readTime && <span>· {post.readTime}</span>}
        </div>
      </div>
    </article>
  );
}

/* ── AuthorByline ───────────────────────────────────────── */

export interface AuthorBylineProps {
  name: string;
  avatar?: string;
  bio?: string;
  date?: string;
  readTime?: string;
}

export function AuthorByline({ name, avatar, bio, date, readTime }: AuthorBylineProps) {
  const bg = useBG();
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={{ display: 'flex', gap: 14, fontFamily: bg.ff, color: ui.text }}>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `1px solid ${ui.border}`,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.05)',
          }}
        />
      ) : (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: ui.surface,
            border: `1px solid ${ui.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 16,
            color: ui.black,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
      )}
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, color: ui.black }}>{name}</div>
        {bio && <div style={{ fontSize: 13, color: ui.muted, marginTop: 2 }}>{bio}</div>}
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: ui.mutedSoft, marginTop: 4 }}>
          {date && <span>{date}</span>}
          {readTime && <span>· {readTime}</span>}
        </div>
      </div>
    </div>
  );
}

/* ── TagList ────────────────────────────────────────────── */

export interface TagListProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  activeTag?: string;
}

export function TagList({ tags = [], onTagClick, activeTag }: TagListProps) {
  const bg = useBG();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontFamily: bg.ff }}>
      {tags.map((t) => (
        <button
          key={t}
          onClick={() => onTagClick?.(t)}
          style={{
            padding: '5px 12px',
            borderRadius: 999,
            border: `1px solid ${t === activeTag ? ui.black : ui.border}`,
            background: t === activeTag ? ui.black : ui.card,
            color: t === activeTag ? '#ffffff' : ui.textSoft,
            fontSize: 13,
            fontWeight: 600,
            cursor: onTagClick ? 'pointer' : 'default',
            transition:
              'background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
            boxShadow: t === activeTag ? '0 1px 2px rgba(9, 9, 11, 0.12)' : 'none',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ── BlogBadge ──────────────────────────────────────────── */

export interface BlogBadgeProps {
  label: string;
  color?: string;
}

export function BlogBadge({ label, color }: BlogBadgeProps) {
  const bg = useBG();
  const c = color ?? ui.black;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'fit-content',
        padding: '3px 10px',
        borderRadius: 999,
        border: `1px solid ${ui.border}`,
        background: color ? `${c}10` : ui.surface,
        color: color ? c : ui.textSoft,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: bg.ff,
      }}
    >
      {label}
    </span>
  );
}

/* ── ReadingBar ─────────────────────────────────────────── */

export interface ReadingBarProps {
  color?: string;
  height?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ReadingBar({ color, height = 3, containerRef }: ReadingBarProps) {
  const bg = useBG();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const h = () => {
      if (containerRef?.current) {
        const { top, height: ch } = containerRef.current.getBoundingClientRect();
        setPct(Math.min(1, Math.max(0, -top / (ch - window.innerHeight))) * 100);
      } else {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        setPct(
          scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100,
        );
      }
    };

    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, [containerRef]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${pct}%`,
        height,
        background: color ?? bg.accent ?? ui.black,
        zIndex: 9997,
        transition: 'width 0.1s ease',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.12)',
      }}
    />
  );
}

/* ── ArticleRenderer ────────────────────────────────────── */

export interface ArticleRendererProps {
  /** Pre-rendered HTML string. ⚠️ Caller is responsible for sanitization (e.g. DOMPurify). */
  html: string;
  maxW?: number;
}

/**
 * Renders trusted HTML content. **Warning:** The `html` prop is rendered
 * via `dangerouslySetInnerHTML`. Always sanitize untrusted content before
 * passing it (e.g. with DOMPurify).
 */
export function ArticleRenderer({ html, maxW = 720 }: ArticleRendererProps) {
  const bg = useBG();
  const safeHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');

  return (
    <article
      dangerouslySetInnerHTML={{ __html: safeHtml }}
      style={{
        fontFamily: bg.ff,
        color: ui.text,
        fontSize: 17,
        lineHeight: 1.8,
        maxWidth: maxW,
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
      }}
    />
  );
}

/* ── RelatedPosts ───────────────────────────────────────── */

export interface RelatedPostsProps {
  posts: BlogPost[];
  title?: string;
  onPostClick?: (post: BlogPost) => void;
}

export function RelatedPosts({
  posts = [],
  title = 'Related Posts',
  onPostClick,
}: RelatedPostsProps) {
  const bg = useBG();

  return (
    <section style={{ fontFamily: bg.ff, color: ui.text }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          marginBottom: 16,
          letterSpacing: '-0.02em',
          color: ui.black,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(posts.length, 3)}, 1fr)`,
          gap: 16,
        }}
      >
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} onClick={onPostClick} />
        ))}
      </div>
    </section>
  );
}

/* ── ArchiveList ─────────────────────────────────────────── */

export interface ArchiveGroup {
  label: string;
  posts: BlogPost[];
}
export interface ArchiveListProps {
  groups: ArchiveGroup[];
  onPostClick?: (post: BlogPost) => void;
}

export function ArchiveList({ groups = [], onPostClick }: ArchiveListProps) {
  const bg = useBG();

  return (
    <div style={{ fontFamily: bg.ff, color: ui.text }}>
      {groups.map((g) => (
        <div key={g.label} style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: ui.black,
            }}
          >
            <Icon name="calendar" size={18} color={ui.black} />
            {g.label}
          </div>
          <div style={{ display: 'grid', gap: 4 }}>
            {g.posts.map((p) => (
              <div
                key={p.id}
                onClick={() => onPostClick?.(p)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: bg.r - 6,
                  border: '1px solid transparent',
                  background: 'transparent',
                  cursor: onPostClick ? 'pointer' : 'default',
                  transition: 'background 0.15s ease, border-color 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: ui.black,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: ui.black }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: ui.mutedSoft }}>{p.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── CommentsSection ─────────────────────────────────────── */

export interface BlogComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  date?: string;
  replies?: BlogComment[];
}
export interface CommentsSectionProps {
  comments?: BlogComment[];
  onSubmit?: (text: string, parentId?: string) => void;
  title?: string;
}

export function CommentsSection({
  comments = [],
  onSubmit,
  title = 'Comments',
}: CommentsSectionProps) {
  const bg = useBG();
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit?.(text.trim(), replyTo ?? undefined);
      setText('');
      setReplyTo(null);
    }
  };

  const renderComment = (c: BlogComment, depth = 0) => (
    <div key={c.id} style={{ marginLeft: depth * 28, marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '12px',
          borderRadius: bg.r,
          border: `1px solid ${ui.border}`,
          background: ui.card,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        {c.avatar ? (
          <img
            src={c.avatar}
            alt={c.author}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              border: `1px solid ${ui.border}`,
            }}
          />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: ui.surface,
              border: `1px solid ${ui.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: ui.black,
              flexShrink: 0,
            }}
          >
            {c.author[0]}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: ui.black }}>{c.author}</span>
            {c.date && <span style={{ fontSize: 12, color: ui.mutedSoft }}>{c.date}</span>}
          </div>
          <div style={{ fontSize: 14, marginTop: 4, lineHeight: 1.5, color: ui.textSoft }}>
            {c.text}
          </div>
          <button
            onClick={() => setReplyTo(c.id)}
            style={{
              background: 'none',
              border: 'none',
              color: ui.black,
              fontSize: 12,
              cursor: 'pointer',
              marginTop: 6,
              padding: 0,
              fontWeight: 600,
            }}
          >
            Reply
          </button>
        </div>
      </div>
      {c.replies?.map((r) => renderComment(r, depth + 1))}
    </div>
  );

  return (
    <section style={{ fontFamily: bg.ff, color: ui.text }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: bg.hs,
          marginBottom: 16,
          letterSpacing: '-0.02em',
          color: ui.black,
        }}
      >
        {title} ({comments.length})
      </div>
      <form onSubmit={send} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={replyTo ? 'Write a reply...' : 'Write a comment...'}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: bg.r - 4,
            border: `1px solid ${ui.border}`,
            background: ui.card,
            color: ui.text,
            fontSize: 14,
            outline: 'none',
            fontFamily: bg.ff,
            boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
          }}
        />
        {replyTo && (
          <button
            type="button"
            onClick={() => setReplyTo(null)}
            style={{
              background: ui.card,
              border: `1px solid ${ui.border}`,
              borderRadius: bg.r - 4,
              color: ui.textSoft,
              cursor: 'pointer',
              width: 40,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="x" size={18} />
          </button>
        )}
        <button
          type="submit"
          disabled={!text.trim()}
          style={{
            padding: '10px 16px',
            borderRadius: bg.r - 4,
            border: `1px solid ${text.trim() ? ui.black : ui.border}`,
            background: text.trim() ? ui.black : ui.surface,
            color: text.trim() ? '#ffffff' : ui.mutedSoft,
            fontWeight: 700,
            fontSize: 13,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            opacity: 1,
            boxShadow: text.trim() ? '0 1px 2px rgba(9, 9, 11, 0.12)' : 'none',
          }}
        >
          Post
        </button>
      </form>
      <div>{comments.map((c) => renderComment(c))}</div>
    </section>
  );
}
