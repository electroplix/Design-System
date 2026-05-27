"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMediaTheme } from "../../core/provider";
import { Icon } from "../../core/icons";

function useMD() {
  const t = useMediaTheme();

  return {
    accent: t.accentColor ?? "#09090b",
    fg: t.textColor ?? "#18181b",
    bg: t.bgColor ?? "#ffffff",
    border: t.borderColor ?? "#e4e4e7",
    r: t.radius ?? 14,
    sp: t.spacing ?? 14,
    ff: t.fontFamily,
    hs: t.headingSize ?? 18,
    bs: t.bodySize ?? 14,
    cardBg: t.cardBg ?? "#ffffff",
    cardBorder: t.cardBorder ?? "#e4e4e7",
    cardRadius: t.cardRadius ?? 12,
  };
}

const ui = {
  white: "#ffffff",
  black: "#09090b",
  text: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  surface: "#fafafa",
  surfaceHover: "#f4f4f5",
  danger: "#ef4444",
};

/* ── MediaShell ─────────────────────────────────────────── */

export interface MediaShellProps {
  bgColor?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function MediaShell({
  bgColor,
  maxW = 900,
  px = 24,
  py = 24,
  radius,
  style = {},
  children,
}: MediaShellProps) {
  const md = useMD();

  return (
    <section
      style={{
        background: bgColor ?? md.bg,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius ?? md.r,
        border: `1px solid ${md.border}`,
        color: md.fg,
        fontFamily: md.ff,
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
        ...style,
      }}
    >
      <div style={{ width: "100%", maxWidth: maxW }}>{children}</div>
    </section>
  );
}

/* ── ResponsiveVideo ────────────────────────────────────── */

export interface ResponsiveVideoProps {
  src: string;
  poster?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function ResponsiveVideo({
  src,
  poster,
  aspectRatio = "16/9",
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
}: ResponsiveVideoProps) {
  const md = useMD();

  return (
    <div
      style={{
        position: "relative",
        aspectRatio,
        borderRadius: md.r,
        overflow: "hidden",
        background: ui.black,
        border: `1px solid ${md.border}`,
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
      }}
    >
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

/* ── AudioEmbed ─────────────────────────────────────────── */

export interface AudioEmbedProps {
  src: string;
  title?: string;
  showWaveform?: boolean;
}

export function AudioEmbed({ src, title, showWaveform }: AudioEmbedProps) {
  const md = useMD();

  return (
    <div
      style={{
        border: `1px solid ${md.border}`,
        borderRadius: md.r,
        padding: md.sp,
        fontFamily: md.ff,
        color: md.fg,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: ui.white,
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "999px",
          background: ui.surface,
          border: `1px solid ${md.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name="music" size={20} color={md.accent} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 6,
              color: md.fg,
            }}
          >
            {title}
          </div>
        )}

        <audio src={src} controls style={{ width: "100%", height: 32 }} />
      </div>
    </div>
  );
}

/* ── AvatarProfile ──────────────────────────────────────── */

export interface AvatarProfileProps {
  src?: string;
  name: string;
  initials?: string;
  size?: number;
  badge?: string;
  borderColor?: string;
}

export function AvatarProfile({
  src,
  name,
  initials,
  size = 48,
  badge,
  borderColor,
}: AvatarProfileProps) {
  const md = useMD();

  const letters =
    initials ??
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${borderColor ?? md.border}`,
            boxShadow: "0 1px 2px rgba(9,9,11,0.08)",
          }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: ui.surface,
            border: `2px solid ${borderColor ?? md.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: size * 0.36,
            color: md.fg,
            fontFamily: md.ff,
            boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
          }}
        >
          {letters}
        </div>
      )}

      {badge && (
        <span
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            padding: "2px 6px",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 999,
            background: md.accent,
            color: ui.white,
            border: `1px solid ${ui.white}`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

/* ── IconGrid ───────────────────────────────────────────── */

export interface IconGridItem {
  name: string;
  label?: string;
}

export interface IconGridProps {
  icons: IconGridItem[];
  columns?: number | string;
  iconSize?: number;
}

export function IconGrid({ icons = [], columns = 6, iconSize = 24 }: IconGridProps) {
  const md = useMD();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 12,
        fontFamily: md.ff,
        color: md.fg,
      }}
    >
      {icons.map((ic) => (
        <div
          key={ic.name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: 12,
            borderRadius: md.r,
            border: `1px solid ${md.border}`,
            background: ui.white,
            transition: "all 0.15s ease",
            boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
          }}
        >
          <Icon name={ic.name} size={iconSize} color={md.accent} />

          {ic.label && (
            <span style={{ fontSize: 11, color: ui.muted, fontWeight: 500 }}>
              {ic.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── GalleryItem type ───────────────────────────────────── */

export interface GalleryItem {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

/* ── ImageGallery ───────────────────────────────────────── */

export interface ImageGalleryProps {
  items: GalleryItem[];
  columns?: number | string;
  gap?: number;
  onSelect?: (item: GalleryItem) => void;
}

export function ImageGallery({
  items = [],
  columns = 3,
  gap = 8,
  onSelect,
}: ImageGalleryProps) {
  const md = useMD();

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}>
      {items.map((it) => (
        <div
          key={it.id}
          onClick={() => onSelect?.(it)}
          style={{
            borderRadius: md.r,
            overflow: "hidden",
            cursor: onSelect ? "pointer" : "default",
            border: `1px solid ${md.border}`,
            background: ui.white,
            transition: "all 0.2s ease",
            boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
          }}
        >
          <img
            src={it.src}
            alt={it.alt ?? ""}
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />

          {it.caption && (
            <div
              style={{
                padding: "10px 12px",
                fontSize: 13,
                color: ui.muted,
                fontFamily: md.ff,
              }}
            >
              {it.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── LightboxGallery ────────────────────────────────────── */

export interface LightboxGalleryProps {
  items: GalleryItem[];
  columns?: number | string;
}

export function LightboxGallery({ items = [], columns = 3 }: LightboxGalleryProps) {
  const md = useMD();
  const [sel, setSel] = useState<number | null>(null);

  const go = (dir: -1 | 1) => {
    if (sel === null) return;
    setSel((sel + dir + items.length) % items.length);
  };

  useEffect(() => {
    if (sel === null) return;

    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [sel]);

  return (
    <>
      <ImageGallery
        items={items}
        columns={columns}
        onSelect={(it) => setSel(items.findIndex((i) => i.id === it.id))}
      />

      {sel !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => setSel(null)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(9,9,11,0.82)",
              backdropFilter: "blur(8px)",
            }}
          />

          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <img
              src={items[sel].src}
              alt={items[sel].alt ?? ""}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                borderRadius: md.r,
                objectFit: "contain",
                border: `1px solid rgba(255,255,255,0.16)`,
                boxShadow: "0 24px 80px rgba(0,0,0,0.32)",
              }}
            />

            {items[sel].caption && (
              <div
                style={{
                  textAlign: "center",
                  color: ui.white,
                  marginTop: 10,
                  fontSize: 15,
                  opacity: 0.82,
                  fontFamily: md.ff,
                }}
              >
                {items[sel].caption}
              </div>
            )}
          </div>

          <button
            onClick={() => go(-1)}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon name="chevron-left" size={24} color="#fff" />
          </button>

          <button
            onClick={() => go(1)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon name="chevron-right" size={24} color="#fff" />
          </button>

          <button
            onClick={() => setSel(null)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon name="x" size={20} color="#fff" />
          </button>
        </div>
      )}
    </>
  );
}

/* ── MasonryGrid ────────────────────────────────────────── */

export interface MasonryGridProps {
  items: GalleryItem[];
  columns?: number | string;
  gap?: number;
}

export function MasonryGrid({ items = [], columns = 3, gap = 8 }: MasonryGridProps) {
  const md = useMD();
  const numColumns = typeof columns === "string" ? parseInt(columns, 10) || 1 : columns;
  const cols = Array.from<GalleryItem[]>({ length: numColumns }).map(() => []) as GalleryItem[][];

  items.forEach((it, i) => cols[i % numColumns].push(it));

  return (
    <div style={{ display: "flex", gap }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap }}>
          {col.map((it) => (
            <div
              key={it.id}
              style={{
                borderRadius: md.r,
                overflow: "hidden",
                border: `1px solid ${md.border}`,
                background: ui.white,
                boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
              }}
            >
              <img src={it.src} alt={it.alt ?? ""} style={{ width: "100%", display: "block" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── PolaroidImage ──────────────────────────────────────── */

export interface PolaroidImageProps {
  src: string;
  caption?: string;
  rotation?: number;
  width?: number;
}

export function PolaroidImage({
  src,
  caption,
  rotation = 0,
  width = 260,
}: PolaroidImageProps) {
  const md = useMD();

  return (
    <div
      style={{
        display: "inline-block",
        width,
        padding: 12,
        paddingBottom: caption ? 40 : 12,
        background: ui.white,
        borderRadius: 8,
        border: `1px solid ${ui.border}`,
        boxShadow: "0 8px 28px rgba(9,9,11,0.12)",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.3s",
      }}
    >
      <img src={src} alt={caption ?? ""} style={{ width: "100%", display: "block", borderRadius: 4 }} />

      {caption && (
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 14,
            color: ui.text,
            fontFamily: md.ff,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

/* ── LottieOrSVG ────────────────────────────────────────── */

export interface LottieOrSVGProps {
  type: "svg" | "lottie";
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function LottieOrSVG({
  type,
  src,
  width = 200,
  height = 200,
  alt,
}: LottieOrSVGProps) {
  if (type === "svg") {
    return (
      <img
        src={src}
        alt={alt ?? ""}
        width={width}
        height={height}
        style={{ display: "block" }}
      />
    );
  }

  return (
    <iframe
      src={src}
      width={width}
      height={height}
      title={alt ?? "animation"}
      style={{ border: "none", overflow: "hidden" }}
    />
  );
}

/* ── ImageCropperUploader ───────────────────────────────── */

export interface ImageCropperUploaderProps {
  onUpload?: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
}

export function ImageCropperUploader({
  onUpload,
  accept = "image/*",
  maxSizeMB = 5,
  label = "Upload Image",
}: ImageCropperUploaderProps) {
  const md = useMD();
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [err, setErr] = useState("");

  React.useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];

    if (!f) return;

    if (f.size > maxSizeMB * 1024 * 1024) {
      setErr(`File exceeds ${maxSizeMB}MB limit`);
      return;
    }

    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);

    setErr("");
    setPreview(URL.createObjectURL(f));
    onUpload?.(f);
  };

  return (
    <div
      style={{
        border: `2px dashed ${md.border}`,
        borderRadius: md.r,
        padding: 32,
        textAlign: "center",
        fontFamily: md.ff,
        color: md.fg,
        cursor: "pointer",
        background: ui.surface,
        transition: "all 0.2s ease",
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
      }}
      onClick={() => ref.current?.click()}
    >
      <input ref={ref} type="file" accept={accept} onChange={handle} style={{ display: "none" }} />

      {preview ? (
        <img
          src={preview}
          alt="Preview"
          style={{
            maxWidth: 240,
            maxHeight: 200,
            borderRadius: md.r - 4,
            objectFit: "contain",
            border: `1px solid ${md.border}`,
            background: ui.white,
          }}
        />
      ) : (
        <>
          <Icon name="upload" size={36} color={md.accent} />

          <div style={{ fontWeight: 700, marginTop: 12 }}>{label}</div>

          <div style={{ fontSize: 13, color: ui.muted, marginTop: 4 }}>
            Max {maxSizeMB}MB
          </div>
        </>
      )}

      {err && (
        <div style={{ color: ui.danger, fontSize: 13, marginTop: 8 }}>
          {err}
        </div>
      )}
    </div>
  );
}

/* ── MapEmbed ───────────────────────────────────────────── */

export interface MapEmbedProps {
  address?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: number;
  provider?: "google" | "openstreetmap";
  title?: string;
  borderRadius?: number;
}

export function MapEmbed({
  address,
  lat,
  lng,
  zoom = 14,
  height = 400,
  provider = "openstreetmap",
  title,
  borderRadius,
}: MapEmbedProps) {
  const md = useMD();
  const r = borderRadius ?? md.r;

  let src: string;

  if (provider === "google" && (address || (lat !== undefined && lng !== undefined))) {
    const q = address ? encodeURIComponent(address) : `${lat},${lng}`;
    src = `https://www.google.com/maps?q=${q}&z=${zoom}&output=embed`;
  } else {
    const centerLat = lat ?? 40.7128;
    const centerLng = lng ?? -74.006;

    src = `https://www.openstreetmap.org/export/embed.html?bbox=${
      centerLng - 0.01
    },${centerLat - 0.01},${centerLng + 0.01},${
      centerLat + 0.01
    }&layer=mapnik&marker=${centerLat},${centerLng}`;
  }

  return (
    <div style={{ fontFamily: md.ff, color: md.fg }}>
      {title && (
        <div style={{ fontWeight: 700, fontSize: md.hs, marginBottom: 12 }}>
          {title}
        </div>
      )}

      <div
        style={{
          borderRadius: r,
          overflow: "hidden",
          border: `1px solid ${md.border}`,
          background: ui.surface,
          height,
          boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
        }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title ?? "Map"}
          allowFullScreen
        />
      </div>

      {address && (
        <div
          style={{
            fontSize: 13,
            color: ui.muted,
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon name="map-pin" size={14} color={md.accent} />
          {address}
        </div>
      )}
    </div>
  );
}