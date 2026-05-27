"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "../../core/icons";
import { useHeroTheme } from "../../core/provider";

type PatternKind = "dots" | "grid" | "diagonal";

function usePattern(
  kind: PatternKind,
  accent: string,
  intensity: number,
) {
  return useMemo(() => {
    if (kind === "dots") {
      return `radial-gradient(circle, ${accent}${Math.round(
        intensity * 18,
      )
        .toString(16)
        .padStart(2, "0")} 1px, transparent 1px)`;
    }

    if (kind === "grid") {
      return `linear-gradient(${accent}${Math.round(
        intensity * 16,
      )
        .toString(16)
        .padStart(2, "0")} 1px, transparent 1px),
      linear-gradient(90deg, ${accent}${Math.round(
        intensity * 16,
      )
        .toString(16)
        .padStart(2, "0")} 1px, transparent 1px)`;
    }

    return `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      ${accent}${Math.round(intensity * 14)
        .toString(16)
        .padStart(2, "0")} 10px,
      ${accent}${Math.round(intensity * 14)
        .toString(16)
        .padStart(2, "0")} 11px
    )`;
  }, [kind, accent, intensity]);
}

export interface PatternedHeroProps {
  as?: React.ElementType;
  title?: string;
  subtitle?: string;
  pattern?: PatternKind;
  intensity?: number;
  badge?: string;
  ctaLabel?: string;
  onCta?: () => void;
  stats?: { label: string; value: string }[];
  titleSize?: number;
  subtitleSize?: number;
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

const defaultStats = [
  { label: "Active Users", value: "10K+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Support", value: "24/7" },
];

const ui = {
  white: "#ffffff",
  black: "#09090b",
  text: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  surface: "#fafafa",
  ring: "rgba(9,9,11,0.08)",
};

export function PatternedHero(props: PatternedHeroProps) {
  const t = useHeroTheme();

  const {
    as: Tag = "section",
    title = "Built for Modern Development",
    subtitle = "Create exceptional digital experiences with our comprehensive platform.",
    pattern = "dots",
    intensity = 0.5,
    badge = "New Release",
    ctaLabel = "Get Started",
    onCta,
    stats = defaultStats,
    titleSize = 52,
    subtitleSize = 20,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? "70vh",
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 64,
    radius = t.cardRadius ?? 20,
    gap = t.gap ?? 24,
    style = {},
    className = "",
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border =
    borderColor ?? t.cardBorder ?? t.borderColor ?? ui.border;

  const patternBg = usePattern(pattern, accent, intensity);

  const sz =
    pattern === "dots"
      ? "20px 20px"
      : pattern === "grid"
        ? "32px 32px"
        : undefined;

  const [hover, setHover] = useState(false);

  return (
    <Tag
      className={className}
      style={{
        display: "grid",
        placeItems: "center",
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
      {/* pattern layer */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: patternBg,
          backgroundSize: sz,
          zIndex: 0,
          opacity: 0.8,
        }}
      />

      {/* subtle top gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0))",
          zIndex: 0,
        }}
      />

      {/* glow blur */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "12%",
          left: "15%",
          width: 260,
          height: 260,
          borderRadius: "999px",
          background: "rgba(9,9,11,0.03)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
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
            <Icon name="zap" size={14} />
            {badge}
          </span>
        )}

        {title && (
          <h2
            style={{
              fontSize: titleSize,
              margin: 0,
              fontWeight: 800,
              lineHeight: 1.05,
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
              marginTop: 20,
              marginBottom: 0,
              maxWidth: 640,
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}

        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
              display: "flex",
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

        {stats.length > 0 && (
          <div
            style={{
              marginTop: 52,
              display: "flex",
              justifyContent: "center",
              gap: 48,
              flexWrap: "wrap",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: fg,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: ui.muted,
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Tag>
  );
}