'use client';
import React, { useState, useRef } from 'react';
import { useSiteIdentityTheme } from '../../core/provider';
import { Icon } from '../../core/icons';

/* ── helpers ────────────────────────────────────────────── */

function useSI() {
  const t = useSiteIdentityTheme();

  return {
    accent: t.accentColor ?? '#18181b',
    fg: t.textColor ?? '#09090b',
    muted: '#71717a',
    bg: t.bgColor ?? '#ffffff',
    surface: '#fafafa',
    surfaceHover: '#f4f4f5',
    border: t.borderColor ?? '#e4e4e7',
    r: t.radius ?? 16,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    bs: t.bodySize ?? 14,
    hs: t.headingSize ?? 18,
  };
}

/* ── LogoDisplay ────────────────────────────────────────── */

export interface LogoDisplayProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  href?: string;
}

export function LogoDisplay({ src, alt = 'Logo', width = 140, height, href }: LogoDisplayProps) {
  const img = (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height: height ?? 'auto',
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        style={{
          display: 'inline-flex',
          textDecoration: 'none',
        }}
      >
        {img}
      </a>
    );
  }

  return img;
}

/* ── AnimatedBrandMark ──────────────────────────────────── */

export interface AnimatedBrandMarkProps {
  text: string;
  fontSize?: number;
  accentColor?: string;
  fontFamily?: string;
}

export function AnimatedBrandMark({
  text,
  fontSize = 32,
  accentColor,
  fontFamily,
}: AnimatedBrandMarkProps) {
  const si = useSI();
  const col = accentColor ?? si.accent;

  return (
    <span
      style={{
        fontSize,
        fontWeight: 800,
        fontFamily: fontFamily ?? si.ff,
        color: col,
        letterSpacing: '-0.045em',
        lineHeight: 1,
        display: 'inline-flex',
      }}
    >
      {text}
    </span>
  );
}

/* ── Taglines ───────────────────────────────────────────── */

export interface TaglinesProps {
  lines: string[];
  rotate?: boolean;
  interval?: number;
}

export function Taglines({ lines = [], rotate = false, interval = 3000 }: TaglinesProps) {
  const si = useSI();
  const [idx, setIdx] = useState(0);

  React.useEffect(() => {
    if (!rotate || lines.length <= 1) return;

    const id = setInterval(() => setIdx((i) => (i + 1) % lines.length), interval);
    return () => clearInterval(id);
  }, [rotate, interval, lines.length]);

  if (!lines.length) return null;

  return (
    <div
      style={{
        fontFamily: si.ff,
        color: si.muted,
        fontSize: si.bs,
        lineHeight: 1.6,
      }}
    >
      {rotate ? (
        <span style={{ transition: 'opacity 0.3s' }}>{lines[idx]}</span>
      ) : (
        lines.map((l, i) => <div key={i}>{l}</div>)
      )}
    </div>
  );
}

/* ── BrandingShell ──────────────────────────────────────── */

export interface BrandingShellProps {
  logoSrc?: string;
  brandName?: string;
  tagline?: string;
  children?: React.ReactNode;
  maxW?: number;
}

export function BrandingShell({
  logoSrc,
  brandName,
  tagline,
  children,
  maxW = 900,
}: BrandingShellProps) {
  const si = useSI();

  return (
    <section
      style={{
        fontFamily: si.ff,
        color: si.fg,
        maxWidth: maxW,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 16,
        }}
      >
        {logoSrc && <LogoDisplay src={logoSrc} width={48} />}

        {brandName && <AnimatedBrandMark text={brandName} fontSize={24} />}
      </div>

      {tagline && (
        <div
          style={{
            fontSize: si.bs,
            color: si.muted,
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          {tagline}
        </div>
      )}

      {children}
    </section>
  );
}

/* ── BrandIconGrid ──────────────────────────────────────── */

export interface BrandIcon {
  id: string;
  src: string;
  name: string;
  href?: string;
}

export interface BrandIconGridProps {
  icons: BrandIcon[];
  columns?: number | string;
  iconSize?: number;
}

export function BrandIconGrid({ icons = [], columns = 6, iconSize = 48 }: BrandIconGridProps) {
  const si = useSI();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
        fontFamily: si.ff,
        color: si.fg,
      }}
    >
      {icons.map((ic) => {
        const inner = (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: 16,
              border: `1px solid ${si.border}`,
              borderRadius: si.r,
              background: si.bg,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
            }}
          >
            <img
              src={ic.src}
              alt={ic.name}
              style={{
                width: iconSize,
                height: iconSize,
                objectFit: 'contain',
              }}
            />

            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: si.muted,
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {ic.name}
            </span>
          </div>
        );

        return ic.href ? (
          <a
            key={ic.id}
            href={ic.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {inner}
          </a>
        ) : (
          <div key={ic.id}>{inner}</div>
        );
      })}
    </div>
  );
}

/* ── FaviconUploader ────────────────────────────────────── */

export interface FaviconUploaderProps {
  onUpload?: (file: File) => void;
  currentSrc?: string;
}

export function FaviconUploader({ onUpload, currentSrc }: FaviconUploaderProps) {
  const si = useSI();
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentSrc ?? null);

  React.useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);

    setPreview(URL.createObjectURL(f));
    onUpload?.(f);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: si.ff,
        color: si.fg,
      }}
    >
      <div
        onClick={() => ref.current?.click()}
        style={{
          width: 64,
          height: 64,
          borderRadius: si.r,
          border: `1px dashed ${si.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          background: si.surface,
          boxShadow: '0 1px 2px rgba(9, 9, 11, 0.03)',
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Favicon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#ffffff',
            }}
          />
        ) : (
          <Icon name="image" size={24} color={si.muted} />
        )}
      </div>

      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: si.fg,
            letterSpacing: '-0.02em',
          }}
        >
          Favicon
        </div>

        <div
          style={{
            fontSize: 13,
            color: si.muted,
            marginTop: 2,
          }}
        >
          Click to upload (32×32 or 16×16)
        </div>
      </div>

      <input
        ref={ref}
        type="file"
        accept="image/png,image/x-icon,image/svg+xml"
        onChange={handle}
        style={{ display: 'none' }}
      />
    </div>
  );
}
