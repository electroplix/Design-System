"use client";

import React, { useState } from "react";
import { Icon } from "../../core/icons";
import { useHeroTheme } from "../../core/provider";

export interface SplitHeroProps {
  as?: React.ElementType;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
  features?: string[];
  badge?: string;
  titleSize?: number;
  subtitleSize?: number;
  mediaHeight?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  minH?: string | number;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
}

const ui = {
  white: "#ffffff",
  black: "#09090b",
  text: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  surface: "#fafafa",
  ring: "rgba(9,9,11,0.08)",
};

export function SplitHero(props: SplitHeroProps) {
  const t = useHeroTheme();

  const {
    as: Tag = "section",
    title = "Everything You Need to Succeed",
    subtitle = "A comprehensive platform that gives you all the tools to build, deploy, and grow.",
    ctaLabel = "Start Building",
    onCta,
    image,
    imageAlt = "Hero image",
    reverse = false,
    features = [
      "Lightning-fast performance",
      "Built-in analytics",
      "Enterprise security",
    ],
    badge = "New Features",
    titleSize = 44,
    subtitleSize = 18,
    mediaHeight = 400,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? "auto",
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 64,
    radius = t.cardRadius ?? 20,
    gap = t.gap ?? 48,
    style = {},
    className = "",
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border =
    borderColor ?? t.cardBorder ?? t.borderColor ?? ui.border;

  const [hover, setHover] = useState(false);

  return (
    <Tag
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        background: bg,
        color: fg,
        fontFamily,
        minHeight: typeof minH === "number" ? `${minH}px` : minH,
        padding: `${py}px ${px}px`,
        borderRadius: radius,
        border: `1px solid ${border}`,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
        ...style,
      }}
    >
      {/* subtle background gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(250,250,250,0.72), rgba(255,255,255,0))",
          pointerEvents: "none",
        }}
      />

      {/* soft blur */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          right: "10%",
          width: 260,
          height: 260,
          borderRadius: "999px",
          background: "rgba(9,9,11,0.03)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={
          {
            width: "100%",
            maxWidth: maxW,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap,
            alignItems: "center",
            direction: reverse ? "rtl" : "ltr",
            position: "relative",
            zIndex: 1,
          } as any
        }
      >
        {/* Content */}
        <div style={{ direction: "ltr" }}>
          {badge && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 999,
                border: `1px solid ${border}`,
                background: ui.white,
                color: fg,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 24,
                boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
              }}
            >
              <Icon name="sparkles" size={14} />
              {badge}
            </span>
          )}

          {title && (
            <h2
              style={{
                fontSize: titleSize,
                margin: 0,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.05em",
                color: fg,
              }}
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              style={{
                fontSize: subtitleSize,
                color: ui.muted,
                marginTop: 18,
                marginBottom: 0,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}

          {features.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "28px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 15,
                    color: fg,
                    fontWeight: 500,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "999px",
                      background: ui.surface,
                      border: `1px solid ${border}`,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      name="check"
                      size={12}
                      style={{ color: fg } as any}
                    />
                  </div>

                  {f}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 36 }}>
            <button
              onClick={onCta}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                padding: "16px 32px",
                borderRadius: 12,
                border: `1px solid ${accent}`,
                background: accent,
                color: ui.white,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transform: hover
                  ? "translateY(-1px)"
                  : "translateY(0)",
                transition: "all 0.2s ease",
                boxShadow: hover
                  ? "0 8px 24px rgba(9,9,11,0.12)"
                  : "0 1px 2px rgba(9,9,11,0.08)",
              }}
            >
              {ctaLabel}
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        </div>

        {/* Media */}
        <div style={{ direction: "ltr" }}>
          {image ? (
            <img
              src={image}
              alt={imageAlt}
              style={{
                width: "100%",
                height: mediaHeight,
                objectFit: "cover",
                borderRadius: 18,
                border: `1px solid ${border}`,
                boxShadow: "0 8px 32px rgba(9,9,11,0.08)",
                background: ui.surface,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: mediaHeight,
                borderRadius: 18,
                border: `1px solid ${border}`,
                background: ui.surface,
                display: "grid",
                placeItems: "center",
                boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  color: ui.muted,
                }}
              >
                <Icon
                  name="image"
                  size={52}
                  style={{ opacity: 0.5 } as any}
                />

                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Media Preview
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Tag>
  );
}