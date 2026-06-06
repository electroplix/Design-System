'use client';
import { Icon } from '../../core/icons';
import { useDataDisplayTheme } from '../../core/provider';
import { Badge, type BadgeTone } from './Badge';

/* ── BadgeGroup ─────────────────────────────────────────── */

export interface BadgeGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  items?: string[];
  badges?: string[];
  tone?: BadgeTone;
  title?: string;
}

export function BadgeGroup({
  items,
  badges,
  tone,
  title,
  className,
  style,
  ...rest
}: BadgeGroupProps) {
  const t = useDataDisplayTheme();
  const effectiveItems = badges ?? items ?? [];
  const safeItems = Array.isArray(effectiveItems) ? effectiveItems : [];

  if (safeItems.length === 0) {
    return (
      <div
        className={className}
        style={{
          padding: t.spacing ?? 14,
          background: t.cardBg ?? '#0b0b0c',
          borderRadius: t.cardRadius ?? 12,
          border: `1px solid ${t.cardBorder ?? 'rgba(255,255,255,0.1)'}`,
          color: t.textColor ?? '#E5E7EB',
          fontFamily: t.fontFamily,
          opacity: 0.6,
          fontSize: t.bodySize ?? 14,
          ...style,
        }}
        {...rest}
      >
        No badges to display
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        padding: t.spacing ?? 14,
        background: t.cardBg ?? '#0b0b0c',
        borderRadius: t.cardRadius ?? 12,
        border: `1px solid ${t.cardBorder ?? 'rgba(255,255,255,0.1)'}`,
        fontFamily: t.fontFamily,
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            color: t.textColor ?? '#E5E7EB',
          }}
        >
          <Icon name="tag" size={16} />
          <span style={{ fontWeight: 600, fontSize: (t.headingSize ?? 18) - 2 }}>{title}</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 12,
              opacity: 0.6,
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            {safeItems.length}
          </span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {safeItems.map((it, i) => (
          <Badge key={i} tone={tone}>
            {it}
          </Badge>
        ))}
      </div>
    </div>
  );
}
